'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        notEmpty: true,
      },
      password: {
        type: Sequelize.STRING,
        min: 6,
      },
    })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.dropTable('users')
  }
};
