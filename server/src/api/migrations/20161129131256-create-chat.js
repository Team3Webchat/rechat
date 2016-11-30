'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('chats', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => {
      return queryInterface.createTable('chatParticipants', {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        chatId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'chats', key: 'id' },
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'users', key: 'id'}
        }
      })
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('chatUsers')
      .then(() => queryInterface.dropTable('chatUsers'));
  }
};