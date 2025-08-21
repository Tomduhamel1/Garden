import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Recording: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [activeTab, setActiveTab] = useState('recorded_documents');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header with Add Button */}
        <div className="p-6 border-b border-gray-600">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold flex items-center">
              <i className="fas fa-university mr-3 text-blue-400"></i>
              Recording
            </h2>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
            >
              Add Recorded Document
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-600">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('recorded_documents')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'recorded_documents'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              Recorded Documents
            </button>
            <button
              onClick={() => setActiveTab('erecording')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'erecording'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              E-Recording
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'recorded_documents' && (
            <div className="bg-gray-800 border border-gray-600 rounded-md p-12 text-center">
              <i className="fas fa-university text-5xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-medium text-gray-300 mb-4">
                No documents have been recorded
              </h3>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
              >
                Add Recorded Document
              </button>
            </div>
          )}

          {activeTab === 'erecording' && (
            <div>
              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 mb-6">
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors flex items-center">
                  <i className="fas fa-plus mr-2"></i>
                  Document
                </button>
                <button className="bg-gray-600 text-gray-400 px-4 py-2 rounded cursor-not-allowed flex items-center" disabled>
                  <i className="fas fa-upload mr-2"></i>
                  Simplifile Upload
                </button>
              </div>

              {/* Recording Office Section */}
              <div className="border-b border-gray-600 pb-4 mb-6">
                <h3 className="text-lg font-medium text-white mb-2">City Warwick</h3>
              </div>

              {/* New eRecording Package */}
              <div className="bg-gray-800 border border-gray-600 rounded-md p-8">
                <h4 className="text-lg font-medium text-gray-300 mb-6 text-center">
                  New eRecording package
                </h4>
                
                <div className="max-w-md mx-auto space-y-4">
                  {/* Recording Office Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Recording office
                    </label>
                    <select 
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      data-schema-key="simplifile_packages.open.registry"
                      defaultValue="City Warwick"
                    >
                      <option value="Barrington">Barrington</option>
                      <option value="Central Falls">Central Falls</option>
                      <option value="Charlestown">Charlestown</option>
                      <option value="City Cranston">City Cranston</option>
                      <option value="City East Providence">City East Providence</option>
                      <option value="City Newport">City Newport</option>
                      <option value="City Pawtucket">City Pawtucket</option>
                      <option value="City Providence">City Providence</option>
                      <option value="City Warwick">City Warwick</option>
                      <option value="Coventry">Coventry</option>
                      <option value="Cumberland">Cumberland</option>
                      <option value="East Greenwich">East Greenwich</option>
                      <option value="Johnston">Johnston</option>
                      <option value="Lincoln">Lincoln</option>
                      <option value="Narragansett">Narragansett</option>
                      <option value="New Shoreham">New Shoreham</option>
                      <option value="Newport">Newport</option>
                      <option value="North Kingstown">North Kingstown</option>
                      <option value="North Providence">North Providence</option>
                      <option value="North Smithfield">North Smithfield</option>
                      <option value="Richmond">Richmond</option>
                      <option value="Scituate">Scituate</option>
                      <option value="Smithfield">Smithfield</option>
                      <option value="South Kingstown">South Kingstown</option>
                      <option value="Tiverton">Tiverton</option>
                      <option value="Warren">Warren</option>
                      <option value="Warwick">Warwick</option>
                      <option value="West Warwick">West Warwick</option>
                      <option value="Westerly">Westerly</option>
                    </select>
                  </div>

                  {/* Township Dropdown (hidden by default) */}
                  <div className="hidden">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Township
                    </label>
                    <select 
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      data-schema-key="simplifile_packages.open.township"
                    >
                      <option value="">Select one...</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 overflow-y-auto">
        {/* Chat Section */}
        <div className="p-4 border-b border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-white">Chat</h4>
            <i className="fas fa-chevron-down text-gray-400"></i>
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
                {/* Online Users */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white text-xs">Tom Duhamel</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white text-xs">Nicole Micciche</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white text-xs">Amber Wurm</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white text-xs">Elizabeth McColeman</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white text-xs">Cindy Bescher</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white text-xs">Brittany M. Arrington</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white text-xs">Karina Gomez</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white text-xs">Tiffany L Savoy</span>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
                {/* Idle Users */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300 text-xs">John Furtado</span>
                  <span className="text-gray-400 text-xs">Idle 53m</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300 text-xs">Alexander Joyal</span>
                  <span className="text-gray-400 text-xs">Idle 53m</span>
                </div>
                {/* Offline Users */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-300 text-xs">Steve Patti</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-300 text-xs">Brian M. Estus</span>
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

      {/* Add Recorded Document Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Add Recorded Document</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="space-y-4">
              {/* Instrument Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Instrument Type
                  </label>
                  <select 
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    data-schema-key="recording.instrument_type"
                  >
                    <option value="">Select one...</option>
                    <option value="Assignment Mortgage">Assignment Mortgage</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Bond">Bond</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Certificate of Sale">Certificate of Sale</option>
                    <option value="Certificate of Lien">Certificate of Lien</option>
                    <option value="Certificate of Liens">Certificate of Liens</option>
                    <option value="Certificate of Redemption">Certificate of Redemption</option>
                    <option value="Certified Copy">Certified Copy</option>
                    <option value="Condominium Declaration">Condominium Declaration</option>
                    <option value="Death Certificate">Death Certificate</option>
                    <option value="Deed">Deed</option>
                    <option value="Deed of Trust">Deed of Trust</option>
                    <option value="Discharge">Discharge</option>
                    <option value="Discharge Mortgage">Discharge Mortgage</option>
                    <option value="Easement">Easement</option>
                    <option value="Execution">Execution</option>
                    <option value="Judgment">Judgment</option>
                    <option value="Land Court Memo">Land Court Memo</option>
                    <option value="Lease">Lease</option>
                    <option value="Lien">Lien</option>
                    <option value="Mortgage">Mortgage</option>
                    <option value="Municipal Lien Certificate">Municipal Lien Certificate</option>
                    <option value="Order">Order</option>
                    <option value="Partial Discharge">Partial Discharge</option>
                    <option value="Partial Release">Partial Release</option>
                    <option value="Plan">Plan</option>
                    <option value="Power of Attorney">Power of Attorney</option>
                    <option value="Purchase Agreement">Purchase Agreement</option>
                    <option value="Quitclaim Deed">Quitclaim Deed</option>
                    <option value="Release">Release</option>
                    <option value="Subordination Agreement">Subordination Agreement</option>
                    <option value="UCC-3">UCC-3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Recorded Document File
                  </label>
                  <select 
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    data-schema-key="recording.document_file"
                  >
                    <option value="">Select one...</option>
                    <option value="Certificate of Trust">Certificate of Trust</option>
                    <option value="Certificate of Trust -NC">Certificate of Trust -NC</option>
                    <option value="Certificate of Trust - Recorded">Certificate of Trust - Recorded</option>
                    <option value="Deed">Deed</option>
                    <option value="Deed - Corporate">Deed - Corporate</option>
                    <option value="Deed - Individual">Deed - Individual</option>
                    <option value="Deed - Individual (AKA)">Deed - Individual (AKA)</option>
                    <option value="Deed - Quitclaim">Deed - Quitclaim</option>
                    <option value="Deed - Short Form">Deed - Short Form</option>
                    <option value="Deed - Survivorship - Joint Tenants">Deed - Survivorship - Joint Tenants</option>
                    <option value="Deed - Tenants by the Entirety">Deed - Tenants by the Entirety</option>
                    <option value="Deed - Tenants in Common">Deed - Tenants in Common</option>
                    <option value="Deed - Trustee">Deed - Trustee</option>
                    <option value="Deed - Warranty">Deed - Warranty</option>
                    <option value="Discharge of Mortgage">Discharge of Mortgage</option>
                    <option value="Limited Power of Attorney">Limited Power of Attorney</option>
                    <option value="Limited Power of Attorney - NC">Limited Power of Attorney - NC</option>
                    <option value="Limited Power of Attorney - RI">Limited Power of Attorney - RI</option>
                    <option value="Memorandum of Lease">Memorandum of Lease</option>
                    <option value="Memorandum of Purchase">Memorandum of Purchase</option>
                    <option value="Mortgage">Mortgage</option>
                    <option value="Power of Attorney">Power of Attorney</option>
                    <option value="Subordination of Mortgage">Subordination of Mortgage</option>
                    <option value="Termination of Notice of Lease">Termination of Notice of Lease</option>
                  </select>
                </div>
              </div>

              {/* Recording Information */}
              <div className="border-t border-gray-600 pt-4">
                <h4 className="text-lg font-medium text-white mb-4">Recording Information</h4>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Recording Date
                    </label>
                    <input
                      type="date"
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      data-schema-key="recording.date"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Recording Time
                    </label>
                    <input
                      type="time"
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      data-schema-key="recording.time"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Book
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      data-schema-key="recording.book"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Page
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      data-schema-key="recording.page"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Instrument #
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      data-schema-key="recording.instrument_number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cert of Title #
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      data-schema-key="recording.cert_of_title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Doc #
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      data-schema-key="recording.doc_number"
                    />
                  </div>
                </div>
              </div>

              {/* Fees */}
              <div className="border-t border-gray-600 pt-4">
                <h4 className="text-lg font-medium text-white mb-4">Fees</h4>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Recording Fee
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 text-white pl-8 pr-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        data-schema-key="recording.recording_fee"
                        defaultValue="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tax
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 text-white pl-8 pr-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        data-schema-key="recording.tax"
                        defaultValue="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Submission Fee
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 text-white pl-8 pr-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        data-schema-key="recording.submission_fee"
                        defaultValue="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-600">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                >
                  Add Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Recording;