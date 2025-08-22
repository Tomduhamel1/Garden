/**
 * Tests for Garden Calculations Engine
 * Verifies all financial calculations are accurate
 */

import {
  calculateLoan,
  calculateTaxProration,
  calculateEarnestAndCommission,
  calculateMonthlyEscrow,
  formatCurrency,
  formatPercentage,
  parseCurrency,
  validateCalculationInputs
} from './calculations';

// Test Loan Calculations
function testLoanCalculations() {
  console.log('Testing Loan Calculations...');
  
  // Test case: $400,000 loan at 7% for 30 years
  const loanResult = calculateLoan(400000, 7.0, 360);
  
  console.log('Loan Amount:', formatCurrency(loanResult.principal));
  console.log('Interest Rate:', formatPercentage(loanResult.interest));
  console.log('Monthly Payment:', formatCurrency(loanResult.monthlyPayment));
  console.log('Total Interest:', formatCurrency(loanResult.totalInterest));
  console.log('Total Payments:', formatCurrency(loanResult.totalPayments));
  console.log('APR:', formatPercentage(loanResult.apr));
  
  // Expected monthly payment should be around $2,661.21
  const expectedMonthly = 2661.21;
  const difference = Math.abs(loanResult.monthlyPayment - expectedMonthly);
  console.log(`✓ Monthly payment calculation accurate within $${difference.toFixed(2)}`);
  
  return difference < 1; // Allow $1 difference for rounding
}

// Test Tax Proration Calculations
function testTaxProration() {
  console.log('\nTesting Tax Proration...');
  
  // Test case: $12,000 annual taxes, closing on June 1st
  const closingDate = new Date('2025-06-01');
  const taxYear = 2025;
  const annualTax = 12000;
  
  const prorationResult = calculateTaxProration(
    annualTax,
    closingDate,
    taxYear,
    undefined,
    'daily'
  );
  
  console.log('Annual Tax:', formatCurrency(annualTax));
  console.log('Daily Rate:', formatCurrency(prorationResult.dailyRate));
  console.log('Days Owed:', prorationResult.daysOwed);
  console.log('Proration Amount:', formatCurrency(prorationResult.prorationAmount));
  console.log('Buyer Debit:', formatCurrency(prorationResult.buyerDebit));
  console.log('Seller Credit:', formatCurrency(prorationResult.sellerCredit));
  
  // Expected: ~151 days from Jan 1 to June 1
  const expectedDays = 151;
  const daysDifference = Math.abs(prorationResult.daysOwed - expectedDays);
  console.log(`✓ Days calculation accurate within ${daysDifference} days`);
  
  return daysDifference <= 1;
}

// Test Earnest Money and Commission
function testEarnestAndCommission() {
  console.log('\nTesting Earnest Money & Commission...');
  
  // Test case: $500,000 sale price, 1% earnest, 6% commission
  const salePrice = 500000;
  const result = calculateEarnestAndCommission(salePrice, 1, 6, { listing: 50, selling: 50 });
  
  console.log('Sale Price:', formatCurrency(salePrice));
  console.log('Earnest Money (1%):', formatCurrency(result.earnestMoney));
  console.log('Total Commission (6%):', formatCurrency(result.totalCommission));
  console.log('Listing Agent (50%):', formatCurrency(result.listingCommission));
  console.log('Selling Agent (50%):', formatCurrency(result.sellingCommission));
  
  // Verify calculations
  const expectedEarnest = 5000;
  const expectedCommission = 30000;
  const earnestCorrect = Math.abs(result.earnestMoney - expectedEarnest) < 1;
  const commissionCorrect = Math.abs(result.totalCommission - expectedCommission) < 1;
  
  console.log(`✓ Earnest money calculation: ${earnestCorrect ? 'PASS' : 'FAIL'}`);
  console.log(`✓ Commission calculation: ${commissionCorrect ? 'PASS' : 'FAIL'}`);
  
  return earnestCorrect && commissionCorrect;
}

// Test Monthly Escrow Calculations
function testMonthlyEscrow() {
  console.log('\nTesting Monthly Escrow...');
  
  // Test case: $3,600 annual tax, $1,200 insurance, $600 MI
  const result = calculateMonthlyEscrow(3600, 1200, 600, 2);
  
  console.log('Annual Property Tax:', formatCurrency(3600));
  console.log('Annual Insurance:', formatCurrency(1200));
  console.log('Annual MI:', formatCurrency(600));
  console.log('Monthly Tax:', formatCurrency(result.monthlyTax));
  console.log('Monthly Insurance:', formatCurrency(result.monthlyInsurance));
  console.log('Monthly MI:', formatCurrency(result.monthlyMI));
  console.log('Total Monthly Escrow:', formatCurrency(result.monthlyEscrow));
  console.log('Annual Total:', formatCurrency(result.annualTotal));
  console.log('Cushion (2 months):', formatCurrency(result.cushionAmount));
  
  // Verify calculations
  const expectedMonthly = 450; // (3600 + 1200 + 600) / 12
  const monthlyCorrect = Math.abs(result.monthlyEscrow - expectedMonthly) < 1;
  
  console.log(`✓ Monthly escrow calculation: ${monthlyCorrect ? 'PASS' : 'FAIL'}`);
  
  return monthlyCorrect;
}

// Test Input Validation
function testValidation() {
  console.log('\nTesting Input Validation...');
  
  // Test valid inputs
  const valid = validateCalculationInputs({
    principal: 400000,
    rate: 7.0,
    term: 360
  });
  console.log('Valid inputs:', valid.valid ? 'PASS' : 'FAIL');
  
  // Test invalid inputs
  const invalid = validateCalculationInputs({
    principal: -100000,
    rate: 50,
    term: 600
  });
  console.log('Invalid inputs detected:', !invalid.valid ? 'PASS' : 'FAIL');
  console.log('Errors found:', invalid.errors.length);
  invalid.errors.forEach(err => console.log(`  - ${err}`));
  
  return valid.valid && !invalid.valid;
}

// Test Currency Formatting
function testFormatting() {
  console.log('\nTesting Currency Formatting...');
  
  const testAmount = 1234567.89;
  const formatted = formatCurrency(testAmount);
  console.log(`Format ${testAmount}:`, formatted);
  
  const parsed = parseCurrency(formatted);
  console.log(`Parse back:`, parsed);
  
  const correct = Math.abs(parsed - testAmount) < 0.01;
  console.log(`✓ Currency formatting/parsing: ${correct ? 'PASS' : 'FAIL'}`);
  
  return correct;
}

// Run all tests
export function runAllTests() {
  console.log('================================');
  console.log('Garden Calculations Test Suite');
  console.log('================================');
  
  const tests = [
    { name: 'Loan Calculations', fn: testLoanCalculations },
    { name: 'Tax Proration', fn: testTaxProration },
    { name: 'Earnest & Commission', fn: testEarnestAndCommission },
    { name: 'Monthly Escrow', fn: testMonthlyEscrow },
    { name: 'Input Validation', fn: testValidation },
    { name: 'Currency Formatting', fn: testFormatting }
  ];
  
  let passed = 0;
  let failed = 0;
  
  tests.forEach(test => {
    try {
      const result = test.fn();
      if (result) {
        passed++;
        console.log(`\n✅ ${test.name}: PASSED`);
      } else {
        failed++;
        console.log(`\n❌ ${test.name}: FAILED`);
      }
    } catch (error) {
      failed++;
      console.log(`\n❌ ${test.name}: ERROR - ${error}`);
    }
  });
  
  console.log('\n================================');
  console.log(`Test Results: ${passed} passed, ${failed} failed`);
  console.log('================================');
  
  return failed === 0;
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testCalculations = runAllTests;
}