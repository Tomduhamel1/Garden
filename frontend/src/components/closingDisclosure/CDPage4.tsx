import React from 'react';
import CDField from './CDField';

interface CDPage4Props {
  cdfData: any;
  getValue?: (path: string) => any;
  setValue?: (path: string, value: any) => void;
}

const CDPage4: React.FC<CDPage4Props> = ({ cdfData, getValue, setValue }) => {
  return (
    <div className="bg-white text-black w-[8.5in] min-h-[11in] mx-auto p-0 font-['Arial',sans-serif] text-[10pt] leading-tight print:shadow-none shadow-lg">
      {/* Header */}
      <div className="bg-black text-white p-2 text-center font-bold text-[11pt]">
        Additional Information About This Loan
      </div>

      <div className="p-4">
        {/* Loan Disclosures */}
        <div className="mb-4">
          <h3 className="font-bold text-[10pt] mb-2">Loan Disclosures</h3>
          
          {/* Assumption */}
          <div className="mb-3 pl-4">
            <div className="font-semibold text-[10pt]">Assumption</div>
            <div className="text-[9pt] mt-1">
              If you sell or transfer this property to another person, your lender
              <div className="mt-1">
                <CDField
                  value={cdfData?.loan_disclosures?.assumption}
                  schemaKey="cdfData.loan_disclosures.assumption"
                  getValue={getValue}
                  setValue={setValue}
                  type="select"
                  options={[
                    { value: 'will_allow', label: 'will allow, under certain conditions, this person to assume this loan on the original terms.' },
                    { value: 'will_not_allow', label: 'will not allow assumption of this loan on the original terms.' }
                  ]}
                  className="inline-block border-0 p-0"
                  documentMode
                  mappings={{
                    ucd: null,
                    qualia: "loan_disclosures.assumption",
                    gui: "LoanDisclosures.tsx"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Demand Feature */}
          <div className="mb-3 pl-4">
            <div className="font-semibold text-[10pt]">Demand Feature</div>
            <div className="text-[9pt] mt-1">
              Your loan
              <div className="mt-1">
                <CDField
                  value={cdfData?.loan_disclosures?.demand_feature}
                  schemaKey="cdfData.loan_disclosures.demand_feature"
                  getValue={getValue}
                  setValue={setValue}
                  type="select"
                  options={[
                    { value: 'has', label: 'has a demand feature, which permits your lender to require early repayment of the loan.' },
                    { value: 'does_not_have', label: 'does not have a demand feature.' }
                  ]}
                  className="inline-block border-0 p-0"
                  documentMode
                  mappings={{
                    ucd: null,
                    qualia: "loan_disclosures.demand_feature",
                    gui: "LoanDisclosures.tsx"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Late Payment */}
          <div className="mb-3 pl-4">
            <div className="font-semibold text-[10pt]">Late Payment</div>
            <div className="text-[9pt] mt-1">
              If your payment is more than
              <CDField
                value={cdfData?.loan_disclosures?.late_payment_days}
                schemaKey="cdfData.loan_disclosures.late_payment_days"
                getValue={getValue}
                setValue={setValue}
                type="number"
                className="inline-block mx-1 border-b border-black w-12 text-center"
                documentMode
                mappings={{
                  ucd: null,
                  qualia: "loan_disclosures.late_payment_days",
                  gui: "LoanDisclosures.tsx"
                }}
              />
              days late, your lender will charge a late fee of
              <CDField
                value={cdfData?.loan_disclosures?.late_payment_fee}
                schemaKey="cdfData.loan_disclosures.late_payment_fee"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="inline-block mx-1 border-b border-black w-20 text-center"
                documentMode
                mappings={{
                  ucd: null,
                  qualia: "loan_disclosures.late_payment_fee",
                  gui: "LoanDisclosures.tsx"
                }}
              />
            </div>
          </div>

          {/* Negative Amortization */}
          <div className="mb-3 pl-4">
            <div className="font-semibold text-[10pt]">Negative Amortization (Increase in Loan Amount)</div>
            <div className="text-[9pt] mt-1">
              Under your loan terms, you
              <div className="mt-1">
                <CDField
                  value={cdfData?.loan_disclosures?.negative_amortization}
                  schemaKey="cdfData.loan_disclosures.negative_amortization"
                  getValue={getValue}
                  setValue={setValue}
                  type="select"
                  options={[
                    { value: 'are_not_scheduled', label: 'are not scheduled to make monthly payments that do not pay all of the interest due that month.' },
                    { value: 'are_scheduled', label: 'are scheduled to make monthly payments that do not pay all of the interest due that month.' },
                    { value: 'may_have', label: 'may have monthly payments that do not pay all of the interest due that month.' }
                  ]}
                  className="inline-block border-0 p-0"
                  documentMode
                  mappings={{
                    ucd: null,
                    qualia: "loan_disclosures.negative_amortization",
                    gui: "LoanDisclosures.tsx"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Partial Payments */}
          <div className="mb-3 pl-4">
            <div className="font-semibold text-[10pt]">Partial Payments</div>
            <div className="text-[9pt] mt-1">
              Your lender
              <div className="mt-1">
                <CDField
                  value={cdfData?.loan_disclosures?.partial_payments}
                  schemaKey="cdfData.loan_disclosures.partial_payments"
                  getValue={getValue}
                  setValue={setValue}
                  type="select"
                  options={[
                    { value: 'may_accept', label: 'may accept payments that are less than the full amount due (partial payments) and apply them to your loan.' },
                    { value: 'may_hold', label: 'may hold partial payments in a separate account until you pay the rest of the payment, and then apply the full payment to your loan.' },
                    { value: 'does_not_accept', label: 'does not accept any partial payments.' }
                  ]}
                  className="inline-block border-0 p-0"
                  documentMode
                  mappings={{
                    ucd: null,
                    qualia: "loan_disclosures.partial_payments",
                    gui: "LoanDisclosures.tsx"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Security Interest */}
          <div className="mb-3 pl-4">
            <div className="font-semibold text-[10pt]">Security Interest</div>
            <div className="text-[9pt] mt-1">
              You are granting a security interest in
              <div className="mt-1">
                <CDField
                  value={cdfData?.property?.address?.street_address}
                  schemaKey="cdfData.property.address.street_address"
                  getValue={getValue}
                  setValue={setValue}
                  type="text"
                  className="block w-full border-b border-black"
                  documentMode
                  mappings={{
                    ucd: "PROPERTY.AddressLine1",
                    qualia: "property.address.street_address",
                    gui: "BasicInfo.tsx"
                  }}
                />
                <CDField
                  value={`${cdfData?.property?.address?.city || ''}, ${cdfData?.property?.address?.state || ''} ${cdfData?.property?.address?.zip || ''}`}
                  schemaKey="cdfData.property.address"
                  getValue={getValue}
                  setValue={setValue}
                  type="text"
                  className="block w-full border-b border-black mt-1"
                  documentMode
                  mappings={{
                    ucd: null,
                    qualia: "property.address",
                    gui: "BasicInfo.tsx"
                  }}
                />
              </div>
              You may lose this property if you do not make your payments or satisfy other obligations for this loan.
            </div>
          </div>

          {/* Escrow Account */}
          <div className="mb-3 pl-4">
            <div className="font-semibold text-[10pt]">Escrow Account</div>
            <div className="text-[9pt] mt-1">
              For now, your loan
              <CDField
                value={cdfData?.loan_disclosures?.escrow_account}
                schemaKey="cdfData.loan_disclosures.escrow_account"
                getValue={getValue}
                setValue={setValue}
                type="select"
                options={[
                  { value: 'will_have', label: 'will have an escrow account (also called an "impound" or "trust" account) to pay the property costs listed below. Without an escrow account, you would pay them directly, possibly in one or two large payments a year.' },
                  { value: 'will_not_have', label: 'will not have an escrow account because you declined it or your lender does not offer one.' }
                ]}
                className="inline-block border-0 p-0"
                documentMode
                mappings={{
                  ucd: null,
                  qualia: "loan_disclosures.escrow_account",
                  gui: "LoanDisclosures.tsx"
                }}
              />
              
              {cdfData?.loan_disclosures?.escrow_account === 'will_have' && (
                <div className="mt-2">
                  <div className="mb-1">Escrow</div>
                  <div className="grid grid-cols-3 gap-2 text-[9pt]">
                    <div>
                      <label className="flex items-center">
                        <CDField
                          value={cdfData?.loan_disclosures?.escrow_items?.property_taxes}
                          schemaKey="cdfData.loan_disclosures.escrow_items.property_taxes"
                          getValue={getValue}
                          setValue={setValue}
                          type="checkbox"
                          className="mr-1"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: "loan_disclosures.escrow_items.property_taxes",
                            gui: "LoanDisclosures.tsx"
                          }}
                        />
                        Property Taxes
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center">
                        <CDField
                          value={cdfData?.loan_disclosures?.escrow_items?.homeowners_insurance}
                          schemaKey="cdfData.loan_disclosures.escrow_items.homeowners_insurance"
                          getValue={getValue}
                          setValue={setValue}
                          type="checkbox"
                          className="mr-1"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: "loan_disclosures.escrow_items.homeowners_insurance",
                            gui: "LoanDisclosures.tsx"
                          }}
                        />
                        Homeowner's Insurance
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center">
                        <CDField
                          value={cdfData?.loan_disclosures?.escrow_items?.other}
                          schemaKey="cdfData.loan_disclosures.escrow_items.other"
                          getValue={getValue}
                          setValue={setValue}
                          type="checkbox"
                          className="mr-1"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: "loan_disclosures.escrow_items.other",
                            gui: "LoanDisclosures.tsx"
                          }}
                        />
                        Other:
                        <CDField
                          value={cdfData?.loan_disclosures?.escrow_items?.other_description}
                          schemaKey="cdfData.loan_disclosures.escrow_items.other_description"
                          getValue={getValue}
                          setValue={setValue}
                          type="text"
                          className="ml-1 border-b border-black"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: "loan_disclosures.escrow_items.other_description",
                            gui: "LoanDisclosures.tsx"
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {cdfData?.loan_disclosures?.escrow_account === 'will_not_have' && (
                <div className="mt-2">
                  <div className="mb-1">No Escrow</div>
                  <div className="text-[9pt]">
                    Estimated total amount over year 1 for your escrowed property costs:
                    <CDField
                      value={cdfData?.loan_disclosures?.no_escrow_estimated_property_costs}
                      schemaKey="cdfData.loan_disclosures.no_escrow_estimated_property_costs"
                      getValue={getValue}
                      setValue={setValue}
                      type="currency"
                      className="inline-block mx-1 border-b border-black w-24"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "loan_disclosures.no_escrow_estimated_property_costs",
                        gui: "LoanDisclosures.tsx"
                      }}
                    />
                    <div className="mt-1">
                      Escrow waiver fee:
                      <CDField
                        value={cdfData?.loan_disclosures?.escrow_waiver_fee}
                        schemaKey="cdfData.loan_disclosures.escrow_waiver_fee"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="inline-block mx-1 border-b border-black w-24"
                        documentMode
                        mappings={{
                          ucd: null,
                          qualia: "loan_disclosures.escrow_waiver_fee",
                          gui: "LoanDisclosures.tsx"
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Adjustable Payment (AP) Table */}
        {cdfData?.loan?.product === 'Adjustable Rate' && (
          <div className="mb-4">
            <h3 className="font-bold text-[10pt] mb-2">Adjustable Payment (AP) Table</h3>
            <div className="text-[9pt] mb-2">
              See AP Table on page 5 for details about the Adjustable Payment or Adjustable Interest Rate features of this loan.
            </div>
            
            {/* AP Table */}
            <table className="w-full border-collapse border border-black">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-1 text-[9pt]">Interest Only Payments?</th>
                  <th className="border border-black p-1 text-[9pt]">Optional Payments?</th>
                  <th className="border border-black p-1 text-[9pt]">Step Payments?</th>
                  <th className="border border-black p-1 text-[9pt]">Seasonal Payments?</th>
                  <th className="border border-black p-1 text-[9pt]">Monthly Principal and Interest</th>
                </tr>
              </thead>
              <tbody>
                {/* Rows for payment periods */}
                {[1, 2, 3, 4].map(i => (
                  <tr key={i}>
                    <td className="border border-black p-1 text-center">
                      <CDField
                        value={cdfData?.ap_table?.[`period_${i}`]?.interest_only}
                        schemaKey={`cdfData.ap_table.period_${i}.interest_only`}
                        getValue={getValue}
                        setValue={setValue}
                        type="checkbox"
                        className=""
                        documentMode
                        mappings={{
                          ucd: null,
                          qualia: `ap_table.period_${i}.interest_only`,
                          gui: "APTable.tsx"
                        }}
                      />
                    </td>
                    <td className="border border-black p-1 text-center">
                      <CDField
                        value={cdfData?.ap_table?.[`period_${i}`]?.optional_payments}
                        schemaKey={`cdfData.ap_table.period_${i}.optional_payments`}
                        getValue={getValue}
                        setValue={setValue}
                        type="checkbox"
                        className=""
                        documentMode
                        mappings={{
                          ucd: null,
                          qualia: `ap_table.period_${i}.optional_payments`,
                          gui: "APTable.tsx"
                        }}
                      />
                    </td>
                    <td className="border border-black p-1 text-center">
                      <CDField
                        value={cdfData?.ap_table?.[`period_${i}`]?.step_payments}
                        schemaKey={`cdfData.ap_table.period_${i}.step_payments`}
                        getValue={getValue}
                        setValue={setValue}
                        type="checkbox"
                        className=""
                        documentMode
                        mappings={{
                          ucd: null,
                          qualia: `ap_table.period_${i}.step_payments`,
                          gui: "APTable.tsx"
                        }}
                      />
                    </td>
                    <td className="border border-black p-1 text-center">
                      <CDField
                        value={cdfData?.ap_table?.[`period_${i}`]?.seasonal_payments}
                        schemaKey={`cdfData.ap_table.period_${i}.seasonal_payments`}
                        getValue={getValue}
                        setValue={setValue}
                        type="checkbox"
                        className=""
                        documentMode
                        mappings={{
                          ucd: null,
                          qualia: `ap_table.period_${i}.seasonal_payments`,
                          gui: "APTable.tsx"
                        }}
                      />
                    </td>
                    <td className="border border-black p-1 text-right">
                      <CDField
                        value={cdfData?.ap_table?.[`period_${i}`]?.monthly_payment}
                        schemaKey={`cdfData.ap_table.period_${i}.monthly_payment`}
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: null,
                          qualia: `ap_table.period_${i}.monthly_payment`,
                          gui: "APTable.tsx"
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Other Disclosures */}
        <div className="mb-4">
          <h3 className="font-bold text-[10pt] mb-2">Other Disclosures</h3>
          
          {/* Appraisal */}
          <div className="mb-3 pl-4">
            <div className="font-semibold text-[10pt]">Appraisal</div>
            <div className="text-[9pt] mt-1">
              If the property was appraised for your loan, your lender is required to give you a copy at no additional cost at least 3 days before closing.
              If you have not yet received it, please contact your lender at the information listed below.
            </div>
          </div>

          {/* Contract Details */}
          <div className="mb-3 pl-4">
            <div className="font-semibold text-[10pt]">Contract Details</div>
            <div className="text-[9pt] mt-1">
              See your note and security instrument for information about
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>what happens if you fail to make your payments,</li>
                <li>what is a default on the loan,</li>
                <li>situations in which your lender can require early repayment of the loan, and</li>
                <li>the rules for making payments before they are due.</li>
              </ul>
            </div>
          </div>

          {/* Liability after Foreclosure */}
          <div className="mb-3 pl-4">
            <div className="font-semibold text-[10pt]">Liability after Foreclosure</div>
            <div className="text-[9pt] mt-1">
              If your lender forecloses on this property and the foreclosure does not cover the amount of unpaid balance on this loan,
              <div className="mt-1">
                <CDField
                  value={cdfData?.other_disclosures?.liability_after_foreclosure}
                  schemaKey="cdfData.other_disclosures.liability_after_foreclosure"
                  getValue={getValue}
                  setValue={setValue}
                  type="select"
                  options={[
                    { value: 'state_law_protects', label: 'state law may protect you from liability for the unpaid balance. If you refinance or take on any additional debt on this property, you may lose this protection and have to pay any debt remaining even after foreclosure.' },
                    { value: 'state_law_does_not_protect', label: 'state law does not protect you from liability for the unpaid balance.' }
                  ]}
                  className="inline-block border-0 p-0"
                  documentMode
                  mappings={{
                    ucd: null,
                    qualia: "other_disclosures.liability_after_foreclosure",
                    gui: "LoanCalculations.tsx"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Refinance */}
          <div className="mb-3 pl-4">
            <div className="font-semibold text-[10pt]">Refinance</div>
            <div className="text-[9pt] mt-1">
              Refinancing this loan will depend on your future financial situation, the property value, and market conditions.
              You may not be able to refinance this loan.
            </div>
          </div>

          {/* Tax Deductions */}
          <div className="mb-3 pl-4">
            <div className="font-semibold text-[10pt]">Tax Deductions</div>
            <div className="text-[9pt] mt-1">
              If you borrow more than this property is worth, the interest on the loan amount above this property's fair market value is not deductible
              from your federal income taxes. You should consult a tax advisor for more information.
            </div>
          </div>
        </div>

        {/* Questions? Notice */}
        <div className="border border-black p-2 text-center text-[9pt]">
          <strong>Questions?</strong> If you have questions about the loan terms or costs on this form, use the contact information below.
          To get more information or make a complaint, contact the Consumer Financial Protection Bureau at www.consumerfinance.gov/mortgage-closing
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 text-[8pt] text-gray-600 text-center border-t border-gray-300">
        <div>CLOSING DISCLOSURE</div>
        <div className="text-right pr-2">PAGE 4 OF 5 • LOAN ID # 
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

export default CDPage4;