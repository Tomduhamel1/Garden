import React, { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

interface Document {
  id: string;
  type: string;
  attributes: { [key: string]: any };
}

interface PaymentType {
  value: string;
  label: string;
}

const TaxesAndFees: React.FC = () => {
  const { loading, saving, handleInputChange, handleSave, getValue } = useOrderData();
  const [activeRow, setActiveRow] = useState<number>(1);
  const [activePaymentType, setActivePaymentType] = useState('check');
  const [showDocumentDropdown, setShowDocumentDropdown] = useState(false);
  const [documentSearch, setDocumentSearch] = useState('');
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'deed',
      type: 'Deed',
      attributes: {
        pages: '',
        consideration: '',
        taxable: true
      }
    },
    {
      id: 'mortgage',
      type: 'Mortgage',
      attributes: {
        pages: ''
      }
    }
  ]);

  const paymentTypes: PaymentType[] = [
    { value: 'check', label: 'Check' },
    { value: 'wire', label: 'Wire' },
    { value: 'net funded', label: 'Net Funded' },
    { value: 'global payment', label: 'Aggregate' },
    { value: 'order transfer', label: 'Transfer' },
    { value: 'holdback', label: 'Holdback' },
  ];

  const documentOptions = [
    'deed', 'mortgage', 'affidavit', 'assignment of mortgage or lease',
    'discharge of mortgage', 'easement', 'lease', 'power of attorney'
  ];

  const stateOptions = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI',
    'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN',
    'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH',
    'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA',
    'WI', 'WV', 'WY', 'VI'];

  const labelOptions = [
    'insurance', 'lenders_policy', 'owners_policy', 'payoff', 'property_tax',
    'recording_fee', 'reimbursement', 'sales_tax', 'settlement_fee',
    'transfer_tax', 'excluded', 'unclassified'
  ];

  const renderTableRow = (lineNumber: number) => {
    const isActive = activeRow === lineNumber;
    const lineKey = `line_${lineNumber.toString().padStart(2, '0')}`;

    return (
      <tr 
        key={lineNumber}
        className={`border-b border-gray-600 hover:bg-gray-700/30 focus-within:bg-gray-700/30 ${isActive ? 'bg-blue-600/10' : ''}`}
      >
        <td className="py-3 px-4 text-center text-sm text-gray-400">
          {lineNumber.toString().padStart(2, '0')}
        </td>
        <td className="py-3 px-4">
          <input 
            type="text" 
            className={`w-full px-3 py-1.5 border border-gray-500 rounded text-sm focus:outline-none focus:border-blue-500 ${
              lineNumber === 1 ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'
            }`}
            readOnly={lineNumber === 1}
            data-schema-key={`cdf.taxes_and_government_fees.${lineKey}.description`}
            onFocus={() => setActiveRow(lineNumber)}
          />
        </td>
        <td className="py-3 px-4">
          <div className="relative">
            <input 
              type="text" 
              className="w-full pl-3 pr-8 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
              data-schema-key={`cdf.taxes_and_government_fees.${lineKey}.payee_name`}
              onFocus={() => setActiveRow(lineNumber)}
            />
            {lineNumber > 1 && (
              <button 
                type="button" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <i className="fa fa-times"></i>
              </button>
            )}
          </div>
        </td>
        <td className="py-3 px-4">
          <input 
            type="text" 
            inputMode="decimal"
            className={`w-full px-3 py-1.5 border border-gray-500 rounded text-sm text-right focus:outline-none focus:border-blue-500 ${
              lineNumber === 1 ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'
            }`}
            readOnly={lineNumber === 1}
            data-schema-key={`cdf.taxes_and_government_fees.${lineKey}.borrower_amount`}
            value={getValue(`cdf.taxes_and_government_fees.${lineKey}.borrower_amount`)}
            onChange={handleInputChange}
            onFocus={() => setActiveRow(lineNumber)}
          />
        </td>
        <td className="py-3 px-4">
          <input 
            type="text" 
            inputMode="decimal"
            className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500"
            data-schema-key={`cdf.taxes_and_government_fees.${lineKey}.before_borrower_amount`}
            value={getValue(`cdf.taxes_and_government_fees.${lineKey}.before_borrower_amount`)}
            onChange={handleInputChange}
            onFocus={() => setActiveRow(lineNumber)}
          />
        </td>
        <td className="py-3 px-4">
          <div className="relative">
            <input 
              type="text" 
              inputMode="decimal"
              className={`w-full pl-3 pr-8 py-1.5 border border-gray-500 rounded text-sm text-right focus:outline-none focus:border-blue-500 ${
                lineNumber === 1 ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'
              }`}
              readOnly={lineNumber === 1}
              data-schema-key={`cdf.taxes_and_government_fees.${lineKey}.seller_amount`}
              onFocus={() => setActiveRow(lineNumber)}
            />
            {lineNumber > 1 && (
              <button 
                type="button" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <i className="fa fa-times"></i>
              </button>
            )}
          </div>
        </td>
        <td className="py-3 px-4">
          <input 
            type="text" 
            inputMode="decimal"
            className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500"
            data-schema-key={`cdf.taxes_and_government_fees.${lineKey}.before_seller_amount`}
            onFocus={() => setActiveRow(lineNumber)}
          />
        </td>
        <td className="py-3 px-4">
          <input 
            type="text" 
            inputMode="decimal"
            className={`w-full px-3 py-1.5 border border-gray-500 rounded text-sm text-right focus:outline-none focus:border-blue-500 ${
              lineNumber === 1 ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'
            }`}
            readOnly={lineNumber === 1}
            data-schema-key={`cdf.taxes_and_government_fees.${lineKey}.paid_by_others_amount`}
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
          <div>
            <h5 className="text-base font-semibold text-white mb-4">Mailing Address</h5>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Address</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full pl-3 pr-8 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Search address..."
                    data-schema-key="cdf.taxes_and_government_fees.line_01.payees.0.address.address_1"
                  />
                  <button 
                    type="button" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    title="Clear Mailing Address"
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Apt, Suite, Etc.</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="cdf.taxes_and_government_fees.line_01.payees.0.address.address_2"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">City</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="cdf.taxes_and_government_fees.line_01.payees.0.address.city"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">State</label>
                <div className="relative">
                  <select 
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                    data-schema-key="cdf.taxes_and_government_fees.line_01.payees.0.address.state"
                    defaultValue="RI"
                  >
                    {stateOptions.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <button 
                    type="button" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Zipcode</label>
                <input 
                  type="text" 
                  inputMode="numeric"
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  data-schema-key="cdf.taxes_and_government_fees.line_01.payees.0.address.zipcode"
                />
              </div>
            </div>
          </div>
        );

      case 'wire':
        return (
          <div>
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
        return null;

      case 'global payment':
        return (
          <div>
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
          <div>
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
          <div>
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

  const filteredDocumentOptions = documentOptions.filter(doc => 
    doc.toLowerCase().includes(documentSearch.toLowerCase())
  );

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
            <i className="fa fa-university text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Taxes and Other Government Fees</h2>
            <span className="bg-green-600 px-2 py-1 rounded text-xs font-medium">E</span>
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
          {/* Process Flow */}
          <section className="mb-8">
            <div className="flex bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
              <div className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-center border-r border-gray-600">
                <div className="flex items-center justify-center gap-3">
                  <i className="fa fa-file-text text-white text-lg"></i>
                  <div>
                    <div className="text-white font-medium">Add Documents</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-gray-700 p-4 text-center">
                <div className="flex items-center justify-center gap-3">
                  <i className="fa fa-check text-gray-400 text-lg"></i>
                  <div>
                    <div className="text-gray-400 font-medium">View Taxes & Fees</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tax Calculator Section */}
          <section className="bg-gray-800 border border-gray-600 rounded-lg p-6 mb-8">
            <form className="space-y-8">
              {/* Tax Details */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Tax Details</h4>
                <div className="bg-gray-700 border border-gray-600 rounded p-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Sales Tax Rate</label>
                      <input 
                        type="text" 
                        inputMode="decimal"
                        className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="accounting.closing_tax_rate"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Details */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">Document Details</h4>
                  <div className="relative">
                    <button 
                      type="button" 
                      className="bg-blue-600 border border-blue-600 rounded px-4 py-2 text-white text-sm hover:bg-blue-700 flex items-center gap-2"
                      onClick={() => setShowDocumentDropdown(!showDocumentDropdown)}
                    >
                      Add Document
                      <i className="fa fa-chevron-down"></i>
                    </button>
                    {showDocumentDropdown && (
                      <div className="absolute right-0 top-full mt-1 w-64 bg-gray-700 border border-gray-600 rounded shadow-lg z-10">
                        <div className="p-3 border-b border-gray-600">
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Search documents..."
                            value={documentSearch}
                            onChange={(e) => setDocumentSearch(e.target.value)}
                          />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {filteredDocumentOptions.map(doc => (
                            <div 
                              key={doc}
                              className="px-3 py-2 hover:bg-gray-600 cursor-pointer text-sm"
                              onClick={() => setShowDocumentDropdown(false)}
                            >
                              {doc}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-6">We just need a few details about your documents to correctly calculate the local fees.</p>
                
                <div className="grid grid-cols-2 gap-6">
                  {documents.map((doc, index) => (
                    <div key={doc.id} className="bg-gray-700 border border-gray-600 rounded-lg overflow-hidden">
                      <div className="bg-gray-600 p-3 flex items-center justify-between border-b border-gray-600">
                        <h5 className="text-white font-medium text-center flex-1">{doc.type}</h5>
                        <button 
                          type="button" 
                          className="text-gray-400 hover:text-white"
                          title="Remove Document"
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                      <div className="p-4">
                        <table className="w-full">
                          <tbody>
                            <tr className={`border-b ${doc.id === 'mortgage' && !doc.attributes.pages ? 'border-red-500' : 'border-gray-600'}`}>
                              <td className="py-3 text-sm text-gray-300">Number of Pages</td>
                              <td className="py-3">
                                <input 
                                  type="text" 
                                  className={`w-full px-3 py-1.5 bg-gray-600 rounded text-white text-sm focus:outline-none ${
                                    doc.id === 'mortgage' && !doc.attributes.pages ? 'border border-red-500' : 'border border-gray-500 focus:border-blue-500'
                                  }`}
                                  placeholder="count"
                                  data-schema-key={`quotingservice_documents.${index}.attributes.0.value`}
                                />
                              </td>
                            </tr>
                            {doc.id === 'deed' && (
                              <>
                                <tr className="border-b border-gray-600">
                                  <td className="py-3 text-sm text-gray-300">Consideration Amount</td>
                                  <td className="py-3">
                                    <input 
                                      type="text" 
                                      inputMode="decimal"
                                      className="w-full px-3 py-1.5 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                                      placeholder="amount"
                                      data-schema-key={`quotingservice_documents.${index}.attributes.1.value`}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-3 text-sm text-gray-300">Taxable?</td>
                                  <td className="py-3">
                                    <div className="flex bg-gray-600 border border-gray-500 rounded overflow-hidden">
                                      <button 
                                        type="button" 
                                        className={`flex-1 px-3 py-1.5 text-sm font-medium ${
                                          doc.attributes.taxable ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                        }`}
                                        onClick={() => {
                                          const newDocs = [...documents];
                                          newDocs[index].attributes.taxable = true;
                                          setDocuments(newDocs);
                                        }}
                                      >
                                        Yes
                                      </button>
                                      <button 
                                        type="button" 
                                        className={`flex-1 px-3 py-1.5 text-sm font-medium ${
                                          !doc.attributes.taxable ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                        }`}
                                        onClick={() => {
                                          const newDocs = [...documents];
                                          newDocs[index].attributes.taxable = false;
                                          setDocuments(newDocs);
                                        }}
                                      >
                                        No
                                      </button>
                                    </div>
                                    <input 
                                      type="hidden" 
                                      data-schema-key={`quotingservice_documents.${index}.attributes.2.value`}
                                      value={doc.attributes.taxable.toString()}
                                    />
                                  </td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <button 
                    type="button" 
                    className="bg-blue-600 border border-blue-600 rounded px-6 py-2.5 text-white text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled
                  >
                    Calculate Fees
                  </button>
                </div>
              </div>
            </form>
          </section>

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
                    <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">By Others</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map(lineNumber => renderTableRow(lineNumber))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-700">
                    <th className="py-3 px-4"></th>
                    <th className="py-3 px-4"></th>
                    <th className="py-3 px-4 text-right text-sm text-gray-300">Totals</th>
                    <th className="py-3 px-4 text-center text-sm text-white">$0.00</th>
                    <th className="py-3 px-4 text-center text-sm text-white">$0.00</th>
                    <th className="py-3 px-4 text-center text-sm text-white">$230.00</th>
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
                  className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500"
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
                <span className="bg-green-600 px-3 py-1 rounded text-sm">Line {activeRow.toString().padStart(2, '0')}</span>
              </h4>
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 mb-6">
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Recording Type</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm"
                        value="Deed"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Deed Amount</label>
                      <input 
                        type="text" 
                        inputMode="decimal"
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="cdf.taxes_and_government_fees.line_01.deed_amount"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-300 mb-2">Paid By</label>
                      <div className="flex bg-gray-700 border border-gray-500 rounded overflow-hidden">
                        <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Buyer</button>
                        <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Seller</button>
                        <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Split</button>
                        <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Paid By Others</button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Recording Type</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm"
                        value="Mortgage"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Mortgage Amount</label>
                      <input 
                        type="text" 
                        inputMode="decimal"
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="cdf.taxes_and_government_fees.line_01.mortgage_amount"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-300 mb-2">Paid By</label>
                      <div className="flex bg-gray-700 border border-gray-500 rounded overflow-hidden">
                        <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Buyer</button>
                        <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Seller</button>
                        <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Split</button>
                        <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Paid By Others</button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      type="button" 
                      className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500 disabled:opacity-50"
                      disabled
                    >
                      Remove
                    </button>
                    <button 
                      type="button" 
                      className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Payments Section */}
            <section>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                Payments
                <span className="bg-green-600 px-3 py-1 rounded text-sm">Recording fees</span>
              </h4>
              
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <div className="bg-gray-700 px-6 py-3 flex items-center justify-between border-b border-gray-600">
                  <div className="flex items-center gap-4">
                    <span className="text-white">City of Warwick</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      className="text-gray-400 hover:text-white disabled:opacity-50"
                      disabled
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                    <button 
                      type="button" 
                      className="text-gray-400 hover:text-white"
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Payment Type Toggle */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <a 
                        href="#" 
                        className="text-gray-500 text-sm flex items-center gap-2 pointer-events-none"
                      >
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
                              : 'text-gray-400 hover:text-white border-transparent hover:border-gray-400'
                          }`}
                          onClick={() => setActivePaymentType(type.value)}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                    <input 
                      type="hidden" 
                      value={activePaymentType}
                      data-schema-key="cdf.taxes_and_government_fees.line_01.payees.0.type"
                    />
                  </div>
                  
                  {/* Standard Payment Fields */}
                  {activePaymentType !== 'global payment' && (
                    <div>
                      <h5 className="text-base font-semibold text-white mb-4">Payment</h5>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Name</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key="cdf.taxes_and_government_fees.line_01.payees.0.name_dep"
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
                            data-schema-key="cdf.taxes_and_government_fees.line_01.payees.0.payment_dep"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Label</label>
                          <select 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                            data-schema-key="cdf.taxes_and_government_fees.line_01.payees.0.label.payee_label_id"
                            defaultValue="recording_fee"
                          >
                            {labelOptions.map(option => (
                              <option key={option} value={option}>
                                {option.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Memo</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key="cdf.taxes_and_government_fees.line_01.payees.0.reference_number"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Payment Type Specific Content */}
                  <div>
                    {renderPaymentContent()}
                  </div>
                  
                  {/* Disbursement */}
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
                          defaultValue="no"
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

export default TaxesAndFees;