import React from 'react';
import CDField from './CDField';

interface CDPage5Props {
  cdfData: any;
  getValue?: (path: string) => any;
  setValue?: (path: string, value: any) => void;
}

const CDPage5: React.FC<CDPage5Props> = ({ cdfData, getValue, setValue }) => {
  return (
    <div className="bg-white text-black w-[8.5in] min-h-[11in] mx-auto p-0 font-['Arial',sans-serif] text-[10pt] leading-tight print:shadow-none shadow-lg">
      {/* Header */}
      <div className="bg-black text-white p-2 text-center font-bold text-[11pt]">
        Loan Calculations
      </div>

      {/* Loan Calculations Table */}
      <div className="p-4">
        <table className="w-full border-collapse border border-black">
          <tbody>
            {/* Total of Payments */}
            <tr>
              <td className="border border-black p-2 font-bold text-[10pt] w-1/2">
                Total of Payments
              </td>
              <td className="border border-black p-2 text-right">
                <CDField
                  value={cdfData?.loan_calculations?.total_of_payments}
                  schemaKey="cdfData.loan_calculations.total_of_payments"
                  getValue={getValue}
                  setValue={setValue}
                  type="currency"
                  className="text-right w-full border-0 p-0"
                  documentMode
                  mappings={{
                    ucd: null,
                    qualia: "loan_calculations.total_of_payments",
                    gui: "LoanCalculations.tsx"
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 pl-8 text-[9pt]">
                Total you will have paid after you make all payments of principal, interest, mortgage insurance, and loan costs, as scheduled.
              </td>
              <td className="border border-black p-2"></td>
            </tr>

            {/* Finance Charge */}
            <tr>
              <td className="border border-black p-2 font-bold text-[10pt]">
                Finance Charge
              </td>
              <td className="border border-black p-2 text-right">
                <CDField
                  value={cdfData?.loan_calculations?.finance_charge}
                  schemaKey="cdfData.loan_calculations.finance_charge"
                  getValue={getValue}
                  setValue={setValue}
                  type="currency"
                  className="text-right w-full border-0 p-0"
                  documentMode
                  mappings={{
                    ucd: null,
                    qualia: "loan_calculations.finance_charge",
                    gui: "LoanCalculations.tsx"
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 pl-8 text-[9pt]">
                The dollar amount the loan will cost you.
              </td>
              <td className="border border-black p-2"></td>
            </tr>

            {/* Amount Financed */}
            <tr>
              <td className="border border-black p-2 font-bold text-[10pt]">
                Amount Financed
              </td>
              <td className="border border-black p-2 text-right">
                <CDField
                  value={cdfData?.loan_calculations?.amount_financed}
                  schemaKey="cdfData.loan_calculations.amount_financed"
                  getValue={getValue}
                  setValue={setValue}
                  type="currency"
                  className="text-right w-full border-0 p-0"
                  documentMode
                  mappings={{
                    ucd: null,
                    qualia: "loan_calculations.amount_financed",
                    gui: "LoanCalculations.tsx"
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 pl-8 text-[9pt]">
                The loan amount available after paying your upfront finance charge.
              </td>
              <td className="border border-black p-2"></td>
            </tr>

            {/* Annual Percentage Rate (APR) */}
            <tr>
              <td className="border border-black p-2 font-bold text-[10pt]">
                Annual Percentage Rate (APR)
              </td>
              <td className="border border-black p-2 text-right">
                <CDField
                  value={cdfData?.loan_calculations?.apr}
                  schemaKey="cdfData.loan_calculations.apr"
                  getValue={getValue}
                  setValue={setValue}
                  type="percentage"
                  className="text-right w-full border-0 p-0"
                  documentMode
                  mappings={{
                    ucd: null,
                    qualia: "loan_calculations.apr",
                    gui: "LoanCalculations.tsx"
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 pl-8 text-[9pt]">
                Your costs over the loan term expressed as a rate. This is not your interest rate.
              </td>
              <td className="border border-black p-2"></td>
            </tr>

            {/* Total Interest Percentage (TIP) */}
            <tr>
              <td className="border border-black p-2 font-bold text-[10pt]">
                Total Interest Percentage (TIP)
              </td>
              <td className="border border-black p-2 text-right">
                <CDField
                  value={cdfData?.loan_calculations?.tip}
                  schemaKey="cdfData.loan_calculations.tip"
                  getValue={getValue}
                  setValue={setValue}
                  type="percentage"
                  className="text-right w-full border-0 p-0"
                  documentMode
                  mappings={{
                    ucd: null,
                    qualia: "loan_calculations.tip",
                    gui: "LoanCalculations.tsx"
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 pl-8 text-[9pt]">
                The total amount of interest that you will pay over the loan term as a percentage of your loan amount.
              </td>
              <td className="border border-black p-2"></td>
            </tr>
          </tbody>
        </table>

        {/* Questions? */}
        <div className="border border-black p-2 mt-4 text-[9pt]">
          <strong>Questions?</strong> If you have questions about the loan terms or costs on this form, use the contact information below.
          To get more information or make a complaint, contact the Consumer Financial Protection Bureau at www.consumerfinance.gov/mortgage-closing
        </div>

        {/* Contact Information */}
        <div className="mt-4">
          <h3 className="font-bold text-[10pt] mb-2">Contact Information</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-1 text-[9pt] font-bold text-left w-1/3">Lender</th>
                <th className="border border-black p-1 text-[9pt] font-bold text-left w-1/3">Mortgage Broker</th>
                <th className="border border-black p-1 text-[9pt] font-bold text-left w-1/3">Real Estate Broker (B)</th>
                <th className="border border-black p-1 text-[9pt] font-bold text-left">Real Estate Broker (S)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2 align-top">
                  <div className="text-[9pt]">
                    <div className="mb-1">Name</div>
                    <CDField
                      value={cdfData?.contacts?.lender?.name}
                      schemaKey="cdfData.contacts.lender.name"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: "LENDER.Name",
                        qualia: "contacts.lender.name",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Address</div>
                    <CDField
                      value={cdfData?.contacts?.lender?.address}
                      schemaKey="cdfData.contacts.lender.address"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.lender.address",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">NMLS ID</div>
                    <CDField
                      value={cdfData?.contacts?.lender?.nmls_id}
                      schemaKey="cdfData.contacts.lender.nmls_id"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: "LENDER.NMLSIdentifier",
                        qualia: "contacts.lender.nmls_id",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">ST License ID</div>
                    <CDField
                      value={cdfData?.contacts?.lender?.state_license_id}
                      schemaKey="cdfData.contacts.lender.state_license_id"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.lender.state_license_id",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Contact</div>
                    <CDField
                      value={cdfData?.contacts?.lender?.contact_name}
                      schemaKey="cdfData.contacts.lender.contact_name"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.lender.contact_name",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Email</div>
                    <CDField
                      value={cdfData?.contacts?.lender?.email}
                      schemaKey="cdfData.contacts.lender.email"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.lender.email",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Phone</div>
                    <CDField
                      value={cdfData?.contacts?.lender?.phone}
                      schemaKey="cdfData.contacts.lender.phone"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.lender.phone",
                        gui: "Contacts.tsx"
                      }}
                    />
                  </div>
                </td>
                
                <td className="border border-black p-2 align-top">
                  <div className="text-[9pt]">
                    <div className="mb-1">Name</div>
                    <CDField
                      value={cdfData?.contacts?.mortgage_broker?.name}
                      schemaKey="cdfData.contacts.mortgage_broker.name"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.mortgage_broker.name",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Address</div>
                    <CDField
                      value={cdfData?.contacts?.mortgage_broker?.address}
                      schemaKey="cdfData.contacts.mortgage_broker.address"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.mortgage_broker.address",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">NMLS ID</div>
                    <CDField
                      value={cdfData?.contacts?.mortgage_broker?.nmls_id}
                      schemaKey="cdfData.contacts.mortgage_broker.nmls_id"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.mortgage_broker.nmls_id",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">ST License ID</div>
                    <CDField
                      value={cdfData?.contacts?.mortgage_broker?.state_license_id}
                      schemaKey="cdfData.contacts.mortgage_broker.state_license_id"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.mortgage_broker.state_license_id",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Contact</div>
                    <CDField
                      value={cdfData?.contacts?.mortgage_broker?.contact_name}
                      schemaKey="cdfData.contacts.mortgage_broker.contact_name"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.mortgage_broker.contact_name",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Email</div>
                    <CDField
                      value={cdfData?.contacts?.mortgage_broker?.email}
                      schemaKey="cdfData.contacts.mortgage_broker.email"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.mortgage_broker.email",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Phone</div>
                    <CDField
                      value={cdfData?.contacts?.mortgage_broker?.phone}
                      schemaKey="cdfData.contacts.mortgage_broker.phone"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.mortgage_broker.phone",
                        gui: "Contacts.tsx"
                      }}
                    />
                  </div>
                </td>
                
                <td className="border border-black p-2 align-top">
                  <div className="text-[9pt]">
                    <div className="mb-1">Name</div>
                    <CDField
                      value={cdfData?.contacts?.real_estate_broker_b?.name}
                      schemaKey="cdfData.contacts.real_estate_broker_b.name"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.real_estate_broker_b.name",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Address</div>
                    <CDField
                      value={cdfData?.contacts?.real_estate_broker_b?.address}
                      schemaKey="cdfData.contacts.real_estate_broker_b.address"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.real_estate_broker_b.address",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">ST License ID</div>
                    <CDField
                      value={cdfData?.contacts?.real_estate_broker_b?.state_license_id}
                      schemaKey="cdfData.contacts.real_estate_broker_b.state_license_id"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.real_estate_broker_b.state_license_id",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Contact</div>
                    <CDField
                      value={cdfData?.contacts?.real_estate_broker_b?.contact_name}
                      schemaKey="cdfData.contacts.real_estate_broker_b.contact_name"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.real_estate_broker_b.contact_name",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Email</div>
                    <CDField
                      value={cdfData?.contacts?.real_estate_broker_b?.email}
                      schemaKey="cdfData.contacts.real_estate_broker_b.email"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.real_estate_broker_b.email",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Phone</div>
                    <CDField
                      value={cdfData?.contacts?.real_estate_broker_b?.phone}
                      schemaKey="cdfData.contacts.real_estate_broker_b.phone"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.real_estate_broker_b.phone",
                        gui: "Contacts.tsx"
                      }}
                    />
                  </div>
                </td>
                
                <td className="border border-black p-2 align-top">
                  <div className="text-[9pt]">
                    <div className="mb-1">Name</div>
                    <CDField
                      value={cdfData?.contacts?.real_estate_broker_s?.name}
                      schemaKey="cdfData.contacts.real_estate_broker_s.name"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.real_estate_broker_s.name",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Address</div>
                    <CDField
                      value={cdfData?.contacts?.real_estate_broker_s?.address}
                      schemaKey="cdfData.contacts.real_estate_broker_s.address"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.real_estate_broker_s.address",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">ST License ID</div>
                    <CDField
                      value={cdfData?.contacts?.real_estate_broker_s?.state_license_id}
                      schemaKey="cdfData.contacts.real_estate_broker_s.state_license_id"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.real_estate_broker_s.state_license_id",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Contact</div>
                    <CDField
                      value={cdfData?.contacts?.real_estate_broker_s?.contact_name}
                      schemaKey="cdfData.contacts.real_estate_broker_s.contact_name"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.real_estate_broker_s.contact_name",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Email</div>
                    <CDField
                      value={cdfData?.contacts?.real_estate_broker_s?.email}
                      schemaKey="cdfData.contacts.real_estate_broker_s.email"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400 mb-2"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.real_estate_broker_s.email",
                        gui: "Contacts.tsx"
                      }}
                    />
                    
                    <div className="mb-1">Phone</div>
                    <CDField
                      value={cdfData?.contacts?.real_estate_broker_s?.phone}
                      schemaKey="cdfData.contacts.real_estate_broker_s.phone"
                      getValue={getValue}
                      setValue={setValue}
                      type="text"
                      className="w-full border-b border-gray-400"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "contacts.real_estate_broker_s.phone",
                        gui: "Contacts.tsx"
                      }}
                    />
                  </div>
                </td>
              </tr>
              
              {/* Second row with Settlement Agent info */}
              <tr>
                <td colSpan={4} className="border border-black p-2">
                  <div className="text-[9pt]">
                    <div className="font-bold mb-2">Settlement Agent</div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="mb-1">Name</div>
                        <CDField
                          value={cdfData?.contacts?.settlement_agent?.name}
                          schemaKey="cdfData.contacts.settlement_agent.name"
                          getValue={getValue}
                          setValue={setValue}
                          type="text"
                          className="w-full border-b border-gray-400"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: "contacts.settlement_agent.name",
                            gui: "Contacts.tsx"
                          }}
                        />
                      </div>
                      <div>
                        <div className="mb-1">Address</div>
                        <CDField
                          value={cdfData?.contacts?.settlement_agent?.address}
                          schemaKey="cdfData.contacts.settlement_agent.address"
                          getValue={getValue}
                          setValue={setValue}
                          type="text"
                          className="w-full border-b border-gray-400"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: "contacts.settlement_agent.address",
                            gui: "Contacts.tsx"
                          }}
                        />
                      </div>
                      <div>
                        <div className="mb-1">Email</div>
                        <CDField
                          value={cdfData?.contacts?.settlement_agent?.email}
                          schemaKey="cdfData.contacts.settlement_agent.email"
                          getValue={getValue}
                          setValue={setValue}
                          type="text"
                          className="w-full border-b border-gray-400"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: "contacts.settlement_agent.email",
                            gui: "Contacts.tsx"
                          }}
                        />
                      </div>
                      <div>
                        <div className="mb-1">Phone</div>
                        <CDField
                          value={cdfData?.contacts?.settlement_agent?.phone}
                          schemaKey="cdfData.contacts.settlement_agent.phone"
                          getValue={getValue}
                          setValue={setValue}
                          type="text"
                          className="w-full border-b border-gray-400"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: "contacts.settlement_agent.phone",
                            gui: "Contacts.tsx"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Confirm Receipt */}
        <div className="mt-4 border border-black p-3">
          <h3 className="font-bold text-[10pt] mb-2">Confirm Receipt</h3>
          <div className="text-[9pt] mb-3">
            By signing, you are only confirming that you have received this form. You do not have to accept this loan because you have signed or received this form.
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-2">Applicant Signature</div>
              <div className="border-b border-black mb-1"></div>
              <div className="text-[8pt]">Date</div>
            </div>
            <div>
              <div className="mb-2">Co-Applicant Signature</div>
              <div className="border-b border-black mb-1"></div>
              <div className="text-[8pt]">Date</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 text-[8pt] text-gray-600 text-center border-t border-gray-300">
        <div>CLOSING DISCLOSURE</div>
        <div className="text-right pr-2">PAGE 5 OF 5 • LOAN ID # 
          <CDField
            value={cdfData?.loan?.loan_number}
            schemaKey="cdfData.loan.loan_number"
            getValue={getValue}
            setValue={setValue}
            type="text"
            className="inline-block border-0 p-0"
            documentMode
            mappings={{
              ucd: "LOAN.LoanNumber",
              qualia: "loan.loan_number",
              gui: "BasicInfo.tsx"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CDPage5;