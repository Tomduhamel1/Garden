const { GlobalContact, OrderContactLink, Order } = require('../../models');
const { Op } = require('sequelize');

const globalContactsController = {
  // Get all global contacts with search and filtering
  async list(req, res) {
    try {
      const {
        search,
        type,
        category,
        status = 'active',
        limit = 50,
        offset = 0,
        sortBy = 'updatedAt',
        sortOrder = 'DESC'
      } = req.query;

      const whereClause = { status };
      
      if (type) {
        whereClause.type = type;
      }
      
      if (category) {
        whereClause.category = category;
      }

      if (search) {
        whereClause[Op.or] = [
          // Individual searches
          {
            [Op.and]: [
              { type: 'individual' },
              {
                [Op.or]: [
                  { '$individual_info.first_name$': { [Op.iLike]: `%${search}%` } },
                  { '$individual_info.last_name$': { [Op.iLike]: `%${search}%` } },
                  { '$individual_info.email$': { [Op.iLike]: `%${search}%` } }
                ]
              }
            ]
          },
          // Business searches
          {
            [Op.and]: [
              { type: 'business' },
              {
                [Op.or]: [
                  { '$business_info.company_name$': { [Op.iLike]: `%${search}%` } },
                  { '$business_info.license_number$': { [Op.iLike]: `%${search}%` } }
                ]
              }
            ]
          },
          // Government searches
          {
            [Op.and]: [
              { type: 'government' },
              { '$government_info.department_name$': { [Op.iLike]: `%${search}%` } }
            ]
          },
          // General contact info searches
          {
            [Op.or]: [
              { '$contact_info.primary_email$': { [Op.iLike]: `%${search}%` } },
              { '$contact_info.primary_phone$': { [Op.iLike]: `%${search}%` } }
            ]
          }
        ];
      }

      const contacts = await GlobalContact.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [[sortBy, sortOrder.toUpperCase()]],
        include: [{
          model: OrderContactLink,
          as: 'orderLinks',
          required: false,
          attributes: ['id', 'orderId', 'role', 'linkedAt']
        }]
      });

      res.json({
        contacts: contacts.rows,
        total: contacts.count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      });
    } catch (error) {
      console.error('Error listing global contacts:', error);
      res.status(500).json({ 
        error: 'Failed to retrieve global contacts',
        details: error.message 
      });
    }
  },

  // Get a specific global contact by ID
  async getById(req, res) {
    try {
      const { id } = req.params;

      const contact = await GlobalContact.findByPk(id, {
        include: [{
          model: OrderContactLink,
          as: 'orderLinks',
          include: [{
            model: Order,
            as: 'order',
            attributes: ['id', 'orderNumber', 'status', 'propertyAddress', 'closingDate']
          }]
        }]
      });

      if (!contact) {
        return res.status(404).json({ error: 'Global contact not found' });
      }

      res.json(contact);
    } catch (error) {
      console.error('Error getting global contact:', error);
      res.status(500).json({ 
        error: 'Failed to retrieve global contact',
        details: error.message 
      });
    }
  },

  // Create a new global contact
  async create(req, res) {
    try {
      console.log('=== CONTACT CREATION REQUEST ===');
      console.log('Request body:', JSON.stringify(req.body, null, 2));
      console.log('User:', req.user);
      
      const contactData = req.body;
      const userId = req.user?.id || req.user?.username || 'system';

      // Validate required fields
      if (!contactData.type || !contactData.category) {
        console.log('Validation failed: missing type or category');
        return res.status(400).json({ 
          error: 'Type and category are required' 
        });
      }

      // Map snake_case to camelCase for Sequelize fields
      const mappedData = {
        ...contactData,
        createdBy: userId,
        updatedBy: userId
      };

      // Handle field name mapping from frontend snake_case to backend camelCase
      if (contactData.individual_info) {
        mappedData.individualInfo = contactData.individual_info;
        delete mappedData.individual_info;
      }
      if (contactData.business_info) {
        mappedData.businessInfo = contactData.business_info;
        delete mappedData.business_info;
      }
      if (contactData.government_info) {
        mappedData.governmentInfo = contactData.government_info;
        delete mappedData.government_info;
      }
      if (contactData.contact_info) {
        mappedData.contactInfo = contactData.contact_info;
        delete mappedData.contact_info;
      }

      const contact = await GlobalContact.create(mappedData);

      console.log('Contact created successfully:', contact.id);
      res.status(201).json(contact);
    } catch (error) {
      console.error('=== CONTACT CREATION ERROR ===');
      console.error('Error creating global contact:', error);
      console.error('Stack trace:', error.stack);
      res.status(500).json({ 
        error: 'Failed to create global contact',
        details: error.message 
      });
    }
  },

  // Update a global contact
  async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const userId = req.user?.id || req.user?.username || 'system';

      const contact = await GlobalContact.findByPk(id);
      if (!contact) {
        return res.status(404).json({ error: 'Global contact not found' });
      }

      // Map snake_case to camelCase for Sequelize fields
      const mappedData = {
        ...updateData,
        updatedBy: userId
      };

      // Handle field name mapping from frontend snake_case to backend camelCase
      if (updateData.individual_info) {
        mappedData.individualInfo = updateData.individual_info;
        delete mappedData.individual_info;
      }
      if (updateData.business_info) {
        mappedData.businessInfo = updateData.business_info;
        delete mappedData.business_info;
      }
      if (updateData.government_info) {
        mappedData.governmentInfo = updateData.government_info;
        delete mappedData.government_info;
      }
      if (updateData.contact_info) {
        mappedData.contactInfo = updateData.contact_info;
        delete mappedData.contact_info;
      }

      await contact.update(mappedData);

      res.json(contact);
    } catch (error) {
      console.error('Error updating global contact:', error);
      res.status(500).json({ 
        error: 'Failed to update global contact',
        details: error.message 
      });
    }
  },

  // Delete a global contact
  async delete(req, res) {
    try {
      const { id } = req.params;

      const contact = await GlobalContact.findByPk(id);
      if (!contact) {
        return res.status(404).json({ error: 'Global contact not found' });
      }

      // Check if contact is used in any active orders
      const activeLinks = await OrderContactLink.findAll({
        where: { globalContactId: id },
        include: [{
          model: Order,
          as: 'order',
          where: { 
            status: { 
              [Op.notIn]: ['closed', 'cancelled'] 
            } 
          }
        }]
      });

      if (activeLinks.length > 0) {
        return res.status(400).json({ 
          error: 'Cannot delete contact that is used in active orders',
          activeOrders: activeLinks.map(link => link.order.orderNumber)
        });
      }

      await contact.destroy();
      res.json({ message: 'Global contact deleted successfully' });
    } catch (error) {
      console.error('Error deleting global contact:', error);
      res.status(500).json({ 
        error: 'Failed to delete global contact',
        details: error.message 
      });
    }
  },

  // Archive/deactivate a global contact
  async archive(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || req.user?.username || 'system';

      const contact = await GlobalContact.findByPk(id);
      if (!contact) {
        return res.status(404).json({ error: 'Global contact not found' });
      }

      await contact.update({
        status: 'archived',
        updatedBy: userId
      });

      res.json(contact);
    } catch (error) {
      console.error('Error archiving global contact:', error);
      res.status(500).json({ 
        error: 'Failed to archive global contact',
        details: error.message 
      });
    }
  },

  // Search contacts with advanced filtering
  async search(req, res) {
    try {
      const {
        q: searchTerm,
        type,
        category,
        limit = 20
      } = req.query;

      const contacts = await GlobalContact.searchContacts(
        searchTerm, 
        type, 
        category, 
        parseInt(limit)
      );

      res.json(contacts);
    } catch (error) {
      console.error('Error searching global contacts:', error);
      res.status(500).json({ 
        error: 'Failed to search global contacts',
        details: error.message 
      });
    }
  },

  // Get usage statistics for a contact
  async getUsageStats(req, res) {
    try {
      const { id } = req.params;

      const contact = await GlobalContact.findByPk(id);
      if (!contact) {
        return res.status(404).json({ error: 'Global contact not found' });
      }

      const stats = await contact.getUsageStats();
      
      // Get recent orders using this contact
      const recentLinks = await OrderContactLink.findAll({
        where: { globalContactId: id },
        include: [{
          model: Order,
          as: 'order',
          attributes: ['id', 'orderNumber', 'status', 'propertyAddress', 'closingDate']
        }],
        order: [['linkedAt', 'DESC']],
        limit: 10
      });

      res.json({
        ...stats,
        recentOrders: recentLinks.map(link => ({
          ...link.order.toJSON(),
          role: link.role,
          linkedAt: link.linkedAt
        }))
      });
    } catch (error) {
      console.error('Error getting usage stats:', error);
      res.status(500).json({ 
        error: 'Failed to get usage statistics',
        details: error.message 
      });
    }
  }
};

module.exports = globalContactsController;