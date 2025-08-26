'use strict';
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GlobalContact extends Model {
    static associate(models) {
      // A global contact can be linked to many orders
      GlobalContact.hasMany(models.OrderContactLink, {
        foreignKey: 'globalContactId',
        as: 'orderLinks'
      });
    }
    
    // Instance method to get usage statistics
    async getUsageStats() {
      const OrderContactLink = sequelize.models.OrderContactLink;
      const linkCount = await OrderContactLink.count({
        where: { globalContactId: this.id }
      });
      
      return {
        usageCount: linkCount,
        lastUsed: this.updatedAt
      };
    }
    
    // Static method to search contacts
    static async searchContacts(searchTerm, contactType = null, category = null, limit = 50) {
      const whereClause = {};
      
      if (contactType) {
        whereClause.type = contactType;
      }
      
      if (category) {
        whereClause.category = category;
      }
      
      if (searchTerm) {
        // Search in various fields based on contact type
        whereClause[Op.or] = [
          // Individual first name
          sequelize.where(
            sequelize.literal(`individual_info->>'first_name'`), 
            'ILIKE', `%${searchTerm}%`
          ),
          // Individual last name  
          sequelize.where(
            sequelize.literal(`individual_info->>'last_name'`), 
            'ILIKE', `%${searchTerm}%`
          ),
          // Individual full name (first + last)
          sequelize.where(
            sequelize.literal(`CONCAT(individual_info->>'first_name', ' ', individual_info->>'last_name')`),
            'ILIKE', `%${searchTerm}%`
          ),
          // Business company name
          sequelize.where(
            sequelize.literal(`business_info->>'company_name'`), 
            'ILIKE', `%${searchTerm}%`
          )
        ];
      }
      
      return await GlobalContact.findAll({
        where: whereClause,
        limit,
        order: [['updatedAt', 'DESC']],
        include: [{
          model: sequelize.models.OrderContactLink,
          as: 'orderLinks',
          required: false
        }]
      });
    }
  }
  
  GlobalContact.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('individual', 'business', 'government'),
      allowNull: false,
      comment: 'Determines which data structure to use'
    },
    category: {
      type: DataTypes.ENUM(
        'buyer', 'seller', 'lender', 'mortgage_brokerage', 
        'selling_agency', 'listing_agency', 'recording_office', 
        'tax_authority', 'title_abstractor', 'surveying_firm', 'other'
      ),
      allowNull: false,
      comment: 'Contact category matching UI tabs'
    },
    // Individual person data (for buyers/sellers)
    individualInfo: {
      type: DataTypes.JSONB,
      field: 'individual_info',
      defaultValue: {},
      comment: 'Personal information for individual contacts',
      // Example structure:
      // {
      //   first_name, middle_name, last_name, suffix,
      //   gender, marital_status, ssn, date_of_birth,
      //   on_loan, on_title, ownership_percentage,
      //   has_exchange, power_of_attorney, reporting_1099
      // }
    },
    // Business entity data (for companies/agencies/firms)
    businessInfo: {
      type: DataTypes.JSONB,
      field: 'business_info',
      defaultValue: {},
      comment: 'Business information for company contacts',
      // Example structure:
      // {
      //   company_name, dba_name, license_number, license_state,
      //   federal_tax_id, business_type, website, specialties,
      //   established_date, employee_count, service_areas
      // }
    },
    // Government office data (for recording offices, tax authorities)
    governmentInfo: {
      type: DataTypes.JSONB,
      field: 'government_info', 
      defaultValue: {},
      comment: 'Government office information',
      // Example structure:
      // {
      //   department_name, jurisdiction, office_type,
      //   fee_schedule, filing_requirements, hours_of_operation,
      //   online_services, forms_available, processing_times
      // }
    },
    // Contact information (common to all types)
    contactInfo: {
      type: DataTypes.JSONB,
      field: 'contact_info',
      defaultValue: {},
      comment: 'Contact details for all contact types',
      // Example structure:
      // {
      //   primary_email, emails: [], primary_phone, phones: [],
      //   website, primary_contact_person, addresses: [
      //     { type, street, unit, city, state, zipcode, country, is_primary }
      //   ]
      // }
    },
    // Metadata and management fields
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'archived'),
      defaultValue: 'active'
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      comment: 'User-defined tags for organization'
    },
    notes: {
      type: DataTypes.TEXT,
      comment: 'Internal notes about the contact'
    },
    // Usage tracking
    usageCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'usage_count',
      comment: 'How many times this contact has been used in orders'
    },
    lastUsed: {
      type: DataTypes.DATE,
      field: 'last_used',
      comment: 'When this contact was last used in an order'
    },
    // Audit fields
    createdBy: {
      type: DataTypes.STRING,
      field: 'created_by',
      comment: 'User who created this contact'
    },
    updatedBy: {
      type: DataTypes.STRING,
      field: 'updated_by',
      comment: 'User who last updated this contact'
    }
  }, {
    sequelize,
    modelName: 'GlobalContact',
    tableName: 'global_contacts',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeUpdate: (contact) => {
        // Update the lastUsed timestamp when contact is modified
        contact.lastUsed = new Date();
      }
    },
    indexes: [
      // Primary search indexes
      {
        fields: ['type', 'category']
      },
      {
        fields: ['status']
      },
      {
        fields: ['usage_count', 'last_used'],
        name: 'global_contacts_usage_idx'
      },
      // JSONB GIN indexes for efficient searching
      {
        fields: ['individual_info'],
        using: 'gin'
      },
      {
        fields: ['business_info'],
        using: 'gin'
      },
      {
        fields: ['government_info'],
        using: 'gin'
      },
      {
        fields: ['contact_info'],
        using: 'gin'
      },
      // Text search indexes
      {
        fields: ['tags'],
        using: 'gin'
      }
    ]
  });
  
  return GlobalContact;
};