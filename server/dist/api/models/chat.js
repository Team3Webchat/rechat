'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Chat = sequelize.define('chat', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
      unique: true,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        models.Chat.belongsToMany(models.User, {
          through: models.ChatParticipant,
          as: 'users'
        });
      }
    },
    instanceMethods: {
      getMessages: function getMessages() {
        var _this = this;

        return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
          var messages;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log(_this.chatParticipant);
                  _context.next = 3;
                  return _this.chatParticipant.getChatHistory();

                case 3:
                  messages = _context.sent;
                  return _context.abrupt('return', messages);

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }))();
      },
      clearHistory: function clearHistory() {
        var _this2 = this;

        return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
          var messages;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this2.chatParticipant.getChatHistory();

                case 2:
                  messages = _context2.sent;

                  messages.destroy();

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }))();
      }
    }
  });
  return Chat;
};

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

console.log(_models2.default);