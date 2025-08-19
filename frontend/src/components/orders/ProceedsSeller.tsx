import { useState } from 'react';

export default function ProceedsSeller() {
  const [paymentType, setPaymentType] = useState('check');

  const handlePaymentTypeChange = (type: string) => {
    setPaymentType(type);
  };

  const stateOptions = [
    '', 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 
    'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 
    'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 
    'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 
    'WI', 'WV', 'WY', 'VI'
  ];

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-home text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Proceeds for Seller</h2>
          </div>
        </section>

        {/* Form Content */}
        <section className="px-10 py-8">
          <form className="space-y-8">
            {/* Payments Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <h4 className="text-lg font-semibold text-white">Payments</h4>
                <span className="bg-green-600 px-3 py-1 rounded text-sm font-medium">Seller</span>
              </div>

              {/* Payee Tabs */}
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                {/* Payee Tab Header */}
                <div className="bg-gray-700 border-b border-gray-600 flex items-center justify-between px-6 py-3">
                  <div className="flex">
                    <button type="button" className="px-4 py-2 bg-gray-600 text-white text-sm rounded-l border-r border-gray-500">
                      New Payee
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded disabled:opacity-50" disabled>
                      <i className="fa fa-minus"></i>
                    </button>
                    <button type="button" className="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>

                {/* Payment Content */}
                <div className="p-6 space-y-6">
                  {/* Payment Type Tabs */}
                  <div className="border-b border-gray-600">
                    <div className="flex space-x-0">
                      <input type="hidden" value={paymentType} data-schema-key="contacts.seller_payees.0.type" />
                      <button
                        type="button"
                        className={`px-4 py-2 border-b-2 font-medium ${paymentType === 'check' ? 'border-blue-500 text-blue-500' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => handlePaymentTypeChange('check')}
                      >
                        Check
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 ${paymentType === 'wire' ? 'border-blue-500 text-blue-500' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => handlePaymentTypeChange('wire')}
                      >
                        Wire
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 ${paymentType === 'net funded' ? 'border-blue-500 text-blue-500' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => handlePaymentTypeChange('net funded')}
                      >
                        Net Funded
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 ${paymentType === 'aggregate' ? 'border-blue-500 text-blue-500' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => handlePaymentTypeChange('aggregate')}
                      >
                        Aggregate
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 ${paymentType === 'transfer' ? 'border-blue-500 text-blue-500' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => handlePaymentTypeChange('transfer')}
                      >
                        Transfer
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 ${paymentType === 'holdback' ? 'border-blue-500 text-blue-500' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => handlePaymentTypeChange('holdback')}
                      >
                        Holdback
                      </button>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="space-y-6">
                    <h5 className="text-base font-medium text-white">Payment</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          data-schema-key="contacts.seller_payees.0.name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Payment Amount
                          <i className="fa fa-lock ml-1 text-gray-400" title="This field cannot be modified"></i>
                        </label>
                        <input
                          type="text"
                          inputMode="decimal"
                          readOnly
                          className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm cursor-not-allowed"
                          data-schema-key="contacts.seller_payees.0.payment_dep"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Memo</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          data-schema-key="contacts.seller_payees.0.reference_number"
                        />
                      </div>
                    </div>

                    {/* Mailing Address */}
                    <div className="space-y-4">
                      <h5 className="text-base font-medium text-white">Mailing Address</h5>
                      
                      <input type="hidden" data-schema-key="contacts.seller_payees.0.address.latitude" />
                      <input type="hidden" data-schema-key="contacts.seller_payees.0.address.longitude" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Search address..."
                              className="w-full px-3 py-2.5 pl-10 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                              data-schema-key="contacts.seller_payees.0.address.address_1"
                            />
                            <i className="fa fa-map-marker absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Apt, Suite, Etc.</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key="contacts.seller_payees.0.address.address_2"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key="contacts.seller_payees.0.address.city"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                          <div className="relative">
                            <select
                              className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                              data-schema-key="contacts.seller_payees.0.address.state"
                            >
                              <option value="" selected>Select one...</option>
                              {stateOptions.slice(1).map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                            </select>
                            <i className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Zipcode</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                            data-schema-key="contacts.seller_payees.0.address.zipcode"
                          />
                        </div>
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
}