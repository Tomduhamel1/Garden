import React, { useEffect } from 'react';
import { useOrderDataContext } from '../../contexts/OrderDataContext';

const TestSync: React.FC = () => {
  const { getValue, handleFieldChange, orderData } = useOrderDataContext();
  
  // Test field path
  const testField = 'cdfData.other_charges.line_01.description';
  const currentValue = getValue(testField);
  
  useEffect(() => {
    console.log('🔍 TestSync Component Mounted');
    console.log('Current value of line_01.description:', currentValue);
    console.log('Full orderData:', orderData);
  }, [currentValue, orderData]);
  
  const handleTestChange = () => {
    const newValue = `Test ${Date.now()}`;
    console.log('🚀 Setting test value:', newValue);
    handleFieldChange(testField, newValue);
  };
  
  return (
    <div className="p-4 bg-gray-800 text-white">
      <h2 className="text-lg font-bold mb-4">Test Sync Component</h2>
      <div className="space-y-2">
        <div>
          <strong>Current Value:</strong> {currentValue || '(empty)'}
        </div>
        <button 
          onClick={handleTestChange}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Set Test Value
        </button>
      </div>
    </div>
  );
};

export default TestSync;