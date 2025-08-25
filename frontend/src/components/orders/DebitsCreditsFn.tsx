import React, { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

interface DebitsCreditsFnProps {}

interface LineItem {
  statement_text: string;
  amount: string;
  editable: boolean;
}

const DebitsCreditsFn: React.FC<DebitsCreditsFnProps> = () => {
  const { loading, saving, handleInputChange, getValue, saveOrderData } = useOrderData();
  const [borrowerCredits, setBorrowerCredits] = useState<LineItem[]>(
    Array.from({ length: 17 }, (_, i) => ({
      statement_text: '',
      amount: '',
      editable: true // All lines should be editable by default
    }))
  );

  const [borrowerDebits, setBorrowerDebits] = useState<LineItem[]>(
    Array.from({ length: 15 }, (_, i) => ({
      statement_text: '',
      amount: '',
      editable: true // All lines should be editable by default
    }))
  );

  const handleCreditChange = (index: number, field: keyof LineItem, value: string) => {
    if (field === 'editable') return; // Prevent changing editable status
    
    setBorrowerCredits(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleDebitChange = (index: number, field: keyof LineItem, value: string) => {
    if (field === 'editable') return; // Prevent changing editable status
    
    setBorrowerDebits(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const formatLineNumber = (num: number): string => {
    return String(num + 1).padStart(2, '0');
  };

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-calculator text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Credits / Debits</h2>
            <span className="bg-green-600 px-2 py-1 rounded text-xs font-medium">L/N</span>
          </div>
          <button
            onClick={saveOrderData}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
        </section>

        {/* Form Content */}
        <section className="px-10 py-8">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
          <>
          {/* Line Management Buttons */}
          <section className="flex justify-start gap-3 mb-6">
            <button 
              type="button" 
              className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500 disabled:opacity-50" 
              disabled
            >
              <i className="fa fa-minus mr-1"></i>
              Remove Last Line
            </button>
            <button type="button" className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500">
              <i className="fa fa-plus mr-1"></i>
              Add Line
            </button>
          </section>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Paid Already by Borrower */}
            <div>
              <form className="space-y-4">
                <table className="w-full bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="py-3 px-4 text-center border-b border-gray-600" colSpan={3}>
                        L. Paid Already by or on Behalf of Borrower at Closing
                      </th>
                    </tr>
                    <tr className="bg-gray-700">
                      <th className="w-12 py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600"></th>
                      <th className="py-3 px-4 text-left text-sm text-gray-300 border-b border-gray-600">Statement Text</th>
                      <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowerCredits.map((credit, index) => (
                      <tr key={index} className="border-b border-gray-600">
                        <td className="py-3 px-4 text-center text-sm text-gray-400">
                          {formatLineNumber(index)}
                        </td>
                        <td className="py-3 px-4">
                          <input 
                            type="text" 
                            className={`w-full px-3 py-1.5 border border-gray-500 rounded text-sm ${
                              credit.editable 
                                ? 'bg-gray-700 text-white focus:outline-none focus:border-blue-500' 
                                : 'bg-gray-600 text-gray-400'
                            }`}
                            readOnly={!credit.editable}
                            data-schema-key={`cdf.borrower_credit_information.line_${formatLineNumber(index)}.statement_text`}
                            value={credit.statement_text}
                            onChange={(e) => handleCreditChange(index, 'statement_text', e.target.value)}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input 
                            type="text" 
                            inputMode="decimal" 
                            className={`w-full px-3 py-1.5 border border-gray-500 rounded text-sm text-right ${
                              credit.editable 
                                ? 'bg-gray-700 text-white focus:outline-none focus:border-blue-500' 
                                : 'bg-gray-600 text-gray-400'
                            }`}
                            readOnly={!credit.editable}
                            data-schema-key={`cdf.borrower_credit_information.line_${formatLineNumber(index)}.amount`}
                            value={credit.amount}
                            onChange={(e) => handleCreditChange(index, 'amount', e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </form>
            </div>

            {/* Right Column: Adjustments and Other Credits */}
            <div>
              <form className="space-y-4">
                <table className="w-full bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="py-3 px-4 text-center border-b border-gray-600" colSpan={3}>
                        N. Adjustments and Other Credits  
                      </th>
                    </tr>
                    <tr className="bg-gray-700">
                      <th className="w-12 py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600"></th>
                      <th className="py-3 px-4 text-left text-sm text-gray-300 border-b border-gray-600">Statement Text</th>
                      <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowerDebits.map((debit, index) => (
                      <tr key={index} className="border-b border-gray-600">
                        <td className="py-3 px-4 text-center text-sm text-gray-400">
                          {formatLineNumber(index)}
                        </td>
                        <td className="py-3 px-4">
                          <input 
                            type="text" 
                            className={`w-full px-3 py-1.5 border border-gray-500 rounded text-sm ${
                              debit.editable 
                                ? 'bg-gray-700 text-white focus:outline-none focus:border-blue-500' 
                                : 'bg-gray-600 text-gray-400'
                            }`}
                            readOnly={!debit.editable}
                            data-schema-key={`cdf.borrower_debit_information.line_${formatLineNumber(index)}.statement_text`}
                            value={debit.statement_text}
                            onChange={(e) => handleDebitChange(index, 'statement_text', e.target.value)}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input 
                            type="text" 
                            inputMode="decimal" 
                            className={`w-full px-3 py-1.5 border border-gray-500 rounded text-sm text-right ${
                              debit.editable 
                                ? 'bg-gray-700 text-white focus:outline-none focus:border-blue-500' 
                                : 'bg-gray-600 text-gray-400'
                            }`}
                            readOnly={!debit.editable}
                            data-schema-key={`cdf.borrower_debit_information.line_${formatLineNumber(index)}.amount`}
                            value={debit.amount}
                            onChange={(e) => handleDebitChange(index, 'amount', e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </form>
            </div>
          </div>
          </>
          )}
        </section>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 p-5">
        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Chat</h4>
          <p className="text-gray-400 text-xs">Chat functionality</p>
        </section>

        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Tasks</h4>
          <p className="text-gray-400 text-xs">No tasks assigned</p>
        </section>

        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Notes</h4>
          <p className="text-gray-400 text-xs">No notes added</p>
        </section>
      </section>
    </>
  );
};

export default DebitsCreditsFn;