import React from 'react';
import { useOrderData } from '../../hooks/useOrderData';

const CashToClose: React.FC = () => {
  const { loading, saving, getValue, handleInputChange, handleSave } = useOrderData();
  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-money text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Cash to Close</h2>
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
          <form className="space-y-8">
            {/* Cash to Close Table */}
            <section>
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="py-4 px-6 text-left border-b border-gray-600 font-medium text-white"></th>
                      <th className="py-4 px-6 text-center border-b border-gray-600 border-l border-gray-600 font-medium text-white w-32">
                        Loan Estimate
                      </th>
                      <th className="py-4 px-6 text-center border-b border-gray-600 border-l border-gray-600 font-medium text-white w-32">
                        Final
                      </th>
                      <th className="py-4 px-6 text-center border-b border-gray-600 border-l border-gray-600 font-medium text-white" colSpan={2}>
                        Did this change?
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Total Closing Costs Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white">
                        Total Closing Costs (J)
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          value={getValue('cdf.purchase_cash_to_close.total_closing_costs.estimate') || ''}
                          onChange={handleInputChange}
                          data-schema-key="cdf.purchase_cash_to_close.total_closing_costs.estimate"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          value={getValue('cdf.purchase_cash_to_close.total_closing_costs.final_amount') || ''}
                          onChange={handleInputChange}
                          data-schema-key="cdf.purchase_cash_to_close.total_closing_costs.final_amount"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600 w-24">
                        <div className="relative">
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                            value={getValue('cdf.purchase_cash_to_close.total_closing_costs.changed') || 'No'}
                            onChange={handleInputChange}
                            data-schema-key="cdf.purchase_cash_to_close.total_closing_costs.changed"
                          >
                            <option value="No" selected>No</option>
                            <option value="Yes">Yes</option>
                          </select>
                          <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div 
                          contentEditable="true" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm min-h-[42px] focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.total_closing_costs.change_description"
                        ></div>
                      </td>
                    </tr>

                    {/* Paid Before Closing Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white">
                        Paid Before Closing
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.closing_costs_paid_before_closing.estimate"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.closing_costs_paid_before_closing.final_amount"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div className="relative">
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                            data-schema-key="cdf.purchase_cash_to_close.closing_costs_paid_before_closing.changed"
                          >
                            <option value="No" selected>No</option>
                            <option value="Yes">Yes</option>
                          </select>
                          <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div 
                          contentEditable="true" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm min-h-[42px] focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.closing_costs_paid_before_closing.change_description"
                        ></div>
                      </td>
                    </tr>

                    {/* Closing Costs Financed Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white">
                        Closing Costs Financed (paid from your Loan Amount)
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          value={getValue('cdf.purchase_cash_to_close.closing_costs_financed.estimate') || ''}
                          onChange={handleInputChange}
                          data-schema-key="cdf.purchase_cash_to_close.closing_costs_financed.estimate"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.closing_costs_financed.final_amount"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div className="relative">
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                            data-schema-key="cdf.purchase_cash_to_close.closing_costs_financed.changed"
                          >
                            <option value="No" selected>No</option>
                            <option value="Yes">Yes</option>
                          </select>
                          <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div 
                          contentEditable="true" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm min-h-[42px] focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.closing_costs_financed.change_description"
                        ></div>
                      </td>
                    </tr>

                    {/* Down Payment From Borrower Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white">
                        Down Payment From Borrower
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          value={getValue('cdf.purchase_cash_to_close.down_payment_from_borrower.estimate') || ''}
                          onChange={handleInputChange}
                          data-schema-key="cdf.purchase_cash_to_close.down_payment_from_borrower.estimate"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          value={getValue('cdf.purchase_cash_to_close.down_payment_from_borrower.final_amount') || ''}
                          onChange={handleInputChange}
                          data-schema-key="cdf.purchase_cash_to_close.down_payment_from_borrower.final_amount"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div className="relative">
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                            data-schema-key="cdf.purchase_cash_to_close.down_payment_from_borrower.changed"
                          >
                            <option value="No" selected>No</option>
                            <option value="Yes">Yes</option>
                          </select>
                          <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div 
                          contentEditable="true" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm min-h-[42px] focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.down_payment_from_borrower.change_description"
                        ></div>
                      </td>
                    </tr>

                    {/* Deposit Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white">
                        Deposit
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.deposit.estimate"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div className="relative">
                          <input 
                            type="text" 
                            inputMode="decimal"
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500 pr-10" 
                            data-schema-key="cdf.purchase_cash_to_close.deposit.final_amount"
                          />
                          <i className="fa fa-times absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-red-400" title="Clear override"></i>
                        </div>
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div className="relative">
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                            data-schema-key="cdf.purchase_cash_to_close.deposit.changed"
                          >
                            <option value="No" selected>No</option>
                            <option value="Yes">Yes</option>
                          </select>
                          <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div 
                          contentEditable="true" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm min-h-[42px] focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.deposit.change_description"
                        ></div>
                      </td>
                    </tr>

                    {/* Funds for Borrower Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white">
                        Funds for Borrower
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.funds_for_borrower.estimate"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.funds_for_borrower.final_amount"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div className="relative">
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                            data-schema-key="cdf.purchase_cash_to_close.funds_for_borrower.changed"
                          >
                            <option value="No" selected>No</option>
                            <option value="Yes">Yes</option>
                          </select>
                          <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div 
                          contentEditable="true" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm min-h-[42px] focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.funds_for_borrower.change_description"
                        ></div>
                      </td>
                    </tr>

                    {/* Seller Credits Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white">
                        Seller Credits
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.seller_credits.estimate"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.seller_credits.final_amount"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div className="relative">
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                            data-schema-key="cdf.purchase_cash_to_close.seller_credits.changed"
                          >
                            <option value="No" selected>No</option>
                            <option value="Yes">Yes</option>
                          </select>
                          <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div 
                          contentEditable="true" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm min-h-[42px] focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.seller_credits.change_description"
                        ></div>
                      </td>
                    </tr>

                    {/* Adjustments / Other Credits Row */}
                    <tr className="border-b border-gray-600">
                      <td className="py-4 px-6 font-medium text-white">
                        Adjustments / Other Credits
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.adjustments_and_other_credits.estimate"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.adjustments_and_other_credits.final_amount"
                        />
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div className="relative">
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                            data-schema-key="cdf.purchase_cash_to_close.adjustments_and_other_credits.changed"
                          >
                            <option value="No" selected>No</option>
                            <option value="Yes">Yes</option>
                          </select>
                          <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </td>
                      <td className="py-4 px-6 border-l border-gray-600">
                        <div 
                          contentEditable="true" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm min-h-[42px] focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdf.purchase_cash_to_close.adjustments_and_other_credits.change_description"
                        ></div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-700 border-t-2 border-gray-500">
                      <th className="py-4 px-6 text-right font-semibold text-white">
                        Cash to Close
                      </th>
                      <th className="py-4 px-6 text-right border-l border-gray-600 font-semibold text-white">
                        $0.00
                      </th>
                      <th className="py-4 px-6 text-right border-l border-gray-600 font-semibold text-white">
                        $452,046.56
                      </th>
                      <th className="py-4 px-6 border-l border-gray-600"></th>
                      <th className="py-4 px-6 border-l border-gray-600"></th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>

            {/* Critical CD Fields Section */}
            <section>
              <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Key Cash to Close Fields (for Closing Disclosure)</h3>
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Closing Costs Financed
                      <span className="text-xs text-gray-500 ml-2">(included in loan)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                      <input 
                        type="number" 
                        className="w-full pl-7 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        value={getValue('cdfData.closing_costs_financed') || ''}
                        onChange={handleInputChange}
                        data-schema-key="cdfData.closing_costs_financed"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Adjustments and Other Credits
                      <span className="text-xs text-gray-500 ml-2">(seller/lender credits)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                      <input 
                        type="number" 
                        className="w-full pl-7 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        value={getValue('cdfData.adjustments_and_other_credits') || ''}
                        onChange={handleInputChange}
                        data-schema-key="cdfData.adjustments_and_other_credits"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
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

export default CashToClose;