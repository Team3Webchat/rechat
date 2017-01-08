'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onDeleteConversation = exports.onPrivateConversation = exports.onPrivateGroupConversation = exports.onNewMessage = undefined;

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
              messageType: data.messageType,
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
              messageType: data.messageType,
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
var onPrivateGroupConversation = exports.onPrivateGroupConversation = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(data, socket) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            return _context4.delegateYield(regeneratorRuntime.mark(function _callee3() {
              var friends, chatId, id, from, oldChat, oldChatUsers, oldChatMessages, to, newChat, messages, friendIds, friendNames;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      friends = data.friends, chatId = data.chatId;
                      id = socket.decoded_token.id;
                      _context3.next = 4;
                      return User.findOne({ where: { id: id } });

                    case 4:
                      from = _context3.sent;
                      _context3.next = 7;
                      return Chat.find({ where: { id: chatId } }).catch(function (e) {
                        console.error(e);
                      });

                    case 7:
                      oldChat = _context3.sent;
                      _context3.next = 10;
                      return oldChat.getUsers();

                    case 10:
                      oldChatUsers = _context3.sent;
                      _context3.next = 13;
                      return oldChat.getMessages();

                    case 13:
                      oldChatMessages = _context3.sent;
                      _context3.next = 16;
                      return Promise.all(friends.map(function () {
                        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
                          var user;
                          return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                              switch (_context2.prev = _context2.next) {
                                case 0:
                                  _context2.next = 2;
                                  return User.findOne({ where: { id: id } });

                                case 2:
                                  user = _context2.sent;
                                  return _context2.abrupt('return', user);

                                case 4:
                                case 'end':
                                  return _context2.stop();
                              }
                            }
                          }, _callee2, undefined);
                        }));

                        return function (_x5) {
                          return _ref3.apply(this, arguments);
                        };
                      }()));

                    case 16:
                      to = _context3.sent;

                      /*
                      console.log('--New chat-- from: '+from.firstname);
                      console.log('oldChatUsers');
                      oldChatUsers.forEach(u => console.log(u.firstname))
                      console.log('to');
                      to.forEach(u => console.log(u.firstname))*/
                      to.push.apply(to, oldChatUsers);

                      //TODO: Kolla alla konversationer om de har to arrayn med användare i sig

                      //göra ny chatt med nya anändare
                      _context3.next = 20;
                      return Chat.create({ id: _uuid2.default.v4() });

                    case 20:
                      newChat = _context3.sent;
                      _context3.next = 23;
                      return Promise.all([
                      //newChat.addUser(from),
                      to.map(function (user) {
                        return newChat.addUser(user);
                      }), oldChatMessages.map(function (m) {
                        return newChat.addMessages(m);
                      })]);

                    case 23:
                      _context3.next = 25;
                      return newChat.getMessages();

                    case 25:
                      messages = _context3.sent;
                      _context3.next = 28;
                      return newChat.getUsers().map(function (u) {
                        return u.id;
                      });

                    case 28:
                      friendIds = _context3.sent;
                      _context3.next = 31;
                      return newChat.getUsers().map(function (u) {
                        return u.firstname + ' ' + u.lastname;
                      });

                    case 31:
                      friendNames = _context3.sent;


                      socket.join(newChat.id);
                      socket.emit('private_group_conversation_start', {
                        friendNames: friendNames,
                        friendIds: friendIds,
                        chatId: newChat.id,
                        messages: messages
                      });

                    case 34:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _callee3, undefined);
            })(), 't0', 2);

          case 2:
            _context4.next = 7;
            break;

          case 4:
            _context4.prev = 4;
            _context4.t1 = _context4['catch'](0);

            console.error(_context4.t1);

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 4]]);
  }));

  return function onPrivateGroupConversation(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var onPrivateConversation = exports.onPrivateConversation = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(data, socket) {
    var id, decoded_token, _ref5, _ref6, from, to, chats, theChat, chat, users, messages;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = data.id;
            decoded_token = socket.decoded_token;
            _context6.next = 4;
            return Promise.all([User.findOne({ where: { id: socket.decoded_token.id } }), User.findOne({ where: { id: id } })]);

          case 4:
            _ref5 = _context6.sent;
            _ref6 = _slicedToArray(_ref5, 2);
            from = _ref6[0];
            to = _ref6[1];
            _context6.t0 = Promise;
            _context6.next = 11;
            return from.getChats().map(function () {
              var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(chat) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.t0 = chat;
                        _context5.next = 3;
                        return chat.getUsers();

                      case 3:
                        _context5.t1 = _context5.sent;
                        return _context5.abrupt('return', {
                          chat: _context5.t0,
                          users: _context5.t1
                        });

                      case 5:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined);
              }));

              return function (_x8) {
                return _ref7.apply(this, arguments);
              };
            }());

          case 11:
            _context6.t1 = _context6.sent;
            _context6.next = 14;
            return _context6.t0.all.call(_context6.t0, _context6.t1);

          case 14:
            chats = _context6.sent;
            theChat = chats.find(function (c) {
              return c.users[0].dataValues.id === from.dataValues.id && c.users[1].dataValues.id === to.dataValues.id || c.users[1].dataValues.id === from.dataValues.id && c.users[0].dataValues.id === to.dataValues.id;
            });

            //theChat.users.forEach(u => console.log(u.dataValues.email))

            chat = theChat.chat, users = theChat.users; // meh

            _context6.next = 19;
            return chat.getMessages();

          case 19:
            messages = _context6.sent;

            socket.join(chat.dataValues.id);
            socket.emit('private_conversation_start', {
              friendId: id,
              chatId: chat.dataValues.id,
              messages: messages
            });

          case 22:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function onPrivateConversation(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var getWholeDate = function getWholeDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return yyyy + '-' + mm + '-' + dd;
};
var onDeleteConversation = exports.onDeleteConversation = function () {
  var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(_ref9, io, connectedUsers) {
    var chatId = _ref9.chatId,
        friendId = _ref9.friendId;
    var admin, message;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return Message.destroy({
              where: {
                chatId: chatId
              }
            });

          case 3:
            _context7.next = 5;
            return User.find({ where: { isAdmin: true } });

          case 5:
            admin = _context7.sent;
            _context7.next = 8;
            return Message.create({
              id: _uuid2.default.v4(),
              content: 'This conversation was deleted ' + getWholeDate() + '.',
              userId: admin.id,
              chatId: chatId
            });

          case 8:
            message = _context7.sent;

            io.to(connectedUsers[friendId]).emit('delete_conversation', { chatId: chatId });
            io.to(chatId).emit('new_message', {
              id: message.id,
              content: message.content,
              userId: message.userId,
              chatId: message.chatId,
              createdAt: message.createdAt,
              updatedAt: message.updatedAt
            });
            _context7.next = 16;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7['catch'](0);

            console.log(_context7.t0);

          case 16:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 13]]);
  }));

  return function onDeleteConversation(_x9, _x10, _x11) {
    return _ref8.apply(this, arguments);
  };
}();