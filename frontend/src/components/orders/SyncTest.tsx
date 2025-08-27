import React from 'react';
import { useOrderDataContext } from '../../contexts/OrderDataContext';

const SyncTest: React.FC = () => {
  const { getValue, handleFieldChange } = useOrderDataContext();
  
  // Test with other_charges array index 0 (first line)
  const line01Desc = getValue('cdfData.other_charges[0].description');
  const line01Amount = getValue('cdfData.other_charges[0].amount');
  
  return (
    <div className="flex gap-4 p-4 bg-gray-900 text-white">
      {/* Left side - OtherCharges style */}
      <div className="flex-1 bg-gray-800 p-4 rounded">
        <h2 className="text-lg font-bold mb-4">Other Charges (GUI Style)</h2>
        <div className="space-y-2">
          <div>
            <label className="block text-sm mb-1">Line 01 Description:</label>
            <input
              type="text"
              value={line01Desc || ''}
              onChange={(e) => handleFieldChange('cdfData.other_charges[0].description', e.target.value)}
              className="w-full bg-gray-700 px-2 py-1 rounded"
              placeholder="Enter description..."
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Line 01 Amount:</label>
            <input
              type="text"
              value={line01Amount || ''}
              onChange={(e) => handleFieldChange('cdfData.other_charges[0].amount', e.target.value)}
              className="w-full bg-gray-700 px-2 py-1 rounded"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>
      
      {/* Right side - CD style */}
      <div className="flex-1 bg-white text-black p-4 rounded">
        <h2 className="text-lg font-bold mb-4">Closing Disclosure (Section H)</h2>
        <div className="space-y-2">
          <div>
            <label className="block text-sm mb-1">Line 01 Description:</label>
            <div className="border-b-2 border-gray-300 px-2 py-1">
              {line01Desc || '(empty)'}
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Line 01 Amount:</label>
            <div className="border-b-2 border-gray-300 px-2 py-1">
              ${line01Amount || '0.00'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncTest;