'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create global_contacts table
    await queryInterface.createTable('global_contacts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      type: {
        type: Sequelize.ENUM('individual', 'business', 'government'),
        allowNull: false,
        comment: 'Determines which data structure to use'
      },
      category: {
        type: Sequelize.ENUM(
          'buyer', 'seller', 'lender', 'mortgage_brokerage', 
          'selling_agency', 'listing_agency', 'recording_office', 
          'tax_authority', 'title_abstractor', 'surveying_firm', 'other'
        ),
        allowNull: false,
        comment: 'Contact category matching UI tabs'
      },
      individual_info: {
        type: Sequelize.JSONB,
        defaultValue: {},
        comment: 'Personal information for individual contacts'
      },
      business_info: {
        type: Sequelize.JSONB,
        defaultValue: {},
        comment: 'Business information for company contacts'
      },
      government_info: {
        type: Sequelize.JSONB,
        defaultValue: {},
        comment: 'Government office information'
      },
      contact_info: {
        type: Sequelize.JSONB,
        defaultValue: {},
        comment: 'Contact details for all contact types'
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'archived'),
        defaultValue: 'active'
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        comment: 'User-defined tags for organization'
      },
      notes: {
        type: Sequelize.TEXT,
        comment: 'Internal notes about the contact'
      },
      usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: 'How many times this contact has been used in orders'
      },
      last_used: {
        type: Sequelize.DATE,
        comment: 'When this contact was last used in an order'
      },
      created_by: {
        type: Sequelize.STRING,
        comment: 'User who created this contact'
      },
      updated_by: {
        type: Sequelize.STRING,
        comment: 'User who last updated this contact'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });

    // Create indexes for global_contacts
    await queryInterface.addIndex('global_contacts', ['type', 'category']);
    await queryInterface.addIndex('global_contacts', ['status']);
    await queryInterface.addIndex('global_contacts', ['usage_count', 'last_used'], {
      name: 'global_contacts_usage_idx'
    });
    
    // Create GIN indexes for JSONB columns
    await queryInterface.addIndex('global_contacts', ['individual_info'], {
      using: 'gin'
    });
    await queryInterface.addIndex('global_contacts', ['business_info'], {
      using: 'gin'
    });
    await queryInterface.addIndex('global_contacts', ['government_info'], {
      using: 'gin'
    });
    await queryInterface.addIndex('global_contacts', ['contact_info'], {
      using: 'gin'
    });
    await queryInterface.addIndex('global_contacts', ['tags'], {
      using: 'gin'
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop indexes first
    await queryInterface.removeIndex('global_contacts', ['type', 'category']);
    await queryInterface.removeIndex('global_contacts', ['status']);
    await queryInterface.removeIndex('global_contacts', 'global_contacts_usage_idx');
    await queryInterface.removeIndex('global_contacts', ['individual_info']);
    await queryInterface.removeIndex('global_contacts', ['business_info']);
    await queryInterface.removeIndex('global_contacts', ['government_info']);
    await queryInterface.removeIndex('global_contacts', ['contact_info']);
    await queryInterface.removeIndex('global_contacts', ['tags']);
    
    // Drop table
    await queryInterface.dropTable('global_contacts');
    
    // Drop ENUM types
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_global_contacts_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_global_contacts_category";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_global_contacts_status";');
  }
};