// Backend Schema Helpers for Order Model
// Provides initialization and validation for JSONB data

// ============================================================================
// LINE ITEM DEFAULTS
// ============================================================================

const createEmptyLineItem = () => ({
  description: '',
  paid_by_borrower: 0,
  paid_by_seller: 0,
  paid_by_others: 0,
  paid_before_closing: 0,
  payee_name: '',
  is_optional: false,
  not_required: false
});

const createEmptyCreditDebitItem = () => ({
  description: '',
  amount: 0,
  type: ''
});

// ============================================================================
// CONTACT DEFAULTS
// ============================================================================

const createEmptyContact = () => ({
  type: 'person',
  first_name: '',
  middle_name: '',
  last_name: '',
  suffix: '',
  company_name: '',
  email: '',
  cell_phone: '',
  home_phone: '',
  work_phone: '',
  current_address: {
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zipcode: ''
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

const createEmptyLender = () => ({
  ...createEmptyContact(),
  lender_id: '',
  nmls_id: '',
  license_number: '',
  loan_officer: '',
  loan_officer_email: '',
  loan_officer_phone: ''
});

// ============================================================================
// PROPERTY DEFAULTS
// ============================================================================

const createEmptyProperty = () => ({
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
// LOAN DEFAULTS
// ============================================================================

const createEmptyLoan = () => ({
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
// INITIALIZE CDF DATA WITH ALL LINE ITEMS
// ============================================================================

const initializeCDFData = (existingData = {}) => {
  const defaults = {
    // Section A - Origination Charges (8 lines)
    origination_charges: {},
    services_borrower_did_not_shop_for: {},
    services_borrower_did_shop_for: {},
    taxes_and_government_fees: {},
    prepaid_item_information: {},
    escrow_information: {},
    other_charges: [],
    borrower_credit_information: {},
    borrower_debit_information: {},
    seller_credit_information: {},
    seller_debit_information: {},
    loans: [createEmptyLoan()],
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
  };

  // Initialize line items for Section A (8 lines)
  for (let i = 1; i <= 8; i++) {
    const lineKey = `line_${String(i).padStart(2, '0')}`;
    defaults.origination_charges[lineKey] = existingData.origination_charges?.[lineKey] || createEmptyLineItem();
    defaults.services_borrower_did_not_shop_for[lineKey] = existingData.services_borrower_did_not_shop_for?.[lineKey] || createEmptyLineItem();
    defaults.services_borrower_did_shop_for[lineKey] = existingData.services_borrower_did_shop_for?.[lineKey] || createEmptyLineItem();
    defaults.escrow_information[lineKey] = existingData.escrow_information?.[lineKey] || createEmptyLineItem();
  }

  // Initialize line items for Section E (4 lines)
  for (let i = 1; i <= 4; i++) {
    const lineKey = `line_${String(i).padStart(2, '0')}`;
    defaults.taxes_and_government_fees[lineKey] = existingData.taxes_and_government_fees?.[lineKey] || createEmptyLineItem();
  }

  // Initialize line items for Section F (5 lines)
  for (let i = 1; i <= 5; i++) {
    const lineKey = `line_${String(i).padStart(2, '0')}`;
    defaults.prepaid_item_information[lineKey] = existingData.prepaid_item_information?.[lineKey] || createEmptyLineItem();
  }

  // Initialize Section H - Other charges (8 items as array)
  defaults.other_charges = existingData.other_charges || [];
  while (defaults.other_charges.length < 8) {
    defaults.other_charges.push(createEmptyLineItem());
  }

  // Initialize Section K - Borrower Credits (17 lines)
  for (let i = 1; i <= 17; i++) {
    const lineKey = `line_${String(i).padStart(2, '0')}`;
    defaults.borrower_credit_information[lineKey] = existingData.borrower_credit_information?.[lineKey] || createEmptyCreditDebitItem();
  }

  // Initialize Section L - Borrower Debits (15 lines)
  for (let i = 1; i <= 15; i++) {
    const lineKey = `line_${String(i).padStart(2, '0')}`;
    defaults.borrower_debit_information[lineKey] = existingData.borrower_debit_information?.[lineKey] || createEmptyCreditDebitItem();
  }

  // Initialize Section M - Seller Credits (5 lines)
  for (let i = 1; i <= 5; i++) {
    const lineKey = `line_${String(i).padStart(2, '0')}`;
    defaults.seller_credit_information[lineKey] = existingData.seller_credit_information?.[lineKey] || createEmptyCreditDebitItem();
  }

  // Initialize Section N - Seller Debits (9 lines)
  for (let i = 1; i <= 9; i++) {
    const lineKey = `line_${String(i).padStart(2, '0')}`;
    defaults.seller_debit_information[lineKey] = existingData.seller_debit_information?.[lineKey] || createEmptyCreditDebitItem();
  }

  // Merge with existing data
  return deepMerge(defaults, existingData);
};

// ============================================================================
// INITIALIZE CONTACTS DATA
// ============================================================================

const initializeContactsData = (existingData = {}) => {
  const defaults = {
    borrowers: [createEmptyContact()],
    sellers: [createEmptyContact()],
    borrower_payees: [],
    seller_payees: [],
    lenders: [createEmptyLender()],
    title_companies: [],
    listing_agencies: [],
    selling_agencies: [],
    settlement_agent: createEmptyContact()
  };

  return deepMerge(defaults, existingData);
};

// ============================================================================
// INITIALIZE PROPERTIES DATA
// ============================================================================

const initializePropertiesData = (existingData = {}) => {
  const defaults = {
    properties: [createEmptyProperty()]
  };

  return deepMerge(defaults, existingData);
};

// ============================================================================
// INITIALIZE PAYOFFS DATA
// ============================================================================

const initializePayoffsData = (existingData = {}) => {
  const defaults = {
    payoffs: []
  };

  return deepMerge(defaults, existingData);
};

// ============================================================================
// INITIALIZE CALCULATIONS DATA
// ============================================================================

const initializeCalculationsData = (existingData = {}) => {
  const defaults = {
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
  };

  return deepMerge(defaults, existingData);
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const deepMerge = (target, source) => {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else if (source[key] !== undefined && source[key] !== null && source[key] !== '') {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
};

const isObject = (obj) => {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
};

// ============================================================================
// CALCULATION FUNCTIONS
// ============================================================================

const calculateSectionTotals = (cdfData) => {
  const calculations = {};
  
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
  
  // Calculate Section E - Taxes and Government Fees
  if (cdfData.taxes_and_government_fees) {
    let total = 0;
    Object.values(cdfData.taxes_and_government_fees).forEach(item => {
      if (item) {
        total += (item.paid_by_borrower || 0) + (item.paid_by_seller || 0);
      }
    });
    calculations.total_taxes_and_government_fees = total;
  }
  
  // Calculate Section F - Prepaids
  if (cdfData.prepaid_item_information) {
    let total = 0;
    Object.values(cdfData.prepaid_item_information).forEach(item => {
      if (item) {
        total += (item.paid_by_borrower || 0) + (item.paid_by_seller || 0);
      }
    });
    calculations.total_prepaids = total;
  }
  
  // Calculate Section G - Initial Escrow
  if (cdfData.escrow_information) {
    let total = 0;
    Object.values(cdfData.escrow_information).forEach(item => {
      if (item) {
        total += (item.paid_by_borrower || 0) + (item.paid_by_seller || 0);
      }
    });
    calculations.total_initial_escrow = total;
  }
  
  // Calculate Section H - Other Charges
  if (cdfData.other_charges && Array.isArray(cdfData.other_charges)) {
    let total = 0;
    cdfData.other_charges.forEach(item => {
      if (item) {
        total += (item.paid_by_borrower || 0) + (item.paid_by_seller || 0);
      }
    });
    calculations.total_other_charges = total;
  }
  
  // Calculate total loan costs (A + B + C)
  calculations.total_loan_costs = (calculations.total_origination_charges || 0) +
                                  (calculations.total_services_borrower_did_not_shop || 0) +
                                  (calculations.total_services_borrower_did_shop || 0);
  
  // Calculate total other costs (E + F + G + H)
  calculations.total_other_costs = (calculations.total_taxes_and_government_fees || 0) +
                                   (calculations.total_prepaids || 0) +
                                   (calculations.total_initial_escrow || 0) +
                                   (calculations.total_other_charges || 0);
  
  // Calculate total closing costs
  calculations.total_closing_costs = calculations.total_loan_costs + calculations.total_other_costs;
  
  return calculations;
};

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

const validateOrder = (orderData) => {
  const errors = [];
  
  // Basic validation
  if (!orderData.orderNumber) {
    errors.push('Order number is required');
  }
  
  if (!orderData.closingDate) {
    errors.push('Closing date is required');
  }
  
  // Validate at least one borrower
  if (!orderData.contactsData?.borrowers?.length || 
      !orderData.contactsData.borrowers[0].first_name ||
      !orderData.contactsData.borrowers[0].last_name) {
    errors.push('At least one borrower with name is required');
  }
  
  // Validate property address
  if (!orderData.propertiesData?.properties?.length ||
      !orderData.propertiesData.properties[0].address_line_1 ||
      !orderData.propertiesData.properties[0].address_city ||
      !orderData.propertiesData.properties[0].address_state) {
    errors.push('Property address is required');
  }
  
  // Validate loan information
  if (!orderData.cdfData?.loans?.length || !orderData.cdfData.loans[0].initial_loan_amount) {
    errors.push('Loan amount is required');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// ============================================================================
// HOOKS FOR ORDER MODEL
// ============================================================================

const initializeOrderDefaults = (order) => {
  // Initialize JSONB fields with proper structure if empty
  if (!order.cdfData || Object.keys(order.cdfData).length === 0) {
    order.cdfData = initializeCDFData(order.cdfData);
  }
  
  if (!order.contactsData || Object.keys(order.contactsData).length === 0) {
    order.contactsData = initializeContactsData(order.contactsData);
  }
  
  if (!order.propertiesData || Object.keys(order.propertiesData).length === 0) {
    order.propertiesData = initializePropertiesData(order.propertiesData);
  }
  
  if (!order.payoffsData || Object.keys(order.payoffsData).length === 0) {
    order.payoffsData = initializePayoffsData(order.payoffsData);
  }
  
  if (!order.calculationsData || Object.keys(order.calculationsData).length === 0) {
    order.calculationsData = initializeCalculationsData(order.calculationsData);
  }
  
  if (!order.documentsData || Object.keys(order.documentsData).length === 0) {
    order.documentsData = {};
  }
  
  if (!order.auditLog) {
    order.auditLog = [];
  }
  
  return order;
};

const recalculateOrderTotals = (order) => {
  // Recalculate all section totals
  if (order.cdfData) {
    const calculations = calculateSectionTotals(order.cdfData);
    order.calculationsData = {
      ...order.calculationsData,
      ...calculations
    };
  }
  
  return order;
};

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  initializeCDFData,
  initializeContactsData,
  initializePropertiesData,
  initializePayoffsData,
  initializeCalculationsData,
  initializeOrderDefaults,
  calculateSectionTotals,
  recalculateOrderTotals,
  validateOrder,
  deepMerge
};