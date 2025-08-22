import React, { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

const ProjectedPayments: React.FC = () => {
  const { loading, saving, getValue, handleInputChange, handleSave } = useOrderData();
  const [includesPropertyTaxes, setIncludesPropertyTaxes] = useState(false);
  const [includesHomeownersInsurance, setIncludesHomeownersInsurance] = useState(false);
  const [includesOther, setIncludesOther] = useState(false);
  const [interestOnly, setInterestOnly] = useState(false);

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-calculator text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Projected Payments</h2>
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
                        {/* Add/Remove Column Buttons */}
              <section className="flex justify-end gap-3 mb-6">
            <button type="button" className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500 disabled:opacity-50" disabled>
              <i className="fa fa-minus mr-1"></i>
              Remove Column
            </button>
            <button type="button" className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500">
              <i className="fa fa-plus mr-1"></i>
              Add Column
            </button>
              </section>

              <form className="space-y-8">
            {/* Payments Section */}
            <section>
              <h4 className="text-lg font-semibold text-white mb-4">Payments</h4>
              
              {/* Year 1 Payment Projection */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-white mb-4">Year 1</h4>
                <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {/* Year Range Row */}
                      <tr className="border-b border-gray-600">
                        <td className="py-4 px-6 font-medium text-white bg-gray-700 w-1/3">
                          Year Range
                        </td>
                        <td className="py-4 px-6" colSpan={2}>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-300">Years</span>
                            <input 
                              type="text" 
                              className="w-16 px-2 py-1 bg-gray-700 border border-gray-500 rounded text-white text-sm text-center focus:outline-none focus:border-blue-500" 
                              value={getValue('cdf.loans.0.payment_projections.0.start_year') || ''}
                              onChange={handleInputChange}
                              data-schema-key="cdf.loans.0.payment_projections.0.start_year"
                            />
                            <span className="text-gray-300">-</span>
                            <input 
                              type="text" 
                              className="w-16 px-2 py-1 bg-gray-700 border border-gray-500 rounded text-white text-sm text-center focus:outline-none focus:border-blue-500" 
                              value={getValue('cdf.loans.0.payment_projections.0.end_year') || ''}
                              onChange={handleInputChange}
                              data-schema-key="cdf.loans.0.payment_projections.0.end_year"
                            />
                          </div>
                        </td>
                      </tr>

                      {/* Principal & Interest Row */}
                      <tr className="border-b border-gray-600">
                        <td className="py-4 px-6 font-medium text-white bg-gray-700">
                          Principal & Interest
                        </td>
                        <td className="py-4 px-6 w-1/4">
                          <div className="relative">
                            <select 
                              className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                              data-schema-key="cdf.loans.0.payment_projections.0.principal_and_interest_type"
                              defaultValue="Amount"
                            >
                              <option value="Amount">Amount</option>
                              <option value="Range">Range</option>
                            </select>
                            <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <input 
                            type="text" 
                            inputMode="decimal"
                            placeholder="Amount"
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                            value={getValue('cdf.loans.0.payment_projections.0.principal_and_interest') || ''}
                            onChange={handleInputChange}
                            data-schema-key="cdf.loans.0.payment_projections.0.principal_and_interest"
                          />
                        </td>
                      </tr>

                      {/* Interest Only Row */}
                      <tr className="border-b border-gray-600">
                        <td className="py-4 px-6 font-medium text-white bg-gray-700">
                          Interest Only?
                        </td>
                        <td className="py-4 px-6" colSpan={2}>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <div className="relative">
                              <input 
                                type="checkbox" 
                                className="sr-only" 
                                checked={interestOnly}
                                onChange={(e) => setInterestOnly(e.target.checked)}
                                data-schema-key="cdf.loans.0.payment_projections.0.interest_only"
                              />
                              <div className={`w-10 h-5 rounded-full border relative transition-colors ${
                                interestOnly ? 'bg-blue-500 border-blue-500' : 'bg-gray-600 border-gray-500'
                              }`}>
                                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                                  interestOnly ? 'translate-x-5' : 'translate-x-0'
                                }`}></div>
                              </div>
                            </div>
                            <span className="text-white text-sm">Interest Only</span>
                          </label>
                        </td>
                      </tr>

                      {/* Mortgage Insurance Row */}
                      <tr className="border-b border-gray-600">
                        <td className="py-4 px-6 font-medium text-white bg-gray-700">
                          Mortgage Insurance
                        </td>
                        <td className="py-4 px-6" colSpan={2}>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                            value={getValue('cdf.loans.0.payment_projections.0.mortgage_insurance') || ''}
                            onChange={handleInputChange}
                            data-schema-key="cdf.loans.0.payment_projections.0.mortgage_insurance"
                          />
                        </td>
                      </tr>

                      {/* Estimated Escrow Row */}
                      <tr className="border-b border-gray-600">
                        <td className="py-4 px-6 font-medium text-white bg-gray-700">
                          Estimated Escrow
                        </td>
                        <td className="py-4 px-6" colSpan={2}>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                            value={getValue('cdf.loans.0.payment_projections.0.estimated_escrow') || ''}
                            onChange={handleInputChange}
                            data-schema-key="cdf.loans.0.payment_projections.0.estimated_escrow"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Estimated Taxes, Insurance & Assessments Section */}
            <section>
              <h4 className="text-lg font-semibold text-white mb-4">Estimated Taxes, Insurance & Assessments</h4>
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {/* Amount Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white bg-gray-700 w-1/4">
                        Amount
                      </td>
                      <td className="py-4 px-6" colSpan={2}>
                        <div className="flex items-center gap-3">
                          <input 
                            type="text" 
                            inputMode="decimal"
                            placeholder="Amount..."
                            className="flex-1 px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                            data-schema-key="cdf.loans.0.taxes_insurance_assessments.amount"
                          />
                          <div className="relative">
                            <select 
                              className="px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none pr-8" 
                              data-schema-key="cdf.loans.0.taxes_insurance_assessments.payment_period"
                              defaultValue="month"
                            >
                              <option value="month">Per Month</option>
                              <option value="week">Per Week</option>
                            </select>
                            <i className="fa fa-chevron-down absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Includes Header Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white bg-gray-700 align-top" rowSpan={3}>
                        Includes
                      </td>
                      <td className="py-4 px-6" colSpan={2}>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              className="sr-only" 
                              checked={includesPropertyTaxes}
                              onChange={(e) => setIncludesPropertyTaxes(e.target.checked)}
                              data-schema-key="cdf.loans.0.taxes_insurance_assessments.includes_property_taxes"
                            />
                            <div className={`w-10 h-5 rounded-full border relative transition-colors ${
                              includesPropertyTaxes ? 'bg-blue-500 border-blue-500' : 'bg-gray-600 border-gray-500'
                            }`}>
                              <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                                includesPropertyTaxes ? 'translate-x-5' : 'translate-x-0'
                              }`}></div>
                            </div>
                          </div>
                          <span className="text-white text-sm">Property Taxes</span>
                        </label>
                      </td>
                    </tr>

                    {/* Homeowner's Insurance Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6" colSpan={2}>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              className="sr-only" 
                              checked={includesHomeownersInsurance}
                              onChange={(e) => setIncludesHomeownersInsurance(e.target.checked)}
                              data-schema-key="cdf.loans.0.taxes_insurance_assessments.includes_homeowners_insurance"
                            />
                            <div className={`w-10 h-5 rounded-full border relative transition-colors ${
                              includesHomeownersInsurance ? 'bg-blue-500 border-blue-500' : 'bg-gray-600 border-gray-500'
                            }`}>
                              <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                                includesHomeownersInsurance ? 'translate-x-5' : 'translate-x-0'
                              }`}></div>
                            </div>
                          </div>
                          <span className="text-white text-sm">Homeowner's Insurance</span>
                        </label>
                      </td>
                    </tr>

                    {/* Other Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6" colSpan={2}>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <div className="relative">
                              <input 
                                type="checkbox" 
                                className="sr-only" 
                                checked={includesOther}
                                onChange={(e) => setIncludesOther(e.target.checked)}
                                data-schema-key="cdf.loans.0.taxes_insurance_assessments.includes_other"
                              />
                              <div className={`w-10 h-5 rounded-full border relative transition-colors ${
                                includesOther ? 'bg-blue-500 border-blue-500' : 'bg-gray-600 border-gray-500'
                              }`}>
                                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                                  includesOther ? 'translate-x-5' : 'translate-x-0'
                                }`}></div>
                              </div>
                            </div>
                            <span className="text-white text-sm">Other:</span>
                          </label>
                          <input 
                            type="text" 
                            placeholder="Description..."
                            className="flex-1 px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                            data-schema-key="cdf.loans.0.taxes_insurance_assessments.other_description"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
              </form>
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

export default ProjectedPayments;