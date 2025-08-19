import React, { useState } from 'react';

const LoanCalculations: React.FC = () => {
  const [liabilityAfterForeclosure, setLiabilityAfterForeclosure] = useState('');
  const [calculations, setCalculations] = useState({
    totalOfPayments: '',
    financeCharges: '',
    amountFinanced: '',
    apr: '',
    tip: ''
  });

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-calculator text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Loan Calculations</h2>
          </div>
        </section>

        {/* Form Content */}
        <section className="px-10 py-8">
          <form className="space-y-8">
            {/* Liability After Foreclosure Section */}
            <section>
              <h4 className="text-lg font-semibold text-white mb-4">Liability After Foreclosure</h4>
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm">
                    If your lender forecloses on this property and the foreclosure does not cover the amount of unpaid balance on this loan,
                  </p>
                  <div className="space-y-3">
                    <div className="relative">
                      <input 
                        type="radio" 
                        id="liability-protect" 
                        name="liability_after_foreclosure" 
                        value="protect"
                        checked={liabilityAfterForeclosure === 'protect'}
                        onChange={(e) => setLiabilityAfterForeclosure(e.target.value)}
                        data-schema-key="cdf.loans.0.other_disclosures.liability_after_foreclosure"
                        className="absolute opacity-0"
                      />
                      <label 
                        htmlFor="liability-protect" 
                        className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                      >
                        <span className={`absolute left-0 w-4 h-4 border-2 rounded-full ${
                          liabilityAfterForeclosure === 'protect' 
                            ? 'border-blue-500' 
                            : 'border-gray-500'
                        } bg-gray-700`}>
                          {liabilityAfterForeclosure === 'protect' && (
                            <span className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </span>
                        protects from unpaid balance liability
                      </label>
                    </div>
                    <div className="relative">
                      <input 
                        type="radio" 
                        id="liability-no-protect" 
                        name="liability_after_foreclosure" 
                        value="no_protect"
                        checked={liabilityAfterForeclosure === 'no_protect'}
                        onChange={(e) => setLiabilityAfterForeclosure(e.target.value)}
                        data-schema-key="cdf.loans.0.other_disclosures.liability_after_foreclosure"
                        className="absolute opacity-0"
                      />
                      <label 
                        htmlFor="liability-no-protect" 
                        className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                      >
                        <span className={`absolute left-0 w-4 h-4 border-2 rounded-full ${
                          liabilityAfterForeclosure === 'no_protect' 
                            ? 'border-blue-500' 
                            : 'border-gray-500'
                        } bg-gray-700`}>
                          {liabilityAfterForeclosure === 'no_protect' && (
                            <span className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </span>
                        does not protect from unpaid balance liability
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Loan Calculations Table Section */}
            <section>
              <h4 className="text-lg font-semibold text-white mb-4">Loan Calculations</h4>
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {/* Total of Payments Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white bg-gray-700 w-1/3">
                        Total of Payments
                      </td>
                      <td className="py-4 px-6">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          value={calculations.totalOfPayments}
                          onChange={(e) => setCalculations({...calculations, totalOfPayments: e.target.value})}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.loan_calculations.total_of_payments"
                        />
                      </td>
                    </tr>

                    {/* Finance Charges Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white bg-gray-700">
                        Finance Charges
                      </td>
                      <td className="py-4 px-6">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          value={calculations.financeCharges}
                          onChange={(e) => setCalculations({...calculations, financeCharges: e.target.value})}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.loan_calculations.finance_charge"
                        />
                      </td>
                    </tr>

                    {/* Amount Financed Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white bg-gray-700">
                        Amount Financed
                      </td>
                      <td className="py-4 px-6">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          value={calculations.amountFinanced}
                          onChange={(e) => setCalculations({...calculations, amountFinanced: e.target.value})}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.loan_calculations.amount_financed"
                        />
                      </td>
                    </tr>

                    {/* A.P.R Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white bg-gray-700">
                        A.P.R
                      </td>
                      <td className="py-4 px-6">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          value={calculations.apr}
                          onChange={(e) => setCalculations({...calculations, apr: e.target.value})}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.loan_calculations.annual_percentage_rate"
                        />
                      </td>
                    </tr>

                    {/* T.I.P Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white bg-gray-700">
                        T.I.P.
                      </td>
                      <td className="py-4 px-6">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          value={calculations.tip}
                          onChange={(e) => setCalculations({...calculations, tip: e.target.value})}
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.loan_calculations.total_interest_percentage"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
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

export default LoanCalculations;