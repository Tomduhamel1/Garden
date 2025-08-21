import React, { useState } from 'react';

const LoanDisclosures: React.FC = () => {
  const [assumption, setAssumption] = useState('');
  const [demandFeature, setDemandFeature] = useState('');
  const [latePaymentDays, setLatePaymentDays] = useState('');
  const [latePenaltyAmount, setLatePenaltyAmount] = useState('');
  const [negativeAmortization, setNegativeAmortization] = useState('');
  const [partialPayments, setPartialPayments] = useState({
    mayAccept: false,
    mayHold: false,
    doesNotAccept: false
  });
  const [escrowAccount, setEscrowAccount] = useState('');
  const [noEscrowReason, setNoEscrowReason] = useState('');
  const [estimatedPropertyCosts, setEstimatedPropertyCosts] = useState('');
  const [escrowWaiverFee, setEscrowWaiverFee] = useState('');

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto min-w-0">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center gap-4">
          <i className="fa fa-file-contract text-gray-400 text-xl"></i>
          <h2 className="text-2xl font-semibold text-white">Loan Disclosures</h2>
        </section>
        
        {/* Form Container */}
        <section className="px-10 py-8">
          <form className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Assumption */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Assumption</h4>
              <div className="p-4 bg-gray-800 rounded">
                <p className="mb-3 text-sm">
                  If you sell or transfer this property to another person, your lender
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="assumption"
                      value="yes"
                      checked={assumption === 'yes'}
                      onChange={(e) => setAssumption(e.target.value)}
                      className="text-blue-500"
                      data-schema-key="cdf.loans.0.loan_disclosures.assumption"
                    />
                    <span>will allow assumption</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="assumption"
                      value="no"
                      checked={assumption === 'no'}
                      onChange={(e) => setAssumption(e.target.value)}
                      className="text-blue-500"
                      data-schema-key="cdf.loans.0.loan_disclosures.assumption"
                    />
                    <span>will not allow assumption</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Demand Feature */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Demand Feature</h4>
              <div className="p-4 bg-gray-800 rounded">
                <p className="mb-3 text-sm">Your loan</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="demand_feature"
                      value="yes"
                      checked={demandFeature === 'yes'}
                      onChange={(e) => setDemandFeature(e.target.value)}
                      className="text-blue-500"
                      data-schema-key="cdf.loans.0.loan_disclosures.demand_feature"
                    />
                    <span>has a demand feature</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="demand_feature"
                      value="no"
                      checked={demandFeature === 'no'}
                      onChange={(e) => setDemandFeature(e.target.value)}
                      className="text-blue-500"
                      data-schema-key="cdf.loans.0.loan_disclosures.demand_feature"
                    />
                    <span>no demand feature</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Late Payment */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Late Payment</h4>
              <div className="p-4 bg-gray-800 rounded">
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span>If your payment is more than</span>
                  <input
                    type="text"
                    value={latePaymentDays}
                    onChange={(e) => setLatePaymentDays(e.target.value)}
                    className="w-16 px-2 py-1 bg-gray-700 text-white rounded border border-gray-600 text-center focus:outline-none focus:border-blue-500"
                    data-schema-key="cdf.loans.0.penalty_grace_period_days"
                  />
                  <span>days late, your lender will charge a late fee of</span>
                  <input
                    type="text"
                    value={latePenaltyAmount}
                    onChange={(e) => setLatePenaltyAmount(e.target.value)}
                    className="w-24 px-2 py-1 bg-gray-700 text-white rounded border border-gray-600 text-center focus:outline-none focus:border-blue-500"
                    data-schema-key="cdf.loans.0.late_penalty_amount"
                  />
                </div>
              </div>
            </div>

            {/* Negative Amortization */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Negative Amortization</h4>
              <div className="p-4 bg-gray-800 rounded">
                <p className="mb-3 text-sm">Under your loan terms, you</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="negative_amortization"
                      value="yes"
                      checked={negativeAmortization === 'yes'}
                      onChange={(e) => setNegativeAmortization(e.target.value)}
                      className="text-blue-500"
                      data-schema-key="cdf.loans.0.loan_disclosures.negative_amortization"
                    />
                    <span>have negative amortization as a feature</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="negative_amortization"
                      value="maybe"
                      checked={negativeAmortization === 'maybe'}
                      onChange={(e) => setNegativeAmortization(e.target.value)}
                      className="text-blue-500"
                      data-schema-key="cdf.loans.0.loan_disclosures.negative_amortization"
                    />
                    <span>may have negative amortization</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="negative_amortization"
                      value="no"
                      checked={negativeAmortization === 'no'}
                      onChange={(e) => setNegativeAmortization(e.target.value)}
                      className="text-blue-500"
                      data-schema-key="cdf.loans.0.loan_disclosures.negative_amortization"
                    />
                    <span>not a feature of loan</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Partial Payments */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Partial Payments</h4>
              <div className="p-4 bg-gray-800 rounded">
                <p className="mb-3 text-sm">Your lender</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={partialPayments.mayAccept}
                      onChange={(e) => setPartialPayments({...partialPayments, mayAccept: e.target.checked})}
                      className="text-blue-500"
                      data-schema-key="cdf.loans.0.loan_disclosures.partial_payments_may_accept"
                    />
                    <span>may accept partial payments</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={partialPayments.mayHold}
                      onChange={(e) => setPartialPayments({...partialPayments, mayHold: e.target.checked})}
                      className="text-blue-500"
                      data-schema-key="cdf.loans.0.loan_disclosures.partial_payments_may_hold"
                    />
                    <span>may hold them in a separate account</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={partialPayments.doesNotAccept}
                      onChange={(e) => setPartialPayments({...partialPayments, doesNotAccept: e.target.checked})}
                      className="text-blue-500"
                      data-schema-key="cdf.loans.0.loan_disclosures.partial_payments_does_not_accept"
                    />
                    <span>does not accept any partial payments</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Escrow Account */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Escrow Account</h4>
              <div className="p-4 bg-gray-800 rounded space-y-4">
                <div>
                  <p className="mb-3 text-sm">For now, your loan</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="escrow_account"
                        value="yes"
                        checked={escrowAccount === 'yes'}
                        onChange={(e) => setEscrowAccount(e.target.value)}
                        className="text-blue-500"
                        data-schema-key="cdf.loans.0.loan_disclosures.escrow_account"
                      />
                      <span>has escrow</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="escrow_account"
                        value="no"
                        checked={escrowAccount === 'no'}
                        onChange={(e) => setEscrowAccount(e.target.value)}
                        className="text-blue-500"
                        data-schema-key="cdf.loans.0.loan_disclosures.escrow_account"
                      />
                      <span>will not have escrow</span>
                    </label>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm">Because</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="no_escrow_reason"
                        value="declined"
                        checked={noEscrowReason === 'declined'}
                        onChange={(e) => setNoEscrowReason(e.target.value)}
                        className="text-blue-500"
                        data-schema-key="cdf.loans.0.loan_disclosures.no_escrow_reason"
                      />
                      <span>escrow was declined</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="no_escrow_reason"
                        value="not_offered"
                        checked={noEscrowReason === 'not_offered'}
                        onChange={(e) => setNoEscrowReason(e.target.value)}
                        className="text-blue-500"
                        data-schema-key="cdf.loans.0.loan_disclosures.no_escrow_reason"
                      />
                      <span>lender does not offer escrow</span>
                    </label>
                  </div>
                </div>

                <hr className="border-gray-600" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Estimated property costs over year 1
                    </label>
                    <input
                      type="text"
                      value={estimatedPropertyCosts}
                      onChange={(e) => setEstimatedPropertyCosts(e.target.value)}
                      className="w-full px-3 py-1.5 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                      data-schema-key="cdf.loans.0.loan_disclosures.estimated_property_costs_over_year_1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Escrow waiver fee
                    </label>
                    <input
                      type="text"
                      value={escrowWaiverFee}
                      onChange={(e) => setEscrowWaiverFee(e.target.value)}
                      className="w-full px-3 py-1.5 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                      data-schema-key="cdf.loans.0.loan_disclosures.escrow_waiver_fee"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
        </section>
      </section>
    </>
  );
};

export default LoanDisclosures;