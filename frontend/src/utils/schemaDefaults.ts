// Garden Schema Default Values and Initialization
// Provides empty structures for all schema fields

import type { 
  OrderData, 
  CDFData, 
  ContactsData, 
  PropertiesData, 
  PayoffsData, 
  CalculationsData,
  DocumentsData,
  CDFLineItem,
  CDFCreditDebitItem,
  Contact,
  Lender,
  TitleCompany,
  Agency,
  Property,
  Payoff,
  Loan
} from '../types/schema';

// ============================================================================
// LINE ITEM DEFAULTS
// ============================================================================

export const createEmptyLineItem = (): CDFLineItem => ({
  description: '',
  paid_by_borrower: 0,
  paid_by_seller: 0,
  paid_by_others: 0,
  paid_before_closing: 0,
  payee_name: '',
  is_optional: false,
  not_required: false
});

export const createEmptyCreditDebitItem = (): CDFCreditDebitItem => ({
  description: '',
  amount: 0,
  type: ''
});

// ============================================================================
// CONTACT DEFAULTS
// ============================================================================

export const createEmptyContact = (): Contact => ({
  type: 'person',
  first_name: '',
  middle_name: '',
  last_name: '',
  suffix: '',
  company_name: '',
  gender: undefined,
  marital_status: undefined,
  SSN: '',
  date_of_birth: '',
  email: '',
  cell_phone: '',
  home_phone: '',
  work_phone: '',
  current_address: {
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zipcode: '',
    latitude: undefined,
    longitude: undefined
  },
  on_title: false,
  ownership_percentage: 0,
  vesting_type: '',
  power_of_attorney: {
    has: false,
    agent_name: '',
    relationship: ''
  }
});

export const createEmptyLender = (): Lender => ({
  ...createEmptyContact(),
  lender_id: '',
  nmls_id: '',
  license_number: '',
  loan_officer: '',
  loan_officer_email: '',
  loan_officer_phone: ''
});

export const createEmptyTitleCompany = (): TitleCompany => ({
  ...createEmptyContact(),
  title_company_id: '',
  underwriter: '',
  policy_number: '',
  escrow_officer: '',
  escrow_assistant: ''
});

export const createEmptyAgency = (): Agency => ({
  ...createEmptyContact(),
  agency_id: '',
  agent_name: '',
  agent_email: '',
  agent_phone: '',
  agent_license: '',
  commission_amount: 0,
  commission_percentage: 0
});

// ============================================================================
// PROPERTY DEFAULTS
// ============================================================================

export const createEmptyProperty = (): Property => ({
  address_line_1: '',
  address_line_2: '',
  address_city: '',
  address_county: '',
  address_state: '',
  address_zip: '',
  legal_description: '',
  apn: '',
  lot: '',
  block: '',
  tax_information: [],
  hoa: {
    name: '',
    monthly_dues: 0,
    special_assessment: 0,
    transfer_fee: 0
  }
});

// ============================================================================
// PAYOFF DEFAULTS
// ============================================================================

export const createEmptyPayoff = (): Payoff => ({
  lender_name: '',
  loan_number: '',
  payoff_amount: 0,
  good_through_date: '',
  per_diem: 0,
  recording_fee: 0,
  reconveyance_fee: 0,
  wire_fee: 0,
  statement_requested: false,
  statement_received: false,
  payoff_ordered: false,
  payoff_received: false
});

// ============================================================================
// LOAN DEFAULTS
// ============================================================================

export const createEmptyLoan = (): Loan => ({
  initial_loan_amount: 0,
  loan_type: 'Conventional',
  loan_purpose: 'Purchase',
  loan_product: 'Fixed Rate',
  loan_number: '',
  loan_term_years: 30,
  loan_term_months: 0,
  interest_rate: 0,
  interest_type: 'fixed',
  has_prepayment_penalty: false,
  has_balloon_payment: false,
  balloon_payment_description: [],
  interest_only: false,
  is_heloc: false,
  is_construction_loan: false,
  is_MERS: false,
  generating_mortgage_docs: false,
  monthly_principal_and_interest: 0,
  first_payment_date: '',
  last_payment_date: '',
  penalty_grace_period_days: 15,
  late_penalty_amount: 0,
  late_penalty_type: '%',
  mortgage_insurance_case_number: '',
  other_disclosures: {
    liability_after_foreclosure: false,
    homeownership_education_date: '',
    hud_counseling_agency_name: ''
  }
});

// ============================================================================
// CDF DATA INITIALIZATION
// ============================================================================

export const createEmptyCDFData = (): CDFData => ({
  // Section A - Origination Charges (8 lines)
  origination_charges: {
    line_01: createEmptyLineItem(),
    line_02: createEmptyLineItem(),
    line_03: createEmptyLineItem(),
    line_04: createEmptyLineItem(),
    line_05: createEmptyLineItem(),
    line_06: createEmptyLineItem(),
    line_07: createEmptyLineItem(),
    line_08: createEmptyLineItem()
  },
  
  // Section B - Services Borrower Did Not Shop For (8 lines)
  services_borrower_did_not_shop_for: {
    line_01: createEmptyLineItem(),
    line_02: createEmptyLineItem(),
    line_03: createEmptyLineItem(),
    line_04: createEmptyLineItem(),
    line_05: createEmptyLineItem(),
    line_06: createEmptyLineItem(),
    line_07: createEmptyLineItem(),
    line_08: createEmptyLineItem()
  },
  
  // Section C - Services Borrower Did Shop For (8 lines)
  services_borrower_did_shop_for: {
    line_01: createEmptyLineItem(),
    line_02: createEmptyLineItem(),
    line_03: createEmptyLineItem(),
    line_04: createEmptyLineItem(),
    line_05: createEmptyLineItem(),
    line_06: createEmptyLineItem(),
    line_07: createEmptyLineItem(),
    line_08: createEmptyLineItem()
  },
  
  // Section E - Taxes and Government Fees (4 lines)
  taxes_and_government_fees: {
    line_01: createEmptyLineItem(),
    line_02: createEmptyLineItem(),
    line_03: createEmptyLineItem(),
    line_04: createEmptyLineItem()
  },
  
  // Section F - Prepaids (5 lines)
  prepaid_item_information: {
    line_01: createEmptyLineItem(),
    line_02: createEmptyLineItem(),
    line_03: createEmptyLineItem(),
    line_04: createEmptyLineItem(),
    line_05: createEmptyLineItem()
  },
  
  // Section G - Initial Escrow Payment at Closing (8 lines)
  escrow_information: {
    line_01: createEmptyLineItem(),
    line_02: createEmptyLineItem(),
    line_03: createEmptyLineItem(),
    line_04: createEmptyLineItem(),
    line_05: createEmptyLineItem(),
    line_06: createEmptyLineItem(),
    line_07: createEmptyLineItem(),
    line_08: createEmptyLineItem()
  },
  
  // Section H - Other (8 items as array)
  other_charges: [
    createEmptyLineItem(),
    createEmptyLineItem(),
    createEmptyLineItem(),
    createEmptyLineItem(),
    createEmptyLineItem(),
    createEmptyLineItem(),
    createEmptyLineItem(),
    createEmptyLineItem()
  ],
  
  // Section K - Borrower Credits (17 lines)
  borrower_credit_information: {
    line_01: createEmptyCreditDebitItem(),
    line_02: createEmptyCreditDebitItem(),
    line_03: createEmptyCreditDebitItem(),
    line_04: createEmptyCreditDebitItem(),
    line_05: createEmptyCreditDebitItem(),
    line_06: createEmptyCreditDebitItem(),
    line_07: createEmptyCreditDebitItem(),
    line_08: createEmptyCreditDebitItem(),
    line_09: createEmptyCreditDebitItem(),
    line_10: createEmptyCreditDebitItem(),
    line_11: createEmptyCreditDebitItem(),
    line_12: createEmptyCreditDebitItem(),
    line_13: createEmptyCreditDebitItem(),
    line_14: createEmptyCreditDebitItem(),
    line_15: createEmptyCreditDebitItem(),
    line_16: createEmptyCreditDebitItem(),
    line_17: createEmptyCreditDebitItem()
  },
  
  // Section L - Borrower Debits (15 lines)
  borrower_debit_information: {
    line_01: createEmptyCreditDebitItem(),
    line_02: createEmptyCreditDebitItem(),
    line_03: createEmptyCreditDebitItem(),
    line_04: createEmptyCreditDebitItem(),
    line_05: createEmptyCreditDebitItem(),
    line_06: createEmptyCreditDebitItem(),
    line_07: createEmptyCreditDebitItem(),
    line_08: createEmptyCreditDebitItem(),
    line_09: createEmptyCreditDebitItem(),
    line_10: createEmptyCreditDebitItem(),
    line_11: createEmptyCreditDebitItem(),
    line_12: createEmptyCreditDebitItem(),
    line_13: createEmptyCreditDebitItem(),
    line_14: createEmptyCreditDebitItem(),
    line_15: createEmptyCreditDebitItem()
  },
  
  // Section M - Seller Credits (5 lines)
  seller_credit_information: {
    line_01: createEmptyCreditDebitItem(),
    line_02: createEmptyCreditDebitItem(),
    line_03: createEmptyCreditDebitItem(),
    line_04: createEmptyCreditDebitItem(),
    line_05: createEmptyCreditDebitItem()
  },
  
  // Section N - Seller Debits (9 lines)
  seller_debit_information: {
    line_01: createEmptyCreditDebitItem(),
    line_02: createEmptyCreditDebitItem(),
    line_03: createEmptyCreditDebitItem(),
    line_04: createEmptyCreditDebitItem(),
    line_05: createEmptyCreditDebitItem(),
    line_06: createEmptyCreditDebitItem(),
    line_07: createEmptyCreditDebitItem(),
    line_08: createEmptyCreditDebitItem(),
    line_09: createEmptyCreditDebitItem()
  },
  
  // Loan Information
  loans: [createEmptyLoan()],
  
  // Summary Sections
  closing_costs: {
    total_loan_costs: 0,
    total_other_costs: 0,
    total_closing_costs: 0,
    closing_costs_financed: 0,
    down_payment: 0,
    deposit: 0,
    funds_for_borrower: 0,
    seller_credits: 0,
    adjustments_and_other_credits: 0,
    cash_to_close: 0
  },
  
  transaction_information: {
    sale_price: 0,
    purchase_price: 0,
    existing_loans: 0,
    payoff_amount: 0
  }
});

// ============================================================================
// CONTACTS DATA INITIALIZATION
// ============================================================================

export const createEmptyContactsData = (): ContactsData => ({
  // Initialize with at least one of each required entity
  borrowers: [createEmptyContact()],
  sellers: [createEmptyContact()],
  borrower_payees: [],
  seller_payees: [],
  lenders: [createEmptyLender()],
  title_companies: [],
  listing_agencies: [],
  selling_agencies: [],
  settlement_agent: createEmptyContact(),
  closing_attorney: undefined,
  escrow_company: undefined
});

// ============================================================================
// PROPERTIES DATA INITIALIZATION
// ============================================================================

export const createEmptyPropertiesData = (): PropertiesData => ({
  properties: [createEmptyProperty()]
});

// ============================================================================
// PAYOFFS DATA INITIALIZATION
// ============================================================================

export const createEmptyPayoffsData = (): PayoffsData => ({
  payoffs: []
});

// ============================================================================
// CALCULATIONS DATA INITIALIZATION
// ============================================================================

export const createEmptyCalculationsData = (): CalculationsData => ({
  // Section Totals
  total_origination_charges: 0,
  total_services_borrower_did_not_shop: 0,
  total_services_borrower_did_shop: 0,
  total_taxes_and_government_fees: 0,
  total_prepaids: 0,
  total_initial_escrow: 0,
  total_other_charges: 0,
  total_borrower_credits: 0,
  total_borrower_debits: 0,
  total_seller_credits: 0,
  total_seller_debits: 0,
  
  // Summary Calculations
  borrower_cash_to_close: 0,
  seller_proceeds: 0,
  
  // Proration Calculations
  tax_proration_amount: 0,
  hoa_proration_amount: 0,
  interest_proration_amount: 0,
  
  // Commission Calculations
  total_commission: 0,
  listing_commission: 0,
  selling_commission: 0,
  
  // Wire Calculations
  wire_amount_to_title: 0,
  wire_amount_from_borrower: 0,
  wire_amount_to_seller: 0
});

// ============================================================================
// DOCUMENTS DATA INITIALIZATION
// ============================================================================

export const createEmptyDocumentsData = (): DocumentsData => ({
  closing_disclosure: undefined,
  hud_settlement_statement: undefined,
  deed: undefined,
  deed_of_trust: undefined,
  note: undefined,
  title_policy: undefined,
  checks: [],
  other_documents: []
});

// ============================================================================
// MAIN ORDER INITIALIZATION
// ============================================================================

export const createEmptyOrder = (orderNumber?: string): OrderData => ({
  orderNumber: orderNumber || '',
  status: 'draft',
  closingDate: '',
  propertyAddress: '',
  
  // Initialize all JSONB structures with proper defaults
  cdfData: createEmptyCDFData(),
  contactsData: createEmptyContactsData(),
  propertiesData: createEmptyPropertiesData(),
  payoffsData: createEmptyPayoffsData(),
  calculationsData: createEmptyCalculationsData(),
  documentsData: createEmptyDocumentsData(),
  auditLog: [],
  
  // Metadata
  notes: '',
  isLocked: false
});

// ============================================================================
// FIELD PATH UTILITIES
// ============================================================================

/**
 * Get value from nested object using dot notation path
 */
export const getFieldValue = (obj: any, path: string): any => {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined) {
      return undefined;
    }
    result = result[key];
  }
  
  return result;
};

/**
 * Set value in nested object using dot notation path
 */
export const setFieldValue = (obj: any, path: string, value: any): void => {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  let current = obj;
  
  for (const key of keys) {
    if (!(key in current) || current[key] === null || current[key] === undefined) {
      // Determine if next key is a number (array index)
      const nextKey = keys[keys.indexOf(key) + 1];
      current[key] = /^\d+$/.test(nextKey) ? [] : {};
    }
    current = current[key];
  }
  
  current[lastKey] = value;
};

/**
 * Deep merge two objects, preserving existing values
 */
export const deepMerge = (target: any, source: any): any => {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
};

const isObject = (obj: any): boolean => {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
};

/**
 * Initialize missing fields in order data
 */
export const initializeOrderDefaults = (orderData: Partial<OrderData>): OrderData => {
  const defaults = createEmptyOrder(orderData.orderNumber);
  return deepMerge(defaults, orderData);
};

// ============================================================================
// CALCULATION UTILITIES
// ============================================================================

/**
 * Calculate section totals for CDF data
 */
export const calculateSectionTotals = (cdfData: CDFData): CalculationsData => {
  const calculations: CalculationsData = createEmptyCalculationsData();
  
  // Calculate Section A - Origination Charges
  if (cdfData.origination_charges) {
    let total = 0;
    Object.values(cdfData.origination_charges).forEach(item => {
      if (item) {
        total += (item.paid_by_borrower || 0) + (item.paid_by_seller || 0);
      }
    });
    calculations.total_origination_charges = total;
  }
  
  // Calculate Section B - Services Borrower Did Not Shop For
  if (cdfData.services_borrower_did_not_shop_for) {
    let total = 0;
    Object.values(cdfData.services_borrower_did_not_shop_for).forEach(item => {
      if (item) {
        total += (item.paid_by_borrower || 0) + (item.paid_by_seller || 0);
      }
    });
    calculations.total_services_borrower_did_not_shop = total;
  }
  
  // Calculate Section C - Services Borrower Did Shop For
  if (cdfData.services_borrower_did_shop_for) {
    let total = 0;
    Object.values(cdfData.services_borrower_did_shop_for).forEach(item => {
      if (item) {
        total += (item.paid_by_borrower || 0) + (item.paid_by_seller || 0);
      }
    });
    calculations.total_services_borrower_did_shop = total;
  }
  
  // Continue with other sections...
  // This is a simplified version - full implementation would calculate all sections
  
  return calculations;
};

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validate required fields for order submission
 */
export const validateOrder = (order: OrderData): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Basic validation
  if (!order.orderNumber) {
    errors.push('Order number is required');
  }
  
  if (!order.closingDate) {
    errors.push('Closing date is required');
  }
  
  // Validate at least one borrower
  if (!order.contactsData?.borrowers?.length || 
      !order.contactsData.borrowers[0].first_name ||
      !order.contactsData.borrowers[0].last_name) {
    errors.push('At least one borrower with name is required');
  }
  
  // Validate property address
  if (!order.propertiesData?.properties?.length ||
      !order.propertiesData.properties[0].address_line_1 ||
      !order.propertiesData.properties[0].address_city ||
      !order.propertiesData.properties[0].address_state) {
    errors.push('Property address is required');
  }
  
  // Validate loan information
  if (!order.cdfData?.loans?.length || !order.cdfData.loans[0].initial_loan_amount) {
    errors.push('Loan amount is required');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export default {
  createEmptyOrder,
  initializeOrderDefaults,
  calculateSectionTotals,
  validateOrder,
  getFieldValue,
  setFieldValue
};