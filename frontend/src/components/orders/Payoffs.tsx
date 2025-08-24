import { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

export default function Payoffs() {
  const { loading, saving, getValue, handleInputChange, handleSave } = useOrderData();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const renderPayoffTab = (payoffIndex: number) => {
    return (
      <section className="pb-10">
        <form className="space-y-8">
          {/* Search/Create Interface */}
          <section>
            <div className="grid grid-cols-2 gap-8">
              {/* Search Existing Lender */}
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <div className="bg-gray-700 px-5 py-3 text-center border-b border-gray-600">
                  <h4 className="text-base font-semibold text-white">Search Existing Lender</h4>
                </div>
                
                <div className="p-5 space-y-5">
                  <div className="relative">
                    <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Search by lender name..."
                    />
                  </div>
                  
                  <div className="border border-gray-600 rounded min-h-[200px] bg-gray-700">
                    <div className="p-4 text-center text-gray-400">
                      <i className="fa fa-search text-4xl mb-3"></i>
                      <p className="text-sm">Start typing to search for existing lenders</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Create New Lender */}
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <div className="bg-gray-700 px-5 py-3 text-center border-b border-gray-600">
                  <h4 className="text-base font-semibold text-white">Create New Lender</h4>
                </div>
                
                <div className="p-5 space-y-5">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Lender Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      value={getValue(`payoffs.${payoffIndex}.lender_name`) || ''}
                      onChange={handleInputChange}
                      data-schema-key={`payoffs.${payoffIndex}.lender_name`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Loan Number</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      value={getValue(`payoffs.${payoffIndex}.loan_number`) || ''}
                      onChange={handleInputChange}
                      data-schema-key={`payoffs.${payoffIndex}.loan_number`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Payoff Amount</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      value={getValue(`payoffs.${payoffIndex}.payoff_amount`) || ''}
                      onChange={handleInputChange}
                      data-schema-key={`payoffs.${payoffIndex}.payoff_amount`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Good Through Date</label>
                    <div className="relative">
                      <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="date"
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        value={getValue(`payoffs.${payoffIndex}.good_through_date`) || ''}
                        onChange={handleInputChange}
                        data-schema-key={`payoffs.${payoffIndex}.good_through_date`}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Per Diem</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        value={getValue(`payoffs.${payoffIndex}.per_diem`) || ''}
                        onChange={handleInputChange}
                        data-schema-key={`payoffs.${payoffIndex}.per_diem`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Recording Fee</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        value={getValue(`payoffs.${payoffIndex}.recording_fee`) || ''}
                        onChange={handleInputChange}
                        data-schema-key={`payoffs.${payoffIndex}.recording_fee`}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex items-center">
                      <label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="mr-2" 
                          checked={getValue(`payoffs.${payoffIndex}.payoff_ordered`) || false}
                          onChange={handleInputChange}
                          data-schema-key={`payoffs.${payoffIndex}.payoff_ordered`}
                        />
                        <span className="text-sm text-gray-300">Payoff Ordered</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="mr-2" 
                          checked={getValue(`payoffs.${payoffIndex}.payoff_received`) || false}
                          onChange={handleInputChange}
                          data-schema-key={`payoffs.${payoffIndex}.payoff_received`}
                        />
                        <span className="text-sm text-gray-300">Payoff Received</span>
                      </label>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    className="w-full px-4 py-2.5 bg-blue-600 border border-blue-600 rounded text-white text-sm hover:bg-blue-700 hover:border-blue-700"
                  >
                    Create Lender
                  </button>
                </div>
              </div>
            </div>
          </section>
        </form>
      </section>
    );
  };

  const tabNames = ['First Payoff', 'Second Payoff', 'Third Payoff', 'Fourth Payoff'];

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-credit-card text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Mortgage Payoffs</h2>
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
              <i className="fa fa-minus mr-2"></i>
              Remove
            </button>
            <button className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500">
              <i className="fa fa-plus mr-2"></i>
              Add
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
                {tabNames.map((tabName, index) => (
                  <button
                    key={index}
                    className={`px-5 py-4 bg-transparent border-none text-sm cursor-pointer border-b-3 ${
                      activeTab === index
                        ? 'text-blue-400 border-b-blue-400 bg-gray-800'
                        : 'text-gray-400 border-b-transparent hover:text-gray-300 hover:bg-gray-800'
                    }`}
                    onClick={() => handleTabChange(index)}
                  >
                    {tabName}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {tabNames.map((_, index) => (
                <div
                  key={index}
                  className={`tab-content ${activeTab === index ? '' : 'hidden'}`}
                >
                  {renderPayoffTab(index)}
                </div>
              ))}
            </>
          )}
        </section>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 p-5">
        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Marketplace</h4>
          <div className="space-y-3">
            <button className="w-full p-2.5 bg-blue-600 border-none rounded text-white text-sm cursor-pointer hover:bg-blue-700">
              <i className="fa fa-search mr-2"></i>
              Order Payoff
            </button>
            <button className="w-full p-2.5 bg-green-600 border-none rounded text-white text-sm cursor-pointer hover:bg-green-700">
              <i className="fa fa-file-text mr-2"></i>
              Order Release Tracking
            </button>
          </div>
        </section>

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