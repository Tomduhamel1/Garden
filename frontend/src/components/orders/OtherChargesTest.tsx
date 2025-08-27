import React from 'react';
import { useOrderDataContext } from '../../contexts/OrderDataContext';

const OtherChargesTest: React.FC = () => {
  const { getValue, handleFieldChange } = useOrderDataContext();
  
  // Test with line_01 format for consistency with both pages
  const line01Desc = getValue('cdfData.other_charges.line_01.description');
  const line01PayeeName = getValue('cdfData.other_charges.line_01.payee_name');
  const line01BorrowerAmount = getValue('cdfData.other_charges.line_01.borrower_amount');
  const line01BorrowerPOC = getValue('cdfData.other_charges.line_01.borrower_poc_amount');
  const line01SellerAmount = getValue('cdfData.other_charges.line_01.seller_amount');
  const line01SellerPOC = getValue('cdfData.other_charges.line_01.seller_poc_amount');
  const line01OtherAmount = getValue('cdfData.other_charges.line_01.other_amount');
  
  return (
    <div className="p-4 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Other Charges Sync Test (Line Format)</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Left side - OtherCharges inputs */}
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-semibold mb-4">OtherCharges GUI Input</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Line 01 Description:</label>
              <input
                type="text"
                value={line01Desc || ''}
                onChange={(e) => handleFieldChange('cdfData.other_charges.line_01.description', e.target.value)}
                className="w-full bg-gray-700 px-2 py-1 rounded text-white"
                placeholder="Enter description..."
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Line 01 Payee Name:</label>
              <input
                type="text"
                value={line01PayeeName || ''}
                onChange={(e) => handleFieldChange('cdfData.other_charges.line_01.payee_name', e.target.value)}
                className="w-full bg-gray-700 px-2 py-1 rounded text-white"
                placeholder="Enter payee name..."
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs mb-1">Borrower At Closing:</label>
                <input
                  type="text"
                  value={line01BorrowerAmount || ''}
                  onChange={(e) => handleFieldChange('cdfData.other_charges.line_01.borrower_amount', e.target.value)}
                  className="w-full bg-gray-700 px-2 py-1 rounded text-white text-sm"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Borrower Before:</label>
                <input
                  type="text"
                  value={line01BorrowerPOC || ''}
                  onChange={(e) => handleFieldChange('cdfData.other_charges.line_01.borrower_poc_amount', e.target.value)}
                  className="w-full bg-gray-700 px-2 py-1 rounded text-white text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs mb-1">Seller At Closing:</label>
                <input
                  type="text"
                  value={line01SellerAmount || ''}
                  onChange={(e) => handleFieldChange('cdfData.other_charges.line_01.seller_amount', e.target.value)}
                  className="w-full bg-gray-700 px-2 py-1 rounded text-white text-sm"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Seller Before:</label>
                <input
                  type="text"
                  value={line01SellerPOC || ''}
                  onChange={(e) => handleFieldChange('cdfData.other_charges.line_01.seller_poc_amount', e.target.value)}
                  className="w-full bg-gray-700 px-2 py-1 rounded text-white text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1">By Others:</label>
              <input
                type="text"
                value={line01OtherAmount || ''}
                onChange={(e) => handleFieldChange('cdfData.other_charges.line_01.other_amount', e.target.value)}
                className="w-full bg-gray-700 px-2 py-1 rounded text-white text-sm"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
        
        {/* Right side - CD display */}
        <div className="bg-white text-black p-4 rounded">
          <h3 className="text-lg font-semibold mb-4">CD Page 2 Display</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-black">
                <th className="text-left px-1 py-1">H. Other</th>
                <th className="text-left px-1">Payee</th>
                <th className="text-center px-1" colSpan={2}>Borrower</th>
                <th className="text-center px-1" colSpan={2}>Seller</th>
                <th className="text-center px-1">Others</th>
              </tr>
              <tr className="bg-gray-100 border-b border-gray-400 text-xs">
                <th></th>
                <th></th>
                <th className="px-1">At Close</th>
                <th className="px-1">Before</th>
                <th className="px-1">At Close</th>
                <th className="px-1">Before</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="px-1 py-2">
                  <div className="border-b border-black">
                    {line01Desc || '(empty)'}
                  </div>
                </td>
                <td className="px-1 py-2">
                  <div className="border-b border-black">
                    {line01PayeeName || '(empty)'}
                  </div>
                </td>
                <td className="px-1 py-2 text-right">
                  <div className="border-b border-black">
                    ${line01BorrowerAmount || '0.00'}
                  </div>
                </td>
                <td className="px-1 py-2 text-right">
                  <div className="border-b border-black">
                    ${line01BorrowerPOC || '0.00'}
                  </div>
                </td>
                <td className="px-1 py-2 text-right">
                  <div className="border-b border-black">
                    ${line01SellerAmount || '0.00'}
                  </div>
                </td>
                <td className="px-1 py-2 text-right">
                  <div className="border-b border-black">
                    ${line01SellerPOC || '0.00'}
                  </div>
                </td>
                <td className="px-1 py-2 text-right">
                  <div className="border-b border-black">
                    ${line01OtherAmount || '0.00'}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
            <p className="font-semibold mb-1">Test Instructions:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Type in any field on the left (OtherCharges GUI)</li>
              <li>See it appear on the right (CD display)</li>
              <li>Navigate to the actual OtherCharges page</li>
              <li>Verify the same data appears there</li>
              <li>Navigate to CD Page 2, Section H</li>
              <li>Verify bidirectional sync works both ways</li>
            </ol>
          </div>
        </div>
      </div>
      
      {/* Debug info */}
      <div className="mt-6 p-3 bg-gray-800 rounded">
        <h4 className="text-sm font-semibold mb-2 text-yellow-400">Debug Info:</h4>
        <div className="text-xs font-mono space-y-1">
          <div>Description path: cdfData.other_charges.line_01.description = "{line01Desc}"</div>
          <div>Payee path: cdfData.other_charges.line_01.payee_name = "{line01PayeeName}"</div>
          <div>Borrower At: cdfData.other_charges.line_01.borrower_amount = "{line01BorrowerAmount}"</div>
          <div>Borrower Before: cdfData.other_charges.line_01.borrower_poc_amount = "{line01BorrowerPOC}"</div>
          <div>Seller At: cdfData.other_charges.line_01.seller_amount = "{line01SellerAmount}"</div>
          <div>Seller Before: cdfData.other_charges.line_01.seller_poc_amount = "{line01SellerPOC}"</div>
          <div>By Others: cdfData.other_charges.line_01.other_amount = "{line01OtherAmount}"</div>
        </div>
      </div>
    </div>
  );
};

export default OtherChargesTest;