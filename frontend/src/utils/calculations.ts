/**
 * Garden Calculations Engine
 * Core financial calculations for real estate closing transactions
 */

import type { OrderData } from '../types/schema';

export interface LoanCalculationResult {
  principal: number;
  interest: number;
  monthlyPayment: number;
  totalInterest: number;
  apr: number;
  pmi: number;
  monthlyPmi: number;
  totalPayments: number;
  amortizationSchedule?: AmortizationEntry[];
}

export interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface TaxProrationResult {
  dailyRate: number;
  daysOwed: number;
  prorationAmount: number;
  sellerCredit: number;
  buyerDebit: number;
  prorationDate: string;
}

export interface ProceedsCalculation {
  grossAmount: number;
  deductions: number;
  credits: number;
  netProceeds: number;
  wireAmount: number;
  checkAmount: number;
}

export interface ClosingCostSummary {
  loanCosts: number;
  otherCosts: number;
  lenderCredits: number;
  sellerCredits: number;
  adjustments: number;
  totalClosingCosts: number;
  cashToClose: number;
}

/**
 * Calculate loan details including monthly payment, interest, and APR
 */
export function calculateLoan(
  principal: number,
  annualRate: number,
  termMonths: number,
  options?: {
    pmiRate?: number;
    downPaymentPercent?: number;
    includeAmortization?: boolean;
  }
): LoanCalculationResult {
  const monthlyRate = annualRate / 100 / 12;
  const n = termMonths;
  
  // Calculate monthly payment using amortization formula
  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, n)) / 
    (Math.pow(1 + monthlyRate, n) - 1);
  
  // Calculate total interest
  const totalPayments = monthlyPayment * n;
  const totalInterest = totalPayments - principal;
  
  // Calculate PMI if applicable
  let pmi = 0;
  let monthlyPmi = 0;
  if (options?.pmiRate && options?.downPaymentPercent && options.downPaymentPercent < 20) {
    pmi = principal * (options.pmiRate / 100);
    monthlyPmi = pmi / 12;
  }
  
  // Calculate APR (simplified - actual APR calculation is more complex)
  const totalFinanceCharge = totalInterest + (monthlyPmi * n);
  const apr = ((totalFinanceCharge / principal) / (n / 12)) * 100;
  
  // Generate amortization schedule if requested
  let amortizationSchedule: AmortizationEntry[] | undefined;
  if (options?.includeAmortization) {
    amortizationSchedule = [];
    let balance = principal;
    
    for (let month = 1; month <= n; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      amortizationSchedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }
  }
  
  return {
    principal,
    interest: annualRate,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    apr: Math.round(apr * 1000) / 1000,
    pmi,
    monthlyPmi: Math.round(monthlyPmi * 100) / 100,
    totalPayments: Math.round(totalPayments * 100) / 100,
    amortizationSchedule
  };
}

/**
 * Calculate tax proration between buyer and seller
 */
export function calculateTaxProration(
  annualTaxAmount: number,
  closingDate: Date,
  taxYear: number,
  paidThrough?: Date,
  method: 'daily' | '30day' = 'daily'
): TaxProrationResult {
  const yearStart = new Date(taxYear, 0, 1);
  const daysInYear = method === 'daily' ? 365 : 360;
  
  // Calculate daily rate
  const dailyRate = annualTaxAmount / daysInYear;
  
  // Calculate days owed by seller
  let daysOwed: number;
  if (method === 'daily') {
    const msPerDay = 24 * 60 * 60 * 1000;
    daysOwed = Math.floor((closingDate.getTime() - yearStart.getTime()) / msPerDay);
  } else {
    // 30-day month method
    const startMonth = yearStart.getMonth();
    const closingMonth = closingDate.getMonth();
    const closingDay = closingDate.getDate();
    daysOwed = (closingMonth - startMonth) * 30 + closingDay;
  }
  
  // Calculate proration amount
  const prorationAmount = dailyRate * daysOwed;
  
  // Determine credits and debits
  let sellerCredit = 0;
  let buyerDebit = 0;
  
  if (paidThrough && paidThrough > closingDate) {
    // Taxes are paid in advance - buyer owes seller
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysOverpaid = Math.floor((paidThrough.getTime() - closingDate.getTime()) / msPerDay);
    sellerCredit = dailyRate * daysOverpaid;
    buyerDebit = sellerCredit;
  } else {
    // Taxes are paid in arrears - seller owes buyer
    sellerCredit = 0;
    buyerDebit = prorationAmount;
  }
  
  return {
    dailyRate: Math.round(dailyRate * 100) / 100,
    daysOwed,
    prorationAmount: Math.round(prorationAmount * 100) / 100,
    sellerCredit: Math.round(sellerCredit * 100) / 100,
    buyerDebit: Math.round(buyerDebit * 100) / 100,
    prorationDate: closingDate.toISOString().split('T')[0]
  };
}

/**
 * Calculate borrower proceeds at closing
 */
export function calculateBorrowerProceeds(order: OrderData): ProceedsCalculation {
  const cdf = order.cdf_data || {};
  
  // Get loan amount
  const loanAmount = parseFloat(cdf.loan?.amount || '0');
  
  // Calculate total deductions (closing costs)
  let deductions = 0;
  
  // Add origination charges
  for (let i = 1; i <= 8; i++) {
    const line = String(i).padStart(2, '0');
    deductions += parseFloat(cdf.origination_charges?.[`line_${line}`]?.amount || '0');
  }
  
  // Add services borrower did not shop for
  for (let i = 1; i <= 13; i++) {
    const line = String(i).padStart(2, '0');
    deductions += parseFloat(cdf.did_not_shop_for?.[`line_${line}`]?.amount || '0');
  }
  
  // Add services borrower did shop for
  for (let i = 1; i <= 10; i++) {
    const line = String(i).padStart(2, '0');
    deductions += parseFloat(cdf.did_shop_for?.[`line_${line}`]?.amount || '0');
  }
  
  // Add taxes and government fees
  deductions += parseFloat(cdf.taxes_and_fees?.recording_fees || '0');
  deductions += parseFloat(cdf.taxes_and_fees?.transfer_taxes || '0');
  
  // Add prepaids
  deductions += parseFloat(cdf.prepaids?.homeowners_insurance || '0');
  deductions += parseFloat(cdf.prepaids?.mortgage_insurance || '0');
  deductions += parseFloat(cdf.prepaids?.prepaid_interest || '0');
  deductions += parseFloat(cdf.prepaids?.property_taxes || '0');
  
  // Add initial escrow payment
  deductions += parseFloat(cdf.escrow?.initial_payment || '0');
  
  // Add other charges
  for (let i = 1; i <= 6; i++) {
    const line = String(i).padStart(2, '0');
    deductions += parseFloat(cdf.other_charges?.[`line_${line}`]?.amount || '0');
  }
  
  // Calculate credits
  let credits = 0;
  credits += parseFloat(cdf.closing_costs?.lender_credits || '0');
  credits += parseFloat(cdf.closing_costs?.seller_credits || '0');
  
  // Calculate net proceeds
  const grossAmount = loanAmount;
  const netProceeds = grossAmount - deductions + credits;
  
  // Determine payment method (simplified)
  const wireAmount = netProceeds > 50000 ? netProceeds : 0;
  const checkAmount = netProceeds <= 50000 ? netProceeds : 0;
  
  return {
    grossAmount: Math.round(grossAmount * 100) / 100,
    deductions: Math.round(deductions * 100) / 100,
    credits: Math.round(credits * 100) / 100,
    netProceeds: Math.round(netProceeds * 100) / 100,
    wireAmount: Math.round(wireAmount * 100) / 100,
    checkAmount: Math.round(checkAmount * 100) / 100
  };
}

/**
 * Calculate seller proceeds at closing
 */
export function calculateSellerProceeds(order: OrderData): ProceedsCalculation {
  const cdf = order.cdf_data || {};
  const properties = order.properties_data || {};
  
  // Get sale price
  const salePrice = parseFloat(properties.sale_price || '0');
  
  // Calculate deductions
  let deductions = 0;
  
  // Add existing loan payoffs
  const payoffs = order.payoffs_data || {};
  for (let i = 0; i < 4; i++) {
    deductions += parseFloat(payoffs[i]?.payoff_amount || '0');
  }
  
  // Add seller's closing costs
  deductions += parseFloat(cdf.seller_costs?.title_insurance || '0');
  deductions += parseFloat(cdf.seller_costs?.commission || '0');
  deductions += parseFloat(cdf.seller_costs?.transfer_taxes || '0');
  
  // Calculate credits from buyer
  let credits = 0;
  credits += parseFloat(cdf.adjustments?.earnest_money || '0');
  
  // Calculate net proceeds
  const grossAmount = salePrice;
  const netProceeds = grossAmount - deductions + credits;
  
  // Determine payment method
  const wireAmount = netProceeds > 10000 ? netProceeds : 0;
  const checkAmount = netProceeds <= 10000 ? netProceeds : 0;
  
  return {
    grossAmount: Math.round(grossAmount * 100) / 100,
    deductions: Math.round(deductions * 100) / 100,
    credits: Math.round(credits * 100) / 100,
    netProceeds: Math.round(netProceeds * 100) / 100,
    wireAmount: Math.round(wireAmount * 100) / 100,
    checkAmount: Math.round(checkAmount * 100) / 100
  };
}

/**
 * Calculate earnest money and commission
 */
export function calculateEarnestAndCommission(
  salePrice: number,
  earnestMoneyPercent: number = 1,
  commissionPercent: number = 6,
  commissionSplit?: { listing: number; selling: number }
): {
  earnestMoney: number;
  totalCommission: number;
  listingCommission: number;
  sellingCommission: number;
} {
  const earnestMoney = salePrice * (earnestMoneyPercent / 100);
  const totalCommission = salePrice * (commissionPercent / 100);
  
  const split = commissionSplit || { listing: 50, selling: 50 };
  const listingCommission = totalCommission * (split.listing / 100);
  const sellingCommission = totalCommission * (split.selling / 100);
  
  return {
    earnestMoney: Math.round(earnestMoney * 100) / 100,
    totalCommission: Math.round(totalCommission * 100) / 100,
    listingCommission: Math.round(listingCommission * 100) / 100,
    sellingCommission: Math.round(sellingCommission * 100) / 100
  };
}

/**
 * Calculate total closing costs summary
 */
export function calculateClosingCostSummary(order: OrderData): ClosingCostSummary {
  const cdf = order.cdf_data || {};
  
  // Calculate loan costs (Sections A, B, C)
  let loanCosts = 0;
  
  // Section A - Origination
  for (let i = 1; i <= 8; i++) {
    const line = String(i).padStart(2, '0');
    loanCosts += parseFloat(cdf.origination_charges?.[`line_${line}`]?.amount || '0');
  }
  
  // Section B - Cannot Shop
  for (let i = 1; i <= 13; i++) {
    const line = String(i).padStart(2, '0');
    loanCosts += parseFloat(cdf.did_not_shop_for?.[`line_${line}`]?.amount || '0');
  }
  
  // Section C - Can Shop
  for (let i = 1; i <= 10; i++) {
    const line = String(i).padStart(2, '0');
    loanCosts += parseFloat(cdf.did_shop_for?.[`line_${line}`]?.amount || '0');
  }
  
  // Calculate other costs (Sections E, F, G, H)
  let otherCosts = 0;
  
  // Section E - Taxes
  otherCosts += parseFloat(cdf.taxes_and_fees?.recording_fees || '0');
  otherCosts += parseFloat(cdf.taxes_and_fees?.transfer_taxes || '0');
  
  // Section F - Prepaids
  otherCosts += parseFloat(cdf.prepaids?.homeowners_insurance || '0');
  otherCosts += parseFloat(cdf.prepaids?.mortgage_insurance || '0');
  otherCosts += parseFloat(cdf.prepaids?.prepaid_interest || '0');
  otherCosts += parseFloat(cdf.prepaids?.property_taxes || '0');
  
  // Section G - Escrow
  otherCosts += parseFloat(cdf.escrow?.initial_payment || '0');
  
  // Section H - Other
  for (let i = 1; i <= 6; i++) {
    const line = String(i).padStart(2, '0');
    otherCosts += parseFloat(cdf.other_charges?.[`line_${line}`]?.amount || '0');
  }
  
  // Get credits
  const lenderCredits = parseFloat(cdf.closing_costs?.lender_credits || '0');
  const sellerCredits = parseFloat(cdf.closing_costs?.seller_credits || '0');
  
  // Calculate adjustments
  const adjustments = parseFloat(cdf.adjustments?.total || '0');
  
  // Calculate totals
  const totalClosingCosts = loanCosts + otherCosts - lenderCredits - sellerCredits;
  const cashToClose = totalClosingCosts + adjustments;
  
  return {
    loanCosts: Math.round(loanCosts * 100) / 100,
    otherCosts: Math.round(otherCosts * 100) / 100,
    lenderCredits: Math.round(lenderCredits * 100) / 100,
    sellerCredits: Math.round(sellerCredits * 100) / 100,
    adjustments: Math.round(adjustments * 100) / 100,
    totalClosingCosts: Math.round(totalClosingCosts * 100) / 100,
    cashToClose: Math.round(cashToClose * 100) / 100
  };
}

/**
 * Calculate monthly escrow payment
 */
export function calculateMonthlyEscrow(
  annualPropertyTax: number,
  annualHomeownersInsurance: number,
  annualMortgageInsurance: number = 0,
  cushionMonths: number = 2
): {
  monthlyEscrow: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyMI: number;
  annualTotal: number;
  cushionAmount: number;
} {
  const monthlyTax = annualPropertyTax / 12;
  const monthlyInsurance = annualHomeownersInsurance / 12;
  const monthlyMI = annualMortgageInsurance / 12;
  
  const monthlyEscrow = monthlyTax + monthlyInsurance + monthlyMI;
  const annualTotal = monthlyEscrow * 12;
  const cushionAmount = monthlyEscrow * cushionMonths;
  
  return {
    monthlyEscrow: Math.round(monthlyEscrow * 100) / 100,
    monthlyTax: Math.round(monthlyTax * 100) / 100,
    monthlyInsurance: Math.round(monthlyInsurance * 100) / 100,
    monthlyMI: Math.round(monthlyMI * 100) / 100,
    annualTotal: Math.round(annualTotal * 100) / 100,
    cushionAmount: Math.round(cushionAmount * 100) / 100
  };
}

/**
 * Validate calculation inputs
 */
export function validateCalculationInputs(inputs: {
  principal?: number;
  rate?: number;
  term?: number;
  [key: string]: any;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (inputs.principal !== undefined) {
    if (inputs.principal <= 0) errors.push('Principal must be greater than 0');
    if (inputs.principal > 10000000) errors.push('Principal exceeds maximum limit');
  }
  
  if (inputs.rate !== undefined) {
    if (inputs.rate < 0) errors.push('Interest rate cannot be negative');
    if (inputs.rate > 30) errors.push('Interest rate exceeds maximum limit');
  }
  
  if (inputs.term !== undefined) {
    if (inputs.term <= 0) errors.push('Term must be greater than 0');
    if (inputs.term > 480) errors.push('Term exceeds maximum limit (40 years)');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number, decimals: number = 3): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[$,]/g, '');
  return parseFloat(cleaned) || 0;
}