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
  const { loading, saving, handleInputChange, getValue, saveOrderData } = useOrderData();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

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
              <tr><td>Date Issued</td><td data-schema-key="closing_disclosure.date_issued"></td></tr>
              <tr><td>Closing Date</td><td data-schema-key="closing_disclosure.closing_date">03/21/2025</td></tr>
              <tr><td>Disbursement Date</td><td data-schema-key="closing_disclosure.disbursement_date"></td></tr>
              <tr><td>Settlement Agent</td><td data-schema-key="closing_disclosure.settlement_agent">First National Title & Escrow</td></tr>
              <tr><td>File #</td><td data-schema-key="order.file_number">TomTestCD</td></tr>
              <tr><td>Property</td><td data-schema-key="property.address">123 TEST TOM FILE CD<br />Warwick, RI 02886</td></tr>
              <tr><td>Sale Price</td><td data-schema-key="sale_price" style={{ fontWeight: 'bold' }}>$500,000.00</td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '11px' }}>Transaction Information</div>
          <table className="document-table">
            <tbody>
              <tr><td>Borrower(s)</td><td data-schema-key="borrowers">Tom TEST TOM TEST<br />120 Fraser Ave<br />Santa Monica, CA 90405</td></tr>
              <tr><td>Seller(s)</td><td data-schema-key="sellers"><br /></td></tr>
              <tr><td>Lender</td><td data-schema-key="lender.name"></td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '11px' }}>Loan Information</div>
          <table className="document-table">
            <tbody>
              <tr><td>Loan Term</td><td data-schema-key="loan.term"></td></tr>
              <tr><td>Purpose</td><td data-schema-key="loan.purpose">Purchase</td></tr>
              <tr><td>Product</td><td data-schema-key="loan.product"></td></tr>
              <tr><td>Loan Type</td><td data-schema-key="loan.type">Conventional Insured</td></tr>
              <tr><td>Loan ID #</td><td data-schema-key="loan.id"></td></tr>
              <tr><td>MIC #</td><td data-schema-key="loan.mic"></td></tr>
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
            <td data-schema-key="loan.amount"></td>
            <td><span style={{ fontWeight: 'bold' }}>No</span></td>
          </tr>
          <tr>
            <td>Interest Rate</td>
            <td data-schema-key="loan.interest_rate"></td>
            <td><span style={{ fontWeight: 'bold' }}>No</span></td>
          </tr>
          <tr>
            <td>Monthly Principal & Interest<br /><small style={{ fontSize: '8px' }}>See Projected Payments below for your Estimated Total Monthly Payment</small></td>
            <td data-schema-key="loan.monthly_pi"></td>
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
              <div style={{ fontWeight: 'bold' }}>$1,058.00</div>
              <div style={{ fontSize: '8px' }}>Includes $1,050.00 in Loan Costs + $508.00 in Other Costs - $-500.00 in Lender Credits.</div>
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
          {[1, 2, 3].map(i => (
            <tr key={`orig-${i}`}>
              <td colSpan={2}><span style={{ marginRight: '5px' }}>{String(i).padStart(2, '0')}</span></td>
              <td></td><td></td><td></td><td></td><td></td>
            </tr>
          ))}
          
          <tr className="grey-header">
            <td colSpan={2}>B. Services Borrower Did Not Shop For</td>
            <td colSpan={2}></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          {[1, 2].map(i => (
            <tr key={`no-shop-${i}`}>
              <td colSpan={2}><span style={{ marginRight: '5px' }}>{String(i).padStart(2, '0')}</span></td>
              <td></td><td></td><td></td><td></td><td></td>
            </tr>
          ))}
          
          <tr className="grey-header">
            <td colSpan={2}>C. Services Borrower Did Shop For</td>
            <td colSpan={2}><strong>$1,050.00</strong></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>01</span> Closing Protection Letter to First National Title & Escrow</td><td>$50.00</td><td></td><td></td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>02</span> Courier Fee to First National Title & Escrow</td><td>$50.00</td><td></td><td></td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>03</span> Municipal Lien Certificate to First National Title & Escrow</td><td>$25.00</td><td></td><td></td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>04</span> Settlement or Closing Fee to First National Title & Escrow</td><td>$550.00</td><td></td><td></td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>05</span> Title - Lender's Title Policy to CATIC</td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>06</span> Title Search Fee to First National Title & Escrow</td><td>$350.00</td><td></td><td></td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>07</span> Wire Verification Fee to First National Title & Escrow</td><td>$25.00</td><td></td><td></td><td></td><td></td></tr>
          
          <tr className="black-header">
            <td colSpan={2}>D. TOTAL LOAN COSTS (Borrower-Paid)</td>
            <td colSpan={2}><strong>$1,050.00</strong></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={2}>Loan Costs Subtotals (A + B + C)</td>
            <td>$1,050.00</td><td></td><td></td><td></td><td></td>
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
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>01</span> Recording Fees Deed: Mortgage:</td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>02</span> State Transfer Taxes (Deed) to City of Warwick</td><td></td><td></td><td>$230.00</td><td></td><td></td></tr>
          
          <tr className="grey-header">
            <td colSpan={2}>F. Prepaids</td>
            <td colSpan={2}></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>01</span> Homeowner's Insurance Premium ( mo.)</td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>02</span> Mortgage Insurance Premium ( mo.)</td><td></td><td></td><td></td><td></td><td></td></tr>
          
          <tr className="grey-header">
            <td colSpan={2}>G. Initial Escrow Payment at Closing</td>
            <td colSpan={2}><strong>$-500.00</strong></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>08</span> Aggregate adjustment</td><td>$-500.00</td><td></td><td></td><td></td><td></td></tr>
          
          <tr className="grey-header">
            <td colSpan={2}>H. Other</td>
            <td colSpan={2}><strong>$1,008.00</strong></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>01</span> Listing Agent Commission</td><td></td><td></td><td>$10,000.00</td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>02</span> Selling Agent Commission</td><td></td><td></td><td>$10,000.00</td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>03</span> Sewer Charges to First National Title & Escrow</td><td></td><td></td><td>$500.00</td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>04</span> Title - Owner's Title Policy (Optional) to CATIC</td><td>$1,008.00</td><td></td><td></td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>05</span> Water Charges to First National Title & Escrow</td><td></td><td></td><td>$500.00</td><td></td><td></td></tr>
          <tr><td colSpan={2}><span style={{ marginRight: '5px' }}>06</span> Wire Verification Fee to First National Title & Escrow</td><td></td><td></td><td>$25.00</td><td></td><td></td></tr>
          
          <tr className="black-header">
            <td colSpan={2}>I. TOTAL OTHER COSTS (Borrower-Paid)</td>
            <td colSpan={2}><strong>$508.00</strong></td>
            <td colSpan={2}></td>
            <td></td>
          </tr>
          
          <tr className="black-header">
            <td colSpan={2}>J. TOTAL CLOSING COSTS (Borrower-Paid)</td>
            <td colSpan={2}><strong>$1,058.00</strong></td>
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
            <td>$1,058.00</td>
            <td></td>
          </tr>
          <tr>
            <td>Closing Costs Paid Before Closing</td>
            <td></td>
            <td>$0.00</td>
            <td></td>
          </tr>
          <tr>
            <td>Closing Costs Financed (Paid from your Loan Amount)</td>
            <td></td>
            <td>$0.00</td>
            <td></td>
          </tr>
          <tr>
            <td>Down Payment/Funds from Borrower</td>
            <td></td>
            <td>$450,988.56</td>
            <td></td>
          </tr>
          <tr>
            <td>Deposit</td>
            <td></td>
            <td>$0.00</td>
            <td></td>
          </tr>
          <tr>
            <td>Funds for Borrower</td>
            <td></td>
            <td>$0.00</td>
            <td></td>
          </tr>
          <tr>
            <td>Seller Credits</td>
            <td></td>
            <td>$0.00</td>
            <td></td>
          </tr>
          <tr>
            <td>Adjustments and Other Credits</td>
            <td></td>
            <td>$0.00</td>
            <td></td>
          </tr>
          <tr className="black-header">
            <td><strong>Cash to Close</strong></td>
            <td></td>
            <td><strong>$452,046.56</strong></td>
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