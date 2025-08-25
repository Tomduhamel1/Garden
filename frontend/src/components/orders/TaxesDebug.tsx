import React from 'react';
import { useOrderData } from '../../hooks/useOrderData';

export default function TaxesDebug() {
  const { loading, saving, handleInputChange, getValue } = useOrderData();

  console.log('TaxesDebug - useOrderData loaded:', { loading, saving });
  console.log('TaxesDebug - getValue function exists:', typeof getValue);
  console.log('TaxesDebug - handleInputChange function exists:', typeof handleInputChange);

  const testValue = getValue('cdfData.taxes_and_government_fees.line_01.paid_by_borrower');
  console.log('TaxesDebug - test getValue result:', testValue);

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-xl mb-4">Taxes Debug Component</h2>
      <div className="mb-4">
        <p>Loading: {loading ? 'true' : 'false'}</p>
        <p>Saving: {saving ? 'true' : 'false'}</p>
        <p>getValue function: {typeof getValue}</p>
        <p>handleInputChange function: {typeof handleInputChange}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg mb-2">Test Input Field:</h3>
        <input
          type="text"
          placeholder="Type here to test"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-500 rounded text-white"
          data-schema-key="cdfData.taxes_and_government_fees.line_01.paid_by_borrower"
          value={getValue('cdfData.taxes_and_government_fees.line_01.paid_by_borrower') || ''}
          onChange={handleInputChange}
          style={{ backgroundColor: '#374151', color: 'white' }}
        />
        <p className="mt-2">Current value: {testValue || 'empty'}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg mb-2">Minimal Test:</h3>
        <input
          type="text"
          placeholder="Basic input test"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-500 rounded text-white"
        />
      </div>
    </div>
  );
}