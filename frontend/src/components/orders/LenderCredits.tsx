import React, { useState } from 'react';

interface LenderCreditsProps {}

const LenderCredits: React.FC<LenderCreditsProps> = () => {
  const [lenderCreditsData, setLenderCreditsData] = useState({
    // Closing Cost Subtotals (read-only)
    subtotals: {
      borrower_total: '',
      before_borrower_total: '',
      seller_total: '',
      before_seller_total: '',
      paid_by_others_total: ''
    },
    // Lender Credits (editable)
    credits: {
      borrower_amount: '',
      before_borrower_amount: '',
      seller_amount: '',
      before_seller_amount: '',
      paid_by_others_amount: ''
    },
    // Settings
    amount_because_above_legal_limit: ''
  });

  const handleInputChange = (section: string, field: string, value: string) => {
    setLenderCreditsData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as Record<string, string>),
        [field]: value
      }
    }));
  };

  const handleSettingChange = (field: string, value: string) => {
    setLenderCreditsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-home text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Lender Credits</h2>
            <span className="bg-green-600 px-2 py-1 rounded text-xs font-medium">J</span>
          </div>
        </section>

        {/* Form Content */}
        <section className="px-10 py-8">
          <form className="space-y-8">
            {/* Main Table */}
            <section>
              <table className="w-full bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="py-3 px-4 text-left border-b border-gray-600"></th>
                    <th className="py-3 px-4 text-center border-b border-gray-600 border-l border-gray-600" colSpan={2}>
                      Paid to Borrower
                    </th>
                    <th className="py-3 px-4 text-center border-b border-gray-600 border-l border-gray-600" colSpan={2}>
                      Paid to Seller
                    </th>
                    <th className="py-3 px-4 text-center border-b border-gray-600 border-l border-gray-600">
                      To Others
                    </th>
                  </tr>
                  <tr className="bg-gray-700">
                    <th className="py-3 px-4 text-left text-sm text-gray-300 border-b border-gray-600"></th>
                    <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600 border-l border-gray-600">At Closing</th>
                    <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600 border-l border-gray-600">Before Closing</th>
                    <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600 border-l border-gray-600">At Closing</th>
                    <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600 border-l border-gray-600">Before Closing</th>
                    <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600 border-l border-gray-600">To Others</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Closing Cost Subtotals Row */}
                  <tr className="border-b border-gray-600">
                    <td className="py-3 px-4 font-medium text-white">
                      Closing Cost Subtotals
                    </td>
                    <td className="py-3 px-4 border-l border-gray-600">
                      <input 
                        type="text" 
                        className="w-full px-3 py-1.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm text-right" 
                        readOnly 
                        data-schema-key="cdf.total_closing_costs.closing_costs_subtotals.borrower_total"
                        value={lenderCreditsData.subtotals.borrower_total}
                      />
                    </td>
                    <td className="py-3 px-4 border-l border-gray-600">
                      <input 
                        type="text" 
                        className="w-full px-3 py-1.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm text-right" 
                        readOnly 
                        data-schema-key="cdf.total_closing_costs.closing_costs_subtotals.before_borrower_total"
                        value={lenderCreditsData.subtotals.before_borrower_total}
                      />
                    </td>
                    <td className="py-3 px-4 border-l border-gray-600">
                      <input 
                        type="text" 
                        className="w-full px-3 py-1.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm text-right" 
                        readOnly 
                        data-schema-key="cdf.total_closing_costs.closing_costs_subtotals.seller_total"
                        value={lenderCreditsData.subtotals.seller_total}
                      />
                    </td>
                    <td className="py-3 px-4 border-l border-gray-600">
                      <input 
                        type="text" 
                        className="w-full px-3 py-1.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm text-right" 
                        readOnly 
                        data-schema-key="cdf.total_closing_costs.closing_costs_subtotals.before_seller_total"
                        value={lenderCreditsData.subtotals.before_seller_total}
                      />
                    </td>
                    <td className="py-3 px-4 border-l border-gray-600">
                      <input 
                        type="text" 
                        className="w-full px-3 py-1.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm text-right" 
                        readOnly 
                        data-schema-key="cdf.total_closing_costs.closing_costs_subtotals.paid_by_others_total"
                        value={lenderCreditsData.subtotals.paid_by_others_total}
                      />
                    </td>
                  </tr>
                  
                  {/* Lender Credits Row */}
                  <tr className="border-b border-gray-600">
                    <td className="py-3 px-4 font-medium text-white">
                      Lender Credits
                    </td>
                    <td className="py-3 px-4 border-l border-gray-600">
                      <input 
                        type="text" 
                        inputMode="decimal"
                        className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdf.total_closing_costs.lender_credits.borrower_amount"
                        value={lenderCreditsData.credits.borrower_amount}
                        onChange={(e) => handleInputChange('credits', 'borrower_amount', e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-4 border-l border-gray-600">
                      <input 
                        type="text" 
                        inputMode="decimal"
                        className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdf.total_closing_costs.lender_credits.before_borrower_amount"
                        value={lenderCreditsData.credits.before_borrower_amount}
                        onChange={(e) => handleInputChange('credits', 'before_borrower_amount', e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-4 border-l border-gray-600">
                      <input 
                        type="text" 
                        inputMode="decimal"
                        className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdf.total_closing_costs.lender_credits.seller_amount"
                        value={lenderCreditsData.credits.seller_amount}
                        onChange={(e) => handleInputChange('credits', 'seller_amount', e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-4 border-l border-gray-600">
                      <input 
                        type="text" 
                        inputMode="decimal"
                        className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdf.total_closing_costs.lender_credits.before_seller_amount"
                        value={lenderCreditsData.credits.before_seller_amount}
                        onChange={(e) => handleInputChange('credits', 'before_seller_amount', e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-4 border-l border-gray-600">
                      <input 
                        type="text" 
                        className="w-full px-3 py-1.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm text-right" 
                        readOnly 
                        data-schema-key="cdf.total_closing_costs.lender_credits.paid_by_others_amount"
                        value={lenderCreditsData.credits.paid_by_others_amount}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Settings Section */}
            <section>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                Settings
                <span className="bg-green-600 px-3 py-1 rounded text-sm">Lender Credits</span>
              </h4>
              
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="legal-limit-credit" className="block text-sm font-medium text-gray-300 mb-2">
                      Credit for increase in closing costs above legal limit
                    </label>
                    <input 
                      type="text" 
                      id="legal-limit-credit"
                      inputMode="decimal"
                      className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                      data-schema-key="cdf.total_closing_costs.lender_credits.amount_because_above_legal_limit"
                      value={lenderCreditsData.amount_because_above_legal_limit}
                      onChange={(e) => handleSettingChange('amount_because_above_legal_limit', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>
          </form>
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

export default LenderCredits;