import React, { useState } from 'react';

const LoanTerms: React.FC = () => {
  const [hasBalloonPayment, setHasBalloonPayment] = useState('yes');

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-file-text-o text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Loan Terms</h2>
          </div>
        </section>

        {/* Form Content */}
        <section className="px-10 py-8">
          <form className="space-y-8">
            {/* Issue Dates Section */}
            <section>
              <h4 className="text-lg font-semibold text-white mb-4">Issue Dates</h4>
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white bg-gray-700 w-1/3">
                        Buyer CD Issue Date
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative">
                          <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                          <input 
                            type="text" 
                            className="w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                            placeholder="Issued date"
                            inputMode="numeric"
                            data-schema-key="borrower_statement_issued_date"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white bg-gray-700">
                        Seller CD Issue Date
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative">
                          <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                          <input 
                            type="text" 
                            className="w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                            placeholder="Issued date"
                            inputMode="numeric"
                            data-schema-key="seller_statement_issued_date"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Loan Type Section */}
            <section>
              <h4 className="text-lg font-semibold text-white mb-4">Loan Type</h4>
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Loan Type
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                        data-schema-key="cdf.loans.0.loan_type"
                        defaultValue="Conventional Insured"
                      >
                        <option value="Conventional Insured">Conventional Insured</option>
                        <option value="Conventional Uninsured">Conventional Uninsured</option>
                        <option value="RHS">RHS</option>
                        <option value="FHA">FHA</option>
                        <option value="VA">VA</option>
                      </select>
                      <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Loan Purpose
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                        data-schema-key="cdf.loans.0.loan_purpose"
                        defaultValue="Purchase"
                      >
                        <option value="Purchase">Purchase</option>
                        <option value="Refinance">Refinance</option>
                        <option value="Home Equity Loan">Home Equity Loan</option>
                        <option value="Construction">Construction</option>
                      </select>
                      <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Loan Product
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                      data-schema-key="cdf.loans.0.loan_product"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Loan Term Table Section */}
            <section>
              <h4 className="text-lg font-semibold text-white mb-4">Loan Term Table</h4>
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {/* Loan Amount Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white bg-gray-700 w-1/4">
                        Loan Amount
                      </td>
                      <td className="py-4 px-6 w-1/4">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.loans.0.initial_loan_amount"
                        />
                      </td>
                      <td className="py-4 px-6 w-1/4">
                        <div className="relative">
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                            data-schema-key="cdf.loans.0.initial_loan_amount_can_increase"
                            defaultValue="no"
                          >
                            <option value="no">Cannot increase</option>
                            <option value="yes">Can increase</option>
                          </select>
                          <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </td>
                      <td className="py-4 px-6 w-1/4"></td>
                    </tr>

                    {/* Interest Rate Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white bg-gray-700">
                        Interest Rate
                      </td>
                      <td className="py-4 px-6">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.loans.0.interest_rate"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative">
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                            data-schema-key="cdf.loans.0.interest_rate_can_increase"
                            defaultValue="no"
                          >
                            <option value="no">Cannot increase</option>
                            <option value="yes">Can increase</option>
                          </select>
                          <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </td>
                      <td className="py-4 px-6"></td>
                    </tr>

                    {/* Monthly Principal & Interest Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white bg-gray-700">
                        Monthly Principal & Interest
                      </td>
                      <td className="py-4 px-6">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.loans.0.monthly_principal_and_interest"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative">
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                            data-schema-key="cdf.loans.0.monthly_principal_and_interest_can_increase"
                            defaultValue="no"
                          >
                            <option value="no">Cannot increase</option>
                            <option value="yes">Can increase</option>
                          </select>
                          <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </td>
                      <td className="py-4 px-6"></td>
                    </tr>

                    {/* Prepayment Penalty Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white bg-gray-700">
                        Prepayment Penalty
                      </td>
                      <td className="py-4 px-6"></td>
                      <td className="py-4 px-6">
                        <div className="relative">
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                            data-schema-key="cdf.loans.0.has_prepayment_penalty"
                            defaultValue="no"
                          >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                          </select>
                          <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </td>
                      <td className="py-4 px-6"></td>
                    </tr>

                    {/* Balloon Payment Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white bg-gray-700">
                        Balloon Payment
                      </td>
                      <td className="py-4 px-6"></td>
                      <td className="py-4 px-6">
                        <div className="relative">
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                            data-schema-key="cdf.loans.0.has_balloon_payment"
                            value={hasBalloonPayment}
                            onChange={(e) => setHasBalloonPayment(e.target.value)}
                          >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                          <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {hasBalloonPayment === 'yes' && (
                          <div className="flex items-center gap-2">
                            <i className="fa fa-trash text-red-400 hover:text-red-300 cursor-pointer" title="Remove Term"></i>
                            <input 
                              type="text" 
                              className="flex-1 px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                              data-schema-key="cdf.loans.0.balloon_payment_description.0"
                            />
                            <div className="relative">
                              <button type="button" className="px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-white text-sm hover:bg-gray-500 flex items-center gap-1">
                                <i className="fa fa-plus text-xs"></i>
                              </button>
                            </div>
                          </div>
                        )}
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

export default LoanTerms;