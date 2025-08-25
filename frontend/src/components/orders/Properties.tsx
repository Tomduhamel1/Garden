import React, { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

const Properties: React.FC = () => {
  const { loading, saving, getValue, handleInputChange, handleSave } = useOrderData();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['Property', 'Legal Description', 'Subdivision', 'Survey'];

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-map-marker text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Properties</h2>
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
            <button className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500">
              <i className="fa fa-plus mr-2"></i>
              Add Property
            </button>
          </div>
        </section>

        {/* Tab Container */}
        <section className="px-10">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <i className="fa fa-spinner fa-spin text-2xl text-gray-400"></i>
              <span className="ml-3 text-gray-400">Loading...</span>
            </div>
          )}
          
          {!loading && (
          <>
          {/* Tab Menu */}
          <div className="flex border-b-2 border-gray-600 mb-8">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`px-5 py-4 text-sm cursor-pointer border-b-3 ${
                  activeTab === index
                    ? 'text-blue-400 border-b-blue-400 bg-gray-800'
                    : 'text-gray-400 border-b-transparent hover:text-gray-300 hover:bg-gray-800'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Property Tab Content */}
          {activeTab === 0 && (
            <section className="pb-10">
              <form className="space-y-8">
                {/* Address Section */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Address</h3>
                  
                  <div className="flex gap-5 mb-5">
                    <div className="flex-[2.5]">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                      <div className="relative">
                        <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input 
                          type="text" 
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                          placeholder="Search address..."
                          value={getValue('propertiesData.properties.0.address')}
                          onChange={handleInputChange}
                          data-schema-key="propertiesData.properties.0.address"
                        />
                      </div>
                    </div>
                    <div className="flex-[1.5]">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Apt, Suite, Etc.</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        value={getValue('propertiesData.properties.0.unit')}
                        onChange={handleInputChange}
                        data-schema-key="propertiesData.properties.0.unit"
                      />
                    </div>
                  </div>

                  <div className="flex gap-5 mb-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        value={getValue('propertiesData.properties.0.city')}
                        onChange={handleInputChange}
                        data-schema-key="propertiesData.properties.0.city"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">County</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        value={getValue('propertiesData.properties.0.county')}
                        onChange={handleInputChange}
                        data-schema-key="propertiesData.properties.0.county"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                      <select 
                        value={getValue('propertiesData.properties.0.state')}
                        onChange={handleInputChange}
                        data-schema-key="propertiesData.properties.0.state"
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500">
                        <option value="">Select State</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        <option value="FL">Florida</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        value={getValue('propertiesData.properties.0.zip')}
                        onChange={handleInputChange}
                        data-schema-key="propertiesData.properties.0.zip"
                      />
                    </div>
                  </div>
                </section>

                {/* Property Details Section */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Property Details</h3>
                  
                  <div className="flex gap-5 mb-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Property Type</label>
                      <select 
                        value={getValue('propertiesData.properties.0.property_type')}
                        onChange={handleInputChange}
                        data-schema-key="propertiesData.properties.0.property_type"
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500">
                        <option value="">Select Type</option>
                        <option value="single-family">Single Family</option>
                        <option value="condo">Condominium</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="multi-family">Multi-Family</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Year Built</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="propertiesData.properties.0.year_built"
                        value={getValue('propertiesData.properties.0.year_built')}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Square Footage</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="propertiesData.properties.0.square_footage"
                        value={getValue('propertiesData.properties.0.square_footage')}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="flex gap-5 mb-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Bedrooms</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="propertiesData.properties.0.bedrooms"
                        value={getValue('propertiesData.properties.0.bedrooms')}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Bathrooms</label>
                      <input 
                        type="number" 
                        step="0.5" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        data-schema-key="propertiesData.properties.0.bathrooms"
                        value={getValue('propertiesData.properties.0.bathrooms')}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Lot Size</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        placeholder="e.g., 0.25 acres"
                        data-schema-key="propertiesData.properties.0.lot_size"
                        value={getValue('propertiesData.properties.0.lot_size')}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </section>
              </form>
            </section>
          )}

          {/* Legal Description Tab */}
          {activeTab === 1 && (
            <section className="pb-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Legal Description</label>
                  <textarea 
                    className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                    rows={6}
                    placeholder="Enter the legal description of the property..."
                  ></textarea>
                </div>
              </div>
            </section>
          )}

          {/* Subdivision Tab */}
          {activeTab === 2 && (
            <section className="pb-10">
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subdivision Name</label>
                    <input type="text" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Block</label>
                    <input type="text" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Lot</label>
                    <input type="text" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Survey Tab */}
          {activeTab === 3 && (
            <section className="pb-10">
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Survey Required</label>
                    <select className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500">
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Survey Date</label>
                    <input type="date" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
              </div>
            </section>
          )}
          </>
          )}
        </section>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 p-5">
        {/* Chat */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa fa-chevron-down text-gray-400 text-xs"></i>
            <h4 className="text-white text-sm">Chat</h4>
          </div>
          <div className="text-xs text-gray-400">Chat functionality...</div>
        </section>

        {/* Tasks */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa fa-chevron-right text-gray-400 text-xs"></i>
            <h4 className="text-white text-sm">Tasks</h4>
            <span className="text-xs bg-gray-700 px-2 py-1 rounded">0 / 0</span>
          </div>
          <div className="text-xs text-gray-400 p-3 bg-gray-700 rounded">
            You have not been assigned any tasks on this order
          </div>
        </section>

        {/* Notes */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa fa-chevron-right text-gray-400 text-xs"></i>
            <h4 className="text-white text-sm">Notes</h4>
          </div>
          <div className="text-xs text-gray-400 p-3 bg-gray-700 rounded mb-3">
            No notes have been added to this page
          </div>
          <button type="button" className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded">
            Add Note
          </button>
        </section>
      </section>
    </>
  );
};

export default Properties;