'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.renameTable('chatHistory', 'chatHistories');
  },

  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.renameTable('chatHistories', 'chatHistory');
  }
};