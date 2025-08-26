// CD Field Type Definitions based on UCD/MISMO and Qualia schemas
// This file defines the proper field types, validation rules, and allowed values

export interface FieldTypeDefinition {
  ucdType: 'MISMOAmount' | 'MISMOPercent' | 'MISMODate' | 'MISMOInteger' | 'MISMOString' | 'MISMOBoolean' | 'MISMOEnum';
  inputType: 'currency' | 'percentage' | 'date' | 'number' | 'text' | 'select' | 'checkbox';
  format?: 'currency' | 'percentage' | 'date';
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    required?: boolean;
  };
  enumValues?: { value: string; label: string }[];
}

// Map UCD field names to their type definitions
// IMPORTANT: This only includes fields ACTUALLY defined in the UCD standard
// Many CD form fields (like closing dates, projected payments) are NOT in UCD
// Those fields should have ucd: null in their mappings
export const ucdFieldTypes: Record<string, FieldTypeDefinition> = {
  // LOAN fields
  'LOAN.LoanAmount': { 
    ucdType: 'MISMOAmount', 
    inputType: 'currency', 
    format: 'currency',
    validation: { min: 0 }
  },
  'LOAN.InterestRate': { 
    ucdType: 'MISMOPercent', 
    inputType: 'percentage', 
    format: 'percentage',
    validation: { min: 0, max: 100 }
  },
  'LOAN.LoanTermMonths': { 
    ucdType: 'MISMOInteger', 
    inputType: 'number',
    validation: { min: 1, max: 480 }
  },
  'LOAN.LoanTermYears': { 
    ucdType: 'MISMOInteger', 
    inputType: 'number',
    validation: { min: 1, max: 40 }
  },
  'LOAN.LoanNumber': { 
    ucdType: 'MISMOString', 
    inputType: 'text' 
  },
  'LOAN.Type': {
    ucdType: 'MISMOEnum',
    inputType: 'select',
    enumValues: [
      { value: 'Conventional', label: 'Conventional' },
      { value: 'FHA', label: 'FHA' },
      { value: 'VA', label: 'VA' },
      { value: 'USDA', label: 'USDA/Rural Housing Service' },
      { value: 'Other', label: 'Other' }
    ]
  },
  'LOAN.Purpose': {
    ucdType: 'MISMOEnum',
    inputType: 'select',
    enumValues: [
      { value: 'Purchase', label: 'Purchase' },
      { value: 'Refinance', label: 'Refinance' },
      { value: 'Construction', label: 'Construction' }
    ]
  },
  'LOAN.Product': {
    ucdType: 'MISMOEnum',
    inputType: 'select',
    enumValues: [
      { value: 'Fixed Rate', label: 'Fixed Rate' },
      { value: 'Adjustable Rate', label: 'Adjustable Rate (ARM)' },
      { value: 'Step Rate', label: 'Step Rate' },
      { value: 'Other', label: 'Other' }
    ]
  },
  'LOAN.MonthlyPrincipalAndInterest': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },
  'LOAN.FirstPaymentDate': {
    ucdType: 'MISMODate',
    inputType: 'date',
    format: 'date'
  },
  'LOAN.PrepaymentPenaltyIndicator': {
    ucdType: 'MISMOBoolean',
    inputType: 'select',
    enumValues: [
      { value: 'no', label: 'No' },
      { value: 'yes', label: 'YES' }
    ]
  },
  'LOAN.BalloonIndicator': {
    ucdType: 'MISMOBoolean',
    inputType: 'select',
    enumValues: [
      { value: 'no', label: 'No' },
      { value: 'yes', label: 'YES' }
    ]
  },

  // BORROWER fields
  'BORROWER.FirstName': { ucdType: 'MISMOString', inputType: 'text' },
  'BORROWER.MiddleName': { ucdType: 'MISMOString', inputType: 'text' },
  'BORROWER.LastName': { ucdType: 'MISMOString', inputType: 'text' },
  'BORROWER.SSN': { 
    ucdType: 'MISMOString', 
    inputType: 'text',
    validation: { pattern: /^\d{3}-?\d{2}-?\d{4}$/ }
  },
  'BORROWER.DateOfBirth': {
    ucdType: 'MISMODate',
    inputType: 'date',
    format: 'date'
  },
  'BORROWER.AddressLine1': { ucdType: 'MISMOString', inputType: 'text' },
  'BORROWER.City': { ucdType: 'MISMOString', inputType: 'text' },
  'BORROWER.State': { 
    ucdType: 'MISMOString', 
    inputType: 'text',
    validation: { pattern: /^[A-Z]{2}$/ }
  },
  'BORROWER.PostalCode': { 
    ucdType: 'MISMOString', 
    inputType: 'text',
    validation: { pattern: /^\d{5}(-\d{4})?$/ }
  },

  // SELLER fields
  'SELLER.FirstName': { ucdType: 'MISMOString', inputType: 'text' },
  'SELLER.LastName': { ucdType: 'MISMOString', inputType: 'text' },
  'SELLER.EntityName': { ucdType: 'MISMOString', inputType: 'text' },
  'SELLER.AddressLine1': { ucdType: 'MISMOString', inputType: 'text' },
  'SELLER.City': { ucdType: 'MISMOString', inputType: 'text' },
  'SELLER.State': { 
    ucdType: 'MISMOString', 
    inputType: 'text',
    validation: { pattern: /^[A-Z]{2}$/ }
  },
  'SELLER.PostalCode': { 
    ucdType: 'MISMOString', 
    inputType: 'text',
    validation: { pattern: /^\d{5}(-\d{4})?$/ }
  },

  // LENDER fields
  'LENDER.Name': { ucdType: 'MISMOString', inputType: 'text' },
  'LENDER.NMLSIdentifier': { ucdType: 'MISMOString', inputType: 'text' },

  // PROPERTY fields
  'PROPERTY.AddressLine1': { ucdType: 'MISMOString', inputType: 'text' },
  'PROPERTY.City': { ucdType: 'MISMOString', inputType: 'text' },
  'PROPERTY.County': { ucdType: 'MISMOString', inputType: 'text' },
  'PROPERTY.State': { 
    ucdType: 'MISMOString', 
    inputType: 'text',
    validation: { pattern: /^[A-Z]{2}$/ }
  },
  'PROPERTY.PostalCode': { 
    ucdType: 'MISMOString', 
    inputType: 'text',
    validation: { pattern: /^\d{5}(-\d{4})?$/ }
  },
  'PROPERTY.SalePrice': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },
  'PROPERTY.AnnualTaxAmount': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },

  // SECTION A - Origination Charges
  'FEE.LoanOriginationFee': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },
  'FEE.LoanDiscountPoints': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },

  // SECTION B - Services Borrower Did Not Shop For
  'FEE.AppraisalFee': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },
  'FEE.CreditReportFee': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },

  // SECTION C - Services Borrower Did Shop For
  'FEE.TitleSearchFee': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },
  'FEE.TitleLendersCoveragePremium': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },
  'FEE.SettlementFee': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },

  // SECTION E - Taxes and Government Fees
  'FEE.RecordingFeeForDeed': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },
  'FEE.RecordingFeeForMortgage': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },
  'FEE.TransferTax': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },

  // CLOSING - Cash to Close calculations (actually defined in UCD)
  'CLOSING.TotalClosingCosts': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },
  'CLOSING.ClosingCostsFinanced': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },
  'CLOSING.DownPayment': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },
  'CLOSING.EarnestMoneyDeposit': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },
  'CLOSING.SellerCredits': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },
  'CLOSING.Adjustments': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  },
  'CLOSING.CashToClose': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency'
  },
  'CLOSING.LenderCredits': {
    ucdType: 'MISMOAmount',
    inputType: 'currency',
    format: 'currency',
    validation: { min: 0 }
  }
};

// Helper function to get field type definition by UCD field name
export function getFieldTypeByUCD(ucdFieldName: string): FieldTypeDefinition | undefined {
  return ucdFieldTypes[ucdFieldName];
}

// Helper function to validate field value based on type
export function validateFieldValue(value: any, fieldType: FieldTypeDefinition): boolean {
  if (!fieldType.validation) return true;

  const { min, max, pattern } = fieldType.validation;

  switch (fieldType.inputType) {
    case 'currency':
    case 'percentage':
    case 'number':
      const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : value;
      if (isNaN(numValue)) return false;
      if (min !== undefined && numValue < min) return false;
      if (max !== undefined && numValue > max) return false;
      return true;

    case 'text':
      if (pattern && !pattern.test(String(value))) return false;
      return true;

    case 'date':
      // Validate date format MM/DD/YYYY
      const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
      return datePattern.test(String(value));

    case 'select':
      if (fieldType.enumValues) {
        return fieldType.enumValues.some(opt => opt.value === value);
      }
      return true;

    default:
      return true;
  }
}

// Helper function to format input value based on field type
export function formatFieldInput(value: string, fieldType: FieldTypeDefinition): string {
  switch (fieldType.inputType) {
    case 'currency':
      // Remove non-numeric characters except . and -
      return value.replace(/[^0-9.-]/g, '');
    
    case 'percentage':
      // Remove non-numeric characters and %
      return value.replace(/[^0-9.]/g, '');
    
    case 'number':
      // Remove non-numeric characters
      return value.replace(/[^0-9-]/g, '');
    
    case 'date':
      // Format as MM/DD/YYYY
      const cleaned = value.replace(/[^0-9]/g, '');
      if (cleaned.length <= 2) return cleaned;
      if (cleaned.length <= 4) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    
    default:
      return value;
  }
}