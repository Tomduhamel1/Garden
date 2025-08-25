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

  // Map contact types to display names (exactly matching original HTML)
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

  // Handle contact type change (matching original functionality)
  const handleContactTypeChange = (contactType: ContactType) => {
    setActiveContactType(contactType);
    setActiveTab('info'); // Reset to info tab when changing contact type
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Get contact names (matching original approach)
  const borrowerName = getValue(`contactsData.borrowers.${activeBorrowerIndex}.first_name`) && getValue(`contactsData.borrowers.${activeBorrowerIndex}.last_name`)
    ? `${getValue(`contactsData.borrowers.${activeBorrowerIndex}.first_name`)} ${getValue(`contactsData.borrowers.${activeBorrowerIndex}.last_name`)}`
    : "Tom TEST TOM TEST";

  const sellerName = getValue(`contactsData.sellers.${activeSellerIndex}.first_name`) && getValue(`contactsData.sellers.${activeSellerIndex}.last_name`)
    ? `${getValue(`contactsData.sellers.${activeSellerIndex}.first_name`)} ${getValue(`contactsData.sellers.${activeSellerIndex}.last_name`)}`
    : "Jane DOE SELLER";

  // Show horizontal tabs only for buyers/sellers
  const showHorizontalTabs = activeContactType === 'buyers' || activeContactType === 'sellers';
  const showBuyersForm = activeContactType === 'buyers';
  const showSellersForm = activeContactType === 'sellers';

  if (loading) {
    return (
      <>
        <section className="flex-1 bg-gray-900 overflow-y-auto flex items-center justify-center">
          <div className="text-gray-400">
            <i className="fa fa-spinner fa-spin text-4xl"></i>
            <p className="mt-4">Loading contacts...</p>
          </div>
        </section>
        
        <section className="w-48 bg-gray-800 border-l border-gray-600 py-5">
          <div className="text-gray-400 text-center">Loading...</div>
        </section>
      </>
    );
  }

  // Render the Individual Contact Name Tab (only for buyers/sellers)
  const renderContactNameTab = () => {
    if (!showHorizontalTabs) return null;

    const currentName = showBuyersForm ? borrowerName : sellerName;
    
    return (
      <section className="mb-5">
        <div className="bg-gray-700 px-5 py-3 inline-block border-t-2 border-t-blue-500 text-blue-400">
          <span id="contact-name">{currentName}</span>
        </div>
      </section>
    );
  };

  // Render horizontal sub tabs (only for buyers/sellers)
  const renderHorizontalTabs = () => {
    if (!showHorizontalTabs) return null;

    return (
      <section id="horizontal-tabs" className="flex items-center justify-between mb-8 border-b border-gray-600">
        <div className="flex">
          <button 
            className={`tab-btn px-5 py-3 bg-transparent border-none text-sm cursor-pointer border-b-2 ${
              activeTab === 'info' ? 'text-blue-400 border-b-blue-400' : 'text-gray-400 border-b-transparent hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('info')}
          >
            Info
          </button>
          <button 
            className={`tab-btn px-5 py-3 bg-transparent border-none text-sm cursor-pointer border-b-2 ${
              activeTab === 'addresses' ? 'text-blue-400 border-b-blue-400' : 'text-gray-400 border-b-transparent hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('addresses')}
          >
            Addresses
          </button>
          <button 
            className={`tab-btn px-5 py-3 bg-transparent border-none text-sm cursor-pointer border-b-2 ${
              activeTab === 'attorney' ? 'text-blue-400 border-b-blue-400' : 'text-gray-400 border-b-transparent hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('attorney')}
          >
            Attorney
          </button>
          <button 
            className={`tab-btn px-5 py-3 bg-transparent border-none text-sm cursor-pointer border-b-2 ${
              activeTab === 'signature' ? 'text-blue-400 border-b-blue-400' : 'text-gray-400 border-b-transparent hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('signature')}
          >
            Signature & Vesting
          </button>
          <button 
            className={`tab-btn px-5 py-3 bg-transparent border-none text-sm cursor-pointer border-b-2 ${
              activeTab === 'notary' ? 'text-blue-400 border-b-blue-400' : 'text-gray-400 border-b-transparent hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('notary')}
          >
            Notary Blocks
          </button>
        </div>
        <div className="mb-3">
          <select 
            id="contact-type-dropdown" 
            className="px-3 py-2 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
            value={personType}
            onChange={(e) => setPersonType(e.target.value as PersonType)}
          >
            <option value="individual">Individual</option>
            <option value="organization">Organization</option>
          </select>
        </div>
      </section>
    );
  };

  // Render Buyers Info Form (exact match to HTML)
  const renderBuyersInfoForm = () => {
    if (!showBuyersForm || activeTab !== 'info') return null;

    return (
      <div id="buyers-info-form">
        <form className="space-y-8">
          {/* Search Existing Buyers */}
          <section className="mb-6">
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Basic Info</h3>
            <div className="mb-5">
              <div className="relative">
                <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="text" 
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  placeholder="Search existing buyers..." 
                  data-schema-key="customerName"
                />
              </div>
            </div>
          </section>

          {/* Name Fields */}
          <section>
            <div className="grid grid-cols-4 gap-5 mb-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.first_name`}
                  value={getValue(`contactsData.borrowers.${activeBorrowerIndex}.first_name`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Middle Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.middle_name`}
                  value={getValue(`contactsData.borrowers.${activeBorrowerIndex}.middle_name`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.last_name`}
                  value={getValue(`contactsData.borrowers.${activeBorrowerIndex}.last_name`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Suffix</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.suffix`}
                  value={getValue(`contactsData.borrowers.${activeBorrowerIndex}.suffix`) || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex gap-5 mb-5">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Gender</label>
                <select 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                  data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.gender`}
                  value={getValue(`contactsData.borrowers.${activeBorrowerIndex}.gender`) || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select one...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Marital Status</label>
                <select 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                  data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.marital_status`}
                  value={getValue(`contactsData.borrowers.${activeBorrowerIndex}.marital_status`) || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select one...</option>
                  <option value="Married">Married</option>
                  <option value="Unmarried">Unmarried</option>
                  <option value="Single">Single</option>
                  <option value="Reg. Dom. Partnership">Reg. Dom. Partnership</option>
                  <option value="Unknown">Unknown</option>
                  <option value="Widow">Widow</option>
                  <option value="Widower">Widower</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">SSN</label>
                <input 
                  type="text" 
                  inputMode="numeric" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.SSN`}
                  value={getValue(`contactsData.borrowers.${activeBorrowerIndex}.SSN`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Date of Birth</label>
                <div className="relative">
                  <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text" 
                    inputMode="numeric" 
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                    data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.date_of_birth`}
                    value={getValue(`contactsData.borrowers.${activeBorrowerIndex}.date_of_birth`) || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section>
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Contact Info</h3>
            
            <div className="flex gap-5 mb-5">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.email`}
                  value={getValue(`contactsData.borrowers.${activeBorrowerIndex}.email`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Cell Phone</label>
                <input 
                  type="tel" 
                  inputMode="tel" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.cell_phone`}
                  value={getValue(`contactsData.borrowers.${activeBorrowerIndex}.cell_phone`) || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex gap-5 mb-5">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Home Phone</label>
                <input 
                  type="tel" 
                  inputMode="tel" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.home_phone`}
                  value={getValue(`contactsData.borrowers.${activeBorrowerIndex}.home_phone`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Work Phone</label>
                <input 
                  type="tel" 
                  inputMode="tel" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.work_phone`}
                  value={getValue(`contactsData.borrowers.${activeBorrowerIndex}.work_phone`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Fax</label>
                <input 
                  type="tel" 
                  inputMode="tel" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.fax`}
                  value={getValue(`contactsData.borrowers.${activeBorrowerIndex}.fax`) || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* Grid Layout for Additional Sections */}
          <section className="grid grid-cols-4 gap-8">
            {/* Column 1: Will Be On */}
            <div>
              <h4 className="text-sm font-semibold mb-4">Will Be On</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4" 
                    data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.on_loan`}
                    checked={getValue(`contactsData.borrowers.${activeBorrowerIndex}.on_loan`) || false}
                    onChange={handleInputChange}
                  />
                  <label className="text-sm cursor-pointer">Loan</label>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4" 
                    data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.on_title`}
                    checked={getValue(`contactsData.borrowers.${activeBorrowerIndex}.on_title`) || false}
                    onChange={handleInputChange}
                  />
                  <label className="text-sm cursor-pointer">Title</label>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Ownership %</label>
                  <input 
                    type="text" 
                    inputMode="decimal" 
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                    data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.ownership_percentage`}
                    value={getValue(`contactsData.borrowers.${activeBorrowerIndex}.ownership_percentage`) || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Column 2: Participating In & POA */}
            <div>
              <h4 className="text-sm font-semibold mb-4">Participating In</h4>
              <div className="flex items-center gap-3 mb-6">
                <input 
                  type="checkbox" 
                  className="w-4 h-4" 
                  data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.has_exchange`}
                  checked={getValue(`contactsData.borrowers.${activeBorrowerIndex}.has_exchange`) || false}
                  onChange={handleInputChange}
                />
                <label className="text-sm cursor-pointer">1031 Exchange</label>
              </div>
              
              <h4 className="text-sm font-semibold mb-4">POA</h4>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  className="w-4 h-4" 
                  data-schema-key={`contactsData.borrowers.${activeBorrowerIndex}.power_of_attorney.has`}
                  checked={getValue(`contactsData.borrowers.${activeBorrowerIndex}.power_of_attorney.has`) || false}
                  onChange={handleInputChange}
                />
                <label className="text-sm cursor-pointer">Given</label>
              </div>
            </div>

            {/* Column 3: Patriot Search */}
            <div>
              <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                Patriot Search
                <i className="fa fa-question-circle text-gray-400 cursor-help" title="This searches all available OFAC sanction lists for Patriot Act compliance"></i>
              </h4>
              <div className="flex items-center gap-2 mb-3">
                <i className="fa fa-check text-green-500"></i>
                <span className="text-sm">No matches</span>
                <i className="fa fa-info-circle text-gray-400 cursor-help" title="Searched all OFAC lists on Jul. 30th at 1:34 PM (PDT) and found no results for 'Tom TEST TOM TEST'."></i>
              </div>
              <button className="px-3 py-1.5 bg-gray-600 border border-gray-500 rounded text-white text-xs hover:bg-gray-500">
                <i className="fa fa-home mr-1"></i>
                Order Report
              </button>
            </div>

            {/* Column 4: Empty */}
            <div></div>
          </section>
        </form>
      </div>
    );
  };

  // Render Sellers Info Form (complete match to buyers structure)
  const renderSellersInfoForm = () => {
    if (!showSellersForm || activeTab !== 'info') return null;

    return (
      <div id="sellers-info-form">
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
                />
              </div>
            </div>
          </section>

          {/* Name Fields */}
          <section>
            <div className="grid grid-cols-4 gap-5 mb-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.sellers.${activeSellerIndex}.first_name`}
                  value={getValue(`contactsData.sellers.${activeSellerIndex}.first_name`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Middle Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.sellers.${activeSellerIndex}.middle_name`}
                  value={getValue(`contactsData.sellers.${activeSellerIndex}.middle_name`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.sellers.${activeSellerIndex}.last_name`}
                  value={getValue(`contactsData.sellers.${activeSellerIndex}.last_name`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Suffix</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.sellers.${activeSellerIndex}.suffix`}
                  value={getValue(`contactsData.sellers.${activeSellerIndex}.suffix`) || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex gap-5 mb-5">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Gender</label>
                <select 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                  data-schema-key={`contactsData.sellers.${activeSellerIndex}.gender`}
                  value={getValue(`contactsData.sellers.${activeSellerIndex}.gender`) || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select one...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Marital Status</label>
                <select 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                  data-schema-key={`contactsData.sellers.${activeSellerIndex}.marital_status`}
                  value={getValue(`contactsData.sellers.${activeSellerIndex}.marital_status`) || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select one...</option>
                  <option value="Married">Married</option>
                  <option value="Unmarried">Unmarried</option>
                  <option value="Single">Single</option>
                  <option value="Reg. Dom. Partnership">Reg. Dom. Partnership</option>
                  <option value="Unknown">Unknown</option>
                  <option value="Widow">Widow</option>
                  <option value="Widower">Widower</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">SSN</label>
                <input 
                  type="text" 
                  inputMode="numeric" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.sellers.${activeSellerIndex}.SSN`}
                  value={getValue(`contactsData.sellers.${activeSellerIndex}.SSN`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Date of Birth</label>
                <div className="relative">
                  <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text" 
                    inputMode="numeric" 
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                    data-schema-key={`contactsData.sellers.${activeSellerIndex}.date_of_birth`}
                    value={getValue(`contactsData.sellers.${activeSellerIndex}.date_of_birth`) || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section>
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Contact Info</h3>
            
            <div className="flex gap-5 mb-5">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.sellers.${activeSellerIndex}.email`}
                  value={getValue(`contactsData.sellers.${activeSellerIndex}.email`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Cell Phone</label>
                <input 
                  type="tel" 
                  inputMode="tel" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.sellers.${activeSellerIndex}.cell_phone`}
                  value={getValue(`contactsData.sellers.${activeSellerIndex}.cell_phone`) || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex gap-5 mb-5">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Home Phone</label>
                <input 
                  type="tel" 
                  inputMode="tel" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.sellers.${activeSellerIndex}.home_phone`}
                  value={getValue(`contactsData.sellers.${activeSellerIndex}.home_phone`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Work Phone</label>
                <input 
                  type="tel" 
                  inputMode="tel" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.sellers.${activeSellerIndex}.work_phone`}
                  value={getValue(`contactsData.sellers.${activeSellerIndex}.work_phone`) || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Fax</label>
                <input 
                  type="tel" 
                  inputMode="tel" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.sellers.${activeSellerIndex}.fax`}
                  value={getValue(`contactsData.sellers.${activeSellerIndex}.fax`) || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* Grid Layout for Additional Sections - matching sellers structure from HTML */}
          <section className="grid grid-cols-4 gap-8">
            {/* Column 1: Will Be On */}
            <div>
              <h4 className="text-sm font-semibold mb-4">On</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4" 
                    data-schema-key={`contactsData.sellers.${activeSellerIndex}.on_title`}
                    checked={getValue(`contactsData.sellers.${activeSellerIndex}.on_title`) || false}
                    onChange={handleInputChange}
                  />
                  <label className="text-sm cursor-pointer">Title</label>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Ownership %</label>
                  <input 
                    type="text" 
                    inputMode="decimal" 
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                    data-schema-key={`contactsData.sellers.${activeSellerIndex}.ownership_percentage`}
                    value={getValue(`contactsData.sellers.${activeSellerIndex}.ownership_percentage`) || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Column 2: Participating In & POA */}
            <div>
              <h4 className="text-sm font-semibold mb-4">Participating In</h4>
              <div className="flex items-center gap-3 mb-6">
                <input 
                  type="checkbox" 
                  className="w-4 h-4" 
                  data-schema-key={`contactsData.sellers.${activeSellerIndex}.has_exchange`}
                  checked={getValue(`contactsData.sellers.${activeSellerIndex}.has_exchange`) || false}
                  onChange={handleInputChange}
                />
                <label className="text-sm cursor-pointer">1031 Exchange</label>
              </div>
              
              <h4 className="text-sm font-semibold mb-4">POA</h4>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  className="w-4 h-4" 
                  data-schema-key={`contactsData.sellers.${activeSellerIndex}.power_of_attorney.has`}
                  checked={getValue(`contactsData.sellers.${activeSellerIndex}.power_of_attorney.has`) || false}
                  onChange={handleInputChange}
                />
                <label className="text-sm cursor-pointer">Given</label>
              </div>
            </div>

            {/* Column 3: 1099 Reporting */}
            <div>
              <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                1099 Reporting
                <i className="fa fa-question-circle text-gray-400 cursor-help" title="1099 tax reporting information"></i>
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4" 
                    data-schema-key={`contactsData.sellers.${activeSellerIndex}.reporting_1099.required`}
                    checked={getValue(`contactsData.sellers.${activeSellerIndex}.reporting_1099.required`) || false}
                    onChange={handleInputChange}
                  />
                  <label className="text-sm cursor-pointer">1099 Required</label>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Tax ID</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                    data-schema-key={`contactsData.sellers.${activeSellerIndex}.reporting_1099.tax_id`}
                    value={getValue(`contactsData.sellers.${activeSellerIndex}.reporting_1099.tax_id`) || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Column 4: Empty */}
            <div></div>
          </section>
        </form>
      </div>
    );
  };

  // Render Addresses Tab
  const renderAddressesTab = () => {
    if (activeTab !== 'addresses' || !showHorizontalTabs) return null;
    
    const isBorrower = showBuyersForm;
    const index = isBorrower ? activeBorrowerIndex : activeSellerIndex;
    const prefix = isBorrower ? 'borrowers' : 'sellers';

    // US States array for dropdown
    const states = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
      'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
      'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
    ];

    return (
      <form className="space-y-8">
        {/* Current Address Section */}
        <section className="mb-8">
          <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Current Address</h3>
          
          <div className="flex items-center gap-3 mb-5">
            <input 
              type="checkbox" 
              className="w-4 h-4" 
              data-schema-key={`contactsData.${prefix}.${index}.current_address.same_as_property`}
              checked={getValue(`contactsData.${prefix}.${index}.current_address.same_as_property`) || false}
              onChange={handleInputChange}
            />
            <label className="text-sm cursor-pointer">Same as Property</label>
          </div>

          <div className="flex gap-5 mb-5">
            <div className="flex-[2.5]">
              <label className="block text-sm text-gray-300 mb-2">Address</label>
              <input 
                type="text" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contactsData.${prefix}.${index}.current_address.street`}
                value={getValue(`contactsData.${prefix}.${index}.current_address.street`) || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-[1.5]">
              <label className="block text-sm text-gray-300 mb-2">Apt, Suite, Etc.</label>
              <input 
                type="text" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contactsData.${prefix}.${index}.current_address.unit`}
                value={getValue(`contactsData.${prefix}.${index}.current_address.unit`) || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex gap-5 mb-5">
            <div className="flex-1">
              <label className="block text-sm text-gray-300 mb-2">City</label>
              <input 
                type="text" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contactsData.${prefix}.${index}.current_address.city`}
                value={getValue(`contactsData.${prefix}.${index}.current_address.city`) || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-300 mb-2">State</label>
              <select 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                data-schema-key={`contactsData.${prefix}.${index}.current_address.state`}
                value={getValue(`contactsData.${prefix}.${index}.current_address.state`) || ''}
                onChange={handleInputChange}
              >
                <option value="">Select one...</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-300 mb-2">Zipcode</label>
              <input 
                type="text" 
                inputMode="numeric" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contactsData.${prefix}.${index}.current_address.zipcode`}
                value={getValue(`contactsData.${prefix}.${index}.current_address.zipcode`) || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        {/* Forwarding Address Section */}
        <section className="mb-8">
          <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Forwarding Address</h3>
          
          <div className="flex gap-8 mb-5">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                className="w-4 h-4" 
                data-schema-key={`contactsData.${prefix}.${index}.forwarding_address.same_as_property`}
                checked={getValue(`contactsData.${prefix}.${index}.forwarding_address.same_as_property`) || false}
                onChange={handleInputChange}
              />
              <label className="text-sm cursor-pointer">Same as Property</label>
            </div>
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                className="w-4 h-4" 
                data-schema-key={`contactsData.${prefix}.${index}.forwarding_address.same_as_current`}
                checked={getValue(`contactsData.${prefix}.${index}.forwarding_address.same_as_current`) || false}
                onChange={handleInputChange}
              />
              <label className="text-sm cursor-pointer">Same as Current</label>
            </div>
          </div>

          <div className="flex gap-5 mb-5">
            <div className="flex-[2.5]">
              <label className="block text-sm text-gray-300 mb-2">Address</label>
              <input 
                type="text" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contactsData.${prefix}.${index}.forwarding_address.street`}
                value={getValue(`contactsData.${prefix}.${index}.forwarding_address.street`) || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-[1.5]">
              <label className="block text-sm text-gray-300 mb-2">Apt, Suite, Etc.</label>
              <input 
                type="text" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contactsData.${prefix}.${index}.forwarding_address.unit`}
                value={getValue(`contactsData.${prefix}.${index}.forwarding_address.unit`) || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex gap-5 mb-5">
            <div className="flex-1">
              <label className="block text-sm text-gray-300 mb-2">City</label>
              <input 
                type="text" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contactsData.${prefix}.${index}.forwarding_address.city`}
                value={getValue(`contactsData.${prefix}.${index}.forwarding_address.city`) || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-300 mb-2">State</label>
              <select 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                data-schema-key={`contactsData.${prefix}.${index}.forwarding_address.state`}
                value={getValue(`contactsData.${prefix}.${index}.forwarding_address.state`) || ''}
                onChange={handleInputChange}
              >
                <option value="">Select one...</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-300 mb-2">Zipcode</label>
              <input 
                type="text" 
                inputMode="numeric" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contactsData.${prefix}.${index}.forwarding_address.zipcode`}
                value={getValue(`contactsData.${prefix}.${index}.forwarding_address.zipcode`) || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>
      </form>
    );
  };

  // Render Attorney Tab
  const renderAttorneyTab = () => {
    if (activeTab !== 'attorney' || !showHorizontalTabs) return null;
    
    return (
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-5 text-white">Search Existing Law Firms</h3>
        <div className="relative mb-6">
          <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
            placeholder="Search existing law firms..."
          />
        </div>
        
        <h3 className="text-lg font-semibold mb-5 text-white">New Law Firm</h3>
        <button className="px-4 py-2 bg-blue-600 border border-blue-600 rounded text-white hover:bg-blue-700">
          Create New Law Firm
        </button>
      </section>
    );
  };

  // Render Signature Tab
  const renderSignatureTab = () => {
    if (activeTab !== 'signature' || !showHorizontalTabs) return null;
    
    return (
      <>
        <section className="mb-8">
          <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Signature</h3>
          <p className="text-gray-400 text-sm">Signature management functionality</p>
        </section>

        <section className="mb-8">
          <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Vesting</h3>
          <p className="text-gray-400 text-sm">Vesting management functionality</p>
        </section>
      </>
    );
  };

  // Render Notary Tab
  const renderNotaryTab = () => {
    if (activeTab !== 'notary' || !showHorizontalTabs) return null;
    
    return (
      <section className="mb-8">
        <div className="py-4 px-5 bg-gray-600 border-b border-gray-600 cursor-pointer flex justify-between items-center">
          <h4 className="text-base font-semibold">This {showBuyersForm ? 'Borrower' : 'Seller'}</h4>
          <span className="transition-transform">▼</span>
        </div>
        <div className="mt-4">
          <p className="text-gray-400 text-sm">Notary blocks functionality</p>
        </div>
      </section>
    );
  };

  // Render other contact types
  const renderOtherContactsForm = () => {
    if (showHorizontalTabs) return null;
    
    return (
      <section id={`${activeContactType}-form`}>
        <div className="bg-gray-700 border border-gray-600 rounded-md p-10 grid grid-cols-3 gap-10 items-center text-center">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-5 text-white">Search Existing {contactTypeLabels[activeContactType]}</h3>
            <div className="relative w-full">
              <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                placeholder={`Search existing ${contactTypeLabels[activeContactType].toLowerCase()}...`}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-5 text-white">New {contactTypeLabels[activeContactType]}</h3>
            <button className="px-4 py-2 bg-blue-600 border border-blue-600 rounded text-white hover:bg-blue-700">
              Create New
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-sm">
              {contactTypeLabels[activeContactType]} management functionality
            </p>
          </div>
        </div>
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
              <span id="add-button-text">
                {showBuyersForm ? 'Add Borrower' : showSellersForm ? 'Add Seller' : 'Add Contact'}
              </span>
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white text-sm flex items-center gap-2">
              <i className="fa fa-minus mr-1"></i>
              <span id="remove-button-text">
                {showBuyersForm ? 'Remove Borrower' : showSellersForm ? 'Remove Seller' : 'Remove Contact'}
              </span>
            </button>
          </div>
        </section>

        {/* Form Content */}
        <section className="px-10 py-8">
          {/* Individual Contact Name Tab (only for buyers/sellers) */}
          {renderContactNameTab()}
          
          {/* Horizontal Sub Tabs (only for buyers/sellers) */}
          {renderHorizontalTabs()}

          {/* Tab Content */}
          <section className="tab-content">
            {renderBuyersInfoForm()}
            {renderSellersInfoForm()}
            {renderAddressesTab()}
            {renderAttorneyTab()}
            {renderSignatureTab()}
            {renderNotaryTab()}
            {renderOtherContactsForm()}
          </section>
        </section>
      </section>

      {/* Contact Types Menu - Right Sidebar (exactly matching original HTML) */}
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