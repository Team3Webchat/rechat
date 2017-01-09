'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _express = require('express');

var _auth = require('../../lib/auth');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_bluebird2.default.promisifyAll(_jsonwebtoken2.default);
_bluebird2.default.promisifyAll(_bcryptNodejs2.default);

var User = _models2.default.User,
    Friendship = _models2.default.Friendship,
    Report = _models2.default.Report,
    Chat = _models2.default.Chat;

var usersRouter = (0, _express.Router)();

usersRouter.route('/').post(function (req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password,
      firstname = _req$body.firstname,
      lastname = _req$body.lastname;

  _bcryptNodejs2.default.genSaltAsync(10).then(function (salt) {
    return _bcryptNodejs2.default.hashAsync(password, salt, null);
  }).then(function (pw) {
    return User.create({ email: email, firstname: firstname, lastname: lastname, password: pw, reportedByOthersCount: 0, isAdmin: false, isBanned: false });
  }).then(function (user) {
    return (0, _auth.login)(req, res, next, 'Successful registration');
  }).catch(function (e) {
    if (e.name === 'SequelizeUniqueConstraintError' && e.errors[0].path === 'email') {
      return res.status(400).json({ message: 'The email is already registered' });
    }

    return res.status(400).json({ message: 'Something went wrong when registering your account' });
  });
}).all(_auth.authenticateToken).get(function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return User.findAndCountAll({ attributes: { exclude: ['password'] } });

          case 3:
            users = _context.sent;
            return _context.abrupt('return', res.status(200).json(users));

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', res.status(400).json({ message: 'Something went wrong when fetching the users, please try again' }));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

usersRouter.route('/reported').all(_auth.authenticateToken).get(function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res, next) {
    var currentUser, reportedUsers, ret;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            currentUser = req.user;

            if (currentUser.isAdmin) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt('return', res.status(403).json({ message: 'Unauthorized' }));

          case 3:
            _context4.next = 5;
            return _bluebird2.default.filter(User.findAll({ attributes: { exclude: ['password'] } }), function () {
              var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(user) {
                var reports;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return user.getReports();

                      case 2:
                        reports = _context2.sent;
                        return _context2.abrupt('return', reports.length > 0);

                      case 4:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x6) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 5:
            reportedUsers = _context4.sent;
            _context4.next = 8;
            return _bluebird2.default.all(reportedUsers.map(function () {
              var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(u) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.t0 = u;
                        _context3.next = 3;
                        return u.getReports();

                      case 3:
                        _context3.t1 = _context3.sent;
                        return _context3.abrupt('return', {
                          user: _context3.t0,
                          reports: _context3.t1
                        });

                      case 5:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x7) {
                return _ref4.apply(this, arguments);
              };
            }()));

          case 8:
            ret = _context4.sent;
            return _context4.abrupt('return', res.status(200).json({ users: ret }));

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());

usersRouter.route('/banned').all(_auth.authenticateToken).get(function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(req, res, next) {
    var currentUser, bannedUsers;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            currentUser = req.user;

            if (currentUser.isAdmin) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt('return', res.status(403).json({ message: 'Unauthorized' }));

          case 3:
            _context6.next = 5;
            return _bluebird2.default.filter(User.findAll({ attributes: { exclude: ['password'] } }), function () {
              var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(user) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        return _context5.abrupt('return', user.isBanned);

                      case 1:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined);
              }));

              return function (_x11) {
                return _ref6.apply(this, arguments);
              };
            }());

          case 5:
            bannedUsers = _context6.sent;
            return _context6.abrupt('return', res.status(200).json({ bannedUsers: bannedUsers }));

          case 7:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x8, _x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

usersRouter.route('/:id').all(_auth.authenticateToken).get(function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(req, res, next) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            id = req.params.id;
            _context7.next = 4;
            return User.findOne({ where: { id: id }, attributes: { exclude: ['password'] } });

          case 4:
            user = _context7.sent;
            return _context7.abrupt('return', res.status(200).json(user));

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7['catch'](0);
            return _context7.abrupt('return', res.status(400).json(_context7.t0));

          case 11:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 8]]);
  }));

  return function (_x12, _x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}()).put(function () {
  var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(req, res, next) {
    var user;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!(req.params.id !== req.user.dataValues.id || !req.user.isAdmin)) {
              _context8.next = 2;
              break;
            }

            return _context8.abrupt('return', res.status(403).json({ message: 'Cannot update someone elses password ' }));

          case 2:
            _context8.next = 4;
            return User.findOne({ where: { id: req.user.dataValues.id } });

          case 4:
            user = _context8.sent;

            _bcryptNodejs2.default.genSaltAsync(10).then(function (salt) {
              return _bcryptNodejs2.default.hashAsync(req.body.password, salt, null);
            }).then(function (pw) {
              return user.update({ password: pw });
            }).then(function () {
              return User.findOne({ where: { id: req.user.dataValues.id } });
            }).then(function () {
              return res.json('Your password is updated');
            }).catch(function (err) {
              return res.json(err);
            });

          case 6:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function (_x15, _x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}()).delete(function () {
  var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(req, res, next) {
    var user, id, chats;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            user = req.user;
            id = user.dataValues.id;

            if (!(id !== req.params.id && !user.isAdmin)) {
              _context10.next = 4;
              break;
            }

            return _context10.abrupt('return', res.status(403).json({ message: 'You cannot delete this account' }));

          case 4:
            _context10.next = 6;
            return user.getChats();

          case 6:
            chats = _context10.sent;
            _context10.next = 9;
            return _bluebird2.default.all(chats.map(function () {
              var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(chat) {
                var messages;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return chat.getMessages();

                      case 2:
                        messages = _context9.sent;
                        _context9.next = 5;
                        return _bluebird2.default.all(messages.map(function (message) {
                          return message.destroy();
                        }));

                      case 5:
                        _context9.next = 7;
                        return chat.destroy();

                      case 7:
                      case 'end':
                        return _context9.stop();
                    }
                  }
                }, _callee9, undefined);
              }));

              return function (_x21) {
                return _ref10.apply(this, arguments);
              };
            }()));

          case 9:
            _context10.next = 11;
            return user.destroy();

          case 11:
            res.status(200).json({ message: 'Deleted kinda' });

          case 12:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function (_x18, _x19, _x20) {
    return _ref9.apply(this, arguments);
  };
}());

usersRouter.route('/:id/groupConversations')
//.all(authenticateToken)
.get(function () {
  var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee15(req, res, next) {
    var currentUser, id, all, promiseArray;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            currentUser = req.user;
            id = req.params.id;
            //if (currentUser.id !== id)
            //  return res.status(403).json({message: 'Unauthorized'})

            _context15.next = 4;
            return Chat.findAll();

          case 4:
            all = _context15.sent;
            //TODO: where users > 2
            promiseArray = all.map(function () {
              var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee14(chat) {
                var _ret;

                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                  while (1) {
                    switch (_context14.prev = _context14.next) {
                      case 0:
                        _context14.prev = 0;
                        return _context14.delegateYield(regeneratorRuntime.mark(function _callee13() {
                          var obj, users;
                          return regeneratorRuntime.wrap(function _callee13$(_context13) {
                            while (1) {
                              switch (_context13.prev = _context13.next) {
                                case 0:
                                  obj = undefined;
                                  _context13.next = 3;
                                  return chat.getUsers();

                                case 3:
                                  users = _context13.sent;

                                  if (!(users.length > 2)) {
                                    _context13.next = 7;
                                    break;
                                  }

                                  _context13.next = 7;
                                  return users.filter(function () {
                                    var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(user) {
                                      return regeneratorRuntime.wrap(function _callee12$(_context12) {
                                        while (1) {
                                          switch (_context12.prev = _context12.next) {
                                            case 0:
                                              //För varje användare i chatten -> kolla om active användare är med
                                              if (user.id === id) {
                                                obj = new _bluebird2.default(function () {
                                                  var _ref14 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(res, rej) {
                                                    var messages, friends;
                                                    return regeneratorRuntime.wrap(function _callee11$(_context11) {
                                                      while (1) {
                                                        switch (_context11.prev = _context11.next) {
                                                          case 0:
                                                            _context11.prev = 0;
                                                            _context11.next = 3;
                                                            return chat.getMessages();

                                                          case 3:
                                                            messages = _context11.sent;
                                                            friends = users;

                                                            res({
                                                              friendNames: friends.map(function (f) {
                                                                return f.firstname + ' ' + f.lastname;
                                                              }),
                                                              friendIds: friends.map(function (f) {
                                                                return f.id;
                                                              }),
                                                              chatId: chat.id,
                                                              messages: messages
                                                            });
                                                            _context11.next = 11;
                                                            break;

                                                          case 8:
                                                            _context11.prev = 8;
                                                            _context11.t0 = _context11['catch'](0);

                                                            rej(_context11.t0);

                                                          case 11:
                                                          case 'end':
                                                            return _context11.stop();
                                                        }
                                                      }
                                                    }, _callee11, undefined, [[0, 8]]);
                                                  }));

                                                  return function (_x27, _x28) {
                                                    return _ref14.apply(this, arguments);
                                                  };
                                                }());
                                              }

                                            case 1:
                                            case 'end':
                                              return _context12.stop();
                                          }
                                        }
                                      }, _callee12, undefined);
                                    }));

                                    return function (_x26) {
                                      return _ref13.apply(this, arguments);
                                    };
                                  }());

                                case 7:
                                  return _context13.abrupt('return', {
                                    v: obj
                                  });

                                case 8:
                                case 'end':
                                  return _context13.stop();
                              }
                            }
                          }, _callee13, undefined);
                        })(), 't0', 2);

                      case 2:
                        _ret = _context14.t0;

                        if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
                          _context14.next = 5;
                          break;
                        }

                        return _context14.abrupt('return', _ret.v);

                      case 5:
                        _context14.next = 10;
                        break;

                      case 7:
                        _context14.prev = 7;
                        _context14.t1 = _context14['catch'](0);
                        return _context14.abrupt('return', res.status(404).json(_context14.t1));

                      case 10:
                      case 'end':
                        return _context14.stop();
                    }
                  }
                }, _callee14, undefined, [[0, 7]]);
              }));

              return function (_x25) {
                return _ref12.apply(this, arguments);
              };
            }());

            _bluebird2.default.all(promiseArray).then(function (values) {
              try {
                console.log('then');
                console.log(values);
                var chats = values.filter(function (c) {
                  return c;
                }); //Tar bort det som är undefined
                if (chats.length > 0) return res.status(200).json(chats);

                return res.status(204).json({ chats: 'No groupchats' });
              } catch (e) {
                console.log(e);
              }
            }).catch(function (e) {
              console.log('i catch');
              console.log(e);
            });

          case 7:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  }));

  return function (_x22, _x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}());

usersRouter.route('/:id/ban').all(_auth.authenticateToken).post(function () {
  var _ref15 = _asyncToGenerator(regeneratorRuntime.mark(function _callee16(req, res, next) {
    var id, currentUser;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            id = req.params.id;
            currentUser = req.user;

            if (currentUser.isAdmin) {
              _context16.next = 4;
              break;
            }

            return _context16.abrupt('return', res.status(403).json({ message: 'Unauthorized' }));

          case 4:
            _context16.next = 6;
            return User.findOne({ where: { id: id } }).then(function (user) {
              return user.update({ isBanned: true });
            });

          case 6:
            return _context16.abrupt('return', res.status(200).json({ message: 'User is now banned' }));

          case 7:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  }));

  return function (_x29, _x30, _x31) {
    return _ref15.apply(this, arguments);
  };
}());

usersRouter.route('/:id/unBan').all(_auth.authenticateToken).post(function () {
  var _ref16 = _asyncToGenerator(regeneratorRuntime.mark(function _callee17(req, res, next) {
    var id, currentUser;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            id = req.params.id;
            currentUser = req.user;

            if (currentUser.isAdmin) {
              _context17.next = 4;
              break;
            }

            return _context17.abrupt('return', res.status(403).json({ message: 'Unauthorized' }));

          case 4:
            _context17.next = 6;
            return User.findOne({ where: { id: id } }).then(function (user) {
              return user.update({ isBanned: false });
            });

          case 6:
            return _context17.abrupt('return', res.status(200).json({ message: 'User is now banned' }));

          case 7:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  }));

  return function (_x32, _x33, _x34) {
    return _ref16.apply(this, arguments);
  };
}());

usersRouter.route('/:id/friends').all(_auth.authenticateToken).get(function () {
  var _ref17 = _asyncToGenerator(regeneratorRuntime.mark(function _callee18(req, res, next) {
    var id, pending, user, _ref18, _ref19, friends, friendRequests, sentRequests;

    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            id = req.params.id;
            pending = req.query.pending;
            _context18.next = 4;
            return User.findOne({ where: { id: id } });

          case 4:
            user = _context18.sent;
            _context18.next = 7;
            return _bluebird2.default.all([user.friends(), user.friendRequests(), user.sentFriendRequests()]);

          case 7:
            _ref18 = _context18.sent;
            _ref19 = _slicedToArray(_ref18, 3);
            friends = _ref19[0];
            friendRequests = _ref19[1];
            sentRequests = _ref19[2];
            return _context18.abrupt('return', res.status(200).json({ friends: friends, friendRequests: friendRequests, sentRequests: sentRequests }));

          case 13:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  }));

  return function (_x35, _x36, _x37) {
    return _ref17.apply(this, arguments);
  };
}()).post(function () {
  var _ref20 = _asyncToGenerator(regeneratorRuntime.mark(function _callee19(req, res, next) {
    var user, id, authorization, _ref21, _ref22, receiver, sender, friendship, sentFriendRequests;

    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            user = req.user;
            id = req.params.id;
            authorization = req.headers.authorization;

            if (!(id === user.id)) {
              _context19.next = 5;
              break;
            }

            return _context19.abrupt('return', res.status(400).json({ message: 'Cannot add yourself as friend' }));

          case 5:
            _context19.next = 7;
            return _bluebird2.default.all([User.findOne({ where: { id: id } }), User.findOne({ where: { id: user.id } }), Friendship.findOne({ where: { $or: [{ friendId: id, userId: user.id }, { friendId: user.id, userId: id }] } })]);

          case 7:
            _ref21 = _context19.sent;
            _ref22 = _slicedToArray(_ref21, 3);
            receiver = _ref22[0];
            sender = _ref22[1];
            friendship = _ref22[2];

            if (!friendship) {
              _context19.next = 14;
              break;
            }

            return _context19.abrupt('return', res.status(400).json({ message: 'You are already friends with this person or a friendrequest is waiting for confirmation' }));

          case 14:
            _context19.next = 16;
            return sender.addFriend(receiver);

          case 16:
            _context19.next = 18;
            return sender.sentFriendRequests();

          case 18:
            sentFriendRequests = _context19.sent;


            res.json({ message: 'Friend added!', sentFriendRequests: sentFriendRequests });

          case 20:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, undefined);
  }));

  return function (_x38, _x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}());

usersRouter.route('/:id/report').all(_auth.authenticateToken).get(function () {
  var _ref23 = _asyncToGenerator(regeneratorRuntime.mark(function _callee20(req, res, next) {
    var id, currentUser, user, reports;
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            id = req.params.id;
            currentUser = req.user;

            if (currentUser.isAdmin) {
              _context20.next = 5;
              break;
            }

            if (!(id !== currentUser.id)) {
              _context20.next = 5;
              break;
            }

            return _context20.abrupt('return', res.status(403).json({ message: 'Unauthorized' }));

          case 5:
            _context20.next = 7;
            return User.findOne({ where: { id: id } });

          case 7:
            user = _context20.sent;
            _context20.next = 10;
            return user.getReports();

          case 10:
            reports = _context20.sent;

            console.log(reports);
            return _context20.abrupt('return', res.status(200).json({ reports: reports }));

          case 13:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, undefined);
  }));

  return function (_x41, _x42, _x43) {
    return _ref23.apply(this, arguments);
  };
}()).post(function () {
  var _ref24 = _asyncToGenerator(regeneratorRuntime.mark(function _callee21(req, res, next) {
    var id, message, currentUserId, friendship, report;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            id = req.params.id;
            message = req.body.message;
            currentUserId = req.user.id;
            _context21.next = 5;
            return Friendship.findOne({ where: { $or: [{ friendId: id, userId: currentUserId }, { friendId: currentUserId, userId: id }] } });

          case 5:
            friendship = _context21.sent;

            if (!(!friendship || !friendship.accepted)) {
              _context21.next = 8;
              break;
            }

            return _context21.abrupt('return', res.status(403).json({ message: 'Unauthorized' }));

          case 8:
            _context21.next = 10;
            return Report.create({ userId: id, message: message, id: _uuid2.default.v4() });

          case 10:
            report = _context21.sent;
            return _context21.abrupt('return', res.status(200).json({ report: report }));

          case 12:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, undefined);
  }));

  return function (_x44, _x45, _x46) {
    return _ref24.apply(this, arguments);
  };
}());

usersRouter.route('/:id/friends/:friendId').all(_auth.authenticateToken).get(function () {
  var _ref25 = _asyncToGenerator(regeneratorRuntime.mark(function _callee22(req, res, next) {
    var _req$params, id, friendId, _ref26, _ref27, friendship, friend;

    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _req$params = req.params, id = _req$params.id, friendId = _req$params.friendId;
            _context22.next = 3;
            return _bluebird2.default.all([Friendship.findOne({ where: { $or: [{ friendId: id, userId: friendId }, { friendId: friendId, userId: id }] } }), User.findOne({ where: { id: friendId } })]);

          case 3:
            _ref26 = _context22.sent;
            _ref27 = _slicedToArray(_ref26, 2);
            friendship = _ref27[0];
            friend = _ref27[1];


            if (friendship && friendship.accepted) {
              res.json({ friend: friend, friendship: friendship });
            } else {
              res.json({ message: 'No Friend Found' });
            }

          case 8:
          case 'end':
            return _context22.stop();
        }
      }
    }, _callee22, undefined);
  }));

  return function (_x47, _x48, _x49) {
    return _ref25.apply(this, arguments);
  };
}()).put(function () {
  var _ref28 = _asyncToGenerator(regeneratorRuntime.mark(function _callee23(req, res, next) {
    var _req$params2, id, friendId, user, friendship;

    return regeneratorRuntime.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
            _req$params2 = req.params, id = _req$params2.id, friendId = _req$params2.friendId;
            user = req.user;

            // We only look for requests send FROM antother user TO this user. Hence,
            // the id's need to be flipped in the query since friendId is the id of
            // the receiver

            _context23.next = 5;
            return Friendship.findOne({ where: { userId: friendId, friendId: user.id } });

          case 5:
            friendship = _context23.sent;

            if (!(!user.id === id && user.id === friendship.friendId)) {
              _context23.next = 10;
              break;
            }

            return _context23.abrupt('return', res.status(403).json({ message: 'Unauthorized' }));

          case 10:
            if (friendship) {
              _context23.next = 14;
              break;
            }

            return _context23.abrupt('return', res.status(400).json({ message: 'Nothing to be found here.. No friendrequest..' }));

          case 14:
            if (!friendship.accepted) {
              _context23.next = 16;
              break;
            }

            return _context23.abrupt('return', res.status(400).json({ message: 'You are already friends with this person' }));

          case 16:
            _context23.next = 18;
            return friendship.update({ accepted: true });

          case 18:
            return _context23.abrupt('return', res.json({ message: 'Friendship accepted', friendship: friendship }));

          case 21:
            _context23.prev = 21;
            _context23.t0 = _context23['catch'](0);

            res.status(400).json(_context23.t0); // TODO: better error message

          case 24:
          case 'end':
            return _context23.stop();
        }
      }
    }, _callee23, undefined, [[0, 21]]);
  }));

  return function (_x50, _x51, _x52) {
    return _ref28.apply(this, arguments);
  };
}()).delete(function () {
  var _ref29 = _asyncToGenerator(regeneratorRuntime.mark(function _callee24(req, res, next) {
    var _req$params3, id, friendId, user, friendship;

    return regeneratorRuntime.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            _context24.prev = 0;
            _req$params3 = req.params, id = _req$params3.id, friendId = _req$params3.friendId;
            user = req.user;
            _context24.next = 5;
            return Friendship.findOne({
              where: {
                $or: [{ friendId: id, userId: friendId }, { friendId: friendId, userId: id }]
              }
            });

          case 5:
            friendship = _context24.sent;

            if (user.id === id && (user.id === friendship.friendId || user.id === friendship.userId)) {
              _context24.next = 8;
              break;
            }

            return _context24.abrupt('return', res.status(403).json({ message: 'Unauthorized to do this action' }));

          case 8:
            _context24.next = 10;
            return friendship.destroy();

          case 10:

            res.json({
              message: 'Friendship deleted'
            });
            _context24.next = 16;
            break;

          case 13:
            _context24.prev = 13;
            _context24.t0 = _context24['catch'](0);

            res.status(400).json(_context24.t0);

          case 16:
          case 'end':
            return _context24.stop();
        }
      }
    }, _callee24, undefined, [[0, 13]]);
  }));

  return function (_x53, _x54, _x55) {
    return _ref29.apply(this, arguments);
  };
}());

exports.default = usersRouter;