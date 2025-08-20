import React, { useState } from 'react';

interface ContactsSellerInfoProps {}

const ContactsSellerInfo: React.FC<ContactsSellerInfoProps> = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sellerType, setSellerType] = useState('individual');
  const [sellerData, setSellerData] = useState({
    // Basic Info
    search_existing: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    organization_name: '',
    email: '',
    phone: '',
    ssn: '',
    
    // Address fields would go here
    
    // Attorney fields would go here
    
    // Signature & Vesting fields would go here
    
    // Notary fields would go here
  });

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const handleInputChange = (field: string, value: string) => {
    setSellerData(prev => ({ ...prev, [field]: value }));
  };

  const tabs = ['Info', 'Addresses', 'Attorney', 'Signature & Vesting', 'Notary Blocks'];

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 flex">
        {/* Content Area */}
        <section className="flex-1 p-10">
          {/* Page Header */}
          <section className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-600">
            <div className="flex items-center gap-4">
              <i className="fa fa-users text-gray-400 text-xl"></i>
              <h2 className="text-2xl font-semibold">Contacts</h2>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500">
                <i className="fa fa-plus mr-1"></i>
                Add Seller
              </button>
              <button className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-gray-400 text-sm opacity-50 cursor-not-allowed">
                <i className="fa fa-minus mr-1"></i>
                Remove Seller
              </button>
            </div>
          </section>

          {/* Individual Seller Tab */}
          <section className="mb-5">
            <div className="bg-gray-700 px-5 py-3 inline-block border-t-2 border-t-blue-500 text-blue-400">
              <span>Seller #1</span>
            </div>
          </section>

          {/* Sub Tabs with Type Dropdown */}
          <section className="flex items-center justify-between mb-8 border-b border-gray-600">
            <div className="flex">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`px-5 py-3 bg-transparent border-none text-sm cursor-pointer border-b-2 ${
                    activeTab === index
                      ? 'text-blue-400 border-b-blue-400'
                      : 'text-gray-400 border-b-transparent hover:text-gray-300'
                  }`}
                  onClick={() => handleTabClick(index)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="mb-3">
              <select 
                className="px-3 py-2 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
                data-schema-key="contacts.sellers.0.type"
                value={sellerType}
                onChange={(e) => setSellerType(e.target.value)}
              >
                <option value="individual">Individual</option>
                <option value="organization">Organization</option>
              </select>
            </div>
          </section>

          {/* Tab Content */}
          <section className="tab-content">
            {activeTab === 0 && (
              <form className="space-y-8">
                {/* Search Existing Sellers */}
                <section className="mb-6">
                  <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Basic Info</h3>
                  <div className="mb-5">
                    <div className="relative">
                      <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input 
                        type="text" 
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        placeholder="Search existing sellers..."
                        data-schema-key="customerName"
                        value={sellerData.search_existing}
                        onChange={(e) => handleInputChange('search_existing', e.target.value)}
                      />
                    </div>
                  </div>
                </section>

                {/* Name Fields */}
                <section>
                  {sellerType === 'individual' ? (
                    <div className="grid grid-cols-4 gap-5 mb-5">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">First Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          data-schema-key="contacts.sellers.0.first_name"
                          value={sellerData.first_name}
                          onChange={(e) => handleInputChange('first_name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Middle Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          data-schema-key="contacts.sellers.0.middle_name"
                          value={sellerData.middle_name}
                          onChange={(e) => handleInputChange('middle_name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Last Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          data-schema-key="contacts.sellers.0.last_name"
                          value={sellerData.last_name}
                          onChange={(e) => handleInputChange('last_name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Suffix</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          data-schema-key="contacts.sellers.0.suffix"
                          value={sellerData.suffix}
                          onChange={(e) => handleInputChange('suffix', e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mb-5">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Organization Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          data-schema-key="contacts.sellers.0.organization_name"
                          value={sellerData.organization_name}
                          onChange={(e) => handleInputChange('organization_name', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="grid grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="contacts.sellers.0.email"
                        value={sellerData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Phone</label>
                      <input 
                        type="tel" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="contacts.sellers.0.phone"
                        value={sellerData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  {sellerType === 'individual' && (
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">SSN</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          data-schema-key="contacts.sellers.0.ssn"
                          value={sellerData.ssn}
                          onChange={(e) => handleInputChange('ssn', e.target.value)}
                          placeholder="XXX-XX-XXXX"
                        />
                      </div>
                    </div>
                  )}
                </section>
              </form>
            )}

            {activeTab > 0 && (
              <div className="text-center py-20 text-gray-500">
                <h3 className="text-lg mb-2">{tabs[activeTab]} Content</h3>
                <p className="text-sm">This tab would contain {tabs[activeTab].toLowerCase()} specific fields for the seller</p>
              </div>
            )}
          </section>
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

export default ContactsSellerInfo;