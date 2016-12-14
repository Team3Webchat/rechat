'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('friendships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accepted: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        onDelete: 'cascade'
      },
      friendId: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        onDelete: 'cascade'
        
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('friendships');
  }
};