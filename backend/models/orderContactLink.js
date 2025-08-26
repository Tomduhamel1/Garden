'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderContactLink extends Model {
    static associate(models) {
      // Link to Order
      OrderContactLink.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
      
      // Link to GlobalContact
      OrderContactLink.belongsTo(models.GlobalContact, {
        foreignKey: 'globalContactId',
        as: 'globalContact'
      });
    }
    
    // Instance method to apply overrides to global contact data
    getEffectiveContactData() {
      const globalData = this.globalContact;
      const overrides = this.orderSpecificOverrides || {};
      
      // Merge global contact data with order-specific overrides
      return {
        ...globalData.toJSON(),
        // Apply overrides to each data section
        individualInfo: {
          ...globalData.individualInfo,
          ...overrides.individualInfo
        },
        businessInfo: {
          ...globalData.businessInfo,
          ...overrides.businessInfo
        },
        governmentInfo: {
          ...globalData.governmentInfo,
          ...overrides.governmentInfo
        },
        contactInfo: {
          ...globalData.contactInfo,
          ...overrides.contactInfo
        }
      };
    }
    
    // Static method to get all contacts for an order
    static async getOrderContacts(orderId) {
      return await OrderContactLink.findAll({
        where: { orderId },
        include: [{
          model: sequelize.models.GlobalContact,
          as: 'globalContact'
        }],
        order: [['role', 'ASC'], ['createdAt', 'ASC']]
      });
    }
    
    // Static method to link a global contact to an order
    static async linkContactToOrder(orderId, globalContactId, role, overrides = {}) {
      // Check if this contact is already linked in this role
      const existingLink = await OrderContactLink.findOne({
        where: { orderId, globalContactId, role }
      });
      
      if (existingLink) {
        // Update existing link with new overrides
        existingLink.orderSpecificOverrides = overrides;
        await existingLink.save();
        return existingLink;
      }
      
      // Create new link
      const link = await OrderContactLink.create({
        orderId,
        globalContactId,
        role,
        orderSpecificOverrides: overrides
      });
      
      // Update usage tracking on global contact
      const globalContact = await sequelize.models.GlobalContact.findByPk(globalContactId);
      if (globalContact) {
        globalContact.usageCount = (globalContact.usageCount || 0) + 1;
        globalContact.lastUsed = new Date();
        await globalContact.save();
      }
      
      return link;
    }
  }
  
  OrderContactLink.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'order_id',
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    globalContactId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'global_contact_id',
      references: {
        model: 'global_contacts',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Role in the order: borrower_0, seller_1, lender, etc.'
    },
    // Order-specific overrides for global contact data
    orderSpecificOverrides: {
      type: DataTypes.JSONB,
      field: 'order_specific_overrides',
      defaultValue: {},
      comment: 'Order-specific data that overrides global contact information',
      // Example: Different phone number for this order,
      // different role-specific information, etc.
    },
    // Metadata
    linkedBy: {
      type: DataTypes.STRING,
      field: 'linked_by',
      comment: 'User who linked this contact to the order'
    },
    linkedAt: {
      type: DataTypes.DATE,
      field: 'linked_at',
      defaultValue: DataTypes.NOW,
      comment: 'When this contact was linked to the order'
    }
  }, {
    sequelize,
    modelName: 'OrderContactLink',
    tableName: 'order_contact_links',
    timestamps: true,
    underscored: true,
    indexes: [
      // Composite unique index to prevent duplicate role assignments
      {
        unique: true,
        fields: ['order_id', 'role'],
        name: 'unique_order_role'
      },
      // Lookup indexes
      {
        fields: ['order_id']
      },
      {
        fields: ['global_contact_id']
      },
      {
        fields: ['role']
      },
      // JSONB index for overrides
      {
        fields: ['order_specific_overrides'],
        using: 'gin'
      }
    ]
  });
  
  return OrderContactLink;
};