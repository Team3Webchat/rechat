'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onDeleteConversation = exports.onPrivateConversation = exports.onNewMessage = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _models = require('../api/models');

var _models2 = _interopRequireDefault(_models);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = _models2.default.User,
    Message = _models2.default.Message,
    ChatParticipant = _models2.default.ChatParticipant,
    ChatHistory = _models2.default.ChatHistory,
    Chat = _models2.default.Chat;
var onNewMessage = exports.onNewMessage = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data, io) {
    var message, author;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Message.create({
              id: _uuid2.default.v4(),
              content: data.content,
              userId: data.userId,
              chatId: data.chatId
            });

          case 2:
            message = _context.sent;
            _context.next = 5;
            return message.getUser();

          case 5:
            author = _context.sent;


            io.to(data.chatId).emit('new_message', {
              id: message.dataValues.id,
              content: data.content,
              userId: data.userId,
              chatId: data.chatId,
              createdAt: message.dataValues.createdAt,
              updatedAt: message.dataValues.updatedAt
            });

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function onNewMessage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var onPrivateConversation = exports.onPrivateConversation = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(data, socket) {
    var id, decoded_token, _ref3, _ref4, from, to, chats, theChat, chat, users, messages, _chat;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = data.id;
            decoded_token = socket.decoded_token;
            _context3.next = 4;
            return Promise.all([User.findOne({ where: { id: socket.decoded_token.id } }), User.findOne({ where: { id: id } })]);

          case 4:
            _ref3 = _context3.sent;
            _ref4 = _slicedToArray(_ref3, 2);
            from = _ref4[0];
            to = _ref4[1];
            _context3.t0 = Promise;
            _context3.next = 11;
            return from.getChats().map(function () {
              var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(chat) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.t0 = chat;
                        _context2.next = 3;
                        return chat.getUsers();

                      case 3:
                        _context2.t1 = _context2.sent;
                        return _context2.abrupt('return', {
                          chat: _context2.t0,
                          users: _context2.t1
                        });

                      case 5:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x5) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 11:
            _context3.t1 = _context3.sent;
            _context3.next = 14;
            return _context3.t0.all.call(_context3.t0, _context3.t1);

          case 14:
            chats = _context3.sent;
            theChat = chats.find(function (c) {
              return c.users[0].dataValues.id === from.dataValues.id && c.users[1].dataValues.id === to.dataValues.id || c.users[1].dataValues.id === from.dataValues.id && c.users[0].dataValues.id === to.dataValues.id;
            });

            if (!theChat) {
              _context3.next = 25;
              break;
            }

            chat = theChat.chat, users = theChat.users; // meh

            _context3.next = 20;
            return chat.getMessages();

          case 20:
            messages = _context3.sent;

            socket.join(chat.dataValues.id);
            socket.emit('private_conversation_start', {
              friendId: id,
              chatId: chat.dataValues.id,
              messages: messages
            });
            _context3.next = 32;
            break;

          case 25:
            _context3.next = 27;
            return Chat.create({ id: _uuid2.default.v4() });

          case 27:
            _chat = _context3.sent;
            _context3.next = 30;
            return Promise.all([_chat.addUser(from), _chat.addUser(to)]);

          case 30:
            socket.join(_chat.dataValues.id);
            socket.emit('private_conversation_start', {
              friendId: id,
              chatId: _chat.dataValues.id,
              messages: []
            });

          case 32:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function onPrivateConversation(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var onDeleteConversation = exports.onDeleteConversation = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(_ref7, io) {
    var chatId = _ref7.chatId;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            //Delete conversation
            Message.destroy({
              where: {
                chatId: chatId
              }
            });

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function onDeleteConversation(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();