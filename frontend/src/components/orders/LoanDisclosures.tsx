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
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-file-text text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Loan Disclosures</h2>
          </div>
        </section>

        {/* Form Content */}
        <section className="px-10 py-8">
          <form className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Assumption Section */}
                <section>
                  <h4 className="text-lg font-semibold text-white mb-4">Assumption</h4>
                  <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                    <div className="space-y-4">
                      <p className="text-gray-300 text-sm">
                        If you sell or transfer this property to another person, your lender
                      </p>
                      <div className="space-y-3">
                        <div className="relative">
                          <input 
                            type="radio" 
                            id="assumption-yes" 
                            name="assumption" 
                            value="yes"
                            checked={assumption === 'yes'}
                            onChange={(e) => setAssumption(e.target.value)}
                            data-schema-key="cdf.loans.0.loan_disclosures.assumption"
                            className="absolute opacity-0"
                          />
                          <label 
                            htmlFor="assumption-yes" 
                            className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                          >
                            <span className={`absolute left-0 w-4 h-4 border-2 rounded-full ${
                              assumption === 'yes' 
                                ? 'border-blue-500' 
                                : 'border-gray-500'
                            } bg-gray-700`}>
                              {assumption === 'yes' && (
                                <span className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </span>
                            will allow assumption
                          </label>
                        </div>
                        <div className="relative">
                          <input 
                            type="radio" 
                            id="assumption-no" 
                            name="assumption" 
                            value="no"
                            checked={assumption === 'no'}
                            onChange={(e) => setAssumption(e.target.value)}
                            data-schema-key="cdf.loans.0.loan_disclosures.assumption"
                            className="absolute opacity-0"
                          />
                          <label 
                            htmlFor="assumption-no" 
                            className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                          >
                            <span className={`absolute left-0 w-4 h-4 border-2 rounded-full ${
                              assumption === 'no' 
                                ? 'border-blue-500' 
                                : 'border-gray-500'
                            } bg-gray-700`}>
                              {assumption === 'no' && (
                                <span className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </span>
                            will not allow assumption
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Demand Feature Section */}
                <section>
                  <h4 className="text-lg font-semibold text-white mb-4">Demand Feature</h4>
                  <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                    <div className="space-y-4">
                      <p className="text-gray-300 text-sm">Your loan</p>
                      <div className="space-y-3">
                        <div className="relative">
                          <input 
                            type="radio" 
                            id="demand-yes" 
                            name="demand_feature" 
                            value="yes"
                            checked={demandFeature === 'yes'}
                            onChange={(e) => setDemandFeature(e.target.value)}
                            data-schema-key="cdf.loans.0.loan_disclosures.demand_feature"
                            className="absolute opacity-0"
                          />
                          <label 
                            htmlFor="demand-yes" 
                            className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                          >
                            <span className={`absolute left-0 w-4 h-4 border-2 rounded-full ${
                              demandFeature === 'yes' 
                                ? 'border-blue-500' 
                                : 'border-gray-500'
                            } bg-gray-700`}>
                              {demandFeature === 'yes' && (
                                <span className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </span>
                            has a demand feature
                          </label>
                        </div>
                        <div className="relative">
                          <input 
                            type="radio" 
                            id="demand-no" 
                            name="demand_feature" 
                            value="no"
                            checked={demandFeature === 'no'}
                            onChange={(e) => setDemandFeature(e.target.value)}
                            data-schema-key="cdf.loans.0.loan_disclosures.demand_feature"
                            className="absolute opacity-0"
                          />
                          <label 
                            htmlFor="demand-no" 
                            className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                          >
                            <span className={`absolute left-0 w-4 h-4 border-2 rounded-full ${
                              demandFeature === 'no' 
                                ? 'border-blue-500' 
                                : 'border-gray-500'
                            } bg-gray-700`}>
                              {demandFeature === 'no' && (
                                <span className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </span>
                            no demand feature
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Late Payment Section */}
                <section>
                  <h4 className="text-lg font-semibold text-white mb-4">Late Payment</h4>
                  <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                    <div className="flex items-center gap-2 text-gray-300 text-sm flex-wrap">
                      <span>If your payment is more than</span>
                      <input 
                        type="text" 
                        value={latePaymentDays}
                        onChange={(e) => setLatePaymentDays(e.target.value)}
                        className="w-16 px-2 py-1 bg-gray-700 border border-gray-500 rounded text-white text-sm text-center focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdf.loans.0.penalty_grace_period_days"
                      />
                      <span>days late</span>
                      <span>your lender will charge a late fee of</span>
                      <input 
                        type="text" 
                        inputMode="decimal"
                        value={latePenaltyAmount}
                        onChange={(e) => setLatePenaltyAmount(e.target.value)}
                        className="w-24 px-2 py-1 bg-gray-700 border border-gray-500 rounded text-white text-sm text-center focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdf.loans.0.late_penalty_amount"
                      />
                    </div>
                  </div>
                </section>

                {/* Negative Amortization Section */}
                <section>
                  <h4 className="text-lg font-semibold text-white mb-4">Negative Amortization</h4>
                  <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                    <div className="space-y-4">
                      <p className="text-gray-300 text-sm">Under your loan terms, you</p>
                      <div className="space-y-3">
                        <div className="relative">
                          <input 
                            type="radio" 
                            id="negative-yes" 
                            name="negative_amortization" 
                            value="yes"
                            checked={negativeAmortization === 'yes'}
                            onChange={(e) => setNegativeAmortization(e.target.value)}
                            data-schema-key="cdf.loans.0.loan_disclosures.negative_amortization"
                            className="absolute opacity-0"
                          />
                          <label 
                            htmlFor="negative-yes" 
                            className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                          >
                            <span className={`absolute left-0 w-4 h-4 border-2 rounded-full ${
                              negativeAmortization === 'yes' 
                                ? 'border-blue-500' 
                                : 'border-gray-500'
                            } bg-gray-700`}>
                              {negativeAmortization === 'yes' && (
                                <span className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </span>
                            have negative amortization as a feature
                          </label>
                        </div>
                        <div className="relative">
                          <input 
                            type="radio" 
                            id="negative-maybe" 
                            name="negative_amortization" 
                            value="maybe"
                            checked={negativeAmortization === 'maybe'}
                            onChange={(e) => setNegativeAmortization(e.target.value)}
                            data-schema-key="cdf.loans.0.loan_disclosures.negative_amortization"
                            className="absolute opacity-0"
                          />
                          <label 
                            htmlFor="negative-maybe" 
                            className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                          >
                            <span className={`absolute left-0 w-4 h-4 border-2 rounded-full ${
                              negativeAmortization === 'maybe' 
                                ? 'border-blue-500' 
                                : 'border-gray-500'
                            } bg-gray-700`}>
                              {negativeAmortization === 'maybe' && (
                                <span className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </span>
                            may have negative amortization
                          </label>
                        </div>
                        <div className="relative">
                          <input 
                            type="radio" 
                            id="negative-no" 
                            name="negative_amortization" 
                            value="no"
                            checked={negativeAmortization === 'no'}
                            onChange={(e) => setNegativeAmortization(e.target.value)}
                            data-schema-key="cdf.loans.0.loan_disclosures.negative_amortization"
                            className="absolute opacity-0"
                          />
                          <label 
                            htmlFor="negative-no" 
                            className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                          >
                            <span className={`absolute left-0 w-4 h-4 border-2 rounded-full ${
                              negativeAmortization === 'no' 
                                ? 'border-blue-500' 
                                : 'border-gray-500'
                            } bg-gray-700`}>
                              {negativeAmortization === 'no' && (
                                <span className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </span>
                            not a feature of loan
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Partial Payments Section */}
                <section>
                  <h4 className="text-lg font-semibold text-white mb-4">Partial Payments</h4>
                  <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                    <div className="space-y-4">
                      <p className="text-gray-300 text-sm">Your lender</p>
                      <div className="space-y-3">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            id="partial-accept"
                            checked={partialPayments.mayAccept}
                            onChange={(e) => setPartialPayments({...partialPayments, mayAccept: e.target.checked})}
                            data-schema-key="cdf.loans.0.loan_disclosures.partial_payments_may_accept"
                            className="absolute opacity-0"
                          />
                          <label 
                            htmlFor="partial-accept" 
                            className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                          >
                            <span className={`absolute left-0 w-4 h-4 border-2 rounded ${
                              partialPayments.mayAccept 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-500 bg-gray-700'
                            }`}>
                              {partialPayments.mayAccept && (
                                <span className="absolute inset-0 flex items-center justify-center text-white text-xs">✓</span>
                              )}
                            </span>
                            may accept partial payments
                          </label>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            id="partial-hold"
                            checked={partialPayments.mayHold}
                            onChange={(e) => setPartialPayments({...partialPayments, mayHold: e.target.checked})}
                            data-schema-key="cdf.loans.0.loan_disclosures.partial_payments_may_hold"
                            className="absolute opacity-0"
                          />
                          <label 
                            htmlFor="partial-hold" 
                            className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                          >
                            <span className={`absolute left-0 w-4 h-4 border-2 rounded ${
                              partialPayments.mayHold 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-500 bg-gray-700'
                            }`}>
                              {partialPayments.mayHold && (
                                <span className="absolute inset-0 flex items-center justify-center text-white text-xs">✓</span>
                              )}
                            </span>
                            may hold them in a separate account
                          </label>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            id="partial-not-accept"
                            checked={partialPayments.doesNotAccept}
                            onChange={(e) => setPartialPayments({...partialPayments, doesNotAccept: e.target.checked})}
                            data-schema-key="cdf.loans.0.loan_disclosures.partial_payments_does_not_accept"
                            className="absolute opacity-0"
                          />
                          <label 
                            htmlFor="partial-not-accept" 
                            className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                          >
                            <span className={`absolute left-0 w-4 h-4 border-2 rounded ${
                              partialPayments.doesNotAccept 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-500 bg-gray-700'
                            }`}>
                              {partialPayments.doesNotAccept && (
                                <span className="absolute inset-0 flex items-center justify-center text-white text-xs">✓</span>
                              )}
                            </span>
                            does not accept any partial payments.
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Escrow Account Section */}
                <section>
                  <h4 className="text-lg font-semibold text-white mb-4">Escrow Account</h4>
                  <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <p className="text-gray-300 text-sm">For now, your loan</p>
                        <div className="space-y-3">
                          <div className="relative">
                            <input 
                              type="radio" 
                              id="escrow-yes" 
                              name="escrow_account" 
                              value="yes"
                              checked={escrowAccount === 'yes'}
                              onChange={(e) => setEscrowAccount(e.target.value)}
                              data-schema-key="cdf.loans.0.loan_disclosures.escrow_account"
                              className="absolute opacity-0"
                            />
                            <label 
                              htmlFor="escrow-yes" 
                              className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                            >
                              <span className={`absolute left-0 w-4 h-4 border-2 rounded-full ${
                                escrowAccount === 'yes' 
                                  ? 'border-blue-500' 
                                  : 'border-gray-500'
                              } bg-gray-700`}>
                                {escrowAccount === 'yes' && (
                                  <span className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                                )}
                              </span>
                              has escrow
                            </label>
                          </div>
                          <div className="relative">
                            <input 
                              type="radio" 
                              id="escrow-no" 
                              name="escrow_account" 
                              value="no"
                              checked={escrowAccount === 'no'}
                              onChange={(e) => setEscrowAccount(e.target.value)}
                              data-schema-key="cdf.loans.0.loan_disclosures.escrow_account"
                              className="absolute opacity-0"
                            />
                            <label 
                              htmlFor="escrow-no" 
                              className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                            >
                              <span className={`absolute left-0 w-4 h-4 border-2 rounded-full ${
                                escrowAccount === 'no' 
                                  ? 'border-blue-500' 
                                  : 'border-gray-500'
                              } bg-gray-700`}>
                                {escrowAccount === 'no' && (
                                  <span className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                                )}
                              </span>
                              will not have escrow
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-gray-300 text-sm">Because</p>
                        <div className="space-y-3">
                          <div className="relative">
                            <input 
                              type="radio" 
                              id="no-escrow-declined" 
                              name="no_escrow_reason" 
                              value="declined"
                              checked={noEscrowReason === 'declined'}
                              onChange={(e) => setNoEscrowReason(e.target.value)}
                              data-schema-key="cdf.loans.0.loan_disclosures.no_escrow_reason"
                              className="absolute opacity-0"
                            />
                            <label 
                              htmlFor="no-escrow-declined" 
                              className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                            >
                              <span className={`absolute left-0 w-4 h-4 border-2 rounded-full ${
                                noEscrowReason === 'declined' 
                                  ? 'border-blue-500' 
                                  : 'border-gray-500'
                              } bg-gray-700`}>
                                {noEscrowReason === 'declined' && (
                                  <span className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                                )}
                              </span>
                              escrow was declined
                            </label>
                          </div>
                          <div className="relative">
                            <input 
                              type="radio" 
                              id="no-escrow-not-offered" 
                              name="no_escrow_reason" 
                              value="not_offered"
                              checked={noEscrowReason === 'not_offered'}
                              onChange={(e) => setNoEscrowReason(e.target.value)}
                              data-schema-key="cdf.loans.0.loan_disclosures.no_escrow_reason"
                              className="absolute opacity-0"
                            />
                            <label 
                              htmlFor="no-escrow-not-offered" 
                              className="text-white text-sm cursor-pointer pl-6 relative flex items-center"
                            >
                              <span className={`absolute left-0 w-4 h-4 border-2 rounded-full ${
                                noEscrowReason === 'not_offered' 
                                  ? 'border-blue-500' 
                                  : 'border-gray-500'
                              } bg-gray-700`}>
                                {noEscrowReason === 'not_offered' && (
                                  <span className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                                )}
                              </span>
                              lender does not offer escrow
                            </label>
                          </div>
                        </div>
                      </div>

                      <hr className="border-gray-600" />

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Estimated property costs over year 1
                          </label>
                          <input 
                            type="text" 
                            inputMode="decimal"
                            value={estimatedPropertyCosts}
                            onChange={(e) => setEstimatedPropertyCosts(e.target.value)}
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                            data-schema-key="cdf.loans.0.loan_disclosures.estimated_property_costs_over_year_1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Escrow waiver fee
                          </label>
                          <input 
                            type="text" 
                            inputMode="decimal"
                            value={escrowWaiverFee}
                            onChange={(e) => setEscrowWaiverFee(e.target.value)}
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                            data-schema-key="cdf.loans.0.loan_disclosures.escrow_waiver_fee"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </form>
        </section>
      </section>

      {/* Right Rail */}
      <section className="w-64 bg-gray-800 border-l border-gray-600 p-5">
        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Chat</h4>
          <p className="text-gray-400 text-xs">Chat functionality</p>
        </section>

        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Tasks</h4>
          <p className="text-gray-400 text-xs">No tasks assigned</p>
        </section>

        <section className="mb-5 p-4 bg-gray-700 rounded">
          <h4 className="text-white text-sm mb-2.5">Notes</h4>
          <p className="text-gray-400 text-xs">No notes added</p>
        </section>
      </section>
    </>
  );
};

export default LoanDisclosures;