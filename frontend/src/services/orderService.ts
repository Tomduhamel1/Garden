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
    const response = await api.get('/orders');
    return response.data.data.orders;
  }

  async getOrder(id: string): Promise<Order> {
    const response = await api.get(`/orders/${id}`);
    return response.data.data.order;
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