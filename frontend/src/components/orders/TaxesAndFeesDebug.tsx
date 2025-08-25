import React, { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

const TaxesAndFeesDebug: React.FC = () => {
  const { loading, saving, handleInputChange, handleSave, getValue } = useOrderData();
  const [localValue, setLocalValue] = useState('');
  
  // Log every change
  const debugHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('=== INPUT CHANGE DEBUG ===');
    console.log('Event type:', e.type);
    console.log('Target value:', e.target.value);
    console.log('Target name:', e.target.name);
    console.log('data-schema-key:', e.target.getAttribute('data-schema-key'));
    console.log('Calling handleInputChange...');
    
    handleInputChange(e);
    
    const newValue = getValue('cdfData.taxes_and_government_fees.line_01.paid_by_borrower');
    console.log('New value after handleInputChange:', newValue);
    console.log('=========================');
  };
  
  const testPath = 'cdfData.taxes_and_government_fees.line_01.paid_by_borrower';
  const currentValue = getValue(testPath);
  
  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-xl mb-4">TaxesAndFees Debug</h2>
      
      <div className="mb-6 p-4 bg-gray-800 rounded">
        <h3 className="text-lg mb-2">Test Field with EXACT same setup as TaxesAndFees:</h3>
        <input 
          type="text" 
          inputMode="decimal"
          className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500"
          data-schema-key={testPath}
          value={currentValue || ''}
          onChange={debugHandleChange}
        />
        <p className="mt-2">Current stored value: "{currentValue}"</p>
        <p>Type: {typeof currentValue}</p>
      </div>
      
      <div className="mb-6 p-4 bg-gray-800 rounded">
        <h3 className="text-lg mb-2">Local State Test (should always work):</h3>
        <input 
          type="text" 
          className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white"
          value={localValue}
          onChange={(e) => {
            console.log('Local state change:', e.target.value);
            setLocalValue(e.target.value);
          }}
          placeholder="Type here - uses local state"
        />
        <p className="mt-2">Local value: "{localValue}"</p>
      </div>
      
      <div className="p-4 bg-gray-800 rounded">
        <h3 className="text-lg mb-2">Debug Info:</h3>
        <p>Loading: {loading ? 'true' : 'false'}</p>
        <p>handleInputChange exists: {typeof handleInputChange}</p>
        <p>getValue exists: {typeof getValue}</p>
        <p>Test path: {testPath}</p>
        <p>Current value: {JSON.stringify(currentValue)}</p>
      </div>
    </div>
  );
};

export default TaxesAndFeesDebug;