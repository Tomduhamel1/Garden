import React from 'react';
import CDField from './CDField';

interface CDPage3Props {
  cdfData: any;
  getValue?: (path: string) => any;
  setValue?: (path: string, value: any) => void;
}

const CDPage3: React.FC<CDPage3Props> = ({ cdfData, getValue, setValue }) => {
  return (
    <div className="bg-white text-black w-[8.5in] min-h-[11in] mx-auto p-0 font-['Arial',sans-serif] text-[10pt] leading-tight print:shadow-none shadow-lg">
      {/* Header */}
      <div className="bg-black text-white p-2 text-center font-bold text-[11pt]">
        Calculating Cash to Close
      </div>

      {/* Use this table to see what has changed from your Loan Estimate */}
      <div className="text-center text-[9pt] p-1 border-b border-black">
        Use this table to see what has changed from your Loan Estimate.
      </div>

      {/* Main Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-1 text-left text-[10pt] font-bold w-[50%]"></th>
            <th className="border border-black p-1 text-center text-[10pt] font-bold w-[25%]">Loan Estimate</th>
            <th className="border border-black p-1 text-center text-[10pt] font-bold w-[25%]">Final</th>
            <th className="border border-black p-1 text-center text-[10pt] font-bold">Did this change?</th>
          </tr>
        </thead>
        <tbody>
          {/* Total Closing Costs (J) */}
          <tr>
            <td className="border border-black p-1 text-[10pt]">
              Total Closing Costs (J)
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.loan_estimate?.total_closing_costs}
                schemaKey="cdfData.cash_to_close.loan_estimate.total_closing_costs"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0"
                documentMode
                mappings={{
                  ucd: null,
                  qualia: "cash_to_close.loan_estimate.total_closing_costs",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.final?.total_closing_costs}
                schemaKey="cdfData.cash_to_close.final.total_closing_costs"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0"
                documentMode
                mappings={{
                  ucd: "CLOSING.TotalClosingCosts",
                  qualia: "cash_to_close.final.total_closing_costs",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1 text-center text-[9pt]">
              {cdfData?.cash_to_close?.did_change?.total_closing_costs ? 'YES' : 'NO'}
            </td>
          </tr>

          {/* Closing Costs Financed */}
          <tr>
            <td className="border border-black p-1 text-[10pt]">
              Closing Costs Financed (Paid from your Loan Amount)
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.loan_estimate?.closing_costs_financed}
                schemaKey="cdfData.cash_to_close.loan_estimate.closing_costs_financed"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0"
                documentMode
                mappings={{
                  ucd: null,
                  qualia: "cash_to_close.loan_estimate.closing_costs_financed",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.final?.closing_costs_financed}
                schemaKey="cdfData.cash_to_close.final.closing_costs_financed"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0"
                documentMode
                mappings={{
                  ucd: "CLOSING.ClosingCostsFinanced",
                  qualia: "cash_to_close.final.closing_costs_financed",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1 text-center text-[9pt]">
              {cdfData?.cash_to_close?.did_change?.closing_costs_financed ? 'YES' : 'NO'}
            </td>
          </tr>

          {/* Down Payment/Funds from Borrower */}
          <tr>
            <td className="border border-black p-1 text-[10pt]">
              Down Payment/Funds from Borrower
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.loan_estimate?.down_payment}
                schemaKey="cdfData.cash_to_close.loan_estimate.down_payment"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0"
                documentMode
                mappings={{
                  ucd: null,
                  qualia: "cash_to_close.loan_estimate.down_payment",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.final?.down_payment}
                schemaKey="cdfData.cash_to_close.final.down_payment"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0"
                documentMode
                mappings={{
                  ucd: "CLOSING.DownPayment",
                  qualia: "cash_to_close.final.down_payment",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1 text-center text-[9pt]">
              {cdfData?.cash_to_close?.did_change?.down_payment ? 'YES' : 'NO'}
            </td>
          </tr>

          {/* Deposit */}
          <tr>
            <td className="border border-black p-1 text-[10pt]">
              Deposit
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.loan_estimate?.deposit}
                schemaKey="cdfData.cash_to_close.loan_estimate.deposit"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0"
                documentMode
                mappings={{
                  ucd: null,
                  qualia: "cash_to_close.loan_estimate.deposit",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.final?.deposit}
                schemaKey="cdfData.cash_to_close.final.deposit"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0"
                documentMode
                mappings={{
                  ucd: "CLOSING.EarnestMoneyDeposit",
                  qualia: "cash_to_close.final.deposit",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1 text-center text-[9pt]">
              {cdfData?.cash_to_close?.did_change?.deposit ? 'YES' : 'NO'}
            </td>
          </tr>

          {/* Funds for Borrower */}
          <tr>
            <td className="border border-black p-1 text-[10pt]">
              Funds for Borrower
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.loan_estimate?.funds_for_borrower}
                schemaKey="cdfData.cash_to_close.loan_estimate.funds_for_borrower"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0"
                documentMode
                mappings={{
                  ucd: null,
                  qualia: "cash_to_close.loan_estimate.funds_for_borrower",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.final?.funds_for_borrower}
                schemaKey="cdfData.cash_to_close.final.funds_for_borrower"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0"
                documentMode
                mappings={{
                  ucd: null,
                  qualia: "cash_to_close.final.funds_for_borrower",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1 text-center text-[9pt]">
              {cdfData?.cash_to_close?.did_change?.funds_for_borrower ? 'YES' : 'NO'}
            </td>
          </tr>

          {/* Seller Credits */}
          <tr>
            <td className="border border-black p-1 text-[10pt]">
              Seller Credits
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.loan_estimate?.seller_credits}
                schemaKey="cdfData.cash_to_close.loan_estimate.seller_credits"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0"
                documentMode
                mappings={{
                  ucd: null,
                  qualia: "cash_to_close.loan_estimate.seller_credits",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.final?.seller_credits}
                schemaKey="cdfData.cash_to_close.final.seller_credits"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0"
                documentMode
                mappings={{
                  ucd: "CLOSING.SellerCredits",
                  qualia: "cash_to_close.final.seller_credits",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1 text-center text-[9pt]">
              {cdfData?.cash_to_close?.did_change?.seller_credits ? 'YES' : 'NO'}
            </td>
          </tr>

          {/* Adjustments and Other Credits */}
          <tr>
            <td className="border border-black p-1 text-[10pt]">
              Adjustments and Other Credits
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.loan_estimate?.adjustments}
                schemaKey="cdfData.cash_to_close.loan_estimate.adjustments"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0"
                documentMode
                mappings={{
                  ucd: null,
                  qualia: "cash_to_close.loan_estimate.adjustments",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.final?.adjustments}
                schemaKey="cdfData.cash_to_close.final.adjustments"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0"
                documentMode
                mappings={{
                  ucd: "CLOSING.Adjustments",
                  qualia: "cash_to_close.final.adjustments",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1 text-center text-[9pt]">
              {cdfData?.cash_to_close?.did_change?.adjustments ? 'YES' : 'NO'}
            </td>
          </tr>

          {/* Cash to Close */}
          <tr className="bg-gray-200 font-bold">
            <td className="border border-black p-1 text-[10pt]">
              Cash to Close
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.loan_estimate?.cash_to_close}
                schemaKey="cdfData.cash_to_close.loan_estimate.cash_to_close"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0 font-bold"
                documentMode
                mappings={{
                  ucd: null,
                  qualia: "cash_to_close.loan_estimate.cash_to_close",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1">
              <CDField
                value={cdfData?.cash_to_close?.final?.cash_to_close}
                schemaKey="cdfData.cash_to_close.final.cash_to_close"
                getValue={getValue}
                setValue={setValue}
                type="currency"
                className="text-right w-full border-0 p-0 font-bold"
                documentMode
                mappings={{
                  ucd: "CLOSING.CashToClose",
                  qualia: "cash_to_close.final.cash_to_close",
                  gui: "CashToClose.tsx"
                }}
              />
            </td>
            <td className="border border-black p-1"></td>
          </tr>
        </tbody>
      </table>

      {/* Summaries of Transactions */}
      <div className="mt-4">
        <div className="bg-black text-white p-2 text-center font-bold text-[11pt]">
          Summaries of Transactions
        </div>

        <div className="flex">
          {/* Borrower's Transaction */}
          <div className="w-1/2 border-r border-black">
            <div className="bg-gray-100 border-b border-black p-1 font-bold text-center text-[10pt]">
              BORROWER'S TRANSACTION
            </div>

            {/* K. Due from Borrower at Closing */}
            <div className="border-b border-black">
              <div className="bg-gray-50 p-1 font-bold text-[10pt]">
                K. Due from Borrower at Closing
              </div>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="p-1 text-[9pt]">01 Sale Price of Property</td>
                    <td className="p-1 text-right">
                      <CDField
                        value={cdfData?.summaries?.borrower?.k_due_from?.line_01?.amount}
                        schemaKey="cdfData.summaries.borrower.k_due_from.line_01.amount"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: "PROPERTY.SalePrice",
                          qualia: "summaries.borrower.k_due_from.line_01.amount",
                          gui: "SummariesOfTransactions.tsx"
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 text-[9pt]">02 Sale Price of Any Personal Property</td>
                    <td className="p-1 text-right">
                      <CDField
                        value={cdfData?.summaries?.borrower?.k_due_from?.line_02?.amount}
                        schemaKey="cdfData.summaries.borrower.k_due_from.line_02.amount"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: null,
                          qualia: "summaries.borrower.k_due_from.line_02.amount",
                          gui: "SummariesOfTransactions.tsx"
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 text-[9pt]">03 Closing Costs (J)</td>
                    <td className="p-1 text-right">
                      <CDField
                        value={cdfData?.summaries?.borrower?.k_due_from?.line_03?.amount}
                        schemaKey="cdfData.summaries.borrower.k_due_from.line_03.amount"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: "CLOSING.TotalClosingCosts",
                          qualia: "summaries.borrower.k_due_from.line_03.amount",
                          gui: "SummariesOfTransactions.tsx"
                        }}
                      />
                    </td>
                  </tr>
                  {/* Lines 04-09 Adjustments */}
                  {[4, 5, 6, 7, 8, 9].map(i => (
                    <tr key={i}>
                      <td className="p-1 text-[9pt]">
                        {String(i).padStart(2, '0')}
                        <CDField
                          value={cdfData?.summaries?.borrower?.k_due_from?.[`line_${String(i).padStart(2, '0')}`]?.description}
                          schemaKey={`cdfData.summaries.borrower.k_due_from.line_${String(i).padStart(2, '0')}.description`}
                          getValue={getValue}
                          setValue={setValue}
                          type="text"
                          className="ml-2 border-0 p-0"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: `summaries.borrower.k_due_from.line_${String(i).padStart(2, '0')}.description`,
                            gui: "SummariesOfTransactions.tsx"
                          }}
                        />
                      </td>
                      <td className="p-1 text-right">
                        <CDField
                          value={cdfData?.summaries?.borrower?.k_due_from?.[`line_${String(i).padStart(2, '0')}`]?.amount}
                          schemaKey={`cdfData.summaries.borrower.k_due_from.line_${String(i).padStart(2, '0')}.amount`}
                          getValue={getValue}
                          setValue={setValue}
                          type="currency"
                          className="text-right w-full border-0 p-0"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: `summaries.borrower.k_due_from.line_${String(i).padStart(2, '0')}.amount`,
                            gui: "SummariesOfTransactions.tsx"
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* L. Paid Already by or on Behalf of Borrower at Closing */}
            <div className="border-b border-black">
              <div className="bg-gray-50 p-1 font-bold text-[10pt]">
                L. Paid Already by or on Behalf of Borrower at Closing
              </div>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="p-1 text-[9pt]">01 Deposit</td>
                    <td className="p-1 text-right">
                      <CDField
                        value={cdfData?.summaries?.borrower?.l_paid_already?.line_01?.amount}
                        schemaKey="cdfData.summaries.borrower.l_paid_already.line_01.amount"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: "CLOSING.EarnestMoneyDeposit",
                          qualia: "summaries.borrower.l_paid_already.line_01.amount",
                          gui: "SummariesOfTransactions.tsx"
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 text-[9pt]">02 Loan Amount</td>
                    <td className="p-1 text-right">
                      <CDField
                        value={cdfData?.summaries?.borrower?.l_paid_already?.line_02?.amount}
                        schemaKey="cdfData.summaries.borrower.l_paid_already.line_02.amount"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: "LOAN.LoanAmount",
                          qualia: "summaries.borrower.l_paid_already.line_02.amount",
                          gui: "SummariesOfTransactions.tsx"
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 text-[9pt]">03 Existing Loan(s) Assumed or Taken Subject to</td>
                    <td className="p-1 text-right">
                      <CDField
                        value={cdfData?.summaries?.borrower?.l_paid_already?.line_03?.amount}
                        schemaKey="cdfData.summaries.borrower.l_paid_already.line_03.amount"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: null,
                          qualia: "summaries.borrower.l_paid_already.line_03.amount",
                          gui: "SummariesOfTransactions.tsx"
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 text-[9pt]">04 Seller Credit</td>
                    <td className="p-1 text-right">
                      <CDField
                        value={cdfData?.summaries?.borrower?.l_paid_already?.line_04?.amount}
                        schemaKey="cdfData.summaries.borrower.l_paid_already.line_04.amount"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: "CLOSING.SellerCredits",
                          qualia: "summaries.borrower.l_paid_already.line_04.amount",
                          gui: "SummariesOfTransactions.tsx"
                        }}
                      />
                    </td>
                  </tr>
                  {/* Other Credits lines 05-14 */}
                  {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(i => (
                    <tr key={i}>
                      <td className="p-1 text-[9pt]">
                        {String(i).padStart(2, '0')}
                        <CDField
                          value={cdfData?.summaries?.borrower?.l_paid_already?.[`line_${String(i).padStart(2, '0')}`]?.description}
                          schemaKey={`cdfData.summaries.borrower.l_paid_already.line_${String(i).padStart(2, '0')}.description`}
                          getValue={getValue}
                          setValue={setValue}
                          type="text"
                          className="ml-2 border-0 p-0"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: `summaries.borrower.l_paid_already.line_${String(i).padStart(2, '0')}.description`,
                            gui: "SummariesOfTransactions.tsx"
                          }}
                        />
                      </td>
                      <td className="p-1 text-right">
                        <CDField
                          value={cdfData?.summaries?.borrower?.l_paid_already?.[`line_${String(i).padStart(2, '0')}`]?.amount}
                          schemaKey={`cdfData.summaries.borrower.l_paid_already.line_${String(i).padStart(2, '0')}.amount`}
                          getValue={getValue}
                          setValue={setValue}
                          type="currency"
                          className="text-right w-full border-0 p-0"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: `summaries.borrower.l_paid_already.line_${String(i).padStart(2, '0')}.amount`,
                            gui: "SummariesOfTransactions.tsx"
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculation */}
            <div className="bg-gray-100 border-b border-black p-1 font-bold text-[10pt] text-right">
              CALCULATION
            </div>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="p-1 text-[9pt]">Total Due from Borrower at Closing (K)</td>
                  <td className="p-1 text-right font-bold">
                    <CDField
                      value={cdfData?.summaries?.borrower?.total_due_from}
                      schemaKey="cdfData.summaries.borrower.total_due_from"
                      getValue={getValue}
                      setValue={setValue}
                      type="currency"
                      className="text-right w-full border-0 p-0"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "summaries.borrower.total_due_from",
                        gui: "SummariesOfTransactions.tsx"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 text-[9pt]">Total Paid Already by/for Borrower at Closing (L)</td>
                  <td className="p-1 text-right font-bold">
                    <CDField
                      value={cdfData?.summaries?.borrower?.total_paid_already}
                      schemaKey="cdfData.summaries.borrower.total_paid_already"
                      getValue={getValue}
                      setValue={setValue}
                      type="currency"
                      className="text-right w-full border-0 p-0"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "summaries.borrower.total_paid_already",
                        gui: "SummariesOfTransactions.tsx"
                      }}
                    />
                  </td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="p-1 text-[10pt] font-bold">Cash to Close ✖ From ☐ To Borrower</td>
                  <td className="p-1 text-right font-bold">
                    <CDField
                      value={cdfData?.summaries?.borrower?.cash_to_close}
                      schemaKey="cdfData.summaries.borrower.cash_to_close"
                      getValue={getValue}
                      setValue={setValue}
                      type="currency"
                      className="text-right w-full border-0 p-0 font-bold"
                      documentMode
                      mappings={{
                        ucd: "CLOSING.CashToClose",
                        qualia: "summaries.borrower.cash_to_close",
                        gui: "SummariesOfTransactions.tsx"
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Seller's Transaction */}
          <div className="w-1/2">
            <div className="bg-gray-100 border-b border-black p-1 font-bold text-center text-[10pt]">
              SELLER'S TRANSACTION
            </div>

            {/* M. Due to Seller at Closing */}
            <div className="border-b border-black">
              <div className="bg-gray-50 p-1 font-bold text-[10pt]">
                M. Due to Seller at Closing
              </div>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="p-1 text-[9pt]">01 Sale Price of Property</td>
                    <td className="p-1 text-right">
                      <CDField
                        value={cdfData?.summaries?.seller?.m_due_to?.line_01?.amount}
                        schemaKey="cdfData.summaries.seller.m_due_to.line_01.amount"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: "PROPERTY.SalePrice",
                          qualia: "summaries.seller.m_due_to.line_01.amount",
                          gui: "SummariesOfTransactions.tsx"
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 text-[9pt]">02 Sale Price of Any Personal Property</td>
                    <td className="p-1 text-right">
                      <CDField
                        value={cdfData?.summaries?.seller?.m_due_to?.line_02?.amount}
                        schemaKey="cdfData.summaries.seller.m_due_to.line_02.amount"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: null,
                          qualia: "summaries.seller.m_due_to.line_02.amount",
                          gui: "SummariesOfTransactions.tsx"
                        }}
                      />
                    </td>
                  </tr>
                  {/* Lines 03-08 */}
                  {[3, 4, 5, 6, 7, 8].map(i => (
                    <tr key={i}>
                      <td className="p-1 text-[9pt]">
                        {String(i).padStart(2, '0')}
                        <CDField
                          value={cdfData?.summaries?.seller?.m_due_to?.[`line_${String(i).padStart(2, '0')}`]?.description}
                          schemaKey={`cdfData.summaries.seller.m_due_to.line_${String(i).padStart(2, '0')}.description`}
                          getValue={getValue}
                          setValue={setValue}
                          type="text"
                          className="ml-2 border-0 p-0"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: `summaries.seller.m_due_to.line_${String(i).padStart(2, '0')}.description`,
                            gui: "SummariesOfTransactions.tsx"
                          }}
                        />
                      </td>
                      <td className="p-1 text-right">
                        <CDField
                          value={cdfData?.summaries?.seller?.m_due_to?.[`line_${String(i).padStart(2, '0')}`]?.amount}
                          schemaKey={`cdfData.summaries.seller.m_due_to.line_${String(i).padStart(2, '0')}.amount`}
                          getValue={getValue}
                          setValue={setValue}
                          type="currency"
                          className="text-right w-full border-0 p-0"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: `summaries.seller.m_due_to.line_${String(i).padStart(2, '0')}.amount`,
                            gui: "SummariesOfTransactions.tsx"
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* N. Due from Seller at Closing */}
            <div className="border-b border-black">
              <div className="bg-gray-50 p-1 font-bold text-[10pt]">
                N. Due from Seller at Closing
              </div>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="p-1 text-[9pt]">01 Excess Deposit</td>
                    <td className="p-1 text-right">
                      <CDField
                        value={cdfData?.summaries?.seller?.n_due_from?.line_01?.amount}
                        schemaKey="cdfData.summaries.seller.n_due_from.line_01.amount"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: null,
                          qualia: "summaries.seller.n_due_from.line_01.amount",
                          gui: "SummariesOfTransactions.tsx"
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 text-[9pt]">02 Closing Costs</td>
                    <td className="p-1 text-right">
                      <CDField
                        value={cdfData?.summaries?.seller?.n_due_from?.line_02?.amount}
                        schemaKey="cdfData.summaries.seller.n_due_from.line_02.amount"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: null,
                          qualia: "summaries.seller.n_due_from.line_02.amount",
                          gui: "SummariesOfTransactions.tsx"
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 text-[9pt]">03 Existing Loan(s) Taken Subject to</td>
                    <td className="p-1 text-right">
                      <CDField
                        value={cdfData?.summaries?.seller?.n_due_from?.line_03?.amount}
                        schemaKey="cdfData.summaries.seller.n_due_from.line_03.amount"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: null,
                          qualia: "summaries.seller.n_due_from.line_03.amount",
                          gui: "SummariesOfTransactions.tsx"
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 text-[9pt]">04 Payoff of First Mortgage Loan</td>
                    <td className="p-1 text-right">
                      <CDField
                        value={cdfData?.summaries?.seller?.n_due_from?.line_04?.amount}
                        schemaKey="cdfData.summaries.seller.n_due_from.line_04.amount"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: null,
                          qualia: "summaries.seller.n_due_from.line_04.amount",
                          gui: "SummariesOfTransactions.tsx"
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 text-[9pt]">05 Payoff of Second Mortgage Loan</td>
                    <td className="p-1 text-right">
                      <CDField
                        value={cdfData?.summaries?.seller?.n_due_from?.line_05?.amount}
                        schemaKey="cdfData.summaries.seller.n_due_from.line_05.amount"
                        getValue={getValue}
                        setValue={setValue}
                        type="currency"
                        className="text-right w-full border-0 p-0"
                        documentMode
                        mappings={{
                          ucd: null,
                          qualia: "summaries.seller.n_due_from.line_05.amount",
                          gui: "SummariesOfTransactions.tsx"
                        }}
                      />
                    </td>
                  </tr>
                  {/* Lines 06-13 */}
                  {[6, 7, 8, 9, 10, 11, 12, 13].map(i => (
                    <tr key={i}>
                      <td className="p-1 text-[9pt]">
                        {String(i).padStart(2, '0')}
                        <CDField
                          value={cdfData?.summaries?.seller?.n_due_from?.[`line_${String(i).padStart(2, '0')}`]?.description}
                          schemaKey={`cdfData.summaries.seller.n_due_from.line_${String(i).padStart(2, '0')}.description`}
                          getValue={getValue}
                          setValue={setValue}
                          type="text"
                          className="ml-2 border-0 p-0"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: `summaries.seller.n_due_from.line_${String(i).padStart(2, '0')}.description`,
                            gui: "SummariesOfTransactions.tsx"
                          }}
                        />
                      </td>
                      <td className="p-1 text-right">
                        <CDField
                          value={cdfData?.summaries?.seller?.n_due_from?.[`line_${String(i).padStart(2, '0')}`]?.amount}
                          schemaKey={`cdfData.summaries.seller.n_due_from.line_${String(i).padStart(2, '0')}.amount`}
                          getValue={getValue}
                          setValue={setValue}
                          type="currency"
                          className="text-right w-full border-0 p-0"
                          documentMode
                          mappings={{
                            ucd: null,
                            qualia: `summaries.seller.n_due_from.line_${String(i).padStart(2, '0')}.amount`,
                            gui: "SummariesOfTransactions.tsx"
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculation */}
            <div className="bg-gray-100 border-b border-black p-1 font-bold text-[10pt] text-right">
              CALCULATION
            </div>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="p-1 text-[9pt]">Total Due to Seller at Closing (M)</td>
                  <td className="p-1 text-right font-bold">
                    <CDField
                      value={cdfData?.summaries?.seller?.total_due_to}
                      schemaKey="cdfData.summaries.seller.total_due_to"
                      getValue={getValue}
                      setValue={setValue}
                      type="currency"
                      className="text-right w-full border-0 p-0"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "summaries.seller.total_due_to",
                        gui: "SummariesOfTransactions.tsx"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-1 text-[9pt]">Total Due from Seller at Closing (N)</td>
                  <td className="p-1 text-right font-bold">
                    <CDField
                      value={cdfData?.summaries?.seller?.total_due_from}
                      schemaKey="cdfData.summaries.seller.total_due_from"
                      getValue={getValue}
                      setValue={setValue}
                      type="currency"
                      className="text-right w-full border-0 p-0"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "summaries.seller.total_due_from",
                        gui: "SummariesOfTransactions.tsx"
                      }}
                    />
                  </td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="p-1 text-[10pt] font-bold">Cash ☐ From ✖ To Seller</td>
                  <td className="p-1 text-right font-bold">
                    <CDField
                      value={cdfData?.summaries?.seller?.cash_to_seller}
                      schemaKey="cdfData.summaries.seller.cash_to_seller"
                      getValue={getValue}
                      setValue={setValue}
                      type="currency"
                      className="text-right w-full border-0 p-0 font-bold"
                      documentMode
                      mappings={{
                        ucd: null,
                        qualia: "summaries.seller.cash_to_seller",
                        gui: "SummariesOfTransactions.tsx"
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 text-[8pt] text-gray-600 text-center border-t border-gray-300">
        <div>CLOSING DISCLOSURE</div>
        <div className="text-right pr-2">PAGE 3 OF 5 • LOAN ID # 
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

export default CDPage3;