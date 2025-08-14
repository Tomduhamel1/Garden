const { Order, User } = require('../../models');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const orderController = {
  async create(req, res) {
    try {
      const {
        orderNumber,
        closingDate,
        propertyAddress,
        cdfData,
        contactsData,
        propertiesData,
        payoffsData,
        notes
      } = req.body;

      // Generate order number if not provided
      const finalOrderNumber = orderNumber || `ORD-${Date.now()}`;

      const order = await Order.create({
        orderNumber: finalOrderNumber,
        status: 'draft',
        closingDate,
        propertyAddress,
        cdfData: cdfData || {},
        contactsData: contactsData || {},
        propertiesData: propertiesData || {},
        payoffsData: payoffsData || {},
        calculationsData: {},
        documentsData: {},
        auditLog: [{
          action: 'created',
          userId: req.user.id,
          timestamp: new Date(),
          details: 'Order created'
        }],
        userId: req.user.id,
        createdBy: `${req.user.firstName} ${req.user.lastName}`,
        notes
      });

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: { order }
      });
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create order',
        error: error.message
      });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findOne({
        where: { 
          id,
          userId: req.user.id 
        },
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }]
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.json({
        success: true,
        data: { order }
      });
    } catch (error) {
      console.error('Get order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get order',
        error: error.message
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const order = await Order.findOne({
        where: { 
          id,
          userId: req.user.id 
        }
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      // Check if order is locked
      if (order.isLocked && !req.body.forceUpdate) {
        return res.status(403).json({
          success: false,
          message: 'Order is locked and cannot be edited'
        });
      }

      // Add audit log entry
      const auditLog = order.auditLog || [];
      auditLog.push({
        action: 'updated',
        userId: req.user.id,
        timestamp: new Date(),
        details: `Fields updated: ${Object.keys(updates).join(', ')}`
      });

      // Update order
      await order.update({
        ...updates,
        auditLog,
        updatedBy: `${req.user.firstName} ${req.user.lastName}`
      });

      res.json({
        success: true,
        message: 'Order updated successfully',
        data: { order }
      });
    } catch (error) {
      console.error('Update order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update order',
        error: error.message
      });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findOne({
        where: { 
          id,
          userId: req.user.id 
        }
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      // Soft delete by updating status
      await order.update({ 
        status: 'cancelled',
        auditLog: [
          ...(order.auditLog || []),
          {
            action: 'cancelled',
            userId: req.user.id,
            timestamp: new Date(),
            details: 'Order cancelled'
          }
        ]
      });

      res.json({
        success: true,
        message: 'Order cancelled successfully'
      });
    } catch (error) {
      console.error('Delete order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete order',
        error: error.message
      });
    }
  },

  async list(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        search,
        sortBy = 'createdAt',
        sortOrder = 'DESC'
      } = req.query;

      const offset = (page - 1) * limit;
      const where = { userId: req.user.id };

      // Add filters
      if (status) {
        where.status = status;
      }

      if (search) {
        where[Op.or] = [
          { orderNumber: { [Op.iLike]: `%${search}%` } },
          { propertyAddress: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const { count, rows } = await Order.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [[sortBy, sortOrder]],
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }]
      });

      res.json({
        success: true,
        data: {
          orders: rows,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            pages: Math.ceil(count / limit)
          }
        }
      });
    } catch (error) {
      console.error('List orders error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to list orders',
        error: error.message
      });
    }
  },

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['draft', 'pending', 'in_review', 'approved', 'closing', 'closed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status'
        });
      }

      const order = await Order.findOne({
        where: { 
          id,
          userId: req.user.id 
        }
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      // Add audit log entry
      const auditLog = order.auditLog || [];
      auditLog.push({
        action: 'status_changed',
        userId: req.user.id,
        timestamp: new Date(),
        details: `Status changed from ${order.status} to ${status}`
      });

      await order.update({
        status,
        auditLog,
        updatedBy: `${req.user.firstName} ${req.user.lastName}`
      });

      res.json({
        success: true,
        message: 'Order status updated successfully',
        data: { order }
      });
    } catch (error) {
      console.error('Update status error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update order status',
        error: error.message
      });
    }
  },

  async lock(req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findOne({
        where: { 
          id,
          userId: req.user.id 
        }
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      if (order.isLocked) {
        return res.status(400).json({
          success: false,
          message: 'Order is already locked'
        });
      }

      // Add audit log entry
      const auditLog = order.auditLog || [];
      auditLog.push({
        action: 'locked',
        userId: req.user.id,
        timestamp: new Date(),
        details: 'Order locked for editing'
      });

      await order.update({
        isLocked: true,
        lockedAt: new Date(),
        lockedBy: `${req.user.firstName} ${req.user.lastName}`,
        auditLog
      });

      res.json({
        success: true,
        message: 'Order locked successfully',
        data: { order }
      });
    } catch (error) {
      console.error('Lock order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to lock order',
        error: error.message
      });
    }
  },

  async unlock(req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findOne({
        where: { 
          id,
          userId: req.user.id 
        }
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      if (!order.isLocked) {
        return res.status(400).json({
          success: false,
          message: 'Order is not locked'
        });
      }

      // Add audit log entry
      const auditLog = order.auditLog || [];
      auditLog.push({
        action: 'unlocked',
        userId: req.user.id,
        timestamp: new Date(),
        details: 'Order unlocked for editing'
      });

      await order.update({
        isLocked: false,
        lockedAt: null,
        lockedBy: null,
        auditLog
      });

      res.json({
        success: true,
        message: 'Order unlocked successfully',
        data: { order }
      });
    } catch (error) {
      console.error('Unlock order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to unlock order',
        error: error.message
      });
    }
  }
};

module.exports = orderController;