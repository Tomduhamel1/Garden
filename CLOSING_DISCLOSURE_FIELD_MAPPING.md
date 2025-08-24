# Closing Disclosure Complete Field Mapping

## Overview
This document maps every UCD-required field for TRID Closing Disclosure compliance to our schema implementation.

**Total Required Fields**: ~600+ fields
**Current Implementation**: To be audited

## Page 1: Loan Terms & Projected Payments

### Loan Information
| UCD Field | Schema Path | Status | Component |
|-----------|-------------|--------|-----------|
| Loan Amount | `cdf.loans.0.initial_loan_amount` | ✅ | Loan.tsx |
| Interest Rate | `cdf.loans.0.interest_rate` | ✅ | Loan.tsx |
| Monthly Payment | `cdf.loans.0.monthly_principal_and_interest` | ❓ | Loan.tsx |
| Loan Term | `cdf.loans.0.loan_term_years` | ✅ | Loan.tsx |

### TRID Calculations (Required on CD)
| UCD Field | Schema Path | Status | Component |
|-----------|-------------|--------|-----------|
| `CALCULATION.TotalOfPayments` | `cdf.loan_calculations.total_of_payments` | ❓ | LoanCalculations.tsx |
| `CALCULATION.FinanceCharge` | `cdf.loan_calculations.finance_charge` | ❓ | LoanCalculations.tsx |
| `CALCULATION.AmountFinanced` | `cdf.loan_calculations.amount_financed` | ❓ | LoanCalculations.tsx |
| `CALCULATION.APR` | `cdf.loan_calculations.annual_percentage_rate` | ❓ | LoanCalculations.tsx |
| `CALCULATION.TIP` | `cdf.loan_calculations.total_interest_percentage` | ❓ | LoanCalculations.tsx |

## Page 2: Closing Cost Details

### Section A - Origination Charges (7 lines × 8 fields = 56 fields)
| Line | UCD Example | Schema Path | Status |
|------|-------------|-------------|--------|
| A.01 | `FEE.LoanOriginationFee` | `cdf.origination_charges.line_01.*` | ❓ |
| A.02 | `FEE.LoanDiscountPoints` | `cdf.origination_charges.line_02.*` | ❓ |
| A.03 | `FEE.ProcessingFee` | `cdf.origination_charges.line_03.*` | ❓ |
| A.04 | `FEE.UnderwritingFee` | `cdf.origination_charges.line_04.*` | ❓ |
| A.05 | `FEE.ApplicationFee` | `cdf.origination_charges.line_05.*` | ❓ |
| A.06 | `FEE.RateLockFee` | `cdf.origination_charges.line_06.*` | ❓ |
| A.07 | `FEE.AdministrationFee` | `cdf.origination_charges.line_07.*` | ❓ |

**Fields per line**: description, paid_by_borrower, paid_by_seller, paid_by_others, paid_before_closing, payee_name, is_optional, not_required

### Section B - Services Borrower Did NOT Shop For (5 lines × 8 fields = 40 fields)
| Line | UCD Example | Schema Path | Status |
|------|-------------|-------------|--------|
| B.01 | `FEE.AppraisalFee` | `cdf.services_borrower_did_not_shop_for.line_01.*` | ❓ |
| B.02 | `FEE.CreditReportFee` | `cdf.services_borrower_did_not_shop_for.line_02.*` | ❓ |
| B.03 | `FEE.FloodCertification` | `cdf.services_borrower_did_not_shop_for.line_03.*` | ❓ |
| B.04 | `FEE.TaxServiceFee` | `cdf.services_borrower_did_not_shop_for.line_04.*` | ❓ |
| B.05 | `FEE.FloodMonitoringFee` | `cdf.services_borrower_did_not_shop_for.line_05.*` | ❓ |

### Section C - Services Borrower DID Shop For (8 lines × 8 fields = 64 fields)
| Line | UCD Example | Schema Path | Status |
|------|-------------|-------------|--------|
| C.01 | `FEE.TitleSearchFee` | `cdf.services_borrower_did_shop_for.line_01.*` | ❓ |
| C.02 | `FEE.TitleExaminationFee` | `cdf.services_borrower_did_shop_for.line_02.*` | ❓ |
| C.03 | `FEE.TitleLendersCoveragePremium` | `cdf.services_borrower_did_shop_for.line_03.*` | ❓ |
| C.04 | `FEE.TitleOwnersCoveragePremium` | `cdf.services_borrower_did_shop_for.line_04.*` | ❓ |
| C.05 | `FEE.SettlementFee` | `cdf.services_borrower_did_shop_for.line_05.*` | ❓ |
| C.06 | `FEE.EscrowServiceFee` | `cdf.services_borrower_did_shop_for.line_06.*` | ❓ |
| C.07 | `FEE.SurveyFee` | `cdf.services_borrower_did_shop_for.line_07.*` | ❓ |
| C.08 | `FEE.PestInspectionFee` | `cdf.services_borrower_did_shop_for.line_08.*` | ❓ |

## Page 3: Other Costs

### Section E - Taxes and Government Fees (6 lines × 8 fields = 48 fields)
| Line | UCD Example | Schema Path | Status |
|------|-------------|-------------|--------|
| E.01 | `FEE.RecordingFeeForDeed` | `cdf.taxes_and_government_fees.line_01.*` | ❓ |
| E.02 | `FEE.RecordingFeeForMortgage` | `cdf.taxes_and_government_fees.line_02.*` | ❓ |
| E.03 | `FEE.TransferTax` | `cdf.taxes_and_government_fees.line_03.*` | ❓ |
| E.04 | `FEE.StateStampTax` | `cdf.taxes_and_government_fees.line_04.*` | ❓ |
| E.05 | `FEE.CountyStampTax` | `cdf.taxes_and_government_fees.line_05.*` | ❓ |
| E.06 | `FEE.CityStampTax` | `cdf.taxes_and_government_fees.line_06.*` | ❓ |

### Section F - Prepaids (5 lines × 8 fields = 40 fields)
| Line | UCD Example | Schema Path | Status |
|------|-------------|-------------|--------|
| F.01 | `PREPAID.HomeownersInsurance` | `cdf.prepaid_item_information.line_01.*` | ❓ |
| F.02 | `PREPAID.MortgageInsurance` | `cdf.prepaid_item_information.line_02.*` | ❓ |
| F.03 | `PREPAID.PrepaidInterest` | `cdf.prepaid_item_information.line_03.*` | ❓ |
| F.04 | `PREPAID.PropertyTax` | `cdf.prepaid_item_information.line_04.*` | ❓ |
| F.05 | `PREPAID.HOADues` | `cdf.prepaid_item_information.line_05.*` | ❓ |

### Section G - Initial Escrow Payment (7 lines × 8 fields = 56 fields)
| Line | UCD Example | Schema Path | Status |
|------|-------------|-------------|--------|
| G.01 | `ESCROW.HomeownersInsurance` | `cdf.escrow_information.line_01.*` | ❓ |
| G.02 | `ESCROW.MortgageInsurance` | `cdf.escrow_information.line_02.*` | ❓ |
| G.03 | `ESCROW.PropertyTax` | `cdf.escrow_information.line_03.*` | ❓ |
| G.04 | `ESCROW.HOADues` | `cdf.escrow_information.line_04.*` | ❓ |
| G.05 | `ESCROW.FloodInsurance` | `cdf.escrow_information.line_05.*` | ❓ |
| G.06 | `ESCROW.OtherEscrow1` | `cdf.escrow_information.line_06.*` | ❓ |
| G.07 | `ESCROW.AggregateAdjustment` | `cdf.escrow_information.line_07.*` | ❓ |

### Section H - Other (5 lines × 8 fields = 40 fields)
| Line | UCD Example | Schema Path | Status |
|------|-------------|-------------|--------|
| H.01 | `FEE.HomeWarrantyFee` | `cdf.other_charges.line_01.*` | ❓ |
| H.02 | `FEE.RealEstateCommission` | `cdf.other_charges.line_02.*` | ❓ |
| H.03 | `FEE.HomeInspectionFee` | `cdf.other_charges.line_03.*` | ❓ |
| H.04 | `FEE.AttorneyFee` | `cdf.other_charges.line_04.*` | ❓ |
| H.05 | `FEE.CourierFee` | `cdf.other_charges.line_05.*` | ❓ |

## Page 4: Calculating Cash to Close

### Section J - Total Closing Costs (2 fields)
| UCD Field | Schema Path | Status |
|-----------|-------------|--------|
| `CLOSING.LenderCredits` | `cdf.total_closing_costs.lender_credits.borrower_amount` | ❓ |
| `CLOSING.SellerCredits` | `cdf.total_closing_costs.lender_credits.seller_amount` | ❓ |

### Section K - Borrower Credits (5 lines × 3 fields = 15 fields)
| Line | UCD Example | Schema Path | Status |
|------|-------------|-------------|--------|
| K.01 | `CREDIT.SaleContractCredit` | `cdf.borrower_credit_information.line_01.*` | ❓ |
| K.02 | `CREDIT.PersonalPropertyCredit` | `cdf.borrower_credit_information.line_02.*` | ❓ |
| K.03 | `CREDIT.ClosingCostsCredit` | `cdf.borrower_credit_information.line_03.*` | ❓ |
| K.04 | `CREDIT.SellerCreditAmount` | `cdf.borrower_credit_information.line_04.*` | ❓ |
| K.05 | `CREDIT.AdjustmentsCredit` | `cdf.borrower_credit_information.line_05.*` | ❓ |

### Section L - Borrower Debits (4 lines × 3 fields = 12 fields)
| Line | UCD Example | Schema Path | Status |
|------|-------------|-------------|--------|
| L.01 | `DEBIT.SaleContractDebit` | `cdf.borrower_debit_information.line_01.*` | ❓ |
| L.02 | `DEBIT.ClosingCostsDebit` | `cdf.borrower_debit_information.line_02.*` | ❓ |
| L.03 | `DEBIT.ExistingLoanPayoff` | `cdf.borrower_debit_information.line_03.*` | ❓ |
| L.04 | `DEBIT.PayoffSecondMortgage` | `cdf.borrower_debit_information.line_04.*` | ❓ |

### Section M - Seller Credits (5 lines × 3 fields = 15 fields)
| Line | UCD Example | Schema Path | Status |
|------|-------------|-------------|--------|
| M.01 | `CREDIT.SaleContractSellerCredit` | `cdf.seller_credit_information.line_01.*` | ❓ |
| M.02 | `CREDIT.PersonalPropertySellerCredit` | `cdf.seller_credit_information.line_02.*` | ❓ |
| M.03 | `CREDIT.CityTaxCredit` | `cdf.seller_credit_information.line_03.*` | ❓ |
| M.04 | `CREDIT.CountyTaxCredit` | `cdf.seller_credit_information.line_04.*` | ❓ |
| M.05 | `CREDIT.AssessmentsCredit` | `cdf.seller_credit_information.line_05.*` | ❓ |

### Section N - Seller Debits (5 lines × 3 fields = 15 fields)
| Line | UCD Example | Schema Path | Status |
|------|-------------|-------------|--------|
| N.01 | `DEBIT.ExcessDepositDebit` | `cdf.seller_debit_information.line_01.*` | ❓ |
| N.02 | `DEBIT.ClosingCostsSellerDebit` | `cdf.seller_debit_information.line_02.*` | ❓ |
| N.03 | `DEBIT.ExistingLoanSellerPayoff` | `cdf.seller_debit_information.line_03.*` | ❓ |
| N.04 | `DEBIT.PayoffSecondSellerMortgage` | `cdf.seller_debit_information.line_04.*` | ❓ |
| N.05 | `DEBIT.SellerCreditDebit` | `cdf.seller_debit_information.line_05.*` | ❓ |

### Cash to Close Calculations (7 fields)
| UCD Field | Schema Path | Status |
|-----------|-------------|--------|
| `CLOSING.TotalClosingCosts` | `cdf.purchase_cash_to_close.total_closing_costs.for_borrower` | ❓ |
| `CLOSING.ClosingCostsFinanced` | `cdf.purchase_cash_to_close.closing_costs_financed` | ❓ |
| `CLOSING.DownPayment` | `cdf.purchase_cash_to_close.down_payment_from_borrower.amount` | ❓ |
| `CLOSING.EarnestMoneyDeposit` | `cdf.purchase_cash_to_close.deposit.earnest_money` | ❓ |
| `CLOSING.SellerCredits` | `cdf.purchase_cash_to_close.seller_credits.amount` | ❓ |
| `CLOSING.Adjustments` | `cdf.purchase_cash_to_close.adjustments_and_other_credits.amount` | ❓ |
| `CLOSING.CashToClose` | `cdf.purchase_cash_to_close.cash_to_close.from_borrower` | ❓ |

## Summary

### Total Field Count by Section
- **Section A (Origination)**: 56 fields (7 lines × 8 fields)
- **Section B (Cannot Shop)**: 40 fields (5 lines × 8 fields)
- **Section C (Can Shop)**: 64 fields (8 lines × 8 fields)
- **Section E (Government)**: 48 fields (6 lines × 8 fields)
- **Section F (Prepaids)**: 40 fields (5 lines × 8 fields)
- **Section G (Escrow)**: 56 fields (7 lines × 8 fields)
- **Section H (Other)**: 40 fields (5 lines × 8 fields)
- **Section J (Credits)**: 2 fields
- **Section K (Borrower Credits)**: 15 fields (5 lines × 3 fields)
- **Section L (Borrower Debits)**: 12 fields (4 lines × 3 fields)
- **Section M (Seller Credits)**: 15 fields (5 lines × 3 fields)
- **Section N (Seller Debits)**: 15 fields (5 lines × 3 fields)
- **Loan Calculations**: 5 fields
- **Cash to Close**: 7 fields
- **Loan Terms**: 20+ fields

**TOTAL ESTIMATED**: 500+ core fields required for Closing Disclosure

## Status Legend
- ✅ **Implemented & Working**
- ⚠️ **Partially Implemented** 
- ❓ **Unknown - Needs Audit**
- ❌ **Missing**

## Next Steps
1. Audit each component to determine current status
2. Update status in this document
3. Prioritize missing/broken fields
4. Make ClosingDisclosure.tsx fully editable