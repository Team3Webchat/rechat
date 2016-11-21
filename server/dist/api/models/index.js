'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sequelize = exports.sequelize = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../../config/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'development';
var _db$env = _db2.default[env],
    database = _db$env.database,
    username = _db$env.username,
    password = _db$env.password,
    host = _db$env.host,
    dialect = _db$env.dialect;


var sequelize = new _sequelize2.default(database, username, password, {
  host: host,
  dialect: dialect
});

var models = {};

_fs2.default.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== 'index.js';
}).forEach(function (file) {
  var model = sequelize.import(_path2.default.join(__dirname, file));
  models[model.name] = model;
});

Object.keys(models).forEach(function (model) {
  if ('associate' in models[model]) {
    models[model].associate(models);
  }
});

exports.default = models;
exports.sequelize = sequelize;
exports.Sequelize = _sequelize2.default;