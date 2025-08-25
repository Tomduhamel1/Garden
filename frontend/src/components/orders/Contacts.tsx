import React, { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

type ContactType = 'buyers' | 'sellers' | 'lenders' | 'mortgageBrokerages' | 'sellingAgencies' | 'listingAgencies' | 'recordingOffices' | 'taxAuthorities' | 'titleAbstractors' | 'surveyingFirms' | 'otherContacts';
type TabType = 'info' | 'addresses' | 'attorney' | 'signature' | 'notary';
type PersonType = 'individual' | 'organization';

const Contacts: React.FC = () => {
  const { loading, saving, handleInputChange, handleSave, getValue, orderData } = useOrderData();
  const [activeContactType, setActiveContactType] = useState<ContactType>('buyers');
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [personType, setPersonType] = useState<PersonType>('individual');
  const [activeBorrowerIndex, setActiveBorrowerIndex] = useState(0);
  const [activeSellerIndex, setActiveSellerIndex] = useState(0);

  // Map contact types to display names (matching original HTML)
  const contactTypeLabels: Record<ContactType, string> = {
    buyers: 'Buyers',
    sellers: 'Sellers', 
    lenders: 'Lenders',
    mortgageBrokerages: 'Mortgage Brokerages',
    sellingAgencies: 'Selling Agencies',
    listingAgencies: 'Listing Agencies',
    recordingOffices: 'Recording Offices',
    taxAuthorities: 'Tax Authorities',
    titleAbstractors: 'Title Abstractors',
    surveyingFirms: 'Surveying Firms',
    otherContacts: 'Other Contacts'
  };

  // Determine if we're showing borrower or seller forms
  const showBorrowerForms = activeContactType === 'buyers';
  const showSellerForms = activeContactType === 'sellers';
  const showOtherForms = !showBorrowerForms && !showSellerForms;

  // Get names from data
  const borrowerName = getValue(`contactsData.borrowers.${activeBorrowerIndex}.first_name`) || '' + ' ' + 
                      getValue(`contactsData.borrowers.${activeBorrowerIndex}.last_name`) || "Borrower";
  const sellerName = getValue(`contactsData.sellers.${activeSellerIndex}.first_name`) || '' + ' ' +
                     getValue(`contactsData.sellers.${activeSellerIndex}.last_name`) || "Seller";

  // Handle contact type change (matching original functionality)
  const handleContactTypeChange = (contactType: ContactType) => {
    setActiveContactType(contactType);
    setActiveTab('info'); // Reset to info tab when changing contact type
  };

  if (loading) {
    return (
      <>
        <section className="flex-1 bg-gray-900 overflow-y-auto flex items-center justify-center">
          <div className="text-gray-400">
            <i className="fa fa-spinner fa-spin text-4xl"></i>
            <p className="mt-4">Loading contacts...</p>
          </div>
        </section>
        
        {/* Contact Types Menu - Right Sidebar */}
        <section className="w-48 bg-gray-800 border-l border-gray-600 py-5">
          <div className="text-gray-400 text-center">Loading...</div>
        </section>
      </>
    );
  }

  const renderContactTabs = () => {
    // Only show tabs for buyers/sellers (matching original)
    if (!showBorrowerForms && !showSellerForms) return null;

    return (
      <>
        {/* Individual Contact Tab */}
        <section className="mb-5">
          <div className="bg-gray-700 px-5 py-3 inline-block border-t-2 border-t-blue-500 text-blue-400">
            <span>{showBorrowerForms ? borrowerName : sellerName}</span>
          </div>
        </section>

        {/* Sub Tabs - Info, Addresses, Attorney, Signature & Vesting, Notary Blocks */}
        <section className="flex items-center justify-between mb-8 border-b border-gray-600">
          <div className="flex">
            <button 
              className={`px-5 py-3 bg-transparent border-none text-sm cursor-pointer border-b-2 ${
                activeTab === 'info' ? 'text-blue-400 border-b-blue-400' : 'text-gray-400 border-b-transparent hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('info')}
            >
              Info
            </button>
            <button 
              className={`px-5 py-3 bg-transparent border-none text-sm cursor-pointer border-b-2 ${
                activeTab === 'addresses' ? 'text-blue-400 border-b-blue-400' : 'text-gray-400 border-b-transparent hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('addresses')}
            >
              Addresses
            </button>
            <button 
              className={`px-5 py-3 bg-transparent border-none text-sm cursor-pointer border-b-2 ${
                activeTab === 'attorney' ? 'text-blue-400 border-b-blue-400' : 'text-gray-400 border-b-transparent hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('attorney')}
            >
              Attorney
            </button>
            <button 
              className={`px-5 py-3 bg-transparent border-none text-sm cursor-pointer border-b-2 ${
                activeTab === 'signature' ? 'text-blue-400 border-b-blue-400' : 'text-gray-400 border-b-transparent hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('signature')}
            >
              Signature & Vesting
            </button>
            <button 
              className={`px-5 py-3 bg-transparent border-none text-sm cursor-pointer border-b-2 ${
                activeTab === 'notary' ? 'text-blue-400 border-b-blue-400' : 'text-gray-400 border-b-transparent hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('notary')}
            >
              Notary Blocks
            </button>
          </div>
        </section>
      </>
    );
  };

  const renderInfoTab = () => {
    if (activeTab !== 'info') return null;
    
    const isBorrower = showBorrowerForms;
    const index = isBorrower ? activeBorrowerIndex : activeSellerIndex;
    const prefix = isBorrower ? 'borrowers' : 'sellers';

    return (
      <section className="tab-content">
        <form className="space-y-8">
          {/* Search Existing */}
          <section>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fa fa-search text-gray-400"></i>
              </div>
              <input 
                type="text" 
                className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                placeholder={`Search existing ${isBorrower ? 'buyers' : 'sellers'}...`}
                data-schema-key="customerName"
              />
            </div>
          </section>

          {/* Basic Info */}
          <section>
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Basic Info</h3>
            <div className="grid grid-cols-4 gap-5 mb-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.${prefix}.${index}.first_name`}
                  value={getValue(`contactsData.${prefix}.${index}.first_name`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Middle Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.${prefix}.${index}.middle_name`}
                  value={getValue(`contactsData.${prefix}.${index}.middle_name`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.${prefix}.${index}.last_name`}
                  value={getValue(`contactsData.${prefix}.${index}.last_name`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Suffix</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.${prefix}.${index}.suffix`}
                  value={getValue(`contactsData.${prefix}.${index}.suffix`) || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section>
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Contact Info</h3>
            <div className="grid grid-cols-3 gap-5 mb-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.${prefix}.${index}.email`}
                  value={getValue(`contactsData.${prefix}.${index}.email`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.${prefix}.${index}.phone_number`}
                  value={getValue(`contactsData.${prefix}.${index}.phone_number`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Mobile</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.${prefix}.${index}.mobile_phone_number`}
                  value={getValue(`contactsData.${prefix}.${index}.mobile_phone_number`) || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>
        </form>
      </section>
    );
  };

  const renderAddressesTab = () => {
    if (activeTab !== 'addresses') return null;
    
    const isBorrower = showBorrowerForms;
    const index = isBorrower ? activeBorrowerIndex : activeSellerIndex;
    const prefix = isBorrower ? 'borrowers' : 'sellers';

    return (
      <section className="tab-content">
        <form className="space-y-8">
          <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Current Address</h3>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Street Address</label>
              <input 
                type="text" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contactsData.${prefix}.${index}.address`}
                value={getValue(`contactsData.${prefix}.${index}.address`) || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">City</label>
              <input 
                type="text" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contactsData.${prefix}.${index}.city`}
                value={getValue(`contactsData.${prefix}.${index}.city`) || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">State</label>
              <input 
                type="text" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contactsData.${prefix}.${index}.state`}
                value={getValue(`contactsData.${prefix}.${index}.state`) || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">ZIP Code</label>
              <input 
                type="text" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contactsData.${prefix}.${index}.zip_code`}
                value={getValue(`contactsData.${prefix}.${index}.zip_code`) || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </section>
    );
  };

  const renderAttorneyTab = () => {
    if (activeTab !== 'attorney') return null;
    
    return (
      <section className="tab-content">
        <section className="mb-8">
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-5 text-white">Search Existing Law Firms</h3>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fa fa-search text-gray-400"></i>
              </div>
              <input 
                type="text" 
                className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                placeholder="Search existing law firms..."
              />
            </div>
          </section>
        </section>
      </section>
    );
  };

  const renderSignatureTab = () => {
    if (activeTab !== 'signature') return null;
    
    return (
      <section className="tab-content">
        <section className="mb-8">
          <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Signature</h3>
          <p className="text-gray-400 text-sm">Signature management functionality</p>
        </section>

        <section className="mb-8">
          <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Vesting</h3>
          <p className="text-gray-400 text-sm">Vesting management functionality</p>
        </section>
      </section>
    );
  };

  const renderNotaryTab = () => {
    if (activeTab !== 'notary') return null;
    
    return (
      <section className="tab-content">
        <section className="mb-8">
          <div className="py-4 px-5 bg-gray-600 border-b border-gray-600 cursor-pointer flex justify-between items-center">
            <h4 className="text-base font-semibold">This {showBorrowerForms ? 'Borrower' : 'Seller'}</h4>
            <span className="transition-transform">▼</span>
          </div>
          <p className="text-gray-400 text-sm mt-4">Notary blocks functionality</p>
        </section>
      </section>
    );
  };

  const renderOtherContactsForm = () => {
    if (showBorrowerForms || showSellerForms) return null;
    
    return (
      <section className="tab-content">
        <h3 className="text-lg font-semibold mb-8 text-white">
          {contactTypeLabels[activeContactType]} Management
        </h3>
        <p className="text-gray-400 text-sm">
          {contactTypeLabels[activeContactType]} contact management functionality will be implemented here.
        </p>
      </section>
    );
  };

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-users text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Contacts</h2>
            <span className="bg-green-600 px-2 py-1 rounded text-xs font-medium">B</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={loading || saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded text-white text-sm flex items-center gap-2"
            >
              {saving && <i className="fa fa-spinner fa-spin"></i>}
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white text-sm flex items-center gap-2">
              <i className="fa fa-plus mr-1"></i>
              <span>
                {showBorrowerForms ? 'Add Borrower' : showSellerForms ? 'Add Seller' : 'Add Contact'}
              </span>
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white text-sm flex items-center gap-2">
              <i className="fa fa-minus mr-1"></i>
              <span>
                {showBorrowerForms ? 'Remove Borrower' : showSellerForms ? 'Remove Seller' : 'Remove Contact'}
              </span>
            </button>
          </div>
        </section>

        {/* Form Content */}
        <section className="px-10 py-8">
          {/* Render appropriate tabs and content */}
          {renderContactTabs()}

          {/* Tab Content */}
          {(showBorrowerForms || showSellerForms) && (
            <>
              {renderInfoTab()}
              {renderAddressesTab()}
              {renderAttorneyTab()}
              {renderSignatureTab()}
              {renderNotaryTab()}
            </>
          )}

          {/* Other contact forms */}
          {renderOtherContactsForm()}
        </section>
      </section>

      {/* Contact Types Menu - Right Sidebar (matching original HTML) */}
      <section className="w-48 bg-gray-800 border-l border-gray-600 py-5">
        {Object.entries(contactTypeLabels).map(([type, label]) => (
          <button
            key={type}
            className={`contact-type-btn block w-full py-3 px-5 text-left text-sm border-l-3 ${
              activeContactType === type 
                ? 'text-white bg-blue-600 border-l-blue-400' 
                : 'text-gray-300 border-l-transparent hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => handleContactTypeChange(type as ContactType)}
          >
            {label}
          </button>
        ))}
      </section>
    </>
  );
};

export default Contacts;