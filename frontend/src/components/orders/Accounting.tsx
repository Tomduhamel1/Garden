import React, { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  type: string;
}

interface Receipt {
  id: string;
  date: string;
  description: string;
  amount: number;
  method: string;
  status: string;
}

interface Disbursement {
  id: string;
  date: string;
  payee: string;
  amount: number;
  method: string;
  status: string;
  check?: string;
}

const Accounting: React.FC = () => {
  const { loading, saving, handleInputChange, getValue, saveOrderData } = useOrderData();
  const [activeTab, setActiveTab] = useState<'ledger' | 'receipts' | 'disbursements'>('ledger');
  const [selectedDisbursements, setSelectedDisbursements] = useState<string[]>([]);

  const ledgerEntries: LedgerEntry[] = [
    {
      id: '1',
      date: '03/21/2025',
      description: 'Initial deposit from buyer',
      debit: 0,
      credit: 502046.56,
      balance: 502046.56,
      type: 'Receipt'
    },
    {
      id: '2', 
      date: '03/21/2025',
      description: 'Settlement fees',
      debit: 550.00,
      credit: 0,
      balance: 501496.56,
      type: 'Disbursement'
    },
  ];

  const receipts: Receipt[] = [
    {
      id: '1',
      date: '03/21/2025',
      description: 'Buyer funds for closing',
      amount: 502046.56,
      method: 'Wire Transfer',
      status: 'Cleared'
    },
  ];

  const disbursements: Disbursement[] = [
    {
      id: '1',
      date: '03/21/2025',
      payee: 'First National Title & Escrow',
      amount: 550.00,
      method: 'Check',
      status: 'Pending',
      check: '#1001'
    },
    {
      id: '2',
      date: '03/21/2025', 
      payee: 'Seller Proceeds',
      amount: 479733.56,
      method: 'Wire Transfer',
      status: 'Ready',
    },
  ];

  const handleDisbursementSelect = (id: string) => {
    setSelectedDisbursements(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const accountBalance = 0.00;

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <i className="fa fa-balance-scale text-gray-400 text-xl"></i>
              <h2 className="text-2xl font-semibold text-white">Accounting</h2>
            </div>
            <div className="flex items-center gap-2">
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
              <button 
                type="button" 
                className="p-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded" 
                title="Add Post-Closing Disbursement"
              >
                <i className="fa fa-history"></i>
              </button>
              <div className="flex items-center bg-gray-700 rounded">
                <div className="px-3 py-2 bg-gray-600 text-white text-sm border-r border-gray-500">
                  <select className="bg-transparent text-white text-xs">
                    <option>{selectedDisbursements.length} selected</option>
                  </select>
                </div>
                <button 
                  type="button" 
                  className={`px-3 py-2 ${selectedDisbursements.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 opacity-50 cursor-not-allowed'} text-white text-sm`}
                  disabled={selectedDisbursements.length === 0}
                >
                  Post Disbursements
                </button>
              </div>
              <button type="button" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded flex items-center gap-2">
                Add Receipt
                <i className="fa fa-chevron-down text-xs"></i>
              </button>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="px-10 py-4 border-b border-gray-700">
          <div className="flex gap-6">
            <button 
              type="button"
              className={`pb-2 border-b-2 font-medium ${activeTab === 'ledger' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('ledger')}
            >
              Ledger
            </button>
            <button 
              type="button"
              className={`pb-2 border-b-2 font-medium ${activeTab === 'receipts' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('receipts')}
            >
              Receipts
            </button>
            <button 
              type="button"
              className={`pb-2 border-b-2 font-medium ${activeTab === 'disbursements' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('disbursements')}
            >
              Disbursements
            </button>
          </div>
        </section>

        {/* Tab Content */}
        <section className="px-10 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
          <>
          {/* Ledger Tab */}
          {activeTab === 'ledger' && (
            <div>
              {/* Account Balances */}
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 mb-6">
                <div className="text-sm text-gray-400 font-medium mb-4">Account Balances</div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-semibold text-white">
                    ${accountBalance.toFixed(2)}
                  </div>
                  <button type="button" className="p-1 hover:bg-gray-700 rounded" title="Add a note to this account">
                    <i className="fa fa-edit text-gray-400 text-sm"></i>
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-700 rounded" title="Filter by this account">
                    <i className="fa fa-search text-gray-400 text-sm"></i>
                  </button>
                </div>
                <div className="text-sm text-gray-400 mt-2">FNT&E - Master IOLTA 9238</div>
              </div>

              {/* Ledger Table */}
              <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Description</th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-300">Debit</th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-300">Credit</th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-300">Balance</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ledgerEntries.map((entry) => (
                      <tr key={entry.id} className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="py-3 px-4 text-sm text-gray-300">{entry.date}</td>
                        <td className="py-3 px-4 text-sm text-white">{entry.description}</td>
                        <td className="py-3 px-4 text-sm text-right text-red-400">
                          {entry.debit > 0 ? `$${entry.debit.toFixed(2)}` : ''}
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-green-400">
                          {entry.credit > 0 ? `$${entry.credit.toFixed(2)}` : ''}
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-white font-medium">
                          ${entry.balance.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-400">{entry.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {ledgerEntries.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <i className="fa fa-file-text-o text-2xl mb-2"></i>
                    <p>No ledger entries found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Receipts Tab */}
          {activeTab === 'receipts' && (
            <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Description</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-300">Amount</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Method</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {receipts.map((receipt) => (
                    <tr key={receipt.id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="py-3 px-4 text-sm text-gray-300">{receipt.date}</td>
                      <td className="py-3 px-4 text-sm text-white">{receipt.description}</td>
                      <td className="py-3 px-4 text-sm text-right text-green-400 font-medium">
                        ${receipt.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">{receipt.method}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          receipt.status === 'Cleared' ? 'bg-green-900 text-green-300' :
                          receipt.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-gray-700 text-gray-300'
                        }`}>
                          {receipt.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
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

              {receipts.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <i className="fa fa-receipt text-2xl mb-2"></i>
                  <p>No receipts found</p>
                </div>
              )}
            </div>
          )}

          {/* Disbursements Tab */}
          {activeTab === 'disbursements' && (
            <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-500"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDisbursements(disbursements.map(d => d.id));
                          } else {
                            setSelectedDisbursements([]);
                          }
                        }}
                      />
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Payee</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-300">Amount</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Method</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {disbursements.map((disbursement) => (
                    <tr key={disbursement.id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="py-3 px-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-500"
                          checked={selectedDisbursements.includes(disbursement.id)}
                          onChange={() => handleDisbursementSelect(disbursement.id)}
                        />
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-300">{disbursement.date}</td>
                      <td className="py-3 px-4 text-sm text-white">
                        {disbursement.payee}
                        {disbursement.check && (
                          <div className="text-xs text-gray-400">{disbursement.check}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-red-400 font-medium">
                        ${disbursement.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">{disbursement.method}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          disbursement.status === 'Ready' ? 'bg-green-900 text-green-300' :
                          disbursement.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' :
                          disbursement.status === 'Posted' ? 'bg-blue-900 text-blue-300' :
                          'bg-gray-700 text-gray-300'
                        }`}>
                          {disbursement.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="text-gray-400 hover:text-white" title="Edit">
                            <i className="fa fa-pencil"></i>
                          </button>
                          <button className="text-gray-400 hover:text-white" title="Print Check">
                            <i className="fa fa-print"></i>
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

              {disbursements.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <i className="fa fa-money text-2xl mb-2"></i>
                  <p>No disbursements found</p>
                </div>
              )}
            </div>
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

export default Accounting;