'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
    Report = _models2.default.Report;

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
            //  .catch(err => res.json('something went wrong'))

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

            console.log(chats);
            _context10.next = 10;
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

          case 10:
            _context10.next = 12;
            return user.destroy();

          case 12:
            res.status(200).json({ message: 'Deleted kinda' });

          case 13:
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

usersRouter.route('/:id/ban').all(_auth.authenticateToken).post(function () {
  var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(req, res, next) {
    var id, currentUser;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            id = req.params.id;
            currentUser = req.user;

            if (currentUser.isAdmin) {
              _context11.next = 4;
              break;
            }

            return _context11.abrupt('return', res.status(403).json({ message: 'Unauthorized' }));

          case 4:
            _context11.next = 6;
            return User.findOne({ where: { id: id } }).then(function (user) {
              return user.update({ isBanned: true });
            });

          case 6:
            return _context11.abrupt('return', res.status(200).json({ message: 'User is now banned' }));

          case 7:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function (_x22, _x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}());

usersRouter.route('/:id/unBan').all(_auth.authenticateToken).post(function () {
  var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(req, res, next) {
    var id, currentUser;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            id = req.params.id;
            currentUser = req.user;

            if (currentUser.isAdmin) {
              _context12.next = 4;
              break;
            }

            return _context12.abrupt('return', res.status(403).json({ message: 'Unauthorized' }));

          case 4:
            _context12.next = 6;
            return User.findOne({ where: { id: id } }).then(function (user) {
              return user.update({ isBanned: false });
            });

          case 6:
            return _context12.abrupt('return', res.status(200).json({ message: 'User is now banned' }));

          case 7:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function (_x25, _x26, _x27) {
    return _ref12.apply(this, arguments);
  };
}());

usersRouter.route('/:id/friends').all(_auth.authenticateToken).get(function () {
  var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(req, res, next) {
    var id, pending, user, _ref14, _ref15, friends, friendRequests, sentRequests;

    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            id = req.params.id;
            pending = req.query.pending;
            _context13.next = 4;
            return User.findOne({ where: { id: id } });

          case 4:
            user = _context13.sent;
            _context13.next = 7;
            return _bluebird2.default.all([user.friends(), user.friendRequests(), user.sentFriendRequests()]);

          case 7:
            _ref14 = _context13.sent;
            _ref15 = _slicedToArray(_ref14, 3);
            friends = _ref15[0];
            friendRequests = _ref15[1];
            sentRequests = _ref15[2];
            return _context13.abrupt('return', res.status(200).json({ friends: friends, friendRequests: friendRequests, sentRequests: sentRequests }));

          case 13:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function (_x28, _x29, _x30) {
    return _ref13.apply(this, arguments);
  };
}()).post(function () {
  var _ref16 = _asyncToGenerator(regeneratorRuntime.mark(function _callee14(req, res, next) {
    var user, id, authorization, _ref17, _ref18, receiver, sender, friendship, sentFriendRequests;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            user = req.user;
            id = req.params.id;
            authorization = req.headers.authorization;

            if (!(id === user.id)) {
              _context14.next = 5;
              break;
            }

            return _context14.abrupt('return', res.status(400).json({ message: 'Cannot add yourself as friend' }));

          case 5:
            _context14.next = 7;
            return _bluebird2.default.all([User.findOne({ where: { id: id } }), User.findOne({ where: { id: user.id } }), Friendship.findOne({ where: { $or: [{ friendId: id, userId: user.id }, { friendId: user.id, userId: id }] } })]);

          case 7:
            _ref17 = _context14.sent;
            _ref18 = _slicedToArray(_ref17, 3);
            receiver = _ref18[0];
            sender = _ref18[1];
            friendship = _ref18[2];

            if (!friendship) {
              _context14.next = 14;
              break;
            }

            return _context14.abrupt('return', res.status(400).json({ message: 'You are already friends with this person or a friendrequest is waiting for confirmation' }));

          case 14:
            _context14.next = 16;
            return sender.addFriend(receiver);

          case 16:
            _context14.next = 18;
            return sender.sentFriendRequests();

          case 18:
            sentFriendRequests = _context14.sent;


            res.json({ message: 'Friend added!', sentFriendRequests: sentFriendRequests });

          case 20:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function (_x31, _x32, _x33) {
    return _ref16.apply(this, arguments);
  };
}());

usersRouter.route('/:id/report').all(_auth.authenticateToken).get(function () {
  var _ref19 = _asyncToGenerator(regeneratorRuntime.mark(function _callee15(req, res, next) {
    var id, currentUser, user, reports;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            id = req.params.id;
            currentUser = req.user;

            if (currentUser.isAdmin) {
              _context15.next = 4;
              break;
            }

            return _context15.abrupt('return', res.status(403).json({ message: 'Unauthorized' }));

          case 4:
            _context15.next = 6;
            return User.findOne({ where: { id: id } });

          case 6:
            user = _context15.sent;
            _context15.next = 9;
            return user.getReports();

          case 9:
            reports = _context15.sent;
            return _context15.abrupt('return', res.status(200).json({ reports: reports }));

          case 11:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  }));

  return function (_x34, _x35, _x36) {
    return _ref19.apply(this, arguments);
  };
}()).post(function () {
  var _ref20 = _asyncToGenerator(regeneratorRuntime.mark(function _callee16(req, res, next) {
    var id, message, currentUserId, friendship, report;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            id = req.params.id;
            message = req.body.message;
            currentUserId = req.user.id;
            _context16.next = 5;
            return Friendship.findOne({ where: { $or: [{ friendId: id, userId: currentUserId }, { friendId: currentUserId, userId: id }] } });

          case 5:
            friendship = _context16.sent;

            if (!(!friendship || !friendship.accepted)) {
              _context16.next = 8;
              break;
            }

            return _context16.abrupt('return', res.status(403).json({ message: 'Unauthorized' }));

          case 8:
            _context16.next = 10;
            return Report.create({ userId: id, message: message, id: _uuid2.default.v4() });

          case 10:
            report = _context16.sent;
            return _context16.abrupt('return', res.status(200).json({ report: report }));

          case 12:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  }));

  return function (_x37, _x38, _x39) {
    return _ref20.apply(this, arguments);
  };
}());

usersRouter.route('/:id/friends/:friendId').all(_auth.authenticateToken).get(function () {
  var _ref21 = _asyncToGenerator(regeneratorRuntime.mark(function _callee17(req, res, next) {
    var _req$params, id, friendId, _ref22, _ref23, friendship, friend;

    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _req$params = req.params, id = _req$params.id, friendId = _req$params.friendId;
            _context17.next = 3;
            return _bluebird2.default.all([Friendship.findOne({ where: { $or: [{ friendId: id, userId: friendId }, { friendId: friendId, userId: id }] } }), User.findOne({ where: { id: friendId } })]);

          case 3:
            _ref22 = _context17.sent;
            _ref23 = _slicedToArray(_ref22, 2);
            friendship = _ref23[0];
            friend = _ref23[1];


            if (friendship && friendship.accepted) {
              res.json({ friend: friend, friendship: friendship });
            } else {
              res.json({ message: 'No Friend Found' });
            }

          case 8:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  }));

  return function (_x40, _x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}()).put(function () {
  var _ref24 = _asyncToGenerator(regeneratorRuntime.mark(function _callee18(req, res, next) {
    var _req$params2, id, friendId, user, friendship;

    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _req$params2 = req.params, id = _req$params2.id, friendId = _req$params2.friendId;
            user = req.user;

            // We only look for requests send FROM antother user TO this user. Hence,
            // the id's need to be flipped in the query since friendId is the id of
            // the receiver

            _context18.next = 5;
            return Friendship.findOne({ where: { userId: friendId, friendId: user.id } });

          case 5:
            friendship = _context18.sent;

            if (!(!user.id === id && user.id === friendship.friendId)) {
              _context18.next = 10;
              break;
            }

            return _context18.abrupt('return', res.status(403).json({ message: 'Unauthorized' }));

          case 10:
            if (friendship) {
              _context18.next = 14;
              break;
            }

            return _context18.abrupt('return', res.status(400).json({ message: 'Nothing to be found here.. No friendrequest..' }));

          case 14:
            if (!friendship.accepted) {
              _context18.next = 16;
              break;
            }

            return _context18.abrupt('return', res.status(400).json({ message: 'You are already friends with this person' }));

          case 16:
            _context18.next = 18;
            return friendship.update({ accepted: true });

          case 18:
            return _context18.abrupt('return', res.json({ message: 'Friendship accepted', friendship: friendship }));

          case 21:
            _context18.prev = 21;
            _context18.t0 = _context18['catch'](0);

            res.status(400).json(_context18.t0); // TODO: better error message

          case 24:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined, [[0, 21]]);
  }));

  return function (_x43, _x44, _x45) {
    return _ref24.apply(this, arguments);
  };
}()).delete(function () {
  var _ref25 = _asyncToGenerator(regeneratorRuntime.mark(function _callee19(req, res, next) {
    var _req$params3, id, friendId, user, friendship;

    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            _req$params3 = req.params, id = _req$params3.id, friendId = _req$params3.friendId;
            user = req.user;
            _context19.next = 5;
            return Friendship.findOne({
              where: {
                $or: [{ friendId: id, userId: friendId }, { friendId: friendId, userId: id }]
              }
            });

          case 5:
            friendship = _context19.sent;

            if (user.id === id && (user.id === friendship.friendId || user.id === friendship.userId)) {
              _context19.next = 8;
              break;
            }

            return _context19.abrupt('return', res.status(403).json({ message: 'Unauthorized to do this action' }));

          case 8:
            _context19.next = 10;
            return friendship.destroy();

          case 10:

            res.json({
              message: 'Friendship deleted'
            });
            _context19.next = 16;
            break;

          case 13:
            _context19.prev = 13;
            _context19.t0 = _context19['catch'](0);

            res.status(400).json(_context19.t0);

          case 16:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, undefined, [[0, 13]]);
  }));

  return function (_x46, _x47, _x48) {
    return _ref25.apply(this, arguments);
  };
}());

exports.default = usersRouter;