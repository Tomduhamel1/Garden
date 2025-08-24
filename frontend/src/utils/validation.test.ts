import { describe, it, expect } from 'vitest'

// Simple validation functions for testing
export const validateRequired = (value: string): boolean => {
  return value !== undefined && value !== null && value.trim() !== ''
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{9,15}$/
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  return phoneRegex.test(cleaned) && cleaned.length >= 10
}

export const validateCurrency = (amount: string): boolean => {
  const currencyRegex = /^\d+(\.\d{1,2})?$/
  const cleaned = amount.replace(/[$,]/g, '')
  return currencyRegex.test(cleaned)
}

export const validateZipCode = (zip: string): boolean => {
  const zipRegex = /^\d{5}(-\d{4})?$/
  return zipRegex.test(zip)
}

export const validateDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(date)) return false
  
  const parsedDate = new Date(date)
  return !isNaN(parsedDate.getTime())
}

describe('Form Validation Functions', () => {
  describe('validateRequired', () => {
    it('should return true for valid non-empty strings', () => {
      expect(validateRequired('test')).toBe(true)
      expect(validateRequired('123')).toBe(true)
      expect(validateRequired(' valid ')).toBe(true)
    })

    it('should return false for empty or invalid values', () => {
      expect(validateRequired('')).toBe(false)
      expect(validateRequired('   ')).toBe(false)
      expect(validateRequired(null as any)).toBe(false)
      expect(validateRequired(undefined as any)).toBe(false)
    })
  })

  describe('validateEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
      expect(validateEmail('admin@test-domain.org')).toBe(true)
    })

    it('should return false for invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@domain.com')).toBe(false)
      expect(validateEmail('test.domain.com')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('validatePhoneNumber', () => {
    it('should return true for valid phone numbers', () => {
      expect(validatePhoneNumber('1234567890')).toBe(true)
      expect(validatePhoneNumber('+1234567890')).toBe(true)
      expect(validatePhoneNumber('123-456-7890')).toBe(true)
      expect(validatePhoneNumber('(123) 456-7890')).toBe(true)
      expect(validatePhoneNumber('123.456.7890')).toBe(true)
    })

    it('should return false for invalid phone numbers', () => {
      expect(validatePhoneNumber('123')).toBe(false)
      expect(validatePhoneNumber('abc123')).toBe(false)
      expect(validatePhoneNumber('')).toBe(false)
      expect(validatePhoneNumber('0123456789')).toBe(false) // starts with 0
    })
  })

  describe('validateCurrency', () => {
    it('should return true for valid currency amounts', () => {
      expect(validateCurrency('123')).toBe(true)
      expect(validateCurrency('123.45')).toBe(true)
      expect(validateCurrency('0.99')).toBe(true)
      expect(validateCurrency('$123.45')).toBe(true)
      expect(validateCurrency('1,234.56')).toBe(true)
    })

    it('should return false for invalid currency amounts', () => {
      expect(validateCurrency('123.456')).toBe(false) // too many decimals
      expect(validateCurrency('abc')).toBe(false)
      expect(validateCurrency('')).toBe(false)
      expect(validateCurrency('123.')).toBe(false) // no decimal digits
    })
  })

  describe('validateZipCode', () => {
    it('should return true for valid zip codes', () => {
      expect(validateZipCode('12345')).toBe(true)
      expect(validateZipCode('12345-6789')).toBe(true)
    })

    it('should return false for invalid zip codes', () => {
      expect(validateZipCode('1234')).toBe(false) // too short
      expect(validateZipCode('123456')).toBe(false) // too long
      expect(validateZipCode('abcde')).toBe(false) // not numeric
      expect(validateZipCode('12345-678')).toBe(false) // invalid extension
      expect(validateZipCode('')).toBe(false)
    })
  })

  describe('validateDate', () => {
    it('should return true for valid dates', () => {
      expect(validateDate('2024-06-15')).toBe(true)
      expect(validateDate('2025-12-31')).toBe(true)
      expect(validateDate('2000-01-01')).toBe(true)
    })

    it('should return false for invalid dates', () => {
      expect(validateDate('2024-13-15')).toBe(false) // invalid month
      expect(validateDate('2024-06-32')).toBe(false) // invalid day
      expect(validateDate('24-06-15')).toBe(false) // wrong format
      expect(validateDate('2024/06/15')).toBe(false) // wrong separator
      expect(validateDate('')).toBe(false)
      expect(validateDate('invalid')).toBe(false)
    })
  })

  describe('Integration Tests', () => {
    it('should validate complete order form data', () => {
      const formData = {
        orderNumber: 'ORD-2024-001',
        closingDate: '2024-06-15',
        salePrice: '500000.00',
        borrowerEmail: 'john.doe@email.com',
        borrowerPhone: '(555) 123-4567',
        propertyZip: '90210'
      }

      expect(validateRequired(formData.orderNumber)).toBe(true)
      expect(validateDate(formData.closingDate)).toBe(true)
      expect(validateCurrency(formData.salePrice)).toBe(true)
      expect(validateEmail(formData.borrowerEmail)).toBe(true)
      expect(validatePhoneNumber(formData.borrowerPhone)).toBe(true)
      expect(validateZipCode(formData.propertyZip)).toBe(true)
    })

    it('should handle validation errors in form data', () => {
      const invalidFormData = {
        orderNumber: '',
        closingDate: '2024-13-32',
        salePrice: 'invalid-amount',
        borrowerEmail: 'invalid-email',
        borrowerPhone: '123',
        propertyZip: 'invalid-zip'
      }

      expect(validateRequired(invalidFormData.orderNumber)).toBe(false)
      expect(validateDate(invalidFormData.closingDate)).toBe(false)
      expect(validateCurrency(invalidFormData.salePrice)).toBe(false)
      expect(validateEmail(invalidFormData.borrowerEmail)).toBe(false)
      expect(validatePhoneNumber(invalidFormData.borrowerPhone)).toBe(false)
      expect(validateZipCode(invalidFormData.propertyZip)).toBe(false)
    })

    it('should validate real estate specific field requirements', () => {
      // Test common real estate validation scenarios
      expect(validateCurrency('0')).toBe(true) // $0 is valid (e.g., seller credits)
      expect(validateDate('2024-02-29')).toBe(true) // Leap year date
      expect(validatePhoneNumber('+1 (555) 123-4567')).toBe(true) // International format
      expect(validateZipCode('90210')).toBe(true) // Famous zip code
      expect(validateEmail('agent@realtor.com')).toBe(true) // Real estate domain
    })
  })
})