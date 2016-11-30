'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('messages', {
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
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'users', key: 'id'}
        }
    })
    .then(() => queryInterface.createTable('chatHistory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      messageId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'messages', key: 'id' }
      },
      chatParticipantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'chatParticipants', key: 'id' }
      }
    }))
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return queryInterface.dropTable('chatHistory').then(queryInterface.dropTable('messages'))
  }
};
