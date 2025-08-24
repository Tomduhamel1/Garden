import React, { useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';

const documentStyles = `
  .document-viewer {
    background: #374151;
    min-height: 100vh;
    padding: 20px 0;
  }
  
  .document-page {
    background: white;
    color: #000;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin: 20px auto;
    width: 8.5in;
    min-height: 11in;
    padding: 0.5in;
    font-size: 10px;
    line-height: 1.3;
    position: relative;
    font-family: Arial, sans-serif;
    border-radius: 4px;
  }
  
  .document-page * {
    color: #000;
  }
  
  .document-page h1 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    text-align: center;
    margin-bottom: 20px;
    border-bottom: 2px solid #000;
    padding-bottom: 8px;
  }
  
  .document-page h1 .sub-header {
    font-size: 10px;
    font-weight: normal;
    display: block;
    margin-bottom: 8px;
  }
  
  .document-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 15px;
    font-size: 9px;
  }
  
  .document-table th,
  .document-table td {
    border: 1px solid #000;
    padding: 3px 5px;
    vertical-align: top;
  }
  
  .document-table th {
    background-color: #f0f0f0;
    color: #000;
    font-weight: bold;
    text-align: left;
  }
  
  .document-table td {
    color: #000;
  }
  
  .document-table .black-header {
    background-color: #000;
    color: white !important;
    font-weight: bold;
  }
  
  .document-table .black-header * {
    color: white !important;
  }
  
  .document-table .grey-header {
    background-color: #e0e0e0;
    color: #000;
    font-weight: bold;
  }
  
  .document-footer {
    position: absolute;
    bottom: 0.5in;
    left: 0.5in;
    right: 0.5in;
    font-size: 8px;
    text-align: center;
    padding-top: 10px;
    border-top: 1px solid #000;
  }
  
  @media print {
    body {
      margin: 0;
      padding: 0;
    }
    
    .document-viewer {
      background: white;
      padding: 0;
    }
    
    .document-page {
      margin: 0;
      box-shadow: none;
      page-break-after: always;
      border-radius: 0;
    }
    
    .no-print {
      display: none !important;
    }
  }
`;

export function ClosingDisclosure() {
  const { loading, saving, handleInputChange, getValue, saveOrderData, orderData } = useOrderData();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  console.log('ClosingDisclosure - orderData:', orderData);
  console.log('ClosingDisclosure - borrower first name:', getValue('contactsData.borrowers.0.first_name'));
  console.log('ClosingDisclosure - borrower last name:', getValue('contactsData.borrowers.0.last_name'));
  console.log('ClosingDisclosure - purchase price:', getValue('cdfData.transaction_information.purchase_price'));

  // Calculate section totals from line items
  const calculateSectionTotal = (sectionPath: string, lineCount: number = 8, amountField: string = 'paid_by_borrower') => {
    let total = 0;
    for (let i = 1; i <= lineCount; i++) {
      const lineKey = `line_${i.toString().padStart(2, '0')}`;
      const amount = getValue(`${sectionPath}.${lineKey}.${amountField}`) || 0;
      total += Number(amount);
    }
    return total;
  };

  // Section totals
  const sectionATotal = calculateSectionTotal('cdfData.origination_charges');
  const sectionBTotal = calculateSectionTotal('cdfData.services_borrower_did_not_shop_for');
  const sectionCTotal = calculateSectionTotal('cdfData.services_borrower_did_shop_for');
  const sectionETotal = calculateSectionTotal('cdfData.taxes_and_government_fees', 4);
  const sectionFTotal = calculateSectionTotal('cdfData.prepaid_item_information', 5);
  const sectionGTotal = calculateSectionTotal('cdfData.escrow_information');
  const sectionHTotal = calculateSectionTotal('cdfData.other_charges');

  // Combined totals
  const totalLoanCosts = sectionATotal + sectionBTotal + sectionCTotal; // Section D
  const totalOtherCosts = sectionETotal + sectionFTotal + sectionGTotal + sectionHTotal; // Section I
  const totalClosingCosts = totalLoanCosts + totalOtherCosts; // Section J

  // Cash to Close calculations
  const calculateCreditsTotal = (sectionPath: string, lineCount: number = 5) => {
    let total = 0;
    for (let i = 1; i <= lineCount; i++) {
      const lineKey = `line_${i.toString().padStart(2, '0')}`;
      const amount = getValue(`${sectionPath}.${lineKey}.amount`) || 0;
      total += Number(amount);
    }
    return total;
  };

  const calculateDebitsTotal = (sectionPath: string, lineCount: number = 5) => {
    let total = 0;
    for (let i = 1; i <= lineCount; i++) {
      const lineKey = `line_${i.toString().padStart(2, '0')}`;
      const amount = getValue(`${sectionPath}.${lineKey}.amount`) || 0;
      total += Number(amount);
    }
    return total;
  };

  // Calculate closing costs paid before closing from all sections
  const calculatePaidBeforeClosing = () => {
    const sectionPaths = [
      'cdfData.origination_charges',
      'cdfData.services_borrower_did_not_shop_for',
      'cdfData.services_borrower_did_shop_for',
      'cdfData.other_charges'
    ];
    
    let total = 0;
    sectionPaths.forEach(path => {
      for (let i = 1; i <= 8; i++) {
        const lineKey = `line_${i.toString().padStart(2, '0')}`;
        const amount = getValue(`${path}.${lineKey}.paid_before_closing`) || 0;
        total += Number(amount);
      }
    });

    // Add taxes and prepaids before closing amounts
    for (let i = 1; i <= 5; i++) {
      const lineKey = `line_${i.toString().padStart(2, '0')}`;
      total += Number(getValue(`cdfData.taxes_and_government_fees.${lineKey}.before_borrower_amount`) || 0);
      total += Number(getValue(`cdfData.prepaid_item_information.${lineKey}.before_borrower_amount`) || 0);
      total += Number(getValue(`cdfData.escrow_information.${lineKey}.before_borrower_amount`) || 0);
    }
    
    return total;
  };

  const closingCostsPaidBefore = calculatePaidBeforeClosing();
  const closingCostsFinanced = Number(getValue('cdfData.closing_costs_financed') || 0);
  const downPayment = Number(getValue('cdfData.loan_information.loan_amount') || 0) - Number(getValue('cdfData.loan_information.sale_price') || 0);
  const deposit = Number(getValue('cdfData.transaction_information.deposit') || 0);
  const fundsForBorrower = calculateCreditsTotal('cdfData.borrower_credit_information', 5);
  const sellerCredits = calculateCreditsTotal('cdfData.seller_credit_information', 5);
  const adjustmentsAndCredits = Number(getValue('cdfData.adjustments_and_other_credits') || 0);

  // Final cash to close calculation
  const cashToClose = totalClosingCosts - closingCostsPaidBefore - closingCostsFinanced + Math.abs(downPayment) - deposit - fundsForBorrower - sellerCredits - adjustmentsAndCredits;

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    console.log('Export functionality to be implemented');
  };

  const renderPage1 = () => (
    <div className="document-page" data-page="1">
      <h1>
        <span className="sub-header">This form is a statement of final loan terms and closing costs. Compare this document with your Loan Estimate.</span>
        Closing Disclosure
      </h1>
      
      {/* Loan Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '11px' }}>Closing Information</div>
          <table className="document-table">
            <tbody>
              <tr><td>Date Issued</td><td data-schema-key="cdfData.date_issued"></td></tr>
              <tr><td>Closing Date</td><td data-schema-key="closingDate">{getValue('closingDate') || '03/21/2025'}</td></tr>
              <tr><td>Disbursement Date</td><td data-schema-key="cdfData.disbursement_date"></td></tr>
              <tr><td>Settlement Agent</td><td data-schema-key="cdfData.settlement_agent">First National Title & Escrow</td></tr>
              <tr><td>File #</td><td data-schema-key="file_number">TomTestCD</td></tr>
              <tr><td>Property</td><td data-schema-key="propertiesData.properties.0.address">{getValue('propertiesData.properties.0.address')}<br />{getValue('propertiesData.properties.0.city')}, {getValue('propertiesData.properties.0.state')} {getValue('propertiesData.properties.0.zip')}</td></tr>
              <tr><td>Sale Price</td><td data-schema-key="cdfData.transaction_information.purchase_price" style={{ fontWeight: 'bold' }}>${getValue('cdfData.transaction_information.purchase_price')?.toLocaleString() || '0.00'}</td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '11px' }}>Transaction Information</div>
          <table className="document-table">
            <tbody>
              <tr><td>Borrower(s)</td><td data-schema-key="contactsData.borrowers.0">{getValue('contactsData.borrowers.0.first_name')} {getValue('contactsData.borrowers.0.last_name')}<br />{getValue('contactsData.borrowers.0.current_address.address_1')}<br />{getValue('contactsData.borrowers.0.current_address.city')}, {getValue('contactsData.borrowers.0.current_address.state')} {getValue('contactsData.borrowers.0.current_address.zipcode')}</td></tr>
              <tr><td>Seller(s)</td><td data-schema-key="contactsData.sellers.0">{getValue('contactsData.sellers.0.first_name')} {getValue('contactsData.sellers.0.last_name')}<br />{getValue('contactsData.sellers.0.current_address.address_1')}<br />{getValue('contactsData.sellers.0.current_address.city')}, {getValue('contactsData.sellers.0.current_address.state')} {getValue('contactsData.sellers.0.current_address.zipcode')}</td></tr>
              <tr><td>Lender</td><td data-schema-key="lender.name"></td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '11px' }}>Loan Information</div>
          <table className="document-table">
            <tbody>
              <tr><td>Loan Term</td><td data-schema-key="cdfData.loans.0.loan_term_years">{getValue('cdfData.loans.0.loan_term_years')} years</td></tr>
              <tr><td>Purpose</td><td data-schema-key="cdfData.loans.0.loan_purpose">{getValue('cdfData.loans.0.loan_purpose') || 'Purchase'}</td></tr>
              <tr><td>Product</td><td data-schema-key="cdfData.loans.0.loan_product">{getValue('cdfData.loans.0.loan_product')}</td></tr>
              <tr><td>Loan Type</td><td data-schema-key="cdfData.loans.0.loan_type">{getValue('cdfData.loans.0.loan_type') || 'Conventional'}</td></tr>
              <tr><td>Loan ID #</td><td data-schema-key="cdfData.loans.0.loan_number">{getValue('cdfData.loans.0.loan_number')}</td></tr>
              <tr><td>MIC #</td><td data-schema-key="cdfData.loans.0.mortgage_insurance_case_number">{getValue('cdfData.loans.0.mortgage_insurance_case_number')}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Loan Terms */}
      <table className="document-table" style={{ marginBottom: '20px' }}>
        <thead>
          <tr>
            <th className="black-header">Loan Terms</th>
            <th style={{ width: '100px' }}></th>
            <th className="grey-header">Can this amount increase after closing?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Loan Amount</td>
            <td data-schema-key="cdfData.loans.0.initial_loan_amount">${getValue('cdfData.loans.0.initial_loan_amount')?.toLocaleString() || '0.00'}</td>
            <td><span style={{ fontWeight: 'bold' }}>No</span></td>
          </tr>
          <tr>
            <td>Interest Rate</td>
            <td data-schema-key="cdfData.loans.0.interest_rate">{getValue('cdfData.loans.0.interest_rate')}%</td>
            <td><span style={{ fontWeight: 'bold' }}>No</span></td>
          </tr>
          <tr>
            <td>Monthly Principal & Interest<br /><small style={{ fontSize: '8px' }}>See Projected Payments below for your Estimated Total Monthly Payment</small></td>
            <td data-schema-key="cdfData.loans.0.monthly_principal_and_interest">${getValue('cdfData.loans.0.monthly_principal_and_interest')?.toLocaleString() || '0.00'}</td>
            <td><span style={{ fontWeight: 'bold' }}>No</span></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className="grey-header">Does the loan have these features?</td>
          </tr>
          <tr>
            <td>Prepayment Penalty</td>
            <td data-schema-key="loan.prepayment_penalty"></td>
            <td><span style={{ fontWeight: 'bold' }}>No</span></td>
          </tr>
          <tr>
            <td>Balloon Payment</td>
            <td data-schema-key="loan.balloon_payment"></td>
            <td><span style={{ fontWeight: 'bold' }}>YES</span> • <small style={{ fontSize: '8px' }}>You will have to pay $_79_ at the end of year 323__.</small></td>
          </tr>
        </tbody>
      </table>

      {/* Projected Payments */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '15px', marginBottom: '20px' }}>
        <div>
          <table className="document-table">
            <thead>
              <tr>
                <th className="black-header">Projected Payments</th>
                <th style={{ width: '100px' }}></th>
              </tr>
              <tr className="grey-header">
                <th>Payment Calculation</th>
                <th>Year 1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Principal & Interest</td>
                <td data-schema-key="projected_payments.year1.pi">——<br /><strong>only interest</strong></td>
              </tr>
              <tr>
                <td>Mortgage Insurance</td>
                <td data-schema-key="projected_payments.year1.mi">+ ——</td>
              </tr>
              <tr>
                <td>Estimated Escrow<br /><small style={{ fontSize: '8px' }}>Amount can increase over time.</small></td>
                <td data-schema-key="projected_payments.year1.escrow">+ ——</td>
              </tr>
              <tr className="grey-header">
                <td><strong>Estimated Total Monthly Payment</strong></td>
                <td data-schema-key="projected_payments.year1.total"></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Estimated Taxes Box */}
        <div>
          <table className="document-table">
            <tbody>
              <tr>
                <td rowSpan={6} style={{ fontWeight: 'bold', verticalAlign: 'top', padding: '8px' }}>
                  Estimated Taxes, Insurance & Assessments<br />
                  <small style={{ fontSize: '8px', fontWeight: 'normal' }}>Amount can increase over time. See page 4 for details</small>
                </td>
                <td rowSpan={6} style={{ textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold', fontSize: '14px' }}>
                  $0.00<br />
                  <small style={{ fontSize: '8px', fontWeight: 'normal' }}>a month</small>
                </td>
              </tr>
              <tr>
                <td style={{ fontSize: '8px', fontWeight: 'bold' }}>This estimate includes</td>
                <td style={{ fontSize: '8px', fontWeight: 'bold' }}>In escrow?</td>
              </tr>
              <tr>
                <td style={{ fontSize: '8px' }}>
                  <input type="checkbox" style={{ marginRight: '3px' }} /> Property Taxes
                </td>
                <td style={{ fontSize: '8px' }}></td>
              </tr>
              <tr>
                <td style={{ fontSize: '8px' }}>
                  <input type="checkbox" style={{ marginRight: '3px' }} /> Homeowner's Insurance
                </td>
                <td style={{ fontSize: '8px' }}></td>
              </tr>
              <tr>
                <td style={{ fontSize: '8px' }}>
                  <input type="checkbox" style={{ marginRight: '3px' }} /> Other:
                </td>
                <td style={{ fontSize: '8px' }}></td>
              </tr>
              <tr>
                <td colSpan={2} style={{ fontSize: '7px', paddingTop: '5px' }}>
                  See Escrow Account on page 4 for details. You must pay for other property costs separately.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Costs at Closing */}
      <table className="document-table">
        <thead>
          <tr>
            <th className="black-header">Costs at Closing</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Closing Costs</td>
            <td>
              <div style={{ fontWeight: 'bold' }}>${totalClosingCosts.toLocaleString()}</div>
              <div style={{ fontSize: '8px' }}>Includes ${totalLoanCosts.toLocaleString()} in Loan Costs + ${totalOtherCosts.toLocaleString()} in Other Costs - $0.00 in Lender Credits.</div>
              <div style={{ fontSize: '8px' }}>See page 2 for details</div>
            </td>
          </tr>
          <tr>
            <td>Cash to Close</td>
            <td>
              <div style={{ fontWeight: 'bold' }}>$452,046.56</div>
              <div style={{ fontSize: '8px' }}>Includes Closing Costs. See "Calculating Cash to Close" on page 3 for details.</div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="document-footer">
        <div>Closing Disclosure</div>
        <div>Page 1 - Loan ID #</div>
      </div>
    </div>
  );

  const renderPage2 = () => (
    <div className="document-page" data-page="2">
      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px' }}>Closing Cost Details</div>
      
      {/* Loan Costs */}
      <table className="document-table" style={{ marginBottom: '20px' }}>
        <thead>
          <tr>
            <th rowSpan={2} className="black-header" style={{ width: '40%' }}>Loan Costs</th>
            <th rowSpan={2} style={{ width: '15%' }}></th>
            <th colSpan={2} style={{ textAlign: 'center' }}>Borrower Paid</th>
            <th colSpan={2} style={{ textAlign: 'center' }}>Seller Paid</th>
            <th rowSpan={2} style={{ width: '10%' }}>Paid by Others</th>
          </tr>
          <tr>
            <th style={{ fontSize: '8px' }}>At Closing</th>
            <th style={{ fontSize: '8px' }}>Before Closing</th>
            <th style={{ fontSize: '8px' }}>At Closing</th>
            <th style={{ fontSize: '8px' }}>Before Closing</th>
          </tr>
        </thead>
        <tbody>
          <tr className="grey-header">
            <td colSpan={2}>A. Origination Charges</td>
            <td colSpan={2}></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          {/* Section A - ALL 8 LINES pulling REAL DATA */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            const lineKey = `line_${String(i).padStart(2, '0')}`;
            const description = getValue(`cdfData.origination_charges.${lineKey}.description`) || '';
            const borrowerAmount = getValue(`cdfData.origination_charges.${lineKey}.paid_by_borrower`) || 0;
            const sellerAmount = getValue(`cdfData.origination_charges.${lineKey}.paid_by_seller`) || 0;
            const othersAmount = getValue(`cdfData.origination_charges.${lineKey}.paid_by_others`) || 0;
            const beforeClosingAmount = getValue(`cdfData.origination_charges.${lineKey}.paid_before_closing`) || 0;
            
            // Only show line if it has data
            if (!description && !borrowerAmount && !sellerAmount && !othersAmount && !beforeClosingAmount) {
              return (
                <tr key={`orig-${i}`}>
                  <td colSpan={2}><span style={{ marginRight: '5px' }}>{String(i).padStart(2, '0')}</span></td>
                  <td></td><td></td><td></td><td></td><td></td>
                </tr>
              );
            }
            
            return (
              <tr key={`orig-${i}`}>
                <td colSpan={2}><span style={{ marginRight: '5px' }}>{String(i).padStart(2, '0')}</span> {description}</td>
                <td>${Number(borrowerAmount).toLocaleString()}</td>
                <td>${Number(sellerAmount).toLocaleString()}</td>
                <td>${Number(othersAmount).toLocaleString()}</td>
                <td>${Number(beforeClosingAmount).toLocaleString()}</td>
                <td></td>
              </tr>
            );
          })}
          
          <tr className="grey-header">
            <td colSpan={2}>B. Services Borrower Did Not Shop For</td>
            <td colSpan={2}></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          {/* Section B - ALL 8 LINES pulling REAL DATA */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            const lineKey = `line_${String(i).padStart(2, '0')}`;
            const description = getValue(`cdfData.services_borrower_did_not_shop_for.${lineKey}.description`) || '';
            const payeeName = getValue(`cdfData.services_borrower_did_not_shop_for.${lineKey}.payee_name`) || '';
            const borrowerAmount = getValue(`cdfData.services_borrower_did_not_shop_for.${lineKey}.paid_by_borrower`) || 0;
            const sellerAmount = getValue(`cdfData.services_borrower_did_not_shop_for.${lineKey}.paid_by_seller`) || 0;
            const othersAmount = getValue(`cdfData.services_borrower_did_not_shop_for.${lineKey}.paid_by_others`) || 0;
            const beforeClosingAmount = getValue(`cdfData.services_borrower_did_not_shop_for.${lineKey}.paid_before_closing`) || 0;
            
            const displayText = description + (payeeName ? ` to ${payeeName}` : '');
            
            return (
              <tr key={`no-shop-${i}`}>
                <td colSpan={2}><span style={{ marginRight: '5px' }}>{String(i).padStart(2, '0')}</span> {displayText}</td>
                <td>${Number(borrowerAmount).toLocaleString()}</td>
                <td>${Number(sellerAmount).toLocaleString()}</td>
                <td>${Number(othersAmount).toLocaleString()}</td>
                <td>${Number(beforeClosingAmount).toLocaleString()}</td>
                <td></td>
              </tr>
            );
          })}
          
          <tr className="grey-header">
            <td colSpan={2}>C. Services Borrower Did Shop For</td>
            <td colSpan={2}><strong>${totalLoanCosts.toLocaleString()}</strong></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          {/* Section C - ALL 8 LINES pulling REAL DATA */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            const lineKey = `line_${String(i).padStart(2, '0')}`;
            const description = getValue(`cdfData.services_borrower_did_shop_for.${lineKey}.description`) || '';
            const payeeName = getValue(`cdfData.services_borrower_did_shop_for.${lineKey}.payee_name`) || '';
            const borrowerAmount = getValue(`cdfData.services_borrower_did_shop_for.${lineKey}.paid_by_borrower`) || 0;
            const sellerAmount = getValue(`cdfData.services_borrower_did_shop_for.${lineKey}.paid_by_seller`) || 0;
            const othersAmount = getValue(`cdfData.services_borrower_did_shop_for.${lineKey}.paid_by_others`) || 0;
            const beforeClosingAmount = getValue(`cdfData.services_borrower_did_shop_for.${lineKey}.paid_before_closing`) || 0;
            
            const displayText = description + (payeeName ? ` to ${payeeName}` : '');
            
            return (
              <tr key={`shop-${i}`}>
                <td colSpan={2}><span style={{ marginRight: '5px' }}>{String(i).padStart(2, '0')}</span> {displayText}</td>
                <td>${Number(borrowerAmount).toLocaleString()}</td>
                <td>${Number(sellerAmount).toLocaleString()}</td>
                <td>${Number(othersAmount).toLocaleString()}</td>
                <td>${Number(beforeClosingAmount).toLocaleString()}</td>
                <td></td>
              </tr>
            );
          })}
          
          <tr className="black-header">
            <td colSpan={2}>D. TOTAL LOAN COSTS (Borrower-Paid)</td>
            <td colSpan={2}><strong>${totalLoanCosts.toLocaleString()}</strong></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={2}>Loan Costs Subtotals (A + B + C)</td>
            <td>${totalLoanCosts.toLocaleString()}</td><td></td><td></td><td></td><td></td>
          </tr>
        </tbody>
      </table>

      {/* Other Costs */}
      <table className="document-table">
        <thead>
          <tr>
            <th rowSpan={2} className="black-header" style={{ width: '40%' }}>Other Costs</th>
            <th rowSpan={2} style={{ width: '15%' }}></th>
            <th colSpan={2}></th>
            <th colSpan={2}></th>
            <th rowSpan={2}></th>
          </tr>
          <tr><th></th><th></th><th></th><th></th></tr>
        </thead>
        <tbody>
          <tr className="grey-header">
            <td colSpan={2}>E. Taxes and Other Government Fees</td>
            <td colSpan={2}></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          {/* Section E - Taxes and Government Fees - REAL DATA */}
          {[1, 2, 3, 4].map(i => {
            const lineKey = `line_${String(i).padStart(2, '0')}`;
            const description = getValue(`cdfData.taxes_and_government_fees.${lineKey}.description`) || '';
            const payeeName = getValue(`cdfData.taxes_and_government_fees.${lineKey}.payee_name`) || '';
            const borrowerAmount = getValue(`cdfData.taxes_and_government_fees.${lineKey}.borrower_amount`) || 0;
            const sellerAmount = getValue(`cdfData.taxes_and_government_fees.${lineKey}.seller_amount`) || 0;
            const othersAmount = getValue(`cdfData.taxes_and_government_fees.${lineKey}.paid_by_others_amount`) || 0;
            const beforeClosingAmount = getValue(`cdfData.taxes_and_government_fees.${lineKey}.before_borrower_amount`) || getValue(`cdfData.taxes_and_government_fees.${lineKey}.before_seller_amount`) || 0;
            
            const displayText = description + (payeeName ? ` to ${payeeName}` : '');
            
            return (
              <tr key={`gov-${i}`}>
                <td colSpan={2}><span style={{ marginRight: '5px' }}>{String(i).padStart(2, '0')}</span> {displayText}</td>
                <td>${Number(borrowerAmount).toLocaleString()}</td>
                <td>${Number(sellerAmount).toLocaleString()}</td>
                <td>${Number(othersAmount).toLocaleString()}</td>
                <td>${Number(beforeClosingAmount).toLocaleString()}</td>
                <td></td>
              </tr>
            );
          })}
          
          <tr className="grey-header">
            <td colSpan={2}>F. Prepaids</td>
            <td colSpan={2}></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          {/* Section F - Prepaids - REAL DATA */}
          {[1, 2, 3, 4, 5].map(i => {
            const lineKey = `line_${String(i).padStart(2, '0')}`;
            const description = getValue(`cdfData.prepaid_item_information.${lineKey}.description`) || '';
            const borrowerAmount = getValue(`cdfData.prepaid_item_information.${lineKey}.borrower_amount`) || 0;
            const sellerAmount = getValue(`cdfData.prepaid_item_information.${lineKey}.seller_amount`) || 0;
            const beforeBorrowerAmount = getValue(`cdfData.prepaid_item_information.${lineKey}.before_borrower_amount`) || 0;
            const beforeSellerAmount = getValue(`cdfData.prepaid_item_information.${lineKey}.before_seller_amount`) || 0;
            const numberOfMonths = getValue(`cdfData.prepaid_item_information.${lineKey}.number_of_months`) || '';
            
            const displayText = description + (numberOfMonths ? ` (${numberOfMonths} mo.)` : '');
            
            return (
              <tr key={`prepaid-${i}`}>
                <td colSpan={2}><span style={{ marginRight: '5px' }}>{String(i).padStart(2, '0')}</span> {displayText}</td>
                <td>${Number(borrowerAmount).toLocaleString()}</td>
                <td>${Number(sellerAmount).toLocaleString()}</td>
                <td>${Number(beforeBorrowerAmount).toLocaleString()}</td>
                <td>${Number(beforeSellerAmount).toLocaleString()}</td>
                <td></td>
              </tr>
            );
          })}
          
          <tr className="grey-header">
            <td colSpan={2}>G. Initial Escrow Payment at Closing</td>
            <td colSpan={2}><strong>$-500.00</strong></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          {/* Section G - Initial Escrow - REAL DATA */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            const lineKey = `line_${String(i).padStart(2, '0')}`;
            const description = getValue(`cdfData.escrow_information.${lineKey}.description`) || '';
            const borrowerAmount = getValue(`cdfData.escrow_information.${lineKey}.borrower_amount`) || 0;
            const sellerAmount = getValue(`cdfData.escrow_information.${lineKey}.seller_amount`) || 0;
            const beforeBorrowerAmount = getValue(`cdfData.escrow_information.${lineKey}.before_borrower_amount`) || 0;
            const beforeSellerAmount = getValue(`cdfData.escrow_information.${lineKey}.before_seller_amount`) || 0;
            const numberOfMonths = getValue(`cdfData.escrow_information.${lineKey}.number_of_months`) || '';
            
            const displayText = description + (numberOfMonths ? ` (${numberOfMonths} mo.)` : '');
            
            return (
              <tr key={`escrow-${i}`}>
                <td colSpan={2}><span style={{ marginRight: '5px' }}>{String(i).padStart(2, '0')}</span> {displayText}</td>
                <td>${Number(borrowerAmount).toLocaleString()}</td>
                <td>${Number(sellerAmount).toLocaleString()}</td>
                <td>${Number(beforeBorrowerAmount).toLocaleString()}</td>
                <td>${Number(beforeSellerAmount).toLocaleString()}</td>
                <td></td>
              </tr>
            );
          })}
          
          <tr className="grey-header">
            <td colSpan={2}>H. Other</td>
            <td colSpan={2}><strong>$1,008.00</strong></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          {/* Section H - Other Charges - REAL DATA */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            const lineKey = `line_${String(i).padStart(2, '0')}`;
            const description = getValue(`cdfData.other_charges.${lineKey}.description`) || '';
            const payeeName = getValue(`cdfData.other_charges.${lineKey}.payee_name`) || '';
            const borrowerAmount = getValue(`cdfData.other_charges.${lineKey}.paid_by_borrower`) || 0;
            const sellerAmount = getValue(`cdfData.other_charges.${lineKey}.paid_by_seller`) || 0;
            const othersAmount = getValue(`cdfData.other_charges.${lineKey}.paid_by_others`) || 0;
            const beforeClosingAmount = getValue(`cdfData.other_charges.${lineKey}.paid_before_closing`) || 0;
            
            const displayText = description + (payeeName ? ` to ${payeeName}` : '');
            
            return (
              <tr key={`other-${i}`}>
                <td colSpan={2}><span style={{ marginRight: '5px' }}>{String(i).padStart(2, '0')}</span> {displayText}</td>
                <td>${Number(borrowerAmount).toLocaleString()}</td>
                <td>${Number(sellerAmount).toLocaleString()}</td>
                <td>${Number(othersAmount).toLocaleString()}</td>
                <td>${Number(beforeClosingAmount).toLocaleString()}</td>
                <td></td>
              </tr>
            );
          })}
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>03</span> Sewer Charges to First National Title & Escrow</td><td></td><td></td><td>$500.00</td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>04</span> Title - Owner's Title Policy (Optional) to CATIC</td><td>$1,008.00</td><td></td><td></td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>05</span> Water Charges to First National Title & Escrow</td><td></td><td></td><td>$500.00</td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>06</span> Wire Verification Fee to First National Title & Escrow</td><td></td><td></td><td>$25.00</td><td></td><td></td></tr>
          
          <tr className="black-header">
            <td colSpan={2}>I. TOTAL OTHER COSTS (Borrower-Paid)</td>
            <td colSpan={2}><strong>${totalOtherCosts.toLocaleString()}</strong></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          
          <tr className="black-header">
            <td colSpan={2}>J. TOTAL CLOSING COSTS (Borrower-Paid)</td>
            <td colSpan={2}><strong>${totalClosingCosts.toLocaleString()}</strong></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={2}>Closing Costs Subtotals (D + I)</td>
            <td>$1,558.00</td><td></td><td>$21,255.00</td><td></td><td></td>
          </tr>
          <tr>
            <td colSpan={2}>Lender Credits</td>
            <td>$-500.00</td><td></td><td></td><td></td><td></td>
          </tr>
        </tbody>
      </table>

      <div className="document-footer">
        <div>Closing Disclosure</div>
        <div>Page 2 - Loan ID #</div>
      </div>
    </div>
  );

  const renderPage3 = () => (
    <div className="document-page" data-page="3">
      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px' }}>Calculating Cash to Close</div>
      
      {/* Section K - Borrower Credits */}
      <table className="document-table" style={{ marginBottom: '15px' }}>
        <thead>
          <tr>
            <th className="grey-header" colSpan={2} style={{ width: '70%' }}>K. Due from Borrower at Closing</th>
            <th style={{ width: '15%' }}>Borrower-Paid</th>
            <th style={{ width: '15%' }}>Other</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map(i => {
            const lineKey = `line_${String(i).padStart(2, '0')}`;
            const description = getValue(`cdfData.borrower_credit_information.${lineKey}.description`) || '';
            const amount = getValue(`cdfData.borrower_credit_information.${lineKey}.amount`) || 0;
            
            return (
              <tr key={`borrower-credit-${i}`}>
                <td colSpan={2}><span style={{ marginRight: '5px' }}>{String(i).padStart(2, '0')}</span> {description}</td>
                <td>${Number(amount).toLocaleString()}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {/* Section L - Borrower Debits */}
      <table className="document-table" style={{ marginBottom: '15px' }}>
        <thead>
          <tr>
            <th className="grey-header" colSpan={2} style={{ width: '70%' }}>L. Paid Already by or on Behalf of Borrower at or Before Closing</th>
            <th style={{ width: '15%' }}>Borrower-Paid</th>
            <th style={{ width: '15%' }}>Other</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map(i => {
            const lineKey = `line_${String(i).padStart(2, '0')}`;
            const description = getValue(`cdfData.borrower_debit_information.${lineKey}.description`) || '';
            const amount = getValue(`cdfData.borrower_debit_information.${lineKey}.amount`) || 0;
            
            return (
              <tr key={`borrower-debit-${i}`}>
                <td colSpan={2}><span style={{ marginRight: '5px' }}>{String(i).padStart(2, '0')}</span> {description}</td>
                <td>-${Number(amount).toLocaleString()}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {/* Section M - Seller Credits */}
      <table className="document-table" style={{ marginBottom: '15px' }}>
        <thead>
          <tr>
            <th className="grey-header" colSpan={2} style={{ width: '70%' }}>M. Due to Seller at Closing</th>
            <th style={{ width: '15%' }}>Seller-Received</th>
            <th style={{ width: '15%' }}>Other</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map(i => {
            const lineKey = `line_${String(i).padStart(2, '0')}`;
            const description = getValue(`cdfData.seller_credit_information.${lineKey}.description`) || '';
            const amount = getValue(`cdfData.seller_credit_information.${lineKey}.amount`) || 0;
            
            return (
              <tr key={`seller-credit-${i}`}>
                <td colSpan={2}><span style={{ marginRight: '5px' }}>{String(i).padStart(2, '0')}</span> {description}</td>
                <td>${Number(amount).toLocaleString()}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {/* Section N - Seller Debits */}
      <table className="document-table" style={{ marginBottom: '15px' }}>
        <thead>
          <tr>
            <th className="grey-header" colSpan={2} style={{ width: '70%' }}>N. Due from Seller at Closing</th>
            <th style={{ width: '15%' }}>Seller-Paid</th>
            <th style={{ width: '15%' }}>Other</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map(i => {
            const lineKey = `line_${String(i).padStart(2, '0')}`;
            const description = getValue(`cdfData.seller_debit_information.${lineKey}.description`) || '';
            const amount = getValue(`cdfData.seller_debit_information.${lineKey}.amount`) || 0;
            
            return (
              <tr key={`seller-debit-${i}`}>
                <td colSpan={2}><span style={{ marginRight: '5px' }}>{String(i).padStart(2, '0')}</span> {description}</td>
                <td>-${Number(amount).toLocaleString()}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {/* Cash to Close Summary */}
      <table className="document-table" style={{ marginBottom: '20px' }}>
        <thead>
          <tr>
            <th className="black-header" style={{ width: '50%' }}>Cash to Close</th>
            <th>Loan Estimate</th>
            <th>Final</th>
            <th>Did this change?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Closing Costs (J)</td>
            <td></td>
            <td>${totalClosingCosts.toLocaleString()}</td>
            <td></td>
          </tr>
          <tr>
            <td>Closing Costs Paid Before Closing</td>
            <td></td>
            <td>-${closingCostsPaidBefore.toLocaleString()}</td>
            <td></td>
          </tr>
          <tr>
            <td>Closing Costs Financed (Paid from your Loan Amount)</td>
            <td></td>
            <td>-${closingCostsFinanced.toLocaleString()}</td>
            <td></td>
          </tr>
          <tr>
            <td>Down Payment/Funds from Borrower</td>
            <td></td>
            <td>${Math.abs(downPayment).toLocaleString()}</td>
            <td></td>
          </tr>
          <tr>
            <td>Deposit</td>
            <td></td>
            <td>-${deposit.toLocaleString()}</td>
            <td></td>
          </tr>
          <tr>
            <td>Funds for Borrower</td>
            <td></td>
            <td>-${fundsForBorrower.toLocaleString()}</td>
            <td></td>
          </tr>
          <tr>
            <td>Seller Credits</td>
            <td></td>
            <td>-${sellerCredits.toLocaleString()}</td>
            <td></td>
          </tr>
          <tr>
            <td>Adjustments and Other Credits</td>
            <td></td>
            <td>-${adjustmentsAndCredits.toLocaleString()}</td>
            <td></td>
          </tr>
          <tr className="black-header">
            <td><strong>Cash to Close</strong></td>
            <td></td>
            <td><strong>${cashToClose.toLocaleString()}</strong></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div className="document-footer">
        <div>Closing Disclosure</div>
        <div>Page 3 - Loan ID #</div>
      </div>
    </div>
  );

  const renderPage4 = () => (
    <div className="document-page" data-page="4">
      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px' }}>Additional Information About This Loan</div>
      
      <div style={{ marginBottom: '20px' }}>
        <div className="grey-header" style={{ padding: '5px', marginBottom: '10px' }}>Loan Disclosures</div>
        <div style={{ fontSize: '9px', lineHeight: '1.4' }}>
          <p><strong>Assumption:</strong> If you sell or transfer this property to another person, your lender</p>
          <p><strong>Demand Feature:</strong> Your loan</p>
          <p><strong>Late Payment:</strong> If your payment is more than ___ days late, your lender will charge a late fee of</p>
          <p><strong>Negative Amortization:</strong> Under the terms of your loan, you</p>
          <p><strong>Partial Payments:</strong> Your lender</p>
          <p><strong>Security Interest:</strong> You are granting a security interest in</p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div className="grey-header" style={{ padding: '5px', marginBottom: '10px' }}>Escrow Account</div>
        <div style={{ fontSize: '9px', lineHeight: '1.4' }}>
          <p>For now, your loan [ ] will have an escrow account.</p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div className="grey-header" style={{ padding: '5px', marginBottom: '10px' }}>Adjustable Payment (AP) Table</div>
        <div style={{ fontSize: '9px', lineHeight: '1.4' }}>
          <p>This table is not applicable to this loan.</p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div className="grey-header" style={{ padding: '5px', marginBottom: '10px' }}>Adjustable Interest Rate (AIR) Table</div>
        <div style={{ fontSize: '9px', lineHeight: '1.4' }}>
          <p>This table is not applicable to this loan.</p>
        </div>
      </div>

      <div className="document-footer">
        <div>Closing Disclosure</div>
        <div>Page 4 - Loan ID #</div>
      </div>
    </div>
  );

  const renderPage5 = () => (
    <div className="document-page" data-page="5">
      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px' }}>Loan Calculations</div>
      
      <table className="document-table" style={{ marginBottom: '20px' }}>
        <tbody>
          <tr>
            <td style={{ width: '50%' }}>Total of Payments</td>
            <td>Total you will have paid after you make all payments of principal, interest, mortgage insurance, and loan costs, as scheduled.</td>
            <td style={{ textAlign: 'right', fontWeight: 'bold' }}>$</td>
          </tr>
          <tr>
            <td>Finance Charge</td>
            <td>The dollar amount the loan will cost you.</td>
            <td style={{ textAlign: 'right', fontWeight: 'bold' }}>$</td>
          </tr>
          <tr>
            <td>Amount Financed</td>
            <td>The loan amount available after paying your upfront finance charge.</td>
            <td style={{ textAlign: 'right', fontWeight: 'bold' }}>$</td>
          </tr>
          <tr>
            <td>Annual Percentage Rate (APR)</td>
            <td>Your costs over the loan term expressed as a rate. This is not your interest rate.</td>
            <td style={{ textAlign: 'right', fontWeight: 'bold' }}>%</td>
          </tr>
          <tr>
            <td>Total Interest Percentage (TIP)</td>
            <td>The total amount of interest that you will pay over the loan term as a percentage of your loan amount.</td>
            <td style={{ textAlign: 'right', fontWeight: 'bold' }}>%</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginBottom: '20px' }}>
        <div className="grey-header" style={{ padding: '5px', marginBottom: '10px' }}>Other Disclosures</div>
        <div style={{ fontSize: '9px', lineHeight: '1.6' }}>
          <p><strong>Appraisal:</strong> If the property was appraised for your loan, your lender is required to give you a copy at no additional cost at least 3 days before closing.</p>
          <p><strong>Contract Details:</strong> See your note and security instrument for information about nonpayment, default, any required repayment in full before the scheduled date, prepayment refunds and penalties.</p>
          <p><strong>Liability after Foreclosure:</strong> If your lender forecloses on this property and the foreclosure does not cover the amount of unpaid balance on this loan,</p>
          <p><strong>Refinance:</strong> Refinancing this loan will depend on your future financial situation, the property value, and market conditions.</p>
          <p><strong>Tax Deductions:</strong> If you borrow more than this property is worth, the interest on the loan amount above this property's fair market value is not deductible from your federal income taxes.</p>
        </div>
      </div>

      <div className="document-footer">
        <div>Closing Disclosure</div>
        <div>Page 5 - Loan ID #</div>
      </div>
    </div>
  );

  const renderPage6 = () => (
    <div className="document-page" data-page="6">
      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px' }}>Contact Information</div>
      
      <table className="document-table" style={{ marginBottom: '20px' }}>
        <thead>
          <tr>
            <th className="grey-header">Lender</th>
            <th className="grey-header">Mortgage Broker</th>
            <th className="grey-header">Real Estate Broker (B)</th>
            <th className="grey-header">Real Estate Broker (S)</th>
            <th className="grey-header">Settlement Agent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ verticalAlign: 'top' }}>
              <div style={{ fontSize: '9px' }}>
                <strong>Name</strong><br />
                Address<br />
                <br />
                NMLS ID<br />
                State License ID<br />
                Contact<br />
                Contact NMLS ID<br />
                Contact State License ID<br />
                Email<br />
                Phone
              </div>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <div style={{ fontSize: '9px' }}>
                <strong>Name</strong><br />
                Address<br />
                <br />
                NMLS ID<br />
                State License ID<br />
                Contact<br />
                Contact NMLS ID<br />
                Contact State License ID<br />
                Email<br />
                Phone
              </div>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <div style={{ fontSize: '9px' }}>
                <strong>Name</strong><br />
                Address<br />
                <br />
                License ID<br />
                Contact<br />
                Email<br />
                Phone
              </div>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <div style={{ fontSize: '9px' }}>
                <strong>Name</strong><br />
                Address<br />
                <br />
                License ID<br />
                Contact<br />
                Email<br />
                Phone
              </div>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <div style={{ fontSize: '9px' }}>
                <strong>First National Title & Escrow</strong><br />
                123 Main Street<br />
                Warwick, RI 02886<br />
                <br />
                Contact<br />
                Email<br />
                Phone
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginBottom: '20px' }}>
        <div className="grey-header" style={{ padding: '5px', marginBottom: '10px' }}>Confirm Receipt</div>
        <div style={{ fontSize: '9px', lineHeight: '1.4' }}>
          <p>By signing, you are only confirming that you have received this form. You do not have to accept this loan because you have signed or received this form.</p>
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <div style={{ borderBottom: '1px solid #000', marginBottom: '5px', height: '30px' }}></div>
                <div>Applicant Signature</div>
                <div>Date</div>
              </div>
              <div>
                <div style={{ borderBottom: '1px solid #000', marginBottom: '5px', height: '30px' }}></div>
                <div>Co-Applicant Signature</div>
                <div>Date</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="document-footer">
        <div>Closing Disclosure</div>
        <div>Page 6 - Loan ID #</div>
      </div>
    </div>
  );

  const pages = [
    renderPage1,
    renderPage2,
    renderPage3,
    renderPage4,
    renderPage5,
    renderPage6
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      <style dangerouslySetInnerHTML={{ __html: documentStyles }} />
      
      {/* Left Sidebar */}
      <section className="w-72 bg-gray-800 border-r border-gray-600 p-6">
        <div className="mb-6">
          <h2 className="text-white text-xl mb-4">
            <i className="fa fa-file-text mr-2"></i>
            Closing Disclosure
          </h2>
          <p className="text-gray-400 text-sm">
            Official 6-page TRID Closing Disclosure document
          </p>
        </div>

        {/* Page Navigation */}
        <div className="mb-6">
          <h3 className="text-gray-400 text-xs uppercase mb-3">Pages</h3>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Page {page}
                {page === 1 && ' - Overview'}
                {page === 2 && ' - Closing Costs'}
                {page === 3 && ' - Cash to Close'}
                {page === 4 && ' - Additional Info'}
                {page === 5 && ' - Calculations'}
                {page === 6 && ' - Contacts'}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={saveOrderData}
            disabled={saving}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <i className="fa fa-save"></i>
                Save Data
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            <i className="fa fa-print mr-2"></i>
            Print Document
          </button>
          <button
            onClick={handleExport}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <i className="fa fa-download mr-2"></i>
            Export PDF
          </button>
        </div>
      </section>

      {/* Document Viewer */}
      <section className="flex-1 overflow-auto">
        <div className="document-viewer">
          {/* Page Controls */}
          <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-6 py-3 flex justify-between items-center no-print">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setCurrentPage(1);
                  setTimeout(() => {
                    const allPages = document.querySelectorAll('.document-page');
                    allPages.forEach(page => {
                      (page as HTMLElement).style.display = 'block';
                    });
                  }, 100);
                }}
                className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              >
                <i className="fa fa-th-list mr-2"></i>
                View All
              </button>
            </div>
          </div>

          {/* Document Pages */}
          <div id="document-container">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : (
              pages[currentPage - 1]()
            )}
          </div>
        </div>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 p-4">
        <div className="mb-6">
          <h3 className="text-white text-sm font-semibold mb-3">Document Info</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Type:</span>
              <span className="text-gray-300">Closing Disclosure</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Pages:</span>
              <span className="text-gray-300">6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="text-green-400">Final</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-white text-sm font-semibold mb-3">Quick Links</h3>
          <div className="space-y-2">
            <button
              onClick={() => setCurrentPage(1)}
              className="w-full text-left text-xs text-gray-300 hover:text-white transition-colors"
            >
              → Loan Terms
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className="w-full text-left text-xs text-gray-300 hover:text-white transition-colors"
            >
              → Closing Costs
            </button>
            <button
              onClick={() => setCurrentPage(3)}
              className="w-full text-left text-xs text-gray-300 hover:text-white transition-colors"
            >
              → Cash to Close
            </button>
            <button
              onClick={() => setCurrentPage(5)}
              className="w-full text-left text-xs text-gray-300 hover:text-white transition-colors"
            >
              → Loan Calculations
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}