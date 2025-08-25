import React from 'react';
import { useOrderData } from '../../hooks/useOrderData';

const TaxesSimpleTest: React.FC = () => {
  const { handleInputChange, getValue } = useOrderData();
  
  const lineKey = 'line_01';
  
  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-xl mb-4">Simple TaxesAndFees Test</h2>
      
      <table className="w-full bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700">
            <th className="py-3 px-4 text-left border-b border-gray-600">Description</th>
            <th className="py-3 px-4 text-left border-b border-gray-600">Borrower</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-600">
            <td className="py-3 px-4">
              <input 
                type="text" 
                className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                data-schema-key={`cdfData.taxes_and_government_fees.${lineKey}.description`}
                value={getValue(`cdfData.taxes_and_government_fees.${lineKey}.description`) || 'Recording fees'}
                onChange={handleInputChange}
              />
            </td>
            <td className="py-3 px-4">
              <input 
                type="text" 
                inputMode="decimal"
                className="w-full px-3 py-1.5 bg-gray-700 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500"
                data-schema-key={`cdfData.taxes_and_government_fees.${lineKey}.paid_by_borrower`}
                value={getValue(`cdfData.taxes_and_government_fees.${lineKey}.paid_by_borrower`) || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      
      <div className="mt-4 p-4 bg-gray-800 rounded">
        <p>Description value: {getValue(`cdfData.taxes_and_government_fees.${lineKey}.description`)}</p>
        <p>Borrower value: {getValue(`cdfData.taxes_and_government_fees.${lineKey}.paid_by_borrower`)}</p>
      </div>
    </div>
  );
};

export default TaxesSimpleTest;