'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      order_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      status: {
        type: Sequelize.ENUM(
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
      closing_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      property_address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      // JSONB columns for complex nested data
      cdf_data: {
        type: Sequelize.JSONB,
        defaultValue: {},
        allowNull: false,
        comment: 'Stores all CDF namespace data (sections A-N of Closing Disclosure)'
      },
      contacts_data: {
        type: Sequelize.JSONB,
        defaultValue: {},
        allowNull: false,
        comment: 'Stores borrowers, sellers, agents, lenders, title companies'
      },
      properties_data: {
        type: Sequelize.JSONB,
        defaultValue: {},
        allowNull: false,
        comment: 'Stores property details, legal descriptions, tax info'
      },
      payoffs_data: {
        type: Sequelize.JSONB,
        defaultValue: {},
        allowNull: false,
        comment: 'Stores existing loan payoffs'
      },
      calculations_data: {
        type: Sequelize.JSONB,
        defaultValue: {},
        allowNull: false,
        comment: 'Stores all calculated values and summaries'
      },
      documents_data: {
        type: Sequelize.JSONB,
        defaultValue: {},
        allowNull: false,
        comment: 'Stores generated document references and metadata'
      },
      audit_log: {
        type: Sequelize.JSONB,
        defaultValue: [],
        allowNull: false,
        comment: 'Tracks all changes and user actions'
      },
      // Metadata fields
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: true
      },
      updated_by: {
        type: Sequelize.STRING,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      is_locked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      locked_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      locked_by: {
        type: Sequelize.STRING,
        allowNull: true
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

    // Add indexes for better query performance
    await queryInterface.addIndex('orders', ['order_number'], {
      unique: true,
      name: 'orders_order_number_unique'
    });
    
    await queryInterface.addIndex('orders', ['status'], {
      name: 'orders_status_index'
    });
    
    await queryInterface.addIndex('orders', ['closing_date'], {
      name: 'orders_closing_date_index'
    });
    
    await queryInterface.addIndex('orders', ['user_id'], {
      name: 'orders_user_id_index'
    });

    // GIN indexes for JSONB columns (PostgreSQL specific)
    await queryInterface.sequelize.query(
      'CREATE INDEX orders_cdf_data_gin ON orders USING gin (cdf_data);'
    );
    
    await queryInterface.sequelize.query(
      'CREATE INDEX orders_contacts_data_gin ON orders USING gin (contacts_data);'
    );
  },

  async down(queryInterface, Sequelize) {
    // Drop indexes first
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS orders_cdf_data_gin;');
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS orders_contacts_data_gin;');
    
    // Drop the table
    await queryInterface.dropTable('orders');
  }
};