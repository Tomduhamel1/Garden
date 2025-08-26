'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create order_contact_links table
    await queryInterface.createTable('order_contact_links', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      global_contact_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'global_contacts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Role in the order: borrower_0, seller_1, lender, etc.'
      },
      order_specific_overrides: {
        type: Sequelize.JSONB,
        defaultValue: {},
        comment: 'Order-specific data that overrides global contact information'
      },
      linked_by: {
        type: Sequelize.STRING,
        comment: 'User who linked this contact to the order'
      },
      linked_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: 'When this contact was linked to the order'
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

    // Create indexes for order_contact_links
    
    // Unique constraint: one contact per role per order
    await queryInterface.addIndex('order_contact_links', ['order_id', 'role'], {
      unique: true,
      name: 'unique_order_role'
    });
    
    // Lookup indexes
    await queryInterface.addIndex('order_contact_links', ['order_id']);
    await queryInterface.addIndex('order_contact_links', ['global_contact_id']);
    await queryInterface.addIndex('order_contact_links', ['role']);
    
    // JSONB index for overrides
    await queryInterface.addIndex('order_contact_links', ['order_specific_overrides'], {
      using: 'gin'
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop indexes first
    await queryInterface.removeIndex('order_contact_links', 'unique_order_role');
    await queryInterface.removeIndex('order_contact_links', ['order_id']);
    await queryInterface.removeIndex('order_contact_links', ['global_contact_id']);
    await queryInterface.removeIndex('order_contact_links', ['role']);
    await queryInterface.removeIndex('order_contact_links', ['order_specific_overrides']);
    
    // Drop table
    await queryInterface.dropTable('order_contact_links');
  }
};