import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import orderService from '../../services/orderService';

interface TaxLine {
  description: string;
  payee_name: string;
  paid_by_borrower: string;
  paid_before_closing: string;
  paid_by_seller: string;
  paid_before_closing_seller: string;
  paid_by_others: string;
}

interface Document {
  id: string;
  type: string;
  pages: string;
  consideration: string;
  taxable: boolean;
}

const TaxesAndFees: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [activeRow, setActiveRow] = useState<number>(1);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDocumentDropdown, setShowDocumentDropdown] = useState(false);
  const [documentSearch, setDocumentSearch] = useState('');
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', type: 'Deed', pages: '', consideration: '', taxable: true },
    { id: '2', type: 'Mortgage', pages: '', consideration: '', taxable: false }
  ]);
  const [activePaymentType, setActivePaymentType] = useState('check');
  const [selectedLine, setSelectedLine] = useState(1);
  
  // Initialize with Recording fees for line 01
  const [localData, setLocalData] = useState<Record<string, TaxLine>>({
    'line_01': {
      description: 'Recording fees',
      payee_name: '',
      paid_by_borrower: '',
      paid_before_closing: '',
      paid_by_seller: '',
      paid_before_closing_seller: '',
      paid_by_others: ''
    },
    'line_02': {
      description: '',
      payee_name: '',
      paid_by_borrower: '',
      paid_before_closing: '',
      paid_by_seller: '',
      paid_before_closing_seller: '',
      paid_by_others: ''
    },
    'line_03': {
      description: '',
      payee_name: '',
      paid_by_borrower: '',
      paid_before_closing: '',
      paid_by_seller: '',
      paid_before_closing_seller: '',
      paid_by_others: ''
    },
    'line_04': {
      description: '',
      payee_name: '',
      paid_by_borrower: '',
      paid_before_closing: '',
      paid_by_seller: '',
      paid_before_closing_seller: '',
      paid_by_others: ''
    }
  });

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }
      
      try {
        const order = await orderService.getOrder(orderId);
        if (order?.cdfData?.taxes_and_government_fees) {
          const taxes = order.cdfData.taxes_and_government_fees;
          const newData: Record<string, TaxLine> = {};
          
          for (let i = 1; i <= 4; i++) {
            const lineKey = `line_${i.toString().padStart(2, '0')}`;
            const lineData = taxes[lineKey] || {};
            newData[lineKey] = {
              description: lineData.description || (i === 1 ? 'Recording fees' : ''),
              payee_name: lineData.payee_name || '',
              paid_by_borrower: lineData.paid_by_borrower || '',
              paid_before_closing: lineData.paid_before_closing || '',
              paid_by_seller: lineData.paid_by_seller || '',
              paid_before_closing_seller: lineData.paid_before_closing_seller || '',
              paid_by_others: lineData.paid_by_others || ''
            };
          }
          
          setLocalData(newData);
        }
      } catch (error) {
        console.error('Error loading order:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [orderId]);

  const handleLocalChange = (lineKey: string, field: keyof TaxLine, value: string) => {
    setLocalData(prev => ({
      ...prev,
      [lineKey]: {
        ...prev[lineKey],
        [field]: value
      }
    }));
  };

  const handleClearField = (lineKey: string, field: keyof TaxLine) => {
    handleLocalChange(lineKey, field, '');
  };

  const handleSave = async () => {
    if (!orderId) return;
    
    setSaving(true);
    try {
      const order = await orderService.getOrder(orderId);
      
      if (!order.cdfData) order.cdfData = {};
      if (!order.cdfData.taxes_and_government_fees) {
        order.cdfData.taxes_and_government_fees = {};
      }
      
      Object.entries(localData).forEach(([lineKey, lineData]) => {
        order.cdfData.taxes_and_government_fees[lineKey] = lineData;
      });
      
      await orderService.updateOrder(orderId, order);
      console.log('Saved taxes data:', order.cdfData.taxes_and_government_fees);
      
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving data. Check console.');
    } finally {
      setSaving(false);
    }
  };

  const calculateTotals = () => {
    const totals = {
      paid_by_borrower: 0,
      paid_before_closing: 0,
      paid_by_seller: 0,
      paid_before_closing_seller: 0,
      paid_by_others: 0
    };

    Object.values(localData).forEach(line => {
      totals.paid_by_borrower += parseFloat(line.paid_by_borrower || '0');
      totals.paid_before_closing += parseFloat(line.paid_before_closing || '0');
      totals.paid_by_seller += parseFloat(line.paid_by_seller || '0');
      totals.paid_before_closing_seller += parseFloat(line.paid_before_closing_seller || '0');
      totals.paid_by_others += parseFloat(line.paid_by_others || '0');
    });

    return totals;
  };

  const calculateRecordingFees = () => {
    // Calculate recording fees based on document details
    let recordingFee = 0;
    let transferTax = 0;
    
    documents.forEach(doc => {
      const pages = parseInt(doc.pages) || 0;
      const consideration = parseFloat(doc.consideration) || 0;
      
      if (doc.type === 'Deed') {
        // Base recording fee: $30 for first page, $10 for each additional
        recordingFee += 30 + (Math.max(0, pages - 1) * 10);
        
        // Transfer tax: 0.5% of consideration if taxable
        if (doc.taxable && consideration > 0) {
          transferTax += consideration * 0.005;
        }
      } else if (doc.type === 'Mortgage') {
        // Mortgage recording fee: $50 for first page, $10 for each additional
        recordingFee += 50 + (Math.max(0, pages - 1) * 10);
      }
    });
    
    // Update Line 01 with calculated recording fee
    if (recordingFee > 0) {
      handleLocalChange('line_01', 'paid_by_borrower', recordingFee.toFixed(2));
    }
    
    // Update Line 02 with calculated transfer tax
    if (transferTax > 0) {
      handleLocalChange('line_02', 'description', 'Transfer tax (auto-calculated)');
      handleLocalChange('line_02', 'paid_by_seller', transferTax.toFixed(2));
    }
  };

  const updateDocument = (id: string, field: keyof Document, value: string | boolean) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, [field]: value } : doc
    ));
  };

  const renderTableRow = (lineNumber: number) => {
    const lineKey = `line_${lineNumber.toString().padStart(2, '0')}`;
    const isActive = activeRow === lineNumber;
    const lineData = localData[lineKey];
    const isLine01 = lineNumber === 1;

    return (
      <tr 
        key={lineNumber}
        className={`border-b border-gray-600 hover:bg-gray-700/30 ${isActive ? 'bg-blue-600/10' : ''}`}
        onClick={() => setSelectedLine(lineNumber)}
      >
        <td className="py-3 px-4 text-center text-sm text-gray-400">
          {lineNumber.toString().padStart(2, '0')}
        </td>
        
        <td className="py-3 px-4">
          <input 
            type="text" 
            className={`w-full px-3 py-1.5 ${isLine01 ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'} border border-gray-500 rounded text-sm focus:outline-none focus:border-blue-500`}
            value={lineData.description}
            onChange={(e) => !isLine01 && handleLocalChange(lineKey, 'description', e.target.value)}
            onFocus={() => setActiveRow(lineNumber)}
            readOnly={isLine01}
          />
        </td>
        
        <td className="py-3 px-4">
          {lineNumber === 2 ? (
            <div className="relative">
              <input 
                type="text" 
                className="w-full pl-3 pr-8 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                value={lineData.payee_name}
                onChange={(e) => handleLocalChange(lineKey, 'payee_name', e.target.value)}
                onFocus={() => setActiveRow(lineNumber)}
                placeholder="Payee"
              />
              <button 
                type="button" 
                onClick={() => handleClearField(lineKey, 'payee_name')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
          ) : (
            <input 
              type="text" 
              className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
              value={lineData.payee_name}
              onChange={(e) => handleLocalChange(lineKey, 'payee_name', e.target.value)}
              onFocus={() => setActiveRow(lineNumber)}
              placeholder="Payee"
            />
          )}
        </td>
        
        <td className="py-3 px-4">
          <input 
            type="text" 
            inputMode="decimal"
            className={`w-full px-3 py-1.5 ${isLine01 ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'} border border-gray-500 rounded text-sm text-right focus:outline-none focus:border-blue-500`}
            value={lineData.paid_by_borrower}
            onChange={(e) => !isLine01 && handleLocalChange(lineKey, 'paid_by_borrower', e.target.value)}
            onFocus={() => setActiveRow(lineNumber)}
            readOnly={isLine01}
            placeholder="0.00"
          />
        </td>
        
        <td className="py-3 px-4">
          <input 
            type="text" 
            inputMode="decimal"
            className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500"
            value={lineData.paid_before_closing}
            onChange={(e) => handleLocalChange(lineKey, 'paid_before_closing', e.target.value)}
            onFocus={() => setActiveRow(lineNumber)}
            placeholder="0.00"
          />
        </td>
        
        <td className="py-3 px-4">
          {lineNumber === 2 ? (
            <div className="relative">
              <input 
                type="text" 
                inputMode="decimal"
                className="w-full pl-3 pr-8 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500"
                value={lineData.paid_by_seller}
                onChange={(e) => handleLocalChange(lineKey, 'paid_by_seller', e.target.value)}
                onFocus={() => setActiveRow(lineNumber)}
                placeholder="0.00"
              />
              <button 
                type="button" 
                onClick={() => handleClearField(lineKey, 'paid_by_seller')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
          ) : (
            <input 
              type="text" 
              inputMode="decimal"
              className={`w-full px-3 py-1.5 ${isLine01 ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'} border border-gray-500 rounded text-sm text-right focus:outline-none focus:border-blue-500`}
              value={lineData.paid_by_seller}
              onChange={(e) => !isLine01 && handleLocalChange(lineKey, 'paid_by_seller', e.target.value)}
              onFocus={() => setActiveRow(lineNumber)}
              readOnly={isLine01}
              placeholder="0.00"
            />
          )}
        </td>
        
        <td className="py-3 px-4">
          <input 
            type="text" 
            inputMode="decimal"
            className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500"
            value={lineData.paid_before_closing_seller}
            onChange={(e) => handleLocalChange(lineKey, 'paid_before_closing_seller', e.target.value)}
            onFocus={() => setActiveRow(lineNumber)}
            placeholder="0.00"
          />
        </td>
        
        <td className="py-3 px-4">
          <input 
            type="text" 
            inputMode="decimal"
            className={`w-full px-3 py-1.5 ${isLine01 ? 'bg-gray-600 text-gray-400' : 'bg-gray-700 text-white'} border border-gray-500 rounded text-sm text-right focus:outline-none focus:border-blue-500`}
            value={lineData.paid_by_others}
            onChange={(e) => !isLine01 && handleLocalChange(lineKey, 'paid_by_others', e.target.value)}
            onFocus={() => setActiveRow(lineNumber)}
            readOnly={isLine01}
            placeholder="0.00"
          />
        </td>
      </tr>
    );
  };

  const documentTypes = [
    'Deed', 'Mortgage', 'Affidavit', 'Assignment of Mortgage or Lease',
    'Discharge of Mortgage', 'Easement', 'Lease', 'Power of Attorney'
  ];

  const filteredDocumentTypes = documentTypes.filter(type =>
    type.toLowerCase().includes(documentSearch.toLowerCase())
  );

  if (loading) {
    return (
      <section className="flex-1 bg-gray-900 overflow-y-auto flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <i className="fa fa-spinner fa-spin text-4xl"></i>
          <p className="mt-4">Loading...</p>
        </div>
      </section>
    );
  }

  const totals = calculateTotals();

  return (
    <section className="flex-1 bg-gray-900 overflow-y-auto">
      {/* Header */}
      <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <i className="fa fa-university text-gray-400 text-xl"></i>
          <h2 className="text-2xl font-semibold text-white">Taxes and Other Government Fees</h2>
          <span className="bg-green-600 px-2 py-1 rounded text-xs font-medium">E</span>
        </div>
        <button 
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 border border-green-500 rounded px-3 py-2 text-white text-sm hover:bg-green-700 disabled:bg-gray-600"
        >
          <i className={`fa ${saving ? 'fa-spinner fa-spin' : 'fa-save'} mr-2`}></i>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </section>

      {/* Content */}
      <section className="px-10 py-8">
        {/* Process Flow */}
        <section className="mb-8">
          <div className="flex bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
            <div className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-center border-r border-gray-600">
              <div className="flex items-center justify-center gap-3">
                <i className="fa fa-file-text text-white text-lg"></i>
                <div className="text-white font-medium">Add Documents</div>
              </div>
            </div>
            <div className="flex-1 bg-gray-700 p-4 text-center">
              <div className="flex items-center justify-center gap-3">
                <i className="fa fa-check text-gray-400 text-lg"></i>
                <div className="text-gray-400 font-medium">View Taxes & Fees</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tax Calculator Section */}
        <section className="bg-gray-800 border border-gray-600 rounded-lg p-6 mb-8">
          <div className="space-y-8">
            {/* Tax Details */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Tax Details</h4>
              <div className="bg-gray-700 border border-gray-600 rounded p-4">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Sales Tax Rate</label>
                    <input 
                      type="text" 
                      inputMode="decimal" 
                      className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Document Details */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Document Details</h4>
                <div className="relative">
                  <button 
                    type="button" 
                    className="bg-blue-600 border border-blue-600 rounded px-4 py-2 text-white text-sm hover:bg-blue-700 flex items-center gap-2"
                    onClick={() => setShowDocumentDropdown(!showDocumentDropdown)}
                  >
                    Add Document
                    <i className="fa fa-chevron-down"></i>
                  </button>
                  {showDocumentDropdown && (
                    <div className="absolute right-0 top-full mt-1 w-64 bg-gray-700 border border-gray-600 rounded shadow-lg z-10">
                      <div className="p-3 border-b border-gray-600">
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          placeholder="Search documents..."
                          value={documentSearch}
                          onChange={(e) => setDocumentSearch(e.target.value)}
                        />
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {filteredDocumentTypes.map(docType => (
                          <div 
                            key={docType}
                            className="px-3 py-2 hover:bg-gray-600 cursor-pointer text-sm"
                            onClick={() => {
                              // Add document logic here
                              setShowDocumentDropdown(false);
                            }}
                          >
                            {docType}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6">We just need a few details about your documents to correctly calculate the local fees.</p>
              
              <div className="grid grid-cols-2 gap-6">
                {documents.map(doc => (
                  <div key={doc.id} className="bg-gray-700 border border-gray-600 rounded-lg overflow-hidden">
                    <div className="bg-gray-600 p-3 flex items-center justify-between border-b border-gray-600">
                      <h5 className="text-white font-medium text-center flex-1">{doc.type}</h5>
                      <button type="button" className="text-gray-400 hover:text-white">
                        <i className="fa fa-times"></i>
                      </button>
                    </div>
                    <div className="p-4">
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-600">
                            <td className="py-3 text-sm text-gray-300">Number of Pages</td>
                            <td className="py-3">
                              <input 
                                type="text" 
                                className="w-full px-3 py-1.5 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                                placeholder="count"
                                value={doc.pages}
                                onChange={(e) => updateDocument(doc.id, 'pages', e.target.value)}
                              />
                            </td>
                          </tr>
                          {doc.type === 'Deed' && (
                            <>
                              <tr className="border-b border-gray-600">
                                <td className="py-3 text-sm text-gray-300">Consideration Amount</td>
                                <td className="py-3">
                                  <input 
                                    type="text" 
                                    inputMode="decimal"
                                    className="w-full px-3 py-1.5 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                                    placeholder="amount"
                                    value={doc.consideration}
                                    onChange={(e) => updateDocument(doc.id, 'consideration', e.target.value)}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="py-3 text-sm text-gray-300">Taxable?</td>
                                <td className="py-3">
                                  <div className="flex bg-gray-600 border border-gray-500 rounded overflow-hidden">
                                    <button 
                                      type="button" 
                                      className={`flex-1 px-3 py-1.5 ${doc.taxable ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'} text-sm font-medium`}
                                      onClick={() => updateDocument(doc.id, 'taxable', true)}
                                    >
                                      Yes
                                    </button>
                                    <button 
                                      type="button" 
                                      className={`flex-1 px-3 py-1.5 ${!doc.taxable ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'} text-sm font-medium`}
                                      onClick={() => updateDocument(doc.id, 'taxable', false)}
                                    >
                                      No
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <button 
                  type="button" 
                  className="bg-blue-600 border border-blue-600 rounded px-6 py-2.5 text-white text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={calculateRecordingFees}
                  disabled={documents.every(doc => !doc.pages && !doc.consideration)}
                >
                  Calculate Fees
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Line Management Buttons */}
        <section className="flex justify-start gap-3 mb-6">
          <button 
            type="button" 
            className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500 disabled:opacity-50"
            disabled
          >
            <i className="fa fa-minus mr-1"></i>
            Remove Last Line
          </button>
          <button 
            type="button" 
            className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500"
          >
            <i className="fa fa-plus mr-1"></i>
            Add Line
          </button>
        </section>

        {/* Charges Table */}
        <section>
          {/* Future Feature Note */}
          <div className="mb-4 p-4 bg-blue-900/30 border border-blue-600/50 rounded-lg">
            <div className="flex items-start gap-3">
              <i className="fa fa-info-circle text-blue-400 mt-1"></i>
              <div>
                <p className="text-blue-300 text-sm font-medium">Auto-Calculation Coming Soon</p>
                <p className="text-blue-200 text-xs mt-1">
                  This section will automatically calculate recording fees, transfer taxes, and other government fees based on your document details and local rates. 
                  The X buttons on Line 02 will allow you to clear auto-calculated values if you need to override them.
                </p>
              </div>
            </div>
          </div>
          
          <table className="w-full bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-3 px-4 text-left border-b border-gray-600"></th>
                <th className="py-3 px-4 text-left border-b border-gray-600"></th>
                <th className="py-3 px-4 text-left border-b border-gray-600"></th>
                <th className="py-3 px-4 text-center border-b border-gray-600" colSpan={2}>Paid by Borrower</th>
                <th className="py-3 px-4 text-center border-b border-gray-600" colSpan={2}>Paid by Seller</th>
                <th className="py-3 px-4 text-center border-b border-gray-600"></th>
              </tr>
              <tr className="bg-gray-700">
                <th className="w-12 py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600"></th>
                <th className="py-3 px-4 text-left text-sm text-gray-300 border-b border-gray-600">Description</th>
                <th className="py-3 px-4 text-left text-sm text-gray-300 border-b border-gray-600">Payee</th>
                <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">At Closing</th>
                <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">Before Closing</th>
                <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">At Closing</th>
                <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">Before Closing</th>
                <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600">By Others</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map(lineNumber => renderTableRow(lineNumber))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-700">
                <th className="py-3 px-4"></th>
                <th className="py-3 px-4"></th>
                <th className="py-3 px-4 text-right text-sm text-gray-300">Totals</th>
                <th className="py-3 px-4 text-center text-sm text-white">
                  ${totals.paid_by_borrower.toFixed(2)}
                </th>
                <th className="py-3 px-4 text-center text-sm text-white">
                  ${totals.paid_before_closing.toFixed(2)}
                </th>
                <th className="py-3 px-4 text-center text-sm text-white">
                  ${totals.paid_by_seller.toFixed(2)}
                </th>
                <th className="py-3 px-4 text-center text-sm text-white">
                  ${totals.paid_before_closing_seller.toFixed(2)}
                </th>
                <th className="py-3 px-4 text-center text-sm text-white">
                  ${totals.paid_by_others.toFixed(2)}
                </th>
              </tr>
            </tfoot>
          </table>
        </section>

        {/* Action Buttons */}
        <section className="flex justify-between items-center mt-6">
          <div className="flex gap-3">
            <button type="button" className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500 flex items-center gap-2">
              <i className="fa fa-file-text-o"></i>
              Extract From CD
            </button>
            <button type="button" className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Sort Lines
            </button>
          </div>
          <div className="flex gap-3">
            <button type="button" className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500">
              Clear
            </button>
            <button type="button" className="bg-blue-600 border border-blue-600 rounded px-4 py-2 text-white text-sm hover:bg-blue-700">
              Add Contact
            </button>
          </div>
        </section>

        {/* Settings Section */}
        <section className="mt-8">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
            Settings
            <span className="bg-green-600 px-3 py-1 rounded text-sm">Line {selectedLine.toString().padStart(2, '0')}</span>
          </h4>
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 mb-6">
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Recording Type</label>
                  <input type="text" className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm" value="Deed" readOnly />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Deed Amount</label>
                  <input type="text" inputMode="decimal" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-300 mb-2">Paid By</label>
                  <div className="flex bg-gray-700 border border-gray-500 rounded overflow-hidden">
                    <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Buyer</button>
                    <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Seller</button>
                    <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Split</button>
                    <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Paid By Others</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Recording Type</label>
                  <input type="text" className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm" value="Mortgage" readOnly />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Mortgage Amount</label>
                  <input type="text" inputMode="decimal" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-300 mb-2">Paid By</label>
                  <div className="flex bg-gray-700 border border-gray-500 rounded overflow-hidden">
                    <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Buyer</button>
                    <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Seller</button>
                    <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Split</button>
                    <button type="button" className="flex-1 px-3 py-2.5 bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">Paid By Others</button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500 disabled:opacity-50" disabled>
                  Remove
                </button>
                <button type="button" className="bg-gray-600 border border-gray-500 rounded px-4 py-2 text-white text-sm hover:bg-gray-500">
                  Add
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Payments Section */}
        <section className="mt-8">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
            Payments
            <span className="bg-green-600 px-3 py-1 rounded text-sm">
              {localData[`line_${selectedLine.toString().padStart(2, '0')}`]?.description || 'Recording fees'}
            </span>
          </h4>
          
          <div className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
            <div className="bg-gray-700 px-6 py-3 flex items-center justify-between border-b border-gray-600">
              <div className="flex items-center gap-4">
                <span className="text-white">City of Warwick</span>
              </div>
              <div className="flex gap-2">
                <button type="button" className="text-gray-400 hover:text-white disabled:opacity-50" disabled>
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="text-gray-400 hover:text-white">
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Payment Type Toggle */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <a href="#" className="text-gray-500 text-sm flex items-center gap-2 pointer-events-none">
                    <i className="fa fa-list"></i>
                    Itemize
                  </a>
                </div>
                
                <div className="flex border-b border-gray-600">
                  {['check', 'wire', 'net funded', 'global payment', 'order transfer', 'holdback'].map(type => (
                    <button 
                      key={type}
                      type="button" 
                      className={`px-4 py-2 border-b-2 ${
                        activePaymentType === type 
                          ? 'text-blue-400 border-blue-400' 
                          : 'text-gray-400 hover:text-white border-transparent hover:border-gray-400'
                      }`}
                      onClick={() => setActivePaymentType(type)}
                    >
                      {type === 'net funded' ? 'Net Funded' : 
                       type === 'global payment' ? 'Aggregate' :
                       type === 'order transfer' ? 'Transfer' :
                       type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Standard Payment Fields */}
              {activePaymentType !== 'global payment' && (
                <div>
                  <h5 className="text-base font-semibold text-white mb-4">Payment</h5>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Name</label>
                      <input type="text" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Payment Amount
                        <i className="fa fa-lock text-gray-500 ml-1"></i>
                      </label>
                      <input type="text" inputMode="decimal" className="w-full px-3 py-2.5 bg-gray-600 border border-gray-500 rounded text-gray-400 text-sm" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Label</label>
                      <select className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none">
                        <option value="recording_fee">Recording Fee</option>
                        <option value="transfer_tax">Transfer Tax</option>
                        <option value="property_tax">Property Tax</option>
                        <option value="insurance">Insurance</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Memo</label>
                      <input type="text" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Payment Type Specific Content */}
              {activePaymentType === 'check' && (
                <div>
                  <h5 className="text-base font-semibold text-white mb-4">Mailing Address</h5>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Address</label>
                      <div className="relative">
                        <input type="text" className="w-full pl-3 pr-8 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" placeholder="Search address..." />
                        <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Apt, Suite, Etc.</label>
                      <input type="text" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">City</label>
                      <input type="text" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">State</label>
                      <select className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none">
                        <option value="RI">RI</option>
                        <option value="CA">CA</option>
                        <option value="NY">NY</option>
                        <option value="TX">TX</option>
                        <option value="FL">FL</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Zipcode</label>
                      <input type="text" inputMode="numeric" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                </div>
              )}
              
              {activePaymentType === 'wire' && (
                <div>
                  <h5 className="text-base font-semibold text-white mb-4">Wire Instructions</h5>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Routing #</label>
                      <input type="text" inputMode="numeric" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Bank Name</label>
                      <input type="text" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Account #</label>
                      <input type="text" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Name on Account</label>
                      <input type="text" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Further Credit To</label>
                      <input type="text" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                </div>
              )}
              
              {activePaymentType === 'holdback' && (
                <div>
                  <h5 className="text-base font-semibold text-white mb-4">Escrow Information</h5>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Reason for Escrow</label>
                      <input type="text" className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Conditions for Release</label>
                      <textarea rows={3} className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 resize-none"></textarea>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Disbursement */}
              <div className="mt-6">
                <h5 className="text-base font-semibold text-white mb-4">Disbursement</h5>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Disburse Separately
                      <i className="fa fa-question-circle text-gray-500 ml-1"></i>
                    </label>
                    <select className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none">
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default TaxesAndFees;