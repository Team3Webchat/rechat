'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'firstname', {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    }).then(function () {
      return queryInterface.addColumn('users', 'lastname', {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      });
    });
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'firstname').then(function () {
      return queryInterface.removeColumn('users', 'lastname');
    });
  }
};