import React from 'react';
import { useOrderData } from '../../hooks/useOrderData';

const Cpl: React.FC = () => {
  const { loading, saving, handleInputChange, getValue, saveOrderData } = useOrderData();

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
            <div className="flex items-center">
              <i className="fas fa-file-contract text-2xl text-gray-400 mr-3"></i>
              <div>
                <h2 className="text-2xl font-bold text-white">Closing Protection Letter</h2>
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

          {/* Create New CPL Form */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Create New CPL</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Protected Party
                </label>
                <select 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-schema-key="cpl_target"
                >
                  <option value="">Select one...</option>
                  <option value="lender-LcRuZGCWSS2AHfzHP">Bank of Colorado (Lender)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  CPL Type
                </label>
                <select 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-schema-key="cpl_id"
                  defaultValue="jc ftw"
                >
                  <option value="jc ftw">Standard</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-500 mr-2"
                  data-schema-key="add_borrower_on_loan"
                />
                <span className="text-sm">Add Borrower on Loan</span>
              </label>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                Issue CPL
              </button>
            </div>
          </div>

          {/* CPL Grid - Empty State */}
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <i className="fas fa-file-contract text-5xl text-gray-600 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-400">
              No CPLs have been issued yet.
            </h3>
          </div>
            </>
          )}
        </div>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 p-4 overflow-y-auto">
        {/* Chat Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-300">Chat</h3>
            <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-3">
            <button className="px-2 py-1 text-xs bg-gray-700 text-white rounded">All</button>
            <button className="px-2 py-1 text-xs text-gray-400 hover:text-white">Messages</button>
            <button className="px-2 py-1 text-xs text-gray-400 hover:text-white">Channels</button>
          </div>

          {/* Direct Messages */}
          <div className="space-y-2">
            <div className="text-xs text-gray-400 mb-2">Direct Messages</div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-300">Tom Duhamel</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              <span className="text-gray-400">Steve Patti</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              <span className="text-gray-400">Brian M. Estus</span>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <h3 className="text-sm font-semibold text-gray-300 mr-2">Tasks</h3>
              <span className="px-2 py-0.5 text-xs bg-gray-700 text-gray-400 rounded">0 / 0</span>
            </div>
            <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
          </div>
          <div className="bg-gray-700 rounded p-3 text-sm text-gray-400">
            You have not been assigned any tasks on this order
          </div>
        </div>

        {/* Notes Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-300">Notes</h3>
            <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
          </div>
          <div className="bg-gray-700 rounded p-3 text-sm text-gray-400 mb-3">
            No notes have been added to this page
          </div>
          <button className="w-full py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-700 text-sm">
            Add Note
          </button>
        </div>
      </section>
    </>
  );
};

export default Cpl;