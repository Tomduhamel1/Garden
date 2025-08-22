import React, { useEffect, useState } from 'react';
import { useOrderData } from '../../hooks/useOrderData';
import { 
  calculateLoan, 
  calculateClosingCostSummary,
  calculateBorrowerProceeds,
  formatCurrency,
  formatPercentage,
  parseCurrency 
} from '../../utils/calculations';

interface CalculationSummaryProps {
  orderId?: string;
  compact?: boolean;
}

const CalculationSummary: React.FC<CalculationSummaryProps> = ({ orderId, compact = false }) => {
  const { orderData, loading } = useOrderData();
  const [calculations, setCalculations] = useState<any>({
    loan: null,
    closingCosts: null,
    proceeds: null
  });

  useEffect(() => {
    if (!orderData || loading) return;

    // Calculate loan details
    const loanAmount = parseCurrency(orderData.cdf_data?.loans?.[0]?.initial_loan_amount || '0');
    const interestRate = parseFloat(orderData.cdf_data?.loans?.[0]?.interest_rate || '0');
    const termYears = parseInt(orderData.cdf_data?.loans?.[0]?.loan_term_years || '0');
    const termMonths = parseInt(orderData.cdf_data?.loans?.[0]?.loan_term_months || '0');
    
    let loanCalc = null;
    if (loanAmount > 0 && interestRate > 0 && (termYears > 0 || termMonths > 0)) {
      const totalMonths = (termYears * 12) + termMonths;
      loanCalc = calculateLoan(loanAmount, interestRate, totalMonths);
    }

    // Calculate closing costs
    const closingCosts = calculateClosingCostSummary(orderData);
    
    // Calculate proceeds
    const proceeds = calculateBorrowerProceeds(orderData);

    setCalculations({
      loan: loanCalc,
      closingCosts,
      proceeds
    });
  }, [orderData, loading]);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-center">
          <i className="fa fa-spinner fa-spin text-gray-400"></i>
          <span className="ml-2 text-gray-400">Loading calculations...</span>
        </div>
      </div>
    );
  }

  if (compact) {
    // Compact view for dashboard
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center">
          <i className="fa fa-calculator mr-2 text-blue-500"></i>
          Financial Summary
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {calculations.loan && (
            <>
              <div>
                <div className="text-xs text-gray-400">Loan Amount</div>
                <div className="text-white font-semibold">{formatCurrency(calculations.loan.principal)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Monthly Payment</div>
                <div className="text-white font-semibold">{formatCurrency(calculations.loan.monthlyPayment)}</div>
              </div>
            </>
          )}
          <div>
            <div className="text-xs text-gray-400">Closing Costs</div>
            <div className="text-white font-semibold">{formatCurrency(calculations.closingCosts?.totalClosingCosts || 0)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Cash to Close</div>
            <div className="text-white font-semibold">{formatCurrency(calculations.closingCosts?.cashToClose || 0)}</div>
          </div>
        </div>
      </div>
    );
  }

  // Full view
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <i className="fa fa-calculator mr-3 text-blue-500"></i>
        Calculation Summary
      </h2>

      {/* Loan Calculations */}
      {calculations.loan && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-3 border-b border-gray-700 pb-2">
            Loan Details
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-700 p-3 rounded">
              <div className="text-xs text-gray-400 mb-1">Principal</div>
              <div className="text-lg font-semibold text-white">{formatCurrency(calculations.loan.principal)}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="text-xs text-gray-400 mb-1">Interest Rate</div>
              <div className="text-lg font-semibold text-white">{formatPercentage(calculations.loan.interest)}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="text-xs text-gray-400 mb-1">Monthly Payment</div>
              <div className="text-lg font-semibold text-white">{formatCurrency(calculations.loan.monthlyPayment)}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="text-xs text-gray-400 mb-1">Total Interest</div>
              <div className="text-lg font-semibold text-white">{formatCurrency(calculations.loan.totalInterest)}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="text-xs text-gray-400 mb-1">Total Payments</div>
              <div className="text-lg font-semibold text-white">{formatCurrency(calculations.loan.totalPayments)}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="text-xs text-gray-400 mb-1">APR</div>
              <div className="text-lg font-semibold text-white">{formatPercentage(calculations.loan.apr)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Closing Costs */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-3 border-b border-gray-700 pb-2">
          Closing Costs Breakdown
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 p-3 rounded">
            <div className="text-xs text-gray-400 mb-1">Loan Costs</div>
            <div className="text-lg font-semibold text-white">{formatCurrency(calculations.closingCosts?.loanCosts || 0)}</div>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <div className="text-xs text-gray-400 mb-1">Other Costs</div>
            <div className="text-lg font-semibold text-white">{formatCurrency(calculations.closingCosts?.otherCosts || 0)}</div>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <div className="text-xs text-gray-400 mb-1">Lender Credits</div>
            <div className="text-lg font-semibold text-green-400">-{formatCurrency(calculations.closingCosts?.lenderCredits || 0)}</div>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <div className="text-xs text-gray-400 mb-1">Seller Credits</div>
            <div className="text-lg font-semibold text-green-400">-{formatCurrency(calculations.closingCosts?.sellerCredits || 0)}</div>
          </div>
        </div>
        <div className="mt-4 bg-blue-900 p-4 rounded">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">Total Closing Costs</span>
            <span className="text-2xl font-bold text-white">{formatCurrency(calculations.closingCosts?.totalClosingCosts || 0)}</span>
          </div>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-blue-800">
            <span className="text-white font-medium">Cash to Close</span>
            <span className="text-2xl font-bold text-yellow-400">{formatCurrency(calculations.closingCosts?.cashToClose || 0)}</span>
          </div>
        </div>
      </div>

      {/* Proceeds */}
      <div>
        <h3 className="text-lg font-medium text-white mb-3 border-b border-gray-700 pb-2">
          Borrower Proceeds
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-700 p-3 rounded">
            <div className="text-xs text-gray-400 mb-1">Gross Amount</div>
            <div className="text-lg font-semibold text-white">{formatCurrency(calculations.proceeds?.grossAmount || 0)}</div>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <div className="text-xs text-gray-400 mb-1">Deductions</div>
            <div className="text-lg font-semibold text-red-400">-{formatCurrency(calculations.proceeds?.deductions || 0)}</div>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <div className="text-xs text-gray-400 mb-1">Credits</div>
            <div className="text-lg font-semibold text-green-400">+{formatCurrency(calculations.proceeds?.credits || 0)}</div>
          </div>
        </div>
        {calculations.proceeds && (
          <div className="mt-4 bg-green-900 p-4 rounded">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Net Proceeds</span>
              <span className="text-2xl font-bold text-green-400">{formatCurrency(calculations.proceeds.netProceeds)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculationSummary;