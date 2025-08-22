import React, { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

interface ContactsProps {
  orderId: string;
}

type ContactType = 'buyers' | 'sellers' | 'lenders' | 'buyersAgents' | 'sellersAgents' | 'titleAbstractors' | 'surveyingFirms' | 'otherContacts';
type TabType = 'info' | 'addresses' | 'attorney' | 'signature' | 'notary';
type PersonType = 'individual' | 'organization';

const Contacts: React.FC<ContactsProps> = ({ orderId }) => {
  const { loading, saving, handleInputChange, handleSave, getValue } = useOrderData();
  const [activeContactType, setActiveContactType] = useState<ContactType>('buyers');
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [personType, setPersonType] = useState<PersonType>('individual');
  const [activeBorrowerIndex, setActiveBorrowerIndex] = useState(0);
  const [activeSellerIndex, setActiveSellerIndex] = useState(0);

  // Map contact types to display names
  const contactTypeLabels: Record<ContactType, string> = {
    buyers: 'Buyers',
    sellers: 'Sellers', 
    lenders: 'Lenders',
    buyersAgents: "Buyer's Agents",
    sellersAgents: "Seller's Agents",
    titleAbstractors: 'Title Abstractors',
    surveyingFirms: 'Surveying Firms',
    otherContacts: 'Other Contacts'
  };

  // Determine if we're showing borrower or seller forms
  const showBorrowerForms = activeContactType === 'buyers';
  const showSellerForms = activeContactType === 'sellers';
  const showOtherForms = !showBorrowerForms && !showSellerForms;

  // Get names from data
  const borrowerName = getValue(`contactsData.borrowers.${activeBorrowerIndex}.name.first`) + ' ' + 
                      getValue(`contactsData.borrowers.${activeBorrowerIndex}.name.last`) || "Borrower";
  const sellerName = getValue(`contactsData.sellers.${activeSellerIndex}.name.first`) + ' ' +
                     getValue(`contactsData.sellers.${activeSellerIndex}.name.last`) || "Seller";

  if (loading) {
    return (
      <section className="flex-1 bg-gray-900 overflow-y-auto flex items-center justify-center">
        <div className="text-gray-400">
          <i className="fa fa-spinner fa-spin text-4xl"></i>
          <p className="mt-4">Loading contacts...</p>
        </div>
      </section>
    );
  }

  const renderContactTabs = () => {
    // Only show tabs for buyers/sellers
    if (!showBorrowerForms && !showSellerForms) return null;

    return (
      <>
        {/* Individual Contact Tab */}
        <section className="mb-5">
          <div className="bg-gray-700 px-5 py-3 inline-block border-t-2 border-t-blue-500 text-blue-400">
            <span>{showBorrowerForms ? borrowerName : sellerName}</span>
          </div>
        </section>

        {/* Sub Tabs */}
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
          <div className="mb-3">
            <select 
              className="px-3 py-2 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none"
              value={personType}
              onChange={(e) => setPersonType(e.target.value as PersonType)}
            >
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
            </select>
          </div>
        </section>
      </>
    );
  };

  const renderInfoTab = () => {
    const isBorrower = showBorrowerForms;
    const index = isBorrower ? activeBorrowerIndex : activeSellerIndex;
    const prefix = isBorrower ? 'borrowers' : 'sellers';

    return (
      <section className={activeTab === 'info' ? '' : 'hidden'}>
        <form className="space-y-8">
          {/* Basic Info Section */}
          <section className="mb-6">
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Basic Info</h3>
            <div className="mb-5">
              <div className="relative">
                <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="text" 
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  placeholder={`Search existing ${isBorrower ? 'buyers' : 'sellers'}...`}
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
                  data-schema-key={`contactsData.${prefix}[${index}].name.first`}
                  value={getValue(`contactsData.${prefix}[${index}].name.first`)}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Middle Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.${prefix}[${index}].name.middle`}
                  value={getValue(`contactsData.${prefix}[${index}].name.middle`)}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contactsData.${prefix}[${index}].name.last`}
                  value={getValue(`contactsData.${prefix}[${index}].name.last`)}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Suffix</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contacts.${prefix}.${index}.suffix`}
                />
              </div>
            </div>

            <div className="flex gap-5 mb-5">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Gender</label>
                <select 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                  data-schema-key={`contacts.${prefix}.${index}.gender`}
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
                  data-schema-key={`contacts.${prefix}.${index}.marital_status`}
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
                  data-schema-key={`contacts.${prefix}.${index}.SSN`}
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
                    data-schema-key={`contacts.${prefix}.${index}.date_of_birth`}
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
                  data-schema-key={`contactsData.${prefix}[${index}].email`}
                  value={getValue(`contactsData.${prefix}[${index}].email`)}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contacts.${prefix}.${index}.phone`}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Mobile</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contacts.${prefix}.${index}.mobile`}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-2">Fax</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contacts.${prefix}.${index}.fax`}
                />
              </div>
            </div>
          </section>

          {/* Employment Info - Only for Individual type */}
          {personType === 'individual' && (
            <section>
              <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Employment Info</h3>
              
              <div className="flex gap-5 mb-5">
                <div className="flex-1">
                  <label className="block text-sm text-gray-300 mb-2">Company</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                    data-schema-key={`contacts.${prefix}.${index}.company`}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-300 mb-2">Title</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                    data-schema-key={`contacts.${prefix}.${index}.title`}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Mailing Info */}
          <section>
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Mailing Info</h3>
            
            <div className="mb-5">
              <label className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  data-schema-key={`contacts.${prefix}.${index}.power_of_attorney`}
                />
                <span className="text-sm text-gray-300">Power of Attorney</span>
              </label>
            </div>

            <div className="mb-5">
              <label className="block text-sm text-gray-300 mb-2">Preferred Language</label>
              <select 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                data-schema-key={`contacts.${prefix}.${index}.preferred_language`}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </section>
        </form>
      </section>
    );
  };

  const renderAddressesTab = () => {
    const isBorrower = showBorrowerForms;
    const index = isBorrower ? activeBorrowerIndex : activeSellerIndex;
    const prefix = isBorrower ? 'borrowers' : 'sellers';

    return (
      <section className={activeTab === 'addresses' ? '' : 'hidden'}>
        <form className="space-y-8">
          {/* Current Address Section */}
          <section>
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Current Address</h3>
            
            <div className="mb-5">
              <label className="block text-sm text-gray-300 mb-2">Street Address</label>
              <input 
                type="text" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contacts.${prefix}.${index}.current_address.street`}
              />
            </div>

            <div className="grid grid-cols-3 gap-5 mb-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">City</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contacts.${prefix}.${index}.current_address.city`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">State</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contacts.${prefix}.${index}.current_address.state`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">ZIP</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contacts.${prefix}.${index}.current_address.zip`}
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm text-gray-300 mb-2">County</label>
              <input 
                type="text" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contacts.${prefix}.${index}.current_address.county`}
              />
            </div>
          </section>

          {/* Mailing Address Section */}
          <section>
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Mailing Address</h3>
            
            <div className="mb-5">
              <label className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                />
                <span className="text-sm text-gray-300">Same as Current Address</span>
              </label>
            </div>

            <div className="mb-5">
              <label className="block text-sm text-gray-300 mb-2">Street Address</label>
              <input 
                type="text" 
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                data-schema-key={`contacts.${prefix}.${index}.mailing_address.street`}
              />
            </div>

            <div className="grid grid-cols-3 gap-5 mb-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">City</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contacts.${prefix}.${index}.mailing_address.city`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">State</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contacts.${prefix}.${index}.mailing_address.state`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">ZIP</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                  data-schema-key={`contacts.${prefix}.${index}.mailing_address.zip`}
                />
              </div>
            </div>
          </section>
        </form>
      </section>
    );
  };

  const renderAttorneyTab = () => {
    return (
      <section className={activeTab === 'attorney' ? '' : 'hidden'}>
        <section className="mb-8">
          <div className="bg-gray-700 border border-gray-600 rounded-md p-10 grid grid-cols-3 gap-10 items-center text-center">
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-4">🏢</div>
              <h3 className="text-lg font-semibold mb-5 text-white">Existing Attorney</h3>
              <div className="w-full">
                <div className="relative">
                  <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text" 
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 text-left" 
                    placeholder="Search for attorney..."
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-px h-32 bg-gray-500 mx-auto"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 px-3 py-2 text-gray-400 text-sm font-medium">
                Or
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-lg font-semibold mb-5 text-white">New Attorney</h3>
              <button 
                type="button" 
                className="bg-blue-600 border border-blue-600 rounded px-6 py-3 text-white text-sm font-medium hover:bg-blue-700"
              >
                Add New Attorney
              </button>
            </div>
          </div>
        </section>
      </section>
    );
  };

  const renderSignatureTab = () => {
    const isBorrower = showBorrowerForms;
    const index = isBorrower ? activeBorrowerIndex : activeSellerIndex;
    const prefix = isBorrower ? 'borrowers' : 'sellers';

    return (
      <section className={activeTab === 'signature' ? '' : 'hidden'}>
        <section className="mb-8">
          <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Signature</h3>
          
          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-2">Signature Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
              data-schema-key={`contacts.${prefix}.${index}.signature_name`}
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-2">AKA</label>
            <input 
              type="text" 
              className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
              data-schema-key={`contacts.${prefix}.${index}.aka`}
            />
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-base font-semibold mb-4 pb-2 border-b border-gray-600">Vesting</h3>
          
          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-2">Vesting Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
              data-schema-key={`contacts.${prefix}.${index}.vesting_name`}
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-2">Manner of Holding Title</label>
            <select 
              className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
              data-schema-key={`contacts.${prefix}.${index}.manner_of_holding_title`}
            >
              <option value="">Select one...</option>
              <option value="Sole Ownership">Sole Ownership</option>
              <option value="Joint Tenants">Joint Tenants</option>
              <option value="Tenants in Common">Tenants in Common</option>
              <option value="Community Property">Community Property</option>
              <option value="Trust">Trust</option>
            </select>
          </div>
        </section>
      </section>
    );
  };

  const renderNotaryTab = () => {
    return (
      <section className={activeTab === 'notary' ? '' : 'hidden'}>
        <section className="mb-8">
          {/* Notary Accordion */}
          <div className="border border-gray-600 rounded">
            <button className="w-full px-5 py-3 bg-gray-700 text-left text-white flex justify-between items-center hover:bg-gray-600">
              <span>Notary Block 1</span>
              <i className="fa fa-chevron-down text-gray-400"></i>
            </button>
            <div className="p-5 bg-gray-800">
              <div className="mb-5">
                <label className="block text-sm text-gray-300 mb-2">Notary Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm text-gray-300 mb-2">Commission Expiry</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  };

  const renderOtherContactsForm = () => {
    if (!showOtherForms) return null;

    // Special handling for Title Abstractors
    if (activeContactType === 'titleAbstractors') {
      return (
        <section>
          <form className="space-y-8">
            <section className="bg-gray-700 border border-gray-600 rounded-md p-10 grid grid-cols-3 gap-10 items-center text-center">
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-4">🏢</div>
                <h3 className="text-lg font-semibold mb-5 text-white">Existing Title Abstractor</h3>
                <div className="w-full">
                  <div className="relative">
                    <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input 
                      type="text" 
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 text-left" 
                      placeholder="Search for title abstractor..." 
                      data-schema-key="contacts.title_companies.0.company_id"
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="w-px h-32 bg-gray-500 mx-auto"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 px-3 py-2 text-gray-400 text-sm font-medium">
                  Or
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-lg font-semibold mb-5 text-white">New Title Abstractor</h3>
                <button 
                  type="button" 
                  className="bg-blue-600 border border-blue-600 rounded px-6 py-3 text-white text-sm font-medium hover:bg-blue-700"
                >
                  Add New Title Abstractor
                </button>
              </div>
            </section>
          </form>
        </section>
      );
    }

    // Special handling for Surveying Firms
    if (activeContactType === 'surveyingFirms') {
      return (
        <section>
          <form className="space-y-8">
            <section className="bg-gray-700 border border-gray-600 rounded-md p-10 grid grid-cols-3 gap-10 items-center text-center">
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-4">🏢</div>
                <h3 className="text-lg font-semibold mb-5 text-white">Existing Surveying Firm</h3>
                <div className="w-full">
                  <div className="relative">
                    <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input 
                      type="text" 
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 text-left" 
                      placeholder="Search for surveying firm..." 
                      data-schema-key="contacts.surveying_firms.0.company_id"
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="w-px h-32 bg-gray-500 mx-auto"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 px-3 py-2 text-gray-400 text-sm font-medium">
                  Or
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-lg font-semibold mb-5 text-white">New Surveying Firm</h3>
                <button 
                  type="button" 
                  className="bg-blue-600 border border-blue-600 rounded px-6 py-3 text-white text-sm font-medium hover:bg-blue-700"
                >
                  Add New Surveying Firm
                </button>
              </div>
            </section>
          </form>
        </section>
      );
    }

    // Generic other contacts form
    return (
      <section>
        <form className="space-y-8">
          <section className="bg-gray-700 border border-gray-600 rounded-md p-10 text-center">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-lg font-semibold mb-8 text-white">Choose a type of contact to add to this order</h3>
            
            <div className="max-w-md mx-auto relative">
              <select 
                className="w-full px-4 py-3 bg-blue-600 border border-blue-600 rounded text-white text-base font-medium focus:outline-none focus:bg-blue-700 appearance-none cursor-pointer" 
                data-schema-key="contacts.other_contacts.0.company_type"
              >
                <option value="">Select Contact Type</option>
                <option value="appraisalCompany">Appraisal Company</option>
                <option value="builder">Builder</option>
                <option value="creditCardCompany">Credit Card Co.</option>
                <option value="exchangeAccommodator">Exchange Accommodator</option>
                <option value="generalContractor">General Contractor</option>
                <option value="governmentEntity">Government Entity</option>
                <option value="HOA">HOA</option>
                <option value="HOAManagementCompany">HOA Management Co.</option>
                <option value="homeWarrantyCompany">Home Warranty Co.</option>
                <option value="insuranceCompany">Insurance Company</option>
                <option value="lawFirm">Law Firm</option>
                <option value="mortgageBroker">Mortgage Broker</option>
                <option value="pestControlCompany">Pest Control Co.</option>
                <option value="propertyManagementCompany">Property Management Co.</option>
                <option value="realEstateAgency">Real Estate Agency</option>
                <option value="recordingOffice">Recording Office</option>
                <option value="titleInsuranceCompany">Title Insurance Co.</option>
                <option value="utilityCompany">Utility Company</option>
                <option value="other">Other</option>
              </select>
              <i className="fa fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-white pointer-events-none"></i>
            </div>
          </section>
        </form>
      </section>
    );
  };

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 p-10">
        {/* Page Header */}
        <section className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-600">
          <div className="flex items-center gap-4">
            <i className="fa fa-users text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold">Contacts</h2>
          </div>
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 border border-green-500 rounded px-3 py-2 text-white text-sm hover:bg-green-700 disabled:bg-gray-600 disabled:border-gray-500"
            >
              <i className={`fa ${saving ? 'fa-spinner fa-spin' : 'fa-save'} mr-1`}></i>
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500">
              <i className="fa fa-plus mr-1"></i>
              <span>
                {showBorrowerForms ? 'Add Borrower' : showSellerForms ? 'Add Seller' : 'Add Contact'}
              </span>
            </button>
            <button className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-gray-400 text-sm opacity-50 cursor-not-allowed">
              <i className="fa fa-minus mr-1"></i>
              <span>
                {showBorrowerForms ? 'Remove Borrower' : showSellerForms ? 'Remove Seller' : 'Remove Contact'}
              </span>
            </button>
          </div>
        </section>

        {/* Contact Type Tabs */}
        <section className="mb-8">
          <div className="flex space-x-1">
            {Object.entries(contactTypeLabels).map(([type, label]) => (
              <button
                key={type}
                className={`px-4 py-2 text-sm font-medium rounded-t ${
                  activeContactType === type 
                    ? 'bg-gray-700 text-blue-400 border-t-2 border-t-blue-500' 
                    : 'bg-gray-800 text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => {
                  setActiveContactType(type as ContactType);
                  setActiveTab('info'); // Reset to info tab when changing contact type
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

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

export default Contacts;