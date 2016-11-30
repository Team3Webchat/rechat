'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'chatHistory',
      'createdAt',
      {
        type: Sequelize.DATE,
        // allowNull: false,
      }
    )
    .then(queryInterface.addColumn(
      'chatHistory',
      'updatedAt', 
      {
        type: Sequelize.DATE,
        // allowNull: false
      }
    ))
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'chatHistory',
      'updatedAt'
    )
    .then(queryInterface.removeColumn(
      'chatHistory',
      'createdAt'
    ))
  }
};
