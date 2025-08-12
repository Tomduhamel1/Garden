# UCD to Qualia Schema Mapping

## Overview
This document maps the federal Uniform Closing Dataset (UCD/MISMO) schema to Qualia's schema implementation. The UCD is the standard required by Fannie Mae/Freddie Mac for electronic loan delivery, while Qualia extends this for comprehensive title and escrow management.

## Data Type Mappings

| UCD Type | Qualia Type | Notes |
|----------|-------------|-------|
| MISMOAmount | number | Decimal with 2 precision |
| MISMODate | date | ISO 8601 format |
| MISMOString | string | Variable length text |
| MISMOBoolean | boolean | true/false |
| MISMOPercent | number | Decimal percentage |
| MISMOInteger | number | Whole number |
| MISMOEnum | string | Controlled vocabulary |

## 1. LOAN INFORMATION

### Basic Loan Terms

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| LOAN.LoanAmount | cdf.loans.0.initial_loan_amount | MISMOAmount | number | Principal loan amount |
| LOAN.InterestRate | cdf.loans.0.interest_rate | MISMOPercent | number | Note percentage |
| LOAN.LoanTermMonths | cdf.loans.0.loan_term_months | MISMOInteger | number | Total months |
| LOAN.LoanTermYears | cdf.loans.0.loan_term_years | MISMOInteger | number | Years component |
| LOAN.LoanNumber | cdf.loans.0.loan_number | MISMOString | string | Lender's loan ID |
| LOAN.LoanType | cdf.loans.0.loan_type | MISMOEnum | string | Conventional/FHA/VA/USDA |
| LOAN.LoanPurpose | cdf.loans.0.loan_purpose | MISMOEnum | string | Purchase/Refinance/Construction |
| LOAN.ProductType | cdf.loans.0.loan_product | MISMOEnum | string | Fixed/ARM/Other |

### Loan Features

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| LOAN.PrepaymentPenaltyIndicator | cdf.loans.0.has_prepayment_penalty | MISMOBoolean | boolean | Prepayment penalty flag |
| LOAN.BalloonIndicator | cdf.loans.0.has_balloon_payment | MISMOBoolean | boolean | Balloon payment flag |
| LOAN.InterestOnlyIndicator | cdf.loans.0.interest_only | MISMOBoolean | boolean | IO payment period |
| LOAN.NegativeAmortizationIndicator | cdf.loans.0.negative_amortization | MISMOBoolean | boolean | Neg-am feature |
| LOAN.ConstructionLoanIndicator | cdf.loans.0.is_construction_loan | MISMOBoolean | boolean | Construction loan flag |
| LOAN.HELOCIndicator | cdf.loans.0.is_heloc | MISMOBoolean | boolean | HELOC flag |

### Payment Information

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| LOAN.MonthlyPrincipalInterest | cdf.loans.0.monthly_principal_and_interest | MISMOAmount | number | P&I payment |
| LOAN.FirstPaymentDate | cdf.loans.0.first_payment_date | MISMODate | date | First payment due |
| LOAN.MaturityDate | cdf.loans.0.last_payment_date | MISMODate | date | Final payment date |
| LOAN.MortgageInsurancePremium | cdf.prepaid_item_information.line_02.paid_by_borrower | MISMOAmount | number | MI premium |

## 2. PARTIES (CONTACTS)

### Borrower Information

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| BORROWER.FirstName | contacts.borrowers.0.first_name | MISMOString | string | Given name |
| BORROWER.MiddleName | contacts.borrowers.0.middle_name | MISMOString | string | Middle name |
| BORROWER.LastName | contacts.borrowers.0.last_name | MISMOString | string | Surname |
| BORROWER.NameSuffix | contacts.borrowers.0.suffix | MISMOString | string | Jr/Sr/III |
| BORROWER.SSN | contacts.borrowers.0.SSN | MISMOString | string | Tax ID |
| BORROWER.DateOfBirth | contacts.borrowers.0.date_of_birth | MISMODate | date | DOB |
| BORROWER.MaritalStatus | contacts.borrowers.0.marital_status | MISMOEnum | string | Single/Married/Divorced |
| BORROWER.Email | contacts.borrowers.0.email | MISMOString | string | Email address |
| BORROWER.Phone | contacts.borrowers.0.cell_phone | MISMOString | string | Primary phone |

### Borrower Address

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| BORROWER.AddressLine1 | contacts.borrowers.0.current_address.address_1 | MISMOString | string | Street address |
| BORROWER.AddressLine2 | contacts.borrowers.0.current_address.address_2 | MISMOString | string | Unit/Apt |
| BORROWER.City | contacts.borrowers.0.current_address.city | MISMOString | string | City |
| BORROWER.State | contacts.borrowers.0.current_address.state | MISMOString | string | State code |
| BORROWER.PostalCode | contacts.borrowers.0.current_address.zipcode | MISMOString | string | ZIP code |

### Seller Information

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| SELLER.FirstName | contacts.sellers.0.first_name | MISMOString | string | Given name |
| SELLER.LastName | contacts.sellers.0.last_name | MISMOString | string | Surname |
| SELLER.EntityName | contacts.sellers.0.company_name | MISMOString | string | Company/Trust name |
| SELLER.OwnershipPercent | contacts.sellers.0.ownership_percentage | MISMOPercent | number | Ownership share |

### Lender Information

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| LENDER.Name | contacts.lenders.0.company_name | MISMOString | string | Lender name |
| LENDER.NMLSIdentifier | contacts.lenders.0.nmls_id | MISMOString | string | NMLS number |
| LENDER.ContactName | contacts.lenders.0.loan_officer_name | MISMOString | string | LO name |
| LENDER.Email | contacts.lenders.0.email | MISMOString | string | Contact email |
| LENDER.Phone | contacts.lenders.0.phone | MISMOString | string | Contact phone |

## 3. PROPERTY INFORMATION

### Property Address

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| PROPERTY.AddressLine1 | properties.0.address_line_1 | MISMOString | string | Street address |
| PROPERTY.AddressLine2 | properties.0.address_line_2 | MISMOString | string | Unit number |
| PROPERTY.City | properties.0.address_city | MISMOString | string | City |
| PROPERTY.County | properties.0.address_county | MISMOString | string | County |
| PROPERTY.State | properties.0.address_state | MISMOString | string | State code |
| PROPERTY.PostalCode | properties.0.address_zip | MISMOString | string | ZIP code |

### Property Details

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| PROPERTY.LegalDescription | properties.0.legal_description | MISMOString | string | Legal description |
| PROPERTY.APN | properties.0.apn | MISMOString | string | Assessor parcel number |
| PROPERTY.SalePrice | purchase_price | MISMOAmount | number | Contract price |

### Property Taxes

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| PROPERTY.AnnualTaxAmount | properties.0.tax_information.annual_amount | MISMOAmount | number | Annual property tax |
| PROPERTY.TaxProrationDate | properties.0.tax_information.proration.through_date | MISMODate | date | Tax proration date |
| PROPERTY.TaxProrationAmount | properties.0.tax_information.proration.credit_buyer | MISMOAmount | number | Prorated amount |

## 4. CLOSING COSTS (SECTIONS A-H)

### Section A - Origination Charges

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| FEE.LoanOriginationFee | cdf.origination_charges.line_01.paid_by_borrower | MISMOAmount | number | Origination fee |
| FEE.LoanDiscountPoints | cdf.origination_charges.line_02.paid_by_borrower | MISMOAmount | number | Discount points |
| FEE.ProcessingFee | cdf.origination_charges.line_03.paid_by_borrower | MISMOAmount | number | Processing fee |
| FEE.UnderwritingFee | cdf.origination_charges.line_04.paid_by_borrower | MISMOAmount | number | Underwriting fee |
| FEE.ApplicationFee | cdf.origination_charges.line_05.paid_by_borrower | MISMOAmount | number | Application fee |

### Section B - Services You Cannot Shop For

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| FEE.AppraisalFee | cdf.services_borrower_did_not_shop_for.line_01.paid_by_borrower | MISMOAmount | number | Appraisal |
| FEE.CreditReportFee | cdf.services_borrower_did_not_shop_for.line_02.paid_by_borrower | MISMOAmount | number | Credit report |
| FEE.FloodCertification | cdf.services_borrower_did_not_shop_for.line_03.paid_by_borrower | MISMOAmount | number | Flood cert |
| FEE.TaxServiceFee | cdf.services_borrower_did_not_shop_for.line_04.paid_by_borrower | MISMOAmount | number | Tax service |

### Section C - Services You Can Shop For

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| FEE.TitleSearchFee | cdf.services_borrower_did_shop_for.line_01.paid_by_borrower | MISMOAmount | number | Title search |
| FEE.TitleExaminationFee | cdf.services_borrower_did_shop_for.line_02.paid_by_borrower | MISMOAmount | number | Title exam |
| FEE.TitleLendersCoveragePremium | cdf.services_borrower_did_shop_for.line_03.paid_by_borrower | MISMOAmount | number | Lender's title |
| FEE.TitleOwnersCoveragePremium | cdf.services_borrower_did_shop_for.line_04.paid_by_borrower | MISMOAmount | number | Owner's title |
| FEE.SettlementFee | cdf.services_borrower_did_shop_for.line_05.paid_by_borrower | MISMOAmount | number | Settlement/closing |
| FEE.SurveyFee | cdf.services_borrower_did_shop_for.line_06.paid_by_borrower | MISMOAmount | number | Survey |
| FEE.PestInspectionFee | cdf.services_borrower_did_shop_for.line_07.paid_by_borrower | MISMOAmount | number | Pest inspection |

### Section E - Taxes and Government Fees

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| FEE.RecordingFeeForDeed | cdf.taxes_and_government_fees.line_01.paid_by_borrower | MISMOAmount | number | Deed recording |
| FEE.RecordingFeeForMortgage | cdf.taxes_and_government_fees.line_02.paid_by_borrower | MISMOAmount | number | Mortgage recording |
| FEE.TransferTax | cdf.taxes_and_government_fees.line_03.paid_by_seller | MISMOAmount | number | Transfer tax |
| FEE.StateStampTax | cdf.taxes_and_government_fees.line_04.paid_by_seller | MISMOAmount | number | State stamps |
| FEE.CountyStampTax | cdf.taxes_and_government_fees.line_05.paid_by_seller | MISMOAmount | number | County stamps |

### Section F - Prepaids

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| PREPAID.HomeownersInsurance | cdf.prepaid_item_information.line_01.paid_by_borrower | MISMOAmount | number | Hazard insurance |
| PREPAID.MortgageInsurance | cdf.prepaid_item_information.line_02.paid_by_borrower | MISMOAmount | number | MI premium |
| PREPAID.PrepaidInterest | cdf.prepaid_item_information.line_03.paid_by_borrower | MISMOAmount | number | Interest |
| PREPAID.PropertyTax | cdf.prepaid_item_information.line_04.paid_by_borrower | MISMOAmount | number | Property taxes |

### Section G - Initial Escrow

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| ESCROW.HomeownersInsurance | cdf.escrow_information.line_01.paid_by_borrower | MISMOAmount | number | Insurance escrow |
| ESCROW.MortgageInsurance | cdf.escrow_information.line_02.paid_by_borrower | MISMOAmount | number | MI escrow |
| ESCROW.PropertyTax | cdf.escrow_information.line_03.paid_by_borrower | MISMOAmount | number | Tax escrow |
| ESCROW.HOADues | cdf.escrow_information.line_04.paid_by_borrower | MISMOAmount | number | HOA escrow |

### Section H - Other

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| FEE.HomeWarrantyFee | cdf.other_charges.line_01.paid_by_seller | MISMOAmount | number | Home warranty |
| FEE.RealEstateCommission | cdf.other_charges.line_02.paid_by_seller | MISMOAmount | number | Commission |
| FEE.HomeInspectionFee | cdf.other_charges.line_03.paid_by_borrower | MISMOAmount | number | Inspection |

## 5. CASH TO CLOSE

### Closing Calculations

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| CLOSING.TotalClosingCosts | cdf.purchase_cash_to_close.total_closing_costs.for_borrower | MISMOAmount | number | Total costs |
| CLOSING.ClosingCostsFinanced | cdf.purchase_cash_to_close.closing_costs_financed | MISMOAmount | number | Financed costs |
| CLOSING.DownPayment | cdf.purchase_cash_to_close.down_payment_from_borrower.amount | MISMOAmount | number | Down payment |
| CLOSING.EarnestMoneyDeposit | cdf.purchase_cash_to_close.deposit.earnest_money | MISMOAmount | number | EMD |
| CLOSING.SellerCredits | cdf.purchase_cash_to_close.seller_credits.amount | MISMOAmount | number | Seller credits |
| CLOSING.LenderCredits | cdf.total_closing_costs.lender_credits.borrower_amount | MISMOAmount | number | Lender credits |
| CLOSING.CashToClose | cdf.purchase_cash_to_close.cash_to_close.from_borrower | MISMOAmount | number | Final amount |

## 6. LOAN CALCULATIONS

### TRID Calculations

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| CALCULATION.TotalOfPayments | cdf.loan_calculations.total_of_payments | MISMOAmount | number | Total payments |
| CALCULATION.FinanceCharge | cdf.loan_calculations.finance_charge | MISMOAmount | number | Finance charge |
| CALCULATION.AmountFinanced | cdf.loan_calculations.amount_financed | MISMOAmount | number | Amount financed |
| CALCULATION.APR | cdf.loan_calculations.annual_percentage_rate | MISMOPercent | number | APR |
| CALCULATION.TIP | cdf.loan_calculations.total_interest_percentage | MISMOPercent | number | TIP |

## 7. PAYOFFS

### Existing Liens

| UCD Field | Qualia Field | UCD Type | Qualia Type | Notes |
|-----------|--------------|----------|-------------|-------|
| PAYOFF.LenderName | payoffs.0.lender_name | MISMOString | string | Payoff lender |
| PAYOFF.LoanNumber | payoffs.0.loan_number | MISMOString | string | Account number |
| PAYOFF.PayoffAmount | payoffs.0.payoff_amount | MISMOAmount | number | Payoff amount |
| PAYOFF.GoodThroughDate | payoffs.0.good_through_date | MISMODate | date | Expiration |

## 8. KEY DIFFERENCES

### Fields in UCD but not in Qualia

| UCD Field | Description | Reason |
|-----------|-------------|--------|
| LOAN.MERSIndicator | MERS registration | Qualia uses is_MERS |
| LOAN.QualifiedMortgageIndicator | QM status | Regulatory field |
| LOAN.ATRQMExemptionCode | ATR/QM exemption | Compliance field |
| CLOSING.IntegratedDisclosureDate | TRID timing | Regulatory tracking |

### Fields in Qualia but not in UCD

| Qualia Field | Description | Reason |
|--------------|-------------|--------|
| earnest_held_by | EMD holder | Title-specific |
| listing_commission_* | Commission details | Title/escrow feature |
| wire_info.* | Wire instructions | Settlement feature |
| check_info.* | Check details | Settlement feature |
| contacts.*_payees | Payment recipients | Extended settlement |

## 9. DATA TYPE CONVERSIONS

### Date Handling
- **UCD**: ISO 8601 format (YYYY-MM-DD)
- **Qualia**: JavaScript Date or string format
- **Conversion**: Direct mapping, ensure timezone handling

### Amount Handling
- **UCD**: Decimal with up to 2 decimal places
- **Qualia**: JavaScript number
- **Conversion**: Parse to float, round to 2 decimals

### Boolean Handling
- **UCD**: true/false strings or 1/0
- **Qualia**: JavaScript boolean
- **Conversion**: Parse string to boolean

### Enumeration Handling
- **UCD**: Controlled vocabulary from MISMO
- **Qualia**: String values, may differ
- **Conversion**: Mapping table required

## 10. IMPLEMENTATION NOTES

### Validation Requirements
1. **UCD Compliance**: All UCD fields must validate against MISMO schema
2. **TRID Requirements**: Sections A-N must balance and calculate correctly
3. **Data Integrity**: Cross-field validations (e.g., loan amount vs. cash to close)

### Calculation Dependencies
1. **Section Totals**: Each section must sum correctly
2. **Cash to Close**: Must reconcile all debits and credits
3. **APR/TIP**: Must be calculated per TRID requirements

### Extension Points
1. **Qualia Extensions**: Additional fields for title/escrow operations
2. **State Requirements**: State-specific taxes and fees
3. **Custom Fields**: User-defined fields for special cases

### Integration Considerations
1. **Import/Export**: Bidirectional data flow between systems
2. **Validation**: Schema validation before submission
3. **Versioning**: Handle UCD version differences (currently v2.0)
4. **Error Handling**: Graceful degradation for missing fields