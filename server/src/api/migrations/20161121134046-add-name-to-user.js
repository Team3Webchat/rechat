'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users',
      'firstname',
      {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      }
    )
    .then(() => {
      return queryInterface.addColumn('Users', 'lastname', 
        {
          type: Sequelize.STRING,
          allowNull: false,
          notEmpty: true
        })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'firstname')
      .then(() => {
        return queryInterface.removeColumn('Users', 'lastname')
      })
  }
};
