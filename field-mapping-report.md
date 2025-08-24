# Field Mapping Report

Generated: 2025-08-24T19:06:44.914Z

## Summary

- Total HTML files: 25
- Total fields: 983
- Fields needing correction: 870
- Correction rate: 89%

## Component-by-Component Analysis

### accounting
Fields: 15

*No corrections needed*

### cash-to-close
Fields: 32

**Corrections needed:**
- ❌ `cdf.purchase_cash_to_close.total_closing_costs.estimate`
  ✅ `cdfData.purchase_cash_to_close.total_closing_costs.estimate`
- ❌ `cdf.purchase_cash_to_close.total_closing_costs.final_amount`
  ✅ `cdfData.purchase_cash_to_close.total_closing_costs.final_amount`
- ❌ `cdf.purchase_cash_to_close.total_closing_costs.changed`
  ✅ `cdfData.purchase_cash_to_close.total_closing_costs.changed`
- ❌ `cdf.purchase_cash_to_close.total_closing_costs.change_description`
  ✅ `cdfData.purchase_cash_to_close.total_closing_costs.change_description`
- ❌ `cdf.purchase_cash_to_close.closing_costs_paid_before_closing.estimate`
  ✅ `cdfData.purchase_cash_to_close.closing_costs_paid_before_closing.estimate`
- ❌ `cdf.purchase_cash_to_close.closing_costs_paid_before_closing.final_amount`
  ✅ `cdfData.purchase_cash_to_close.closing_costs_paid_before_closing.final_amount`
- ❌ `cdf.purchase_cash_to_close.closing_costs_paid_before_closing.changed`
  ✅ `cdfData.purchase_cash_to_close.closing_costs_paid_before_closing.changed`
- ❌ `cdf.purchase_cash_to_close.closing_costs_paid_before_closing.change_description`
  ✅ `cdfData.purchase_cash_to_close.closing_costs_paid_before_closing.change_description`
- ❌ `cdf.purchase_cash_to_close.closing_costs_financed.estimate`
  ✅ `cdfData.purchase_cash_to_close.closing_costs_financed.estimate`
- ❌ `cdf.purchase_cash_to_close.closing_costs_financed.final_amount`
  ✅ `cdfData.purchase_cash_to_close.closing_costs_financed.final_amount`
- ❌ `cdf.purchase_cash_to_close.closing_costs_financed.changed`
  ✅ `cdfData.purchase_cash_to_close.closing_costs_financed.changed`
- ❌ `cdf.purchase_cash_to_close.closing_costs_financed.change_description`
  ✅ `cdfData.purchase_cash_to_close.closing_costs_financed.change_description`
- ❌ `cdf.purchase_cash_to_close.down_payment_from_borrower.estimate`
  ✅ `cdfData.purchase_cash_to_close.down_payment_from_borrower.estimate`
- ❌ `cdf.purchase_cash_to_close.down_payment_from_borrower.final_amount`
  ✅ `cdfData.purchase_cash_to_close.down_payment_from_borrower.final_amount`
- ❌ `cdf.purchase_cash_to_close.down_payment_from_borrower.changed`
  ✅ `cdfData.purchase_cash_to_close.down_payment_from_borrower.changed`
- ❌ `cdf.purchase_cash_to_close.down_payment_from_borrower.change_description`
  ✅ `cdfData.purchase_cash_to_close.down_payment_from_borrower.change_description`
- ❌ `cdf.purchase_cash_to_close.deposit.estimate`
  ✅ `cdfData.purchase_cash_to_close.deposit.estimate`
- ❌ `cdf.purchase_cash_to_close.deposit.final_amount`
  ✅ `cdfData.purchase_cash_to_close.deposit.final_amount`
- ❌ `cdf.purchase_cash_to_close.deposit.changed`
  ✅ `cdfData.purchase_cash_to_close.deposit.changed`
- ❌ `cdf.purchase_cash_to_close.deposit.change_description`
  ✅ `cdfData.purchase_cash_to_close.deposit.change_description`
- ❌ `cdf.purchase_cash_to_close.funds_for_borrower.estimate`
  ✅ `cdfData.purchase_cash_to_close.funds_for_borrower.estimate`
- ❌ `cdf.purchase_cash_to_close.funds_for_borrower.final_amount`
  ✅ `cdfData.purchase_cash_to_close.funds_for_borrower.final_amount`
- ❌ `cdf.purchase_cash_to_close.funds_for_borrower.changed`
  ✅ `cdfData.purchase_cash_to_close.funds_for_borrower.changed`
- ❌ `cdf.purchase_cash_to_close.funds_for_borrower.change_description`
  ✅ `cdfData.purchase_cash_to_close.funds_for_borrower.change_description`
- ❌ `cdf.purchase_cash_to_close.seller_credits.estimate`
  ✅ `cdfData.purchase_cash_to_close.seller_credits.estimate`
- ❌ `cdf.purchase_cash_to_close.seller_credits.final_amount`
  ✅ `cdfData.purchase_cash_to_close.seller_credits.final_amount`
- ❌ `cdf.purchase_cash_to_close.seller_credits.changed`
  ✅ `cdfData.purchase_cash_to_close.seller_credits.changed`
- ❌ `cdf.purchase_cash_to_close.seller_credits.change_description`
  ✅ `cdfData.purchase_cash_to_close.seller_credits.change_description`
- ❌ `cdf.purchase_cash_to_close.adjustments_and_other_credits.estimate`
  ✅ `cdfData.purchase_cash_to_close.adjustments_and_other_credits.estimate`
- ❌ `cdf.purchase_cash_to_close.adjustments_and_other_credits.final_amount`
  ✅ `cdfData.purchase_cash_to_close.adjustments_and_other_credits.final_amount`
- ❌ `cdf.purchase_cash_to_close.adjustments_and_other_credits.changed`
  ✅ `cdfData.purchase_cash_to_close.adjustments_and_other_credits.changed`
- ❌ `cdf.purchase_cash_to_close.adjustments_and_other_credits.change_description`
  ✅ `cdfData.purchase_cash_to_close.adjustments_and_other_credits.change_description`

### contacts-seller-info
Fields: 25

**Corrections needed:**
- ❌ `contacts.sellers.0.type`
  ✅ `contactsData.sellers.0.type`
- ❌ `contacts.sellers.0.first_name`
  ✅ `contactsData.sellers.0.first_name`
- ❌ `contacts.sellers.0.middle_name`
  ✅ `contactsData.sellers.0.middle_name`
- ❌ `contacts.sellers.0.last_name`
  ✅ `contactsData.sellers.0.last_name`
- ❌ `contacts.sellers.0.suffix`
  ✅ `contactsData.sellers.0.suffix`
- ❌ `contacts.sellers.0.gender`
  ✅ `contactsData.sellers.0.gender`
- ❌ `contacts.sellers.0.marital_status`
  ✅ `contactsData.sellers.0.marital_status`
- ❌ `contacts.sellers.0.SSN`
  ✅ `contactsData.sellers.0.SSN`
- ❌ `contacts.sellers.0.date_of_birth`
  ✅ `contactsData.sellers.0.date_of_birth`
- ❌ `contacts.sellers.0.email`
  ✅ `contactsData.sellers.0.email`
- ❌ `contacts.sellers.0.cell_phone`
  ✅ `contactsData.sellers.0.cell_phone`
- ❌ `contacts.sellers.0.home_phone`
  ✅ `contactsData.sellers.0.home_phone`
- ❌ `contacts.sellers.0.work_phone`
  ✅ `contactsData.sellers.0.work_phone`
- ❌ `contacts.sellers.0.fax`
  ✅ `contactsData.sellers.0.fax`
- ❌ `contacts.sellers.0.on_title`
  ✅ `contactsData.sellers.0.on_title`
- ❌ `contacts.sellers.0.ownership_percentage`
  ✅ `contactsData.sellers.0.ownership_percentage`
- ❌ `contacts.sellers.0.has_exchange`
  ✅ `contactsData.sellers.0.has_exchange`
- ❌ `contacts.sellers.0.power_of_attorney.has`
  ✅ `contactsData.sellers.0.power_of_attorney.has`
- ❌ `contacts.sellers.0.exempt_from_1099`
  ✅ `contactsData.sellers.0.exempt_from_1099`
- ❌ `contacts.sellers.0.foreign_entity`
  ✅ `contactsData.sellers.0.foreign_entity`
- ❌ `contacts.sellers.0.declines_to_provide_tin`
  ✅ `contactsData.sellers.0.declines_to_provide_tin`
- ❌ `contacts.sellers.0.gross_allocated_proceeds`
  ✅ `contactsData.sellers.0.gross_allocated_proceeds`
- ❌ `contacts.sellers.0.buyers_part_of_real_estate_tax`
  ✅ `contactsData.sellers.0.buyers_part_of_real_estate_tax`
- ❌ `contacts.sellers.0.name_control`
  ✅ `contactsData.sellers.0.name_control`

### contacts
Fields: 66

**Corrections needed:**
- ❌ `contacts.borrowers.0.first_name`
  ✅ `contactsData.borrowers.0.first_name`
- ❌ `contacts.borrowers.0.middle_name`
  ✅ `contactsData.borrowers.0.middle_name`
- ❌ `contacts.borrowers.0.last_name`
  ✅ `contactsData.borrowers.0.last_name`
- ❌ `contacts.borrowers.0.suffix`
  ✅ `contactsData.borrowers.0.suffix`
- ❌ `contacts.borrowers.0.gender`
  ✅ `contactsData.borrowers.0.gender`
- ❌ `contacts.borrowers.0.marital_status`
  ✅ `contactsData.borrowers.0.marital_status`
- ❌ `contacts.borrowers.0.SSN`
  ✅ `contactsData.borrowers.0.SSN`
- ❌ `contacts.borrowers.0.date_of_birth`
  ✅ `contactsData.borrowers.0.date_of_birth`
- ❌ `contacts.borrowers.0.email`
  ✅ `contactsData.borrowers.0.email`
- ❌ `contacts.borrowers.0.cell_phone`
  ✅ `contactsData.borrowers.0.cell_phone`
- ❌ `contacts.borrowers.0.home_phone`
  ✅ `contactsData.borrowers.0.home_phone`
- ❌ `contacts.borrowers.0.work_phone`
  ✅ `contactsData.borrowers.0.work_phone`
- ❌ `contacts.borrowers.0.fax`
  ✅ `contactsData.borrowers.0.fax`
- ❌ `contacts.borrowers.0.on_loan`
  ✅ `contactsData.borrowers.0.on_loan`
- ❌ `contacts.borrowers.0.on_title`
  ✅ `contactsData.borrowers.0.on_title`
- ❌ `contacts.borrowers.0.ownership_percentage`
  ✅ `contactsData.borrowers.0.ownership_percentage`
- ❌ `contacts.borrowers.0.has_exchange`
  ✅ `contactsData.borrowers.0.has_exchange`
- ❌ `contacts.borrowers.0.power_of_attorney.has`
  ✅ `contactsData.borrowers.0.power_of_attorney.has`
- ❌ `contacts.sellers.0.first_name`
  ✅ `contactsData.sellers.0.first_name`
- ❌ `contacts.sellers.0.middle_name`
  ✅ `contactsData.sellers.0.middle_name`
- ❌ `contacts.sellers.0.last_name`
  ✅ `contactsData.sellers.0.last_name`
- ❌ `contacts.sellers.0.suffix`
  ✅ `contactsData.sellers.0.suffix`
- ❌ `contacts.sellers.0.gender`
  ✅ `contactsData.sellers.0.gender`
- ❌ `contacts.sellers.0.marital_status`
  ✅ `contactsData.sellers.0.marital_status`
- ❌ `contacts.sellers.0.SSN`
  ✅ `contactsData.sellers.0.SSN`
- ❌ `contacts.sellers.0.date_of_birth`
  ✅ `contactsData.sellers.0.date_of_birth`
- ❌ `contacts.sellers.0.email`
  ✅ `contactsData.sellers.0.email`
- ❌ `contacts.sellers.0.cell_phone`
  ✅ `contactsData.sellers.0.cell_phone`
- ❌ `contacts.sellers.0.home_phone`
  ✅ `contactsData.sellers.0.home_phone`
- ❌ `contacts.sellers.0.work_phone`
  ✅ `contactsData.sellers.0.work_phone`
- ❌ `contacts.sellers.0.fax`
  ✅ `contactsData.sellers.0.fax`
- ❌ `contacts.sellers.0.on_title`
  ✅ `contactsData.sellers.0.on_title`
- ❌ `contacts.sellers.0.ownership_percentage`
  ✅ `contactsData.sellers.0.ownership_percentage`
- ❌ `contacts.sellers.0.has_exchange`
  ✅ `contactsData.sellers.0.has_exchange`
- ❌ `contacts.sellers.0.power_of_attorney.has`
  ✅ `contactsData.sellers.0.power_of_attorney.has`
- ❌ `contacts.sellers.0.exempt_from_1099`
  ✅ `contactsData.sellers.0.exempt_from_1099`
- ❌ `contacts.sellers.0.foreign_entity`
  ✅ `contactsData.sellers.0.foreign_entity`
- ❌ `contacts.sellers.0.declines_to_provide_tin`
  ✅ `contactsData.sellers.0.declines_to_provide_tin`
- ❌ `contacts.sellers.0.gross_allocated_proceeds`
  ✅ `contactsData.sellers.0.gross_allocated_proceeds`
- ❌ `contacts.sellers.0.buyers_part_of_real_estate_tax`
  ✅ `contactsData.sellers.0.buyers_part_of_real_estate_tax`
- ❌ `contacts.sellers.0.name_control`
  ✅ `contactsData.sellers.0.name_control`
- ❌ `contacts.sellers.0.current_address.same_as_property`
  ✅ `contactsData.sellers.0.current_address.same_as_property`
- ❌ `contacts.sellers.0.current_address.street`
  ✅ `contactsData.sellers.0.current_address.street`
- ❌ `contacts.sellers.0.current_address.unit`
  ✅ `contactsData.sellers.0.current_address.unit`
- ❌ `contacts.sellers.0.current_address.city`
  ✅ `contactsData.sellers.0.current_address.city`
- ❌ `contacts.sellers.0.current_address.state`
  ✅ `contactsData.sellers.0.current_address.state`
- ❌ `contacts.sellers.0.current_address.zipcode`
  ✅ `contactsData.sellers.0.current_address.zipcode`
- ❌ `contacts.sellers.0.forwarding_address.same_as_property`
  ✅ `contactsData.sellers.0.forwarding_address.same_as_property`
- ❌ `contacts.sellers.0.forwarding_address.same_as_current_address`
  ✅ `contactsData.sellers.0.forwarding_address.same_as_current_address`
- ❌ `contacts.sellers.0.forwarding_address.street`
  ✅ `contactsData.sellers.0.forwarding_address.street`
- ❌ `contacts.sellers.0.forwarding_address.unit`
  ✅ `contactsData.sellers.0.forwarding_address.unit`
- ❌ `contacts.sellers.0.forwarding_address.city`
  ✅ `contactsData.sellers.0.forwarding_address.city`
- ❌ `contacts.sellers.0.forwarding_address.state`
  ✅ `contactsData.sellers.0.forwarding_address.state`
- ❌ `contacts.sellers.0.forwarding_address.zipcode`
  ✅ `contactsData.sellers.0.forwarding_address.zipcode`
- ❌ `contacts.lenders.0.company_id`
  ✅ `contactsData.lenders.0.company_id`
- ❌ `contacts.mortgage_brokerages.0.company_id`
  ✅ `contactsData.mortgage_brokerages.0.company_id`
- ❌ `contacts.selling_agencies.0.company_id`
  ✅ `contactsData.selling_agencies.0.company_id`
- ❌ `contacts.listing_agencies.0.company_id`
  ✅ `contactsData.listing_agencies.0.company_id`
- ❌ `contacts.recording_offices.0.disclosed_payee`
  ✅ `contactsData.recording_offices.0.disclosed_payee`
- ❌ `contacts.title_companies.0.company_id`
  ✅ `contactsData.title_companies.0.company_id`
- ❌ `contacts.surveying_firms.0.company_id`
  ✅ `contactsData.surveying_firms.0.company_id`
- ❌ `contacts.other_contacts.0.company_type`
  ✅ `contactsData.other_contacts.0.company_type`

### dashboard
Fields: 32

**Corrections needed:**
- ❌ `properties.0.address_1`
  ✅ `propertiesData.0.address_1`
- ❌ `properties.0.address_2`
  ✅ `propertiesData.0.address_2`
- ❌ `properties.0.city`
  ✅ `propertiesData.0.city`
- ❌ `properties.0.county`
  ✅ `propertiesData.0.county`
- ❌ `properties.0.state`
  ✅ `propertiesData.0.state`
- ❌ `properties.0.zipcode`
  ✅ `propertiesData.0.zipcode`
- ❌ `contacts.borrowers.0.type`
  ✅ `contactsData.borrowers.0.type`
- ❌ `contacts.borrowers.0.first_name`
  ✅ `contactsData.borrowers.0.first_name`
- ❌ `contacts.borrowers.0.middle_name`
  ✅ `contactsData.borrowers.0.middle_name`
- ❌ `contacts.borrowers.0.suffix`
  ✅ `contactsData.borrowers.0.suffix`
- ❌ `contacts.borrowers.0.last_name`
  ✅ `contactsData.borrowers.0.last_name`
- ❌ `contacts.borrowers.0.email`
  ✅ `contactsData.borrowers.0.email`
- ❌ `contacts.borrowers.0.gender`
  ✅ `contactsData.borrowers.0.gender`
- ❌ `contacts.borrowers.0.marital_status`
  ✅ `contactsData.borrowers.0.marital_status`
- ❌ `contacts.sellers.0.type`
  ✅ `contactsData.sellers.0.type`
- ❌ `contacts.sellers.0.first_name`
  ✅ `contactsData.sellers.0.first_name`
- ❌ `contacts.sellers.0.middle_name`
  ✅ `contactsData.sellers.0.middle_name`
- ❌ `contacts.sellers.0.suffix`
  ✅ `contactsData.sellers.0.suffix`
- ❌ `contacts.sellers.0.last_name`
  ✅ `contactsData.sellers.0.last_name`
- ❌ `contacts.sellers.0.email`
  ✅ `contactsData.sellers.0.email`
- ❌ `contacts.sellers.0.gender`
  ✅ `contactsData.sellers.0.gender`
- ❌ `contacts.sellers.0.marital_status`
  ✅ `contactsData.sellers.0.marital_status`

### debits-credits-ln
Fields: 72

**Corrections needed:**
- ❌ `cdf.borrower_credit_information.line_01.statement_text`
  ✅ `cdfData.borrower_credit_information.line_01.statement_text`
- ❌ `cdf.borrower_credit_information.line_01.amount`
  ✅ `cdfData.borrower_credit_information.line_01.amount`
- ❌ `cdf.borrower_credit_information.line_02.statement_text`
  ✅ `cdfData.borrower_credit_information.line_02.statement_text`
- ❌ `cdf.borrower_credit_information.line_02.amount`
  ✅ `cdfData.borrower_credit_information.line_02.amount`
- ❌ `cdf.borrower_credit_information.line_03.statement_text`
  ✅ `cdfData.borrower_credit_information.line_03.statement_text`
- ❌ `cdf.borrower_credit_information.line_03.amount`
  ✅ `cdfData.borrower_credit_information.line_03.amount`
- ❌ `cdf.borrower_credit_information.line_04.statement_text`
  ✅ `cdfData.borrower_credit_information.line_04.statement_text`
- ❌ `cdf.borrower_credit_information.line_04.amount`
  ✅ `cdfData.borrower_credit_information.line_04.amount`
- ❌ `cdf.seller_credit.statement_text`
  ✅ `cdfData.seller_credit.statement_text`
- ❌ `cdf.seller_credit.amount`
  ✅ `cdfData.seller_credit.amount`
- ❌ `cdf.borrower_credit_information.line_06.statement_text`
  ✅ `cdfData.borrower_credit_information.line_06.statement_text`
- ❌ `cdf.borrower_credit_information.line_06.amount`
  ✅ `cdfData.borrower_credit_information.line_06.amount`
- ❌ `cdf.borrower_credit_information.line_07.statement_text`
  ✅ `cdfData.borrower_credit_information.line_07.statement_text`
- ❌ `cdf.borrower_credit_information.line_07.amount`
  ✅ `cdfData.borrower_credit_information.line_07.amount`
- ❌ `cdf.borrower_credit_information.line_08.statement_text`
  ✅ `cdfData.borrower_credit_information.line_08.statement_text`
- ❌ `cdf.borrower_credit_information.line_08.amount`
  ✅ `cdfData.borrower_credit_information.line_08.amount`
- ❌ `cdf.borrower_credit_information.line_09.statement_text`
  ✅ `cdfData.borrower_credit_information.line_09.statement_text`
- ❌ `cdf.borrower_credit_information.line_09.amount`
  ✅ `cdfData.borrower_credit_information.line_09.amount`
- ❌ `cdf.borrower_credit_information.line_10.statement_text`
  ✅ `cdfData.borrower_credit_information.line_10.statement_text`
- ❌ `cdf.borrower_credit_information.line_10.amount`
  ✅ `cdfData.borrower_credit_information.line_10.amount`
- ❌ `cdf.borrower_credit_information.line_11.statement_text`
  ✅ `cdfData.borrower_credit_information.line_11.statement_text`
- ❌ `cdf.borrower_credit_information.line_11.amount`
  ✅ `cdfData.borrower_credit_information.line_11.amount`
- ❌ `cdf.borrower_credit_information.line_12.statement_text`
  ✅ `cdfData.borrower_credit_information.line_12.statement_text`
- ❌ `cdf.borrower_credit_information.line_12.amount`
  ✅ `cdfData.borrower_credit_information.line_12.amount`
- ❌ `cdf.borrower_credit_information.line_13.statement_text`
  ✅ `cdfData.borrower_credit_information.line_13.statement_text`
- ❌ `cdf.borrower_credit_information.line_13.amount`
  ✅ `cdfData.borrower_credit_information.line_13.amount`
- ❌ `cdf.borrower_credit_information.line_14.statement_text`
  ✅ `cdfData.borrower_credit_information.line_14.statement_text`
- ❌ `cdf.borrower_credit_information.line_14.amount`
  ✅ `cdfData.borrower_credit_information.line_14.amount`
- ❌ `cdf.borrower_credit_information.line_15.statement_text`
  ✅ `cdfData.borrower_credit_information.line_15.statement_text`
- ❌ `cdf.borrower_credit_information.line_15.amount`
  ✅ `cdfData.borrower_credit_information.line_15.amount`
- ❌ `cdf.borrower_credit_information.line_16.statement_text`
  ✅ `cdfData.borrower_credit_information.line_16.statement_text`
- ❌ `cdf.borrower_credit_information.line_16.amount`
  ✅ `cdfData.borrower_credit_information.line_16.amount`
- ❌ `cdf.borrower_credit_information.line_17.statement_text`
  ✅ `cdfData.borrower_credit_information.line_17.statement_text`
- ❌ `cdf.borrower_credit_information.line_17.amount`
  ✅ `cdfData.borrower_credit_information.line_17.amount`
- ❌ `cdf.seller_debit_information.line_01.statement_text`
  ✅ `cdfData.seller_debit_information.line_01.statement_text`
- ❌ `cdf.seller_debit_information.line_01.amount`
  ✅ `cdfData.seller_debit_information.line_01.amount`
- ❌ `cdf.seller_debit_information.line_02.statement_text`
  ✅ `cdfData.seller_debit_information.line_02.statement_text`
- ❌ `cdf.seller_debit_information.line_02.amount`
  ✅ `cdfData.seller_debit_information.line_02.amount`
- ❌ `cdf.borrower_credit_information.line_03.statement_text`
  ✅ `cdfData.borrower_credit_information.line_03.statement_text`
- ❌ `cdf.borrower_credit_information.line_03.amount`
  ✅ `cdfData.borrower_credit_information.line_03.amount`
- ❌ `cdf.seller_debit_information.line_04.statement_text`
  ✅ `cdfData.seller_debit_information.line_04.statement_text`
- ❌ `cdf.seller_debit_information.line_04.amount`
  ✅ `cdfData.seller_debit_information.line_04.amount`
- ❌ `cdf.seller_debit_information.line_05.statement_text`
  ✅ `cdfData.seller_debit_information.line_05.statement_text`
- ❌ `cdf.seller_debit_information.line_05.amount`
  ✅ `cdfData.seller_debit_information.line_05.amount`
- ❌ `cdf.seller_debit_information.line_06.statement_text`
  ✅ `cdfData.seller_debit_information.line_06.statement_text`
- ❌ `cdf.seller_debit_information.line_06.amount`
  ✅ `cdfData.seller_debit_information.line_06.amount`
- ❌ `cdf.seller_debit_information.line_07.statement_text`
  ✅ `cdfData.seller_debit_information.line_07.statement_text`
- ❌ `cdf.seller_debit_information.line_07.amount`
  ✅ `cdfData.seller_debit_information.line_07.amount`
- ❌ `cdf.seller_credit.statement_text`
  ✅ `cdfData.seller_credit.statement_text`
- ❌ `cdf.seller_credit.amount`
  ✅ `cdfData.seller_credit.amount`
- ❌ `cdf.seller_debit_information.line_09.statement_text`
  ✅ `cdfData.seller_debit_information.line_09.statement_text`
- ❌ `cdf.seller_debit_information.line_09.amount`
  ✅ `cdfData.seller_debit_information.line_09.amount`
- ❌ `cdf.borrower_credit_information.line_08.statement_text`
  ✅ `cdfData.borrower_credit_information.line_08.statement_text`
- ❌ `cdf.borrower_credit_information.line_08.amount`
  ✅ `cdfData.borrower_credit_information.line_08.amount`
- ❌ `cdf.borrower_credit_information.line_09.statement_text`
  ✅ `cdfData.borrower_credit_information.line_09.statement_text`
- ❌ `cdf.borrower_credit_information.line_09.amount`
  ✅ `cdfData.borrower_credit_information.line_09.amount`
- ❌ `cdf.borrower_credit_information.line_10.statement_text`
  ✅ `cdfData.borrower_credit_information.line_10.statement_text`
- ❌ `cdf.borrower_credit_information.line_10.amount`
  ✅ `cdfData.borrower_credit_information.line_10.amount`
- ❌ `cdf.borrower_credit_information.line_11.statement_text`
  ✅ `cdfData.borrower_credit_information.line_11.statement_text`
- ❌ `cdf.borrower_credit_information.line_11.amount`
  ✅ `cdfData.borrower_credit_information.line_11.amount`
- ❌ `cdf.borrower_credit_information.line_12.statement_text`
  ✅ `cdfData.borrower_credit_information.line_12.statement_text`
- ❌ `cdf.borrower_credit_information.line_12.amount`
  ✅ `cdfData.borrower_credit_information.line_12.amount`
- ❌ `cdf.borrower_credit_information.line_13.statement_text`
  ✅ `cdfData.borrower_credit_information.line_13.statement_text`
- ❌ `cdf.borrower_credit_information.line_13.amount`
  ✅ `cdfData.borrower_credit_information.line_13.amount`
- ❌ `cdf.borrower_credit_information.line_14.statement_text`
  ✅ `cdfData.borrower_credit_information.line_14.statement_text`
- ❌ `cdf.borrower_credit_information.line_14.amount`
  ✅ `cdfData.borrower_credit_information.line_14.amount`
- ❌ `cdf.borrower_credit_information.line_15.statement_text`
  ✅ `cdfData.borrower_credit_information.line_15.statement_text`
- ❌ `cdf.borrower_credit_information.line_15.amount`
  ✅ `cdfData.borrower_credit_information.line_15.amount`
- ❌ `cdf.borrower_credit_information.line_16.statement_text`
  ✅ `cdfData.borrower_credit_information.line_16.statement_text`
- ❌ `cdf.borrower_credit_information.line_16.amount`
  ✅ `cdfData.borrower_credit_information.line_16.amount`
- ❌ `cdf.borrower_credit_information.line_17.statement_text`
  ✅ `cdfData.borrower_credit_information.line_17.statement_text`
- ❌ `cdf.borrower_credit_information.line_17.amount`
  ✅ `cdfData.borrower_credit_information.line_17.amount`

### debits-credits
Fields: 62

**Corrections needed:**
- ❌ `cdf.borrower_debit_information.line_01.statement_text`
  ✅ `cdfData.borrower_debit_information.line_01.statement_text`
- ❌ `cdf.borrower_debit_information.line_01.amount`
  ✅ `cdfData.borrower_debit_information.line_01.amount`
- ❌ `cdf.borrower_debit_information.line_02.statement_text`
  ✅ `cdfData.borrower_debit_information.line_02.statement_text`
- ❌ `cdf.borrower_debit_information.line_02.amount`
  ✅ `cdfData.borrower_debit_information.line_02.amount`
- ❌ `cdf.borrower_debit_information.line_03.statement_text`
  ✅ `cdfData.borrower_debit_information.line_03.statement_text`
- ❌ `cdf.borrower_debit_information.line_03.amount`
  ✅ `cdfData.borrower_debit_information.line_03.amount`
- ❌ `cdf.borrower_debit_information.line_04.statement_text`
  ✅ `cdfData.borrower_debit_information.line_04.statement_text`
- ❌ `cdf.borrower_debit_information.line_04.amount`
  ✅ `cdfData.borrower_debit_information.line_04.amount`
- ❌ `cdf.borrower_debit_information.line_05.statement_text`
  ✅ `cdfData.borrower_debit_information.line_05.statement_text`
- ❌ `cdf.borrower_debit_information.line_05.amount`
  ✅ `cdfData.borrower_debit_information.line_05.amount`
- ❌ `cdf.borrower_debit_information.line_06.statement_text`
  ✅ `cdfData.borrower_debit_information.line_06.statement_text`
- ❌ `cdf.borrower_debit_information.line_06.amount`
  ✅ `cdfData.borrower_debit_information.line_06.amount`
- ❌ `cdf.borrower_debit_information.line_07.statement_text`
  ✅ `cdfData.borrower_debit_information.line_07.statement_text`
- ❌ `cdf.borrower_debit_information.line_07.amount`
  ✅ `cdfData.borrower_debit_information.line_07.amount`
- ❌ `cdf.borrower_debit_information.line_08.statement_text`
  ✅ `cdfData.borrower_debit_information.line_08.statement_text`
- ❌ `cdf.borrower_debit_information.line_08.amount`
  ✅ `cdfData.borrower_debit_information.line_08.amount`
- ❌ `cdf.borrower_debit_information.line_09.statement_text`
  ✅ `cdfData.borrower_debit_information.line_09.statement_text`
- ❌ `cdf.borrower_debit_information.line_09.amount`
  ✅ `cdfData.borrower_debit_information.line_09.amount`
- ❌ `cdf.borrower_debit_information.line_10.statement_text`
  ✅ `cdfData.borrower_debit_information.line_10.statement_text`
- ❌ `cdf.borrower_debit_information.line_10.amount`
  ✅ `cdfData.borrower_debit_information.line_10.amount`
- ❌ `cdf.borrower_debit_information.line_11.statement_text`
  ✅ `cdfData.borrower_debit_information.line_11.statement_text`
- ❌ `cdf.borrower_debit_information.line_11.amount`
  ✅ `cdfData.borrower_debit_information.line_11.amount`
- ❌ `cdf.borrower_debit_information.line_12.statement_text`
  ✅ `cdfData.borrower_debit_information.line_12.statement_text`
- ❌ `cdf.borrower_debit_information.line_12.amount`
  ✅ `cdfData.borrower_debit_information.line_12.amount`
- ❌ `cdf.borrower_debit_information.line_13.statement_text`
  ✅ `cdfData.borrower_debit_information.line_13.statement_text`
- ❌ `cdf.borrower_debit_information.line_13.amount`
  ✅ `cdfData.borrower_debit_information.line_13.amount`
- ❌ `cdf.borrower_debit_information.line_14.statement_text`
  ✅ `cdfData.borrower_debit_information.line_14.statement_text`
- ❌ `cdf.borrower_debit_information.line_14.amount`
  ✅ `cdfData.borrower_debit_information.line_14.amount`
- ❌ `cdf.borrower_debit_information.line_15.statement_text`
  ✅ `cdfData.borrower_debit_information.line_15.statement_text`
- ❌ `cdf.borrower_debit_information.line_15.amount`
  ✅ `cdfData.borrower_debit_information.line_15.amount`
- ❌ `cdf.seller_credit_information.line_01.statement_text`
  ✅ `cdfData.seller_credit_information.line_01.statement_text`
- ❌ `cdf.seller_credit_information.line_01.amount`
  ✅ `cdfData.seller_credit_information.line_01.amount`
- ❌ `cdf.borrower_debit_information.line_02.statement_text`
  ✅ `cdfData.borrower_debit_information.line_02.statement_text`
- ❌ `cdf.borrower_debit_information.line_02.amount`
  ✅ `cdfData.borrower_debit_information.line_02.amount`
- ❌ `cdf.seller_credit_information.line_03.statement_text`
  ✅ `cdfData.seller_credit_information.line_03.statement_text`
- ❌ `cdf.seller_credit_information.line_03.amount`
  ✅ `cdfData.seller_credit_information.line_03.amount`
- ❌ `cdf.seller_credit_information.line_04.statement_text`
  ✅ `cdfData.seller_credit_information.line_04.statement_text`
- ❌ `cdf.seller_credit_information.line_04.amount`
  ✅ `cdfData.seller_credit_information.line_04.amount`
- ❌ `cdf.seller_credit_information.line_05.statement_text`
  ✅ `cdfData.seller_credit_information.line_05.statement_text`
- ❌ `cdf.seller_credit_information.line_05.amount`
  ✅ `cdfData.seller_credit_information.line_05.amount`
- ❌ `cdf.borrower_debit_information.line_05.statement_text`
  ✅ `cdfData.borrower_debit_information.line_05.statement_text`
- ❌ `cdf.borrower_debit_information.line_05.amount`
  ✅ `cdfData.borrower_debit_information.line_05.amount`
- ❌ `cdf.borrower_debit_information.line_06.statement_text`
  ✅ `cdfData.borrower_debit_information.line_06.statement_text`
- ❌ `cdf.borrower_debit_information.line_06.amount`
  ✅ `cdfData.borrower_debit_information.line_06.amount`
- ❌ `cdf.borrower_debit_information.line_07.statement_text`
  ✅ `cdfData.borrower_debit_information.line_07.statement_text`
- ❌ `cdf.borrower_debit_information.line_07.amount`
  ✅ `cdfData.borrower_debit_information.line_07.amount`
- ❌ `cdf.borrower_debit_information.line_08.statement_text`
  ✅ `cdfData.borrower_debit_information.line_08.statement_text`
- ❌ `cdf.borrower_debit_information.line_08.amount`
  ✅ `cdfData.borrower_debit_information.line_08.amount`
- ❌ `cdf.borrower_debit_information.line_09.statement_text`
  ✅ `cdfData.borrower_debit_information.line_09.statement_text`
- ❌ `cdf.borrower_debit_information.line_09.amount`
  ✅ `cdfData.borrower_debit_information.line_09.amount`
- ❌ `cdf.borrower_debit_information.line_10.statement_text`
  ✅ `cdfData.borrower_debit_information.line_10.statement_text`
- ❌ `cdf.borrower_debit_information.line_10.amount`
  ✅ `cdfData.borrower_debit_information.line_10.amount`
- ❌ `cdf.borrower_debit_information.line_11.statement_text`
  ✅ `cdfData.borrower_debit_information.line_11.statement_text`
- ❌ `cdf.borrower_debit_information.line_11.amount`
  ✅ `cdfData.borrower_debit_information.line_11.amount`
- ❌ `cdf.borrower_debit_information.line_12.statement_text`
  ✅ `cdfData.borrower_debit_information.line_12.statement_text`
- ❌ `cdf.borrower_debit_information.line_12.amount`
  ✅ `cdfData.borrower_debit_information.line_12.amount`
- ❌ `cdf.borrower_debit_information.line_13.statement_text`
  ✅ `cdfData.borrower_debit_information.line_13.statement_text`
- ❌ `cdf.borrower_debit_information.line_13.amount`
  ✅ `cdfData.borrower_debit_information.line_13.amount`
- ❌ `cdf.borrower_debit_information.line_14.statement_text`
  ✅ `cdfData.borrower_debit_information.line_14.statement_text`
- ❌ `cdf.borrower_debit_information.line_14.amount`
  ✅ `cdfData.borrower_debit_information.line_14.amount`
- ❌ `cdf.borrower_debit_information.line_15.statement_text`
  ✅ `cdfData.borrower_debit_information.line_15.statement_text`
- ❌ `cdf.borrower_debit_information.line_15.amount`
  ✅ `cdfData.borrower_debit_information.line_15.amount`

### did-not-shop-for
Fields: 81

**Corrections needed:**
- ❌ `cdf.services_borrower_did_not_shop_for.line_01.description`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_01.description`
- ❌ `cdf.services_borrower_did_not_shop_for.line_01.payee_name`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_01.payee_name`
- ❌ `cdf.services_borrower_did_not_shop_for.line_01.borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_01.paid_by_borrower`
- ❌ `cdf.services_borrower_did_not_shop_for.line_01.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_01.paid_before_closing`
- ❌ `cdf.services_borrower_did_not_shop_for.line_01.seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_01.paid_by_seller`
- ❌ `cdf.services_borrower_did_not_shop_for.line_01.before_seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_01.before_seller_amount`
- ❌ `cdf.services_borrower_did_not_shop_for.line_01.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_01.paid_by_others`
- ❌ `cdf.services_borrower_did_not_shop_for.line_02.description`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_02.description`
- ❌ `cdf.services_borrower_did_not_shop_for.line_02.payee_name`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_02.payee_name`
- ❌ `cdf.services_borrower_did_not_shop_for.line_02.borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_02.paid_by_borrower`
- ❌ `cdf.services_borrower_did_not_shop_for.line_02.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_02.paid_before_closing`
- ❌ `cdf.services_borrower_did_not_shop_for.line_02.seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_02.paid_by_seller`
- ❌ `cdf.services_borrower_did_not_shop_for.line_02.before_seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_02.before_seller_amount`
- ❌ `cdf.services_borrower_did_not_shop_for.line_02.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_02.paid_by_others`
- ❌ `cdf.services_borrower_did_not_shop_for.line_03.description`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_03.description`
- ❌ `cdf.services_borrower_did_not_shop_for.line_03.payee_name`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_03.payee_name`
- ❌ `cdf.services_borrower_did_not_shop_for.line_03.borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_03.paid_by_borrower`
- ❌ `cdf.services_borrower_did_not_shop_for.line_03.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_03.paid_before_closing`
- ❌ `cdf.services_borrower_did_not_shop_for.line_03.seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_03.paid_by_seller`
- ❌ `cdf.services_borrower_did_not_shop_for.line_03.before_seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_03.before_seller_amount`
- ❌ `cdf.services_borrower_did_not_shop_for.line_03.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_03.paid_by_others`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.description`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.description`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payee_name`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payee_name`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.paid_by_borrower`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.paid_before_closing`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.paid_by_seller`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.before_seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.before_seller_amount`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.paid_by_others`
- ❌ `cdf.services_borrower_did_not_shop_for.line_05.description`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_05.description`
- ❌ `cdf.services_borrower_did_not_shop_for.line_05.payee_name`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_05.payee_name`
- ❌ `cdf.services_borrower_did_not_shop_for.line_05.borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_05.paid_by_borrower`
- ❌ `cdf.services_borrower_did_not_shop_for.line_05.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_05.paid_before_closing`
- ❌ `cdf.services_borrower_did_not_shop_for.line_05.seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_05.paid_by_seller`
- ❌ `cdf.services_borrower_did_not_shop_for.line_05.before_seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_05.before_seller_amount`
- ❌ `cdf.services_borrower_did_not_shop_for.line_05.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_05.paid_by_others`
- ❌ `cdf.services_borrower_did_not_shop_for.line_06.description`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_06.description`
- ❌ `cdf.services_borrower_did_not_shop_for.line_06.payee_name`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_06.payee_name`
- ❌ `cdf.services_borrower_did_not_shop_for.line_06.borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_06.paid_by_borrower`
- ❌ `cdf.services_borrower_did_not_shop_for.line_06.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_06.paid_before_closing`
- ❌ `cdf.services_borrower_did_not_shop_for.line_06.seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_06.paid_by_seller`
- ❌ `cdf.services_borrower_did_not_shop_for.line_06.before_seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_06.before_seller_amount`
- ❌ `cdf.services_borrower_did_not_shop_for.line_06.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_06.paid_by_others`
- ❌ `cdf.services_borrower_did_not_shop_for.line_07.description`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_07.description`
- ❌ `cdf.services_borrower_did_not_shop_for.line_07.payee_name`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_07.payee_name`
- ❌ `cdf.services_borrower_did_not_shop_for.line_07.borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_07.paid_by_borrower`
- ❌ `cdf.services_borrower_did_not_shop_for.line_07.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_07.paid_before_closing`
- ❌ `cdf.services_borrower_did_not_shop_for.line_07.seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_07.paid_by_seller`
- ❌ `cdf.services_borrower_did_not_shop_for.line_07.before_seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_07.before_seller_amount`
- ❌ `cdf.services_borrower_did_not_shop_for.line_07.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_07.paid_by_others`
- ❌ `cdf.services_borrower_did_not_shop_for.line_08.description`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_08.description`
- ❌ `cdf.services_borrower_did_not_shop_for.line_08.payee_name`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_08.payee_name`
- ❌ `cdf.services_borrower_did_not_shop_for.line_08.borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_08.paid_by_borrower`
- ❌ `cdf.services_borrower_did_not_shop_for.line_08.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_08.paid_before_closing`
- ❌ `cdf.services_borrower_did_not_shop_for.line_08.seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_08.paid_by_seller`
- ❌ `cdf.services_borrower_did_not_shop_for.line_08.before_seller_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_08.before_seller_amount`
- ❌ `cdf.services_borrower_did_not_shop_for.line_08.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_08.paid_by_others`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.type`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.type`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.name_dep`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.name_dep`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.payment_dep`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.payment_dep`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.label.payee_label_id`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.label.payee_label_id`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.reference_number`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.reference_number`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.address.latitude`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.address.latitude`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.address.longitude`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.address.longitude`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.address.address_1`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.address.address_1`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.address.address_2`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.address.address_2`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.address.city`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.address.city`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.address.state`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.address.state`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.address.zipcode`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.address.zipcode`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.reference_number`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.reference_number`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.aggregate_payee_id`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.aggregate_payee_id`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.payment_dep`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.payment_dep`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.label.payee_label_id`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.label.payee_label_id`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.order_transfer_order_id`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.order_transfer_order_id`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.order_transfer_for_benefit_of`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.order_transfer_for_benefit_of`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.holdback_release_note`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.holdback_release_note`
- ❌ `cdf.services_borrower_did_not_shop_for.line_04.payees.0.holdback_release_date`
  ✅ `cdfData.services_borrower_did_not_shop_for.line_04.payees.0.holdback_release_date`

### did-shop-for
Fields: 77

**Corrections needed:**
- ❌ `cdf.services_borrower_did_shop_for.line_01.description`
  ✅ `cdfData.services_borrower_did_shop_for.line_01.description`
- ❌ `cdf.services_borrower_did_shop_for.line_01.payee_name`
  ✅ `cdfData.services_borrower_did_shop_for.line_01.payee_name`
- ❌ `cdf.services_borrower_did_shop_for.line_01.borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_01.paid_by_borrower`
- ❌ `cdf.services_borrower_did_shop_for.line_01.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_01.paid_before_closing`
- ❌ `cdf.services_borrower_did_shop_for.line_01.seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_01.paid_by_seller`
- ❌ `cdf.services_borrower_did_shop_for.line_01.before_seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_01.before_seller_amount`
- ❌ `cdf.services_borrower_did_shop_for.line_01.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_01.paid_by_others`
- ❌ `cdf.services_borrower_did_shop_for.line_02.description`
  ✅ `cdfData.services_borrower_did_shop_for.line_02.description`
- ❌ `cdf.services_borrower_did_shop_for.line_02.payee_name`
  ✅ `cdfData.services_borrower_did_shop_for.line_02.payee_name`
- ❌ `cdf.services_borrower_did_shop_for.line_02.borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_02.paid_by_borrower`
- ❌ `cdf.services_borrower_did_shop_for.line_02.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_02.paid_before_closing`
- ❌ `cdf.services_borrower_did_shop_for.line_02.seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_02.paid_by_seller`
- ❌ `cdf.services_borrower_did_shop_for.line_02.before_seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_02.before_seller_amount`
- ❌ `cdf.services_borrower_did_shop_for.line_02.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_02.paid_by_others`
- ❌ `cdf.services_borrower_did_shop_for.line_03.description`
  ✅ `cdfData.services_borrower_did_shop_for.line_03.description`
- ❌ `cdf.services_borrower_did_shop_for.line_03.payee_name`
  ✅ `cdfData.services_borrower_did_shop_for.line_03.payee_name`
- ❌ `cdf.services_borrower_did_shop_for.line_03.borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_03.paid_by_borrower`
- ❌ `cdf.services_borrower_did_shop_for.line_03.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_03.paid_before_closing`
- ❌ `cdf.services_borrower_did_shop_for.line_03.seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_03.paid_by_seller`
- ❌ `cdf.services_borrower_did_shop_for.line_03.before_seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_03.before_seller_amount`
- ❌ `cdf.services_borrower_did_shop_for.line_03.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_03.paid_by_others`
- ❌ `cdf.services_borrower_did_shop_for.line_04.description`
  ✅ `cdfData.services_borrower_did_shop_for.line_04.description`
- ❌ `cdf.services_borrower_did_shop_for.line_04.payee_name`
  ✅ `cdfData.services_borrower_did_shop_for.line_04.payee_name`
- ❌ `cdf.services_borrower_did_shop_for.line_04.borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_04.paid_by_borrower`
- ❌ `cdf.services_borrower_did_shop_for.line_04.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_04.paid_before_closing`
- ❌ `cdf.services_borrower_did_shop_for.line_04.seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_04.paid_by_seller`
- ❌ `cdf.services_borrower_did_shop_for.line_04.before_seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_04.before_seller_amount`
- ❌ `cdf.services_borrower_did_shop_for.line_04.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_04.paid_by_others`
- ❌ `cdf.services_borrower_did_shop_for.line_05.description`
  ✅ `cdfData.services_borrower_did_shop_for.line_05.description`
- ❌ `cdf.services_borrower_did_shop_for.line_05.payee_name`
  ✅ `cdfData.services_borrower_did_shop_for.line_05.payee_name`
- ❌ `cdf.services_borrower_did_shop_for.line_05.borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_05.paid_by_borrower`
- ❌ `cdf.services_borrower_did_shop_for.line_05.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_05.paid_before_closing`
- ❌ `cdf.services_borrower_did_shop_for.line_05.seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_05.paid_by_seller`
- ❌ `cdf.services_borrower_did_shop_for.line_05.before_seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_05.before_seller_amount`
- ❌ `cdf.services_borrower_did_shop_for.line_05.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_05.paid_by_others`
- ❌ `cdf.services_borrower_did_shop_for.line_06.description`
  ✅ `cdfData.services_borrower_did_shop_for.line_06.description`
- ❌ `cdf.services_borrower_did_shop_for.line_06.payee_name`
  ✅ `cdfData.services_borrower_did_shop_for.line_06.payee_name`
- ❌ `cdf.services_borrower_did_shop_for.line_06.borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_06.paid_by_borrower`
- ❌ `cdf.services_borrower_did_shop_for.line_06.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_06.paid_before_closing`
- ❌ `cdf.services_borrower_did_shop_for.line_06.seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_06.paid_by_seller`
- ❌ `cdf.services_borrower_did_shop_for.line_06.before_seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_06.before_seller_amount`
- ❌ `cdf.services_borrower_did_shop_for.line_06.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_06.paid_by_others`
- ❌ `cdf.services_borrower_did_shop_for.line_07.description`
  ✅ `cdfData.services_borrower_did_shop_for.line_07.description`
- ❌ `cdf.services_borrower_did_shop_for.line_07.payee_name`
  ✅ `cdfData.services_borrower_did_shop_for.line_07.payee_name`
- ❌ `cdf.services_borrower_did_shop_for.line_07.borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_07.paid_by_borrower`
- ❌ `cdf.services_borrower_did_shop_for.line_07.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_07.paid_before_closing`
- ❌ `cdf.services_borrower_did_shop_for.line_07.seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_07.paid_by_seller`
- ❌ `cdf.services_borrower_did_shop_for.line_07.before_seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_07.before_seller_amount`
- ❌ `cdf.services_borrower_did_shop_for.line_07.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_07.paid_by_others`
- ❌ `cdf.services_borrower_did_shop_for.line_08.description`
  ✅ `cdfData.services_borrower_did_shop_for.line_08.description`
- ❌ `cdf.services_borrower_did_shop_for.line_08.payee_name`
  ✅ `cdfData.services_borrower_did_shop_for.line_08.payee_name`
- ❌ `cdf.services_borrower_did_shop_for.line_08.borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_08.paid_by_borrower`
- ❌ `cdf.services_borrower_did_shop_for.line_08.before_borrower_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_08.paid_before_closing`
- ❌ `cdf.services_borrower_did_shop_for.line_08.seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_08.paid_by_seller`
- ❌ `cdf.services_borrower_did_shop_for.line_08.before_seller_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_08.before_seller_amount`
- ❌ `cdf.services_borrower_did_shop_for.line_08.paid_by_others_amount`
  ✅ `cdfData.services_borrower_did_shop_for.line_08.paid_by_others`
- ❌ `cdf.services_borrower_did_shop_for.line_01.taxable`
  ✅ `cdfData.services_borrower_did_shop_for.line_01.taxable`
- ❌ `cdf.services_borrower_did_shop_for.line_01.payees.0.type`
  ✅ `cdfData.services_borrower_did_shop_for.line_01.payees.0.type`
- ❌ `cdf.services_borrower_did_shop_for.line_01.payees.0.name_dep`
  ✅ `cdfData.services_borrower_did_shop_for.line_01.payees.0.name_dep`
- ❌ `cdf.services_borrower_did_shop_for.line_01.payees.0.payment_dep`
  ✅ `cdfData.services_borrower_did_shop_for.line_01.payees.0.payment_dep`
- ❌ `cdf.services_borrower_did_shop_for.line_01.payees.0.label.payee_label_id`
  ✅ `cdfData.services_borrower_did_shop_for.line_01.payees.0.label.payee_label_id`
- ❌ `cdf.services_borrower_did_shop_for.line_01.payees.0.reference_number`
  ✅ `cdfData.services_borrower_did_shop_for.line_01.payees.0.reference_number`

### earnest-commissions
Fields: 18

*No corrections needed*

### escrow
Fields: 82

**Corrections needed:**
- ❌ `cdf.escrow_information.line_01.description`
  ✅ `cdfData.escrow_information.line_01.description`
- ❌ `cdf.escrow_information.line_01.per_month_amount`
  ✅ `cdfData.escrow_information.line_01.per_month_amount`
- ❌ `cdf.escrow_information.line_01.number_of_months`
  ✅ `cdfData.escrow_information.line_01.number_of_months`
- ❌ `cdf.escrow_information.line_01.borrower_amount`
  ✅ `cdfData.escrow_information.line_01.paid_by_borrower`
- ❌ `cdf.escrow_information.line_01.before_borrower_amount`
  ✅ `cdfData.escrow_information.line_01.paid_before_closing`
- ❌ `cdf.escrow_information.line_01.seller_amount`
  ✅ `cdfData.escrow_information.line_01.paid_by_seller`
- ❌ `cdf.escrow_information.line_01.before_seller_amount`
  ✅ `cdfData.escrow_information.line_01.before_seller_amount`
- ❌ `cdf.escrow_information.line_01.paid_by_others_amount`
  ✅ `cdfData.escrow_information.line_01.paid_by_others`
- ❌ `cdf.escrow_information.line_02.description`
  ✅ `cdfData.escrow_information.line_02.description`
- ❌ `cdf.escrow_information.line_02.per_month_amount`
  ✅ `cdfData.escrow_information.line_02.per_month_amount`
- ❌ `cdf.escrow_information.line_02.number_of_months`
  ✅ `cdfData.escrow_information.line_02.number_of_months`
- ❌ `cdf.escrow_information.line_02.borrower_amount`
  ✅ `cdfData.escrow_information.line_02.paid_by_borrower`
- ❌ `cdf.escrow_information.line_02.before_borrower_amount`
  ✅ `cdfData.escrow_information.line_02.paid_before_closing`
- ❌ `cdf.escrow_information.line_02.seller_amount`
  ✅ `cdfData.escrow_information.line_02.paid_by_seller`
- ❌ `cdf.escrow_information.line_02.before_seller_amount`
  ✅ `cdfData.escrow_information.line_02.before_seller_amount`
- ❌ `cdf.escrow_information.line_02.paid_by_others_amount`
  ✅ `cdfData.escrow_information.line_02.paid_by_others`
- ❌ `cdf.escrow_information.line_03.description`
  ✅ `cdfData.escrow_information.line_03.description`
- ❌ `cdf.escrow_information.line_03.per_month_amount`
  ✅ `cdfData.escrow_information.line_03.per_month_amount`
- ❌ `cdf.escrow_information.line_03.number_of_months`
  ✅ `cdfData.escrow_information.line_03.number_of_months`
- ❌ `cdf.escrow_information.line_03.borrower_amount`
  ✅ `cdfData.escrow_information.line_03.paid_by_borrower`
- ❌ `cdf.escrow_information.line_03.before_borrower_amount`
  ✅ `cdfData.escrow_information.line_03.paid_before_closing`
- ❌ `cdf.escrow_information.line_03.seller_amount`
  ✅ `cdfData.escrow_information.line_03.paid_by_seller`
- ❌ `cdf.escrow_information.line_03.before_seller_amount`
  ✅ `cdfData.escrow_information.line_03.before_seller_amount`
- ❌ `cdf.escrow_information.line_03.paid_by_others_amount`
  ✅ `cdfData.escrow_information.line_03.paid_by_others`
- ❌ `cdf.escrow_information.line_04.description`
  ✅ `cdfData.escrow_information.line_04.description`
- ❌ `cdf.escrow_information.line_04.per_month_amount`
  ✅ `cdfData.escrow_information.line_04.per_month_amount`
- ❌ `cdf.escrow_information.line_04.number_of_months`
  ✅ `cdfData.escrow_information.line_04.number_of_months`
- ❌ `cdf.escrow_information.line_04.borrower_amount`
  ✅ `cdfData.escrow_information.line_04.paid_by_borrower`
- ❌ `cdf.escrow_information.line_04.before_borrower_amount`
  ✅ `cdfData.escrow_information.line_04.paid_before_closing`
- ❌ `cdf.escrow_information.line_04.seller_amount`
  ✅ `cdfData.escrow_information.line_04.paid_by_seller`
- ❌ `cdf.escrow_information.line_04.before_seller_amount`
  ✅ `cdfData.escrow_information.line_04.before_seller_amount`
- ❌ `cdf.escrow_information.line_04.paid_by_others_amount`
  ✅ `cdfData.escrow_information.line_04.paid_by_others`
- ❌ `cdf.escrow_information.line_05.description`
  ✅ `cdfData.escrow_information.line_05.description`
- ❌ `cdf.escrow_information.line_05.per_month_amount`
  ✅ `cdfData.escrow_information.line_05.per_month_amount`
- ❌ `cdf.escrow_information.line_05.number_of_months`
  ✅ `cdfData.escrow_information.line_05.number_of_months`
- ❌ `cdf.escrow_information.line_05.borrower_amount`
  ✅ `cdfData.escrow_information.line_05.paid_by_borrower`
- ❌ `cdf.escrow_information.line_05.before_borrower_amount`
  ✅ `cdfData.escrow_information.line_05.paid_before_closing`
- ❌ `cdf.escrow_information.line_05.seller_amount`
  ✅ `cdfData.escrow_information.line_05.paid_by_seller`
- ❌ `cdf.escrow_information.line_05.before_seller_amount`
  ✅ `cdfData.escrow_information.line_05.before_seller_amount`
- ❌ `cdf.escrow_information.line_05.paid_by_others_amount`
  ✅ `cdfData.escrow_information.line_05.paid_by_others`
- ❌ `cdf.escrow_information.line_06.description`
  ✅ `cdfData.escrow_information.line_06.description`
- ❌ `cdf.escrow_information.line_06.per_month_amount`
  ✅ `cdfData.escrow_information.line_06.per_month_amount`
- ❌ `cdf.escrow_information.line_06.number_of_months`
  ✅ `cdfData.escrow_information.line_06.number_of_months`
- ❌ `cdf.escrow_information.line_06.borrower_amount`
  ✅ `cdfData.escrow_information.line_06.paid_by_borrower`
- ❌ `cdf.escrow_information.line_06.before_borrower_amount`
  ✅ `cdfData.escrow_information.line_06.paid_before_closing`
- ❌ `cdf.escrow_information.line_06.seller_amount`
  ✅ `cdfData.escrow_information.line_06.paid_by_seller`
- ❌ `cdf.escrow_information.line_06.before_seller_amount`
  ✅ `cdfData.escrow_information.line_06.before_seller_amount`
- ❌ `cdf.escrow_information.line_06.paid_by_others_amount`
  ✅ `cdfData.escrow_information.line_06.paid_by_others`
- ❌ `cdf.escrow_information.line_07.description`
  ✅ `cdfData.escrow_information.line_07.description`
- ❌ `cdf.escrow_information.line_07.per_month_amount`
  ✅ `cdfData.escrow_information.line_07.per_month_amount`
- ❌ `cdf.escrow_information.line_07.number_of_months`
  ✅ `cdfData.escrow_information.line_07.number_of_months`
- ❌ `cdf.escrow_information.line_07.borrower_amount`
  ✅ `cdfData.escrow_information.line_07.paid_by_borrower`
- ❌ `cdf.escrow_information.line_07.before_borrower_amount`
  ✅ `cdfData.escrow_information.line_07.paid_before_closing`
- ❌ `cdf.escrow_information.line_07.seller_amount`
  ✅ `cdfData.escrow_information.line_07.paid_by_seller`
- ❌ `cdf.escrow_information.line_07.before_seller_amount`
  ✅ `cdfData.escrow_information.line_07.before_seller_amount`
- ❌ `cdf.escrow_information.line_07.paid_by_others_amount`
  ✅ `cdfData.escrow_information.line_07.paid_by_others`
- ❌ `cdf.escrow_information.line_08.description`
  ✅ `cdfData.escrow_information.line_08.description`
- ❌ `cdf.escrow_information.line_08.per_month_amount`
  ✅ `cdfData.escrow_information.line_08.per_month_amount`
- ❌ `cdf.escrow_information.line_08.number_of_months`
  ✅ `cdfData.escrow_information.line_08.number_of_months`
- ❌ `cdf.escrow_information.line_08.borrower_amount`
  ✅ `cdfData.escrow_information.line_08.paid_by_borrower`
- ❌ `cdf.escrow_information.line_08.before_borrower_amount`
  ✅ `cdfData.escrow_information.line_08.paid_before_closing`
- ❌ `cdf.escrow_information.line_08.seller_amount`
  ✅ `cdfData.escrow_information.line_08.paid_by_seller`
- ❌ `cdf.escrow_information.line_08.before_seller_amount`
  ✅ `cdfData.escrow_information.line_08.before_seller_amount`
- ❌ `cdf.escrow_information.line_08.paid_by_others_amount`
  ✅ `cdfData.escrow_information.line_08.paid_by_others`
- ❌ `cdf.escrow_information.payees.0.type`
  ✅ `cdfData.escrow_information.payees.0.type`
- ❌ `cdf.escrow_information.payees.0.name_dep`
  ✅ `cdfData.escrow_information.payees.0.name_dep`
- ❌ `cdf.escrow_information.payees.0.payment_dep`
  ✅ `cdfData.escrow_information.payees.0.payment_dep`
- ❌ `cdf.escrow_information.payees.0.label.payee_label_id`
  ✅ `cdfData.escrow_information.payees.0.label.payee_label_id`

### lender-credits
Fields: 11

**Corrections needed:**
- ❌ `cdf.total_closing_costs.closing_costs_subtotals.borrower_total`
  ✅ `cdfData.total_closing_costs.closing_costs_subtotals.borrower_total`
- ❌ `cdf.total_closing_costs.closing_costs_subtotals.before_borrower_total`
  ✅ `cdfData.total_closing_costs.closing_costs_subtotals.before_borrower_total`
- ❌ `cdf.total_closing_costs.closing_costs_subtotals.seller_total`
  ✅ `cdfData.total_closing_costs.closing_costs_subtotals.seller_total`
- ❌ `cdf.total_closing_costs.closing_costs_subtotals.before_seller_total`
  ✅ `cdfData.total_closing_costs.closing_costs_subtotals.before_seller_total`
- ❌ `cdf.total_closing_costs.closing_costs_subtotals.paid_by_others_total`
  ✅ `cdfData.total_closing_costs.closing_costs_subtotals.paid_by_others_total`
- ❌ `cdf.total_closing_costs.lender_credits.borrower_amount`
  ✅ `cdfData.total_closing_costs.lender_credits.paid_by_borrower`
- ❌ `cdf.total_closing_costs.lender_credits.before_borrower_amount`
  ✅ `cdfData.total_closing_costs.lender_credits.paid_before_closing`
- ❌ `cdf.total_closing_costs.lender_credits.seller_amount`
  ✅ `cdfData.total_closing_costs.lender_credits.paid_by_seller`
- ❌ `cdf.total_closing_costs.lender_credits.before_seller_amount`
  ✅ `cdfData.total_closing_costs.lender_credits.before_seller_amount`
- ❌ `cdf.total_closing_costs.lender_credits.paid_by_others_amount`
  ✅ `cdfData.total_closing_costs.lender_credits.paid_by_others`
- ❌ `cdf.total_closing_costs.lender_credits.amount_because_above_legal_limit`
  ✅ `cdfData.total_closing_costs.lender_credits.amount_because_above_legal_limit`

### loan-calculations
Fields: 7

**Corrections needed:**
- ❌ `cdf.loans.0.other_disclosures.liability_after_foreclosure`
  ✅ `cdfData.loans.0.other_disclosures.liability_after_foreclosure`
- ❌ `cdf.loans.0.other_disclosures.liability_after_foreclosure`
  ✅ `cdfData.loans.0.other_disclosures.liability_after_foreclosure`
- ❌ `cdf.loan_calculations.total_of_payments`
  ✅ `cdfData.loan_calculations.total_of_payments`
- ❌ `cdf.loan_calculations.finance_charge`
  ✅ `cdfData.loan_calculations.finance_charge`
- ❌ `cdf.loan_calculations.amount_financed`
  ✅ `cdfData.loan_calculations.amount_financed`
- ❌ `cdf.loan_calculations.annual_percentage_rate`
  ✅ `cdfData.loan_calculations.annual_percentage_rate`
- ❌ `cdf.loan_calculations.total_interest_percentage`
  ✅ `cdfData.loan_calculations.total_interest_percentage`

### loan-disclosures
Fields: 18

**Corrections needed:**
- ❌ `cdf.loans.0.loan_disclosures.assumption`
  ✅ `cdfData.loans.0.loan_disclosures.assumption`
- ❌ `cdf.loans.0.loan_disclosures.assumption`
  ✅ `cdfData.loans.0.loan_disclosures.assumption`
- ❌ `cdf.loans.0.loan_disclosures.demand_feature`
  ✅ `cdfData.loans.0.loan_disclosures.demand_feature`
- ❌ `cdf.loans.0.loan_disclosures.demand_feature`
  ✅ `cdfData.loans.0.loan_disclosures.demand_feature`
- ❌ `cdf.loans.0.penalty_grace_period_days`
  ✅ `cdfData.loans.0.penalty_grace_period_days`
- ❌ `cdf.loans.0.late_penalty_amount`
  ✅ `cdfData.loans.0.late_penalty_amount`
- ❌ `cdf.loans.0.loan_disclosures.negative_amortization`
  ✅ `cdfData.loans.0.loan_disclosures.negative_amortization`
- ❌ `cdf.loans.0.loan_disclosures.negative_amortization`
  ✅ `cdfData.loans.0.loan_disclosures.negative_amortization`
- ❌ `cdf.loans.0.loan_disclosures.negative_amortization`
  ✅ `cdfData.loans.0.loan_disclosures.negative_amortization`
- ❌ `cdf.loans.0.loan_disclosures.partial_payments_may_accept`
  ✅ `cdfData.loans.0.loan_disclosures.partial_payments_may_accept`
- ❌ `cdf.loans.0.loan_disclosures.partial_payments_may_hold`
  ✅ `cdfData.loans.0.loan_disclosures.partial_payments_may_hold`
- ❌ `cdf.loans.0.loan_disclosures.partial_payments_does_not_accept`
  ✅ `cdfData.loans.0.loan_disclosures.partial_payments_does_not_accept`
- ❌ `cdf.loans.0.loan_disclosures.escrow_account`
  ✅ `cdfData.loans.0.loan_disclosures.escrow_account`
- ❌ `cdf.loans.0.loan_disclosures.escrow_account`
  ✅ `cdfData.loans.0.loan_disclosures.escrow_account`
- ❌ `cdf.loans.0.loan_disclosures.no_escrow_reason`
  ✅ `cdfData.loans.0.loan_disclosures.no_escrow_reason`
- ❌ `cdf.loans.0.loan_disclosures.no_escrow_reason`
  ✅ `cdfData.loans.0.loan_disclosures.no_escrow_reason`
- ❌ `cdf.loans.0.loan_disclosures.estimated_property_costs_over_year_1`
  ✅ `cdfData.loans.0.loan_disclosures.estimated_property_costs_over_year_1`
- ❌ `cdf.loans.0.loan_disclosures.escrow_waiver_fee`
  ✅ `cdfData.loans.0.loan_disclosures.escrow_waiver_fee`

### loan-terms
Fields: 15

**Corrections needed:**
- ❌ `cdf.loans.0.loan_type`
  ✅ `cdfData.loans.0.loan_type`
- ❌ `cdf.loans.0.loan_purpose`
  ✅ `cdfData.loans.0.loan_purpose`
- ❌ `cdf.loans.0.loan_product`
  ✅ `cdfData.loans.0.loan_product`
- ❌ `cdf.loans.0.initial_loan_amount`
  ✅ `cdfData.loans.0.initial_loan_amount`
- ❌ `cdf.loans.0.initial_loan_amount_can_increase`
  ✅ `cdfData.loans.0.initial_loan_amount_can_increase`
- ❌ `cdf.loans.0.interest_rate`
  ✅ `cdfData.loans.0.interest_rate`
- ❌ `cdf.loans.0.interest_rate_can_increase`
  ✅ `cdfData.loans.0.interest_rate_can_increase`
- ❌ `cdf.loans.0.monthly_principal_and_interest`
  ✅ `cdfData.loans.0.monthly_principal_and_interest`
- ❌ `cdf.loans.0.monthly_principal_and_interest_can_increase`
  ✅ `cdfData.loans.0.monthly_principal_and_interest_can_increase`
- ❌ `cdf.loans.0.has_prepayment_penalty`
  ✅ `cdfData.loans.0.has_prepayment_penalty`
- ❌ `cdf.loans.0.has_balloon_payment`
  ✅ `cdfData.loans.0.has_balloon_payment`
- ❌ `cdf.loans.0.balloon_payment_description.0`
  ✅ `cdfData.loans.0.balloon_payment_description.0`
- ❌ `cdf.loans.0.has_balloon_payment`
  ✅ `cdfData.loans.0.has_balloon_payment`

### loan
Fields: 19

**Corrections needed:**
- ❌ `cdf.loans.0.initial_loan_amount`
  ✅ `cdfData.loans.0.initial_loan_amount`
- ❌ `cdf.loans.0.funding_type`
  ✅ `cdfData.loans.0.funding_type`
- ❌ `cdf.loans.0.loan_term_years`
  ✅ `cdfData.loans.0.loan_term_years`
- ❌ `cdf.loans.0.loan_term_months`
  ✅ `cdfData.loans.0.loan_term_months`
- ❌ `cdf.loans.0.first_payment_date`
  ✅ `cdfData.loans.0.first_payment_date`
- ❌ `cdf.loans.0.last_payment_date`
  ✅ `cdfData.loans.0.last_payment_date`
- ❌ `cdf.loans.0.mortgage_commitment_date`
  ✅ `cdfData.loans.0.mortgage_commitment_date`
- ❌ `cdf.loans.0.loan_number`
  ✅ `cdfData.loans.0.loan_number`
- ❌ `cdf.loans.0.mortgage_insurance_case_number`
  ✅ `cdfData.loans.0.mortgage_insurance_case_number`
- ❌ `cdf.loans.0.penalty_grace_period_days`
  ✅ `cdfData.loans.0.penalty_grace_period_days`
- ❌ `cdf.loans.0.late_penalty_amount`
  ✅ `cdfData.loans.0.late_penalty_amount`
- ❌ `cdf.loans.0.late_penalty_type`
  ✅ `cdfData.loans.0.late_penalty_type`
- ❌ `cdf.loans.0.interest_only`
  ✅ `cdfData.loans.0.interest_only`
- ❌ `cdf.loans.0.interest_rate`
  ✅ `cdfData.loans.0.interest_rate`
- ❌ `cdf.loans.0.interest_type`
  ✅ `cdfData.loans.0.interest_type`
- ❌ `cdf.loans.0.is_heloc`
  ✅ `cdfData.loans.0.is_heloc`
- ❌ `cdf.loans.0.is_construction_loan`
  ✅ `cdfData.loans.0.is_construction_loan`
- ❌ `cdf.loans.0.is_MERS`
  ✅ `cdfData.loans.0.is_MERS`
- ❌ `cdf.loans.0.generating_mortgage_docs`
  ✅ `cdfData.loans.0.generating_mortgage_docs`

### origination-charges
Fields: 88

**Corrections needed:**
- ❌ `cdf.origination_charges.line_01.description`
  ✅ `cdfData.origination_charges.line_01.description`
- ❌ `cdf.origination_charges.line_01.payee_name`
  ✅ `cdfData.origination_charges.line_01.payee_name`
- ❌ `cdf.origination_charges.line_01.borrower_amount`
  ✅ `cdfData.origination_charges.line_01.paid_by_borrower`
- ❌ `cdf.origination_charges.line_01.before_borrower_amount`
  ✅ `cdfData.origination_charges.line_01.paid_before_closing`
- ❌ `cdf.origination_charges.line_01.seller_amount`
  ✅ `cdfData.origination_charges.line_01.paid_by_seller`
- ❌ `cdf.origination_charges.line_01.before_seller_amount`
  ✅ `cdfData.origination_charges.line_01.before_seller_amount`
- ❌ `cdf.origination_charges.line_01.paid_by_others_amount`
  ✅ `cdfData.origination_charges.line_01.paid_by_others`
- ❌ `cdf.origination_charges.line_02.description`
  ✅ `cdfData.origination_charges.line_02.description`
- ❌ `cdf.origination_charges.line_02.payee_name`
  ✅ `cdfData.origination_charges.line_02.payee_name`
- ❌ `cdf.origination_charges.line_02.borrower_amount`
  ✅ `cdfData.origination_charges.line_02.paid_by_borrower`
- ❌ `cdf.origination_charges.line_02.before_borrower_amount`
  ✅ `cdfData.origination_charges.line_02.paid_before_closing`
- ❌ `cdf.origination_charges.line_02.seller_amount`
  ✅ `cdfData.origination_charges.line_02.paid_by_seller`
- ❌ `cdf.origination_charges.line_02.before_seller_amount`
  ✅ `cdfData.origination_charges.line_02.before_seller_amount`
- ❌ `cdf.origination_charges.line_02.paid_by_others_amount`
  ✅ `cdfData.origination_charges.line_02.paid_by_others`
- ❌ `cdf.origination_charges.line_03.description`
  ✅ `cdfData.origination_charges.line_03.description`
- ❌ `cdf.origination_charges.line_03.payee_name`
  ✅ `cdfData.origination_charges.line_03.payee_name`
- ❌ `cdf.origination_charges.line_03.borrower_amount`
  ✅ `cdfData.origination_charges.line_03.paid_by_borrower`
- ❌ `cdf.origination_charges.line_03.before_borrower_amount`
  ✅ `cdfData.origination_charges.line_03.paid_before_closing`
- ❌ `cdf.origination_charges.line_03.seller_amount`
  ✅ `cdfData.origination_charges.line_03.paid_by_seller`
- ❌ `cdf.origination_charges.line_03.before_seller_amount`
  ✅ `cdfData.origination_charges.line_03.before_seller_amount`
- ❌ `cdf.origination_charges.line_03.paid_by_others_amount`
  ✅ `cdfData.origination_charges.line_03.paid_by_others`
- ❌ `cdf.origination_charges.line_04.description`
  ✅ `cdfData.origination_charges.line_04.description`
- ❌ `cdf.origination_charges.line_04.payee_name`
  ✅ `cdfData.origination_charges.line_04.payee_name`
- ❌ `cdf.origination_charges.line_04.borrower_amount`
  ✅ `cdfData.origination_charges.line_04.paid_by_borrower`
- ❌ `cdf.origination_charges.line_04.before_borrower_amount`
  ✅ `cdfData.origination_charges.line_04.paid_before_closing`
- ❌ `cdf.origination_charges.line_04.seller_amount`
  ✅ `cdfData.origination_charges.line_04.paid_by_seller`
- ❌ `cdf.origination_charges.line_04.before_seller_amount`
  ✅ `cdfData.origination_charges.line_04.before_seller_amount`
- ❌ `cdf.origination_charges.line_04.paid_by_others_amount`
  ✅ `cdfData.origination_charges.line_04.paid_by_others`
- ❌ `cdf.origination_charges.line_05.description`
  ✅ `cdfData.origination_charges.line_05.description`
- ❌ `cdf.origination_charges.line_05.payee_name`
  ✅ `cdfData.origination_charges.line_05.payee_name`
- ❌ `cdf.origination_charges.line_05.borrower_amount`
  ✅ `cdfData.origination_charges.line_05.paid_by_borrower`
- ❌ `cdf.origination_charges.line_05.before_borrower_amount`
  ✅ `cdfData.origination_charges.line_05.paid_before_closing`
- ❌ `cdf.origination_charges.line_05.seller_amount`
  ✅ `cdfData.origination_charges.line_05.paid_by_seller`
- ❌ `cdf.origination_charges.line_05.before_seller_amount`
  ✅ `cdfData.origination_charges.line_05.before_seller_amount`
- ❌ `cdf.origination_charges.line_05.paid_by_others_amount`
  ✅ `cdfData.origination_charges.line_05.paid_by_others`
- ❌ `cdf.origination_charges.line_06.description`
  ✅ `cdfData.origination_charges.line_06.description`
- ❌ `cdf.origination_charges.line_06.payee_name`
  ✅ `cdfData.origination_charges.line_06.payee_name`
- ❌ `cdf.origination_charges.line_06.borrower_amount`
  ✅ `cdfData.origination_charges.line_06.paid_by_borrower`
- ❌ `cdf.origination_charges.line_06.before_borrower_amount`
  ✅ `cdfData.origination_charges.line_06.paid_before_closing`
- ❌ `cdf.origination_charges.line_06.seller_amount`
  ✅ `cdfData.origination_charges.line_06.paid_by_seller`
- ❌ `cdf.origination_charges.line_06.before_seller_amount`
  ✅ `cdfData.origination_charges.line_06.before_seller_amount`
- ❌ `cdf.origination_charges.line_06.paid_by_others_amount`
  ✅ `cdfData.origination_charges.line_06.paid_by_others`
- ❌ `cdf.origination_charges.line_07.description`
  ✅ `cdfData.origination_charges.line_07.description`
- ❌ `cdf.origination_charges.line_07.payee_name`
  ✅ `cdfData.origination_charges.line_07.payee_name`
- ❌ `cdf.origination_charges.line_07.borrower_amount`
  ✅ `cdfData.origination_charges.line_07.paid_by_borrower`
- ❌ `cdf.origination_charges.line_07.before_borrower_amount`
  ✅ `cdfData.origination_charges.line_07.paid_before_closing`
- ❌ `cdf.origination_charges.line_07.seller_amount`
  ✅ `cdfData.origination_charges.line_07.paid_by_seller`
- ❌ `cdf.origination_charges.line_07.before_seller_amount`
  ✅ `cdfData.origination_charges.line_07.before_seller_amount`
- ❌ `cdf.origination_charges.line_07.paid_by_others_amount`
  ✅ `cdfData.origination_charges.line_07.paid_by_others`
- ❌ `cdf.origination_charges.line_08.description`
  ✅ `cdfData.origination_charges.line_08.description`
- ❌ `cdf.origination_charges.line_08.payee_name`
  ✅ `cdfData.origination_charges.line_08.payee_name`
- ❌ `cdf.origination_charges.line_08.borrower_amount`
  ✅ `cdfData.origination_charges.line_08.paid_by_borrower`
- ❌ `cdf.origination_charges.line_08.before_borrower_amount`
  ✅ `cdfData.origination_charges.line_08.paid_before_closing`
- ❌ `cdf.origination_charges.line_08.seller_amount`
  ✅ `cdfData.origination_charges.line_08.paid_by_seller`
- ❌ `cdf.origination_charges.line_08.before_seller_amount`
  ✅ `cdfData.origination_charges.line_08.before_seller_amount`
- ❌ `cdf.origination_charges.line_08.paid_by_others_amount`
  ✅ `cdfData.origination_charges.line_08.paid_by_others`
- ❌ `cdf.origination_charges.other_charges.0.description`
  ✅ `cdfData.origination_charges.other_charges.0.description`
- ❌ `cdf.origination_charges.other_charges.0.payee_name`
  ✅ `cdfData.origination_charges.other_charges.0.payee_name`
- ❌ `cdf.origination_charges.other_charges.0.borrower_amount`
  ✅ `cdfData.origination_charges.other_charges.0.paid_by_borrower`
- ❌ `cdf.origination_charges.other_charges.0.before_borrower_amount`
  ✅ `cdfData.origination_charges.other_charges.0.paid_before_closing`
- ❌ `cdf.origination_charges.other_charges.0.seller_amount`
  ✅ `cdfData.origination_charges.other_charges.0.paid_by_seller`
- ❌ `cdf.origination_charges.other_charges.0.before_seller_amount`
  ✅ `cdfData.origination_charges.other_charges.0.before_seller_amount`
- ❌ `cdf.origination_charges.other_charges.0.paid_by_others_amount`
  ✅ `cdfData.origination_charges.other_charges.0.paid_by_others`
- ❌ `cdf.origination_charges.line_06.payees.0.type`
  ✅ `cdfData.origination_charges.line_06.payees.0.type`
- ❌ `cdf.origination_charges.line_06.payees.0.name_dep`
  ✅ `cdfData.origination_charges.line_06.payees.0.name_dep`
- ❌ `cdf.origination_charges.line_06.payees.0.payment_dep`
  ✅ `cdfData.origination_charges.line_06.payees.0.payment_dep`
- ❌ `cdf.origination_charges.line_06.payees.0.label.payee_label_id`
  ✅ `cdfData.origination_charges.line_06.payees.0.label.payee_label_id`
- ❌ `cdf.origination_charges.line_06.payees.0.reference_number`
  ✅ `cdfData.origination_charges.line_06.payees.0.reference_number`
- ❌ `cdf.origination_charges.line_06.payees.0.address.latitude`
  ✅ `cdfData.origination_charges.line_06.payees.0.address.latitude`
- ❌ `cdf.origination_charges.line_06.payees.0.address.longitude`
  ✅ `cdfData.origination_charges.line_06.payees.0.address.longitude`
- ❌ `cdf.origination_charges.line_06.payees.0.address.address_1`
  ✅ `cdfData.origination_charges.line_06.payees.0.address.address_1`
- ❌ `cdf.origination_charges.line_06.payees.0.address.address_2`
  ✅ `cdfData.origination_charges.line_06.payees.0.address.address_2`
- ❌ `cdf.origination_charges.line_06.payees.0.address.city`
  ✅ `cdfData.origination_charges.line_06.payees.0.address.city`
- ❌ `cdf.origination_charges.line_06.payees.0.address.state`
  ✅ `cdfData.origination_charges.line_06.payees.0.address.state`
- ❌ `cdf.origination_charges.line_06.payees.0.address.zipcode`
  ✅ `cdfData.origination_charges.line_06.payees.0.address.zipcode`
- ❌ `cdf.origination_charges.line_06.payees.0.reference_number`
  ✅ `cdfData.origination_charges.line_06.payees.0.reference_number`
- ❌ `cdf.origination_charges.line_06.payees.0.aggregate_payee_id`
  ✅ `cdfData.origination_charges.line_06.payees.0.aggregate_payee_id`
- ❌ `cdf.origination_charges.line_06.payees.0.payment_dep`
  ✅ `cdfData.origination_charges.line_06.payees.0.payment_dep`
- ❌ `cdf.origination_charges.line_06.payees.0.label.payee_label_id`
  ✅ `cdfData.origination_charges.line_06.payees.0.label.payee_label_id`
- ❌ `cdf.origination_charges.line_06.payees.0.order_transfer_order_id`
  ✅ `cdfData.origination_charges.line_06.payees.0.order_transfer_order_id`
- ❌ `cdf.origination_charges.line_06.payees.0.order_transfer_for_benefit_of`
  ✅ `cdfData.origination_charges.line_06.payees.0.order_transfer_for_benefit_of`
- ❌ `cdf.origination_charges.line_06.payees.0.holdback_release_note`
  ✅ `cdfData.origination_charges.line_06.payees.0.holdback_release_note`
- ❌ `cdf.origination_charges.line_06.payees.0.holdback_release_date`
  ✅ `cdfData.origination_charges.line_06.payees.0.holdback_release_date`

### other-charges
Fields: 48

**Corrections needed:**
- ❌ `cdf.other_charges.0.description`
  ✅ `cdfData.other_charges.0.description`
- ❌ `cdf.other_charges.0.amount`
  ✅ `cdfData.other_charges.0.amount`
- ❌ `cdf.other_charges.0.paid_by_borrower`
  ✅ `cdfData.other_charges.0.paid_by_borrower`
- ❌ `cdf.other_charges.0.paid_by_seller`
  ✅ `cdfData.other_charges.0.paid_by_seller`
- ❌ `cdf.other_charges.1.description`
  ✅ `cdfData.other_charges.1.description`
- ❌ `cdf.other_charges.1.amount`
  ✅ `cdfData.other_charges.1.amount`
- ❌ `cdf.other_charges.1.paid_by_borrower`
  ✅ `cdfData.other_charges.1.paid_by_borrower`
- ❌ `cdf.other_charges.1.paid_by_seller`
  ✅ `cdfData.other_charges.1.paid_by_seller`
- ❌ `cdf.other_charges.2.description`
  ✅ `cdfData.other_charges.2.description`
- ❌ `cdf.other_charges.2.amount`
  ✅ `cdfData.other_charges.2.amount`
- ❌ `cdf.other_charges.2.paid_by_borrower`
  ✅ `cdfData.other_charges.2.paid_by_borrower`
- ❌ `cdf.other_charges.2.paid_by_seller`
  ✅ `cdfData.other_charges.2.paid_by_seller`
- ❌ `cdf.other_charges.3.description`
  ✅ `cdfData.other_charges.3.description`
- ❌ `cdf.other_charges.3.amount`
  ✅ `cdfData.other_charges.3.amount`
- ❌ `cdf.other_charges.3.paid_by_borrower`
  ✅ `cdfData.other_charges.3.paid_by_borrower`
- ❌ `cdf.other_charges.3.paid_by_seller`
  ✅ `cdfData.other_charges.3.paid_by_seller`
- ❌ `cdf.other_charges.4.description`
  ✅ `cdfData.other_charges.4.description`
- ❌ `cdf.other_charges.4.amount`
  ✅ `cdfData.other_charges.4.amount`
- ❌ `cdf.other_charges.4.paid_by_borrower`
  ✅ `cdfData.other_charges.4.paid_by_borrower`
- ❌ `cdf.other_charges.4.paid_by_seller`
  ✅ `cdfData.other_charges.4.paid_by_seller`
- ❌ `cdf.other_charges.5.description`
  ✅ `cdfData.other_charges.5.description`
- ❌ `cdf.other_charges.5.amount`
  ✅ `cdfData.other_charges.5.amount`
- ❌ `cdf.other_charges.5.paid_by_borrower`
  ✅ `cdfData.other_charges.5.paid_by_borrower`
- ❌ `cdf.other_charges.5.paid_by_seller`
  ✅ `cdfData.other_charges.5.paid_by_seller`
- ❌ `cdf.other_charges.6.description`
  ✅ `cdfData.other_charges.6.description`
- ❌ `cdf.other_charges.6.amount`
  ✅ `cdfData.other_charges.6.amount`
- ❌ `cdf.other_charges.6.paid_by_borrower`
  ✅ `cdfData.other_charges.6.paid_by_borrower`
- ❌ `cdf.other_charges.6.paid_by_seller`
  ✅ `cdfData.other_charges.6.paid_by_seller`
- ❌ `cdf.other_charges.7.description`
  ✅ `cdfData.other_charges.7.description`
- ❌ `cdf.other_charges.7.amount`
  ✅ `cdfData.other_charges.7.amount`
- ❌ `cdf.other_charges.7.paid_by_borrower`
  ✅ `cdfData.other_charges.7.paid_by_borrower`
- ❌ `cdf.other_charges.7.paid_by_seller`
  ✅ `cdfData.other_charges.7.paid_by_seller`
- ❌ `cdf.other_charges_settings.line_is_taxable`
  ✅ `cdfData.other_charges_settings.line_is_taxable`
- ❌ `cdf.other_charges_payment.amount`
  ✅ `cdfData.other_charges_payment.amount`
- ❌ `cdf.other_charges_payment.payee`
  ✅ `cdfData.other_charges_payment.payee`
- ❌ `cdf.other_charges_payment.date`
  ✅ `cdfData.other_charges_payment.date`
- ❌ `cdf.other_charges_payment.reference_number`
  ✅ `cdfData.other_charges_payment.reference_number`
- ❌ `cdf.other_charges_payment.check.memo`
  ✅ `cdfData.other_charges_payment.check.memo`
- ❌ `cdf.other_charges_payment.check.mailing_address`
  ✅ `cdfData.other_charges_payment.check.mailing_address`
- ❌ `cdf.other_charges_payment.wire.memo`
  ✅ `cdfData.other_charges_payment.wire.memo`
- ❌ `cdf.other_charges_payment.wire.instructions`
  ✅ `cdfData.other_charges_payment.wire.instructions`
- ❌ `cdf.other_charges_payment.aggregate.global_payee`
  ✅ `cdfData.other_charges_payment.aggregate.global_payee`
- ❌ `cdf.other_charges_payment.transfer.type`
  ✅ `cdfData.other_charges_payment.transfer.type`
- ❌ `cdf.other_charges_payment.transfer.processing_fee`
  ✅ `cdfData.other_charges_payment.transfer.processing_fee`
- ❌ `cdf.other_charges_payment.transfer.instructions`
  ✅ `cdfData.other_charges_payment.transfer.instructions`
- ❌ `cdf.other_charges_payment.holdback.reason`
  ✅ `cdfData.other_charges_payment.holdback.reason`
- ❌ `cdf.other_charges_payment.holdback.release_date`
  ✅ `cdfData.other_charges_payment.holdback.release_date`
- ❌ `cdf.other_charges_payment.holdback.release_conditions`
  ✅ `cdfData.other_charges_payment.holdback.release_conditions`

### payoffs
Fields: 16

**Corrections needed:**
- ❌ `payoffs.0.lender_name`
  ✅ `payoffsData.0.lender_name`
- ❌ `payoffs.0.loan_number`
  ✅ `payoffsData.0.loan_number`
- ❌ `payoffs.0.payoff_amount`
  ✅ `payoffsData.0.payoff_amount`
- ❌ `payoffs.0.good_through_date`
  ✅ `payoffsData.0.good_through_date`
- ❌ `payoffs.1.lender_name`
  ✅ `payoffsData.1.lender_name`
- ❌ `payoffs.1.loan_number`
  ✅ `payoffsData.1.loan_number`
- ❌ `payoffs.1.payoff_amount`
  ✅ `payoffsData.1.payoff_amount`
- ❌ `payoffs.1.good_through_date`
  ✅ `payoffsData.1.good_through_date`
- ❌ `payoffs.2.lender_name`
  ✅ `payoffsData.2.lender_name`
- ❌ `payoffs.2.loan_number`
  ✅ `payoffsData.2.loan_number`
- ❌ `payoffs.2.payoff_amount`
  ✅ `payoffsData.2.payoff_amount`
- ❌ `payoffs.2.good_through_date`
  ✅ `payoffsData.2.good_through_date`
- ❌ `payoffs.3.lender_name`
  ✅ `payoffsData.3.lender_name`
- ❌ `payoffs.3.loan_number`
  ✅ `payoffsData.3.loan_number`
- ❌ `payoffs.3.payoff_amount`
  ✅ `payoffsData.3.payoff_amount`
- ❌ `payoffs.3.good_through_date`
  ✅ `payoffsData.3.good_through_date`

### prepaids
Fields: 56

**Corrections needed:**
- ❌ `cdf.prepaid_item_information.line_01.description`
  ✅ `cdfData.prepaid_item_information.line_01.description`
- ❌ `cdf.prepaid_item_information.line_01.payee_name`
  ✅ `cdfData.prepaid_item_information.line_01.payee_name`
- ❌ `cdf.prepaid_item_information.line_01.borrower_amount`
  ✅ `cdfData.prepaid_item_information.line_01.paid_by_borrower`
- ❌ `cdf.prepaid_item_information.line_01.before_borrower_amount`
  ✅ `cdfData.prepaid_item_information.line_01.paid_before_closing`
- ❌ `cdf.prepaid_item_information.line_01.seller_amount`
  ✅ `cdfData.prepaid_item_information.line_01.paid_by_seller`
- ❌ `cdf.prepaid_item_information.line_01.before_seller_amount`
  ✅ `cdfData.prepaid_item_information.line_01.before_seller_amount`
- ❌ `cdf.prepaid_item_information.line_01.paid_by_others_amount`
  ✅ `cdfData.prepaid_item_information.line_01.paid_by_others`
- ❌ `cdf.prepaid_item_information.line_02.description`
  ✅ `cdfData.prepaid_item_information.line_02.description`
- ❌ `cdf.prepaid_item_information.line_02.payee_name`
  ✅ `cdfData.prepaid_item_information.line_02.payee_name`
- ❌ `cdf.prepaid_item_information.line_02.borrower_amount`
  ✅ `cdfData.prepaid_item_information.line_02.paid_by_borrower`
- ❌ `cdf.prepaid_item_information.line_02.before_borrower_amount`
  ✅ `cdfData.prepaid_item_information.line_02.paid_before_closing`
- ❌ `cdf.prepaid_item_information.line_02.seller_amount`
  ✅ `cdfData.prepaid_item_information.line_02.paid_by_seller`
- ❌ `cdf.prepaid_item_information.line_02.before_seller_amount`
  ✅ `cdfData.prepaid_item_information.line_02.before_seller_amount`
- ❌ `cdf.prepaid_item_information.line_02.paid_by_others_amount`
  ✅ `cdfData.prepaid_item_information.line_02.paid_by_others`
- ❌ `cdf.prepaid_item_information.line_03.description`
  ✅ `cdfData.prepaid_item_information.line_03.description`
- ❌ `cdf.prepaid_item_information.line_03.payee_name`
  ✅ `cdfData.prepaid_item_information.line_03.payee_name`
- ❌ `cdf.prepaid_item_information.line_03.borrower_amount`
  ✅ `cdfData.prepaid_item_information.line_03.paid_by_borrower`
- ❌ `cdf.prepaid_item_information.line_03.before_borrower_amount`
  ✅ `cdfData.prepaid_item_information.line_03.paid_before_closing`
- ❌ `cdf.prepaid_item_information.line_03.seller_amount`
  ✅ `cdfData.prepaid_item_information.line_03.paid_by_seller`
- ❌ `cdf.prepaid_item_information.line_03.before_seller_amount`
  ✅ `cdfData.prepaid_item_information.line_03.before_seller_amount`
- ❌ `cdf.prepaid_item_information.line_03.paid_by_others_amount`
  ✅ `cdfData.prepaid_item_information.line_03.paid_by_others`
- ❌ `cdf.prepaid_item_information.line_04.description`
  ✅ `cdfData.prepaid_item_information.line_04.description`
- ❌ `cdf.prepaid_item_information.line_04.payee_name`
  ✅ `cdfData.prepaid_item_information.line_04.payee_name`
- ❌ `cdf.prepaid_item_information.line_04.borrower_amount`
  ✅ `cdfData.prepaid_item_information.line_04.paid_by_borrower`
- ❌ `cdf.prepaid_item_information.line_04.before_borrower_amount`
  ✅ `cdfData.prepaid_item_information.line_04.paid_before_closing`
- ❌ `cdf.prepaid_item_information.line_04.seller_amount`
  ✅ `cdfData.prepaid_item_information.line_04.paid_by_seller`
- ❌ `cdf.prepaid_item_information.line_04.before_seller_amount`
  ✅ `cdfData.prepaid_item_information.line_04.before_seller_amount`
- ❌ `cdf.prepaid_item_information.line_04.paid_by_others_amount`
  ✅ `cdfData.prepaid_item_information.line_04.paid_by_others`
- ❌ `cdf.prepaid_item_information.line_05.description`
  ✅ `cdfData.prepaid_item_information.line_05.description`
- ❌ `cdf.prepaid_item_information.line_05.payee_name`
  ✅ `cdfData.prepaid_item_information.line_05.payee_name`
- ❌ `cdf.prepaid_item_information.line_05.borrower_amount`
  ✅ `cdfData.prepaid_item_information.line_05.paid_by_borrower`
- ❌ `cdf.prepaid_item_information.line_05.before_borrower_amount`
  ✅ `cdfData.prepaid_item_information.line_05.paid_before_closing`
- ❌ `cdf.prepaid_item_information.line_05.seller_amount`
  ✅ `cdfData.prepaid_item_information.line_05.paid_by_seller`
- ❌ `cdf.prepaid_item_information.line_05.before_seller_amount`
  ✅ `cdfData.prepaid_item_information.line_05.before_seller_amount`
- ❌ `cdf.prepaid_item_information.line_05.paid_by_others_amount`
  ✅ `cdfData.prepaid_item_information.line_05.paid_by_others`
- ❌ `cdf.prepaid_item_information.line_01.description`
  ✅ `cdfData.prepaid_item_information.line_01.description`
- ❌ `cdf.prepaid_item_information.line_01.number_of_months`
  ✅ `cdfData.prepaid_item_information.line_01.number_of_months`
- ❌ `cdf.prepaid_item_information.line_01.payees.0.type`
  ✅ `cdfData.prepaid_item_information.line_01.payees.0.type`
- ❌ `cdf.prepaid_item_information.line_01.payees.0.name_dep`
  ✅ `cdfData.prepaid_item_information.line_01.payees.0.name_dep`
- ❌ `cdf.prepaid_item_information.line_01.payees.0.payment_dep`
  ✅ `cdfData.prepaid_item_information.line_01.payees.0.payment_dep`
- ❌ `cdf.prepaid_item_information.line_01.payees.0.label.payee_label_id`
  ✅ `cdfData.prepaid_item_information.line_01.payees.0.label.payee_label_id`
- ❌ `cdf.prepaid_item_information.line_01.payees.0.reference_number`
  ✅ `cdfData.prepaid_item_information.line_01.payees.0.reference_number`
- ❌ `cdf.prepaid_item_information.line_01.payees.0.address.address_1`
  ✅ `cdfData.prepaid_item_information.line_01.payees.0.address.address_1`
- ❌ `cdf.prepaid_item_information.line_01.payees.0.address.address_2`
  ✅ `cdfData.prepaid_item_information.line_01.payees.0.address.address_2`
- ❌ `cdf.prepaid_item_information.line_01.payees.0.address.city`
  ✅ `cdfData.prepaid_item_information.line_01.payees.0.address.city`
- ❌ `cdf.prepaid_item_information.line_01.payees.0.address.state`
  ✅ `cdfData.prepaid_item_information.line_01.payees.0.address.state`
- ❌ `cdf.prepaid_item_information.line_01.payees.0.address.zipcode`
  ✅ `cdfData.prepaid_item_information.line_01.payees.0.address.zipcode`

### proceeds-borrower
Fields: 11

**Corrections needed:**
- ❌ `contacts.borrower_payees.0.type`
  ✅ `contactsData.borrower_payees.0.type`
- ❌ `contacts.borrower_payees.0.name`
  ✅ `contactsData.borrower_payees.0.name`
- ❌ `contacts.borrower_payees.0.payment_dep`
  ✅ `contactsData.borrower_payees.0.payment_dep`
- ❌ `contacts.borrower_payees.0.reference_number`
  ✅ `contactsData.borrower_payees.0.reference_number`
- ❌ `contacts.borrower_payees.0.address.latitude`
  ✅ `contactsData.borrower_payees.0.address.latitude`
- ❌ `contacts.borrower_payees.0.address.longitude`
  ✅ `contactsData.borrower_payees.0.address.longitude`
- ❌ `contacts.borrower_payees.0.address.address_1`
  ✅ `contactsData.borrower_payees.0.address.address_1`
- ❌ `contacts.borrower_payees.0.address.address_2`
  ✅ `contactsData.borrower_payees.0.address.address_2`
- ❌ `contacts.borrower_payees.0.address.city`
  ✅ `contactsData.borrower_payees.0.address.city`
- ❌ `contacts.borrower_payees.0.address.state`
  ✅ `contactsData.borrower_payees.0.address.state`
- ❌ `contacts.borrower_payees.0.address.zipcode`
  ✅ `contactsData.borrower_payees.0.address.zipcode`

### proceeds-seller
Fields: 11

**Corrections needed:**
- ❌ `contacts.seller_payees.0.type`
  ✅ `contactsData.seller_payees.0.type`
- ❌ `contacts.seller_payees.0.name`
  ✅ `contactsData.seller_payees.0.name`
- ❌ `contacts.seller_payees.0.payment_dep`
  ✅ `contactsData.seller_payees.0.payment_dep`
- ❌ `contacts.seller_payees.0.reference_number`
  ✅ `contactsData.seller_payees.0.reference_number`
- ❌ `contacts.seller_payees.0.address.latitude`
  ✅ `contactsData.seller_payees.0.address.latitude`
- ❌ `contacts.seller_payees.0.address.longitude`
  ✅ `contactsData.seller_payees.0.address.longitude`
- ❌ `contacts.seller_payees.0.address.address_1`
  ✅ `contactsData.seller_payees.0.address.address_1`
- ❌ `contacts.seller_payees.0.address.address_2`
  ✅ `contactsData.seller_payees.0.address.address_2`
- ❌ `contacts.seller_payees.0.address.city`
  ✅ `contactsData.seller_payees.0.address.city`
- ❌ `contacts.seller_payees.0.address.state`
  ✅ `contactsData.seller_payees.0.address.state`
- ❌ `contacts.seller_payees.0.address.zipcode`
  ✅ `contactsData.seller_payees.0.address.zipcode`

### projected-payments
Fields: 13

**Corrections needed:**
- ❌ `cdf.loans.0.payment_projections.0.start_year`
  ✅ `cdfData.loans.0.payment_projections.0.start_year`
- ❌ `cdf.loans.0.payment_projections.0.end_year`
  ✅ `cdfData.loans.0.payment_projections.0.end_year`
- ❌ `cdf.loans.0.payment_projections.0.principal_and_interest_type`
  ✅ `cdfData.loans.0.payment_projections.0.principal_and_interest_type`
- ❌ `cdf.loans.0.payment_projections.0.principal_and_interest`
  ✅ `cdfData.loans.0.payment_projections.0.principal_and_interest`
- ❌ `cdf.loans.0.payment_projections.0.interest_only`
  ✅ `cdfData.loans.0.payment_projections.0.interest_only`
- ❌ `cdf.loans.0.payment_projections.0.mortgage_insurance`
  ✅ `cdfData.loans.0.payment_projections.0.mortgage_insurance`
- ❌ `cdf.loans.0.payment_projections.0.estimated_escrow`
  ✅ `cdfData.loans.0.payment_projections.0.estimated_escrow`
- ❌ `cdf.loans.0.taxes_insurance_assessments.amount`
  ✅ `cdfData.loans.0.taxes_insurance_assessments.amount`
- ❌ `cdf.loans.0.taxes_insurance_assessments.payment_period`
  ✅ `cdfData.loans.0.taxes_insurance_assessments.payment_period`
- ❌ `cdf.loans.0.taxes_insurance_assessments.includes_property_taxes`
  ✅ `cdfData.loans.0.taxes_insurance_assessments.includes_property_taxes`
- ❌ `cdf.loans.0.taxes_insurance_assessments.includes_homeowners_insurance`
  ✅ `cdfData.loans.0.taxes_insurance_assessments.includes_homeowners_insurance`
- ❌ `cdf.loans.0.taxes_insurance_assessments.includes_other`
  ✅ `cdfData.loans.0.taxes_insurance_assessments.includes_other`
- ❌ `cdf.loans.0.taxes_insurance_assessments.other_description`
  ✅ `cdfData.loans.0.taxes_insurance_assessments.other_description`

### taxes-and-fees
Fields: 57

**Corrections needed:**
- ❌ `cdf.taxes_and_government_fees.line_01.description`
  ✅ `cdfData.taxes_and_government_fees.line_01.description`
- ❌ `cdf.taxes_and_government_fees.line_01.payee_name`
  ✅ `cdfData.taxes_and_government_fees.line_01.payee_name`
- ❌ `cdf.taxes_and_government_fees.line_01.borrower_amount`
  ✅ `cdfData.taxes_and_government_fees.line_01.paid_by_borrower`
- ❌ `cdf.taxes_and_government_fees.line_01.before_borrower_amount`
  ✅ `cdfData.taxes_and_government_fees.line_01.paid_before_closing`
- ❌ `cdf.taxes_and_government_fees.line_01.seller_amount`
  ✅ `cdfData.taxes_and_government_fees.line_01.paid_by_seller`
- ❌ `cdf.taxes_and_government_fees.line_01.before_seller_amount`
  ✅ `cdfData.taxes_and_government_fees.line_01.before_seller_amount`
- ❌ `cdf.taxes_and_government_fees.line_01.paid_by_others_amount`
  ✅ `cdfData.taxes_and_government_fees.line_01.paid_by_others`
- ❌ `cdf.taxes_and_government_fees.line_02.description`
  ✅ `cdfData.taxes_and_government_fees.line_02.description`
- ❌ `cdf.taxes_and_government_fees.line_02.payee_name`
  ✅ `cdfData.taxes_and_government_fees.line_02.payee_name`
- ❌ `cdf.taxes_and_government_fees.line_02.borrower_amount`
  ✅ `cdfData.taxes_and_government_fees.line_02.paid_by_borrower`
- ❌ `cdf.taxes_and_government_fees.line_02.before_borrower_amount`
  ✅ `cdfData.taxes_and_government_fees.line_02.paid_before_closing`
- ❌ `cdf.taxes_and_government_fees.line_02.seller_amount`
  ✅ `cdfData.taxes_and_government_fees.line_02.paid_by_seller`
- ❌ `cdf.taxes_and_government_fees.line_02.before_seller_amount`
  ✅ `cdfData.taxes_and_government_fees.line_02.before_seller_amount`
- ❌ `cdf.taxes_and_government_fees.line_02.paid_by_others_amount`
  ✅ `cdfData.taxes_and_government_fees.line_02.paid_by_others`
- ❌ `cdf.taxes_and_government_fees.line_03.description`
  ✅ `cdfData.taxes_and_government_fees.line_03.description`
- ❌ `cdf.taxes_and_government_fees.line_03.payee_name`
  ✅ `cdfData.taxes_and_government_fees.line_03.payee_name`
- ❌ `cdf.taxes_and_government_fees.line_03.borrower_amount`
  ✅ `cdfData.taxes_and_government_fees.line_03.paid_by_borrower`
- ❌ `cdf.taxes_and_government_fees.line_03.before_borrower_amount`
  ✅ `cdfData.taxes_and_government_fees.line_03.paid_before_closing`
- ❌ `cdf.taxes_and_government_fees.line_03.seller_amount`
  ✅ `cdfData.taxes_and_government_fees.line_03.paid_by_seller`
- ❌ `cdf.taxes_and_government_fees.line_03.before_seller_amount`
  ✅ `cdfData.taxes_and_government_fees.line_03.before_seller_amount`
- ❌ `cdf.taxes_and_government_fees.line_03.paid_by_others_amount`
  ✅ `cdfData.taxes_and_government_fees.line_03.paid_by_others`
- ❌ `cdf.taxes_and_government_fees.line_04.description`
  ✅ `cdfData.taxes_and_government_fees.line_04.description`
- ❌ `cdf.taxes_and_government_fees.line_04.payee_name`
  ✅ `cdfData.taxes_and_government_fees.line_04.payee_name`
- ❌ `cdf.taxes_and_government_fees.line_04.borrower_amount`
  ✅ `cdfData.taxes_and_government_fees.line_04.paid_by_borrower`
- ❌ `cdf.taxes_and_government_fees.line_04.before_borrower_amount`
  ✅ `cdfData.taxes_and_government_fees.line_04.paid_before_closing`
- ❌ `cdf.taxes_and_government_fees.line_04.seller_amount`
  ✅ `cdfData.taxes_and_government_fees.line_04.paid_by_seller`
- ❌ `cdf.taxes_and_government_fees.line_04.before_seller_amount`
  ✅ `cdfData.taxes_and_government_fees.line_04.before_seller_amount`
- ❌ `cdf.taxes_and_government_fees.line_04.paid_by_others_amount`
  ✅ `cdfData.taxes_and_government_fees.line_04.paid_by_others`
- ❌ `cdf.taxes_and_government_fees.line_01.deed_amount`
  ✅ `cdfData.taxes_and_government_fees.line_01.deed_amount`
- ❌ `cdf.taxes_and_government_fees.line_01.deed_who_pays`
  ✅ `cdfData.taxes_and_government_fees.line_01.deed_who_pays`
- ❌ `cdf.taxes_and_government_fees.line_01.mortgage_amount`
  ✅ `cdfData.taxes_and_government_fees.line_01.mortgage_amount`
- ❌ `cdf.taxes_and_government_fees.line_01.mortgage_who_pays`
  ✅ `cdfData.taxes_and_government_fees.line_01.mortgage_who_pays`
- ❌ `cdf.taxes_and_government_fees.line_01.payees.0.type`
  ✅ `cdfData.taxes_and_government_fees.line_01.payees.0.type`
- ❌ `cdf.taxes_and_government_fees.line_01.payees.0.name_dep`
  ✅ `cdfData.taxes_and_government_fees.line_01.payees.0.name_dep`
- ❌ `cdf.taxes_and_government_fees.line_01.payees.0.payment_dep`
  ✅ `cdfData.taxes_and_government_fees.line_01.payees.0.payment_dep`
- ❌ `cdf.taxes_and_government_fees.line_01.payees.0.label.payee_label_id`
  ✅ `cdfData.taxes_and_government_fees.line_01.payees.0.label.payee_label_id`
- ❌ `cdf.taxes_and_government_fees.line_01.payees.0.reference_number`
  ✅ `cdfData.taxes_and_government_fees.line_01.payees.0.reference_number`
- ❌ `cdf.taxes_and_government_fees.line_01.payees.0.address.address_1`
  ✅ `cdfData.taxes_and_government_fees.line_01.payees.0.address.address_1`
- ❌ `cdf.taxes_and_government_fees.line_01.payees.0.address.address_2`
  ✅ `cdfData.taxes_and_government_fees.line_01.payees.0.address.address_2`
- ❌ `cdf.taxes_and_government_fees.line_01.payees.0.address.city`
  ✅ `cdfData.taxes_and_government_fees.line_01.payees.0.address.city`
- ❌ `cdf.taxes_and_government_fees.line_01.payees.0.address.state`
  ✅ `cdfData.taxes_and_government_fees.line_01.payees.0.address.state`
- ❌ `cdf.taxes_and_government_fees.line_01.payees.0.address.zipcode`
  ✅ `cdfData.taxes_and_government_fees.line_01.payees.0.address.zipcode`

### taxes-prorations
Fields: 51

**Corrections needed:**
- ❌ `properties.0.tax_information.0.annual_amount`
  ✅ `propertiesData.0.tax_information.0.annual_amount`
- ❌ `properties.0.tax_information.0.paid_thru`
  ✅ `propertiesData.0.tax_information.0.paid_thru`
- ❌ `properties.0.tax_information.0.next_due`
  ✅ `propertiesData.0.tax_information.0.next_due`
- ❌ `properties.0.tax_information.0.payment_schedule`
  ✅ `propertiesData.0.tax_information.0.payment_schedule`
- ❌ `properties.0.tax_information.0.payment_dates.0`
  ✅ `propertiesData.0.tax_information.0.payment_dates.0`
- ❌ `properties.0.tax_information.0.payment_amounts.0`
  ✅ `propertiesData.0.tax_information.0.payment_amounts.0`
- ❌ `properties.0.tax_information.0.payment_dates.1`
  ✅ `propertiesData.0.tax_information.0.payment_dates.1`
- ❌ `properties.0.tax_information.0.payment_amounts.1`
  ✅ `propertiesData.0.tax_information.0.payment_amounts.1`
- ❌ `properties.0.tax_information.0.payment_dates.2`
  ✅ `propertiesData.0.tax_information.0.payment_dates.2`
- ❌ `properties.0.tax_information.0.payment_amounts.2`
  ✅ `propertiesData.0.tax_information.0.payment_amounts.2`
- ❌ `properties.0.tax_information.0.payment_dates.3`
  ✅ `propertiesData.0.tax_information.0.payment_dates.3`
- ❌ `properties.0.tax_information.0.payment_amounts.3`
  ✅ `propertiesData.0.tax_information.0.payment_amounts.3`
- ❌ `properties.0.tax_information.0.installment_amount`
  ✅ `propertiesData.0.tax_information.0.installment_amount`
- ❌ `properties.0.tax_information.0.installment_from_date`
  ✅ `propertiesData.0.tax_information.0.installment_from_date`
- ❌ `properties.0.tax_information.0.proration_date`
  ✅ `propertiesData.0.tax_information.0.proration_date`
- ❌ `properties.0.tax_information.0.installment_to_date`
  ✅ `propertiesData.0.tax_information.0.installment_to_date`
- ❌ `properties.0.tax_information.0.prorated_amount`
  ✅ `propertiesData.0.tax_information.0.prorated_amount`
- ❌ `properties.0.tax_information.0.proration_who_pays`
  ✅ `propertiesData.0.tax_information.0.proration_who_pays`
- ❌ `properties.0.tax_information.1.annual_amount`
  ✅ `propertiesData.0.tax_information.1.annual_amount`
- ❌ `properties.0.tax_information.1.paid_thru`
  ✅ `propertiesData.0.tax_information.1.paid_thru`
- ❌ `properties.0.tax_information.1.next_due`
  ✅ `propertiesData.0.tax_information.1.next_due`
- ❌ `properties.0.tax_information.1.payment_schedule`
  ✅ `propertiesData.0.tax_information.1.payment_schedule`
- ❌ `properties.0.tax_information.1.payment_dates.0`
  ✅ `propertiesData.0.tax_information.1.payment_dates.0`
- ❌ `properties.0.tax_information.1.payment_amounts.0`
  ✅ `propertiesData.0.tax_information.1.payment_amounts.0`
- ❌ `properties.0.tax_information.1.payment_dates.1`
  ✅ `propertiesData.0.tax_information.1.payment_dates.1`
- ❌ `properties.0.tax_information.1.payment_amounts.1`
  ✅ `propertiesData.0.tax_information.1.payment_amounts.1`
- ❌ `properties.0.tax_information.1.payment_dates.2`
  ✅ `propertiesData.0.tax_information.1.payment_dates.2`
- ❌ `properties.0.tax_information.1.payment_amounts.2`
  ✅ `propertiesData.0.tax_information.1.payment_amounts.2`
- ❌ `properties.0.tax_information.1.payment_dates.3`
  ✅ `propertiesData.0.tax_information.1.payment_dates.3`
- ❌ `properties.0.tax_information.1.payment_amounts.3`
  ✅ `propertiesData.0.tax_information.1.payment_amounts.3`
- ❌ `properties.0.tax_information.1.installment_amount`
  ✅ `propertiesData.0.tax_information.1.installment_amount`
- ❌ `properties.0.tax_information.1.installment_from_date`
  ✅ `propertiesData.0.tax_information.1.installment_from_date`
- ❌ `properties.0.tax_information.1.proration_date`
  ✅ `propertiesData.0.tax_information.1.proration_date`
- ❌ `properties.0.tax_information.1.installment_to_date`
  ✅ `propertiesData.0.tax_information.1.installment_to_date`
- ❌ `properties.0.tax_information.1.prorated_amount`
  ✅ `propertiesData.0.tax_information.1.prorated_amount`
- ❌ `properties.0.tax_information.1.proration_who_pays`
  ✅ `propertiesData.0.tax_information.1.proration_who_pays`
- ❌ `properties.0.tax_information.2.annual_amount`
  ✅ `propertiesData.0.tax_information.2.annual_amount`
- ❌ `properties.0.tax_information.2.paid_thru`
  ✅ `propertiesData.0.tax_information.2.paid_thru`
- ❌ `properties.0.tax_information.2.next_due`
  ✅ `propertiesData.0.tax_information.2.next_due`
- ❌ `properties.0.tax_information.2.payment_schedule`
  ✅ `propertiesData.0.tax_information.2.payment_schedule`
- ❌ `properties.0.tax_information.2.installment_amount`
  ✅ `propertiesData.0.tax_information.2.installment_amount`
- ❌ `properties.0.tax_information.2.installment_from_date`
  ✅ `propertiesData.0.tax_information.2.installment_from_date`
- ❌ `properties.0.tax_information.2.proration_date`
  ✅ `propertiesData.0.tax_information.2.proration_date`
- ❌ `properties.0.tax_information.2.installment_to_date`
  ✅ `propertiesData.0.tax_information.2.installment_to_date`
- ❌ `properties.0.tax_information.2.prorated_amount`
  ✅ `propertiesData.0.tax_information.2.prorated_amount`
- ❌ `properties.0.tax_information.2.proration_who_pays`
  ✅ `propertiesData.0.tax_information.2.proration_who_pays`
- ❌ `properties.0.tax_information.0.prorate_using`
  ✅ `propertiesData.0.tax_information.0.prorate_using`
- ❌ `properties.0.tax_information.0.days_per_year`
  ✅ `propertiesData.0.tax_information.0.days_per_year`
- ❌ `properties.0.tax_information.0.proration_date_to`
  ✅ `propertiesData.0.tax_information.0.proration_date_to`
- ❌ `properties.0.tax_information.0.pull_tax_to_impound_disclosure`
  ✅ `propertiesData.0.tax_information.0.pull_tax_to_impound_disclosure`
- ❌ `properties.0.tax_information.0.include_in_1099`
  ✅ `propertiesData.0.tax_information.0.include_in_1099`

