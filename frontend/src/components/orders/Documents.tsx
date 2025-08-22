import React, { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

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
              <i className="fa fa-file-text text-gray-400 text-xl"></i>
              <h2 className="text-2xl font-semibold text-white">Documents</h2>
            </div>
            <button
              onClick={handleSave}
              disabled={loading || saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded text-white text-sm flex items-center gap-2"
            >
              {saving && <i className="fa fa-spinner fa-spin"></i>}
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </section>

        {/* Content Body */}
        <section className="p-10">
          <div className="grid grid-cols-3 gap-8">
            {/* Document Generation */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Generate Documents</h3>
              <p className="text-gray-400 text-sm">Document generation functionality would be implemented here.</p>
            </div>

            {/* Document Status */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Document Status</h3>
              <div className="space-y-2">
                {documents.map(doc => (
                  <div key={doc.id} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                    <span className="text-white text-sm">{doc.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      doc.status === 'Ready' ? 'bg-green-600 text-white' :
                      doc.status === 'Draft' ? 'bg-yellow-600 text-white' :
                      doc.status === 'Pending' ? 'bg-orange-600 text-white' :
                      'bg-blue-600 text-white'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Folders */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Document Folders</h3>
              <div className="space-y-1">
                {filteredFolders.slice(0, 5).map(folder => (
                  <div key={folder} className="p-2 text-gray-300 text-sm hover:bg-gray-700 rounded cursor-pointer">
                    <i className="fa fa-folder mr-2"></i>
                    {folder}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
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

export default Documents;