'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'firstname',
      {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      }
    )
    .then(() => {
      return queryInterface.addColumn('users', 'lastname', 
        {
          type: Sequelize.STRING,
          allowNull: false,
          notEmpty: true
        })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'firstname')
      .then(() => {
        return queryInterface.removeColumn('users', 'lastname')
      })
  }
};
