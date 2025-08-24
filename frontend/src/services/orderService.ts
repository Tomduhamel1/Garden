import api from './api';

export interface Order {
  id: string;
  orderNumber: string;
  cdfData: any;
  contactsData: any;
  propertiesData: any;
  payoffsData: any;
  status: 'draft' | 'pending' | 'in_review' | 'approved' | 'closing' | 'closed' | 'cancelled';
  closingDate?: string | null;
  propertyAddress?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface CreateOrderDto {
  cdfData?: any;
  contactsData?: any;
  propertiesData?: any;
  payoffsData?: any;
  status?: 'draft' | 'pending' | 'in_review' | 'approved' | 'closing' | 'closed' | 'cancelled';
}

export interface UpdateOrderDto extends CreateOrderDto {}

class OrderService {
  async getOrders(): Promise<Order[]> {
    try {
      const response = await api.get('/orders');
      return response.data.data.orders;
    } catch (error) {
      // For demo mode, return mock data if API fails
      if (localStorage.getItem('token') === 'demo-token-12345') {
        return [
          {
            id: '39a531b6-3144-43c8-b023-a4130f8eb079',
            orderNumber: 'ORD-2025-DEMO-001',
            propertyAddress: '123 Main Street, Los Angeles, CA 90210',
            status: 'in_review' as const,
            closingDate: '2025-01-30',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            cdfData: {
              loans: [{
                initial_loan_amount: 680000,
                interest_rate: 6.875,
                loan_term_years: 30,
                loan_type: 'Conventional'
              }],
              transaction_information: {
                purchase_price: 850000
              },
              origination_charges: {
                line_01: {
                  description: 'Loan Origination Fee',
                  borrower_amount: 6800
                }
              }
            },
            contactsData: {
              borrowers: [{
                first_name: 'John',
                last_name: 'Smith'
              }],
              sellers: [{
                first_name: 'Sarah',
                last_name: 'Johnson'
              }]
            },
            propertiesData: {
              properties: [{
                property_type: 'Single Family Residence',
                address: '123 Main Street',
                unit: '',
                city: 'Los Angeles',
                county: 'Los Angeles County', 
                state: 'CA',
                zip: '90210'
              }]
            },
            payoffsData: {}
          }
        ];
      }
      throw error;
    }
  }

  async getOrder(id: string): Promise<Order> {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data.data.order;
    } catch (error) {
      // For demo mode, return mock data if API fails
      if (localStorage.getItem('token') === 'demo-token-12345' && id === '39a531b6-3144-43c8-b023-a4130f8eb079') {
        return {
          id: '39a531b6-3144-43c8-b023-a4130f8eb079',
          orderNumber: 'ORD-2025-DEMO-001',
          propertyAddress: '123 Main Street, Los Angeles, CA 90210',
          status: 'in_review' as const,
          closingDate: '2025-01-30',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          cdfData: {
            loans: [{
              initial_loan_amount: 680000,
              loan_type: 'Conventional',
              loan_purpose: 'Purchase',
              loan_product: 'Fixed Rate',
              loan_number: 'WF-2025-123456',
              loan_term_years: 30,
              loan_term_months: 0,
              interest_rate: 6.875,
              interest_type: 'fixed',
              monthly_principal_and_interest: 4468.43
            }],
            transaction_information: {
              purchase_price: 850000,
              sale_price: 850000,
              contract_date: '2025-01-15'
            },
            origination_charges: {
              line_01: {
                description: '1.00% Loan Origination Fee',
                borrower_amount: 6800,
                before_borrower_amount: 0,
                seller_amount: 0,
                before_seller_amount: 0,
                paid_by_others_amount: 0,
                payee_name: 'Wells Fargo Bank'
              },
              line_02: {
                description: 'Application Fee',
                borrower_amount: 500,
                before_borrower_amount: 0,
                seller_amount: 0,
                before_seller_amount: 0,
                paid_by_others_amount: 0,
                payee_name: 'Wells Fargo Bank'
              }
            },
            services_borrower_did_not_shop_for: {
              line_01: {
                description: 'Appraisal Fee',
                borrower_amount: 550,
                before_borrower_amount: 0,
                seller_amount: 0,
                before_seller_amount: 0,
                paid_by_others_amount: 0,
                payee_name: 'ABC Appraisal Co.'
              },
              line_02: {
                description: 'Credit Report',
                borrower_amount: 45,
                before_borrower_amount: 0,
                seller_amount: 0,
                before_seller_amount: 0,
                paid_by_others_amount: 0,
                payee_name: 'Credit Bureau'
              }
            },
            services_borrower_did_shop_for: {
              line_01: {
                description: 'Title Insurance',
                borrower_amount: 1200,
                before_borrower_amount: 0,
                seller_amount: 0,
                before_seller_amount: 0,
                paid_by_others_amount: 0,
                payee_name: 'First American Title'
              }
            },
            taxes_and_government_fees: {
              line_01: {
                description: 'Recording Fees',
                borrower_amount: 125,
                before_borrower_amount: 0,
                seller_amount: 75,
                before_seller_amount: 0,
                paid_by_others_amount: 0,
                payee_name: 'County Recorder'
              },
              line_02: {
                description: 'Transfer Tax',
                borrower_amount: 0,
                before_borrower_amount: 0,
                seller_amount: 2550,
                before_seller_amount: 0,
                paid_by_others_amount: 0,
                payee_name: 'County Tax Collector'
              }
            }
          },
          contactsData: {
            borrowers: [{
              type: 'person',
              first_name: 'John',
              middle_name: 'Michael',
              last_name: 'Smith',
              suffix: '',
              company_name: '',
              gender: 'Male',
              marital_status: 'Married',
              SSN: '***-**-1234',
              date_of_birth: '1985-06-15',
              email: 'john.smith@email.com',
              cell_phone: '(555) 123-4567',
              home_phone: '(555) 123-4568',
              work_phone: '(555) 123-4569',
              current_address: {
                address_1: '456 Oak Avenue',
                address_2: 'Apt 2B',
                city: 'Los Angeles',
                state: 'CA',
                zipcode: '90210'
              },
              on_title: true,
              ownership_percentage: 50,
              vesting_type: 'Joint Tenancy'
            }],
            sellers: [{
              type: 'person',
              first_name: 'Sarah',
              middle_name: 'Ann',
              last_name: 'Johnson',
              suffix: '',
              company_name: '',
              gender: 'Female',
              marital_status: 'Single',
              SSN: '***-**-5678',
              date_of_birth: '1978-03-22',
              email: 'sarah.johnson@email.com',
              cell_phone: '(555) 987-6543',
              home_phone: '(555) 987-6544',
              work_phone: '',
              current_address: {
                address_1: '123 Main Street',
                address_2: '',
                city: 'Los Angeles',
                state: 'CA',
                zipcode: '90210'
              },
              on_title: true,
              ownership_percentage: 100,
              vesting_type: 'Sole Ownership'
            }]
          },
          propertiesData: {
            properties: [{
              property_type: 'Single Family Residence',
              address: '123 Main Street',
              unit: '',
              city: 'Los Angeles',
              county: 'Los Angeles County',
              state: 'CA',
              zip: '90210',
              appraised_value: 855000,
              legal_description: 'Lot 123, Block 456',
              apn: '1234-567-890'
            }]
          },
          payoffsData: {}
        };
      }
      throw error;
    }
  }

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const response = await api.post('/orders', data);
    return response.data.data.order;
  }

  async updateOrder(id: string, data: UpdateOrderDto): Promise<Order> {
    const response = await api.put(`/orders/${id}`, data);
    return response.data.data.order;
  }

  async deleteOrder(id: string): Promise<void> {
    await api.delete(`/orders/${id}`);
  }
}

export default new OrderService();