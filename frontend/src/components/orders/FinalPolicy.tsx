import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrderData } from '../../hooks/useOrderData';

const FinalPolicy: React.FC = () => {
  const { loading, saving, handleInputChange, getValue, saveOrderData } = useOrderData();
  const { orderId } = useParams<{ orderId: string }>();
  const [activeMainTab, setActiveMainTab] = useState('owners_policy');
  const [activeSubTab, setActiveSubTab] = useState('schedule_a');

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <div className="p-6 border-b border-gray-600">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold flex items-center">
              <i className="fas fa-file-contract mr-3 text-blue-400"></i>
              Final Policy
            </h2>
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
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
        <>
        {/* Underwriter & Agent Section */}
        <div className="p-6 bg-gray-800 border-b border-gray-600">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <label className="text-gray-300">Underwriter:</label>
              <select 
                className="bg-gray-700 border border-gray-600 text-white px-3 py-1 rounded"
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
            <div className="flex items-center space-x-2">
              <label className="text-gray-300">Agent ID:</label>
              <select 
                className="bg-gray-700 border border-gray-600 text-white px-3 py-1 rounded"
                data-schema-key="title.agent_id"
                defaultValue="007139 (Branch M)"
              >
                <option value="007139 (Branch M)">First National Title & Escrow, LLC (1100 Aquidneck Ave)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Underwriter Logo */}
        <div className="p-6 text-center">
          <img src="/packages/qualia_integrations/assets/catic/logo.png" alt="CATIC Logo" className="mx-auto h-16" />
        </div>

        {/* Main Policy Tabs */}
        <div className="border-b border-gray-600">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveMainTab('owners_policy')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeMainTab === 'owners_policy'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              Owner's Policy
            </button>
            <button
              onClick={() => setActiveMainTab('lenders_policy')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeMainTab === 'lenders_policy'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              Lender's Policy
            </button>
          </nav>
        </div>

        {/* Sub Tabs */}
        <div className="border-b border-gray-600">
          <nav className="flex space-x-6 px-6">
            <button
              onClick={() => setActiveSubTab('schedule_a')}
              className={`py-2 px-1 text-sm font-medium ${
                activeSubTab === 'schedule_a'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Schedule A
            </button>
            <button
              onClick={() => setActiveSubTab('exceptions')}
              className={`py-2 px-1 text-sm font-medium ${
                activeSubTab === 'exceptions'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Exceptions (B1)
            </button>
            {activeMainTab === 'lenders_policy' && (
              <button
                onClick={() => setActiveSubTab('subordinations')}
                className={`py-2 px-1 text-sm font-medium ${
                  activeSubTab === 'subordinations'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Subordinate Matters (B2)
              </button>
            )}
          </nav>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeSubTab === 'schedule_a' && (
            <div className="space-y-6">
              {/* Insured Vesting and Estate Type */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Insured Vesting
                    <i className="fas fa-question-circle ml-1 text-gray-400" title={`This field will print on the ${activeMainTab === 'owners_policy' ? "Owner's" : "Lender's"} Policy, Schedule A, Section 3.`}></i>
                  </label>
                  <textarea
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    data-schema-key={activeMainTab === 'owners_policy' ? 'title.policies.0.insured_vesting' : 'title.policies.1.insured_vesting'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Estate Type
                  </label>
                  <textarea
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    data-schema-key={activeMainTab === 'owners_policy' ? 'title.policies.0.policy_estate_type' : 'title.policies.1.policy_estate_type'}
                  />
                </div>
              </div>

              {/* Legal Description */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    {activeMainTab === 'owners_policy' ? "Owner's" : "Lender's"} Policy Final Legal Description
                  </label>
                  <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">View History</a>
                </div>
                <textarea
                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={13}
                  data-schema-key={activeMainTab === 'owners_policy' ? 'title.policies.0.final_legal_description' : 'title.policies.1.final_legal_description'}
                />
                <a 
                  href={`/orders/${orderId}/properties/0/legal_description?focusInput=properties.0.final_legal_description`}
                  className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
                >
                  Edit Legal Description
                </a>
              </div>

              {/* Recorded Instruments */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Recorded Instruments</h3>
                <div className="bg-gray-800 border border-gray-600 rounded-md p-8 text-center">
                  <i className="fas fa-file-signature text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-lg font-medium text-gray-300 mb-4">
                    No recorded instruments have been added to this order.
                  </h3>
                  <a
                    href={`/orders/${orderId}/recording`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Add Recorded Document
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'exceptions' && (
            <div className="bg-gray-800 border border-gray-600 rounded-md p-8 text-center">
              <i className="fas fa-exclamation-triangle text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-300 mb-4">
                Exceptions content will be displayed here
              </h3>
              <p className="text-gray-400">
                Policy exceptions and schedules
              </p>
            </div>
          )}

          {activeSubTab === 'subordinations' && (
            <div className="bg-gray-800 border border-gray-600 rounded-md p-8 text-center">
              <i className="fas fa-layer-group text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-300 mb-4">
                Subordinate Matters (B2) content will be displayed here
              </h3>
              <p className="text-gray-400">
                Subordinate liens and encumbrances for Lender's Policy
              </p>
            </div>
          )}
        </div>
        </>
        )}
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 overflow-y-auto">
        {/* Final Policy Details */}
        <div className="p-4 border-b border-gray-600">
          <div className="space-y-4">
            {/* Owner's Final Policy */}
            <div className="bg-gray-700 p-4 rounded">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white">Owner's Final Policy</h4>
                <i className="fas fa-chevron-up text-gray-400"></i>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="text-gray-300">Policy Type</label>
                  <div className="text-white">ALTA Homeowner's Policy</div>
                </div>
                <div>
                  <label className="text-gray-300">Form</label>
                  <div className="text-white">2021 ALTA</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-gray-300 block">Effective Date</label>
                    <input
                      type="text"
                      placeholder="xx/xx/xxxx"
                      className="w-full bg-gray-600 border border-gray-500 text-white text-xs px-2 py-1 rounded"
                      data-schema-key="title.policies.0.policy_effective_date"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 block">Effective Time</label>
                    <input
                      type="text"
                      placeholder="0:00"
                      className="w-full bg-gray-600 border border-gray-500 text-white text-xs px-2 py-1 rounded"
                      data-schema-key="title.policies.0.policy_effective_time"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-xs">
                    <input
                      type="checkbox"
                      className="mr-2"
                      data-schema-key="title.policies.0.policy_use_effective_time_text"
                    />
                    <span className="text-gray-300">Use Recording Date</span>
                    <i className="fas fa-question-circle ml-1 text-gray-400" title='Appends "or recording date of the insured instrument, whichever is later" to the effective time entered above'></i>
                  </label>
                  <label className="flex items-center text-xs">
                    <input
                      type="checkbox"
                      className="mr-2"
                      data-schema-key="title.policies.0.policy_concat_endorsements"
                    />
                    <span className="text-gray-300">Include Endorsements on Policy</span>
                    <i className="fas fa-question-circle ml-1 text-gray-400" title="Concatenates endorsement forms at the end of the final policy document."></i>
                  </label>
                  <label className="flex items-center text-xs">
                    <input
                      type="checkbox"
                      className="mr-2"
                      data-schema-key="title.policies.0.is_pro_forma_policy"
                    />
                    <span className="text-gray-300">Pro Forma Policy</span>
                    <i className="fas fa-question-circle ml-1 text-gray-400" title="Applies pro forma placeholders and default disclaimer language."></i>
                  </label>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition-colors">
                    Print
                  </button>
                  <button className="flex-1 bg-gray-600 text-gray-400 text-xs px-3 py-1 rounded cursor-not-allowed">
                    Issue
                  </button>
                </div>
              </div>
            </div>

            {/* Lender's Final Policy */}
            <div className="bg-gray-700 p-4 rounded">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white">Lender's Final Policy</h4>
                <i className="fas fa-chevron-up text-gray-400"></i>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="text-gray-300">Policy Type</label>
                  <div className="text-white">ALTA Loan Policy</div>
                </div>
                <div>
                  <label className="text-gray-300">Form</label>
                  <div className="text-white">2021 ALTA</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-gray-300 block">Effective Date</label>
                    <input
                      type="text"
                      placeholder="xx/xx/xxxx"
                      className="w-full bg-gray-600 border border-gray-500 text-white text-xs px-2 py-1 rounded"
                      data-schema-key="title.policies.1.policy_effective_date"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 block">Effective Time</label>
                    <input
                      type="text"
                      placeholder="0:00"
                      className="w-full bg-gray-600 border border-gray-500 text-white text-xs px-2 py-1 rounded"
                      data-schema-key="title.policies.1.policy_effective_time"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-xs">
                    <input
                      type="checkbox"
                      className="mr-2"
                      data-schema-key="title.policies.1.policy_use_effective_time_text"
                    />
                    <span className="text-gray-300">Use Recording Date</span>
                    <i className="fas fa-question-circle ml-1 text-gray-400" title='Appends "or recording date of the insured instrument, whichever is later" to the effective time entered above'></i>
                  </label>
                  <label className="flex items-center text-xs">
                    <input
                      type="checkbox"
                      className="mr-2"
                      data-schema-key="title.policies.1.policy_concat_endorsements"
                    />
                    <span className="text-gray-300">Include Endorsements on Policy</span>
                    <i className="fas fa-question-circle ml-1 text-gray-400" title="Concatenates endorsement forms at the end of the final policy document."></i>
                  </label>
                  <label className="flex items-center text-xs">
                    <input
                      type="checkbox"
                      className="mr-2"
                      data-schema-key="title.policies.1.is_pro_forma_policy"
                    />
                    <span className="text-gray-300">Pro Forma Policy</span>
                    <i className="fas fa-question-circle ml-1 text-gray-400" title="Applies pro forma placeholders and default disclaimer language."></i>
                  </label>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition-colors">
                    Print
                  </button>
                  <button className="flex-1 bg-gray-600 text-gray-400 text-xs px-3 py-1 rounded cursor-not-allowed">
                    Issue
                  </button>
                </div>
              </div>
            </div>

            {/* Issue All Policies */}
            <div className="pt-4">
              <button className="w-full bg-gray-600 text-gray-400 px-4 py-2 rounded cursor-not-allowed flex items-center justify-center">
                <i className="fas fa-check mr-2"></i>
                Issue All Policies
              </button>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="p-4 border-b border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-white">Chat</h4>
            <i className="fas fa-chevron-up text-gray-400"></i>
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
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Tom Duhamel</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-300">Steve Patti</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-300">Brian M. Estus</span>
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

export default FinalPolicy;