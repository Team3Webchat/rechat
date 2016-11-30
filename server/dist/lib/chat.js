'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startSocket = exports.createSocket = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _models = require('../api/models');

var _models2 = _interopRequireDefault(_models);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = _models2.default.User,
    Message = _models2.default.Message,
    ChatParticipant = _models2.default.ChatParticipant,
    ChatHistory = _models2.default.ChatHistory,
    Chat = _models2.default.Chat;
var createSocket = exports.createSocket = function createSocket(app, server) {
  var io = new _socket2.default(server);
  io.set('origins', _config.CLIENT_URL);
  return io;
};

var startSocket = exports.startSocket = function startSocket(io) {
  io.on('connection', connection);
};

function startChat(userId) {
  console.log('Private chat ', userId);
}

function startGroupChat(chatId) {}

function connection(socket) {
  socket.emit('dong', 'hehe');
  socket.on('ding', function () {
    return console.log('DONG');
  });
}

var __IF_YOU_REMOVE_THIS_YOU_GET_NO_DOLLARS = function __IF_YOU_REMOVE_THIS_YOU_GET_NO_DOLLARS() {
  _models2.default.User.findOne({ where: { email: 'user@test.com' } }).then(function (u) {
    return u.getChats();
  }).then(function (c) {
    return c[0];
  }).then(function (c) {
    return c.getMessages();
  }).then(function (m) {
    var messages = m.map(function (message) {
      return message.dataValues.content;
    });
    console.log(messages);
  });
};

var __SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS = function __SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS() {
  _models2.default.User.findOne({ where: { id: '5eea5bda-54f4-4f59-9ab4-13ddc6796d05' } }).then(function (u) {
    return u;
  }).then(function (u) {
    return u.getChats();
  }).then(function (c) {
    return c[0];
  }).then(function (c) {
    return c.chatParticipant.id;
  }).then(function (id) {
    return _models2.default.ChatHistory.destroy({ where: { chatParticipantId: id } });
  }).then(function (r) {
    return console.log(r);
  });
};

var _SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var _ref2, _ref3, dan, benny, dansChats, bennysChats, chat, participants, message;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.all([_models2.default.User.findOne({ where: { email: 'user@test.com' } }), _models2.default.User.findOne({ where: { id: '5eea5bda-54f4-4f59-9ab4-13ddc6796d05' } })]);

          case 2:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            dan = _ref3[0];
            benny = _ref3[1];
            _context.next = 8;
            return dan.getChats();

          case 8:
            dansChats = _context.sent;
            _context.next = 11;
            return benny.getChats();

          case 11:
            bennysChats = _context.sent;
            chat = dansChats[0];
            _context.next = 15;
            return chat.getUsers();

          case 15:
            participants = _context.sent;


            console.log(participants);

            _context.next = 19;
            return _models2.default.Message.create({
              id: uuid.v4(),
              content: 'This is FUCK message',
              userId: dan.dataValues.id
            });

          case 19:
            message = _context.sent;


            _models2.default.ChatHistory.create({
              messageId: message.dataValues.id,
              chatParticipantId: participants[0].chatParticipant.dataValues.id
            }).then(_models2.default.ChatHistory.create({
              messageId: message.dataValues.id,
              chatParticipantId: participants[1].chatParticipant.dataValues.id
            })).catch(function (err) {
              return console.log(err);
            });

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function _SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS() {
    return _ref.apply(this, arguments);
  };
}();