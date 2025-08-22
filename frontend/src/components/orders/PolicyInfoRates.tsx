import React, { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

const PolicyInfoRates: React.FC = () => {
  const { loading, saving, handleInputChange, getValue, saveOrderData } = useOrderData();
  const [activeTab, setActiveTab] = useState<'disclosed' | 'actual'>('disclosed');
  const [activePolicyTab, setActivePolicyTab] = useState(0);

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
            <div className="flex items-center">
              <i className="fas fa-file-alt text-2xl text-gray-400 mr-3"></i>
              <div>
                <h2 className="text-2xl font-bold text-white">Policy Info & Rates</h2>
                <span className="text-sm text-blue-400">Title</span>
              </div>
            </div>
            <button
              onClick={saveOrderData}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
          <>
          {/* Underwriter Selection */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Underwriter
                </label>
                <select 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-schema-key="underwriter"
                  defaultValue="catic"
                >
                  <option value="amtrust_asap">AmTrust</option>
                  <option value="catic">CATIC</option>
                  <option value="chicago">Chicago Title</option>
                  <option value="commonwealth">Commonwealth</option>
                  <option value="natic">Doma</option>
                  <option value="agents_national">Essent Title</option>
                  <option value="fidelity">Fidelity</option>
                  <option value="first_american">First American</option>
                  <option value="old_republic">Old Republic</option>
                  <option value="stewart">Stewart</option>
                  <option value="wfg">WFG</option>
                  <option value="westcor">Westcor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Agent ID
                </label>
                <select 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-schema-key="title.agent_id"
                  defaultValue="007139 (Branch M)"
                >
                  <option value="007139 (Branch M)">First National Title & Escrow, LLC (1100 Aquidneck Ave)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Rates Out-of-date Warning */}
          <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <i className="fas fa-exclamation-circle text-red-400 mr-3"></i>
                <div>
                  <div className="font-semibold text-red-200">Rates out-of-date</div>
                  <div className="text-sm text-red-300">Policy details have been modified.</div>
                </div>
              </div>
              <button className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600">
                Refresh
              </button>
            </div>
          </div>

          {/* Policy Tabs */}
          <div className="mb-6">
            <div className="flex space-x-4 border-b border-gray-700">
              <button
                className={`pb-2 px-1 ${activePolicyTab === 0 ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActivePolicyTab(0)}
              >
                Owner's Policy
              </button>
              <button
                className={`pb-2 px-1 ${activePolicyTab === 1 ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActivePolicyTab(1)}
              >
                Lender's Policy
              </button>
            </div>
          </div>

          {/* Policy Info */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Policy Type
                  </label>
                  <select 
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-schema-key={`title.policies.${activePolicyTab}.policy_type`}
                    defaultValue="alta_homeowner"
                  >
                    <option value="alta_owner">ALTA Owner's Policy</option>
                    <option value="alta_homeowner">ALTA Homeowner's Policy</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Form
                  </label>
                  <select 
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-schema-key={`title.policies.${activePolicyTab}.form_version`}
                    defaultValue="_2021_ALTA"
                  >
                    <option value="_2021_ALTA">2021 ALTA</option>
                    <option value="_2006_ALTA">2006 ALTA</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Insurance Amount
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      data-schema-key={`title.policies.${activePolicyTab}.insurance_amount`}
                      placeholder="$0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Rate Type
                    </label>
                    <select 
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      data-schema-key={`title.policies.${activePolicyTab}.rate_type`}
                      defaultValue="basic"
                    >
                      <option value="basic">Basic</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Rate Effective Date
                    <span className="ml-1 text-xs text-gray-500">(Rate Update Dates: 09/01/2020, 05/01/2021, 01/01/2023)</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-schema-key="title.rate_effective_date"
                    placeholder="MM/DD/YYYY"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Policy Proposed Insured
                  <span className="ml-1 text-xs text-gray-500">(Prints on Commitment & Final Policy)</span>
                </label>
                <textarea
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-schema-key={`title.policies.${activePolicyTab}.proposed_insured`}
                  rows={5}
                  placeholder="Enter proposed insured..."
                />
              </div>
            </div>
          </div>

          {/* Endorsements Section */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold text-white mr-3">Endorsements</h3>
                <span className="px-2 py-1 text-xs bg-green-600 text-white rounded">
                  {activePolicyTab === 0 ? 'Owner' : 'Lender'}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-700">
                  Apply Defaults
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                  Add Endorsement
                </button>
              </div>
            </div>

            <div className="text-center py-8 bg-gray-700 rounded">
              <i className="fas fa-file-alt text-4xl text-gray-500 mb-3"></i>
              <p className="text-gray-400">There are currently no endorsements on the policy.</p>
            </div>
          </div>

          {/* Premiums Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold text-white mr-3">Premiums</h3>
              <span className="px-2 py-1 text-xs bg-green-600 text-white rounded">
                {activePolicyTab === 0 ? 'Owner' : 'Lender'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Actual</label>
                <div className="text-xl font-semibold text-white">
                  {activePolicyTab === 0 ? '$2,041.00' : '$0.00'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Disclosed</label>
                <div className="text-xl font-semibold text-white">
                  {activePolicyTab === 0 ? '$1,008.00' : '$0.00'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Paid By</label>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Buyer</button>
                  <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600">Seller</button>
                  <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600">Split</button>
                  <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600">Paid by Others</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Disclosed Title Payee</label>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600">Issuing Agency</button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Underwriter</button>
                </div>
              </div>
            </div>
          </div>
          </>
        )}
        </div>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 p-4 overflow-y-auto">
        {/* Disclosed/Actual Toggle */}
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 text-sm ${activeTab === 'disclosed' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'} rounded-l`}
            onClick={() => setActiveTab('disclosed')}
          >
            Disclosed
          </button>
          <button
            className={`flex-1 py-2 text-sm ${activeTab === 'actual' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'} rounded-r`}
            onClick={() => setActiveTab('actual')}
          >
            Actual
          </button>
        </div>

        {/* Owner's Policy Summary */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-300">Owner's Policy</h4>
            <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
          </div>
          <div className="bg-gray-700 rounded p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Policy</span>
              <span className="text-white">{activeTab === 'disclosed' ? '$1,008.00' : '$2,041.00'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Endorsements</span>
              <span className="text-white">$0.00</span>
            </div>
            <div className="border-t border-gray-600 pt-2 flex justify-between text-sm font-semibold">
              <span className="text-gray-300">{activeTab === 'disclosed' ? 'Disclosed' : 'Actual'} Total</span>
              <span className="text-white">{activeTab === 'disclosed' ? '$1,008.00' : '$2,041.00'}</span>
            </div>
          </div>
        </div>

        {/* Lender's Policy Summary */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-300">Lender's Policy</h4>
            <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
          </div>
          <div className="bg-gray-700 rounded p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Policy</span>
              <span className="text-white">{activeTab === 'disclosed' ? 'N/A' : '$0.00'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Endorsements</span>
              <span className="text-white">$0.00</span>
            </div>
            <div className="border-t border-gray-600 pt-2 flex justify-between text-sm font-semibold">
              <span className="text-gray-300">{activeTab === 'disclosed' ? 'Disclosed' : 'Actual'} Total</span>
              <span className="text-white">$0.00</span>
            </div>
          </div>
        </div>

        {/* Rates Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-300">Rates</h4>
            <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
          </div>
          <div className="bg-gray-700 rounded p-3 space-y-3">
            <div>
              <div className="text-xs text-gray-400 mb-1">Default Split</div>
              <input
                type="text"
                className="w-full px-2 py-1 text-sm bg-gray-600 border border-gray-500 rounded text-white"
                placeholder="You / Underwriter"
                data-schema-key="title.premium_split"
              />
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Last Refreshed</div>
              <div className="text-sm text-white">5 months ago</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Rate Status</div>
              <div className="flex items-center text-sm text-red-400">
                <i className="fas fa-exclamation-circle mr-1"></i>
                Out-of-date
              </div>
            </div>
            <button className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
              Refresh Rates
            </button>
            <button className="w-full py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-600 text-sm">
              Adjust Rates
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PolicyInfoRates;