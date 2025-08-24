/**
 * PDF Generation Service
 * Creates closing documents, settlement statements, and other PDFs
 */

import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font, Image } from '@react-pdf/renderer';
import type { OrderData } from '../types/schema';
import { formatCurrency, calculateClosingCostSummary, calculateBorrowerProceeds, calculateSellerProceeds } from '../utils/calculations';

// Register fonts for better typography
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v1/HelveticaNeue-Regular.ttf' },
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v1/HelveticaNeue-Bold.ttf', fontWeight: 'bold' },
  ]
});

// Common styles for all documents
const commonStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2px solid #000',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  col: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontSize: 11,
    color: '#000',
  },
  table: {
    marginTop: 10,
    borderTop: '1px solid #ccc',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #eee',
    paddingVertical: 5,
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    paddingHorizontal: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    borderTop: '1px solid #ccc',
    paddingTop: 10,
  },
  pageNumber: {
    fontSize: 10,
    textAlign: 'center',
    color: '#666',
  },
  signatureLine: {
    borderBottom: '1px solid #000',
    marginTop: 30,
    marginBottom: 5,
    width: 200,
  },
  signatureLabel: {
    fontSize: 10,
    color: '#666',
  },
  importantNote: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffc107',
    padding: 10,
    marginVertical: 10,
  },
  warningText: {
    fontSize: 10,
    color: '#856404',
  }
});

/**
 * Generate Closing Disclosure PDF
 * TRID-compliant 5-page closing disclosure document
 */
export const ClosingDisclosureDocument = ({ order }: { order: OrderData }) => {
  const cdf = order.cdf_data || {};
  const closingCosts = calculateClosingCostSummary(order);
  const borrowerProceeds = calculateBorrowerProceeds(order);

  return (
    <Document>
      {/* Page 1: Loan Terms and Projected Payments */}
      <Page size="LETTER" style={commonStyles.page}>
        <View style={commonStyles.header}>
          <Text style={commonStyles.title}>Closing Disclosure</Text>
          <Text style={commonStyles.subtitle}>This form is a statement of final loan terms and closing costs</Text>
        </View>

        {/* Closing Information Section */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Closing Information</Text>
          <View style={commonStyles.row}>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>Date Issued</Text>
              <Text style={commonStyles.value}>{new Date().toLocaleDateString()}</Text>
            </View>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>Closing Date</Text>
              <Text style={commonStyles.value}>{cdf.closing_information?.closing_date || 'TBD'}</Text>
            </View>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>Disbursement Date</Text>
              <Text style={commonStyles.value}>{cdf.closing_information?.disbursement_date || 'TBD'}</Text>
            </View>
          </View>
          <View style={commonStyles.row}>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>Property</Text>
              <Text style={commonStyles.value}>{order.properties_data?.address_1 || ''}</Text>
              <Text style={commonStyles.value}>
                {order.properties_data?.city || ''}, {order.properties_data?.state || ''} {order.properties_data?.zipcode || ''}
              </Text>
            </View>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>Sale Price</Text>
              <Text style={commonStyles.value}>{formatCurrency(parseFloat(order.properties_data?.sale_price || '0'))}</Text>
            </View>
          </View>
        </View>

        {/* Loan Terms Section */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Loan Terms</Text>
          <View style={commonStyles.row}>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>Loan Amount</Text>
              <Text style={commonStyles.value}>{formatCurrency(parseFloat(cdf.loans?.[0]?.initial_loan_amount || '0'))}</Text>
            </View>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>Interest Rate</Text>
              <Text style={commonStyles.value}>{cdf.loans?.[0]?.interest_rate || '0'}%</Text>
            </View>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>Monthly Principal & Interest</Text>
              <Text style={commonStyles.value}>{formatCurrency(parseFloat(cdf.loans?.[0]?.monthly_payment || '0'))}</Text>
            </View>
          </View>
          <View style={commonStyles.row}>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>Prepayment Penalty</Text>
              <Text style={commonStyles.value}>{cdf.loans?.[0]?.prepayment_penalty ? 'YES' : 'NO'}</Text>
            </View>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>Balloon Payment</Text>
              <Text style={commonStyles.value}>{cdf.loans?.[0]?.balloon_payment ? 'YES' : 'NO'}</Text>
            </View>
          </View>
        </View>

        {/* Projected Payments Section */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Projected Payments</Text>
          <View style={commonStyles.table}>
            <View style={[commonStyles.tableRow, commonStyles.tableHeader]}>
              <Text style={commonStyles.tableCell}>Payment Calculation</Text>
              <Text style={commonStyles.tableCell}>Years 1-7</Text>
              <Text style={commonStyles.tableCell}>Years 8-30</Text>
            </View>
            <View style={commonStyles.tableRow}>
              <Text style={commonStyles.tableCell}>Principal & Interest</Text>
              <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(cdf.loans?.[0]?.monthly_payment || '0'))}</Text>
              <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(cdf.loans?.[0]?.monthly_payment || '0'))}</Text>
            </View>
            <View style={commonStyles.tableRow}>
              <Text style={commonStyles.tableCell}>Mortgage Insurance</Text>
              <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(cdf.loans?.[0]?.monthly_mi || '0'))}</Text>
              <Text style={commonStyles.tableCell}>—</Text>
            </View>
            <View style={commonStyles.tableRow}>
              <Text style={commonStyles.tableCell}>Estimated Escrow</Text>
              <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(cdf.escrow?.monthly_payment || '0'))}</Text>
              <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(cdf.escrow?.monthly_payment || '0'))}</Text>
            </View>
            <View style={[commonStyles.tableRow, { borderTop: '2px solid #000', fontWeight: 'bold' }]}>
              <Text style={commonStyles.tableCell}>Estimated Total Monthly Payment</Text>
              <Text style={commonStyles.tableCell}>
                {formatCurrency(
                  parseFloat(cdf.loans?.[0]?.monthly_payment || '0') +
                  parseFloat(cdf.loans?.[0]?.monthly_mi || '0') +
                  parseFloat(cdf.escrow?.monthly_payment || '0')
                )}
              </Text>
              <Text style={commonStyles.tableCell}>
                {formatCurrency(
                  parseFloat(cdf.loans?.[0]?.monthly_payment || '0') +
                  parseFloat(cdf.escrow?.monthly_payment || '0')
                )}
              </Text>
            </View>
          </View>
        </View>

        {/* Costs at Closing Section */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Costs at Closing</Text>
          <View style={commonStyles.row}>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>Closing Costs</Text>
              <Text style={commonStyles.value}>{formatCurrency(closingCosts.totalClosingCosts)}</Text>
              <Text style={{ fontSize: 9, color: '#666' }}>Includes {formatCurrency(closingCosts.lenderCredits)} in Lender Credits</Text>
            </View>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>Cash to Close</Text>
              <Text style={commonStyles.value}>{formatCurrency(closingCosts.cashToClose)}</Text>
              <Text style={{ fontSize: 9, color: '#666' }}>Includes Closing Costs</Text>
            </View>
          </View>
        </View>

        <Text style={commonStyles.pageNumber}>Page 1 of 5</Text>
      </Page>

      {/* Page 2: Closing Cost Details */}
      <Page size="LETTER" style={commonStyles.page}>
        <View style={commonStyles.header}>
          <Text style={commonStyles.title}>Closing Cost Details</Text>
        </View>

        {/* Loan Costs Section */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>A. Origination Charges</Text>
          <View style={commonStyles.table}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => {
              const line = String(i).padStart(2, '0');
              const charge = cdf.origination_charges?.[`line_${line}`];
              if (charge?.description) {
                return (
                  <View key={i} style={commonStyles.tableRow}>
                    <Text style={[commonStyles.tableCell, { flex: 2 }]}>{charge.description}</Text>
                    <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(charge.amount || '0'))}</Text>
                  </View>
                );
              }
              return null;
            })}
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>B. Services Borrower Did Not Shop For</Text>
          <View style={commonStyles.table}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => {
              const line = String(i).padStart(2, '0');
              const service = cdf.did_not_shop_for?.[`line_${line}`];
              if (service?.description) {
                return (
                  <View key={i} style={commonStyles.tableRow}>
                    <Text style={[commonStyles.tableCell, { flex: 2 }]}>{service.description}</Text>
                    <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(service.amount || '0'))}</Text>
                  </View>
                );
              }
              return null;
            })}
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>C. Services Borrower Did Shop For</Text>
          <View style={commonStyles.table}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
              const line = String(i).padStart(2, '0');
              const service = cdf.did_shop_for?.[`line_${line}`];
              if (service?.description) {
                return (
                  <View key={i} style={commonStyles.tableRow}>
                    <Text style={[commonStyles.tableCell, { flex: 2 }]}>{service.description}</Text>
                    <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(service.amount || '0'))}</Text>
                  </View>
                );
              }
              return null;
            })}
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>D. Total Loan Costs (A + B + C)</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{formatCurrency(closingCosts.loanCosts)}</Text>
        </View>

        <Text style={commonStyles.pageNumber}>Page 2 of 5</Text>
      </Page>

      {/* Page 3: Other Costs and Cash to Close */}
      <Page size="LETTER" style={commonStyles.page}>
        <View style={commonStyles.header}>
          <Text style={commonStyles.title}>Other Costs</Text>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>E. Taxes and Other Government Fees</Text>
          <View style={commonStyles.tableRow}>
            <Text style={[commonStyles.tableCell, { flex: 2 }]}>Recording Fees</Text>
            <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(cdf.taxes_and_fees?.recording_fees || '0'))}</Text>
          </View>
          <View style={commonStyles.tableRow}>
            <Text style={[commonStyles.tableCell, { flex: 2 }]}>Transfer Taxes</Text>
            <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(cdf.taxes_and_fees?.transfer_taxes || '0'))}</Text>
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>F. Prepaids</Text>
          <View style={commonStyles.tableRow}>
            <Text style={[commonStyles.tableCell, { flex: 2 }]}>Homeowner's Insurance Premium</Text>
            <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(cdf.prepaids?.homeowners_insurance || '0'))}</Text>
          </View>
          <View style={commonStyles.tableRow}>
            <Text style={[commonStyles.tableCell, { flex: 2 }]}>Mortgage Insurance Premium</Text>
            <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(cdf.prepaids?.mortgage_insurance || '0'))}</Text>
          </View>
          <View style={commonStyles.tableRow}>
            <Text style={[commonStyles.tableCell, { flex: 2 }]}>Prepaid Interest</Text>
            <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(cdf.prepaids?.prepaid_interest || '0'))}</Text>
          </View>
          <View style={commonStyles.tableRow}>
            <Text style={[commonStyles.tableCell, { flex: 2 }]}>Property Taxes</Text>
            <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(cdf.prepaids?.property_taxes || '0'))}</Text>
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>G. Initial Escrow Payment at Closing</Text>
          <Text style={commonStyles.value}>{formatCurrency(parseFloat(cdf.escrow?.initial_payment || '0'))}</Text>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>H. Other</Text>
          <View style={commonStyles.table}>
            {[1, 2, 3, 4, 5, 6].map(i => {
              const line = String(i).padStart(2, '0');
              const charge = cdf.other_charges?.[`line_${line}`];
              if (charge?.description) {
                return (
                  <View key={i} style={commonStyles.tableRow}>
                    <Text style={[commonStyles.tableCell, { flex: 2 }]}>{charge.description}</Text>
                    <Text style={commonStyles.tableCell}>{formatCurrency(parseFloat(charge.amount || '0'))}</Text>
                  </View>
                );
              }
              return null;
            })}
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>I. Total Other Costs (E + F + G + H)</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{formatCurrency(closingCosts.otherCosts)}</Text>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>J. Total Closing Costs (D + I)</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{formatCurrency(closingCosts.totalClosingCosts)}</Text>
          <Text style={{ fontSize: 10, color: '#666' }}>
            Lender Credits: {formatCurrency(closingCosts.lenderCredits)}
          </Text>
        </View>

        <Text style={commonStyles.pageNumber}>Page 3 of 5</Text>
      </Page>

      {/* Page 4: Loan Disclosures */}
      <Page size="LETTER" style={commonStyles.page}>
        <View style={commonStyles.header}>
          <Text style={commonStyles.title}>Additional Information About This Loan</Text>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Loan Disclosures</Text>
          
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 5 }}>Assumption</Text>
            <Text style={{ fontSize: 10 }}>
              If you sell or transfer this property to another person, your lender
              {cdf.loan_disclosures?.assumption_allowed ? ' will allow' : ' will not allow'} 
              , under certain conditions, this person to assume this loan on the original terms.
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 5 }}>Demand Feature</Text>
            <Text style={{ fontSize: 10 }}>
              Your loan {cdf.loan_disclosures?.demand_feature ? 'has' : 'does not have'} a demand feature, 
              which permits your lender to require early repayment of the loan.
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 5 }}>Late Payment</Text>
            <Text style={{ fontSize: 10 }}>
              If your payment is more than {cdf.loans?.[0]?.penalty_grace_period_days || '15'} days late, 
              you will be charged {cdf.loans?.[0]?.late_penalty_type === '%' 
                ? `${cdf.loans?.[0]?.late_penalty_amount || '5'}% of the monthly payment`
                : formatCurrency(parseFloat(cdf.loans?.[0]?.late_penalty_amount || '0'))}.
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 5 }}>Negative Amortization</Text>
            <Text style={{ fontSize: 10 }}>
              Under your loan terms, {cdf.loan_disclosures?.negative_amortization ? 'you may have' : 'you do not have'} 
              {' '}monthly payments that do not pay all of the interest due that month. This is called negative amortization.
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 5 }}>Partial Payments</Text>
            <Text style={{ fontSize: 10 }}>
              Your lender {cdf.loan_disclosures?.partial_payments ? 'may accept' : 'does not accept'} payments 
              that are less than the full amount due (partial payments).
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 5 }}>Security Interest</Text>
            <Text style={{ fontSize: 10 }}>
              You are granting a security interest in {order.properties_data?.address_1 || 'the property'}.
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 5 }}>Escrow Account</Text>
            <Text style={{ fontSize: 10 }}>
              Your loan {cdf.escrow?.initial_payment ? 'will have' : 'will not have'} an escrow account 
              to pay the property costs listed below. Without an escrow account, you must pay these costs directly.
            </Text>
          </View>
        </View>

        <View style={commonStyles.importantNote}>
          <Text style={commonStyles.warningText}>
            In the event of any conflict between this form and the loan documents you are signing, 
            the loan documents will control.
          </Text>
        </View>

        <Text style={commonStyles.pageNumber}>Page 4 of 5</Text>
      </Page>

      {/* Page 5: Contact Information and Signatures */}
      <Page size="LETTER" style={commonStyles.page}>
        <View style={commonStyles.header}>
          <Text style={commonStyles.title}>Contact Information</Text>
        </View>

        <View style={commonStyles.section}>
          <View style={commonStyles.row}>
            <View style={commonStyles.col}>
              <Text style={commonStyles.sectionTitle}>Lender</Text>
              <Text style={commonStyles.value}>{cdf.lender?.name || 'Lender Name'}</Text>
              <Text style={commonStyles.value}>{cdf.lender?.address || 'Address'}</Text>
              <Text style={commonStyles.value}>{cdf.lender?.phone || 'Phone'}</Text>
              <Text style={commonStyles.value}>NMLS ID: {cdf.lender?.nmls_id || 'N/A'}</Text>
              <Text style={commonStyles.value}>License ID: {cdf.lender?.license_id || 'N/A'}</Text>
            </View>
            <View style={commonStyles.col}>
              <Text style={commonStyles.sectionTitle}>Mortgage Broker</Text>
              <Text style={commonStyles.value}>{cdf.broker?.name || 'N/A'}</Text>
              <Text style={commonStyles.value}>{cdf.broker?.address || ''}</Text>
              <Text style={commonStyles.value}>{cdf.broker?.phone || ''}</Text>
              <Text style={commonStyles.value}>NMLS ID: {cdf.broker?.nmls_id || ''}</Text>
            </View>
          </View>
        </View>

        <View style={commonStyles.section}>
          <View style={commonStyles.row}>
            <View style={commonStyles.col}>
              <Text style={commonStyles.sectionTitle}>Real Estate Broker (B)</Text>
              <Text style={commonStyles.value}>{order.contacts_data?.[0]?.real_estate_agent?.name || 'N/A'}</Text>
              <Text style={commonStyles.value}>{order.contacts_data?.[0]?.real_estate_agent?.company || ''}</Text>
              <Text style={commonStyles.value}>{order.contacts_data?.[0]?.real_estate_agent?.phone || ''}</Text>
            </View>
            <View style={commonStyles.col}>
              <Text style={commonStyles.sectionTitle}>Real Estate Broker (S)</Text>
              <Text style={commonStyles.value}>{order.contacts_data?.[1]?.real_estate_agent?.name || 'N/A'}</Text>
              <Text style={commonStyles.value}>{order.contacts_data?.[1]?.real_estate_agent?.company || ''}</Text>
              <Text style={commonStyles.value}>{order.contacts_data?.[1]?.real_estate_agent?.phone || ''}</Text>
            </View>
          </View>
        </View>

        <View style={commonStyles.section}>
          <View style={commonStyles.row}>
            <View style={commonStyles.col}>
              <Text style={commonStyles.sectionTitle}>Settlement Agent</Text>
              <Text style={commonStyles.value}>{cdf.settlement_agent?.name || 'Garden Title & Escrow'}</Text>
              <Text style={commonStyles.value}>{cdf.settlement_agent?.address || 'Address'}</Text>
              <Text style={commonStyles.value}>{cdf.settlement_agent?.phone || 'Phone'}</Text>
              <Text style={commonStyles.value}>{cdf.settlement_agent?.email || 'Email'}</Text>
            </View>
          </View>
        </View>

        {/* Signature Section */}
        <View style={{ marginTop: 40 }}>
          <Text style={commonStyles.sectionTitle}>Confirm Receipt</Text>
          <Text style={{ fontSize: 10, marginBottom: 20 }}>
            By signing, you are only confirming that you have received this form. 
            You do not have to accept this loan because you have signed or received this form.
          </Text>

          <View style={commonStyles.row}>
            <View style={commonStyles.col}>
              <View style={commonStyles.signatureLine} />
              <Text style={commonStyles.signatureLabel}>Applicant Signature</Text>
            </View>
            <View style={commonStyles.col}>
              <View style={commonStyles.signatureLine} />
              <Text style={commonStyles.signatureLabel}>Date</Text>
            </View>
          </View>

          <View style={[commonStyles.row, { marginTop: 20 }]}>
            <View style={commonStyles.col}>
              <View style={commonStyles.signatureLine} />
              <Text style={commonStyles.signatureLabel}>Co-Applicant Signature</Text>
            </View>
            <View style={commonStyles.col}>
              <View style={commonStyles.signatureLine} />
              <Text style={commonStyles.signatureLabel}>Date</Text>
            </View>
          </View>
        </View>

        <Text style={commonStyles.pageNumber}>Page 5 of 5</Text>
      </Page>
    </Document>
  );
};

/**
 * Generate Settlement Statement (HUD-1) PDF
 */
export const SettlementStatementDocument = ({ order }: { order: OrderData }) => {
  const cdf = order.cdf_data || {};
  const borrowerProceeds = calculateBorrowerProceeds(order);
  const sellerProceeds = calculateSellerProceeds(order);

  return (
    <Document>
      <Page size="LETTER" style={commonStyles.page}>
        <View style={commonStyles.header}>
          <Text style={commonStyles.title}>HUD-1 Settlement Statement</Text>
          <Text style={commonStyles.subtitle}>U.S. Department of Housing and Urban Development</Text>
        </View>

        {/* Type of Loan Section */}
        <View style={commonStyles.section}>
          <View style={commonStyles.row}>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>FHA</Text>
              <View style={{ width: 15, height: 15, border: '1px solid #000', marginTop: 2 }} />
            </View>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>VA</Text>
              <View style={{ width: 15, height: 15, border: '1px solid #000', marginTop: 2 }} />
            </View>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>Conv. Unins.</Text>
              <View style={{ width: 15, height: 15, border: '1px solid #000', marginTop: 2 }} />
            </View>
            <View style={commonStyles.col}>
              <Text style={commonStyles.label}>Conv. Ins.</Text>
              <View style={{ width: 15, height: 15, border: '1px solid #000', marginTop: 2 }} />
            </View>
          </View>
        </View>

        {/* Property Location Section */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Property Location</Text>
          <Text style={commonStyles.value}>
            {order.properties_data?.address_1 || ''} {order.properties_data?.address_2 || ''}
          </Text>
          <Text style={commonStyles.value}>
            {order.properties_data?.city || ''}, {order.properties_data?.state || ''} {order.properties_data?.zipcode || ''}
          </Text>
        </View>

        {/* Borrower/Seller Information */}
        <View style={commonStyles.section}>
          <View style={commonStyles.row}>
            <View style={commonStyles.col}>
              <Text style={commonStyles.sectionTitle}>Borrower</Text>
              <Text style={commonStyles.value}>
                {order.contacts_data?.[0]?.first_name || ''} {order.contacts_data?.[0]?.last_name || ''}
              </Text>
              <Text style={commonStyles.value}>{order.contacts_data?.[0]?.email || ''}</Text>
            </View>
            <View style={commonStyles.col}>
              <Text style={commonStyles.sectionTitle}>Seller</Text>
              <Text style={commonStyles.value}>
                {order.contacts_data?.[1]?.first_name || ''} {order.contacts_data?.[1]?.last_name || ''}
              </Text>
              <Text style={commonStyles.value}>{order.contacts_data?.[1]?.email || ''}</Text>
            </View>
          </View>
        </View>

        {/* Settlement Charges Section */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Settlement Charges</Text>
          
          <View style={commonStyles.table}>
            <View style={[commonStyles.tableRow, commonStyles.tableHeader]}>
              <Text style={[commonStyles.tableCell, { flex: 3 }]}>Description</Text>
              <Text style={commonStyles.tableCell}>Paid from Borrower's Funds</Text>
              <Text style={commonStyles.tableCell}>Paid from Seller's Funds</Text>
            </View>

            {/* 700 Series - Total Sales/Broker's Commission */}
            <View style={commonStyles.tableRow}>
              <Text style={[commonStyles.tableCell, { flex: 3, fontWeight: 'bold' }]}>
                700. Total Sales/Broker's Commission
              </Text>
              <Text style={commonStyles.tableCell}>—</Text>
              <Text style={commonStyles.tableCell}>
                {formatCurrency(parseFloat(cdf.seller_costs?.commission || '0'))}
              </Text>
            </View>

            {/* 800 Series - Items Payable in Connection with Loan */}
            <View style={commonStyles.tableRow}>
              <Text style={[commonStyles.tableCell, { flex: 3, fontWeight: 'bold' }]}>
                800. Items Payable in Connection with Loan
              </Text>
              <Text style={commonStyles.tableCell}>
                {formatCurrency(parseFloat(cdf.origination_charges?.total || '0'))}
              </Text>
              <Text style={commonStyles.tableCell}>—</Text>
            </View>

            {/* 900 Series - Items Required by Lender to be Paid in Advance */}
            <View style={commonStyles.tableRow}>
              <Text style={[commonStyles.tableCell, { flex: 3, fontWeight: 'bold' }]}>
                900. Items Required by Lender to be Paid in Advance
              </Text>
              <Text style={commonStyles.tableCell}>
                {formatCurrency(
                  parseFloat(cdf.prepaids?.homeowners_insurance || '0') +
                  parseFloat(cdf.prepaids?.mortgage_insurance || '0') +
                  parseFloat(cdf.prepaids?.prepaid_interest || '0')
                )}
              </Text>
              <Text style={commonStyles.tableCell}>—</Text>
            </View>

            {/* 1000 Series - Reserves Deposited with Lender */}
            <View style={commonStyles.tableRow}>
              <Text style={[commonStyles.tableCell, { flex: 3, fontWeight: 'bold' }]}>
                1000. Reserves Deposited with Lender
              </Text>
              <Text style={commonStyles.tableCell}>
                {formatCurrency(parseFloat(cdf.escrow?.initial_payment || '0'))}
              </Text>
              <Text style={commonStyles.tableCell}>—</Text>
            </View>

            {/* 1100 Series - Title Charges */}
            <View style={commonStyles.tableRow}>
              <Text style={[commonStyles.tableCell, { flex: 3, fontWeight: 'bold' }]}>
                1100. Title Charges
              </Text>
              <Text style={commonStyles.tableCell}>
                {formatCurrency(parseFloat(cdf.did_not_shop_for?.title_services || '0'))}
              </Text>
              <Text style={commonStyles.tableCell}>
                {formatCurrency(parseFloat(cdf.seller_costs?.title_insurance || '0'))}
              </Text>
            </View>

            {/* 1200 Series - Government Recording and Transfer Charges */}
            <View style={commonStyles.tableRow}>
              <Text style={[commonStyles.tableCell, { flex: 3, fontWeight: 'bold' }]}>
                1200. Government Recording and Transfer Charges
              </Text>
              <Text style={commonStyles.tableCell}>
                {formatCurrency(parseFloat(cdf.taxes_and_fees?.recording_fees || '0'))}
              </Text>
              <Text style={commonStyles.tableCell}>
                {formatCurrency(parseFloat(cdf.taxes_and_fees?.transfer_taxes || '0'))}
              </Text>
            </View>

            {/* 1300 Series - Additional Settlement Charges */}
            <View style={commonStyles.tableRow}>
              <Text style={[commonStyles.tableCell, { flex: 3, fontWeight: 'bold' }]}>
                1300. Additional Settlement Charges
              </Text>
              <Text style={commonStyles.tableCell}>
                {formatCurrency(parseFloat(cdf.other_charges?.total || '0'))}
              </Text>
              <Text style={commonStyles.tableCell}>—</Text>
            </View>

            {/* Total Settlement Charges */}
            <View style={[commonStyles.tableRow, { borderTop: '2px solid #000', fontWeight: 'bold' }]}>
              <Text style={[commonStyles.tableCell, { flex: 3 }]}>
                1400. Total Settlement Charges
              </Text>
              <Text style={commonStyles.tableCell}>
                {formatCurrency(borrowerProceeds.deductions)}
              </Text>
              <Text style={commonStyles.tableCell}>
                {formatCurrency(sellerProceeds.deductions)}
              </Text>
            </View>
          </View>
        </View>

        {/* Signature Section */}
        <View style={{ marginTop: 30 }}>
          <View style={commonStyles.row}>
            <View style={commonStyles.col}>
              <View style={commonStyles.signatureLine} />
              <Text style={commonStyles.signatureLabel}>Borrower</Text>
            </View>
            <View style={commonStyles.col}>
              <View style={commonStyles.signatureLine} />
              <Text style={commonStyles.signatureLabel}>Seller</Text>
            </View>
          </View>
        </View>

        <View style={commonStyles.footer}>
          <Text style={{ fontSize: 9, color: '#666' }}>
            The HUD-1 Settlement Statement which I have prepared is a true and accurate account of this transaction. 
            I have caused or will cause the funds to be disbursed in accordance with this statement.
          </Text>
          <View style={{ marginTop: 20 }}>
            <View style={commonStyles.signatureLine} />
            <Text style={commonStyles.signatureLabel}>Settlement Agent</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

/**
 * Export functions for generating and downloading PDFs
 */
export const generateClosingDisclosure = (order: OrderData) => {
  return <ClosingDisclosureDocument order={order} />;
};

export const generateSettlementStatement = (order: OrderData) => {
  return <SettlementStatementDocument order={order} />;
};