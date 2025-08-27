import React from 'react';
import CDField from './CDFieldWrapper';
import { FeeAutocomplete } from '../common/FeeAutocomplete';
import { useOrderDataContext } from '../../contexts/OrderDataContext';
import { compactLineItems, compactCDFSections } from '../../utils/lineCompaction';
// import FeeTypeAutocomplete from '../ui/FeeTypeAutocomplete';
// import { UCDCompliantFee } from '../../utils/ucdFeeTypes';

const CDPage2: React.FC = () => {
  const { getValue, handleInputChange, handleFieldChange, orderData } = useOrderDataContext();
  
  // Clean up lines function for a specific section
  const cleanupSection = (sectionName: string, maxLines: number) => {
    if (!orderData?.cdfData?.[sectionName]) return;
    
    console.log(`Cleaning up ${sectionName}...`);
    
    // Get current section data
    const currentSection = orderData.cdfData[sectionName];
    
    // Compact the lines
    const compactedSection = compactLineItems(currentSection, maxLines);
    
    // Update each line in the section
    Object.entries(compactedSection).forEach(([lineKey, lineData]) => {
      const schemaKey = `cdfData.${sectionName}.${lineKey}`;
      handleFieldChange(schemaKey, lineData);
    });
    
    console.log(`Cleaned up ${sectionName} successfully`);
  };
  // Helper to render line items for each section
  const renderLineItem = (section: string, lineNum: string, index: number) => {
    const paddedNum = lineNum.padStart(2, '0');
    // Use line_ format for all sections including other_charges
    const baseKey = `cdfData.${section}.line_${paddedNum}`;
    
    // Special handling for Section H (Other) to use UCD-compliant autocomplete
    if (section === 'other_charges') {
      return renderSectionHLineItem(paddedNum, baseKey);
    }
    
    return (
      <tr key={`${section}-${lineNum}`} className="border-b border-gray-300">
        <td className="py-1 px-2">
          <CDField
            documentMode={true}
            fieldId={`${section}-line-${paddedNum}-description`}
            schemaKey={`${baseKey}.description`}
            type="text"
            placeholder="Service description"
            className="w-full"
            mappings={{
              ucd: null, // Most sections don't have direct UCD mappings
              qualia: `${section}.line_${paddedNum}.description`,
              gui: section === 'origination_charges' ? 'OriginationCharges.tsx' : 
                   section === 'services_borrower_did_not_shop_for' ? 'DidNotShopFor.tsx' :
                   section === 'services_borrower_did_shop_for' ? 'DidShopFor.tsx' : undefined
            }}
          />
        </td>
        <td className="py-1 px-2 text-center">
          <CDField
            documentMode={true}
            fieldId={`${section}-line-${paddedNum}-payee`}
            schemaKey={`${baseKey}.payee_name`}
            type="text"
            placeholder="Payee"
            className="w-24"
            mappings={{
              ucd: null,
              qualia: `${section}.line_${paddedNum}.payee_name`
            }}
          />
        </td>
        <td className="py-1 px-2 text-right">
          <CDField
            documentMode={true}
            fieldId={`${section}-line-${paddedNum}-borrower-at-closing`}
            schemaKey={`${baseKey}.borrower_amount`}
            type="currency"
            format="currency"
            placeholder="0.00"
            className="text-right"
            mappings={{
              ucd: null,
              qualia: `${section}.line_${paddedNum}.borrower_paid_at_closing`
            }}
          />
        </td>
        <td className="py-1 px-2 text-right">
          <CDField
            documentMode={true}
            fieldId={`${section}-line-${paddedNum}-borrower-before-closing`}
            schemaKey={`${baseKey}.borrower_poc_amount`}
            type="currency"
            format="currency"
            placeholder="0.00"
            className="text-right"
            mappings={{
              ucd: null,
              qualia: `${section}.line_${paddedNum}.borrower_paid_before_closing`
            }}
          />
        </td>
        <td className="py-1 px-2 text-right">
          <CDField
            documentMode={true}
            fieldId={`${section}-line-${paddedNum}-seller-at-closing`}
            schemaKey={`${baseKey}.seller_amount`}
            type="currency"
            format="currency"
            placeholder="0.00"
            className="text-right"
            mappings={{
              ucd: null,
              qualia: `${section}.line_${paddedNum}.seller_paid_at_closing`
            }}
          />
        </td>
        <td className="py-1 px-2 text-right">
          <CDField
            documentMode={true}
            fieldId={`${section}-line-${paddedNum}-seller-before-closing`}
            schemaKey={`${baseKey}.seller_poc_amount`}
            type="currency"
            format="currency"
            placeholder="0.00"
            className="text-right"
            mappings={{
              ucd: null,
              qualia: `${section}.line_${paddedNum}.seller_paid_before_closing`
            }}
          />
        </td>
        <td className="py-1 px-2 text-right">
          <CDField
            documentMode={true}
            fieldId={`${section}-line-${paddedNum}-paid-by-others`}
            schemaKey={`${baseKey}.other_amount`}
            type="currency"
            format="currency"
            placeholder="0.00"
            className="text-right"
            mappings={{
              ucd: null,
              qualia: `${section}.line_${paddedNum}.paid_by_others`
            }}
          />
        </td>
      </tr>
    );
  };

  // Special renderer for Section H with UCD-compliant autocomplete
  const renderSectionHLineItem = (paddedNum: string, baseKey: string) => {
    return (
      <tr key={`other_charges-${paddedNum}`} className="border-b border-gray-300">
        <td className="py-1 px-2">
          <FeeAutocomplete
            documentMode={true}
            value={getValue(`${baseKey}.description`) || ''}
            onChange={(value) => {
              const event = {
                target: {
                  dataset: { schemaKey: `${baseKey}.description` },
                  value
                }
              } as any;
              handleInputChange(event);
            }}
            placeholder="Enter fee description..."
            className="border-0 bg-transparent"
            data-schema-key={`${baseKey}.description`}
          />
        </td>
        <td className="py-1 px-2 text-center">
          <CDField
            documentMode={true}
            fieldId={`other_charges-line-${paddedNum}-payee`}
            schemaKey={`${baseKey}.payee_name`}
            type="text"
            placeholder="Payee"
            className="w-24"
            mappings={{
              ucd: null,
              qualia: `other_charges.line_${paddedNum}.payee_name`
            }}
          />
        </td>
        <td className="py-1 px-2 text-right">
          <CDField
            documentMode={true}
            fieldId={`other_charges-line-${paddedNum}-borrower-at-closing`}
            schemaKey={`${baseKey}.borrower_amount`}
            type="currency"
            format="currency"
            placeholder="0.00"
            className="text-right"
            mappings={{
              ucd: null,
              qualia: `other_charges.line_${paddedNum}.borrower_amount`,
              gui: "OtherCharges.tsx"
            }}
          />
        </td>
        <td className="py-1 px-2 text-right">
          <CDField
            documentMode={true}
            fieldId={`other_charges-line-${paddedNum}-borrower-before-closing`}
            schemaKey={`${baseKey}.borrower_poc_amount`}
            type="currency"
            format="currency"
            placeholder="0.00"
            className="text-right"
            mappings={{
              ucd: null,
              qualia: `other_charges.line_${paddedNum}.borrower_poc_amount`,
              gui: "OtherCharges.tsx"
            }}
          />
        </td>
        <td className="py-1 px-2 text-right">
          <CDField
            documentMode={true}
            fieldId={`other_charges-line-${paddedNum}-seller-at-closing`}
            schemaKey={`${baseKey}.seller_amount`}
            type="currency"
            format="currency"
            placeholder="0.00"
            className="text-right"
            mappings={{
              ucd: null,
              qualia: `other_charges.line_${paddedNum}.seller_amount`,
              gui: "OtherCharges.tsx"
            }}
          />
        </td>
        <td className="py-1 px-2 text-right">
          <CDField
            documentMode={true}
            fieldId={`other_charges-line-${paddedNum}-seller-before-closing`}
            schemaKey={`${baseKey}.seller_poc_amount`}
            type="currency"
            format="currency"
            placeholder="0.00"
            className="text-right"
            mappings={{
              ucd: null,
              qualia: `other_charges.line_${paddedNum}.seller_poc_amount`,
              gui: "OtherCharges.tsx"
            }}
          />
        </td>
        <td className="py-1 px-2 text-right">
          <CDField
            documentMode={true}
            fieldId={`other_charges-line-${paddedNum}-paid-by-others`}
            schemaKey={`${baseKey}.other_amount`}
            type="currency"
            format="currency"
            placeholder="0.00"
            className="text-right"
            mappings={{
              ucd: null,
              qualia: `other_charges.line_${paddedNum}.other_amount`,
              gui: "OtherCharges.tsx"
            }}
          />
        </td>
      </tr>
    );
  };

  return (
    <div className="cd-page cd-page-2 bg-white text-black p-8 max-w-[8.5in] mx-auto">
      {/* Header */}
      <div className="border-2 border-black mb-4">
        <h1 className="text-xl font-bold text-center py-2">Closing Cost Details</h1>
      </div>

      {/* Loan Costs Table */}
      <table className="w-full border border-black text-xs">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black p-2 text-left" colSpan={2}>Loan Costs</th>
            <th className="border border-black p-1 text-center">Borrower-Paid<br/>At Closing</th>
            <th className="border border-black p-1 text-center">Seller-Paid<br/>At Closing</th>
            <th className="border border-black p-1 text-center">Paid by Others</th>
            <th className="border border-black p-1 text-center">(B) Paid<br/>Before Closing</th>
          </tr>
        </thead>
        <tbody>
          {/* Section A - Origination Charges */}
          <tr className="bg-gray-100">
            <td colSpan={5} className="font-bold px-2 py-1 border-b-2 border-black">
              A. Origination Charges
            </td>
            <td className="px-2 py-1 border-b-2 border-black">
              <button
                onClick={() => cleanupSection('origination_charges', 8)}
                className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                title="Remove empty lines and compact remaining charges"
              >
                Clean Up Lines
              </button>
            </td>
          </tr>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => 
            renderLineItem('origination_charges', num.toString(), num)
          )}
          <tr className="font-bold bg-gray-50">
            <td colSpan={2} className="px-2 py-2">A. Origination Charges Subtotal</td>
            <td className="text-right px-2 py-2">
              <CDField
            documentMode={true}
                fieldId="section-a-total"
                schemaKey="cdfData.origination_charges.total"
                type="currency"
                format="currency"
                readOnly
                mappings={{
                  ucd: null, // Not defined in UCD - CD form field only
                  qualia: "origination_charges.total"
                }}
              />
            </td>
            <td colSpan={3} className="bg-gray-100"></td>
          </tr>

          {/* Section B - Services Borrower Did Not Shop For */}
          <tr className="bg-gray-100">
            <td colSpan={5} className="font-bold px-2 py-1 border-t-2 border-b-2 border-black">
              B. Services Borrower Did Not Shop For
            </td>
            <td className="px-2 py-1 border-t-2 border-b-2 border-black">
              <button
                onClick={() => cleanupSection('services_borrower_did_not_shop_for', 8)}
                className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                title="Remove empty lines and compact remaining services"
              >
                Clean Up Lines
              </button>
            </td>
          </tr>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => 
            renderLineItem('services_borrower_did_not_shop_for', num.toString(), num)
          )}
          <tr className="font-bold bg-gray-50">
            <td colSpan={2} className="px-2 py-2">B. Services Borrower Did Not Shop For Subtotal</td>
            <td className="text-right px-2 py-2">
              <CDField
            documentMode={true}
                fieldId="section-b-total"
                schemaKey="cdfData.services_borrower_did_not_shop_for.total"
                type="currency"
                format="currency"
                readOnly
                mappings={{
                  ucd: null, // Not defined in UCD - CD form field only
                  qualia: "services_borrower_did_not_shop_for.total"
                }}
              />
            </td>
            <td colSpan={3} className="bg-gray-100"></td>
          </tr>

          {/* Section C - Services Borrower Did Shop For */}
          <tr className="bg-gray-100">
            <td colSpan={5} className="font-bold px-2 py-1 border-t-2 border-b-2 border-black">
              C. Services Borrower Did Shop For
            </td>
            <td className="px-2 py-1 border-t-2 border-b-2 border-black">
              <button
                onClick={() => cleanupSection('services_borrower_did_shop_for', 8)}
                className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                title="Remove empty lines and compact remaining services"
              >
                Clean Up Lines
              </button>
            </td>
          </tr>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => 
            renderLineItem('services_borrower_did_shop_for', num.toString(), num)
          )}
          <tr className="font-bold bg-gray-50">
            <td colSpan={2} className="px-2 py-2">C. Services Borrower Did Shop For Subtotal</td>
            <td className="text-right px-2 py-2">
              <CDField
            documentMode={true}
                fieldId="section-c-total"
                schemaKey="cdfData.services_borrower_did_shop_for.total"
                type="currency"
                format="currency"
                readOnly
                mappings={{
                  ucd: null, // Not defined in UCD - CD form field only
                  qualia: "services_borrower_did_shop_for.total"
                }}
              />
            </td>
            <td colSpan={3} className="bg-gray-100"></td>
          </tr>

          {/* Section D - TOTAL LOAN COSTS */}
          <tr className="font-bold bg-black text-white">
            <td colSpan={2} className="px-2 py-2">D. TOTAL LOAN COSTS (A + B + C)</td>
            <td className="text-right px-2 py-2">
              <CDField
            documentMode={true}
                fieldId="section-d-total"
                schemaKey="cdfData.total_loan_costs"
                type="currency"
                format="currency"
                readOnly
                mappings={{
                  ucd: null, // Not defined in UCD - CD form field only
                  qualia: "total_loan_costs"
                }}
              />
            </td>
            <td colSpan={3}></td>
          </tr>
        </tbody>
      </table>

      {/* Other Costs Table */}
      <table className="w-full border border-black text-xs mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black p-2 text-left" colSpan={2}>Other Costs</th>
            <th className="border border-black p-1 text-center">Borrower-Paid<br/>At Closing</th>
            <th className="border border-black p-1 text-center">Seller-Paid<br/>At Closing</th>
            <th className="border border-black p-1 text-center">Paid by Others</th>
            <th className="border border-black p-1 text-center">(B) Paid<br/>Before Closing</th>
          </tr>
        </thead>
        <tbody>
          {/* Section E - Taxes and Other Government Fees */}
          <tr className="bg-gray-100">
            <td colSpan={5} className="font-bold px-2 py-1 border-b-2 border-black">
              E. Taxes and Other Government Fees
            </td>
            <td className="px-2 py-1 border-b-2 border-black">
              <button
                onClick={() => cleanupSection('taxes_and_government_fees', 4)}
                className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                title="Remove empty lines and compact remaining taxes"
              >
                Clean Up Lines
              </button>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="py-1 px-2">01 Recording Fees</td>
            <td className="py-1 px-2">Deed: 
              <CDField
            documentMode={true}
                fieldId="recording-deed"
                schemaKey="cdfData.taxes_and_government_fees.line_01.deed_amount"
                type="currency"
                format="currency"
                className="ml-1"
                mappings={{
                  ucd: "FEE.RecordingFeeForDeed",
                  qualia: "recording_fees.deed",
                  gui: "TaxesAndFees.tsx"
                }}
              />
              Mortgage: 
              <CDField
            documentMode={true}
                fieldId="recording-mortgage"
                schemaKey="cdfData.taxes_and_government_fees.line_01.mortgage_amount"
                type="currency"
                format="currency"
                className="ml-1"
                mappings={{
                  ucd: "FEE.RecordingFeeForMortgage",
                  qualia: "recording_fees.mortgage",
                  gui: "TaxesAndFees.tsx"
                }}
              />
            </td>
            <td className="py-1 px-2 text-right">
              <CDField
            documentMode={true}
                fieldId="recording-total-borrower"
                schemaKey="cdfData.taxes_and_government_fees.line_01.paid_by_borrower"
                type="currency"
                format="currency"
                className="text-right"
                mappings={{
                  ucd: null, // Not defined in UCD - CD form field only
                  qualia: "recording_fees.paid_by_borrower"
                }}
              />
            </td>
            <td className="py-1 px-2 text-right">
              <CDField
            documentMode={true}
                fieldId="recording-total-seller"
                schemaKey="cdfData.taxes_and_government_fees.line_01.paid_by_seller"
                type="currency"
                format="currency"
                className="text-right"
                mappings={{
                  ucd: null, // Not defined in UCD - CD form field only
                  qualia: "recording_fees.paid_by_seller"
                }}
              />
            </td>
            <td colSpan={2}></td>
          </tr>
          {[2, 3, 4].map(num => 
            renderLineItem('taxes_and_government_fees', num.toString(), num)
          )}
          <tr className="font-bold bg-gray-50">
            <td colSpan={2} className="px-2 py-2">E. Taxes and Other Government Fees Subtotal</td>
            <td className="text-right px-2 py-2">
              <CDField
            documentMode={true}
                fieldId="section-e-total"
                schemaKey="cdfData.taxes_and_government_fees.total"
                type="currency"
                format="currency"
                readOnly
                mappings={{
                  ucd: null, // Not defined in UCD - CD form field only
                  qualia: "taxes_and_government_fees.total"
                }}
              />
            </td>
            <td colSpan={3} className="bg-gray-100"></td>
          </tr>

          {/* Section F - Prepaids */}
          <tr className="bg-gray-100">
            <td colSpan={6} className="font-bold px-2 py-1 border-t-2 border-b-2 border-black">
              F. Prepaids
            </td>
          </tr>
          {[1, 2, 3, 4, 5].map(num => 
            renderLineItem('prepaid_item_information', num.toString(), num)
          )}
          <tr className="font-bold bg-gray-50">
            <td colSpan={2} className="px-2 py-2">F. Prepaids Subtotal</td>
            <td className="text-right px-2 py-2">
              <CDField
            documentMode={true}
                fieldId="section-f-total"
                schemaKey="cdfData.prepaid_item_information.total"
                type="currency"
                format="currency"
                readOnly
                mappings={{
                  ucd: null, // Not defined in UCD - CD form field only
                  qualia: "prepaid_item_information.total"
                }}
              />
            </td>
            <td colSpan={3} className="bg-gray-100"></td>
          </tr>

          {/* Section G - Initial Escrow Payment at Closing */}
          <tr className="bg-gray-100">
            <td colSpan={6} className="font-bold px-2 py-1 border-t-2 border-b-2 border-black">
              G. Initial Escrow Payment at Closing
            </td>
          </tr>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => 
            renderLineItem('escrow_information', num.toString(), num)
          )}
          <tr className="border-b border-gray-300">
            <td colSpan={2} className="py-1 px-2">Aggregate Adjustment</td>
            <td className="py-1 px-2 text-right">
              <CDField
            documentMode={true}
                fieldId="aggregate-adjustment"
                schemaKey="cdfData.escrow_information.aggregate_adjustment"
                type="currency"
                format="currency"
                className="text-right"
                mappings={{
                  ucd: null, // Not defined in UCD - CD form field only
                  qualia: "escrow_information.aggregate_adjustment"
                }}
              />
            </td>
            <td colSpan={3}></td>
          </tr>
          <tr className="font-bold bg-gray-50">
            <td colSpan={2} className="px-2 py-2">G. Initial Escrow Payment at Closing Subtotal</td>
            <td className="text-right px-2 py-2">
              <CDField
            documentMode={true}
                fieldId="section-g-total"
                schemaKey="cdfData.escrow_information.total"
                type="currency"
                format="currency"
                readOnly
                mappings={{
                  ucd: null, // Not defined in UCD - CD form field only
                  qualia: "escrow_information.total"
                }}
              />
            </td>
            <td colSpan={3} className="bg-gray-100"></td>
          </tr>

          {/* Section H - Other */}
          <tr className="bg-gray-100">
            <td colSpan={5} className="font-bold px-2 py-1 border-t-2 border-b-2 border-black">
              H. Other
            </td>
            <td className="px-2 py-1 border-t-2 border-b-2 border-black">
              <button
                onClick={() => cleanupSection('other_charges', 8)}
                className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                title="Remove empty lines and compact remaining other charges"
              >
                Clean Up Lines
              </button>
            </td>
          </tr>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => 
            renderLineItem('other_charges', num.toString(), num)
          )}
          <tr className="font-bold bg-gray-50">
            <td colSpan={2} className="px-2 py-2">H. Other Subtotal</td>
            <td className="text-right px-2 py-2">
              <CDField
            documentMode={true}
                fieldId="section-h-total"
                schemaKey="cdfData.other_charges.total"
                type="currency"
                format="currency"
                readOnly
                mappings={{
                  ucd: null, // Not defined in UCD - CD form field only
                  qualia: "other_charges.total",
                  gui: "OtherCharges.tsx"
                }}
              />
            </td>
            <td colSpan={3} className="bg-gray-100"></td>
          </tr>

          {/* Section I - TOTAL OTHER COSTS */}
          <tr className="font-bold bg-black text-white">
            <td colSpan={2} className="px-2 py-2">I. TOTAL OTHER COSTS (E + F + G + H)</td>
            <td className="text-right px-2 py-2">
              <CDField
            documentMode={true}
                fieldId="section-i-total"
                schemaKey="cdfData.total_other_costs"
                type="currency"
                format="currency"
                readOnly
                mappings={{
                  ucd: null, // Not defined in UCD - CD form field only
                  qualia: "total_other_costs"
                }}
              />
            </td>
            <td colSpan={3}></td>
          </tr>

          {/* Section J - TOTAL CLOSING COSTS */}
          <tr className="font-bold bg-gray-300">
            <td colSpan={2} className="px-2 py-2">J. TOTAL CLOSING COSTS (D + I)</td>
            <td className="text-right px-2 py-2">
              <CDField
            documentMode={true}
                fieldId="section-j-total"
                schemaKey="cdfData.total_closing_costs"
                type="currency"
                format="currency"
                readOnly
                mappings={{
                  ucd: "CLOSING.TotalClosingCosts",
                  qualia: "total_closing_costs"
                }}
              />
            </td>
            <td colSpan={3}></td>
          </tr>
          
          <tr className="text-sm">
            <td colSpan={2} className="px-2 py-1">Lender Credits</td>
            <td className="text-right px-2 py-1">
              <CDField
            documentMode={true}
                fieldId="lender-credits-section-j"
                schemaKey="cdfData.lender_credits"
                type="currency"
                format="currency"
                mappings={{
                  ucd: "CLOSING.LenderCredits",
                  qualia: "lender_credits"
                }}
              />
            </td>
            <td colSpan={3}></td>
          </tr>
        </tbody>
      </table>

      {/* Page footer */}
      <div className="mt-4 text-xs text-gray-600 flex justify-between">
        <span>CLOSING DISCLOSURE</span>
        <span>PAGE 2 OF 5 • LOAN ID #{' '}
          <CDField
            documentMode={true}
            fieldId="loan-id-footer-page2"
            schemaKey="cdfData.loans.0.loan_number"
            type="text"
            mappings={{
              ucd: "LOAN.LoanNumber",
              qualia: "loan.loan_number"
            }}
          />
        </span>
      </div>
    </div>
  );
};

export default CDPage2;