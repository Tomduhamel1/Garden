import React from 'react';
import CDField from './CDField';

// Import the exact styles from the original ClosingDisclosure
const documentStyles = `
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
`;

const CDPage1: React.FC = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: documentStyles }} />
      <div className="document-page" data-page="1">
        <h1>
          <span className="sub-header">This form is a statement of final loan terms and closing costs. Compare this document with your Loan Estimate.</span>
          Closing Disclosure
        </h1>
        
        {/* Loan Overview - Three column grid exactly as original */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '11px' }}>Closing Information</div>
            <table className="document-table">
              <tbody>
                <tr>
                  <td>Date Issued</td>
                  <td>
                    <CDField
                      fieldId="date-issued"
                      schemaKey="cdfData.transaction_information.borrower_statement_issued_date"
                      type="date"
                      format="date"
                      documentMode={true}
                      mappings={{
                        ucd: null, // Not defined in UCD - CD form field only
                        qualia: "closing_disclosure_issued_date",
                        gui: "LoanTerms.tsx:line_71"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Closing Date</td>
                  <td>
                    <CDField
                      fieldId="closing-date"
                      schemaKey="closingDate"
                      type="date"
                      format="date"
                      documentMode={true}
                      placeholder="03/21/2025"
                      mappings={{
                        ucd: null, // Not defined in UCD - CD form field only
                        qualia: "closing_date",
                        gui: "BasicInfo.tsx"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Disbursement Date</td>
                  <td>
                    <CDField
                      fieldId="disbursement-date"
                      schemaKey="cdfData.transaction_information.disbursement_date"
                      type="date"
                      format="date"
                      documentMode={true}
                      mappings={{
                        ucd: null, // Not defined in UCD - CD form field only
                        qualia: "disbursement_date"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Settlement Agent</td>
                  <td>
                    <CDField
                      fieldId="settlement-agent"
                      schemaKey="contactsData.title_companies.0.company_name"
                      type="text"
                      documentMode={true}
                      placeholder="First National Title & Escrow"
                      mappings={{
                        ucd: null, // Not defined in UCD - CD form field only
                        qualia: "settlement_agent.name",
                        gui: "Contacts.tsx"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>File #</td>
                  <td>
                    <CDField
                      fieldId="file-number"
                      schemaKey="file_number"
                      type="text"
                      documentMode={true}
                      placeholder="TomTestCD"
                      mappings={{
                        ucd: null, // Not defined in UCD - CD form field only
                        qualia: "file_number",
                        gui: "BasicInfo.tsx"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Property</td>
                  <td>
                    <CDField
                      fieldId="property-address"
                      schemaKey="propertiesData.properties.0.address"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "PROPERTY.AddressLine1",
                        qualia: "property.address",
                        gui: "Property.tsx"
                      }}
                    /><br />
                    <CDField
                      fieldId="property-city"
                      schemaKey="propertiesData.properties.0.city"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "PROPERTY.City",
                        qualia: "property.city",
                        gui: "Property.tsx"
                      }}
                    />, 
                    <CDField
                      fieldId="property-state"
                      schemaKey="propertiesData.properties.0.state"
                      type="text"
                      documentMode={true}
                      style={{ marginLeft: '2px' }}
                      mappings={{
                        ucd: "PROPERTY.State",
                        qualia: "property.state",
                        gui: "Property.tsx"
                      }}
                    />{' '}
                    <CDField
                      fieldId="property-zip"
                      schemaKey="propertiesData.properties.0.zip"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "PROPERTY.PostalCode",
                        qualia: "property.zip",
                        gui: "Property.tsx"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Sale Price</td>
                  <td style={{ fontWeight: 'bold' }}>
                    <CDField
                      fieldId="sale-price"
                      schemaKey="cdfData.transaction_information.purchase_price"
                      type="currency"
                      format="currency"
                      documentMode={true}
                      mappings={{
                        ucd: "PROPERTY.SalePrice",
                        qualia: "purchase_price",
                        gui: "BasicInfo.tsx"
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '11px' }}>Transaction Information</div>
            <table className="document-table">
              <tbody>
                <tr>
                  <td>Borrower(s)</td>
                  <td>
                    <CDField
                      fieldId="borrower-first-name"
                      schemaKey="contactsData.borrowers.0.first_name"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "BORROWER.FirstName",
                        qualia: "borrower.first_name",
                        gui: "Contacts.tsx"
                      }}
                    />{' '}
                    <CDField
                      fieldId="borrower-last-name"
                      schemaKey="contactsData.borrowers.0.last_name"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "BORROWER.LastName",
                        qualia: "borrower.last_name",
                        gui: "Contacts.tsx"
                      }}
                    /><br />
                    <CDField
                      fieldId="borrower-address"
                      schemaKey="contactsData.borrowers.0.current_address.address_1"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "BORROWER.AddressLine1",
                        qualia: "borrower.address",
                        gui: "Contacts.tsx"
                      }}
                    /><br />
                    <CDField
                      fieldId="borrower-city"
                      schemaKey="contactsData.borrowers.0.current_address.city"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "BORROWER.City",
                        qualia: "borrower.city",
                        gui: "Contacts.tsx"
                      }}
                    />, 
                    <CDField
                      fieldId="borrower-state"
                      schemaKey="contactsData.borrowers.0.current_address.state"
                      type="text"
                      documentMode={true}
                      style={{ marginLeft: '2px' }}
                      mappings={{
                        ucd: "BORROWER.State",
                        qualia: "borrower.state",
                        gui: "Contacts.tsx"
                      }}
                    />{' '}
                    <CDField
                      fieldId="borrower-zip"
                      schemaKey="contactsData.borrowers.0.current_address.zipcode"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "BORROWER.PostalCode",
                        qualia: "borrower.zipcode",
                        gui: "Contacts.tsx"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Seller(s)</td>
                  <td>
                    <CDField
                      fieldId="seller-first-name"
                      schemaKey="contactsData.sellers.0.first_name"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "SELLER.FirstName",
                        qualia: "seller.first_name",
                        gui: "Contacts.tsx"
                      }}
                    />{' '}
                    <CDField
                      fieldId="seller-last-name"
                      schemaKey="contactsData.sellers.0.last_name"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "SELLER.LastName",
                        qualia: "seller.last_name",
                        gui: "Contacts.tsx"
                      }}
                    /><br />
                    <CDField
                      fieldId="seller-address"
                      schemaKey="contactsData.sellers.0.current_address.address_1"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "SELLER.AddressLine1",
                        qualia: "seller.address",
                        gui: "Contacts.tsx"
                      }}
                    /><br />
                    <CDField
                      fieldId="seller-city"
                      schemaKey="contactsData.sellers.0.current_address.city"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "SELLER.City",
                        qualia: "seller.city",
                        gui: "Contacts.tsx"
                      }}
                    />, 
                    <CDField
                      fieldId="seller-state"
                      schemaKey="contactsData.sellers.0.current_address.state"
                      type="text"
                      documentMode={true}
                      style={{ marginLeft: '2px' }}
                      mappings={{
                        ucd: "SELLER.State",
                        qualia: "seller.state",
                        gui: "Contacts.tsx"
                      }}
                    />{' '}
                    <CDField
                      fieldId="seller-zip"
                      schemaKey="contactsData.sellers.0.current_address.zipcode"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "SELLER.PostalCode",
                        qualia: "seller.zipcode",
                        gui: "Contacts.tsx"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Lender</td>
                  <td>
                    <CDField
                      fieldId="lender-name"
                      schemaKey="contactsData.lenders.0.company_name"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "LENDER.Name",
                        qualia: "lender.name",
                        gui: "Contacts.tsx"
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '11px' }}>Loan Information</div>
            <table className="document-table">
              <tbody>
                <tr>
                  <td>Loan Term</td>
                  <td>
                    <CDField
                      fieldId="loan-term"
                      schemaKey="cdfData.loans.0.loan_term_years"
                      documentMode={true}
                      mappings={{
                        ucd: "LOAN.LoanTermYears",
                        qualia: "loan.term_years",
                        gui: "LoanTerms.tsx"
                      }}
                    /> years
                  </td>
                </tr>
                <tr>
                  <td>Purpose</td>
                  <td>
                    <CDField
                      fieldId="loan-purpose"
                      schemaKey="cdfData.loans.0.loan_purpose"
                      documentMode={true}
                      placeholder="Purchase"
                      mappings={{
                        ucd: "LOAN.Purpose",
                        qualia: "loan.purpose",
                        gui: "LoanTerms.tsx"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Product</td>
                  <td>
                    <CDField
                      fieldId="loan-product"
                      schemaKey="cdfData.loans.0.loan_product"
                      documentMode={true}
                      mappings={{
                        ucd: "LOAN.Product",
                        qualia: "loan.product",
                        gui: "LoanTerms.tsx"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Loan Type</td>
                  <td>
                    <CDField
                      fieldId="loan-type"
                      schemaKey="cdfData.loans.0.loan_type"
                      documentMode={true}
                      placeholder="Conventional"
                      mappings={{
                        ucd: "LOAN.Type",
                        qualia: "loan.type",
                        gui: "LoanTerms.tsx"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Loan ID #</td>
                  <td>
                    <CDField
                      fieldId="loan-number"
                      schemaKey="cdfData.loans.0.loan_number"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: "LOAN.LoanNumber",
                        qualia: "loan.loan_number",
                        gui: "LoanTerms.tsx"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>MIC #</td>
                  <td>
                    <CDField
                      fieldId="mic-number"
                      schemaKey="cdfData.loans.0.mortgage_insurance_case_number"
                      type="text"
                      documentMode={true}
                      mappings={{
                        ucd: null, // Not defined in UCD - CD form field only
                        qualia: "loan.mic_number",
                        gui: "LoanTerms.tsx"
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Loan Terms Table - exact structure as original */}
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
              <td>
                <CDField
                  fieldId="loan-amount"
                  schemaKey="cdfData.loans.0.initial_loan_amount"
                  documentMode={true}
                  mappings={{
                    ucd: "LOAN.LoanAmount",
                    qualia: "loan.amount",
                    gui: "LoanTerms.tsx:line_173"
                  }}
                />
              </td>
              <td><span style={{ fontWeight: 'bold' }}>No</span></td>
            </tr>
            <tr>
              <td>Interest Rate</td>
              <td>
                <CDField
                  fieldId="interest-rate"
                  schemaKey="cdfData.loans.0.interest_rate"
                  documentMode={true}
                  mappings={{
                    ucd: "LOAN.InterestRate",
                    qualia: "loan.interest_rate",
                    gui: "LoanTerms.tsx:line_202"
                  }}
                />
              </td>
              <td><span style={{ fontWeight: 'bold' }}>No</span></td>
            </tr>
            <tr>
              <td>Monthly Principal & Interest<br /><small style={{ fontSize: '8px' }}>See Projected Payments below for your Estimated Total Monthly Payment</small></td>
              <td>
                <CDField
                  fieldId="monthly-pi"
                  schemaKey="cdfData.loans.0.monthly_principal_and_interest"
                  documentMode={true}
                  mappings={{
                    ucd: "LOAN.MonthlyPrincipalAndInterest",
                    qualia: "loan.monthly_principal_interest",
                    gui: "LoanTerms.tsx:line_231"
                  }}
                />
              </td>
              <td><span style={{ fontWeight: 'bold' }}>No</span></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="grey-header">Does the loan have these features?</td>
            </tr>
            <tr>
              <td>Prepayment Penalty</td>
              <td></td>
              <td><span style={{ fontWeight: 'bold' }}>No</span></td>
            </tr>
            <tr>
              <td>Balloon Payment</td>
              <td></td>
              <td>
                <CDField
                  fieldId="has-balloon"
                  schemaKey="cdfData.loans.0.has_balloon_payment"
                  documentMode={true}
                  mappings={{
                    ucd: "LOAN.BalloonIndicator",
                    qualia: "loan.has_balloon_payment",
                    gui: "LoanTerms.tsx:line_282"
                  }}
                /> 
                <small style={{ fontSize: '8px', marginLeft: '5px' }}>
                  <CDField
                    fieldId="balloon-description"
                    schemaKey="cdfData.loans.0.balloon_payment_description.0"
                    type="text"
                    documentMode={true}
                    placeholder=""
                    mappings={{
                      ucd: null, // Not defined in UCD - CD form field only
                      qualia: "loan.balloon_description"
                    }}
                  />
                </small>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Projected Payments - Grid with two columns */}
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
                  <td>
                    <CDField
                      fieldId="year1-pi"
                      schemaKey="cdfData.projected_payments.year1.principal_interest"
                      type="currency"
                      format="currency"
                      documentMode={true}
                      placeholder="——"
                      mappings={{
                        ucd: null, // Not defined in UCD - CD form field only
                        qualia: "projected_payments.year1.pi"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Mortgage Insurance</td>
                  <td>+ 
                    <CDField
                      fieldId="year1-mi"
                      schemaKey="cdfData.projected_payments.year1.mortgage_insurance"
                      type="currency"
                      format="currency"
                      documentMode={true}
                      placeholder="——"
                      style={{ marginLeft: '5px' }}
                      mappings={{
                        ucd: null, // Not defined in UCD - CD form field only
                        qualia: "projected_payments.year1.mi"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Estimated Escrow<br /><small style={{ fontSize: '8px' }}>Amount can increase over time.</small></td>
                  <td>+ 
                    <CDField
                      fieldId="year1-escrow"
                      schemaKey="cdfData.projected_payments.year1.estimated_escrow"
                      type="currency"
                      format="currency"
                      documentMode={true}
                      placeholder="——"
                      style={{ marginLeft: '5px' }}
                      mappings={{
                        ucd: null, // Not defined in UCD - CD form field only
                        qualia: "projected_payments.year1.escrow"
                      }}
                    />
                  </td>
                </tr>
                <tr className="grey-header">
                  <td><strong>Estimated Total Monthly Payment</strong></td>
                  <td>
                    <CDField
                      fieldId="year1-total"
                      schemaKey="cdfData.projected_payments.year1.total_payment"
                      type="currency"
                      format="currency"
                      documentMode={true}
                      style={{ fontWeight: 'bold' }}
                      mappings={{
                        ucd: null, // Not defined in UCD - CD form field only
                        qualia: "projected_payments.year1.total"
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <table className="document-table">
              <tbody>
                <tr>
                  <td colSpan={2} style={{ fontWeight: 'bold', fontSize: '9px' }}>
                    Estimated Taxes, Insurance & Assessments
                  </td>
                </tr>
                <tr>
                  <td>
                    <CDField
                      fieldId="estimated-tia"
                      schemaKey="cdfData.estimated_taxes_insurance_assessments"
                      type="currency"
                      format="currency"
                      documentMode={true}
                      mappings={{
                        ucd: null, // Not defined in UCD - CD form field only
                        qualia: "estimated_property_costs.total"
                      }}
                    />
                  </td>
                  <td style={{ fontSize: '8px' }}>a month</td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ fontSize: '8px' }}>
                    This estimate includes<br />
                    ☑ Property Taxes<br />
                    ☑ Homeowner's Insurance<br />
                    ☐ Other: <br />
                    ☐ <br />
                    See Section G on page 2 for escrowed property costs. 
                    You must pay for other property costs separately.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Costs at Closing Table */}
        <table className="document-table">
          <thead>
            <tr>
              <th className="black-header" colSpan={3}>Costs at Closing</th>
            </tr>
          </thead>
          <tbody>
            <tr className="grey-header">
              <td style={{ width: '40%' }}>Closing Costs</td>
              <td style={{ width: '20%', textAlign: 'right' }}>
                <CDField
                  fieldId="closing-costs"
                  schemaKey="cdfData.closing_costs_total"
                  type="currency"
                  format="currency"
                  documentMode={true}
                  style={{ fontWeight: 'bold' }}
                  mappings={{
                    ucd: "CLOSING.TotalClosingCosts",
                    qualia: "closing_costs.total"
                  }}
                />
              </td>
              <td style={{ fontSize: '8px' }}>
                Includes{' '}
                <CDField
                  fieldId="lender-credits"
                  schemaKey="cdfData.lender_credits"
                  type="currency"
                  format="currency"
                  documentMode={true}
                  mappings={{
                    ucd: "CLOSING.LenderCredits",
                    qualia: "lender_credits"
                  }}
                /> in Lender Credits. 
                See Page 2 for details.
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Cash to Close</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <CDField
                  fieldId="cash-to-close"
                  schemaKey="cdfData.cash_to_close"
                  type="currency"
                  format="currency"
                  documentMode={true}
                  style={{ fontWeight: 'bold' }}
                  mappings={{
                    ucd: "CLOSING.CashToClose",
                    qualia: "cash_to_close.total"
                  }}
                />
              </td>
              <td style={{ fontSize: '8px' }}>
                Includes Closing Costs. See Calculating Cash to Close on page 3 for details.
              </td>
            </tr>
          </tbody>
        </table>

        {/* Page footer */}
        <div style={{
          position: 'absolute',
          bottom: '0.5in',
          left: '0.5in',
          right: '0.5in',
          fontSize: '8px',
          textAlign: 'center',
          paddingTop: '10px',
          borderTop: '1px solid #000'
        }}>
          CLOSING DISCLOSURE &nbsp;&nbsp;&nbsp; PAGE 1 OF 5 • LOAN ID # 
          <CDField
            fieldId="loan-id-footer"
            schemaKey="cdfData.loans.0.loan_number"
            type="text"
            documentMode={true}
            style={{ marginLeft: '5px' }}
            mappings={{
              ucd: "LOAN.LoanNumber",
              qualia: "loan.loan_number"
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CDPage1;