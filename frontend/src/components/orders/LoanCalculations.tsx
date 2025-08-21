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
      <h2 className="flex items-center gap-2 text-2xl font-bold mb-6 border-b border-gray-700 pb-4">
        <i className="fas fa-file-contract"></i>
        <span>Loan Calculations</span>
      </h2>

      <form className="space-y-6">
        {/* Liability After Foreclosure */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Liability After Foreclosure</h4>
          <div className="p-4 bg-gray-800 rounded">
            <div className="mb-3 text-sm">
              If your lender forecloses on this property and the foreclosure does not cover the amount of unpaid balance on this loan,
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="liability_after_foreclosure"
                  value="protect"
                  checked={liabilityAfterForeclosure === 'protect'}
                  onChange={(e) => setLiabilityAfterForeclosure(e.target.value)}
                  className="text-blue-500"
                  data-schema-key="cdf.loans.0.other_disclosures.liability_after_foreclosure"
                />
                <span>protects from unpaid balance liability</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="liability_after_foreclosure"
                  value="no_protect"
                  checked={liabilityAfterForeclosure === 'no_protect'}
                  onChange={(e) => setLiabilityAfterForeclosure(e.target.value)}
                  className="text-blue-500"
                  data-schema-key="cdf.loans.0.other_disclosures.liability_after_foreclosure"
                />
                <span>does not protect from unpaid balance liability</span>
              </label>
            </div>
          </div>
        </div>

        {/* Loan Calculations */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Loan Calculations</h4>
          <table className="w-full bg-gray-800 border border-gray-600">
            <tbody>
              <tr className="border-b border-gray-600">
                <td className="p-3 bg-gray-700 font-medium w-1/3">Total of Payments</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={calculations.totalOfPayments}
                    onChange={(e) => setCalculations({...calculations, totalOfPayments: e.target.value})}
                    className="w-full px-3 py-1.5 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    data-schema-key="cdf.loan_calculations.total_of_payments"
                  />
                </td>
                    </tr>

              <tr className="border-b border-gray-600">
                <td className="p-3 bg-gray-700 font-medium">Finance Charges</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={calculations.financeCharges}
                    onChange={(e) => setCalculations({...calculations, financeCharges: e.target.value})}
                    className="w-full px-3 py-1.5 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    data-schema-key="cdf.loan_calculations.finance_charge"
                  />
                </td>
              </tr>

              <tr className="border-b border-gray-600">
                <td className="p-3 bg-gray-700 font-medium">Amount Financed</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={calculations.amountFinanced}
                    onChange={(e) => setCalculations({...calculations, amountFinanced: e.target.value})}
                    className="w-full px-3 py-1.5 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    data-schema-key="cdf.loan_calculations.amount_financed"
                  />
                </td>
              </tr>

              <tr className="border-b border-gray-600">
                <td className="p-3 bg-gray-700 font-medium">A.P.R</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={calculations.apr}
                    onChange={(e) => setCalculations({...calculations, apr: e.target.value})}
                    className="w-full px-3 py-1.5 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    data-schema-key="cdf.loan_calculations.annual_percentage_rate"
                  />
                </td>
              </tr>

              <tr>
                <td className="p-3 bg-gray-700 font-medium">T.I.P.</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={calculations.tip}
                    onChange={(e) => setCalculations({...calculations, tip: e.target.value})}
                    className="w-full px-3 py-1.5 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    data-schema-key="cdf.loan_calculations.total_interest_percentage"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
};

export default LoanCalculations;