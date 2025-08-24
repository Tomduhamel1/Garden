import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useOrderData } from './useOrderData'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

// Mock data
const mockOrderData = {
  id: 'test-order-id',
  order_number: 'ORD-2024-001',
  cdf_data: {
    loan: {
      amount: '400000',
      interest_rate: '7.0',
      term_months: '360'
    },
    origination_charges: {
      line_01: { description: 'Origination Fee', amount: '2000' }
    }
  },
  contacts_data: {
    borrower: {
      first_name: 'John',
      last_name: 'Doe'
    }
  },
  properties_data: {
    street_address: '123 Main St',
    sale_price: '500000'
  }
}

describe('useOrderData Hook', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
    
    // Mock successful API responses by default
    mockedAxios.get.mockResolvedValue({ data: mockOrderData })
    mockedAxios.put.mockResolvedValue({ data: mockOrderData })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Initial Load', () => {
    it('should initialize with loading state', async () => {
      const { result } = renderHook(() => useOrderData('test-order-id'))
      
      expect(result.current.loading).toBe(true)
      expect(result.current.orderData).toBeNull()
      expect(result.current.error).toBeNull()
    })

    it('should load order data successfully', async () => {
      const { result } = renderHook(() => useOrderData('test-order-id'))
      
      // Wait for the data to load
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      expect(result.current.loading).toBe(false)
      expect(result.current.orderData).toEqual(mockOrderData)
      expect(result.current.error).toBeNull()
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/orders/test-order-id')
    })

    it('should handle load errors', async () => {
      const errorMessage = 'Failed to load order'
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage))
      
      const { result } = renderHook(() => useOrderData('test-order-id'))
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      expect(result.current.loading).toBe(false)
      expect(result.current.orderData).toBeNull()
      expect(result.current.error).toBe(errorMessage)
    })
  })

  describe('getValue Function', () => {
    it('should get nested values using dot notation', async () => {
      const { result } = renderHook(() => useOrderData('test-order-id'))
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      const getValue = result.current.getValue
      
      expect(getValue('cdf_data.loan.amount')).toBe('400000')
      expect(getValue('contacts_data.borrower.first_name')).toBe('John')
      expect(getValue('properties_data.street_address')).toBe('123 Main St')
    })

    it('should return empty string for non-existent paths', async () => {
      const { result } = renderHook(() => useOrderData('test-order-id'))
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      const getValue = result.current.getValue
      
      expect(getValue('nonexistent.path')).toBe('')
      expect(getValue('cdf_data.loan.nonexistent')).toBe('')
    })

    it('should handle array notation', async () => {
      const mockDataWithArray = {
        ...mockOrderData,
        cdf_data: {
          ...mockOrderData.cdf_data,
          origination_charges: {
            line_01: { description: 'Fee 1', amount: '1000' },
            line_02: { description: 'Fee 2', amount: '2000' }
          }
        }
      }
      
      mockedAxios.get.mockResolvedValueOnce({ data: mockDataWithArray })
      
      const { result } = renderHook(() => useOrderData('test-order-id'))
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      const getValue = result.current.getValue
      
      expect(getValue('cdf_data.origination_charges.line_01.amount')).toBe('1000')
      expect(getValue('cdf_data.origination_charges.line_02.description')).toBe('Fee 2')
    })
  })

  describe('handleInputChange Function', () => {
    it('should update values using dot notation', async () => {
      const { result } = renderHook(() => useOrderData('test-order-id'))
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      const { handleInputChange, getValue } = result.current
      
      // Simulate input change
      const mockEvent = {
        target: { value: '450000' }
      } as React.ChangeEvent<HTMLInputElement>
      
      act(() => {
        handleInputChange('cdf_data.loan.amount', mockEvent)
      })
      
      expect(getValue('cdf_data.loan.amount')).toBe('450000')
    })

    it('should create nested objects if they don\'t exist', async () => {
      const { result } = renderHook(() => useOrderData('test-order-id'))
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      const { handleInputChange, getValue } = result.current
      
      const mockEvent = {
        target: { value: 'New Value' }
      } as React.ChangeEvent<HTMLInputElement>
      
      act(() => {
        handleInputChange('new.nested.path', mockEvent)
      })
      
      expect(getValue('new.nested.path')).toBe('New Value')
    })
  })

  describe('saveData Function', () => {
    it('should save data successfully', async () => {
      const { result } = renderHook(() => useOrderData('test-order-id'))
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      const { saveData } = result.current
      
      await act(async () => {
        const success = await saveData()
        expect(success).toBe(true)
      })
      
      expect(mockedAxios.put).toHaveBeenCalledWith('/api/orders/test-order-id', mockOrderData)
    })

    it('should handle save errors', async () => {
      mockedAxios.put.mockRejectedValueOnce(new Error('Save failed'))
      
      const { result } = renderHook(() => useOrderData('test-order-id'))
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      const { saveData } = result.current
      
      await act(async () => {
        const success = await saveData()
        expect(success).toBe(false)
      })
      
      expect(result.current.error).toBe('Save failed')
    })

    it('should set saving state during save operation', async () => {
      let resolvePromise: (value: any) => void
      const savePromise = new Promise(resolve => {
        resolvePromise = resolve
      })
      
      mockedAxios.put.mockReturnValueOnce(savePromise)
      
      const { result } = renderHook(() => useOrderData('test-order-id'))
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      // Start save operation
      act(() => {
        result.current.saveData()
      })
      
      expect(result.current.saving).toBe(true)
      
      // Complete save operation
      await act(async () => {
        resolvePromise!({ data: mockOrderData })
        await savePromise
      })
      
      expect(result.current.saving).toBe(false)
    })
  })

  describe('Error Handling', () => {
    it('should clear errors when retrying operations', async () => {
      // First, cause an error
      mockedAxios.get.mockRejectedValueOnce(new Error('Initial error'))
      
      const { result } = renderHook(() => useOrderData('test-order-id'))
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      expect(result.current.error).toBe('Initial error')
      
      // Then simulate a successful retry
      mockedAxios.get.mockResolvedValueOnce({ data: mockOrderData })
      
      await act(async () => {
        await result.current.saveData() // This should clear the error
      })
      
      expect(result.current.error).toBeNull()
    })
  })

  describe('Data Consistency', () => {
    it('should maintain data integrity across operations', async () => {
      const { result } = renderHook(() => useOrderData('test-order-id'))
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      const { handleInputChange, getValue, saveData } = result.current
      
      // Make multiple changes
      const mockEvent1 = { target: { value: '500000' } } as React.ChangeEvent<HTMLInputElement>
      const mockEvent2 = { target: { value: 'Jane' } } as React.ChangeEvent<HTMLInputElement>
      
      act(() => {
        handleInputChange('cdf_data.loan.amount', mockEvent1)
        handleInputChange('contacts_data.borrower.first_name', mockEvent2)
      })
      
      expect(getValue('cdf_data.loan.amount')).toBe('500000')
      expect(getValue('contacts_data.borrower.first_name')).toBe('Jane')
      expect(getValue('contacts_data.borrower.last_name')).toBe('Doe') // Should remain unchanged
      
      // Save and verify
      await act(async () => {
        await saveData()
      })
      
      expect(mockedAxios.put).toHaveBeenCalledWith(
        '/api/orders/test-order-id',
        expect.objectContaining({
          cdf_data: expect.objectContaining({
            loan: expect.objectContaining({
              amount: '500000'
            })
          }),
          contacts_data: expect.objectContaining({
            borrower: expect.objectContaining({
              first_name: 'Jane',
              last_name: 'Doe'
            })
          })
        })
      )
    })
  })
})