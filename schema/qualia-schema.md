# Qualia Schema (Extracted from HTML Prototypes)

## Overview
This schema represents the data structure used in the Garden application (Qualia clone), extracted from analyzing 35+ HTML prototype files. The schema follows Qualia's naming conventions and hierarchical organization for real estate closing management.

## Schema Structure

### Primary Namespaces
- **cdf** - Closing Disclosure Form (TRID compliance)
- **contacts** - All parties involved in transactions
- **properties** - Property and tax information
- **payoffs** - Existing loan payoffs
- **wire_info** - Wire transfer details
- **check_info** - Check mailing information
- **accounting** - Accounting and tax settings

## 1. CDF (Closing Disclosure Form) Namespace

### 1.1 Loans
```javascript
cdf.loans[index] = {
  // Basic Loan Information
  initial_loan_amount: number,
  loan_amount: number,
  funding_type: "net" | "gross",
  loan_type: string, // "Conventional", "FHA", "VA", etc.
  loan_purpose: string, // "Purchase", "Refinance", "Construction"
  loan_product: string, // Fixed Rate, ARM, etc.
  loan_number: string,
  
  // Terms
  loan_term_years: number,
  loan_term_months: number,
  interest_rate: number,
  interest_type: "fixed" | "adjustable",
  interest_only: boolean,
  
  // Dates
  first_payment_date: date,
  last_payment_date: date,
  mortgage_commitment_date: date,
  
  // Payment Information
  monthly_principal_and_interest: number,
  monthly_principal_and_interest_can_increase: boolean,
  initial_loan_amount_can_increase: boolean,
  interest_rate_can_increase: boolean,
  
  // Features
  has_prepayment_penalty: boolean,
  has_balloon_payment: boolean,
  balloon_payment_description: string[],
  is_heloc: boolean,
  is_construction_loan: boolean,
  is_MERS: boolean,
  generating_mortgage_docs: boolean,
  
  // Penalties and Insurance
  penalty_grace_period_days: number,
  late_penalty_amount: number,
  late_penalty_type: "%" | "$",
  mortgage_insurance_case_number: string,
  
  // Disclosures
  other_disclosures: {
    liability_after_foreclosure: boolean,
    homeownership_education_date: date,
    hud_counseling_agency_name: string
  }
}
```

### 1.2 Loan Calculations
```javascript
cdf.loan_calculations = {
  total_of_payments: number,
  finance_charge: number,
  amount_financed: number,
  annual_percentage_rate: number,
  total_interest_percentage: number
}
```

### 1.3 Origination Charges (Section A)
```javascript
cdf.origination_charges.line_[01-08] = {
  description: string,
  is_origination_charge: boolean,
  is_optional: boolean,
  pcp_calculation_type: string,
  paid_by_borrower: number,
  paid_by_seller: number,
  paid_by_others: number,
  paid_before_closing: number
}
```

### 1.4 Services Not Shopped For (Section B)
```javascript
cdf.services_borrower_did_not_shop_for.line_[01-08] = {
  description: string,
  payee_name: string,
  is_borrower: boolean,
  paid_by_borrower: number,
  paid_by_seller: number,
  paid_by_others: number,
  paid_before_closing: number,
  not_required: boolean
}
```

### 1.5 Services Shopped For (Section C)
```javascript
cdf.services_borrower_did_shop_for.line_[01-08] = {
  description: string,
  payee_name: string,
  is_borrower: boolean,
  paid_by_borrower: number,
  paid_by_seller: number,
  paid_by_others: number,
  paid_before_closing: number,
  not_required: boolean
}
```

### 1.6 Taxes and Government Fees (Section E)
```javascript
cdf.taxes_and_government_fees.line_[01-13] = {
  description: string,
  paid_by_borrower: number,
  paid_by_seller: number,
  paid_by_others: number,
  paid_before_closing: number,
  governmental: boolean,
  recording_fees: boolean,
  transfer_taxes: boolean
}
```

### 1.7 Prepaid Items (Section F)
```javascript
cdf.prepaid_item_information.line_[01-05] = {
  description: string,
  item_type: string, // "HOMEOWNER_INSURANCE", "MORTGAGE_INSURANCE", etc.
  payee_name: string,
  months_or_days: number,
  per_diem_or_monthly_amount: number,
  paid_by_borrower: number,
  paid_by_seller: number,
  paid_by_others: number,
  paid_before_closing: number,
  date_from: date,
  date_to: date
}
```

### 1.8 Initial Escrow (Section G)
```javascript
cdf.escrow_information.line_[01-08] = {
  description: string,
  item_type: string,
  monthly_payment_amount: number,
  months_escrow_payment: number,
  paid_by_borrower: number,
  paid_by_seller: number,
  paid_by_others: number,
  paid_before_closing: number
}
```

### 1.9 Other Charges (Section H)
```javascript
cdf.other_charges.line_[01-08] = {
  description: string,
  payee_name: string,
  is_optional: boolean,
  not_required: boolean,
  paid_by_borrower: number,
  paid_by_seller: number,
  paid_by_others: number,
  paid_before_closing: number
}
```

### 1.10 Credits and Debits (Sections K, L, M, N)
```javascript
// Borrower Credits (Section K)
cdf.borrower_credit_information.line_[01-17] = {
  description: string,
  amount: number,
  in_column_1: boolean,
  in_column_2: boolean
}

// Borrower Debits (Section L)
cdf.borrower_debit_information.line_[01-15] = {
  description: string,
  amount: number,
  in_column_1: boolean,
  in_column_2: boolean
}

// Seller Credits (Section M)
cdf.seller_credit_information.line_[01-17] = {
  description: string,
  amount: number,
  in_column_1: boolean,
  in_column_2: boolean
}

// Seller Debits (Section N)
cdf.seller_debit_information.line_[01-15] = {
  description: string,
  amount: number,
  in_column_1: boolean,
  in_column_2: boolean
}
```

### 1.11 Total Closing Costs
```javascript
cdf.total_closing_costs = {
  closing_costs_subtotals: {
    borrower_total: number,
    before_borrower_total: number,
    seller_total: number,
    before_seller_total: number,
    paid_by_others_total: number
  },
  lender_credits: {
    borrower_amount: number,
    before_borrower_amount: number,
    seller_amount: number,
    before_seller_amount: number,
    paid_by_others_amount: number,
    amount_because_above_legal_limit: number
  }
}
```

### 1.12 Cash to Close
```javascript
cdf.purchase_cash_to_close = {
  total_closing_costs: {
    for_borrower: number,
    for_seller: number
  },
  closing_costs_financed: number,
  down_payment_from_borrower: {
    amount: number,
    funds_from_borrower: number
  },
  deposit: {
    amount: number,
    earnest_money: number
  },
  funds_for_borrower: number,
  seller_credits: {
    amount: number,
    paid_by_seller: number
  },
  adjustments_and_other_credits: {
    amount: number,
    for_borrower: number
  },
  cash_to_close: {
    to_borrower: number,
    from_borrower: number
  }
}
```

## 2. Contacts Namespace

### 2.1 Borrowers
```javascript
contacts.borrowers[index] = {
  // Personal Information
  type: "person" | "company",
  first_name: string,
  middle_name: string,
  last_name: string,
  suffix: string,
  company_name: string,
  
  // Demographics
  gender: "Male" | "Female" | "Other",
  marital_status: "Single" | "Married" | "Divorced" | "Widowed",
  SSN: string,
  date_of_birth: date,
  
  // Contact Information
  email: string,
  cell_phone: string,
  home_phone: string,
  work_phone: string,
  fax: string,
  
  // Address
  current_address: {
    address_1: string,
    address_2: string,
    city: string,
    state: string,
    zipcode: string,
    latitude: number,
    longitude: number
  },
  
  // Ownership
  on_title: boolean,
  ownership_percentage: number,
  vesting_type: string,
  
  // Special Situations
  has_exchange: boolean,
  power_of_attorney: {
    has: boolean,
    agent_name: string,
    relationship: string
  }
}
```

### 2.2 Sellers
```javascript
contacts.sellers[index] = {
  // Same structure as borrowers plus:
  proceeds_delivery_method: "check" | "wire" | "holdback",
  proceeds_sent_via: string,
  proceeds_mail_to: string,
  
  // Tax Information
  forwarding_address: {
    address_1: string,
    address_2: string,
    city: string,
    state: string,
    zipcode: string
  },
  
  // 1099 Information
  needs_1099: boolean,
  foreign_seller: boolean
}
```

### 2.3 Payees
```javascript
contacts.borrower_payees[index] = {
  type: "check" | "wire",
  name: string,
  payment_dep: string,
  reference_number: string,
  address: {
    address_1: string,
    address_2: string,
    city: string,
    state: string,
    zipcode: string
  }
}

contacts.seller_payees[index] = {
  // Same structure as borrower_payees
}
```

### 2.4 Service Providers
```javascript
contacts.lenders[index] = {
  company_name: string,
  loan_officer_name: string,
  email: string,
  phone: string,
  nmls_id: string,
  address: {
    address_1: string,
    address_2: string,
    city: string,
    state: string,
    zipcode: string
  }
}

contacts.title_companies[index] = {
  company_name: string,
  escrow_officer: string,
  email: string,
  phone: string,
  license_number: string
}

contacts.listing_agencies[index] = {
  company_name: string,
  agent_name: string,
  email: string,
  phone: string,
  license_number: string,
  commission: {
    percentage: number,
    amount: number,
    paid_by: "seller" | "buyer"
  }
}

contacts.selling_agencies[index] = {
  // Same structure as listing_agencies
}
```

## 3. Properties Namespace

```javascript
properties[index] = {
  // Address
  address_line_1: string,
  address_line_2: string,
  address_city: string,
  address_county: string,
  address_state: string,
  address_zip: string,
  
  // Legal Description
  legal_description: string,
  apn: string, // Assessor's Parcel Number
  lot: string,
  block: string,
  
  // Tax Information
  tax_information: {
    annual_amount: number,
    proration: {
      daily_amount: number,
      start_date: date,
      end_date: date,
      through_date: date,
      credit_buyer: number,
      debit_seller: number
    },
    first_installment: {
      amount: number,
      due_date: date,
      delinquent_date: date,
      paid: boolean
    },
    second_installment: {
      amount: number,
      due_date: date,
      delinquent_date: date,
      paid: boolean
    },
    supplemental_taxes: number,
    mello_roos: number,
    assessments: number
  },
  
  // HOA Information
  hoa: {
    name: string,
    monthly_dues: number,
    special_assessment: number,
    transfer_fee: number
  }
}
```

## 4. Payoffs Namespace

```javascript
payoffs[index] = {
  lender_name: string,
  loan_number: string,
  payoff_amount: number,
  good_through_date: date,
  per_diem: number,
  
  // Additional charges
  recording_fee: number,
  reconveyance_fee: number,
  wire_fee: number,
  
  // Status
  statement_requested: boolean,
  statement_received: boolean,
  payoff_ordered: boolean,
  payoff_received: boolean
}
```

## 5. Wire Information

```javascript
wire_info = {
  // Bank Information
  bank_name: string,
  bank_address: string,
  routing_number: string,
  swift_code: string,
  
  // Account Information
  account_name: string,
  account_number: string,
  account_type: "checking" | "savings",
  
  // Reference
  reference: string,
  further_credit_to: string,
  
  // Verification
  verified_by: string,
  verified_date: date,
  callback_number: string
}
```

## 6. Check Information

```javascript
check_info = {
  payable_to: string,
  street_address_1: string,
  street_address_2: string,
  city: string,
  state: string,
  zip_code: string,
  
  // Delivery
  delivery_method: "mail" | "pickup" | "overnight",
  attention: string,
  special_instructions: string
}
```

## 7. Transaction Metadata

```javascript
// Top-level transaction fields
{
  order_number: string,
  file_number: string,
  escrow_number: string,
  
  // Dates
  estimated_closing_date: date,
  contract_date: date,
  funding_date: date,
  disbursement_date: date,
  recording_date: date,
  
  // Transaction Type
  transaction_type: "purchase" | "refinance" | "sale",
  property_type: "single_family" | "condo" | "townhouse" | "multi_family",
  
  // Financial
  purchase_price: number,
  sale_price: number,
  
  // Earnest Money
  earnest_amount: number,
  earnest_held_by: string,
  earnest_held_by_settlement_agency: string,
  disclose_earnest_to_seller_on_cd: boolean,
  
  // Commissions
  listing_commission_base_amount: number,
  listing_percentage: number,
  listing_additional_amount: number,
  listing_commission_amount: number,
  listing_commission_who_pays_parent: "seller" | "buyer",
  
  selling_commission_base_amount: number,
  selling_percentage: number,
  selling_additional_amount: number,
  selling_commission_amount: number,
  selling_commission_who_pays_parent: "seller" | "buyer",
  
  // Statement Dates
  borrower_statement_issued_date: date,
  seller_statement_issued_date: date,
  
  // Settings
  accounting: {
    use_custom_tax_proration: boolean,
    tax_rate: number,
    proration_method: "daily_365" | "daily_360" | "monthly"
  }
}
```

## Naming Conventions

### Field Naming Patterns
1. **Monetary amounts**: `*_amount`, `*_fee`, `*_charge`, `*_cost`
2. **Dates**: `*_date`, `date_*`
3. **Boolean flags**: `is_*`, `has_*`, `*_required`, `*_optional`
4. **Percentages**: `*_percentage`, `*_rate`
5. **Identifiers**: `*_number`, `*_id`, `*_code`
6. **Descriptions**: `*_description`, `*_name`

### Array Indexing
- Arrays use zero-based indexing: `.0`, `.1`, `.2`
- Line items use padded numbers: `line_01`, `line_02`, etc.

### Payment Distribution
- `paid_by_borrower`: Amount paid by borrower at closing
- `paid_by_seller`: Amount paid by seller at closing
- `paid_by_others`: Amount paid by third parties
- `paid_before_closing`: Amount already paid (POC)

### Column Designations
- `in_column_1`: Appears in first column (usually "from")
- `in_column_2`: Appears in second column (usually "to")

## TRID Compliance Mapping

The schema follows TRID (TILA-RESPA Integrated Disclosure) requirements:

- **Section A**: Origination Charges → `cdf.origination_charges`
- **Section B**: Services You Cannot Shop For → `cdf.services_borrower_did_not_shop_for`
- **Section C**: Services You Can Shop For → `cdf.services_borrower_did_shop_for`
- **Section D**: Total Loan Costs (calculated)
- **Section E**: Taxes and Government Fees → `cdf.taxes_and_government_fees`
- **Section F**: Prepaids → `cdf.prepaid_item_information`
- **Section G**: Initial Escrow → `cdf.escrow_information`
- **Section H**: Other → `cdf.other_charges`
- **Section I**: Total Other Costs (calculated)
- **Section J**: Total Closing Costs → `cdf.total_closing_costs`
- **Section K**: Borrower Credits → `cdf.borrower_credit_information`
- **Section L**: Borrower Debits → `cdf.borrower_debit_information`
- **Section M**: Seller Credits → `cdf.seller_credit_information`
- **Section N**: Seller Debits → `cdf.seller_debit_information`

## Implementation Notes

1. **Validation**: All monetary fields should validate as numbers with 2 decimal places
2. **Required Fields**: Fields without `_optional` or conditional logic are typically required
3. **Calculations**: Many fields trigger automatic recalculations (commissions, prorations, totals)
4. **Dependencies**: Some fields enable/disable others (e.g., `is_heloc` enables HELOC-specific fields)
5. **Multi-party**: Support for multiple borrowers, sellers, and payoffs through array structures
6. **Audit Trail**: All changes should be tracked with user and timestamp
7. **Document Generation**: Schema maps directly to Closing Disclosure and Settlement Statement formats