const { OrderContactLink, GlobalContact, Order } = require('../../models');
const { Op } = require('sequelize');

const orderContactLinksController = {
  // Get all contacts linked to an order
  async getOrderContacts(req, res) {
    try {
      const { orderId } = req.params;

      // Verify order exists
      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      const contactLinks = await OrderContactLink.getOrderContacts(orderId);

      // Transform to include effective contact data (global + overrides)
      const contactsWithData = contactLinks.map(link => ({
        linkId: link.id,
        role: link.role,
        linkedAt: link.linkedAt,
        linkedBy: link.linkedBy,
        orderSpecificOverrides: link.orderSpecificOverrides,
        effectiveContactData: link.getEffectiveContactData()
      }));

      res.json({
        orderId,
        contacts: contactsWithData
      });
    } catch (error) {
      console.error('Error getting order contacts:', error);
      res.status(500).json({ 
        error: 'Failed to retrieve order contacts',
        details: error.message 
      });
    }
  },

  // Link a global contact to an order
  async linkContactToOrder(req, res) {
    try {
      const { orderId } = req.params;
      const { 
        globalContactId, 
        role, 
        orderSpecificOverrides = {} 
      } = req.body;
      const userId = req.user?.id || req.user?.username || 'system';

      // Validate required fields
      if (!globalContactId || !role) {
        return res.status(400).json({ 
          error: 'globalContactId and role are required' 
        });
      }

      // Verify order exists
      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      // Verify global contact exists
      const globalContact = await GlobalContact.findByPk(globalContactId);
      if (!globalContact) {
        return res.status(404).json({ error: 'Global contact not found' });
      }

      // Link the contact to the order
      const link = await OrderContactLink.linkContactToOrder(
        orderId,
        globalContactId,
        role,
        orderSpecificOverrides
      );

      // Return the link with full contact data
      const fullLink = await OrderContactLink.findByPk(link.id, {
        include: [{
          model: GlobalContact,
          as: 'globalContact'
        }]
      });

      res.status(201).json({
        linkId: fullLink.id,
        role: fullLink.role,
        linkedAt: fullLink.linkedAt,
        linkedBy: fullLink.linkedBy,
        orderSpecificOverrides: fullLink.orderSpecificOverrides,
        effectiveContactData: fullLink.getEffectiveContactData()
      });
    } catch (error) {
      console.error('Error linking contact to order:', error);
      
      // Handle unique constraint violations
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ 
          error: 'A contact is already assigned to this role in this order',
          details: error.message 
        });
      }
      
      res.status(500).json({ 
        error: 'Failed to link contact to order',
        details: error.message 
      });
    }
  },

  // Update order-specific overrides for a contact link
  async updateContactOverrides(req, res) {
    try {
      const { orderId, linkId } = req.params;
      const { orderSpecificOverrides } = req.body;
      const userId = req.user?.id || req.user?.username || 'system';

      const link = await OrderContactLink.findOne({
        where: { id: linkId, orderId },
        include: [{
          model: GlobalContact,
          as: 'globalContact'
        }]
      });

      if (!link) {
        return res.status(404).json({ error: 'Contact link not found' });
      }

      await link.update({
        orderSpecificOverrides: orderSpecificOverrides || {}
      });

      res.json({
        linkId: link.id,
        role: link.role,
        orderSpecificOverrides: link.orderSpecificOverrides,
        effectiveContactData: link.getEffectiveContactData()
      });
    } catch (error) {
      console.error('Error updating contact overrides:', error);
      res.status(500).json({ 
        error: 'Failed to update contact overrides',
        details: error.message 
      });
    }
  },

  // Unlink a contact from an order
  async unlinkContactFromOrder(req, res) {
    try {
      const { orderId, linkId } = req.params;

      const link = await OrderContactLink.findOne({
        where: { id: linkId, orderId }
      });

      if (!link) {
        return res.status(404).json({ error: 'Contact link not found' });
      }

      await link.destroy();

      res.json({ message: 'Contact unlinked from order successfully' });
    } catch (error) {
      console.error('Error unlinking contact from order:', error);
      res.status(500).json({ 
        error: 'Failed to unlink contact from order',
        details: error.message 
      });
    }
  },

  // Replace all contacts for an order (useful for bulk operations)
  async replaceOrderContacts(req, res) {
    try {
      const { orderId } = req.params;
      const { contacts } = req.body; // Array of { globalContactId, role, orderSpecificOverrides }
      const userId = req.user?.id || req.user?.username || 'system';

      // Verify order exists
      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      // Start transaction
      const transaction = await OrderContactLink.sequelize.transaction();

      try {
        // Remove all existing links for this order
        await OrderContactLink.destroy({
          where: { orderId },
          transaction
        });

        // Create new links
        const newLinks = [];
        for (const contactData of contacts || []) {
          if (contactData.globalContactId && contactData.role) {
            const link = await OrderContactLink.create({
              orderId,
              globalContactId: contactData.globalContactId,
              role: contactData.role,
              orderSpecificOverrides: contactData.orderSpecificOverrides || {},
              linkedBy: userId
            }, { transaction });
            
            newLinks.push(link);
          }
        }

        await transaction.commit();

        // Return the new contact links with full data
        const fullLinks = await OrderContactLink.findAll({
          where: { orderId },
          include: [{
            model: GlobalContact,
            as: 'globalContact'
          }]
        });

        const contactsWithData = fullLinks.map(link => ({
          linkId: link.id,
          role: link.role,
          linkedAt: link.linkedAt,
          linkedBy: link.linkedBy,
          orderSpecificOverrides: link.orderSpecificOverrides,
          effectiveContactData: link.getEffectiveContactData()
        }));

        res.json({
          orderId,
          contacts: contactsWithData
        });
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      console.error('Error replacing order contacts:', error);
      res.status(500).json({ 
        error: 'Failed to replace order contacts',
        details: error.message 
      });
    }
  },

  // Get contact history for a specific global contact
  async getContactHistory(req, res) {
    try {
      const { globalContactId } = req.params;
      const { limit = 50, offset = 0 } = req.query;

      // Verify global contact exists
      const globalContact = await GlobalContact.findByPk(globalContactId);
      if (!globalContact) {
        return res.status(404).json({ error: 'Global contact not found' });
      }

      const links = await OrderContactLink.findAndCountAll({
        where: { globalContactId },
        include: [{
          model: Order,
          as: 'order',
          attributes: ['id', 'orderNumber', 'status', 'propertyAddress', 'closingDate']
        }],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['linkedAt', 'DESC']]
      });

      res.json({
        globalContactId,
        history: links.rows.map(link => ({
          linkId: link.id,
          role: link.role,
          linkedAt: link.linkedAt,
          linkedBy: link.linkedBy,
          order: link.order,
          hasOverrides: Object.keys(link.orderSpecificOverrides || {}).length > 0
        })),
        total: links.count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      });
    } catch (error) {
      console.error('Error getting contact history:', error);
      res.status(500).json({ 
        error: 'Failed to retrieve contact history',
        details: error.message 
      });
    }
  }
};

module.exports = orderContactLinksController;