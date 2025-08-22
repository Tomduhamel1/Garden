import React, { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

const DebitsCredits: React.FC = () => {
  const { loading, saving, getValue, handleInputChange, handleSave } = useOrderData();
  const [borrowerDebits, setBorrowerDebits] = useState(Array(15).fill({ statementText: '', amount: '' }));
  const [sellerCredits, setSellerCredits] = useState(Array(17).fill({ statementText: '', amount: '' }));

  const handleBorrowerDebitChange = (index: number, field: 'statementText' | 'amount', value: string) => {
    const updated = [...borrowerDebits];
    updated[index] = { ...updated[index], [field]: value };
    setBorrowerDebits(updated);
  };

  const handleSellerCreditChange = (index: number, field: 'statementText' | 'amount', value: string) => {
    const updated = [...sellerCredits];
    updated[index] = { ...updated[index], [field]: value };
    setSellerCredits(updated);
  };

  const addLine = () => {
    // Implementation for adding lines
  };

  const removeLastLine = () => {
    // Implementation for removing lines
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
            <span className="bg-green-600 px-2 py-1 rounded text-xs font-medium">K/M</span>
          </div>
          <button
            onClick={handleSave}
            disabled={loading || saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded text-white text-sm flex items-center gap-2"
          >
            {saving && <i className="fa fa-spinner fa-spin"></i>}
            {saving ? 'Saving...' : 'Save'}
          </button>
        </section>

        {/* Form Content */}
        <section className="px-10 py-8">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <i className="fa fa-spinner fa-spin text-2xl text-gray-400"></i>
              <span className="ml-3 text-gray-400">Loading...</span>
            </div>
          )}
          
          {!loading && (
          <>
          {/* Line Management Buttons */}
          <section className="flex justify-start gap-3 mb-6">
            <button 
              type="button" 
              className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500 disabled:opacity-50"
              onClick={removeLastLine}
              disabled
            >
              <i className="fa fa-minus mr-1"></i>
              Remove Last Line
            </button>
            <button 
              type="button" 
              className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500"
              onClick={addLine}
            >
              <i className="fa fa-plus mr-1"></i>
              Add Line
            </button>
          </section>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Due from Borrower */}
            <div>
              <form className="space-y-4">
                <table className="w-full bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="py-3 px-4 text-center border-b border-gray-600" colSpan={3}>
                        K. Due from Borrower at Closing
                      </th>
                    </tr>
                    <tr className="bg-gray-700">
                      <th className="w-12 py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600"></th>
                      <th className="py-3 px-4 text-left text-sm text-gray-300 border-b border-gray-600">Statement Text</th>
                      <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(15)].map((_, index) => {
                      const lineNum = String(index + 1).padStart(2, '0');
                      const isReadOnly = index === 0 || index === 2; // Lines 01 and 03 are readonly
                      
                      return (
                        <tr key={index} className="border-b border-gray-600">
                          <td className="py-3 px-4 text-center text-sm text-gray-400">{lineNum}</td>
                          <td className="py-3 px-4">
                            <input 
                              type="text" 
                              className={`w-full px-3 py-1.5 ${isReadOnly ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white focus:outline-none focus:border-blue-500'} border border-gray-500 rounded text-sm`}
                              readOnly={isReadOnly}
                              value={getValue(`cdf.borrower_debit_information.line_${lineNum}.statement_text`) || ''}
                              onChange={handleInputChange}
                              data-schema-key={`cdf.borrower_debit_information.line_${lineNum}.statement_text`}
                            />
                          </td>
                          <td className="py-3 px-4">
                            <input 
                              type="text" 
                              inputMode="decimal" 
                              className={`w-full px-3 py-1.5 ${isReadOnly ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white focus:outline-none focus:border-blue-500'} border border-gray-500 rounded text-sm text-right`}
                              readOnly={isReadOnly}
                              value={getValue(`cdf.borrower_debit_information.line_${lineNum}.amount`) || ''}
                              onChange={handleInputChange}
                              data-schema-key={`cdf.borrower_debit_information.line_${lineNum}.amount`}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </form>
            </div>

            {/* Right Column: Due to Seller */}
            <div>
              <form className="space-y-4">
                <table className="w-full bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="py-3 px-4 text-center border-b border-gray-600" colSpan={3}>
                        M. Due to Seller at Closing
                      </th>
                    </tr>
                    <tr className="bg-gray-700">
                      <th className="w-12 py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600"></th>
                      <th className="py-3 px-4 text-left text-sm text-gray-300 border-b border-gray-600">Statement Text</th>
                      <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(17)].map((_, index) => {
                      const lineNum = String(index + 1).padStart(2, '0');
                      const isReadOnly = index === 0; // Line 01 is readonly
                      const hasLinkIcon = index === 1; // Line 02 has link icon
                      
                      return (
                        <tr key={index} className="border-b border-gray-600">
                          <td className="py-3 px-4 text-center text-sm text-gray-400">
                            {hasLinkIcon ? (
                              <div className="flex items-center justify-center gap-1">
                                <i className="fa fa-link text-blue-400 text-xs" title="These amounts are always linked"></i>
                                {lineNum}
                              </div>
                            ) : (
                              lineNum
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <input 
                              type="text" 
                              className={`w-full px-3 py-1.5 ${isReadOnly || hasLinkIcon ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white focus:outline-none focus:border-blue-500'} border border-gray-500 rounded text-sm`}
                              readOnly={isReadOnly || hasLinkIcon}
                              value={getValue(`cdf.seller_credit_information.line_${lineNum}.statement_text`) || ''}
                              onChange={handleInputChange}
                              data-schema-key={`cdf.seller_credit_information.line_${lineNum}.statement_text`}
                            />
                          </td>
                          <td className="py-3 px-4">
                            <input 
                              type="text" 
                              inputMode="decimal" 
                              className={`w-full px-3 py-1.5 ${isReadOnly ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white focus:outline-none focus:border-blue-500'} border border-gray-500 rounded text-sm text-right`}
                              readOnly={isReadOnly}
                              value={getValue(`cdf.seller_credit_information.line_${lineNum}.amount`) || ''}
                              onChange={handleInputChange}
                              data-schema-key={`cdf.seller_credit_information.line_${lineNum}.amount`}
                            />
                          </td>
                        </tr>
                      );
                    })}
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
        {/* Chat */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa fa-chevron-down text-gray-400 text-xs"></i>
            <h4 className="text-white text-sm">Chat</h4>
          </div>
          <div className="text-xs text-gray-400">Chat functionality...</div>
        </section>

        {/* Tasks */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa fa-chevron-right text-gray-400 text-xs"></i>
            <h4 className="text-white text-sm">Tasks</h4>
            <span className="text-xs bg-gray-700 px-2 py-1 rounded">0 / 0</span>
          </div>
          <div className="text-xs text-gray-400 p-3 bg-gray-700 rounded">
            You have not been assigned any tasks on this order
          </div>
        </section>

        {/* Notes */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa fa-chevron-right text-gray-400 text-xs"></i>
            <h4 className="text-white text-sm">Notes</h4>
          </div>
          <div className="text-xs text-gray-400 p-3 bg-gray-700 rounded mb-3">
            No notes have been added to this page
          </div>
          <button type="button" className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded">
            Add Note
          </button>
        </section>
      </section>
    </>
  );
};

export default DebitsCredits;