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

var _socketioJwt = require('socketio-jwt');

var _socketioJwt2 = _interopRequireDefault(_socketioJwt);

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

var io = void 0;

var createSocket = exports.createSocket = function createSocket(app, server) {
  io = new _socket2.default(server);
  // io.set('origins', CLIENT_URL)
  // HACK FOR NOW FIX LATER
  io.set('origins', '*:*');
  io.set('match origin protocol', true);
  return io;
};

var startSocket = exports.startSocket = function startSocket(io) {
  io.sockets.on('connection', _socketioJwt2.default.authorize({
    secret: 'supersecret',
    timeout: 15000
  })).on('authenticated', connection);
};

function startChat(userId) {
  console.log('Private chat ', userId);
}

function startGroupChat(chatId) {}

function connection(socket) {
  var _this = this;

  socket.emit('dong', 'hehe');
  socket.on('ding', function () {
    return console.log('DONG');
  });
  socket.on('new_message', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data) {
      var message, author;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("new_message");
              console.log(data);
              _context.next = 4;
              return _models2.default.Message.create({
                id: _uuid2.default.v4(),
                content: data.content,
                userId: data.userId,
                chatId: data.chatId
              });

            case 4:
              message = _context.sent;


              console.log('USERS CHAT ID: ', data.chatId);
              _context.next = 8;
              return message.getUser();

            case 8:
              author = _context.sent;

              io.to(data.chatId).emit('new_message', {
                content: data.content,
                author: author.fullname(),
                userId: data.userId,
                chatId: data.chatId
              });

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  socket.on('private_conversation', function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(data) {
      var id, _ref3, _ref4, user, userToChatWith;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              id = data.id;
              _context6.next = 3;
              return Promise.all([_models2.default.User.findOne({ where: { id: socket.decoded_token.id } }), _models2.default.User.findOne({ where: { id: id } })]);

            case 3:
              _ref3 = _context6.sent;
              _ref4 = _slicedToArray(_ref3, 2);
              user = _ref4[0];
              userToChatWith = _ref4[1];


              user.getChats().then(function () {
                var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(chats) {
                  var chatsInfo, chat;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return Promise.all(chats.map(function () {
                            var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(c) {
                              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                  switch (_context2.prev = _context2.next) {
                                    case 0:
                                      _context2.t0 = c.dataValues.id;
                                      _context2.next = 3;
                                      return c.getUsers();

                                    case 3:
                                      _context2.t1 = _context2.sent;
                                      return _context2.abrupt('return', {
                                        chatId: _context2.t0,
                                        users: _context2.t1
                                      });

                                    case 5:
                                    case 'end':
                                      return _context2.stop();
                                  }
                                }
                              }, _callee2, _this);
                            }));

                            return function (_x4) {
                              return _ref6.apply(this, arguments);
                            };
                          }()));

                        case 2:
                          chatsInfo = _context3.sent;
                          chat = chatsInfo.find(function (c) {
                            console.log(c.users[1]);
                            return c.users[0].dataValues.id === user.dataValues.id && c.users[1].dataValues.id === userToChatWith.dataValues.id || c.users[1].dataValues.id === user.dataValues.id && c.users[0].dataValues.id === userToChatWith.dataValues.id;
                          });
                          return _context3.abrupt('return', chat ? chat.chatId : null);

                        case 5:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, _this);
                }));

                return function (_x3) {
                  return _ref5.apply(this, arguments);
                };
              }()).then(function () {
                var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(chatId) {
                  var chat;
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          if (!chatId) {
                            _context4.next = 4;
                            break;
                          }

                          return _context4.abrupt('return', _models2.default.Chat.findOne({ where: { id: chatId } }));

                        case 4:
                          _context4.next = 6;
                          return _models2.default.Chat.create({ id: _uuid2.default.v4() });

                        case 6:
                          chat = _context4.sent;
                          _context4.next = 9;
                          return Promise.all([chat.addUser(user), chat.addUser(userToChatWith)]);

                        case 9:
                          return _context4.abrupt('return', chat);

                        case 10:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this);
                }));

                return function (_x5) {
                  return _ref7.apply(this, arguments);
                };
              }()).then(function () {
                var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(chat) {
                  var messages;
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return chat.getMessages();

                        case 2:
                          messages = _context5.sent;

                          messages.forEach(function (m) {
                            return console.log(m.dataValues.content);
                          });
                          socket.join(chat.dataValues.id);
                          socket.emit('private_conversation_start', {
                            chatId: chat.dataValues.id
                          });

                        case 6:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _callee5, _this);
                }));

                return function (_x6) {
                  return _ref8.apply(this, arguments);
                };
              }());

              // const chats = await user.getChats()

              // const chatWithTheUser = chats.find(async chat => {
              //   const chatUsers = await chat.getUsers()

              //   return await chatUsers[0].dataValues.id === user.dataValues.id && chatUsers[1].dataValues.id === userToChatWith.dataValues.id
              //     || chatUsers[1].dataValues.id === user.dataValues.id && chatUsers[0].dataValues.id === userToChatWith.dataValues.id
              // })


              // if (chatWithTheUser !== undefined) {
              //   socket.join(chatWithTheUser.dataValues.id)
              //   console.log('Joined an existing room')
              // } else {
              //   const chat = await models.Chat.create({ id: uuid.v4()})
              //   const you = await models.User.findOne({ where: { id: socket.decoded_token.id }})
              //   await Promise.all([
              //     chat.addUser(user),
              //     chat.addUser(you)
              //   ])
              //   socket.join(chat.dataValues.id)
              //   console.log('No room existed, created it and joined')
              // }

            case 8:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
}

var __IF_YOU_REMOVE_THIS_YOU_GET_NO_DOLLARS = function () {
  var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var _ref10, _ref11, dan, benny, bennysId, dansChats, dansChatWithBenny, messages;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return Promise.all([_models2.default.User.findOne({ where: { email: 'user@test.com' } }), _models2.default.User.findOne({ where: { id: '5eea5bda-54f4-4f59-9ab4-13ddc6796d05' } })]);

          case 2:
            _ref10 = _context8.sent;
            _ref11 = _slicedToArray(_ref10, 2);
            dan = _ref11[0];
            benny = _ref11[1];
            bennysId = '36a020ab-aa50-4656-8378-654ff604e520'; // comes from request

            _context8.next = 9;
            return dan.getChats();

          case 9:
            dansChats = _context8.sent;
            _context8.next = 12;
            return dansChats.find(function () {
              var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(c) {
                var users, benny;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return c.getUsers();

                      case 2:
                        users = _context7.sent;
                        _context7.next = 5;
                        return users.find(function (u) {
                          return u.dataValues.id === bennysId;
                        });

                      case 5:
                        benny = _context7.sent;

                        if (!(benny !== undefined)) {
                          _context7.next = 8;
                          break;
                        }

                        return _context7.abrupt('return', c);

                      case 8:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, undefined);
              }));

              return function (_x7) {
                return _ref12.apply(this, arguments);
              };
            }());

          case 12:
            dansChatWithBenny = _context8.sent;
            _context8.next = 15;
            return dansChatWithBenny.getMessages();

          case 15:
            messages = _context8.sent;

          case 16:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function __IF_YOU_REMOVE_THIS_YOU_GET_NO_DOLLARS() {
    return _ref9.apply(this, arguments);
  };
}();

var __SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS = function __SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS() {
  _models2.default.User.findOne({ where: { id: '5eea5bda-54f4-4f59-9ab4-13ddc6796d05' } }).then(function (u) {
    return u;
  }).then(function (u) {
    return u.getChats();
  }).then(function (c) {
    return c[0];
  }).then(function (c) {
    return c.getMessages();
  }).then(function (c) {
    return console.log(c);
  });
};

var _SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS = function () {
  var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var _ref14, _ref15, dan, benny, dansChats, bennysChats, chat, participants, message;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return Promise.all([_models2.default.User.findOne({ where: { email: 'user@test.com' } }), _models2.default.User.findOne({ where: { id: '5eea5bda-54f4-4f59-9ab4-13ddc6796d05' } })]);

          case 2:
            _ref14 = _context9.sent;
            _ref15 = _slicedToArray(_ref14, 2);
            dan = _ref15[0];
            benny = _ref15[1];
            _context9.next = 8;
            return dan.getChats();

          case 8:
            dansChats = _context9.sent;
            _context9.next = 11;
            return benny.getChats();

          case 11:
            bennysChats = _context9.sent;
            chat = dansChats[0];
            _context9.next = 15;
            return chat.getUsers();

          case 15:
            participants = _context9.sent;


            console.log(participants);

            _context9.next = 19;
            return _models2.default.Message.create({
              id: _uuid2.default.v4(),
              content: 'This is FUCK message',
              userId: dan.dataValues.id
            });

          case 19:
            message = _context9.sent;


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
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function _SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS() {
    return _ref13.apply(this, arguments);
  };
}();

// __IF_YOU_REMOVE_THIS_YOU_GET_NO_DOLLARS()
// __SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS()
// _SECRET_METHOD_DO_NOT_USE_OR_DELETE_OR_YOU_WILL_NOT_GET_ANY_DOLLARS()