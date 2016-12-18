'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'isAdmin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }).then(queryInterface.addColumn('users', 'reportedByOthersCount', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    })).then(queryInterface.addColumn('users', 'isBanned', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }));
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'isBanned').then(queryInterface.removeColumn('users', 'reportedByOthersCount')).then(queryInterface.removeColumn('users', 'isAdmin'));
  }
};