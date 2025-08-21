import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const EnvelopesShipping: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [activeTab, setActiveTab] = useState('shipping_labels');
  const [activeEnvelopeTab, setActiveEnvelopeTab] = useState('order');
  const [carrier, setCarrier] = useState('FedEx');
  const [packageType, setPackageType] = useState('FedExEnvelope');
  const [signatureRequired, setSignatureRequired] = useState(false);
  const [isPOBox, setIsPOBox] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);

  const states = [
    'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI',
    'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN',
    'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH',
    'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA',
    'WI', 'WV', 'WY', 'VI'
  ];

  const contacts = [
    'Tom TEST TOM TEST (Borrower)',
    'Bank of Colorado (Lender)',
    'City of Warwick (Recording Office)',
    'City of Warwick, RI Tax Collector (Tax Authority)',
    'CATIC (Underwriter)',
    'First National Title & Escrow (Settlement Agency)',
    'The Law Office of Stephen P. Patti, LLC (Settlement Agency)',
    'First National Title Agency LLC (Settlement Agency)',
    'First National Title Experts, LLC (Settlement Agency)',
    'McDonnell and Associates (Settlement Agency)',
    'Beeline Title, LLC (Settlement Agency)',
    'Landwood Title (Settlement Agency)',
    'FNTE Title Agency of Texas - FNTE Title Agency of Texas (Settlement Agency)'
  ];

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <div className="p-6 border-b border-gray-600">
          <h2 className="text-2xl font-semibold flex items-center">
            <i className="fas fa-envelope mr-3 text-blue-400"></i>
            Mailing
          </h2>
        </div>

        <div className="flex">
          {/* Content Area */}
          <div className="flex-1 p-6">
            {activeTab === 'shipping_labels' && (
              <div className="space-y-6">
                {/* Contact Selector */}
                <div className="flex justify-end">
                  <select 
                    className="bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded"
                    data-schema-key="selectedContact"
                  >
                    <option value="">Select one...</option>
                    {contacts.map((contact, index) => (
                      <option key={index} value={index}>{contact}</option>
                    ))}
                  </select>
                </div>

                {/* Ship To Section */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Ship To</h4>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        data-schema-key="name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        data-schema-key="company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        data-schema-key="phone"
                      />
                    </div>
                  </div>

                  {/* Address Fields */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <i className="fas fa-map-marker-alt absolute left-3 top-3 text-gray-400"></i>
                        <input
                          type="text"
                          placeholder="Search address..."
                          className="w-full bg-gray-700 border border-gray-600 text-white pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          data-schema-key="address_1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Apt, Suite, Etc.
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        data-schema-key="address_2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        data-schema-key="city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        County
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        data-schema-key="county"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        data-schema-key="state"
                      >
                        <option value="">Select one...</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Zipcode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        data-schema-key="zipcode"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={isPOBox}
                        onChange={(e) => setIsPOBox(e.target.checked)}
                        data-schema-key="is_po_box"
                      />
                      <span className="text-gray-300">Is PO Box</span>
                    </label>
                  </div>
                </div>

                {/* Package Details Section */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Package Details</h4>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Carrier
                      </label>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => setCarrier('UPS')}
                          className={`flex-1 px-3 py-2 rounded ${
                            carrier === 'UPS'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          UPS
                        </button>
                        <button
                          onClick={() => setCarrier('FedEx')}
                          className={`flex-1 px-3 py-2 rounded ${
                            carrier === 'FedEx'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          Fed Ex
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Package Type
                        <i className="fas fa-question-circle ml-1 text-gray-400" title="Ground shipping is not available for Envelope or Pack. Letter rates are not available if weight is over 8 oz."></i>
                      </label>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => setPackageType('FedExEnvelope')}
                          className={`flex-1 px-2 py-2 rounded text-sm ${
                            packageType === 'FedExEnvelope'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          Envelope
                        </button>
                        <button
                          onClick={() => setPackageType('FedExPak')}
                          className={`flex-1 px-2 py-2 rounded text-sm ${
                            packageType === 'FedExPak'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          Pack
                        </button>
                        <button
                          onClick={() => setPackageType('other')}
                          className={`flex-1 px-2 py-2 rounded text-sm ${
                            packageType === 'other'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          Other
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Weight (Oz) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        data-schema-key="package_weight"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Require Signature
                      </label>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => setSignatureRequired(false)}
                          className={`flex-1 px-3 py-2 rounded ${
                            !signatureRequired
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          No
                        </button>
                        <button
                          onClick={() => setSignatureRequired(true)}
                          className={`flex-1 px-3 py-2 rounded ${
                            signatureRequired
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Reference Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Closing Docs"
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      data-schema-key="reference"
                    />
                  </div>
                </div>

                {/* Service Type Section */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Service Type</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    The rates below are quotes from the provider. Final shipping cost will be calculated upon package scan and reflected on your carrier's invoice.
                  </p>
                  <div className="bg-gray-800 border border-gray-600 rounded-md p-6 text-center">
                    <p className="text-gray-300 font-semibold">
                      Enter all required fields above to see available delivery options
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'envelopes' && (
              <div className="space-y-6">
                {/* Sub-tabs for Order/Custom Envelopes */}
                <div className="border-b border-gray-600">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveEnvelopeTab('order')}
                      className={`py-3 px-1 border-b-2 font-medium text-sm ${
                        activeEnvelopeTab === 'order'
                          ? 'border-blue-400 text-blue-400'
                          : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                      }`}
                    >
                      Order Envelopes
                    </button>
                    <button
                      onClick={() => setActiveEnvelopeTab('custom')}
                      className={`py-3 px-1 border-b-2 font-medium text-sm ${
                        activeEnvelopeTab === 'custom'
                          ? 'border-blue-400 text-blue-400'
                          : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                      }`}
                    >
                      Custom Envelopes
                    </button>
                  </nav>
                </div>

                {activeEnvelopeTab === 'order' && (
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Select Recipients</h3>
                    
                    {/* Recipients Table */}
                    <div className="bg-gray-800 border border-gray-600 rounded-md overflow-hidden">
                      <table className="w-full">
                        <tbody>
                          {/* Borrower */}
                          <tr className="border-b border-gray-700 hover:bg-gray-750">
                            <td className="p-3 w-12">
                              <i className={`fas fa-check text-green-400`}></i>
                            </td>
                            <td className="p-3 text-gray-300">Borrower</td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <i className="fas fa-edit text-gray-400 cursor-pointer hover:text-white"></i>
                                <i className="fas fa-info-circle text-gray-500"></i>
                                <div>
                                  <div className="text-white font-medium">Tom TEST TOM TEST</div>
                                  <div className="text-gray-400 text-sm">primary address</div>
                                </div>
                              </div>
                            </td>
                          </tr>

                          {/* Borrower Spouse */}
                          <tr className="border-b border-gray-700 hover:bg-gray-750">
                            <td className="p-3 w-12">
                              <i className={`fas fa-check text-green-400`}></i>
                            </td>
                            <td className="p-3 text-gray-300">Borrower Spouse</td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <i className="fas fa-edit text-gray-400 cursor-pointer hover:text-white"></i>
                                <i className="fas fa-info-circle text-gray-500"></i>
                                <div>
                                  <div className="text-white font-medium">Not set</div>
                                  <div className="text-gray-400 text-sm">primary address</div>
                                </div>
                              </div>
                            </td>
                          </tr>

                          {/* Lender */}
                          <tr className="border-b border-gray-700 hover:bg-gray-750">
                            <td className="p-3 w-12">
                              <i className={`fas fa-check text-green-400`}></i>
                            </td>
                            <td className="p-3 text-gray-300">Lender</td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <i className="fas fa-edit text-gray-400 cursor-pointer hover:text-white"></i>
                                <i className="fas fa-info-circle text-gray-500"></i>
                                <div>
                                  <div className="text-white font-medium">Bank of Colorado</div>
                                  <select className="bg-gray-700 border border-gray-600 text-gray-300 text-sm px-2 py-1 rounded">
                                    <option value="0">primary address</option>
                                    <option value="1">commitment address</option>
                                    <option value="2">payment address</option>
                                    <option value="3">cpl address</option>
                                    <option value="4">postProcessing address</option>
                                    <option value="5">lossPayee address</option>
                                    <option value="6">mailing address</option>
                                  </select>
                                </div>
                              </div>
                            </td>
                          </tr>

                          {/* Recording Office */}
                          <tr className="border-b border-gray-700 hover:bg-gray-750">
                            <td className="p-3 w-12">
                              <i className={`fas fa-check text-green-400`}></i>
                            </td>
                            <td className="p-3 text-gray-300">Recording Office</td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <i className="fas fa-edit text-gray-400 cursor-pointer hover:text-white"></i>
                                <i className="fas fa-info-circle text-gray-500"></i>
                                <div>
                                  <div className="text-white font-medium">City of Warwick</div>
                                  <div className="text-gray-400 text-sm">primary address</div>
                                </div>
                              </div>
                            </td>
                          </tr>

                          {/* Tax Authority */}
                          <tr className="border-b border-gray-700 hover:bg-gray-750">
                            <td className="p-3 w-12">
                              <i className={`fas fa-check text-green-400`}></i>
                            </td>
                            <td className="p-3 text-gray-300">Tax Authority</td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <i className="fas fa-edit text-gray-400 cursor-pointer hover:text-white"></i>
                                <i className="fas fa-info-circle text-gray-500"></i>
                                <div>
                                  <div className="text-white font-medium">City of Warwick, RI Tax Collector</div>
                                  <select className="bg-gray-700 border border-gray-600 text-gray-300 text-sm px-2 py-1 rounded">
                                    <option value="0">primary address</option>
                                    <option value="1">mlc address</option>
                                    <option value="2">delinquency address</option>
                                    <option value="3">payment address</option>
                                    <option value="4">mailing address</option>
                                  </select>
                                </div>
                              </div>
                            </td>
                          </tr>

                          {/* Underwriter */}
                          <tr className="border-b border-gray-700 hover:bg-gray-750">
                            <td className="p-3 w-12">
                              <i className={`fas fa-check text-green-400`}></i>
                            </td>
                            <td className="p-3 text-gray-300">Underwriter</td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <i className="fas fa-edit text-gray-400 cursor-pointer hover:text-white"></i>
                                <i className="fas fa-info-circle text-gray-500"></i>
                                <div>
                                  <div className="text-white font-medium">CATIC</div>
                                  <select className="bg-gray-700 border border-gray-600 text-gray-300 text-sm px-2 py-1 rounded">
                                    <option value="0">primary address</option>
                                    <option value="1">mailing address</option>
                                  </select>
                                </div>
                              </div>
                            </td>
                          </tr>

                          {/* Settlement Agency */}
                          <tr className="border-b border-gray-700 hover:bg-gray-750">
                            <td className="p-3 w-12">
                              <i className={`fas fa-check text-green-400`}></i>
                            </td>
                            <td className="p-3 text-gray-300">Settlement Agency</td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <i className="fas fa-edit text-gray-400 cursor-pointer hover:text-white"></i>
                                <i className="fas fa-info-circle text-gray-500"></i>
                                <div>
                                  <div className="text-white font-medium">First National Title & Escrow</div>
                                  <div className="text-gray-400 text-sm">primary address</div>
                                </div>
                              </div>
                            </td>
                          </tr>

                          {/* Seller (disabled) */}
                          <tr className="opacity-50">
                            <td className="p-3 w-12">
                              <i className="fas fa-times text-gray-500"></i>
                            </td>
                            <td className="p-3 text-gray-500">Seller</td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2 text-gray-500">
                                <span>Missing Address</span>
                                <i className="fas fa-exclamation-circle text-yellow-500"></i>
                                <span className="font-medium">Not set</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Print Button */}
                    <div className="bg-gray-800 border border-gray-600 border-t-0 rounded-b-md p-4">
                      <button 
                        className="bg-gray-600 text-gray-400 px-6 py-2 rounded cursor-not-allowed flex items-center"
                        disabled
                        title="Select contacts above to begin printing."
                      >
                        <i className="fas fa-print mr-2"></i>
                        Print Envelopes
                      </button>
                      <div className="mt-3 text-gray-400 text-sm">
                        <span className="font-medium">Trouble Printing?</span>
                        <div className="mt-2 text-gray-500">
                          <p>Be sure to select <strong>Envelope #10</strong> in the print preview window to ensure correct printing.</p>
                          <p className="mt-1">When finished printing envelopes be sure to change the paper size back to <strong>Letter</strong> when printing other order documents.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeEnvelopeTab === 'custom' && (
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Enter Custom Address</h3>
                    
                    {/* Custom Address Form */}
                    <div className="bg-gray-800 border border-gray-600 rounded-md">
                      <div className="p-6">
                        {/* Addressee Name */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Addressee Name
                          </label>
                          <input
                            type="text"
                            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            data-schema-key="addressee_name"
                          />
                        </div>

                        {/* Address Fields */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Address
                            </label>
                            <div className="relative">
                              <i className="fas fa-map-marker-alt absolute left-3 top-3 text-gray-400"></i>
                              <input
                                type="text"
                                placeholder="Search address..."
                                className="w-full bg-gray-700 border border-gray-600 text-white pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                data-schema-key="address_1"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Apt, Suite, Etc.
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              data-schema-key="address_2"
                            />
                          </div>
                        </div>

                        {/* City, County, State, Zipcode */}
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              data-schema-key="city"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              County
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              data-schema-key="county"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              State
                            </label>
                            <select
                              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              data-schema-key="state"
                            >
                              <option value="">Select one...</option>
                              {states.map(state => (
                                <option key={state} value={state}>{state}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Zipcode
                            </label>
                            <input
                              type="text"
                              inputMode="numeric"
                              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              data-schema-key="zipcode"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Print Button Section */}
                      <div className="bg-gray-750 border-t border-gray-600 p-4 rounded-b-md">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center transition-colors">
                          <i className="fas fa-print mr-2"></i>
                          Print Custom Envelope
                        </button>
                        <div className="mt-3 text-gray-400 text-sm">
                          <span className="font-medium">Trouble Printing?</span>
                          <div className="mt-2 text-gray-500">
                            <p>Be sure to select <strong>Envelope #10</strong> in the print preview window to ensure correct printing.</p>
                            <p className="mt-1">When finished printing envelopes be sure to change the paper size back to <strong>Letter</strong> when printing other order documents.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'email_history' && (
              <div className="bg-gray-800 border border-gray-600 rounded-md p-8 text-center">
                <i className="fas fa-history text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-300 mb-4">
                  Email history content will be displayed here
                </h3>
              </div>
            )}
          </div>

          {/* Right Side Menu */}
          <div className="w-64 p-6 border-l border-gray-600">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('shipping_labels')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === 'shipping_labels'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                Shipping Labels
              </button>
              <button
                onClick={() => setActiveTab('envelopes')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === 'envelopes'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                Envelopes
              </button>
              <button
                onClick={() => setActiveTab('email_history')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === 'email_history'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                Email History
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 overflow-y-auto">
        {/* Chat Section */}
        <div className="p-4 border-b border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-white">Chat</h4>
            <i className="fas fa-chevron-down text-gray-400"></i>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <i className="fas fa-volume-mute text-gray-400"></i>
              <i className="fas fa-bars text-gray-400"></i>
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-gray-700 border border-gray-600 text-white text-xs px-2 py-1 rounded"
              />
              <i className="fas fa-plus text-gray-400"></i>
            </div>
            <div className="text-xs">
              <div className="flex space-x-4 mb-2">
                <span className="text-blue-400 border-b border-blue-400 pb-1">All</span>
                <span className="text-gray-400">Messages</span>
                <span className="text-gray-400">Channels</span>
              </div>
              <div className="space-y-1">
                <div className="text-gray-300 font-medium mb-1">Direct Messages</div>
                {/* Online Users */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white text-xs">Tom Duhamel</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white text-xs">Nicole Micciche</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white text-xs">Amber Wurm</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                {/* Idle Users */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300 text-xs">Elizabeth McColeman</span>
                  <span className="text-gray-400 text-xs">Idle 12m</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300 text-xs">John Furtado</span>
                  <span className="text-gray-400 text-xs">Idle 29m</span>
                </div>
                {/* Offline Users */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-300 text-xs">Steve Patti</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-300 text-xs">Brian M. Estus</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="p-4 border-b border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-white">Tasks</h4>
            <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">0 / 0</span>
          </div>
          <div className="bg-gray-700 p-3 rounded text-center text-sm text-gray-300">
            You have not been <a href="#" className="text-blue-400">assigned any tasks</a> on this order
          </div>
        </div>

        {/* Notes Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-white">Notes</h4>
            <i className="fas fa-chevron-up text-gray-400"></i>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-700 p-3 rounded text-center text-sm text-gray-300">
              No notes have been added to this page
            </div>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded transition-colors">
              Add Note
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnvelopesShipping;