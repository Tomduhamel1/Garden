import React, { useState } from 'react';

export default function DidNotShopFor() {
  const [activeRow, setActiveRow] = useState<number>(4);
  const [activePaymentType, setActivePaymentType] = useState('net funded');
  const [payeeTabs] = useState(['New Payee']);
  const [activePayeeTab, setActivePayeeTab] = useState(0);

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

  const aggregatePayees = [
    { value: 'gtgJfJ9sCBvqRdv56', label: 'AmTrust Title Insurance Company' },
    { value: 'pJuj6Let2u2Debee5', label: 'Beeline Title, LLC' },
    { value: '3c3hJ49hi3wx8Tgpo', label: 'CATIC' },
    { value: '3dJfDZSd97hNkFmgn', label: 'First American Title Insurance Company' },
    { value: 'ez2fMNoGzaJpBCDa8', label: 'First National Title & Escrow' },
    { value: 'vQxiAeHwrMg7NkuAm', label: 'McDonnell and Associates' },
    { value: 'TpQkANo9d3nbsACaB', label: 'Simplifile' },
    { value: 'CLHt2MzvedwCSrPcx', label: 'The Law Office of Stephen P. Patti, LLC DBA The Law Office of Bowman & Patti' },
    { value: 'Ez9NMsjZbwhDYTJN7', label: 'WFG National Title Insurance Company' }
  ];

  const stateOptions = [
    'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI',
    'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN',
    'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH',
    'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA',
    'WI', 'WV', 'WY', 'VI'
  ];

  const renderTableRow = (lineNumber: number) => {
    const paddedNumber = lineNumber.toString().padStart(2, '0');
    const isActive = activeRow === lineNumber;

    return (
      <tr 
        key={lineNumber}
        className={`border-b border-gray-600 ${isActive ? 'bg-blue-900/10' : 'hover:bg-gray-750'}`}
      >
        <td className="text-center py-3 px-4 border-r border-gray-600">
          <span className={`font-semibold ${isActive ? 'text-blue-400' : 'text-gray-400'}`}>
            {paddedNumber}
          </span>
        </td>
        <td className="border-r border-gray-600">
          <input
            type="text"
            className="w-full px-3 py-2 bg-transparent text-white focus:outline-none focus:bg-blue-900/10"
            data-schema-key={`cdf.services_borrower_did_not_shop_for.line_${paddedNumber}.description`}
            onFocus={() => setActiveRow(lineNumber)}
          />
        </td>
        <td className="border-r border-gray-600">
          <input
            type="text"
            className="w-full px-3 py-2 bg-transparent text-white focus:outline-none focus:bg-blue-900/10"
            data-schema-key={`cdf.services_borrower_did_not_shop_for.line_${paddedNumber}.payee_name`}
            onFocus={() => setActiveRow(lineNumber)}
          />
        </td>
        <td className="border-r border-gray-600">
          <input
            type="text"
            className="w-full px-3 py-2 bg-transparent text-white text-right focus:outline-none focus:bg-blue-900/10"
            inputMode="decimal"
            data-schema-key={`cdf.services_borrower_did_not_shop_for.line_${paddedNumber}.borrower_amount`}
            onFocus={() => setActiveRow(lineNumber)}
          />
        </td>
        <td className="border-r border-gray-600">
          <input
            type="text"
            className="w-full px-3 py-2 bg-transparent text-white text-right focus:outline-none focus:bg-blue-900/10"
            inputMode="decimal"
            data-schema-key={`cdf.services_borrower_did_not_shop_for.line_${paddedNumber}.before_borrower_amount`}
            onFocus={() => setActiveRow(lineNumber)}
          />
        </td>
        <td className="border-r border-gray-600">
          <input
            type="text"
            className="w-full px-3 py-2 bg-transparent text-white text-right focus:outline-none focus:bg-blue-900/10"
            inputMode="decimal"
            data-schema-key={`cdf.services_borrower_did_not_shop_for.line_${paddedNumber}.seller_amount`}
            onFocus={() => setActiveRow(lineNumber)}
          />
        </td>
        <td className="border-r border-gray-600">
          <input
            type="text"
            className="w-full px-3 py-2 bg-transparent text-white text-right focus:outline-none focus:bg-blue-900/10"
            inputMode="decimal"
            data-schema-key={`cdf.services_borrower_did_not_shop_for.line_${paddedNumber}.before_seller_amount`}
            onFocus={() => setActiveRow(lineNumber)}
          />
        </td>
        <td>
          <input
            type="text"
            className="w-full px-3 py-2 bg-transparent text-white text-right focus:outline-none focus:bg-blue-900/10"
            inputMode="decimal"
            data-schema-key={`cdf.services_borrower_did_not_shop_for.line_${paddedNumber}.paid_by_others_amount`}
            onFocus={() => setActiveRow(lineNumber)}
          />
        </td>
      </tr>
    );
  };

  const renderPaymentContent = () => {
    switch (activePaymentType) {
      case 'check':
        return (
          <>
            <div className="grid grid-cols-3 gap-5 mb-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Memo</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.reference_number"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-base font-semibold text-white">Mailing Address</h5>
              
              <input type="hidden" data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.address.latitude" />
              <input type="hidden" data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.address.longitude" />
              
              <div className="grid grid-cols-5 gap-5">
                <div className="col-span-3">
                  <label className="block text-sm text-gray-300 mb-2">Address</label>
                  <div className="relative">
                    <i className="fa fa-map-marker absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input 
                      type="text" 
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Search address..."
                      data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.address.address_1"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-300 mb-2">Apt, Suite, Etc.</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                    data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.address.address_2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">City</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                    data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.address.city"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">State</label>
                  <select 
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                    data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.address.state"
                    defaultValue="RI"
                  >
                    <option value="">Select one...</option>
                    {stateOptions.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Zipcode</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                    inputMode="numeric"
                    data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.address.zipcode"
                  />
                </div>
              </div>
            </div>
          </>
        );

      case 'wire':
        return (
          <>
            <div className="grid grid-cols-3 gap-5 mb-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Memo</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.reference_number"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-base font-semibold text-white">Wire Instructions</h5>
              
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Routing #</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                    inputMode="numeric"
                    maxLength={35}
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
                    maxLength={35}
                    data-schema-key="wire_info.account_number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
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
          </>
        );

      case 'net funded':
        return (
          <div className="text-center text-gray-400 py-8">
            <p className="text-sm">Net Funded payments use only the basic payment information above.</p>
          </div>
        );

      case 'global payment':
        return (
          <div className="mb-6">
            <h5 className="text-base font-semibold text-white mb-4">Aggregate Payee</h5>
            <div className="grid grid-cols-3 gap-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Name</label>
                <select 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                  data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.aggregate_payee_id"
                >
                  <option value="">Select one...</option>
                  {aggregatePayees.map(payee => (
                    <option key={payee.value} value={payee.value}>{payee.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                  Payment Amount
                  <i className="fa fa-lock text-gray-400" title="This field cannot be modified."></i>
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm cursor-not-allowed"
                  inputMode="decimal"
                  data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.payment_dep"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Label</label>
                <select 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                  data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.label.payee_label_id"
                  defaultValue="unclassified"
                >
                  {labelOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 'order transfer':
        return (
          <div className="space-y-4">
            <h5 className="text-base font-semibold text-white">Order Transfer</h5>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Order Number</label>
                <div className="relative">
                  <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text" 
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Search orders..."
                    data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.order_transfer_order_id"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">For Benefit Of</label>
                <select 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                  data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.order_transfer_for_benefit_of"
                >
                  <option value="">Select party...</option>
                  <option value="borrower">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="lender">Lender</option>
                  <option value="listingAgency">Listing Agency</option>
                  <option value="sellingAgency">Selling Agency</option>
                  <option value="settlementAgency">Settlement Agency</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'holdback':
        return (
          <div className="space-y-4">
            <h5 className="text-base font-semibold text-white">Escrow Information</h5>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Release Note</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.holdback_release_note"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Release Date</label>
                <div className="relative">
                  <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text" 
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                    inputMode="numeric"
                    data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.holdback_release_date"
                  />
                </div>
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
            <i className="fa fa-home text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Services Borrower Did Not Shop For</h2>
            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">B</span>
          </div>
          <div className="flex gap-3">
            <button className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500 opacity-50 cursor-not-allowed" title="Remove Last Line">
              <i className="fa fa-minus mr-2"></i>
              Remove Line
            </button>
            <button className="bg-blue-600 border border-blue-500 rounded px-3 py-2 text-white text-sm hover:bg-blue-700" title="Add Line">
              <i className="fa fa-plus mr-2"></i>
              Add Line
            </button>
          </div>
        </section>

        <section className="px-10 py-8">
          <form className="space-y-8">
            <section>
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="text-center py-3 px-4 border-r border-gray-600" rowSpan={2}></th>
                      <th className="text-left py-3 px-4 border-r border-gray-600" rowSpan={2}>Description</th>
                      <th className="text-left py-3 px-4 border-r border-gray-600" rowSpan={2}>Payee</th>
                      <th className="text-center py-2 px-4 border-r border-gray-600 border-b border-gray-600" colSpan={2}>Paid by Borrower</th>
                      <th className="text-center py-2 px-4 border-r border-gray-600 border-b border-gray-600" colSpan={2}>Paid by Seller</th>
                      <th className="text-center py-3 px-4" rowSpan={2}>By Others</th>
                    </tr>
                    <tr>
                      <th className="text-center py-2 px-4 border-r border-gray-600 text-gray-300">At Closing</th>
                      <th className="text-center py-2 px-4 border-r border-gray-600 text-gray-300">Before Closing</th>
                      <th className="text-center py-2 px-4 border-r border-gray-600 text-gray-300">At Closing</th>
                      <th className="text-center py-2 px-4 border-r border-gray-600 text-gray-300">Before Closing</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(lineNumber => renderTableRow(lineNumber))}
                  </tbody>
                  <tfoot className="bg-gray-700">
                    <tr>
                      <th className="text-center py-3 px-4 border-r border-gray-600"></th>
                      <th className="text-left py-3 px-4 border-r border-gray-600"></th>
                      <th className="text-center py-3 px-4 border-r border-gray-600 text-gray-300">Totals</th>
                      <th className="text-right py-3 px-4 border-r border-gray-600 text-gray-300">$0.00</th>
                      <th className="text-right py-3 px-4 border-r border-gray-600 text-gray-300">$0.00</th>
                      <th className="text-right py-3 px-4 border-r border-gray-600 text-gray-300">$0.00</th>
                      <th className="text-right py-3 px-4 border-r border-gray-600 text-gray-300">$0.00</th>
                      <th className="text-right py-3 px-4 text-gray-300">$0.00</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>

            <section className="flex justify-between items-center">
              <div className="flex gap-3">
                <button type="button" className="bg-blue-600 border border-blue-500 rounded px-4 py-2 text-white text-sm hover:bg-blue-700">
                  <i className="fa fa-magic mr-2"></i>
                  Extract From CD
                </button>
                <button type="button" className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500 opacity-50 cursor-not-allowed">
                  Sort Lines
                </button>
              </div>
              <div className="flex gap-3">
                <button type="button" className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500 opacity-50 cursor-not-allowed">
                  Clear
                </button>
                <button type="button" className="bg-blue-600 border border-blue-500 rounded px-4 py-2 text-white text-sm hover:bg-blue-700">
                  Add Contact
                </button>
              </div>
            </section>

            <section className="bg-gray-800 border border-gray-600 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <h4 className="text-lg font-semibold text-white">Payments</h4>
                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">New Fee</span>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between border-b border-gray-600">
                  <div className="flex">
                    {payeeTabs.map((tab, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`px-4 py-2 ${activePayeeTab === index ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-700' : 'text-gray-400'}`}
                        onClick={() => setActivePayeeTab(index)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-white opacity-50 cursor-not-allowed" title="Remove current payee">
                      <i className="fa fa-minus"></i>
                    </button>
                    <button className="p-2 text-blue-400 hover:text-blue-300" title="Add additional payee">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="mb-4">
                  <a href="#" className="text-gray-400 text-sm opacity-50 cursor-not-allowed">
                    <i className="fa fa-list mr-2"></i>
                    Itemize
                  </a>
                </div>

                <div className="mb-6">
                  <div className="flex bg-gray-700 rounded overflow-hidden">
                    {paymentTypes.map(type => (
                      <button
                        key={type.value}
                        type="button"
                        className={`px-4 py-2 ${activePaymentType === type.value ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                        onClick={() => setActivePaymentType(type.value)}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" value={activePaymentType} data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.type" />
                </div>

                <div>
                  {activePaymentType !== 'global payment' && (
                    <>
                      <h5 className="text-base font-semibold text-white mb-4">Payment</h5>
                      <div className="grid grid-cols-3 gap-5 mb-5">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Name</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.name_dep"
                          />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                            Payment Amount
                            <i className="fa fa-lock text-gray-400" title="This field cannot be modified."></i>
                          </label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm cursor-not-allowed"
                            inputMode="decimal"
                            data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.payment_dep"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Label</label>
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                            data-schema-key="cdf.services_borrower_did_not_shop_for.line_04.payees.0.label.payee_label_id"
                            defaultValue="unclassified"
                          >
                            {labelOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {renderPaymentContent()}
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
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">0 / 0</span>
          </div>
          <p className="text-gray-400 text-xs mt-2">You have not been assigned any tasks on this order</p>
        </section>

        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Notes</h4>
          <p className="text-gray-400 text-xs mb-3">No notes have been added to this page</p>
          <button className="w-full px-3 py-2 bg-transparent border border-gray-500 rounded text-gray-300 text-xs hover:bg-gray-600">
            Add Note
          </button>
        </section>
      </section>
    </>
  );
}