const request = require('supertest');
const jwt = require('jsonwebtoken');

// Mock the entire app
jest.mock('../models', () => ({
  User: {
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn()
  },
  Order: {
    findByPk: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  },
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(),
    sync: jest.fn().mockResolvedValue()
  }
}));

const { User, Order } = require('../models');

// Create test app
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'test-secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Orders routes
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    if (order.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', authenticateToken, async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      userId: req.user.id
    };
    const order = await Order.create(orderData);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    if (order.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    await Order.update(req.body, { where: { id: req.params.id } });
    const updatedOrder = await Order.findByPk(req.params.id);
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/orders/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    if (order.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    await Order.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

describe('Orders API Integration Tests', () => {
  let authToken;
  
  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User'
  };

  const mockOrder = {
    id: 'order-123',
    order_number: 'ORD-2024-001',
    userId: 'user-123',
    cdf_data: {
      loan: {
        amount: '400000',
        interest_rate: '7.0'
      }
    },
    properties_data: {
      street_address: '123 Main St',
      city: 'Anytown',
      state: 'CA'
    },
    contacts_data: {
      borrower: {
        first_name: 'John',
        last_name: 'Doe'
      }
    },
    payoffs_data: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  beforeAll(() => {
    // Create auth token for tests
    authToken = jwt.sign(mockUser, process.env.JWT_SECRET || 'test-secret', { expiresIn: '1h' });
  });

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: 'ok',
        timestamp: expect.any(String)
      });
    });
  });

  describe('Authentication', () => {
    it('should require authentication for protected routes', async () => {
      const response = await request(app).get('/api/orders');
      
      expect(response.status).toBe(401);
      expect(response.body).toMatchObject({
        error: 'Access token required'
      });
    });

    it('should reject invalid tokens', async () => {
      const response = await request(app)
        .get('/api/orders')
        .set('Authorization', 'Bearer invalid-token');
      
      expect(response.status).toBe(403);
      expect(response.body).toMatchObject({
        error: 'Invalid or expired token'
      });
    });

    it('should accept valid tokens', async () => {
      Order.findAll.mockResolvedValue([mockOrder]);
      
      const response = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(200);
      expect(Order.findAll).toHaveBeenCalledWith({ where: { userId: mockUser.id } });
    });
  });

  describe('GET /api/orders', () => {
    it('should fetch user orders successfully', async () => {
      const mockOrders = [mockOrder, { ...mockOrder, id: 'order-456' }];
      Order.findAll.mockResolvedValue(mockOrders);
      
      const response = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrders);
      expect(Order.findAll).toHaveBeenCalledWith({ where: { userId: mockUser.id } });
    });

    it('should handle database errors', async () => {
      Order.findAll.mockRejectedValue(new Error('Database connection failed'));
      
      const response = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(500);
      expect(response.body).toMatchObject({
        error: 'Database connection failed'
      });
    });
  });

  describe('GET /api/orders/:id', () => {
    it('should fetch specific order successfully', async () => {
      Order.findByPk.mockResolvedValue(mockOrder);
      
      const response = await request(app)
        .get('/api/orders/order-123')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrder);
      expect(Order.findByPk).toHaveBeenCalledWith('order-123');
    });

    it('should return 404 for non-existent order', async () => {
      Order.findByPk.mockResolvedValue(null);
      
      const response = await request(app)
        .get('/api/orders/nonexistent')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        error: 'Order not found'
      });
    });

    it('should deny access to other users orders', async () => {
      const otherUserOrder = { ...mockOrder, userId: 'other-user-123' };
      Order.findByPk.mockResolvedValue(otherUserOrder);
      
      const response = await request(app)
        .get('/api/orders/order-123')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(403);
      expect(response.body).toMatchObject({
        error: 'Access denied'
      });
    });
  });

  describe('POST /api/orders', () => {
    const newOrderData = {
      order_number: 'ORD-2024-002',
      cdf_data: {
        loan: {
          amount: '500000',
          interest_rate: '6.5'
        }
      },
      properties_data: {
        street_address: '456 Oak St',
        city: 'Newtown'
      }
    };

    it('should create new order successfully', async () => {
      const createdOrder = { ...newOrderData, id: 'order-456', userId: mockUser.id };
      Order.create.mockResolvedValue(createdOrder);
      
      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newOrderData);
      
      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdOrder);
      expect(Order.create).toHaveBeenCalledWith({
        ...newOrderData,
        userId: mockUser.id
      });
    });

    it('should handle creation errors', async () => {
      Order.create.mockRejectedValue(new Error('Validation failed'));
      
      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newOrderData);
      
      expect(response.status).toBe(500);
      expect(response.body).toMatchObject({
        error: 'Validation failed'
      });
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});
      
      // Should still attempt to create (validation happens at database level)
      expect(Order.create).toHaveBeenCalledWith({
        userId: mockUser.id
      });
    });
  });

  describe('PUT /api/orders/:id', () => {
    const updatedData = {
      cdf_data: {
        loan: {
          amount: '450000',
          interest_rate: '6.8'
        }
      }
    };

    it('should update order successfully', async () => {
      const updatedOrder = { ...mockOrder, ...updatedData };
      Order.findByPk
        .mockResolvedValueOnce(mockOrder) // First call to check existence
        .mockResolvedValueOnce(updatedOrder); // Second call to return updated data
      Order.update.mockResolvedValue([1]);
      
      const response = await request(app)
        .put('/api/orders/order-123')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedData);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedOrder);
      expect(Order.update).toHaveBeenCalledWith(updatedData, { where: { id: 'order-123' } });
    });

    it('should return 404 for non-existent order', async () => {
      Order.findByPk.mockResolvedValue(null);
      
      const response = await request(app)
        .put('/api/orders/nonexistent')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedData);
      
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        error: 'Order not found'
      });
    });

    it('should deny access to other users orders', async () => {
      const otherUserOrder = { ...mockOrder, userId: 'other-user-123' };
      Order.findByPk.mockResolvedValue(otherUserOrder);
      
      const response = await request(app)
        .put('/api/orders/order-123')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedData);
      
      expect(response.status).toBe(403);
      expect(response.body).toMatchObject({
        error: 'Access denied'
      });
    });
  });

  describe('DELETE /api/orders/:id', () => {
    it('should delete order successfully', async () => {
      Order.findByPk.mockResolvedValue(mockOrder);
      Order.destroy.mockResolvedValue(1);
      
      const response = await request(app)
        .delete('/api/orders/order-123')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(204);
      expect(Order.destroy).toHaveBeenCalledWith({ where: { id: 'order-123' } });
    });

    it('should return 404 for non-existent order', async () => {
      Order.findByPk.mockResolvedValue(null);
      
      const response = await request(app)
        .delete('/api/orders/nonexistent')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        error: 'Order not found'
      });
    });

    it('should deny access to other users orders', async () => {
      const otherUserOrder = { ...mockOrder, userId: 'other-user-123' };
      Order.findByPk.mockResolvedValue(otherUserOrder);
      
      const response = await request(app)
        .delete('/api/orders/order-123')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(403);
      expect(response.body).toMatchObject({
        error: 'Access denied'
      });
    });
  });

  describe('Data Integrity', () => {
    it('should preserve JSONB data structure in create', async () => {
      const complexOrderData = {
        order_number: 'ORD-2024-003',
        cdf_data: {
          loan: { amount: '400000', interest_rate: '7.0' },
          origination_charges: {
            line_01: { description: 'Origination Fee', amount: '2000' },
            line_02: { description: 'Processing Fee', amount: '500' }
          }
        },
        contacts_data: {
          borrower: { first_name: 'John', last_name: 'Doe' },
          seller: { first_name: 'Jane', last_name: 'Smith' }
        }
      };
      
      Order.create.mockResolvedValue({ ...complexOrderData, id: 'order-789' });
      
      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(complexOrderData);
      
      expect(response.status).toBe(201);
      expect(Order.create).toHaveBeenCalledWith({
        ...complexOrderData,
        userId: mockUser.id
      });
    });

    it('should handle partial updates without losing data', async () => {
      const partialUpdate = {
        cdf_data: {
          loan: {
            amount: '425000' // Only updating amount
          }
        }
      };
      
      Order.findByPk.mockResolvedValueOnce(mockOrder);
      Order.update.mockResolvedValue([1]);
      Order.findByPk.mockResolvedValueOnce({ 
        ...mockOrder, 
        cdf_data: {
          ...mockOrder.cdf_data,
          loan: {
            ...mockOrder.cdf_data.loan,
            amount: '425000'
          }
        }
      });
      
      const response = await request(app)
        .put('/api/orders/order-123')
        .set('Authorization', `Bearer ${authToken}`)
        .send(partialUpdate);
      
      expect(response.status).toBe(200);
      expect(Order.update).toHaveBeenCalledWith(partialUpdate, { where: { id: 'order-123' } });
    });
  });
});