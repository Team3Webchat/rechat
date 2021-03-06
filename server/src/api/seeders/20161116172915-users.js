'use strict';
const bcrypt = require('bcrypt-nodejs')
const uuid = require('uuid')

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('users', [
      {
        id: uuid.v4(),
        email: 'admin@rechat.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date(),
        firstname: 'Admin',
        lastname: 'Adminsson',
        isAdmin: true,
        isBanned: false
      }
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

    return queryInterface.bulkDelete('users', null, {})
  }
};
