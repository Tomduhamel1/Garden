import React, { useState } from 'react';

export default function DidShopFor() {
  const [activeRow, setActiveRow] = useState<number>(1);
  const [taxableToggle, setTaxableToggle] = useState(false);
  const [activePaymentType, setActivePaymentType] = useState('net funded');
  const [disburseSeparately, setDisburseSeparately] = useState('no');

  const paymentTypes = [
    { value: 'check', label: 'Check' },
    { value: 'wire', label: 'Wire' },
    { value: 'net funded', label: 'Net Funded' },
    { value: 'global payment', label: 'Aggregate' },
    { value: 'order transfer', label: 'Transfer' },
    { value: 'holdback', label: 'Holdback' }
  ];

  const labelOptions = [
    { value: 'insurance', label: 'Insurance' },
    { value: 'lenders_policy', label: "Lender's Policy" },
    { value: 'owners_policy', label: "Owner's Policy" },
    { value: 'payoff', label: 'Payoff' },
    { value: 'property_tax', label: 'Property Tax' },
    { value: 'recording_fee', label: 'Recording Fee' },
    { value: 'reimbursement', label: 'Reimbursement' },
    { value: 'sales_tax', label: 'Sales Tax' },
    { value: 'settlement_fee', label: 'Settlement Fee' },
    { value: 'transfer_tax', label: 'Transfer Tax' },
    { value: 'excluded', label: 'Excluded' },
    { value: 'unclassified', label: 'Unclassified' }
  ];

  const renderTableRow = (lineNumber: number) => {
    const paddedNumber = lineNumber.toString().padStart(2, '0');
    const isActive = activeRow === lineNumber;
    const isCalculatedRow = lineNumber === 5;

    return (
      <tr 
        key={lineNumber}
        className={`border-b border-gray-600 hover:bg-gray-700/30 focus-within:bg-gray-700/30 ${isActive ? 'bg-blue-900/10' : ''}`}
      >
        <td className="py-3 px-4 text-center text-sm text-gray-400">{paddedNumber}</td>
        <td className="py-3 px-4">
          <div className="relative">
            <input
              type="text"
              className={`w-full px-3 py-1.5 ${isCalculatedRow ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'} border border-gray-500 rounded text-sm focus:outline-none focus:border-blue-500`}
              data-schema-key={`cdf.services_borrower_did_shop_for.line_${paddedNumber}.description`}
              onFocus={() => setActiveRow(lineNumber)}
              readOnly={isCalculatedRow}
            />
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="relative">
            <input
              type="text"
              className={`w-full px-3 py-1.5 ${isCalculatedRow ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'} border border-gray-500 rounded text-sm focus:outline-none focus:border-blue-500`}
              data-schema-key={`cdf.services_borrower_did_shop_for.line_${paddedNumber}.payee_name`}
              onFocus={() => setActiveRow(lineNumber)}
              readOnly={isCalculatedRow}
            />
          </div>
        </td>
        <td className="py-3 px-4">
          <input
            type="text"
            inputMode="decimal"
            className={`w-full px-3 py-1.5 ${isCalculatedRow ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'} border border-gray-500 rounded text-sm text-right focus:outline-none focus:border-blue-500`}
            data-schema-key={`cdf.services_borrower_did_shop_for.line_${paddedNumber}.borrower_amount`}
            onFocus={() => setActiveRow(lineNumber)}
            readOnly={isCalculatedRow}
          />
        </td>
        <td className="py-3 px-4">
          <input
            type="text"
            inputMode="decimal"
            className={`w-full px-3 py-1.5 ${isCalculatedRow ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'} border border-gray-500 rounded text-sm text-right focus:outline-none focus:border-blue-500`}
            data-schema-key={`cdf.services_borrower_did_shop_for.line_${paddedNumber}.before_borrower_amount`}
            onFocus={() => setActiveRow(lineNumber)}
            readOnly={isCalculatedRow}
          />
        </td>
        <td className="py-3 px-4">
          <input
            type="text"
            inputMode="decimal"
            className={`w-full px-3 py-1.5 ${isCalculatedRow ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'} border border-gray-500 rounded text-sm text-right focus:outline-none focus:border-blue-500`}
            data-schema-key={`cdf.services_borrower_did_shop_for.line_${paddedNumber}.seller_amount`}
            onFocus={() => setActiveRow(lineNumber)}
            readOnly={isCalculatedRow}
          />
        </td>
        <td className="py-3 px-4">
          <input
            type="text"
            inputMode="decimal"
            className={`w-full px-3 py-1.5 ${isCalculatedRow ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'} border border-gray-500 rounded text-sm text-right focus:outline-none focus:border-blue-500`}
            data-schema-key={`cdf.services_borrower_did_shop_for.line_${paddedNumber}.before_seller_amount`}
            onFocus={() => setActiveRow(lineNumber)}
            readOnly={isCalculatedRow}
          />
        </td>
        <td className="py-3 px-4">
          <input
            type="text"
            inputMode="decimal"
            className={`w-full px-3 py-1.5 ${isCalculatedRow ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'} border border-gray-500 rounded text-sm text-right focus:outline-none focus:border-blue-500`}
            data-schema-key={`cdf.services_borrower_did_shop_for.line_${paddedNumber}.paid_by_others_amount`}
            onFocus={() => setActiveRow(lineNumber)}
            readOnly={isCalculatedRow}
          />
        </td>
      </tr>
    );
  };

  const renderPaymentContent = () => {
    switch (activePaymentType) {
      case 'check':
        return (
          <div className="payment-content" data-payment-type="check">
            <h5 className="text-base font-semibold text-white mb-4">Mailing Address</h5>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Street Address 1</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="check_info.street_address"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Street Address 2</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="check_info.street_address_2"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">City</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="check_info.city"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">State</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="check_info.state"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Zip Code</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="check_info.zip_code"
                />
              </div>
            </div>
          </div>
        );

      case 'wire':
        return (
          <div className="payment-content" data-payment-type="wire">
            <h5 className="text-base font-semibold text-white mb-4">Wire Instructions</h5>
            <div className="bg-blue-900/20 border border-blue-700 rounded p-4 mb-4">
              <div className="flex items-start gap-3">
                <i className="fa fa-info-circle text-blue-400 mt-1"></i>
                <div>
                  <div className="text-sm text-gray-300 mb-2">
                    These wire instructions are shared by <strong>11</strong> wires. Edits made to the wire instructions below will only affect this charge, but you can make edits for all charges on the ledger.
                  </div>
                  <button type="button" className="bg-blue-600 border border-blue-600 rounded px-3 py-1.5 text-white text-sm hover:bg-blue-700">
                    Edit On Accounting Ledger
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Routing #</label>
                <input 
                  type="text" 
                  inputMode="numeric"
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="wire_info.routing_number"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Bank Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="wire_info.bank_name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Account #</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="wire_info.account_number"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Name on Account</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="wire_info.account_name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Further Credit To</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="wire_info.further_credit_to"
                />
              </div>
            </div>
          </div>
        );

      case 'net funded':
        return (
          <div className="payment-content" data-payment-type="net funded">
            {/* Net Funded has no additional fields */}
          </div>
        );

      case 'global payment':
        return (
          <div className="payment-content" data-payment-type="global payment">
            <h5 className="text-base font-semibold text-white mb-4">Aggregate Payee</h5>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Payee</label>
                <select 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                  data-schema-key="global_payee_id"
                >
                  <option value="">Select Payee</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'order transfer':
        return (
          <div className="payment-content" data-payment-type="order transfer">
            <h5 className="text-base font-semibold text-white mb-4">Order Transfer</h5>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Order</label>
                <select 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                  data-schema-key="transfer_order_id"
                >
                  <option value="">Select Order</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'holdback':
        return (
          <div className="payment-content" data-payment-type="holdback">
            <h5 className="text-base font-semibold text-white mb-4">Escrow Information</h5>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Reason for Escrow</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="escrow_reason"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Conditions for Release</label>
                <textarea 
                  rows={3}
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  data-schema-key="release_conditions"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-search text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Services Borrower Did Shop For</h2>
          </div>
        </section>

        <section className="px-10 py-8">
          <form className="space-y-8">
            <section>
              <table className="w-full bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="w-12 py-3 px-4 text-center border-b border-gray-600"></th>
                    <th className="py-3 px-4 text-left border-b border-gray-600"></th>
                    <th className="py-3 px-4 text-left border-b border-gray-600"></th>
                    <th className="py-3 px-4 text-center border-b border-gray-600" colSpan={2}>Paid by Borrower</th>
                    <th className="py-3 px-4 text-center border-b border-gray-600" colSpan={2}>Paid by Seller</th>
                    <th className="py-3 px-4 text-center border-b border-gray-600"></th>
                  </tr>
                  <tr className="bg-gray-700">
                    <th className="w-12 py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600"></th>
                    <th className="py-3 px-4 text-left text-sm text-gray-300 border-b border-gray-600">Description</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-300 border-b border-gray-600">Payee</th>
                    <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">At Closing</th>
                    <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">Before Closing</th>
                    <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">At Closing</th>
                    <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">Before Closing</th>
                    <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600" rowSpan={2}>By Others</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(lineNumber => renderTableRow(lineNumber))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-700">
                    <th className="py-3 px-4"></th>
                    <th className="py-3 px-4"></th>
                    <th className="py-3 px-4 text-right text-sm text-gray-300">Totals</th>
                    <th className="py-3 px-4 text-center text-sm text-white">$1,050.00</th>
                    <th className="py-3 px-4 text-center text-sm text-white">$0.00</th>
                    <th className="py-3 px-4 text-center text-sm text-white">$0.00</th>
                    <th className="py-3 px-4 text-center text-sm text-white">$0.00</th>
                    <th className="py-3 px-4 text-center text-sm text-white">$0.00</th>
                  </tr>
                </tfoot>
              </table>
            </section>

            <section className="flex justify-between items-center">
              <div className="flex gap-3">
                <button type="button" className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500 flex items-center gap-2">
                  <i className="fa fa-file-text-o"></i>
                  Extract From CD
                </button>
                <button type="button" className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Sort Lines
                </button>
                <button type="button" className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500">
                  Edit Premium Line
                </button>
                <button type="button" className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500">
                  Send Title Charges to B
                </button>
              </div>
              <div className="flex gap-3">
                <button type="button" className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500">
                  Clear
                </button>
                <button type="button" className="bg-blue-600 border border-blue-600 rounded px-4 py-2 text-white text-sm hover:bg-blue-700">
                  Add Contact
                </button>
              </div>
            </section>

            <section>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                Settings
                <span className="bg-green-600 px-3 py-1 rounded text-sm">Line 01</span>
              </h4>
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                <div className="mb-4">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only"
                      checked={taxableToggle}
                      onChange={(e) => setTaxableToggle(e.target.checked)}
                      data-schema-key="cdf.services_borrower_did_shop_for.line_01.taxable"
                    />
                    <div className="relative">
                      <div className={`block w-14 h-8 rounded-full ${taxableToggle ? 'bg-blue-600' : 'bg-gray-600'}`}></div>
                      <div 
                        className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform"
                        style={{ transform: taxableToggle ? 'translateX(1.5rem)' : 'translateX(0)' }}
                      />
                    </div>
                    <span className="ml-3 text-gray-300">Line is Taxable</span>
                  </label>
                </div>
              </div>
            </section>

            <section>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                Payments
                <span className="bg-green-600 px-3 py-1 rounded text-sm">Closing Protection Letter</span>
              </h4>
              
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <div className="bg-gray-700 px-6 py-3 flex items-center justify-between border-b border-gray-600">
                  <div className="flex items-center gap-4">
                    <span className="text-white">First National Title & Escrow</span>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className="text-gray-400 hover:text-white disabled:opacity-50" disabled>
                      <i className="fa fa-minus"></i>
                    </button>
                    <button type="button" className="text-gray-400 hover:text-white">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <a href="#" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2">
                        <i className="fa fa-list"></i>
                        Itemize
                      </a>
                    </div>
                    
                    <div className="flex border-b border-gray-600">
                      {paymentTypes.map(type => (
                        <button
                          key={type.value}
                          type="button"
                          className={`px-4 py-2 border-b-2 ${
                            activePaymentType === type.value
                              ? 'text-blue-400 border-blue-400'
                              : 'text-gray-400 border-transparent hover:text-white hover:border-gray-400'
                          }`}
                          onClick={() => setActivePaymentType(type.value)}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" value={activePaymentType} data-schema-key="cdf.services_borrower_did_shop_for.line_01.payees.0.type" />
                  </div>
                  
                  {activePaymentType !== 'global payment' && (
                    <div id="standard-payment-fields">
                      <h5 className="text-base font-semibold text-white mb-4">Payment</h5>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Name</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key="cdf.services_borrower_did_shop_for.line_01.payees.0.name_dep"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">
                            Payment Amount
                            <i className="fa fa-lock text-gray-500 ml-1"></i>
                          </label>
                          <input 
                            type="text" 
                            inputMode="decimal"
                            className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm"
                            data-schema-key="cdf.services_borrower_did_shop_for.line_01.payees.0.payment_dep"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Label</label>
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                            data-schema-key="cdf.services_borrower_did_shop_for.line_01.payees.0.label.payee_label_id"
                            defaultValue="settlement_fee"
                          >
                            {labelOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">
                            Memo
                            <a href="#" className="text-blue-400 hover:text-blue-300 text-xs ml-2">Modify Memo</a>
                            <i className="fa fa-question-circle text-gray-500 ml-1"></i>
                          </label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm"
                            data-schema-key="cdf.services_borrower_did_shop_for.line_01.payees.0.reference_number"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div id="payment-type-content">
                    {renderPaymentContent()}
                  </div>
                  
                  <div className="mt-6">
                    <h5 className="text-base font-semibold text-white mb-4">Disbursement</h5>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">
                          Disburse Separately
                          <i className="fa fa-question-circle text-gray-500 ml-1"></i>
                        </label>
                        <select 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                          data-schema-key="separate"
                          value={disburseSeparately}
                          onChange={(e) => setDisburseSeparately(e.target.value)}
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </section>
      </section>

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
}