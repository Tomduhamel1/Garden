/**
 * Tests for Garden Calculations Engine
 * Verifies all financial calculations are accurate
 */

import { describe, it, expect } from 'vitest'
import {
  calculateLoan,
  calculateTaxProration,
  calculateEarnestAndCommission,
  calculateMonthlyEscrow,
  formatCurrency,
  formatPercentage,
  parseCurrency,
  validateCalculationInputs
} from './calculations'

describe('Loan Calculations', () => {
  describe('calculateLoan', () => {
    it('calculates correct monthly payment for typical loan', () => {
      // Test case: $400,000 loan at 7% for 30 years
      const loanResult = calculateLoan(400000, 7.0, 360)
      
      expect(loanResult.principal).toBe(400000)
      expect(loanResult.interest).toBe(7.0)
      expect(loanResult.monthlyPayment).toBeCloseTo(2661.21, 0) // Within $1
      expect(loanResult.totalInterest).toBeGreaterThan(0)
      expect(loanResult.totalPayments).toBeGreaterThan(loanResult.principal)
    })

    it('calculates PMI when down payment is less than 20%', () => {
      const result = calculateLoan(400000, 7.0, 360, {
        pmiRate: 0.5,
        downPaymentPercent: 10
      })
      
      expect(result.pmi).toBeCloseTo(2000, 2)
      expect(result.monthlyPmi).toBeCloseTo(166.67, 2)
    })

    it('does not calculate PMI when down payment is 20% or more', () => {
      const result = calculateLoan(400000, 7.0, 360, {
        pmiRate: 0.5,
        downPaymentPercent: 20
      })
      
      expect(result.pmi).toBe(0)
      expect(result.monthlyPmi).toBe(0)
    })

    it('generates amortization schedule when requested', () => {
      const result = calculateLoan(400000, 7.0, 360, {
        includeAmortization: true
      })
      
      expect(result.amortizationSchedule).toBeDefined()
      expect(result.amortizationSchedule).toHaveLength(360)
      expect(result.amortizationSchedule![0].month).toBe(1)
      expect(result.amortizationSchedule![359].month).toBe(360)
    })
  })
})

describe('Tax Proration Calculations', () => {
  describe('calculateTaxProration', () => {
    it('calculates daily proration correctly', () => {
      // Test case: $12,000 annual taxes, closing on June 1st
      const closingDate = new Date('2025-06-01')
      const taxYear = 2025
      const annualTax = 12000
      
      const result = calculateTaxProration(annualTax, closingDate, taxYear, undefined, 'daily')
      
      expect(result.dailyRate).toBeCloseTo(32.88, 2) // 12000 / 365
      expect(result.daysOwed).toBeCloseTo(150, 1) // ~Jan 1 to June 1
      expect(result.prorationAmount).toBeGreaterThan(4900)
      expect(result.buyerDebit).toBeGreaterThan(0)
    })

    it('calculates 30-day proration correctly', () => {
      const closingDate = new Date('2025-06-01')
      const result = calculateTaxProration(12000, closingDate, 2025, undefined, '30day')
      
      expect(result.dailyRate).toBeCloseTo(33.33, 2) // 12000 / 360
      expect(result.daysOwed).toBe(151) // 5 * 30 + 1
    })

    it('handles prepaid taxes correctly', () => {
      const closingDate = new Date('2025-06-01')
      const paidThrough = new Date('2025-12-31')
      const result = calculateTaxProration(12000, closingDate, 2025, paidThrough, 'daily')
      
      expect(result.sellerCredit).toBeGreaterThan(0)
      expect(result.buyerDebit).toEqual(result.sellerCredit)
    })
  })
})

describe('Earnest Money and Commission Calculations', () => {
  describe('calculateEarnestAndCommission', () => {
    it('calculates earnest money and commission correctly', () => {
      // Test case: $500,000 sale price, 1% earnest, 6% commission
      const result = calculateEarnestAndCommission(500000, 1, 6, { listing: 50, selling: 50 })
      
      expect(result.earnestMoney).toBe(5000) // 500000 * 0.01
      expect(result.totalCommission).toBe(30000) // 500000 * 0.06
      expect(result.listingCommission).toBe(15000) // 50% split
      expect(result.sellingCommission).toBe(15000) // 50% split
    })

    it('handles custom commission splits', () => {
      const result = calculateEarnestAndCommission(500000, 1, 6, { listing: 60, selling: 40 })
      
      expect(result.listingCommission).toBe(18000) // 60% of 30000
      expect(result.sellingCommission).toBe(12000) // 40% of 30000
    })

    it('uses default values when not specified', () => {
      const result = calculateEarnestAndCommission(500000)
      
      expect(result.earnestMoney).toBe(5000) // 1% default
      expect(result.totalCommission).toBe(30000) // 6% default
    })
  })
})

describe('Monthly Escrow Calculations', () => {
  describe('calculateMonthlyEscrow', () => {
    it('calculates monthly escrow correctly', () => {
      // Test case: $3,600 annual tax, $1,200 insurance, $600 MI
      const result = calculateMonthlyEscrow(3600, 1200, 600, 2)
      
      expect(result.monthlyTax).toBe(300) // 3600 / 12
      expect(result.monthlyInsurance).toBe(100) // 1200 / 12
      expect(result.monthlyMI).toBe(50) // 600 / 12
      expect(result.monthlyEscrow).toBe(450) // 300 + 100 + 50
      expect(result.annualTotal).toBe(5400) // 450 * 12
      expect(result.cushionAmount).toBe(900) // 450 * 2
    })

    it('handles zero mortgage insurance', () => {
      const result = calculateMonthlyEscrow(3600, 1200, 0, 2)
      
      expect(result.monthlyMI).toBe(0)
      expect(result.monthlyEscrow).toBe(400) // 300 + 100
    })
  })
})

describe('Input Validation', () => {
  describe('validateCalculationInputs', () => {
    it('validates correct inputs', () => {
      const result = validateCalculationInputs({
        principal: 400000,
        rate: 7.0,
        term: 360
      })
      
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('rejects invalid principal', () => {
      const result = validateCalculationInputs({
        principal: -100000
      })
      
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Principal must be greater than 0')
    })

    it('rejects excessive values', () => {
      const result = validateCalculationInputs({
        principal: 20000000,
        rate: 50,
        term: 600
      })
      
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })
  })
})

describe('Currency Formatting', () => {
  describe('formatCurrency', () => {
    it('formats positive amounts correctly', () => {
      expect(formatCurrency(1234567.89)).toBe('$1,234,567.89')
      expect(formatCurrency(1000000)).toBe('$1,000,000.00')
      expect(formatCurrency(0)).toBe('$0.00')
    })

    it('formats negative amounts correctly', () => {
      expect(formatCurrency(-1234.56)).toBe('-$1,234.56')
    })
  })

  describe('formatPercentage', () => {
    it('formats percentages with default decimals', () => {
      expect(formatPercentage(7.125)).toBe('7.125%')
    })

    it('formats percentages with custom decimals', () => {
      expect(formatPercentage(7.125, 2)).toBe('7.13%')
      expect(formatPercentage(7.125, 0)).toBe('7%')
    })
  })

  describe('parseCurrency', () => {
    it('parses currency strings correctly', () => {
      expect(parseCurrency('$1,234,567.89')).toBe(1234567.89)
      expect(parseCurrency('1234.56')).toBe(1234.56)
    })

    it('handles invalid inputs', () => {
      expect(parseCurrency('')).toBe(0)
      expect(parseCurrency('abc')).toBe(0)
      expect(parseCurrency('$')).toBe(0)
    })

    it('round-trip formatting works', () => {
      const original = 1234567.89
      const formatted = formatCurrency(original)
      const parsed = parseCurrency(formatted)
      
      expect(Math.abs(parsed - original)).toBeLessThan(0.01)
    })
  })
})