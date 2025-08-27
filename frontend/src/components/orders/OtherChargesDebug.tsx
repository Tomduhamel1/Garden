import React, { useEffect } from 'react';
import { useOrderDataContext } from '../../contexts/OrderDataContext';

const OtherChargesDebug: React.FC = () => {
  const { orderData, getValue, handleFieldChange } = useOrderDataContext();
  
  // Log the actual structure
  useEffect(() => {
    console.log('📊 Full orderData:', orderData);
    console.log('📊 cdfData:', orderData?.cdfData);
    console.log('📊 other_charges:', orderData?.cdfData?.other_charges);
    console.log('📊 line_01:', orderData?.cdfData?.other_charges?.line_01);
  }, [orderData]);
  
  // Test different path formats
  const testPaths = [
    'cdfData.other_charges.line_01.description',
    'cdfData.other_charges.line_01.payee_name',
    'cdfData.other_charges.line_01.borrower_amount',
    'cdfData.other_charges[0].description',
    'cdfData.other_charges[0].amount',
  ];
  
  const handleTestUpdate = () => {
    const testValue = 'Test Value ' + Date.now();
    console.log('🔧 Attempting to set:', 'cdfData.other_charges.line_01.description', '=', testValue);
    handleFieldChange('cdfData.other_charges.line_01.description', testValue);
    
    // Check immediately after
    setTimeout(() => {
      const newValue = getValue('cdfData.other_charges.line_01.description');
      console.log('🔍 Value after update:', newValue);
      console.log('🔍 Full other_charges after update:', orderData?.cdfData?.other_charges);
    }, 100);
  };
  
  const handleTestAmount = () => {
    const testAmount = Math.floor(Math.random() * 10000);
    console.log('💰 Setting amount:', testAmount);
    handleFieldChange('cdfData.other_charges.line_01.borrower_amount', testAmount);
    
    setTimeout(() => {
      const newValue = getValue('cdfData.other_charges.line_01.borrower_amount');
      console.log('💰 Amount after update:', newValue);
    }, 100);
  };
  
  return (
    <div className="p-4 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4 text-red-400">🔧 Other Charges Debug Panel</h2>
      
      {/* Current Structure */}
      <div className="bg-gray-800 p-4 rounded mb-4">
        <h3 className="text-lg font-semibold mb-2 text-yellow-400">Current Data Structure:</h3>
        <pre className="text-xs font-mono bg-black p-2 rounded overflow-x-auto">
          {JSON.stringify(orderData?.cdfData?.other_charges, null, 2)}
        </pre>
      </div>
      
      {/* Test Paths */}
      <div className="bg-gray-800 p-4 rounded mb-4">
        <h3 className="text-lg font-semibold mb-2 text-yellow-400">Test Path Values:</h3>
        <div className="space-y-1 font-mono text-xs">
          {testPaths.map(path => (
            <div key={path} className="flex justify-between">
              <span className="text-gray-400">{path}:</span>
              <span className="text-green-400">"{getValue(path)}"</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Test Controls */}
      <div className="bg-gray-800 p-4 rounded mb-4">
        <h3 className="text-lg font-semibold mb-2 text-yellow-400">Test Updates:</h3>
        <div className="flex gap-4">
          <button
            onClick={handleTestUpdate}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Test Set Description
          </button>
          <button
            onClick={handleTestAmount}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            Test Set Amount
          </button>
        </div>
      </div>
      
      {/* Manual Input Test */}
      <div className="bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2 text-yellow-400">Manual Input Test:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Line 01 Description (line format):</label>
            <input
              type="text"
              value={getValue('cdfData.other_charges.line_01.description') || ''}
              onChange={(e) => {
                console.log('📝 Manual change:', e.target.value);
                handleFieldChange('cdfData.other_charges.line_01.description', e.target.value);
              }}
              className="w-full bg-gray-700 px-2 py-1 rounded"
              placeholder="Type here..."
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Line 01 Borrower Amount:</label>
            <input
              type="number"
              value={getValue('cdfData.other_charges.line_01.borrower_amount') || ''}
              onChange={(e) => {
                console.log('💵 Amount change:', e.target.value);
                handleFieldChange('cdfData.other_charges.line_01.borrower_amount', parseFloat(e.target.value) || 0);
              }}
              className="w-full bg-gray-700 px-2 py-1 rounded"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>
      
      {/* Console Instructions */}
      <div className="mt-4 p-3 bg-red-900 rounded">
        <p className="text-sm">⚠️ Open browser console (F12) to see detailed logs</p>
      </div>
    </div>
  );
};

export default OtherChargesDebug;