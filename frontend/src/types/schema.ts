// Garden Schema Type Definitions
// Complete implementation of 1,150+ fields from SCHEMA-GUIDE.md
// Follows UCD (Uniform Closing Dataset) v2.0 standards with Qualia extensions

// ============================================================================
// BASE TYPES
// ============================================================================

export type MISMOAmount = number; // DECIMAL(15,2) - 2 decimal places
export type MISMOPercent = number; // DECIMAL(8,5) - 5 decimal places for rates
export type MISMOString = string; // VARCHAR(255) max
export type MISMODate = string; // ISO 8601 format (YYYY-MM-DD)
export type MISMOBoolean = boolean;

// ============================================================================
// CONTACT TYPES
// ============================================================================

export interface Address {
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  zipcode: string;
  latitude?: number;
  longitude?: number;
}

export interface PowerOfAttorney {
  has: boolean;
  agent_name?: string;
  relationship?: string;
}

export interface Contact {
  // Identity
  type: 'person' | 'company';
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  suffix?: string;
  company_name?: string;
  
  // Demographics
  gender?: 'Male' | 'Female' | 'Other';
  marital_status?: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  SSN?: string;
  date_of_birth?: MISMODate;
  
  // Contact
  email?: string;
  cell_phone?: string;
  home_phone?: string;
  work_phone?: string;
  
  // Address
  current_address?: Address;
  
  // Ownership
  on_title?: boolean;
  ownership_percentage?: MISMOPercent;
  vesting_type?: string;
  
  // Special
  power_of_attorney?: PowerOfAttorney;
}

export interface Lender extends Contact {
  lender_id?: string;
  nmls_id?: string;
  license_number?: string;
  loan_officer?: string;
  loan_officer_email?: string;
  loan_officer_phone?: string;
}

export interface TitleCompany extends Contact {
  title_company_id?: string;
  underwriter?: string;
  policy_number?: string;
  escrow_officer?: string;
  escrow_assistant?: string;
}

export interface Agency extends Contact {
  agency_id?: string;
  agent_name?: string;
  agent_email?: string;
  agent_phone?: string;
  agent_license?: string;
  commission_amount?: MISMOAmount;
  commission_percentage?: MISMOPercent;
}

// ============================================================================
// PROPERTY TYPES
// ============================================================================

export interface TaxInstallment {
  amount: MISMOAmount;
  due_date: MISMODate;
  paid: boolean;
}

export interface TaxProration {
  daily_amount: MISMOAmount;
  start_date: MISMODate;
  end_date: MISMODate;
  through_date: MISMODate;
  credit_buyer: MISMOAmount;
  debit_seller: MISMOAmount;
}

export interface TaxInformation {
  annual_amount: MISMOAmount;
  proration?: TaxProration;
  first_installment?: TaxInstallment;
  second_installment?: TaxInstallment;
}

export interface HOAInformation {
  name?: string;
  monthly_dues?: MISMOAmount;
  special_assessment?: MISMOAmount;
  transfer_fee?: MISMOAmount;
}

export interface Property {
  // Location
  address_line_1: string;
  address_line_2?: string;
  address_city: string;
  address_county?: string;
  address_state: string;
  address_zip: string;
  
  // Legal
  legal_description?: string;
  apn?: string;
  lot?: string;
  block?: string;
  
  // Tax Information (array of up to 3)
  tax_information?: TaxInformation[];
  
  // HOA
  hoa?: HOAInformation;
}

// ============================================================================
// PAYOFF TYPES
// ============================================================================

export interface Payoff {
  lender_name: string;
  loan_number?: string;
  payoff_amount: MISMOAmount;
  good_through_date?: MISMODate;
  per_diem?: MISMOAmount;
  recording_fee?: MISMOAmount;
  reconveyance_fee?: MISMOAmount;
  wire_fee?: MISMOAmount;
  statement_requested?: boolean;
  statement_received?: boolean;
  payoff_ordered?: boolean;
  payoff_received?: boolean;
}

// ============================================================================
// CDF LINE ITEM TYPES (Closing Disclosure Form)
// ============================================================================

export interface CDFLineItem {
  description?: string;
  paid_by_borrower?: MISMOAmount;
  paid_by_seller?: MISMOAmount;
  paid_by_others?: MISMOAmount;
  paid_before_closing?: MISMOAmount;
  payee_name?: string;
  is_optional?: boolean;
  not_required?: boolean;
}

export interface OtherChargeItem {
  description?: string;
  payee_name?: string;
  borrower_amount?: MISMOAmount;
  borrower_poc_amount?: MISMOAmount;
  seller_amount?: MISMOAmount;
  seller_poc_amount?: MISMOAmount;
  other_amount?: MISMOAmount;
}

export interface CDFCreditDebitItem {
  description?: string;
  amount?: MISMOAmount;
  type?: string;
}

// ============================================================================
// LOAN TYPES
// ============================================================================

export interface LoanDisclosures {
  liability_after_foreclosure?: boolean;
  homeownership_education_date?: MISMODate;
  hud_counseling_agency_name?: string;
}

export interface Loan {
  // Basic Terms
  initial_loan_amount?: MISMOAmount;
  loan_type?: 'Conventional' | 'FHA' | 'VA' | 'USDA' | 'Other';
  loan_purpose?: 'Purchase' | 'Refinance' | 'Construction';
  loan_product?: 'Fixed Rate' | 'ARM' | 'Step Rate' | 'Other';
  loan_number?: string;
  
  // Terms
  loan_term_years?: number;
  loan_term_months?: number;
  interest_rate?: MISMOPercent;
  interest_type?: 'fixed' | 'adjustable';
  
  // Features
  has_prepayment_penalty?: boolean;
  has_balloon_payment?: boolean;
  balloon_payment_description?: string[];
  interest_only?: boolean;
  is_heloc?: boolean;
  is_construction_loan?: boolean;
  is_MERS?: boolean;
  generating_mortgage_docs?: boolean;
  
  // Payment
  monthly_principal_and_interest?: MISMOAmount;
  first_payment_date?: MISMODate;
  last_payment_date?: MISMODate;
  
  // Penalties
  penalty_grace_period_days?: number;
  late_penalty_amount?: MISMOAmount;
  late_penalty_type?: '%' | '$';
  
  // Insurance
  mortgage_insurance_case_number?: string;
  
  // Disclosures
  other_disclosures?: LoanDisclosures;
}

// ============================================================================
// CDF NAMESPACE (CLOSING DISCLOSURE FORM)
// ============================================================================

export interface CDFData {
  // Section A - Origination Charges (8 lines)
  origination_charges?: {
    line_01?: CDFLineItem;
    line_02?: CDFLineItem;
    line_03?: CDFLineItem;
    line_04?: CDFLineItem;
    line_05?: CDFLineItem;
    line_06?: CDFLineItem;
    line_07?: CDFLineItem;
    line_08?: CDFLineItem;
  };
  
  // Section B - Services Borrower Did Not Shop For (8 lines)
  services_borrower_did_not_shop_for?: {
    line_01?: CDFLineItem;
    line_02?: CDFLineItem;
    line_03?: CDFLineItem;
    line_04?: CDFLineItem;
    line_05?: CDFLineItem;
    line_06?: CDFLineItem;
    line_07?: CDFLineItem;
    line_08?: CDFLineItem;
  };
  
  // Section C - Services Borrower Did Shop For (8 lines)
  services_borrower_did_shop_for?: {
    line_01?: CDFLineItem;
    line_02?: CDFLineItem;
    line_03?: CDFLineItem;
    line_04?: CDFLineItem;
    line_05?: CDFLineItem;
    line_06?: CDFLineItem;
    line_07?: CDFLineItem;
    line_08?: CDFLineItem;
  };
  
  // Section E - Taxes and Government Fees (4 lines)
  taxes_and_government_fees?: {
    line_01?: CDFLineItem;
    line_02?: CDFLineItem;
    line_03?: CDFLineItem;
    line_04?: CDFLineItem;
  };
  
  // Section F - Prepaids (5 lines)
  prepaid_item_information?: {
    line_01?: CDFLineItem;
    line_02?: CDFLineItem;
    line_03?: CDFLineItem;
    line_04?: CDFLineItem;
    line_05?: CDFLineItem;
  };
  
  // Section G - Initial Escrow Payment at Closing (8 lines)
  escrow_information?: {
    line_01?: CDFLineItem;
    line_02?: CDFLineItem;
    line_03?: CDFLineItem;
    line_04?: CDFLineItem;
    line_05?: CDFLineItem;
    line_06?: CDFLineItem;
    line_07?: CDFLineItem;
    line_08?: CDFLineItem;
  };
  
  // Section H - Other (10 lines as object)
  other_charges?: {
    line_01?: OtherChargeItem;
    line_02?: OtherChargeItem;
    line_03?: OtherChargeItem;
    line_04?: OtherChargeItem;
    line_05?: OtherChargeItem;
    line_06?: OtherChargeItem;
    line_07?: OtherChargeItem;
    line_08?: OtherChargeItem;
    line_09?: OtherChargeItem;
    line_10?: OtherChargeItem;
  };
  
  // Section K - Borrower Credits (17 lines)
  borrower_credit_information?: {
    line_01?: CDFCreditDebitItem;
    line_02?: CDFCreditDebitItem;
    line_03?: CDFCreditDebitItem;
    line_04?: CDFCreditDebitItem;
    line_05?: CDFCreditDebitItem;
    line_06?: CDFCreditDebitItem;
    line_07?: CDFCreditDebitItem;
    line_08?: CDFCreditDebitItem;
    line_09?: CDFCreditDebitItem;
    line_10?: CDFCreditDebitItem;
    line_11?: CDFCreditDebitItem;
    line_12?: CDFCreditDebitItem;
    line_13?: CDFCreditDebitItem;
    line_14?: CDFCreditDebitItem;
    line_15?: CDFCreditDebitItem;
    line_16?: CDFCreditDebitItem;
    line_17?: CDFCreditDebitItem;
  };
  
  // Section L - Borrower Debits (15 lines)
  borrower_debit_information?: {
    line_01?: CDFCreditDebitItem;
    line_02?: CDFCreditDebitItem;
    line_03?: CDFCreditDebitItem;
    line_04?: CDFCreditDebitItem;
    line_05?: CDFCreditDebitItem;
    line_06?: CDFCreditDebitItem;
    line_07?: CDFCreditDebitItem;
    line_08?: CDFCreditDebitItem;
    line_09?: CDFCreditDebitItem;
    line_10?: CDFCreditDebitItem;
    line_11?: CDFCreditDebitItem;
    line_12?: CDFCreditDebitItem;
    line_13?: CDFCreditDebitItem;
    line_14?: CDFCreditDebitItem;
    line_15?: CDFCreditDebitItem;
  };
  
  // Section M - Seller Credits (5 lines)
  seller_credit_information?: {
    line_01?: CDFCreditDebitItem;
    line_02?: CDFCreditDebitItem;
    line_03?: CDFCreditDebitItem;
    line_04?: CDFCreditDebitItem;
    line_05?: CDFCreditDebitItem;
  };
  
  // Section N - Seller Debits (9 lines)
  seller_debit_information?: {
    line_01?: CDFCreditDebitItem;
    line_02?: CDFCreditDebitItem;
    line_03?: CDFCreditDebitItem;
    line_04?: CDFCreditDebitItem;
    line_05?: CDFCreditDebitItem;
    line_06?: CDFCreditDebitItem;
    line_07?: CDFCreditDebitItem;
    line_08?: CDFCreditDebitItem;
    line_09?: CDFCreditDebitItem;
  };
  
  // Loan Information
  loans?: Loan[];
  
  // Summary Sections
  closing_costs?: {
    total_loan_costs?: MISMOAmount;
    total_other_costs?: MISMOAmount;
    total_closing_costs?: MISMOAmount;
    closing_costs_financed?: MISMOAmount;
    down_payment?: MISMOAmount;
    deposit?: MISMOAmount;
    funds_for_borrower?: MISMOAmount;
    seller_credits?: MISMOAmount;
    adjustments_and_other_credits?: MISMOAmount;
    cash_to_close?: MISMOAmount;
  };
  
  // Transaction Information
  transaction_information?: {
    sale_price?: MISMOAmount;
    purchase_price?: MISMOAmount;
    existing_loans?: MISMOAmount;
    payoff_amount?: MISMOAmount;
  };
}

// ============================================================================
// CONTACTS NAMESPACE
// ============================================================================

export interface ContactsData {
  // Arrays with specific limits
  borrowers?: Contact[]; // [0-3] max 4
  sellers?: Contact[]; // [0-3] max 4
  borrower_payees?: Contact[]; // [0-3] max 4
  seller_payees?: Contact[]; // [0-3] max 4
  lenders?: Lender[]; // [0-2] max 3
  title_companies?: TitleCompany[]; // [0-1] max 2
  listing_agencies?: Agency[]; // [0-1] max 2
  selling_agencies?: Agency[]; // [0-1] max 2
  
  // Single entities
  settlement_agent?: Contact;
  closing_attorney?: Contact;
  escrow_company?: Contact;
}

// ============================================================================
// PROPERTIES NAMESPACE
// ============================================================================

export interface PropertiesData {
  properties?: Property[]; // Usually just [0] but supports multiple
}

// ============================================================================
// PAYOFFS NAMESPACE
// ============================================================================

export interface PayoffsData {
  payoffs?: Payoff[]; // [0-3] max 4
}

// ============================================================================
// CALCULATIONS NAMESPACE
// ============================================================================

export interface CalculationsData {
  // Section Totals
  total_origination_charges?: MISMOAmount;
  total_services_borrower_did_not_shop?: MISMOAmount;
  total_services_borrower_did_shop?: MISMOAmount;
  total_taxes_and_government_fees?: MISMOAmount;
  total_prepaids?: MISMOAmount;
  total_initial_escrow?: MISMOAmount;
  total_other_charges?: MISMOAmount;
  total_borrower_credits?: MISMOAmount;
  total_borrower_debits?: MISMOAmount;
  total_seller_credits?: MISMOAmount;
  total_seller_debits?: MISMOAmount;
  
  // Summary Calculations
  borrower_cash_to_close?: MISMOAmount;
  seller_proceeds?: MISMOAmount;
  
  // Proration Calculations
  tax_proration_amount?: MISMOAmount;
  hoa_proration_amount?: MISMOAmount;
  interest_proration_amount?: MISMOAmount;
  
  // Commission Calculations
  total_commission?: MISMOAmount;
  listing_commission?: MISMOAmount;
  selling_commission?: MISMOAmount;
  
  // Wire Calculations
  wire_amount_to_title?: MISMOAmount;
  wire_amount_from_borrower?: MISMOAmount;
  wire_amount_to_seller?: MISMOAmount;
}

// ============================================================================
// DOCUMENTS NAMESPACE
// ============================================================================

export interface DocumentMetadata {
  document_id: string;
  document_type: string;
  document_name: string;
  created_at: MISMODate;
  updated_at?: MISMODate;
  generated_by?: string;
  file_path?: string;
  file_size?: number;
  mime_type?: string;
  status?: 'draft' | 'final' | 'signed' | 'recorded';
  signature_required?: boolean;
  signatures?: Array<{
    party_type: string;
    party_name: string;
    signed_at?: MISMODate;
    signature_method?: 'wet' | 'electronic';
  }>;
}

export interface DocumentsData {
  closing_disclosure?: DocumentMetadata;
  hud_settlement_statement?: DocumentMetadata;
  deed?: DocumentMetadata;
  deed_of_trust?: DocumentMetadata;
  note?: DocumentMetadata;
  title_policy?: DocumentMetadata;
  checks?: DocumentMetadata[];
  other_documents?: DocumentMetadata[];
}

// ============================================================================
// AUDIT LOG
// ============================================================================

export interface AuditEntry {
  timestamp: string;
  user_id: string;
  user_name: string;
  action: string;
  field_path?: string;
  old_value?: any;
  new_value?: any;
  ip_address?: string;
  user_agent?: string;
}

// ============================================================================
// MAIN ORDER INTERFACE
// ============================================================================

export interface OrderData {
  // Core Fields (not in JSONB)
  id?: string;
  orderNumber: string;
  status?: 'draft' | 'pending' | 'in_review' | 'approved' | 'closing' | 'closed' | 'cancelled';
  closingDate?: MISMODate;
  propertyAddress?: string;
  
  // JSONB Data Structures
  cdfData?: CDFData;
  contactsData?: ContactsData;
  propertiesData?: PropertiesData;
  payoffsData?: PayoffsData;
  calculationsData?: CalculationsData;
  documentsData?: DocumentsData;
  auditLog?: AuditEntry[];
  
  // Metadata
  userId?: number;
  createdBy?: string;
  updatedBy?: string;
  notes?: string;
  isLocked?: boolean;
  lockedAt?: MISMODate;
  lockedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// UTILITY TYPES FOR FIELD PATHS
// ============================================================================

// Helper type to generate all valid field paths for data binding
export type FieldPath = 
  // CDF paths
  | `cdfData.origination_charges.line_${string}.${keyof CDFLineItem}`
  | `cdfData.services_borrower_did_not_shop_for.line_${string}.${keyof CDFLineItem}`
  | `cdfData.services_borrower_did_shop_for.line_${string}.${keyof CDFLineItem}`
  | `cdfData.taxes_and_government_fees.line_${string}.${keyof CDFLineItem}`
  | `cdfData.prepaid_item_information.line_${string}.${keyof CDFLineItem}`
  | `cdfData.escrow_information.line_${string}.${keyof CDFLineItem}`
  | `cdfData.other_charges.${number}.${keyof CDFLineItem}`
  | `cdfData.borrower_credit_information.line_${string}.${keyof CDFCreditDebitItem}`
  | `cdfData.borrower_debit_information.line_${string}.${keyof CDFCreditDebitItem}`
  | `cdfData.seller_credit_information.line_${string}.${keyof CDFCreditDebitItem}`
  | `cdfData.seller_debit_information.line_${string}.${keyof CDFCreditDebitItem}`
  | `cdfData.loans.${number}.${keyof Loan}`
  | `cdfData.closing_costs.${string}`
  | `cdfData.transaction_information.${string}`
  // Contact paths
  | `contactsData.borrowers.${number}.${keyof Contact}`
  | `contactsData.sellers.${number}.${keyof Contact}`
  | `contactsData.lenders.${number}.${keyof Lender}`
  // Property paths
  | `propertiesData.properties.${number}.${keyof Property}`
  // Payoff paths
  | `payoffsData.payoffs.${number}.${keyof Payoff}`
  // Calculation paths
  | `calculationsData.${keyof CalculationsData}`;

// ============================================================================
// EXPORT DEFAULT ORDER TYPE
// ============================================================================

// Export is already done with the interface declaration above