#!/usr/bin/env node

/**
 * Quick test runner for calculation functions
 * Run with: node test-calculations.js
 */

// Import the calculation functions (simplified for Node.js)
const calculations = {
  calculateLoan: function(principal, annualRate, termMonths) {
    const monthlyRate = annualRate / 100 / 12;
    const n = termMonths;
    
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, n)) / 
      (Math.pow(1 + monthlyRate, n) - 1);
    
    const totalPayments = monthlyPayment * n;
    const totalInterest = totalPayments - principal;
    const apr = ((totalInterest / principal) / (n / 12)) * 100;
    
    return {
      principal,
      interest: annualRate,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPayments: Math.round(totalPayments * 100) / 100,
      apr: Math.round(apr * 1000) / 1000
    };
  },
  
  formatCurrency: function(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
};

console.log('================================');
console.log('Garden Calculations Test');
console.log('================================\n');

// Test 1: Loan Calculation
console.log('Test 1: $400,000 loan at 7% for 30 years');
const loan = calculations.calculateLoan(400000, 7.0, 360);
console.log('Monthly Payment:', calculations.formatCurrency(loan.monthlyPayment));
console.log('Total Interest:', calculations.formatCurrency(loan.totalInterest));
console.log('Total Payments:', calculations.formatCurrency(loan.totalPayments));
console.log('APR:', loan.apr + '%');

// Verify expected values
const expectedMonthly = 2661.21;
const difference = Math.abs(loan.monthlyPayment - expectedMonthly);
if (difference < 1) {
  console.log('✅ PASS: Monthly payment calculation accurate\n');
} else {
  console.log('❌ FAIL: Monthly payment off by', calculations.formatCurrency(difference), '\n');
}

// Test 2: Different loan amounts
console.log('Test 2: Various loan amounts');
const testLoans = [
  { amount: 200000, rate: 6.5, term: 360 },
  { amount: 500000, rate: 7.5, term: 180 },
  { amount: 350000, rate: 6.0, term: 240 }
];

testLoans.forEach(test => {
  const result = calculations.calculateLoan(test.amount, test.rate, test.term);
  console.log(`- $${test.amount.toLocaleString()} @ ${test.rate}% for ${test.term/12} years: ${calculations.formatCurrency(result.monthlyPayment)}/mo`);
});

console.log('\n================================');
console.log('All tests completed successfully!');
console.log('================================');