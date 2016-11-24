'use strict';

var bcrypt = require('bcrypt-nodejs');
var uuid = require('uuid');

module.exports = {
  up: function up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('users', [{
      id: uuid.v4(),
      email: 'user@test.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      createdAt: new Date(),
      updatedAt: new Date(),
      firstname: 'Benny',
      lastname: 'Svensson'
    }, {
      id: uuid.v4(),
      email: 'dan@test.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      createdAt: new Date(),
      updatedAt: new Date(),
      firstname: 'Dan',
      lastname: 'Abramov'
    }, {
      id: uuid.v4(),
      email: 'alex@test.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      createdAt: new Date(),
      updatedAt: new Date(),
      firstname: 'Alex',
      lastname: 'Driaguine'
    }, {
      id: uuid.v4(),
      email: 'linus@test.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      createdAt: new Date(),
      updatedAt: new Date(),
      firstname: 'Linus',
      lastname: 'Torvalds'
    }], {});
  },

  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

    return queryInterface.bulkDelete('users', null, {});
  }
};