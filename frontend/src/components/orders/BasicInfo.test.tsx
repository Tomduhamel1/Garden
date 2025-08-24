import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BasicInfo from './BasicInfo'

// Mock the useOrderData hook
const mockOrderData = {
  id: 'test-order-id',
  order_number: 'ORD-2024-001',
  cdf_data: {
    order_info: {
      closing_date: '2024-06-15',
      escrow_number: 'ESC-123456',
      sale_price: '500000'
    },
    loan: {
      amount: '400000',
      interest_rate: '7.0'
    }
  },
  properties_data: {
    street_address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip_code: '90210'
  },
  contacts_data: {
    borrower: {
      first_name: 'John',
      last_name: 'Doe'
    },
    seller: {
      first_name: 'Jane',
      last_name: 'Smith'
    }
  }
}

const mockUseOrderData = {
  orderData: mockOrderData,
  loading: false,
  saving: false,
  error: null,
  getValue: vi.fn((path: string) => {
    const keys = path.split('.')
    let value = mockOrderData as any
    for (const key of keys) {
      value = value?.[key]
    }
    return value || ''
  }),
  handleInputChange: vi.fn(),
  saveData: vi.fn().mockResolvedValue(true)
}

vi.mock('../hooks/useOrderData', () => ({
  useOrderData: () => mockUseOrderData
}))

// Mock react-router-dom params
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ orderId: 'test-order-id' })
  }
})

const renderBasicInfo = () => {
  return render(
    <MemoryRouter>
      <BasicInfo />
    </MemoryRouter>
  )
}

describe('BasicInfo Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render basic info header', () => {
      renderBasicInfo()
      
      expect(screen.getByText('Basic Information')).toBeInTheDocument()
      expect(screen.getByText('Order & Property Details')).toBeInTheDocument()
    })

    it('should display order information fields', () => {
      renderBasicInfo()
      
      expect(screen.getByDisplayValue('ORD-2024-001')).toBeInTheDocument()
      expect(screen.getByDisplayValue('2024-06-15')).toBeInTheDocument()
      expect(screen.getByDisplayValue('ESC-123456')).toBeInTheDocument()
    })

    it('should display property information fields', () => {
      renderBasicInfo()
      
      expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Anytown')).toBeInTheDocument()
      expect(screen.getByDisplayValue('CA')).toBeInTheDocument()
      expect(screen.getByDisplayValue('90210')).toBeInTheDocument()
    })

    it('should display loan information fields', () => {
      renderBasicInfo()
      
      expect(screen.getByDisplayValue('500000')).toBeInTheDocument() // sale price
      expect(screen.getByDisplayValue('400000')).toBeInTheDocument() // loan amount
      expect(screen.getByDisplayValue('7.0')).toBeInTheDocument() // interest rate
    })

    it('should display party information', () => {
      renderBasicInfo()
      
      expect(screen.getByDisplayValue('John')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Jane')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Smith')).toBeInTheDocument()
    })
  })

  describe('Loading States', () => {
    it('should show loading spinner when loading', () => {
      const loadingMock = {
        ...mockUseOrderData,
        loading: true,
        orderData: null
      }
      
      vi.mocked(vi.importActual('../hooks/useOrderData')).mockReturnValue(loadingMock)
      
      renderBasicInfo()
      
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('should show saving state on save button when saving', () => {
      const savingMock = {
        ...mockUseOrderData,
        saving: true
      }
      
      vi.mocked(vi.importActual('../hooks/useOrderData')).mockReturnValue(savingMock)
      
      renderBasicInfo()
      
      const saveButton = screen.getByRole('button', { name: /saving/i })
      expect(saveButton).toBeInTheDocument()
      expect(saveButton).toBeDisabled()
    })
  })

  describe('Error Handling', () => {
    it('should display error message when there is an error', () => {
      const errorMock = {
        ...mockUseOrderData,
        error: 'Failed to load order data'
      }
      
      vi.mocked(vi.importActual('../hooks/useOrderData')).mockReturnValue(errorMock)
      
      renderBasicInfo()
      
      expect(screen.getByText('Failed to load order data')).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('should call handleInputChange when input values change', async () => {
      renderBasicInfo()
      
      const orderNumberInput = screen.getByDisplayValue('ORD-2024-001')
      
      fireEvent.change(orderNumberInput, { target: { value: 'ORD-2024-002' } })
      
      expect(mockUseOrderData.handleInputChange).toHaveBeenCalledWith(
        'order_number',
        expect.objectContaining({
          target: expect.objectContaining({ value: 'ORD-2024-002' })
        })
      )
    })

    it('should call saveData when save button is clicked', async () => {
      renderBasicInfo()
      
      const saveButton = screen.getByRole('button', { name: /save/i })
      
      fireEvent.click(saveButton)
      
      await waitFor(() => {
        expect(mockUseOrderData.saveData).toHaveBeenCalled()
      })
    })

    it('should handle multiple field changes', () => {
      renderBasicInfo()
      
      const streetInput = screen.getByDisplayValue('123 Main St')
      const cityInput = screen.getByDisplayValue('Anytown')
      const salePriceInput = screen.getByDisplayValue('500000')
      
      fireEvent.change(streetInput, { target: { value: '456 Oak Ave' } })
      fireEvent.change(cityInput, { target: { value: 'Newtown' } })
      fireEvent.change(salePriceInput, { target: { value: '550000' } })
      
      expect(mockUseOrderData.handleInputChange).toHaveBeenCalledTimes(3)
      expect(mockUseOrderData.handleInputChange).toHaveBeenCalledWith(
        'propertiesData.data.street_address',
        expect.any(Object)
      )
      expect(mockUseOrderData.handleInputChange).toHaveBeenCalledWith(
        'propertiesData.data.city',
        expect.any(Object)
      )
      expect(mockUseOrderData.handleInputChange).toHaveBeenCalledWith(
        'cdfData.data.order_info.sale_price',
        expect.any(Object)
      )
    })
  })

  describe('Data Integration', () => {
    it('should call getValue with correct schema paths', () => {
      renderBasicInfo()
      
      // Verify getValue is called with expected paths
      expect(mockUseOrderData.getValue).toHaveBeenCalledWith('order_number')
      expect(mockUseOrderData.getValue).toHaveBeenCalledWith('cdfData.data.order_info.closing_date')
      expect(mockUseOrderData.getValue).toHaveBeenCalledWith('propertiesData.data.street_address')
      expect(mockUseOrderData.getValue).toHaveBeenCalledWith('contactsData.data.borrower.first_name')
      expect(mockUseOrderData.getValue).toHaveBeenCalledWith('contactsData.data.seller.first_name')
    })

    it('should handle missing or undefined data gracefully', () => {
      const emptyMock = {
        ...mockUseOrderData,
        orderData: null,
        getValue: vi.fn(() => '')
      }
      
      vi.mocked(vi.importActual('../hooks/useOrderData')).mockReturnValue(emptyMock)
      
      renderBasicInfo()
      
      // Component should still render without crashing
      expect(screen.getByText('Basic Information')).toBeInTheDocument()
      
      // All inputs should have empty values
      const inputs = screen.getAllByRole('textbox')
      inputs.forEach(input => {
        expect(input).toHaveValue('')
      })
    })
  })

  describe('Form Validation', () => {
    it('should show validation styles for required fields', () => {
      renderBasicInfo()
      
      // Test required field styling (assuming required fields have specific classes)
      const orderNumberInput = screen.getByDisplayValue('ORD-2024-001')
      expect(orderNumberInput).toHaveClass('required')
    })

    it('should validate numeric fields', () => {
      renderBasicInfo()
      
      const salePriceInput = screen.getByDisplayValue('500000')
      
      // Test invalid numeric input
      fireEvent.change(salePriceInput, { target: { value: 'not-a-number' } })
      
      // Should still call handleInputChange (validation happens in hook)
      expect(mockUseOrderData.handleInputChange).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper labels for form fields', () => {
      renderBasicInfo()
      
      expect(screen.getByLabelText(/order number/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/closing date/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/street address/i)).toBeInTheDocument()
    })

    it('should have proper button roles', () => {
      renderBasicInfo()
      
      const saveButton = screen.getByRole('button', { name: /save/i })
      expect(saveButton).toBeInTheDocument()
      expect(saveButton).toHaveAttribute('type', 'button')
    })

    it('should support keyboard navigation', () => {
      renderBasicInfo()
      
      const inputs = screen.getAllByRole('textbox')
      
      // First input should be focusable
      inputs[0].focus()
      expect(document.activeElement).toBe(inputs[0])
      
      // Tab should move to next input
      fireEvent.keyDown(inputs[0], { key: 'Tab' })
      // Note: jsdom doesn't automatically handle tab navigation,
      // so we're just testing that the elements are focusable
    })
  })
})