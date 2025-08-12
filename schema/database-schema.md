# Garden Real Estate Closing Software - Database Schema

## Overview
This document outlines the database schema for Garden, a comprehensive real estate closing management system (Qualia clone). The schema supports all aspects of real estate transactions from initial order creation through final closing and document generation.

## Core Entities

### 1. Orders (Real Estate Transactions)
The central entity representing a real estate transaction.

```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    transaction_type VARCHAR(20) NOT NULL, -- 'purchase', 'refinance', 'sale'
    closing_date DATE,
    disbursement_date DATE,
    settlement_date DATE,
    
    -- Property Information
    property_address TEXT,
    property_city VARCHAR(100),
    property_state VARCHAR(2),
    property_zip VARCHAR(10),
    property_county VARCHAR(100),
    sale_price DECIMAL(15,2),
    
    -- Settlement Agent Information
    settlement_agent_id UUID REFERENCES users(id),
    settlement_location TEXT,
    escrow_officer_id UUID REFERENCES users(id),
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);
```

### 2. Contacts (People and Entities)
All people and organizations involved in transactions.

```sql
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_type VARCHAR(20) NOT NULL, -- 'person', 'company'
    role VARCHAR(50), -- 'borrower', 'seller', 'buyer', 'agent', 'lender', 'attorney', etc.
    
    -- Person fields
    first_name VARCHAR(100),
    middle_name VARCHAR(100),
    last_name VARCHAR(100),
    suffix VARCHAR(20),
    
    -- Company fields
    company_name VARCHAR(255),
    
    -- Contact information
    email VARCHAR(255),
    phone VARCHAR(20),
    mobile_phone VARCHAR(20),
    fax VARCHAR(20),
    
    -- Address
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(2),
    zip VARCHAR(10),
    
    -- Additional fields
    ssn_tax_id VARCHAR(20),
    date_of_birth DATE,
    marital_status VARCHAR(20),
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Order Contacts (Junction Table)
Links contacts to specific orders with their roles.

```sql
CREATE TABLE order_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES contacts(id),
    role VARCHAR(50) NOT NULL, -- 'borrower', 'co_borrower', 'seller', 'buyer', 'listing_agent', etc.
    is_primary BOOLEAN DEFAULT FALSE,
    percentage_ownership DECIMAL(5,2), -- for multiple borrowers/sellers
    
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(order_id, contact_id, role)
);
```

### 4. Loans
Loan information for purchase/refinance transactions.

```sql
CREATE TABLE loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    lender_id UUID REFERENCES contacts(id),
    
    -- Basic loan information
    loan_number VARCHAR(100),
    loan_amount DECIMAL(15,2),
    interest_rate DECIMAL(8,5),
    loan_term_years INTEGER,
    loan_term_months INTEGER,
    loan_type VARCHAR(50), -- 'conventional', 'fha', 'va', 'usda', etc.
    loan_purpose VARCHAR(20), -- 'purchase', 'refinance'
    
    -- Loan features
    is_adjustable_rate BOOLEAN DEFAULT FALSE,
    has_prepayment_penalty BOOLEAN DEFAULT FALSE,
    has_balloon_payment BOOLEAN DEFAULT FALSE,
    balloon_amount DECIMAL(15,2),
    balloon_due_year INTEGER,
    
    -- Monthly payment information
    principal_interest_payment DECIMAL(10,2),
    mortgage_insurance_payment DECIMAL(10,2),
    escrow_payment DECIMAL(10,2),
    total_monthly_payment DECIMAL(10,2),
    
    -- Closing cost information
    total_loan_costs DECIMAL(15,2),
    lender_credits DECIMAL(15,2),
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Charges (Line Items)
All financial charges, credits, and line items for the transaction.

```sql
CREATE TABLE charges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    
    -- Basic charge information
    description TEXT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    charge_type VARCHAR(50) NOT NULL, -- 'debit', 'credit'
    
    -- Categorization
    category VARCHAR(100), -- 'loan_charges', 'title_charges', 'government_fees', etc.
    subcategory VARCHAR(100), -- 'origination', 'services_shopped', 'taxes', etc.
    line_number VARCHAR(10), -- For TRID compliance (A01, B02, etc.)
    
    -- Payer/Payee information
    paid_by VARCHAR(20), -- 'borrower', 'seller', 'lender', 'other'
    paid_to_id UUID REFERENCES contacts(id),
    
    -- When paid
    paid_at_closing BOOLEAN DEFAULT TRUE,
    paid_before_closing BOOLEAN DEFAULT FALSE,
    payment_date DATE,
    
    -- HUD/TRID specific fields
    hud_line VARCHAR(10),
    trid_section VARCHAR(10),
    poc_amount DECIMAL(15,2), -- Paid Outside Closing
    
    -- Status and metadata
    is_required BOOLEAN DEFAULT FALSE,
    is_estimate BOOLEAN DEFAULT TRUE,
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);
```

### 6. Prorations
Prorated expenses and adjustments.

```sql
CREATE TABLE prorations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    
    -- Proration details
    description TEXT NOT NULL,
    proration_type VARCHAR(50), -- 'taxes', 'insurance', 'hoa', 'utilities', etc.
    
    -- Date ranges
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    closing_date DATE NOT NULL,
    
    -- Amounts
    annual_amount DECIMAL(15,2),
    daily_amount DECIMAL(15,2),
    total_days INTEGER,
    prorated_days INTEGER,
    prorated_amount DECIMAL(15,2),
    
    -- Who owes/receives
    debited_party VARCHAR(20), -- 'borrower', 'seller'
    credited_party VARCHAR(20), -- 'borrower', 'seller'
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 7. Documents
Document management for the transaction.

```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    
    -- Document information
    name VARCHAR(255) NOT NULL,
    document_type VARCHAR(100), -- 'closing_disclosure', 'settlement_statement', 'deed', etc.
    category VARCHAR(50), -- 'closing_docs', 'loan_docs', 'title_docs', etc.
    
    -- File information
    file_name VARCHAR(255),
    file_size BIGINT,
    mime_type VARCHAR(100),
    file_path TEXT,
    file_url TEXT,
    
    -- Document status
    status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'pending', 'signed', 'recorded'
    version INTEGER DEFAULT 1,
    is_final BOOLEAN DEFAULT FALSE,
    
    -- Signatures
    requires_signature BOOLEAN DEFAULT FALSE,
    signature_type VARCHAR(20), -- 'wet', 'electronic', 'notarized'
    signed_date TIMESTAMP,
    signed_by UUID REFERENCES contacts(id),
    
    -- Metadata
    generated_at TIMESTAMP,
    generated_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 8. Tasks
Task management for the closing process.

```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    
    -- Task information
    title VARCHAR(255) NOT NULL,
    description TEXT,
    task_type VARCHAR(50), -- 'document', 'approval', 'funding', 'recording', etc.
    priority VARCHAR(10) DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    
    -- Assignment
    assigned_to UUID REFERENCES users(id),
    assigned_by UUID REFERENCES users(id),
    
    -- Dates
    due_date DATE,
    completed_date TIMESTAMP,
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'cancelled'
    
    -- Dependencies
    depends_on_task_id UUID REFERENCES tasks(id),
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 9. Notes
Notes and comments on orders.

```sql
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    
    -- Note content
    content TEXT NOT NULL,
    note_type VARCHAR(50) DEFAULT 'general', -- 'general', 'important', 'private', 'system'
    
    -- Association
    related_entity_type VARCHAR(50), -- 'order', 'contact', 'document', 'task'
    related_entity_id UUID,
    
    -- Visibility
    is_private BOOLEAN DEFAULT FALSE,
    visible_to_borrower BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by UUID REFERENCES users(id)
);
```

### 10. Users
System users (title agents, processors, etc.).

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Authentication
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    
    -- Profile information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    
    -- Role and permissions
    role VARCHAR(50) NOT NULL, -- 'admin', 'processor', 'closer', 'assistant'
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Company information
    company_name VARCHAR(255),
    license_number VARCHAR(100),
    
    -- Settings
    timezone VARCHAR(50) DEFAULT 'UTC',
    email_notifications BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 11. Escrow Accounting
Detailed accounting for escrow transactions.

```sql
CREATE TABLE escrow_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    
    -- Transaction details
    transaction_type VARCHAR(20) NOT NULL, -- 'receipt', 'disbursement'
    description TEXT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    
    -- Payment information
    payment_method VARCHAR(50), -- 'wire', 'check', 'ach', 'cash'
    check_number VARCHAR(50),
    wire_reference VARCHAR(100),
    
    -- Parties
    from_party_id UUID REFERENCES contacts(id),
    to_party_id UUID REFERENCES contacts(id),
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'cleared', 'returned'
    cleared_date DATE,
    
    -- Trust account
    trust_account VARCHAR(100),
    bank_reference VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);
```

### 12. TRID/Closing Disclosure Data
Specific data structure for TRID compliance.

```sql
CREATE TABLE closing_disclosure_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    loan_id UUID REFERENCES loans(id),
    
    -- Loan terms
    loan_amount DECIMAL(15,2),
    interest_rate DECIMAL(8,5),
    monthly_payment DECIMAL(10,2),
    can_loan_amount_increase BOOLEAN,
    can_interest_rate_increase BOOLEAN,
    can_payment_increase BOOLEAN,
    
    -- Projected payments
    year_1_payment DECIMAL(10,2),
    year_1_principal_interest DECIMAL(10,2),
    year_1_mortgage_insurance DECIMAL(10,2),
    year_1_escrow DECIMAL(10,2),
    
    -- Costs at closing
    total_closing_costs DECIMAL(15,2),
    total_loan_costs DECIMAL(15,2),
    total_other_costs DECIMAL(15,2),
    total_lender_credits DECIMAL(15,2),
    cash_to_close DECIMAL(15,2),
    
    -- Calculations
    total_of_payments DECIMAL(15,2),
    finance_charge DECIMAL(15,2),
    amount_financed DECIMAL(15,2),
    apr DECIMAL(8,5),
    tip DECIMAL(8,5), -- Total Interest Percentage
    
    -- Version and status
    version INTEGER DEFAULT 1,
    is_final BOOLEAN DEFAULT FALSE,
    issued_date DATE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## Indexes and Performance

```sql
-- Order indexes
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_closing_date ON orders(closing_date);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Contact indexes
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_name ON contacts(last_name, first_name);
CREATE INDEX idx_contacts_company ON contacts(company_name);

-- Charge indexes
CREATE INDEX idx_charges_order_id ON charges(order_id);
CREATE INDEX idx_charges_category ON charges(category);
CREATE INDEX idx_charges_paid_by ON charges(paid_by);

-- Document indexes
CREATE INDEX idx_documents_order_id ON documents(order_id);
CREATE INDEX idx_documents_type ON documents(document_type);
CREATE INDEX idx_documents_status ON documents(status);

-- Task indexes
CREATE INDEX idx_tasks_order_id ON tasks(order_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
```

## Data Relationships Summary

1. **Orders** are the central entity, linked to all other entities
2. **Contacts** can have multiple roles across different orders
3. **Charges** represent all financial line items with proper categorization
4. **Loans** contain detailed loan information for TRID compliance
5. **Documents** track all paperwork with version control and signatures
6. **Tasks** manage the workflow and deadlines
7. **Escrow Transactions** provide detailed accounting records
8. **Closing Disclosure Data** stores TRID-specific calculated fields

This schema supports the full real estate closing workflow from initial order entry through final document generation and recording.