'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'firstname', {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    }).then(function () {
      return queryInterface.addColumn('Users', 'lastname', {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      });
    });
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'firstname').then(function () {
      return queryInterface.removeColumn('Users', 'lastname');
    });
  }
};