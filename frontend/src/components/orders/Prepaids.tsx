import { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

export default function Prepaids() {
  const { loading, saving, handleInputChange, handleSave, getValue } = useOrderData();
  const [activeRow, setActiveRow] = useState(1);
  const [paymentType, setPaymentType] = useState('check');
  const [activeLineForSettings, setActiveLineForSettings] = useState(1);

  const handleRowFocus = (lineNumber: number) => {
    setActiveRow(lineNumber);
    setActiveLineForSettings(lineNumber);
  };

  const handlePaymentTypeChange = (type: string) => {
    setPaymentType(type);
  };

  const renderPaymentContent = () => {
    switch (paymentType) {
      case 'check':
        return (
          <div className="payment-content">
            <h5 className="text-base font-semibold text-white mb-4">Mailing Address</h5>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Address</label>
                <div className="relative">
                  <i className="fa fa-map-marker absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Search address..."
                    data-schema-key="cdfData.prepaid_item_information.line_01.payees.0.address.address_1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Apt, Suite, Etc.</label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="cdfData.prepaid_item_information.line_01.payees.0.address.address_2"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">City</label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="cdfData.prepaid_item_information.line_01.payees.0.address.city"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">State</label>
                <select
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                  data-schema-key="cdfData.prepaid_item_information.line_01.payees.0.address.state"
                >
                  <option value="">Select one...</option>
                  <option value="RI">RI</option>
                  <option value="CA">CA</option>
                  <option value="NY">NY</option>
                  <option value="TX">TX</option>
                  <option value="FL">FL</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Zipcode</label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="cdfData.prepaid_item_information.line_01.payees.0.address.zipcode"
                />
              </div>
            </div>
          </div>
        );

      case 'wire':
        return (
          <div className="payment-content">
            <h5 className="text-base font-semibold text-white mb-4">Wire Instructions</h5>
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
        return <div className="payment-content">{/* Net Funded has no additional fields */}</div>;

      case 'global payment':
        return (
          <div className="payment-content">
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
          <div className="payment-content">
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
          <div className="payment-content">
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
                ></textarea>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderTableRow = (lineNumber: number, isActiveDefault = false) => {
    const lineNumberPadded = lineNumber.toString().padStart(2, '0');
    const isActive = activeRow === lineNumber || isActiveDefault;
    
    // Determine field states for different line types
    const isReadOnlyDescription = lineNumber <= 4; // Lines 01-04 have readonly descriptions
    const isReadOnlyPayee = lineNumber === 3; // Line 03 has readonly payee

    return (
      <tr
        key={lineNumber}
        className={`border-b border-gray-600 hover:bg-gray-700/30 focus-within:bg-gray-700/30 ${
          isActive ? 'active-row bg-blue-500/10' : ''
        }`}
      >
        <td className="py-3 px-4 text-center text-sm text-gray-400">{lineNumberPadded}</td>
        <td className="py-3 px-4">
          <input
            type="text"
            className={`w-full px-3 py-1.5 border border-gray-500 rounded text-sm ${
              isReadOnlyDescription
                ? 'bg-gray-600 text-gray-400'
                : 'bg-gray-700 text-white focus:outline-none focus:border-blue-500'
            }`}
            data-schema-key={`cdfData.prepaid_item_information.line_${lineNumberPadded}.description`}
            value={getValue(`cdfData.prepaid_item_information.line_${lineNumberPadded}.description`)}
            onChange={handleInputChange}
            onFocus={() => handleRowFocus(lineNumber)}
            readOnly={isReadOnlyDescription}
          />
        </td>
        <td className="py-3 px-4">
          <input
            type="text"
            className={`w-full px-3 py-1.5 border border-gray-500 rounded text-sm ${
              isReadOnlyPayee
                ? 'bg-gray-600 text-gray-400'
                : 'bg-gray-700 text-white focus:outline-none focus:border-blue-500'
            }`}
            data-schema-key={`cdfData.prepaid_item_information.line_${lineNumberPadded}.payee_name`}
            value={getValue(`cdfData.prepaid_item_information.line_${lineNumberPadded}.payee_name`)}
            onChange={handleInputChange}
            onFocus={() => handleRowFocus(lineNumber)}
            readOnly={isReadOnlyPayee}
          />
        </td>
        <td className="py-3 px-4">
          <input
            type="text"
            inputMode="decimal"
            className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500"
            data-schema-key={`cdfData.prepaid_item_information.line_${lineNumberPadded}.borrower_amount`}
            value={getValue(`cdfData.prepaid_item_information.line_${lineNumberPadded}.borrower_amount`)}
            onChange={handleInputChange}
            onFocus={() => handleRowFocus(lineNumber)}
          />
        </td>
        <td className="py-3 px-4">
          <input
            type="text"
            inputMode="decimal"
            className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500"
            data-schema-key={`cdfData.prepaid_item_information.line_${lineNumberPadded}.before_borrower_amount`}
            value={getValue(`cdfData.prepaid_item_information.line_${lineNumberPadded}.before_borrower_amount`)}
            onChange={handleInputChange}
            onFocus={() => handleRowFocus(lineNumber)}
          />
        </td>
        <td className="py-3 px-4">
          <input
            type="text"
            inputMode="decimal"
            className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500"
            data-schema-key={`cdfData.prepaid_item_information.line_${lineNumberPadded}.seller_amount`}
            onFocus={() => handleRowFocus(lineNumber)}
          />
        </td>
        <td className="py-3 px-4">
          <input
            type="text"
            inputMode="decimal"
            className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500"
            data-schema-key={`cdfData.prepaid_item_information.line_${lineNumberPadded}.before_seller_amount`}
            onFocus={() => handleRowFocus(lineNumber)}
          />
        </td>
        <td className="py-3 px-4">
          <input
            type="text"
            inputMode="decimal"
            className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500"
            data-schema-key={`cdfData.prepaid_item_information.line_${lineNumberPadded}.paid_by_others_amount`}
            onFocus={() => handleRowFocus(lineNumber)}
          />
        </td>
      </tr>
    );
  };

  if (loading) {
    return (
      <section className="flex-1 bg-gray-900 overflow-y-auto flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <i className="fa fa-spinner fa-spin text-4xl"></i>
          <p className="mt-4">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-shield text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Prepaids</h2>
            <span className="bg-green-600 px-2 py-1 rounded text-xs font-medium">F</span>
          </div>
          <div className="flex gap-3">
            <button 
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 border border-green-500 rounded px-3 py-2 text-white text-sm hover:bg-green-700 disabled:bg-gray-600 disabled:border-gray-500"
            >
              <i className={`fa ${saving ? 'fa-spinner fa-spin' : 'fa-save'} mr-2`}></i>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </section>

        {/* Form Content */}
        <section className="px-10 py-8">
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
            <button
              type="button"
              className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500"
            >
              <i className="fa fa-plus mr-1"></i>
              Add Line
            </button>
          </section>

          <form className="space-y-8">
            {/* Charges Table */}
            <section>
              <table className="w-full bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="w-12 py-3 px-4 text-center border-b border-gray-600"></th>
                    <th className="py-3 px-4 text-left border-b border-gray-600"></th>
                    <th className="py-3 px-4 text-left border-b border-gray-600"></th>
                    <th className="py-3 px-4 text-center border-b border-gray-600" colSpan={2}>
                      Paid by Borrower
                    </th>
                    <th className="py-3 px-4 text-center border-b border-gray-600" colSpan={2}>
                      Paid by Seller
                    </th>
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
                    <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">By Others</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTableRow(1, true)}
                  {renderTableRow(2)}
                  {renderTableRow(3)}
                  {renderTableRow(4)}
                  {renderTableRow(5)}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-700">
                    <th className="py-3 px-4"></th>
                    <th className="py-3 px-4"></th>
                    <th className="py-3 px-4 text-right text-sm text-gray-300">Totals</th>
                    <th className="py-3 px-4 text-center text-sm text-white">$0.00</th>
                    <th className="py-3 px-4 text-center text-sm text-white">$0.00</th>
                    <th className="py-3 px-4 text-center text-sm text-white">$0.00</th>
                    <th className="py-3 px-4 text-center text-sm text-white">$0.00</th>
                    <th className="py-3 px-4 text-center text-sm text-white">$0.00</th>
                  </tr>
                </tfoot>
              </table>
            </section>

            {/* Action Buttons */}
            <section className="flex justify-between items-center">
              <div className="flex gap-3">
                <button
                  type="button"
                  className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500 flex items-center gap-2"
                >
                  <i className="fa fa-file-text-o"></i>
                  Extract From CD
                </button>
                <button
                  type="button"
                  className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  Sort Lines
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="bg-blue-600 border border-blue-600 rounded px-4 py-2 text-white text-sm hover:bg-blue-700"
                >
                  Add Contact
                </button>
              </div>
            </section>

            {/* Settings Section */}
            <section>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                Settings
                <span className="bg-green-600 px-3 py-1 rounded text-sm">
                  Line {activeLineForSettings.toString().padStart(2, '0')}
                </span>
              </h4>
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-16 gap-4 items-end">
                  <div className="col-span-5">
                    <label className="block text-sm text-gray-300 mb-2">
                      Description
                      <i className="fa fa-lock text-gray-500 ml-1"></i>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm"
                      data-schema-key={`cdfData.prepaid_item_information.line_${activeLineForSettings.toString().padStart(2, '0')}.description`}
                      readOnly
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-sm text-gray-300 mb-2"># of Months</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      data-schema-key={`cdfData.prepaid_item_information.line_${activeLineForSettings.toString().padStart(2, '0')}.number_of_months`}
                    />
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="bg-gray-600 px-3 py-2.5 rounded text-gray-300 text-sm">months</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Payments Section */}
            <section>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                Payments
                <span className="bg-green-600 px-3 py-1 rounded text-sm">Homeowner's Insurance Premium</span>
              </h4>

              {/* Payee Tabs */}
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <div className="bg-gray-700 px-6 py-3 flex items-center justify-between border-b border-gray-600">
                  <div className="flex items-center gap-4">
                    <span className="text-white">New Payee</span>
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
                  {/* Payment Type Toggle */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <a href="#" className="text-gray-500 text-sm flex items-center gap-2 pointer-events-none">
                        <i className="fa fa-list"></i>
                        Itemize
                      </a>
                    </div>

                    <div className="flex border-b border-gray-600">
                      <button
                        type="button"
                        className={`px-4 py-2 border-b-2 ${
                          paymentType === 'check'
                            ? 'text-blue-400 border-blue-400'
                            : 'text-gray-400 border-transparent hover:text-white hover:border-gray-400'
                        }`}
                        onClick={() => handlePaymentTypeChange('check')}
                      >
                        Check
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 border-b-2 ${
                          paymentType === 'wire'
                            ? 'text-blue-400 border-blue-400'
                            : 'text-gray-400 border-transparent hover:text-white hover:border-gray-400'
                        }`}
                        onClick={() => handlePaymentTypeChange('wire')}
                      >
                        Wire
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 border-b-2 ${
                          paymentType === 'net funded'
                            ? 'text-blue-400 border-blue-400'
                            : 'text-gray-400 border-transparent hover:text-white hover:border-gray-400'
                        }`}
                        onClick={() => handlePaymentTypeChange('net funded')}
                      >
                        Net Funded
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 border-b-2 ${
                          paymentType === 'global payment'
                            ? 'text-blue-400 border-blue-400'
                            : 'text-gray-400 border-transparent hover:text-white hover:border-gray-400'
                        }`}
                        onClick={() => handlePaymentTypeChange('global payment')}
                      >
                        Aggregate
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 border-b-2 ${
                          paymentType === 'order transfer'
                            ? 'text-blue-400 border-blue-400'
                            : 'text-gray-400 border-transparent hover:text-white hover:border-gray-400'
                        }`}
                        onClick={() => handlePaymentTypeChange('order transfer')}
                      >
                        Transfer
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 border-b-2 ${
                          paymentType === 'holdback'
                            ? 'text-blue-400 border-blue-400'
                            : 'text-gray-400 border-transparent hover:text-white hover:border-gray-400'
                        }`}
                        onClick={() => handlePaymentTypeChange('holdback')}
                      >
                        Holdback
                      </button>
                    </div>
                    <input
                      type="hidden"
                      value={paymentType}
                      data-schema-key="cdfData.prepaid_item_information.line_01.payees.0.type"
                    />
                  </div>

                  {/* Standard Payment Fields */}
                  {paymentType !== 'global payment' && (
                    <div id="standard-payment-fields">
                      <h5 className="text-base font-semibold text-white mb-4">Payment</h5>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Name</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key="cdfData.prepaid_item_information.line_01.payees.0.name_dep"
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
                            data-schema-key="cdfData.prepaid_item_information.line_01.payees.0.payment_dep"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Label</label>
                          <select
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                            data-schema-key="cdfData.prepaid_item_information.line_01.payees.0.label.payee_label_id"
                          >
                            <option value="insurance" selected>
                              Insurance
                            </option>
                            <option value="lenders_policy">Lender's Policy</option>
                            <option value="owners_policy">Owner's Policy</option>
                            <option value="payoff">Payoff</option>
                            <option value="property_tax">Property Tax</option>
                            <option value="recording_fee">Recording Fee</option>
                            <option value="reimbursement">Reimbursement</option>
                            <option value="sales_tax">Sales Tax</option>
                            <option value="settlement_fee">Settlement Fee</option>
                            <option value="transfer_tax">Transfer Tax</option>
                            <option value="excluded">Excluded</option>
                            <option value="unclassified">Unclassified</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 mb-6">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Memo</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key="cdfData.prepaid_item_information.line_01.payees.0.reference_number"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Type Specific Content */}
                  <div id="payment-type-content">{renderPaymentContent()}</div>
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
}