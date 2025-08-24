import React, { useState, useEffect } from 'react';
import { useOrderData } from '../../hooks/useOrderData';
import { calculateLoan, formatCurrency, formatPercentage, parseCurrency } from '../../utils/calculations';

interface LoanProps {
  orderId?: string;
}

const Loan: React.FC<LoanProps> = ({ orderId }) => {
  const { loading, saving, getValue, handleInputChange, handleSave } = useOrderData();
  const [fundingType, setFundingType] = useState<'net' | 'gross'>('net');
  const [latePenaltyType, setLatePenaltyType] = useState<'percent' | 'dollar'>('percent');
  const [interestOnly, setInterestOnly] = useState(false);
  const [isHeloc, setIsHeloc] = useState(false);
  const [isConstructionLoan, setIsConstructionLoan] = useState(false);
  const [isMERS, setIsMERS] = useState(false);
  const [generatingMortgageDocs, setGeneratingMortgageDocs] = useState(false);
  const [loanCalculation, setLoanCalculation] = useState<any>(null);

  // Calculate loan details when inputs change
  useEffect(() => {
    const loanAmount = parseCurrency(getValue('cdfData.loans.0.initial_loan_amount') || '0');
    const interestRate = parseFloat(getValue('cdfData.loans.0.interest_rate') || '0');
    const termYears = parseInt(getValue('cdfData.loans.0.loan_term_years') || '0');
    const termMonths = parseInt(getValue('cdfData.loans.0.loan_term_months') || '0');
    
    if (loanAmount > 0 && interestRate > 0 && (termYears > 0 || termMonths > 0)) {
      const totalMonths = (termYears * 12) + termMonths;
      const calculation = calculateLoan(loanAmount, interestRate, totalMonths, {
        includeAmortization: false
      });
      setLoanCalculation(calculation);
    }
  }, [getValue]);

  const ToggleSwitch = ({ 
    checked, 
    onChange, 
    label 
  }: { 
    checked: boolean; 
    onChange: (checked: boolean) => void; 
    label: string;
  }) => (
    <label className="flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="relative">
        <div className={`block w-14 h-8 rounded-full ${checked ? 'bg-blue-600' : 'bg-gray-600'}`}></div>
        <div 
          className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform"
          style={{ transform: checked ? 'translateX(1.5rem)' : 'translateX(0)' }}
        ></div>
      </div>
      <span className="ml-3 text-gray-300">{label}</span>
    </label>
  );

  return (
    <>
      {/* Main Content */}
      <section className="flex-1 bg-gray-900 overflow-y-auto">
        {/* Page Header */}
        <section className="py-8 px-10 pb-5 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <i className="fa fa-university text-gray-400 text-xl"></i>
            <h2 className="text-2xl font-semibold text-white">Loan</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={loading || saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded text-white text-sm flex items-center gap-2"
            >
              {saving && <i className="fa fa-spinner fa-spin"></i>}
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm hover:bg-gray-500">
              <i className="fa fa-plus mr-2"></i>
              Add Loan
            </button>
          </div>
        </section>

        {/* Loan Form */}
        <section className="px-10 py-8">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <i className="fa fa-spinner fa-spin text-2xl text-gray-400"></i>
              <span className="ml-3 text-gray-400">Loading...</span>
            </div>
          )}
          
          {!loading && (
          <form className="space-y-8">
            <div className="grid grid-cols-2 gap-10">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Loan Section */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Loan</h3>
                  <div className="grid grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Loan Amount</label>
                      <input 
                        type="text" 
                        inputMode="decimal" 
                        value={getValue('cdfData.loans.0.initial_loan_amount')}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdfData.loans.0.initial_loan_amount"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Funding Type</label>
                      <div className="flex bg-gray-700 border border-gray-500 rounded overflow-hidden">
                        <button 
                          type="button" 
                          className={`flex-1 px-4 py-2.5 text-sm font-medium ${
                            fundingType === 'net' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                          onClick={() => setFundingType('net')}
                        >
                          Net
                        </button>
                        <button 
                          type="button" 
                          className={`flex-1 px-4 py-2.5 text-sm font-medium ${
                            fundingType === 'gross' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                          onClick={() => setFundingType('gross')}
                        >
                          Gross
                        </button>
                      </div>
                      <input type="hidden" data-schema-key="cdfData.loans.0.funding_type" value={fundingType} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Loan Type</label>
                      <select 
                        value={getValue('cdfData.loans.0.loan_type') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                        data-schema-key="cdfData.loans.0.loan_type"
                      >
                        <option value="">Select...</option>
                        <option value="Conventional">Conventional</option>
                        <option value="FHA">FHA</option>
                        <option value="VA">VA</option>
                        <option value="USDA">USDA</option>
                        <option value="Jumbo">Jumbo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Loan Purpose</label>
                      <select 
                        value={getValue('cdfData.loans.0.loan_purpose') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                        data-schema-key="cdfData.loans.0.loan_purpose"
                      >
                        <option value="">Select...</option>
                        <option value="Purchase">Purchase</option>
                        <option value="Refinance">Refinance</option>
                        <option value="CashOut">Cash-Out Refinance</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Term & Dates Section */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Term & Dates</h3>
                  <div className="grid grid-cols-2 gap-5 mb-5">
                    <div className="relative">
                      <label className="block text-sm text-gray-300 mb-2">Loan Term</label>
                      <div className="flex">
                        <input 
                          type="text" 
                          inputMode="numeric" 
                          value={getValue('cdfData.loans.0.loan_term_years')}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2.5 bg-gray-700 border border-gray-500 rounded-l text-white text-sm focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdfData.loans.0.loan_term_years"
                        />
                        <div className="bg-gray-600 border border-gray-500 border-l-0 px-3 py-2.5 rounded-r text-sm text-gray-300">yr.</div>
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-sm text-gray-300 mb-2">&nbsp;</label>
                      <div className="flex">
                        <div className="bg-gray-600 border border-gray-500 border-r-0 px-3 py-2.5 rounded-l text-sm text-gray-300">and</div>
                        <input 
                          type="text" 
                          inputMode="numeric" 
                          value={getValue('cdfData.loans.0.loan_term_months')}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2.5 bg-gray-700 border border-gray-500 text-white text-sm focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdfData.loans.0.loan_term_months"
                        />
                        <div className="bg-gray-600 border border-gray-500 border-l-0 px-3 py-2.5 rounded-r text-sm text-gray-300">mo.</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">First Payment Date</label>
                      <div className="relative">
                        <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input 
                          type="text" 
                          inputMode="numeric" 
                          value={getValue('cdfData.loans.0.first_payment_date')}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdfData.loans.0.first_payment_date"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Last Payment Date</label>
                      <div className="relative">
                        <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input 
                          type="text" 
                          inputMode="numeric" 
                          value={getValue('cdfData.loans.0.last_payment_date') || ''}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                          data-schema-key="cdfData.loans.0.last_payment_date"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Mortgage Commitment Date</label>
                    <div className="relative">
                      <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input 
                        type="text" 
                        inputMode="numeric" 
                        value={getValue('cdfData.loans.0.mortgage_commitment_date') || ''}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdfData.loans.0.mortgage_commitment_date"
                      />
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Disclosures & Tracking Section */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Disclosures & Tracking</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Loan ID #</label>
                      <input 
                        type="text" 
                        maxLength={30} 
                        value={getValue('cdfData.loans.0.loan_number') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdfData.loans.0.loan_number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Mortgage Ins. Case #</label>
                      <input 
                        type="text" 
                        maxLength={30} 
                        value={getValue('cdfData.loans.0.mortgage_insurance_case_number') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdfData.loans.0.mortgage_insurance_case_number"
                      />
                    </div>
                  </div>
                </section>

                {/* Late Penalty Section */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Late Penalty</h3>
                  <div className="grid grid-cols-3 gap-5 mb-5">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Grace Period Days</label>
                      <input 
                        type="text" 
                        value={getValue('cdfData.loans.0.penalty_grace_period_days') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdfData.loans.0.penalty_grace_period_days"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Late Penalty Amount</label>
                      <input 
                        type="text" 
                        inputMode="decimal" 
                        value={getValue('cdfData.loans.0.late_penalty_amount') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdfData.loans.0.late_penalty_amount"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Late Penalty Type</label>
                      <div className="flex bg-gray-700 border border-gray-500 rounded overflow-hidden">
                        <button 
                          type="button" 
                          className={`flex-1 px-4 py-2.5 text-sm font-medium ${
                            latePenaltyType === 'percent' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                          onClick={() => setLatePenaltyType('percent')}
                        >
                          %
                        </button>
                        <button 
                          type="button" 
                          className={`flex-1 px-4 py-2.5 text-sm font-medium ${
                            latePenaltyType === 'dollar' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                          onClick={() => setLatePenaltyType('dollar')}
                        >
                          $
                        </button>
                      </div>
                      <input type="hidden" data-schema-key="cdfData.loans.0.late_penalty_type" value={latePenaltyType === 'percent' ? '%' : '$'} />
                    </div>
                  </div>
                </section>

                {/* Mortgage Insurance Section */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Mortgage Insurance</h3>
                  <div className="grid grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Monthly MI Amount</label>
                      <input 
                        type="text" 
                        inputMode="decimal" 
                        value={getValue('cdfData.loans.0.mi_monthly_amount') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdfData.loans.0.mi_monthly_amount"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Upfront MI Amount</label>
                      <input 
                        type="text" 
                        inputMode="decimal" 
                        value={getValue('cdfData.loans.0.mi_upfront_amount') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdfData.loans.0.mi_upfront_amount"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">MI Percentage</label>
                    <input 
                      type="text" 
                      inputMode="decimal" 
                      value={getValue('cdfData.loans.0.mi_percentage') || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                      data-schema-key="cdfData.loans.0.mi_percentage"
                    />
                  </div>
                </section>

                {/* Lender Credits & Points Section */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Credits & Points</h3>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Discount Points</label>
                      <input 
                        type="text" 
                        inputMode="decimal" 
                        value={getValue('cdfData.loans.0.discount_points') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdfData.loans.0.discount_points"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Lender Credits</label>
                      <input 
                        type="text" 
                        inputMode="decimal" 
                        value={getValue('cdfData.loans.0.lender_credits') || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdfData.loans.0.lender_credits"
                      />
                    </div>
                  </div>
                </section>

                {/* Interest Section */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">Interest</h3>
                  
                  <div className="mb-5">
                    <ToggleSwitch 
                      checked={interestOnly}
                      onChange={setInterestOnly}
                      label="Interest Only"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Interest Rate</label>
                      <input 
                        type="text" 
                        value={getValue('cdfData.loans.0.interest_rate')}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500" 
                        data-schema-key="cdfData.loans.0.interest_rate"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Interest Type</label>
                      <select 
                        value={getValue('cdfData.loans.0.interest_type')}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500 appearance-none" 
                        data-schema-key="cdfData.loans.0.interest_type"
                      >
                        <option value="Fixed">Fixed</option>
                        <option value="Variable">Variable</option>
                      </select>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Bottom Section - Checkboxes */}
            <section className="border-t border-gray-600 pt-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <ToggleSwitch 
                    checked={isHeloc}
                    onChange={setIsHeloc}
                    label="HELOC"
                  />
                  <input type="hidden" data-schema-key="cdfData.loans.0.is_heloc" value={isHeloc.toString()} />
                  
                  <ToggleSwitch 
                    checked={isConstructionLoan}
                    onChange={setIsConstructionLoan}
                    label="Construction Loan"
                  />
                  <input type="hidden" data-schema-key="cdfData.loans.0.construction_loan" value={isConstructionLoan.toString()} />
                </div>
                
                <div className="space-y-4">
                  <ToggleSwitch 
                    checked={isMERS}
                    onChange={setIsMERS}
                    label="MERS"
                  />
                  
                  <ToggleSwitch 
                    checked={generatingMortgageDocs}
                    onChange={setGeneratingMortgageDocs}
                    label="Generating Mortgage Docs"
                  />
                </div>
              </div>
            </section>
            
            {/* Loan Calculations Display */}
            {loanCalculation && (
              <section className="border-t border-gray-600 pt-8">
                <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-gray-600">
                  <i className="fa fa-calculator mr-2 text-blue-500"></i>
                  Loan Calculations
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-4 rounded">
                    <label className="block text-sm text-gray-400 mb-1">Monthly Payment</label>
                    <div className="text-xl font-semibold text-white">{formatCurrency(loanCalculation.monthlyPayment)}</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <label className="block text-sm text-gray-400 mb-1">Total Interest</label>
                    <div className="text-xl font-semibold text-white">{formatCurrency(loanCalculation.totalInterest)}</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <label className="block text-sm text-gray-400 mb-1">Total Payments</label>
                    <div className="text-xl font-semibold text-white">{formatCurrency(loanCalculation.totalPayments)}</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <label className="block text-sm text-gray-400 mb-1">APR</label>
                    <div className="text-xl font-semibold text-white">{formatPercentage(loanCalculation.apr)}</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <label className="block text-sm text-gray-400 mb-1">Principal</label>
                    <div className="text-xl font-semibold text-white">{formatCurrency(loanCalculation.principal)}</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <label className="block text-sm text-gray-400 mb-1">Interest Rate</label>
                    <div className="text-xl font-semibold text-white">{formatPercentage(loanCalculation.interest)}</div>
                  </div>
                </div>
              </section>
            )}
          </form>
          )}
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

export default Loan;