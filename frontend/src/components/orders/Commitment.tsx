import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrderData } from '../../hooks/useOrderData';

const Commitment: React.FC = () => {
  const { loading, saving, handleInputChange, getValue, saveOrderData } = useOrderData();
  const { orderId } = useParams<{ orderId: string }>();
  const [activeTab, setActiveTab] = useState('schedule_a');

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <i className="fas fa-certificate text-blue-500 text-2xl mr-3"></i>
              <h2 className="text-xl font-semibold text-white">Commitment</h2>
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
          {/* Underwriter/Agent Options */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex space-x-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Underwriter
                </label>
                <select 
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
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
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Agent ID
                </label>
                <select 
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  data-schema-key="title.agent_id"
                  defaultValue="007139 (Branch M)"
                >
                  <option value="007139 (Branch M)">First National Title & Escrow, LLC (1100 Aquidneck Ave)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Underwriter Logo */}
          <div className="mb-6">
            <img src="/packages/qualia_integrations/assets/catic/logo.png" alt="CATIC Logo" className="h-16" />
          </div>

          {/* Commitment Actions */}
          <div className="flex space-x-2 mb-6">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded" title="Change Sublettering Format">
              <i className="fas fa-sort-numeric-up"></i>
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded" title="Keyboard Shortcuts">
              <i className="fas fa-keyboard"></i>
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded" title="Import from File">
              <i className="fas fa-upload"></i>
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded" title="Import from Order">
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Tab Menu */}
          <div className="flex border-b border-gray-600 mb-6">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'schedule_a'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('schedule_a')}
            >
              Schedule A
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'requirements'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('requirements')}
            >
              Requirements
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'exceptions'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('exceptions')}
            >
              Exceptions
            </button>
          </div>

          {/* Schedule A Content */}
          {activeTab === 'schedule_a' && (
            <div className="space-y-6">
              {/* Commitment Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Commitment Type
                  </label>
                  <select 
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    data-schema-key="title.commitment_type"
                    defaultValue="commitment"
                  >
                    <option value="commitment">Commitment</option>
                  </select>
                </div>
              </div>

              {/* Chain of Title */}
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-white">Chain of Title</h4>
                  <div className="flex space-x-2">
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm">
                      <i className="fas fa-plus"></i>
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>

                {/* Deed Tab */}
                <div className="border-b border-gray-600 mb-4">
                  <button className="text-blue-500 font-medium px-3 py-2 border-b-2 border-blue-500">
                    #1 Deed
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Grantor
                      </label>
                      <textarea
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        data-schema-key="properties.0.deeds.0.grantor"
                        rows={5}
                        placeholder="Enter grantor information..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Grantee
                      </label>
                      <textarea
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        data-schema-key="properties.0.deeds.0.grantee"
                        rows={5}
                        placeholder="Enter grantee information..."
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Instrument Type
                        </label>
                        <select 
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                          data-schema-key="properties.0.deeds.0.instrument_type"
                          defaultValue="Deed"
                        >
                          <option value="Affidavit">Affidavit</option>
                          <option value="Deed">Deed</option>
                          <option value="Lease">Lease</option>
                          <option value="Contract">Contract</option>
                          <option value="Will">Will</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Document Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                          data-schema-key="properties.0.deeds.0.document_type_label"
                          placeholder="Enter document name..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Date of Document
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 pl-10 text-white focus:outline-none focus:border-blue-500"
                            data-schema-key="properties.0.deeds.0.deed_date"
                            placeholder="MM/DD/YYYY"
                          />
                          <i className="fas fa-calendar absolute left-3 top-3 text-gray-400"></i>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Recorded Date
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 pl-10 text-white focus:outline-none focus:border-blue-500"
                            data-schema-key="properties.0.deeds.0.recorded_date"
                            placeholder="MM/DD/YYYY"
                          />
                          <i className="fas fa-calendar absolute left-3 top-3 text-gray-400"></i>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Book
                        </label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                          data-schema-key="properties.0.deeds.0.book"
                          placeholder="Enter book number..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Page
                        </label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                          data-schema-key="properties.0.deeds.0.page"
                          placeholder="Enter page number..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Instrument #
                        </label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                          data-schema-key="properties.0.deeds.0.instrument_number"
                          placeholder="Enter instrument #..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Cert. of Title #
                        </label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                          data-schema-key="properties.0.deeds.0.certificate_of_title_number"
                          placeholder="Enter cert #..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Document #
                        </label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                          data-schema-key="properties.0.deeds.0.document_number"
                          placeholder="Enter document #..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chain of Title Clause */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Chain of Title Clause
                    <a href="#" className="text-blue-500 ml-2 text-sm">Add Hyperlink</a>
                  </label>
                  <textarea
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    data-schema-key="properties.0.deeds.0.chain_of_title_clause"
                    rows={5}
                    placeholder="Enter chain of title clause..."
                  />
                </div>
              </div>

              {/* Legal Description Link */}
              <div className="mb-6">
                <a href={`/orders/${orderId}/properties/0/legal_description`} className="text-blue-500 hover:text-blue-400">
                  Edit Legal Description
                </a>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Additional Info</h3>
                
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      data-schema-key="properties.0.title_vesting_include_deed"
                    />
                    <span className="ml-2 text-gray-300">Include document information on title vesting</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title Vesting
                      <a href="#" className="text-blue-500 ml-2 text-sm">Add Hyperlink</a>
                    </label>
                    <textarea
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      data-schema-key="properties.0.title_vesting"
                      rows={3}
                      placeholder="Enter title vesting information..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Estate Type
                      <a href="#" className="text-blue-500 ml-2 text-sm">Add Hyperlink</a>
                    </label>
                    <textarea
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      data-schema-key="properties.0.estate_type"
                      rows={3}
                      placeholder="Enter estate type..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Requirements Tab Content */}
          {activeTab === 'requirements' && (
            <div className="space-y-6">
              {/* Curative Mode Button */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <select 
                    className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    data-schema-key="title.default_conditions"
                  >
                    <option value="">Standard Text</option>
                    <option value="empty">Empty</option>
                  </select>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center">
                    Add Requirement
                    <i className="fas fa-chevron-down ml-2"></i>
                  </button>
                </div>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center">
                  <i className="fas fa-tasks mr-2"></i>
                  Curative Mode
                </button>
              </div>

              {/* Requirements Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Requirements</h3>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm">
                  To Top
                </button>
              </div>

              {/* Requirements Table */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="w-8 px-3 py-2 text-left text-gray-400 text-sm"></th>
                      <th className="w-12 px-3 py-2 text-left text-gray-400 text-sm"></th>
                      <th className="flex-1 px-3 py-2 text-left text-gray-400 text-sm">Description</th>
                      <th className="w-48 px-3 py-2 text-left text-gray-400 text-sm">Actions</th>
                      <th className="w-16 px-3 py-2 text-left text-gray-400 text-sm">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Requirement 1 */}
                    <tr className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="px-3 py-3">
                        <i className="fas fa-bars text-gray-500 cursor-move"></i>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-400">1.</td>
                      <td className="px-3 py-3">
                        <div 
                          className="text-white bg-transparent border-none outline-none w-full resize-none"
                          contentEditable
                          data-schema-key="title.schedule_b.requirements.0.text"
                        >
                          The Proposed Insured must notify the Company in writing of the name of any party not referred to in this Commitment who will obtain an interest in the Land or who will make a loan on the Land. The Company may then make additional Requirements or Exceptions.
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex space-x-1">
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Notes">
                            <i className="fas fa-sticky-note"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Up">
                            <i className="fas fa-caret-up"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Down">
                            <i className="fas fa-caret-down"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Indent">
                            <i className="fas fa-indent"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="List Format">
                            <i className="fas fa-list-ol"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Split">
                            <i className="fas fa-list"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Add Link">
                            <i className="fas fa-link"></i>
                          </button>
                          <button className="bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs" title="Remove">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3"></td>
                    </tr>

                    {/* Requirement 2 */}
                    <tr className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="px-3 py-3">
                        <i className="fas fa-bars text-gray-500 cursor-move"></i>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-400">2.</td>
                      <td className="px-3 py-3">
                        <div 
                          className="text-white bg-transparent border-none outline-none w-full resize-none"
                          contentEditable
                          data-schema-key="title.schedule_b.requirements.1.text"
                        >
                          Pay the agreed amount for the estate or interest to be insured.
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex space-x-1">
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Notes">
                            <i className="fas fa-sticky-note"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Up">
                            <i className="fas fa-caret-up"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Down">
                            <i className="fas fa-caret-down"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Indent">
                            <i className="fas fa-indent"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="List Format">
                            <i className="fas fa-list-ol"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Split">
                            <i className="fas fa-list"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Add Link">
                            <i className="fas fa-link"></i>
                          </button>
                          <button className="bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs" title="Remove">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3"></td>
                    </tr>

                    {/* Requirement 3 */}
                    <tr className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="px-3 py-3">
                        <i className="fas fa-bars text-gray-500 cursor-move"></i>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-400">3.</td>
                      <td className="px-3 py-3">
                        <div 
                          className="text-white bg-transparent border-none outline-none w-full resize-none"
                          contentEditable
                          data-schema-key="title.schedule_b.requirements.2.text"
                        >
                          Pay the premiums, fees, and charges for the Policy to the Company.
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex space-x-1">
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Notes">
                            <i className="fas fa-sticky-note"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Up">
                            <i className="fas fa-caret-up"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Down">
                            <i className="fas fa-caret-down"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Indent">
                            <i className="fas fa-indent"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="List Format">
                            <i className="fas fa-list-ol"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Split">
                            <i className="fas fa-list"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Add Link">
                            <i className="fas fa-link"></i>
                          </button>
                          <button className="bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs" title="Remove">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3"></td>
                    </tr>

                    {/* Requirement 4 */}
                    <tr className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="px-3 py-3">
                        <i className="fas fa-bars text-gray-500 cursor-move"></i>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-400">4.</td>
                      <td className="px-3 py-3">
                        <div 
                          className="text-white bg-transparent border-none outline-none w-full resize-none"
                          contentEditable
                          data-schema-key="title.schedule_b.requirements.3.text"
                        >
                          Documents satisfactory to the Company that convey the Title or create the Mortgage to be insured, or both, must be properly authorized, executed, delivered, and recorded in the Public Records.
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex space-x-1">
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Notes">
                            <i className="fas fa-sticky-note"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Up">
                            <i className="fas fa-caret-up"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Down">
                            <i className="fas fa-caret-down"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Indent">
                            <i className="fas fa-indent"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="List Format">
                            <i className="fas fa-list-ol"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Split">
                            <i className="fas fa-list"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Add Link">
                            <i className="fas fa-link"></i>
                          </button>
                          <button className="bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs" title="Remove">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3"></td>
                    </tr>

                    {/* Additional Requirements (Dynamic) */}
                    <tr className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="px-3 py-3">
                        <i className="fas fa-bars text-gray-500 cursor-move"></i>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-400"></td>
                      <td className="px-3 py-3">
                        <div 
                          className="text-white bg-transparent border-none outline-none w-full resize-none"
                          contentEditable
                          data-schema-key="title.schedule_b.requirements.4.text"
                        >
                          Duly authorized and executed Deed from [GRANTOR], to Tom TEST TOM TEST, a married man, as his sole and separate property, to be executed and recorded at closing.
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex space-x-1">
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Notes">
                            <i className="fas fa-sticky-note"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Up">
                            <i className="fas fa-caret-up"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Down">
                            <i className="fas fa-caret-down"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Indent">
                            <i className="fas fa-indent"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="List Format">
                            <i className="fas fa-list-ol"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Split">
                            <i className="fas fa-list"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Add Link">
                            <i className="fas fa-link"></i>
                          </button>
                          <button className="bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs" title="Remove">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3"></td>
                    </tr>

                    <tr className="hover:bg-gray-750">
                      <td className="px-3 py-3">
                        <i className="fas fa-bars text-gray-500 cursor-move"></i>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-400"></td>
                      <td className="px-3 py-3">
                        <div 
                          className="text-white bg-transparent border-none outline-none w-full resize-none"
                          contentEditable
                          data-schema-key="title.schedule_b.requirements.5.text"
                        >
                          Duly authorized and executed Mortgage from Tom TEST TOM TEST, a married man, as his sole and separate property, to Bank of Colorado, securing its loan in the amount of [LOAN_AMOUNT].
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex space-x-1">
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Notes">
                            <i className="fas fa-sticky-note"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Up">
                            <i className="fas fa-caret-up"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Down">
                            <i className="fas fa-caret-down"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Indent">
                            <i className="fas fa-indent"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="List Format">
                            <i className="fas fa-list-ol"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Split">
                            <i className="fas fa-list"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Add Link">
                            <i className="fas fa-link"></i>
                          </button>
                          <button className="bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs" title="Remove">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Exceptions Tab Content */}
          {activeTab === 'exceptions' && (
            <div className="space-y-6">
              {/* Curative Mode Button */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <select 
                    className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    data-schema-key="title.default_conditions"
                  >
                    <option value="">Standard Text</option>
                    <option value="empty">Empty</option>
                  </select>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center">
                    Add Exception
                    <i className="fas fa-chevron-down ml-2"></i>
                  </button>
                </div>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center">
                  <i className="fas fa-tasks mr-2"></i>
                  Curative Mode
                </button>
              </div>

              {/* Exceptions Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Exceptions</h3>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm">
                  To Top
                </button>
              </div>

              {/* Exceptions Table */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="w-8 px-3 py-2 text-left text-gray-400 text-sm"></th>
                      <th className="w-12 px-3 py-2 text-left text-gray-400 text-sm"></th>
                      <th className="flex-1 px-3 py-2 text-left text-gray-400 text-sm">Description</th>
                      <th className="w-48 px-3 py-2 text-left text-gray-400 text-sm">Actions</th>
                      <th className="w-16 px-3 py-2 text-left text-gray-400 text-sm">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Exception 1 */}
                    <tr className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="px-3 py-3">
                        <i className="fas fa-bars text-gray-500 cursor-move"></i>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-400">1.</td>
                      <td className="px-3 py-3">
                        <div 
                          className="text-white bg-transparent border-none outline-none w-full resize-none"
                          contentEditable
                          data-schema-key="title.schedule_b.exceptions.0.text"
                        >
                          Any defect, lien, encumbrance, adverse claim, or other matter that appears for the first time in the Public Records or is created, attaches, or is disclosed between the Commitment Date and the date on which all of the Schedule B, Part I—Requirements are met.
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex space-x-1">
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Notes">
                            <i className="fas fa-sticky-note"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Up">
                            <i className="fas fa-caret-up"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Down">
                            <i className="fas fa-caret-down"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Indent">
                            <i className="fas fa-indent"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="List Format">
                            <i className="fas fa-list-ol"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Split">
                            <i className="fas fa-list"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Add Link">
                            <i className="fas fa-link"></i>
                          </button>
                          <button className="bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs" title="Remove">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3"></td>
                    </tr>

                    {/* Exception 2 */}
                    <tr className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="px-3 py-3">
                        <i className="fas fa-bars text-gray-500 cursor-move"></i>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-400">2.</td>
                      <td className="px-3 py-3">
                        <div 
                          className="text-white bg-transparent border-none outline-none w-full resize-none"
                          contentEditable
                          data-schema-key="title.schedule_b.exceptions.1.text"
                        >
                          Rights or claims of persons in possession, other than the insured, which are not shown by the Public Records.
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex space-x-1">
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Notes">
                            <i className="fas fa-sticky-note"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Up">
                            <i className="fas fa-caret-up"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Down">
                            <i className="fas fa-caret-down"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Indent">
                            <i className="fas fa-indent"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="List Format">
                            <i className="fas fa-list-ol"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Split">
                            <i className="fas fa-list"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Add Link">
                            <i className="fas fa-link"></i>
                          </button>
                          <button className="bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs" title="Remove">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3"></td>
                    </tr>

                    {/* Exception 3 */}
                    <tr className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="px-3 py-3">
                        <i className="fas fa-bars text-gray-500 cursor-move"></i>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-400">3.</td>
                      <td className="px-3 py-3">
                        <div 
                          className="text-white bg-transparent border-none outline-none w-full resize-none"
                          contentEditable
                          data-schema-key="title.schedule_b.exceptions.2.text"
                        >
                          Any easements or claims of easements not shown by the Public Records, boundary line disputes, overlaps, encroachments, title to filled lands (if any) and all other facts which an accurate survey and inspection of the land would disclose and which are not shown by the Public Records.
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex space-x-1">
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Notes">
                            <i className="fas fa-sticky-note"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Up">
                            <i className="fas fa-caret-up"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Down">
                            <i className="fas fa-caret-down"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Indent">
                            <i className="fas fa-indent"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="List Format">
                            <i className="fas fa-list-ol"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Split">
                            <i className="fas fa-list"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Add Link">
                            <i className="fas fa-link"></i>
                          </button>
                          <button className="bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs" title="Remove">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3"></td>
                    </tr>

                    {/* Exception 4 */}
                    <tr className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="px-3 py-3">
                        <i className="fas fa-bars text-gray-500 cursor-move"></i>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-400">4.</td>
                      <td className="px-3 py-3">
                        <div 
                          className="text-white bg-transparent border-none outline-none w-full resize-none"
                          contentEditable
                          data-schema-key="title.schedule_b.exceptions.3.text"
                        >
                          Unrecorded mechanics' liens.
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex space-x-1">
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Notes">
                            <i className="fas fa-sticky-note"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Up">
                            <i className="fas fa-caret-up"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Down">
                            <i className="fas fa-caret-down"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Indent">
                            <i className="fas fa-indent"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="List Format">
                            <i className="fas fa-list-ol"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Split">
                            <i className="fas fa-list"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Add Link">
                            <i className="fas fa-link"></i>
                          </button>
                          <button className="bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs" title="Remove">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3"></td>
                    </tr>

                    {/* Exception 5 */}
                    <tr className="hover:bg-gray-750">
                      <td className="px-3 py-3">
                        <i className="fas fa-bars text-gray-500 cursor-move"></i>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-400">5.</td>
                      <td className="px-3 py-3">
                        <div 
                          className="text-white bg-transparent border-none outline-none w-full resize-none"
                          contentEditable
                          data-schema-key="title.schedule_b.exceptions.4.text"
                        >
                          Real estate taxes, municipal assessments and private association assessments, if any, including liens and assessments, not yet due and payable.
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex space-x-1">
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Notes">
                            <i className="fas fa-sticky-note"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Up">
                            <i className="fas fa-caret-up"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Move Down">
                            <i className="fas fa-caret-down"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Indent">
                            <i className="fas fa-indent"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="List Format">
                            <i className="fas fa-list-ol"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Split">
                            <i className="fas fa-list"></i>
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded text-xs" title="Add Link">
                            <i className="fas fa-link"></i>
                          </button>
                          <button className="bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs" title="Remove">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          </>
          )}
        </div>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 overflow-y-auto">
        <div className="p-4">
          {/* Commitment Panel */}
          <div className="mb-6">
            <div className="border-b border-gray-600 pb-2 mb-4">
              <h3 className="text-sm font-medium text-gray-300 flex items-center">
                <i className="fas fa-chevron-down mr-2"></i>
                Commitment
              </h3>
            </div>
            <div className="bg-gray-700 rounded p-3 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Commitment #
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                  data-schema-key="title.commitment_number"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Revision #
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                    data-schema-key="title.commitment_revision_number"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Term (Days)
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                    data-schema-key="title.commitment_termination_period"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Form
                </label>
                <select 
                  className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                  data-schema-key="title.commitment_form_version"
                  defaultValue="_2021_ALTA"
                >
                  <option value="_2021_ALTA">2021 ALTA</option>
                  <option value="_2006_ALTA">2006 ALTA</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Effective Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 pl-6 text-sm text-white focus:outline-none focus:border-blue-500"
                      data-schema-key="title.commitment_effective_date"
                      placeholder="MM/DD/YYYY"
                    />
                    <i className="fas fa-calendar absolute left-2 top-2 text-gray-400 text-xs"></i>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Effective Time
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                    data-schema-key="title.commitment_effective_time"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Print <i className="fas fa-print"></i>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-gray-600 hover:bg-gray-500 text-white text-xs py-1 px-2 rounded">
                    Draft
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-500 text-white text-xs py-1 px-2 rounded">
                    Final
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Marketplace Panel */}
          <div className="mb-6">
            <div className="border-b border-gray-600 pb-2 mb-4">
              <h3 className="text-sm font-medium text-gray-300 flex items-center">
                <i className="fas fa-chevron-down mr-2"></i>
                Marketplace
              </h3>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded flex items-center justify-center">
              <i className="fas fa-home mr-2"></i>
              View Title Work
            </button>
          </div>

          {/* Chat Panel */}
          <div className="mb-6">
            <div className="border-b border-gray-600 pb-2 mb-4">
              <h3 className="text-sm font-medium text-gray-300 flex items-center">
                <i className="fas fa-chevron-down mr-2"></i>
                Chat
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Tom Duhamel</span>
                <span className="text-gray-500">Online</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-gray-400">Steve Patti</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-gray-400">Brian M. Estus</span>
              </div>
            </div>
          </div>

          {/* Tasks Panel */}
          <div className="mb-6">
            <div className="border-b border-gray-600 pb-2 mb-4">
              <h3 className="text-sm font-medium text-gray-300 flex items-center">
                <i className="fas fa-chevron-down mr-2"></i>
                Tasks
                <span className="bg-gray-600 text-xs px-2 py-1 rounded ml-2">0 / 0</span>
              </h3>
            </div>
            <div className="bg-gray-700 rounded p-3">
              <p className="text-xs text-gray-400">You have not been assigned any tasks on this order</p>
            </div>
          </div>

          {/* Notes Panel */}
          <div>
            <div className="border-b border-gray-600 pb-2 mb-4">
              <h3 className="text-sm font-medium text-gray-300 flex items-center">
                <i className="fas fa-chevron-down mr-2"></i>
                Notes
              </h3>
            </div>
            <div className="bg-gray-700 rounded p-3 mb-3">
              <p className="text-xs text-gray-400">No notes have been added to this page</p>
            </div>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-3 rounded">
              Add Note
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Commitment;