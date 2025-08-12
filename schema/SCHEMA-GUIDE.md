# Garden Schema Implementation Guide

## Overview
This document defines the complete schema for the Garden real estate closing system, combining federal UCD (Uniform Closing Dataset) requirements with Qualia-style extensions for comprehensive title and escrow management.

## Schema Architecture

### Core Principles
1. **Federal Compliance**: Base schema follows MISMO UCD v2.0 standards for Fannie Mae/Freddie Mac delivery
2. **Array-Based Design**: Supports multiple instances of all entities (borrowers, payoffs, charges)
3. **TRID Alignment**: Sections A-N map directly to Closing Disclosure form requirements
4. **Extensibility**: Qualia-style extensions for title/escrow operations beyond federal requirements

### Total Schema Scope
- **1,150+ total fields** when fully expanded with all array elements
- **178 base mapping patterns** between UCD and Qualia
- **123 unique schema keys** identified in HTML prototypes
- **35+ HTML prototype pages** defining UI patterns

## Data Type Standards

### Type Mappings
| JavaScript Type | Database Type | UCD Type | Validation Rules |
|----------------|---------------|----------|------------------|
| number | DECIMAL(15,2) | MISMOAmount | 2 decimal places, max 15 digits |
| number | DECIMAL(8,5) | MISMOPercent | 5 decimal places for rates |
| string | VARCHAR(255) | MISMOString | Max 255 characters default |
| date | DATE | MISMODate | ISO 8601 format (YYYY-MM-DD) |
| boolean | BOOLEAN | MISMOBoolean | true/false only |

## Schema Namespaces

### 1. CDF (Closing Disclosure Form)
The primary namespace for TRID-compliant closing disclosure data.

#### Array Limits by Section
| Section | Description | Line Items | Fields per Line | Total Fields |
|---------|-------------|------------|-----------------|--------------|
| A - Origination Charges | `cdf.origination_charges.line_[01-08]` | 8 | 8 | 64 |
| B - Cannot Shop | `cdf.services_borrower_did_not_shop_for.line_[01-08]` | 8 | 8 | 64 |
| C - Can Shop | `cdf.services_borrower_did_shop_for.line_[01-08]` | 8 | 8 | 64 |
| E - Taxes & Gov | `cdf.taxes_and_government_fees.line_[01-04]` | 4 | 8 | 32 |
| F - Prepaids | `cdf.prepaid_item_information.line_[01-05]` | 5 | 8 | 40 |
| G - Initial Escrow | `cdf.escrow_information.line_[01-08]` | 8 | 8 | 64 |
| H - Other | `cdf.other_charges.[0-7]` | 8 | 8 | 64 |
| K - Borrower Credits | `cdf.borrower_credit_information.line_[01-17]` | 17 | 3 | 51 |
| L - Borrower Debits | `cdf.borrower_debit_information.line_[01-15]` | 15 | 3 | 45 |
| M - Seller Credits | `cdf.seller_credit_information.line_[01-05]` | 5 | 3 | 15 |
| N - Seller Debits | `cdf.seller_debit_information.line_[01-09]` | 9 | 3 | 27 |

#### Line Item Structure
Each line item in sections A-H contains:
```javascript
{
  description: string,              // Line item description
  paid_by_borrower: number,        // Amount paid by borrower at closing
  paid_by_seller: number,          // Amount paid by seller at closing
  paid_by_others: number,          // Amount paid by third parties
  paid_before_closing: number,     // POC (Paid Outside Closing)
  payee_name: string,              // Who receives payment
  is_optional: boolean,            // Optional service flag
  not_required: boolean            // Not required flag
}
```

### 2. Contacts Namespace
Supports multiple parties with array indexing.

#### Entity Array Limits
| Entity Type | Array Size | Path Pattern | Use Case |
|------------|------------|--------------|----------|
| Borrowers | 4 | `contacts.borrowers.[0-3]` | Primary + co-borrowers |
| Sellers | 4 | `contacts.sellers.[0-3]` | Multiple sellers |
| Borrower Payees | 4 | `contacts.borrower_payees.[0-3]` | Payment recipients |
| Seller Payees | 4 | `contacts.seller_payees.[0-3]` | Proceeds recipients |
| Lenders | 3 | `contacts.lenders.[0-2]` | Multiple lenders |
| Title Companies | 2 | `contacts.title_companies.[0-1]` | Title providers |
| Listing Agencies | 2 | `contacts.listing_agencies.[0-1]` | Listing agents |
| Selling Agencies | 2 | `contacts.selling_agencies.[0-1]` | Buyer agents |

#### Contact Schema Structure
```javascript
contacts.borrowers[index] = {
  // Identity
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
  
  // Contact
  email: string,
  cell_phone: string,
  home_phone: string,
  work_phone: string,
  
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
  
  // Special
  power_of_attorney: {
    has: boolean,
    agent_name: string,
    relationship: string
  }
}
```

### 3. Properties Namespace
Single property with multiple tax records.

```javascript
properties[0] = {
  // Location
  address_line_1: string,
  address_line_2: string,
  address_city: string,
  address_county: string,
  address_state: string,
  address_zip: string,
  
  // Legal
  legal_description: string,
  apn: string,
  lot: string,
  block: string,
  
  // Tax Information (array of up to 3)
  tax_information: [{
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
      paid: boolean
    },
    second_installment: {
      amount: number,
      due_date: date,
      paid: boolean
    }
  }],
  
  // HOA
  hoa: {
    name: string,
    monthly_dues: number,
    special_assessment: number,
    transfer_fee: number
  }
}
```

### 4. Payoffs Namespace
Supports up to 4 existing loans/liens.

```javascript
payoffs[0-3] = {
  lender_name: string,
  loan_number: string,
  payoff_amount: number,
  good_through_date: date,
  per_diem: number,
  recording_fee: number,
  reconveyance_fee: number,
  wire_fee: number,
  statement_requested: boolean,
  statement_received: boolean,
  payoff_ordered: boolean,
  payoff_received: boolean
}
```

### 5. Loan Information
Single loan with comprehensive terms.

```javascript
cdf.loans[0] = {
  // Basic Terms
  initial_loan_amount: number,
  loan_type: "Conventional" | "FHA" | "VA" | "USDA" | "Other",
  loan_purpose: "Purchase" | "Refinance" | "Construction",
  loan_product: "Fixed Rate" | "ARM" | "Step Rate" | "Other",
  loan_number: string,
  
  // Terms
  loan_term_years: number,
  loan_term_months: number,
  interest_rate: number,
  interest_type: "fixed" | "adjustable",
  
  // Features
  has_prepayment_penalty: boolean,
  has_balloon_payment: boolean,
  balloon_payment_description: [string],
  interest_only: boolean,
  is_heloc: boolean,
  is_construction_loan: boolean,
  is_MERS: boolean,
  generating_mortgage_docs: boolean,
  
  // Payment
  monthly_principal_and_interest: number,
  first_payment_date: date,
  last_payment_date: date,
  
  // Penalties
  penalty_grace_period_days: number,
  late_penalty_amount: number,
  late_penalty_type: "%" | "$",
  
  // Insurance
  mortgage_insurance_case_number: string,
  
  // Disclosures
  other_disclosures: {
    liability_after_foreclosure: boolean,
    homeownership_education_date: date,
    hud_counseling_agency_name: string
  }
}
```

## Implementation Requirements

### 1. Database Design
```sql
-- Use JSON columns for array data
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    cdf_data JSONB NOT NULL,  -- Store entire CDF namespace
    contacts_data JSONB NOT NULL,  -- Store all contacts
    properties_data JSONB NOT NULL,  -- Property information
    payoffs_data JSONB NOT NULL,  -- Payoff array
    -- Extracted fields for querying
    order_number VARCHAR(50) UNIQUE,
    closing_date DATE,
    purchase_price DECIMAL(15,2),
    loan_amount DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index JSON fields for performance
CREATE INDEX idx_cdf_loan_amount ON orders ((cdf_data->'loans'->0->>'initial_loan_amount'));
CREATE INDEX idx_contacts_borrower ON orders ((contacts_data->'borrowers'->0->>'last_name'));
```

### 2. Validation Rules

#### Required Fields by Transaction Type
**Purchase Transaction:**
- purchase_price (required)
- cdf.loans[0].initial_loan_amount (required unless cash)
- contacts.borrowers[0] (required)
- contacts.sellers[0] (required)
- properties[0] (required)

**Refinance Transaction:**
- cdf.loans[0].initial_loan_amount (required)
- contacts.borrowers[0] (required)
- payoffs[0] (required)
- properties[0] (required)

#### Field Interdependencies
- If `has_balloon_payment` = true, then `balloon_payment_description[0]` required
- If `is_heloc` = true, then `interest_only` typically true
- If Section A has entries, total must equal origination charge amount
- Sections K + L must balance for borrower
- Sections M + N must balance for seller

### 3. Calculation Engine

#### Critical Calculations
```javascript
// Section Totals
const sectionA_total = sum(cdf.origination_charges.line_*.paid_by_borrower);
const sectionB_total = sum(cdf.services_borrower_did_not_shop_for.line_*.paid_by_borrower);
const sectionC_total = sum(cdf.services_borrower_did_shop_for.line_*.paid_by_borrower);
const sectionD_total = sectionA_total + sectionB_total + sectionC_total; // Total Loan Costs

// Cash to Close
const cash_to_close = 
  purchase_price
  - loan_amount
  + total_closing_costs
  - earnest_money_deposit
  - seller_credits
  +/- adjustments;

// APR Calculation (simplified)
const apr = calculateAPR(
  loan_amount,
  finance_charge,
  loan_term_months,
  payment_schedule
);

// TIP (Total Interest Percentage)
const tip = (total_interest_paid / loan_amount) * 100;
```

### 4. API Design

#### RESTful Endpoints
```
POST   /api/orders                 # Create new order
GET    /api/orders/:id             # Get complete order
PUT    /api/orders/:id             # Update order
GET    /api/orders/:id/cdf         # Get CDF data only
POST   /api/orders/:id/calculate   # Trigger calculations
GET    /api/orders/:id/validate    # Validate against UCD
POST   /api/orders/:id/generate-cd # Generate Closing Disclosure
```

#### GraphQL Schema
```graphql
type Order {
  id: ID!
  orderNumber: String!
  cdf: CDFData!
  contacts: ContactsData!
  properties: [Property!]!
  payoffs: [Payoff!]!
  calculations: Calculations!
}

type CDFData {
  loans: [Loan!]!
  originationCharges: ChargeSection!
  servicesNotShopped: ChargeSection!
  servicesShopped: ChargeSection!
  # ... all sections
}

input OrderInput {
  cdf: CDFInput!
  contacts: ContactsInput!
  # ... matching input types
}
```

### 5. Frontend Implementation

#### React Component Structure
```
src/
  components/
    sections/
      SectionA/           # Origination charges
        LineItem.tsx      # Reusable line component
        SectionA.tsx      # Section container
      SectionB/           # Cannot shop services
      SectionC/           # Can shop services
      # ... Sections E-N
    contacts/
      BorrowerForm.tsx    # Borrower entry
      SellerForm.tsx      # Seller entry
      PayeeManager.tsx    # Manage payees
    calculations/
      CashToClose.tsx     # Cash to close calc
      APRCalculator.tsx   # APR/TIP calc
    shared/
      ArrayField.tsx      # Handle array inputs
      MoneyInput.tsx      # Currency formatting
      DatePicker.tsx      # Date selection
```

#### State Management
```javascript
// Redux/Zustand store structure
const orderStore = {
  cdf: {
    loans: [{}],
    origination_charges: {
      line_01: {},
      line_02: {},
      // ...
    },
    // All CDF sections
  },
  contacts: {
    borrowers: [{}],
    sellers: [{}],
    // All contact arrays
  },
  properties: [{}],
  payoffs: [],
  calculations: {
    totalClosingCosts: 0,
    cashToClose: 0,
    apr: 0,
    tip: 0
  }
}
```

## Migration from UCD

### Import Process
1. Parse incoming UCD XML/JSON
2. Map UCD fields to Qualia schema using mapping table
3. Initialize empty arrays for Qualia-specific fields
4. Validate required fields
5. Calculate derived fields
6. Store in database

### Export Process
1. Extract required UCD fields from Qualia schema
2. Convert data types (number → MISMOAmount)
3. Apply MISMO enumerations
4. Generate UCD-compliant XML
5. Validate against XSD
6. Submit to GSE systems

## Testing Requirements

### Unit Tests
- Each calculation function
- Field validation rules
- Array limit enforcement
- Data type conversions

### Integration Tests
- Complete order creation
- Section calculations
- Cash to close reconciliation
- UCD import/export

### E2E Tests
- Purchase transaction flow
- Refinance transaction flow
- Complex multi-borrower scenario
- Maximum array sizes

## Performance Considerations

### Optimization Strategies
1. **Lazy Loading**: Load sections on demand
2. **Debounced Calculations**: Delay calculations during rapid input
3. **Indexed Fields**: Index frequently queried JSON paths
4. **Caching**: Cache section totals
5. **Batch Updates**: Group multiple field updates

### Scalability Limits
- Max 4 borrowers/sellers per transaction
- Max 17 line items in credit/debit sections
- Max 8 line items in charge sections
- Max 4 payoffs per transaction
- Max file size: ~500KB per complete order

## Compliance Requirements

### TRID Compliance
- All required disclosures must be present
- Calculations must match CFPB requirements
- 3-day review period tracking
- Change circumstance documentation

### Data Privacy
- PII encryption at rest
- SSN masking in UI
- Audit trail for all changes
- Role-based access control

### State-Specific Requirements
- Additional fields for state taxes
- State-specific recording fees
- Local jurisdiction requirements
- Custom disclosure fields

## Appendix: Field Count Analysis

### Total Field Count Breakdown
| Namespace | Base Fields | With Arrays | Total Expanded |
|-----------|------------|-------------|----------------|
| CDF Sections A-H | 8 | 56 lines | 448 fields |
| CDF Sections K-N | 4 | 46 lines | 138 fields |
| Borrowers | 25 | x4 | 100 fields |
| Sellers | 30 | x4 | 120 fields |
| Payoffs | 8 | x4 | 32 fields |
| Payees | 5 | x8 | 40 fields |
| Service Providers | 6 | x10 | 60 fields |
| Properties | 20 | x3 tax | 50 fields |
| Loans | 45 | x1 | 45 fields |
| Calculations | 20 | x1 | 20 fields |
| Metadata | 30 | x1 | 30 fields |
| **TOTAL** | **196** | **-** | **1,150+** |

This represents the complete schema needed to implement a Qualia-competitive real estate closing system.