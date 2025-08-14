'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Define association here
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  
  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'order_number'
    },
    status: {
      type: DataTypes.ENUM(
        'draft',
        'pending',
        'in_review',
        'approved',
        'closing',
        'closed',
        'cancelled'
      ),
      defaultValue: 'draft'
    },
    closingDate: {
      type: DataTypes.DATE,
      field: 'closing_date'
    },
    propertyAddress: {
      type: DataTypes.STRING,
      field: 'property_address'
    },
    // JSONB columns for complex nested data matching Qualia schema
    cdfData: {
      type: DataTypes.JSONB,
      defaultValue: {},
      field: 'cdf_data',
      comment: 'Stores all CDF namespace data (sections A-N of Closing Disclosure)'
    },
    contactsData: {
      type: DataTypes.JSONB,
      defaultValue: {},
      field: 'contacts_data',
      comment: 'Stores borrowers, sellers, agents, lenders, title companies'
    },
    propertiesData: {
      type: DataTypes.JSONB,
      defaultValue: {},
      field: 'properties_data',
      comment: 'Stores property details, legal descriptions, tax info'
    },
    payoffsData: {
      type: DataTypes.JSONB,
      defaultValue: {},
      field: 'payoffs_data',
      comment: 'Stores existing loan payoffs'
    },
    calculationsData: {
      type: DataTypes.JSONB,
      defaultValue: {},
      field: 'calculations_data',
      comment: 'Stores all calculated values and summaries'
    },
    documentsData: {
      type: DataTypes.JSONB,
      defaultValue: {},
      field: 'documents_data',
      comment: 'Stores generated document references and metadata'
    },
    auditLog: {
      type: DataTypes.JSONB,
      defaultValue: [],
      field: 'audit_log',
      comment: 'Tracks all changes and user actions'
    },
    // Metadata fields
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    createdBy: {
      type: DataTypes.STRING,
      field: 'created_by'
    },
    updatedBy: {
      type: DataTypes.STRING,
      field: 'updated_by'
    },
    notes: {
      type: DataTypes.TEXT
    },
    isLocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_locked'
    },
    lockedAt: {
      type: DataTypes.DATE,
      field: 'locked_at'
    },
    lockedBy: {
      type: DataTypes.STRING,
      field: 'locked_by'
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['order_number']
      },
      {
        fields: ['status']
      },
      {
        fields: ['closing_date']
      },
      {
        fields: ['user_id']
      },
      // GIN indexes for JSONB columns for efficient querying
      {
        fields: ['cdf_data'],
        using: 'gin'
      },
      {
        fields: ['contacts_data'],
        using: 'gin'
      }
    ]
  });
  
  return Order;
};