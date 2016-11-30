'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('chatHistory', 'createdAt', {
      type: Sequelize.DATE
    }).then(queryInterface.addColumn('chatHistory', 'updatedAt', {
      type: Sequelize.DATE
    }));
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('chatHistory', 'updatedAt').then(queryInterface.removeColumn('chatHistory', 'createdAt'));
  }
};