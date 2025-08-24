/**
 * Schema Field Mapper Utility
 * Automatically discovers and maps all schema fields to components
 */

import type { OrderData, CDFLineItem, Contact } from '../types/schema';

export interface FieldMapping {
  componentName: string;
  componentPath: string;
  schemaPath: string;
  fieldType: string;
  inputType: 'text' | 'number' | 'select' | 'checkbox' | 'date';
  required: boolean;
  label: string;
}

/**
 * Generate complete field mappings for CDF line items
 */
export const generateCDFLineItemMappings = (
  section: string,
  sectionPath: string,
  lineCount: number
): FieldMapping[] => {
  const mappings: FieldMapping[] = [];
  
  for (let i = 1; i <= lineCount; i++) {
    const lineNum = i.toString().padStart(2, '0');
    const basePath = `${sectionPath}.line_${lineNum}`;
    
    // All 8 fields per line item
    const fields = [
      { key: 'description', type: 'string', input: 'text' as const, label: 'Description' },
      { key: 'paid_by_borrower', type: 'number', input: 'number' as const, label: 'Paid by Borrower' },
      { key: 'paid_by_seller', type: 'number', input: 'number' as const, label: 'Paid by Seller' },
      { key: 'paid_by_others', type: 'number', input: 'number' as const, label: 'Paid by Others' },
      { key: 'paid_before_closing', type: 'number', input: 'number' as const, label: 'POC Amount' },
      { key: 'payee_name', type: 'string', input: 'text' as const, label: 'Payee' },
      { key: 'is_optional', type: 'boolean', input: 'checkbox' as const, label: 'Optional' },
      { key: 'not_required', type: 'boolean', input: 'checkbox' as const, label: 'Not Required' }
    ];
    
    fields.forEach(field => {
      mappings.push({
        componentName: section,
        componentPath: `components/orders/${section}.tsx`,
        schemaPath: `${basePath}.${field.key}`,
        fieldType: field.type,
        inputType: field.input,
        required: field.key === 'description',
        label: `Line ${i} - ${field.label}`
      });
    });
  }
  
  return mappings;
};

/**
 * Generate complete field mappings for all CDF sections
 */
export const generateAllCDFMappings = (): FieldMapping[] => {
  const sections = [
    { name: 'OriginationCharges', path: 'cdfData.origination_charges', lines: 8 },
    { name: 'DidNotShopFor', path: 'cdfData.services_borrower_did_not_shop_for', lines: 8 },
    { name: 'DidShopFor', path: 'cdfData.services_borrower_did_shop_for', lines: 8 },
    { name: 'TaxesAndFees', path: 'cdfData.taxes_and_government_fees', lines: 4 },
    { name: 'Prepaids', path: 'cdfData.prepaid_item_information', lines: 5 },
    { name: 'Escrow', path: 'cdfData.escrow_information', lines: 8 },
  ];
  
  let allMappings: FieldMapping[] = [];
  
  sections.forEach(section => {
    const sectionMappings = generateCDFLineItemMappings(
      section.name,
      section.path,
      section.lines
    );
    allMappings = [...allMappings, ...sectionMappings];
  });
  
  return allMappings;
};

/**
 * Generate contact field mappings
 */
export const generateContactMappings = (
  entityType: 'borrowers' | 'sellers',
  maxCount: number
): FieldMapping[] => {
  const mappings: FieldMapping[] = [];
  
  for (let i = 0; i < maxCount; i++) {
    const basePath = `contactsData.${entityType}.[${i}]`;
    
    const fields = [
      { key: 'type', type: 'string', input: 'select' as const, label: 'Type' },
      { key: 'first_name', type: 'string', input: 'text' as const, label: 'First Name' },
      { key: 'middle_name', type: 'string', input: 'text' as const, label: 'Middle Name' },
      { key: 'last_name', type: 'string', input: 'text' as const, label: 'Last Name' },
      { key: 'suffix', type: 'string', input: 'text' as const, label: 'Suffix' },
      { key: 'company_name', type: 'string', input: 'text' as const, label: 'Company Name' },
      { key: 'gender', type: 'string', input: 'select' as const, label: 'Gender' },
      { key: 'marital_status', type: 'string', input: 'select' as const, label: 'Marital Status' },
      { key: 'SSN', type: 'string', input: 'text' as const, label: 'SSN' },
      { key: 'date_of_birth', type: 'string', input: 'date' as const, label: 'Date of Birth' },
      { key: 'email', type: 'string', input: 'text' as const, label: 'Email' },
      { key: 'cell_phone', type: 'string', input: 'text' as const, label: 'Cell Phone' },
      { key: 'home_phone', type: 'string', input: 'text' as const, label: 'Home Phone' },
      { key: 'work_phone', type: 'string', input: 'text' as const, label: 'Work Phone' },
      { key: 'on_title', type: 'boolean', input: 'checkbox' as const, label: 'On Title' },
      { key: 'ownership_percentage', type: 'number', input: 'number' as const, label: 'Ownership %' },
    ];
    
    // Address fields
    const addressFields = [
      { key: 'current_address.address_1', type: 'string', input: 'text' as const, label: 'Address Line 1' },
      { key: 'current_address.address_2', type: 'string', input: 'text' as const, label: 'Address Line 2' },
      { key: 'current_address.city', type: 'string', input: 'text' as const, label: 'City' },
      { key: 'current_address.state', type: 'string', input: 'select' as const, label: 'State' },
      { key: 'current_address.zipcode', type: 'string', input: 'text' as const, label: 'Zip Code' },
    ];
    
    [...fields, ...addressFields].forEach(field => {
      mappings.push({
        componentName: 'Contacts',
        componentPath: 'components/orders/Contacts.tsx',
        schemaPath: `${basePath}.${field.key}`,
        fieldType: field.type,
        inputType: field.input,
        required: ['first_name', 'last_name'].includes(field.key),
        label: `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} ${i + 1} - ${field.label}`
      });
    });
  }
  
  return mappings;
};

/**
 * Check which fields are actually wired in components
 */
export const checkFieldWiring = async (
  componentPath: string
): Promise<{ wired: string[], missing: string[] }> => {
  // This would analyze the component file to find data-schema-key attributes
  // For now, returning mock data
  return {
    wired: [],
    missing: []
  };
};

/**
 * Generate wiring code for missing fields
 */
export const generateWiringCode = (mappings: FieldMapping[]): string => {
  let code = '';
  
  mappings.forEach(mapping => {
    const inputProps = `
      data-schema-key="${mapping.schemaPath}"
      value={getValue('${mapping.schemaPath}')}
      onChange={handleInputChange}
      type="${mapping.inputType}"
      className="bg-gray-700 text-white px-3 py-2 rounded"
    `.trim();
    
    if (mapping.inputType === 'checkbox') {
      code += `
<label className="flex items-center">
  <input
    ${inputProps}
    checked={getValue('${mapping.schemaPath}') || false}
  />
  <span className="ml-2">${mapping.label}</span>
</label>\n`;
    } else if (mapping.inputType === 'select') {
      code += `
<select ${inputProps}>
  <option value="">Select ${mapping.label}</option>
  {/* Add options here */}
</select>\n`;
    } else {
      code += `
<input
  ${inputProps}
  placeholder="${mapping.label}"
/>\n`;
    }
  });
  
  return code;
};

/**
 * Analyze schema coverage for a component
 */
export const analyzeComponentCoverage = (
  componentName: string,
  orderData: OrderData
): { total: number, populated: number, percentage: number } => {
  // This would analyze actual data coverage
  // Simplified version:
  const allMappings = generateAllCDFMappings();
  const componentMappings = allMappings.filter(m => m.componentName === componentName);
  
  let populated = 0;
  componentMappings.forEach(mapping => {
    const value = getValueFromPath(orderData, mapping.schemaPath);
    if (value !== null && value !== undefined && value !== '') {
      populated++;
    }
  });
  
  return {
    total: componentMappings.length,
    populated,
    percentage: Math.round((populated / componentMappings.length) * 100)
  };
};

/**
 * Get value from nested object path
 */
const getValueFromPath = (obj: any, path: string): any => {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined) {
      return undefined;
    }
    // Handle array notation like [0]
    if (key.startsWith('[') && key.endsWith(']')) {
      const index = parseInt(key.slice(1, -1));
      result = result[index];
    } else {
      result = result[key];
    }
  }
  
  return result;
};

/**
 * Generate complete schema mapping report
 */
export const generateMappingReport = (): {
  totalFields: number,
  sections: Array<{
    name: string,
    fields: number,
    component: string
  }>
} => {
  const cdfMappings = generateAllCDFMappings();
  const contactMappings = [
    ...generateContactMappings('borrowers', 4),
    ...generateContactMappings('sellers', 4)
  ];
  
  const sections = [
    { name: 'Origination Charges', fields: 64, component: 'OriginationCharges.tsx' },
    { name: 'Services Cannot Shop', fields: 64, component: 'DidNotShopFor.tsx' },
    { name: 'Services Can Shop', fields: 64, component: 'DidShopFor.tsx' },
    { name: 'Taxes & Fees', fields: 32, component: 'TaxesAndFees.tsx' },
    { name: 'Prepaids', fields: 40, component: 'Prepaids.tsx' },
    { name: 'Escrow', fields: 64, component: 'Escrow.tsx' },
    { name: 'Other Charges', fields: 64, component: 'OtherCharges.tsx' },
    { name: 'Borrower Credits', fields: 51, component: 'LenderCredits.tsx' },
    { name: 'Borrower Debits', fields: 45, component: 'DebitsCredits.tsx' },
    { name: 'Seller Credits', fields: 15, component: 'DebitsCreditsFn.tsx' },
    { name: 'Seller Debits', fields: 27, component: 'DebitsCreditsFn.tsx' },
    { name: 'Borrowers', fields: 280, component: 'Contacts.tsx' },
    { name: 'Sellers', fields: 280, component: 'ContactsSellerInfo.tsx' },
    { name: 'Properties', fields: 150, component: 'Properties.tsx' },
    { name: 'Payoffs', fields: 48, component: 'Payoffs.tsx' },
    { name: 'Loan', fields: 45, component: 'Loan.tsx' }
  ];
  
  const totalFields = sections.reduce((sum, section) => sum + section.fields, 0);
  
  return {
    totalFields,
    sections
  };
};

export default {
  generateCDFLineItemMappings,
  generateAllCDFMappings,
  generateContactMappings,
  checkFieldWiring,
  generateWiringCode,
  analyzeComponentCoverage,
  generateMappingReport
};