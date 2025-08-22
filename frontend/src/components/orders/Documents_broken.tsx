import React, { useState } from 'react';\nimport { useOrderData } from '../../hooks/useOrderData';

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  status: string;
}

const Documents: React.FC = () => {
  const { loading, saving, getValue, handleInputChange, handleSave } = useOrderData();
  const [selectedMode, setSelectedMode] = useState<'generate' | 'scan' | 'upload'>('generate');
  const [groupBy, setGroupBy] = useState('package');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');

  const folders = [
    '*FNTE - Purchase Documents',
    '*FNTE - Refinance Documents',
    'State Specific Documents',
    'CA - Purchase',
    'CA - Refinance',
    'Custom Templates',
    'Lender Documents',
    'Title Documents',
    'Escrow Documents',
    'Legal Documents',
  ];

  const documents: Document[] = [
    { id: '1', name: 'ALTA Settlement Statement', type: 'PDF', date: '03/21/2025', size: '124 KB', status: 'Ready' },
    { id: '2', name: 'Closing Disclosure', type: 'PDF', date: '03/21/2025', size: '89 KB', status: 'Ready' },
    { id: '3', name: 'Warranty Deed', type: 'PDF', date: '03/21/2025', size: '45 KB', status: 'Draft' },
    { id: '4', name: 'Title Insurance Policy', type: 'PDF', date: '03/21/2025', size: '234 KB', status: 'Pending' },
    { id: '5', name: 'Loan Estimate', type: 'PDF', date: '03/18/2025', size: '67 KB', status: 'Final' },
  ];

  const filteredFolders = folders.filter(folder => 
    folder.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <i className="fa fa-file-text-o text-gray-400 text-xl"></i>
              <h2 className="text-2xl font-semibold text-white">Documents</h2>
            </div>
            <div className="flex gap-2">
              <button 
                type="button" 
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded flex items-center gap-2" 
                title="Add a folder"
              >
                <i className="fa fa-folder-o"></i>
                <i className="fa fa-plus text-xs"></i>
              </button>
              <div className="relative">
                <button 
                  type="button" 
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded" 
                  title="Search files"
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="px-10 py-4 border-b border-gray-700">
          <div className="flex items-center gap-2 text-gray-400">
            <i className="fa fa-hdd-o"></i>
            <span className="text-white">All Documents</span>
          </div>
        </section>

        {/* Document View */}
        <section className="flex">
          {/* Template Browser (Left Panel) */}
          <div className="w-80 bg-gray-800 border-r border-gray-600">
            {/* Mode Selector */}
            <div className="flex border-b border-gray-600">
              <button 
                type="button" 
                className={`flex-1 px-4 py-3 ${selectedMode === 'generate' ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700 text-gray-400'} border-r border-gray-600 flex flex-col items-center gap-1`}
                onClick={() => setSelectedMode('generate')}
              >
                <i className="fa fa-file-text text-lg"></i>
                <span className="text-xs">Generate</span>
              </button>
              <button 
                type="button" 
                className={`flex-1 px-4 py-3 ${selectedMode === 'scan' ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700 text-gray-400'} border-r border-gray-600 flex flex-col items-center gap-1`}
                onClick={() => setSelectedMode('scan')}
              >
                <i className="fa fa-qrcode text-lg"></i>
                <span className="text-xs">Scan</span>
              </button>
              <button 
                type="button" 
                className={`flex-1 px-4 py-3 ${selectedMode === 'upload' ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700 text-gray-400'} flex flex-col items-center gap-1`}
                onClick={() => setSelectedMode('upload')}
              >
                <i className="fa fa-upload text-lg"></i>
                <span className="text-xs">Upload</span>
              </button>
            </div>

            {/* Grouping Info */}
            <div className="p-4 bg-gray-700 border-b border-gray-600 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <i className="fa fa-question-circle text-gray-400"></i>
                <span className="text-gray-300">Grouping documents by</span>
                <div className="relative">
                  <button type="button" className="text-white hover:text-blue-400 flex items-center gap-1">
                    <span>Package</span>
                    <i className="fa fa-chevron-down text-xs"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Search and Folder List */}
            <div className="p-4">
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>

              {/* Folder List */}
              <div className="folder-list max-h-96 overflow-y-auto space-y-1">
                {filteredFolders.map((folder, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded cursor-pointer ${selectedFolder === folder ? 'bg-gray-700' : ''}`}
                    onClick={() => setSelectedFolder(folder)}
                  >
                    <i className="fa fa-folder text-gray-400"></i>
                    <span className="text-sm text-gray-300">{folder}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* File Browser (Right Panel) */}
          <div className="flex-1 bg-gray-900">
            <table className="w-full">
              <thead className="bg-gray-800 border-b border-gray-600">
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">
                    <div className="flex items-center gap-1">
                      Name
                      <i className="fa fa-sort-asc text-xs"></i>
                    </div>
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">Type</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">Date</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">Size</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">Status</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-700 hover:bg-gray-800">
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-2">
                        <i className="fa fa-file-pdf-o text-red-400"></i>
                        <span className="text-sm text-white">{doc.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-400">{doc.type}</td>
                    <td className="py-3 px-6 text-sm text-gray-400">{doc.date}</td>
                    <td className="py-3 px-6 text-sm text-gray-400">{doc.size}</td>
                    <td className="py-3 px-6">
                      <span className={`text-xs px-2 py-1 rounded ${
                        doc.status === 'Ready' ? 'bg-green-900 text-green-300' :
                        doc.status === 'Final' ? 'bg-blue-900 text-blue-300' :
                        doc.status === 'Draft' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-gray-700 text-gray-300'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex gap-2">
                        <button className="text-gray-400 hover:text-white" title="View">
                          <i className="fa fa-eye"></i>
                        </button>
                        <button className="text-gray-400 hover:text-white" title="Download">
                          <i className="fa fa-download"></i>
                        </button>
                        <button className="text-gray-400 hover:text-white" title="Edit">
                          <i className="fa fa-pencil"></i>
                        </button>
                        <button className="text-gray-400 hover:text-red-400" title="Delete">
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty state or additional content */}
            {documents.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <i className="fa fa-file-o text-4xl mb-4"></i>
                <p>No documents found</p>
              </div>
            )}
          </div>
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

export default Documents;