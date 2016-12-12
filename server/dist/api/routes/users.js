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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_bluebird2.default.promisifyAll(_jsonwebtoken2.default);
_bluebird2.default.promisifyAll(_bcryptNodejs2.default);

var User = _models2.default.User,
    Friendship = _models2.default.Friendship;

var usersRouter = (0, _express.Router)();

usersRouter.route('/').post(function (req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password,
      firstname = _req$body.firstname,
      lastname = _req$body.lastname;
  // const reportedByOthersCount = 0
  // const isAdmin = false
  // const isBanned = false

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

usersRouter.route('/:id').all(_auth.authenticateToken).get(function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return User.findOne({ where: { id: id }, attributes: { exclude: ['password'] } });

          case 4:
            user = _context2.sent;
            return _context2.abrupt('return', res.status(200).json(user));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', res.status(400).json(_context2.t0));

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 8]]);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}()).put(function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res, next) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return User.findOne({ where: { id: req.user.dataValues.id } });

          case 2:
            user = _context3.sent;

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

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}());

usersRouter.route('/:id/report').all(_auth.authenticateToken).get(function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res, next) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return User.findOne({ where: { id: id }, attributes: { exclude: ['password'] } });

          case 4:
            user = _context4.sent;
            return _context4.abrupt('return', res.status(200).json(user));

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4['catch'](0);
            return _context4.abrupt('return', res.status(400).json(_context4.t0));

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 8]]);
  }));

  return function (_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}()).put(function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res, next) {
    var user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log(req.body.reportedByOthersCount);
            console.log(req.body);
            _context5.next = 4;
            return User.findOne({ where: { id: req.body.friendID } });

          case 4:
            user = _context5.sent;

            user.update({ reportedByOthersCount: req.body.reportedByOthersCount }).then(function () {
              return User.findOne({ where: { id: req.body.friendID } });
            }).then(function () {
              return res.json('Your reportedByOthersCount is updated');
            }).catch(function (err) {
              return res.json(err);
            });
            //  .catch(err => res.json('something went wrong'))

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}());
usersRouter.route('/:id/friends').all(_auth.authenticateToken).get(function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(req, res, next) {
    var id, pending, user, _ref7, _ref8, friends, friendRequests, sentRequests;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            pending = req.query.pending;
            _context6.next = 4;
            return User.findOne({ where: { id: id } });

          case 4:
            user = _context6.sent;
            _context6.next = 7;
            return _bluebird2.default.all([user.friends(), user.friendRequests(), user.sentFriendRequests()]);

          case 7:
            _ref7 = _context6.sent;
            _ref8 = _slicedToArray(_ref7, 3);
            friends = _ref8[0];
            friendRequests = _ref8[1];
            sentRequests = _ref8[2];
            return _context6.abrupt('return', res.status(200).json({ friends: friends, friendRequests: friendRequests, sentRequests: sentRequests }));

          case 13:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}()).post(function () {
  var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(req, res, next) {
    var user, id, authorization, _ref10, _ref11, receiver, sender, friendship, sentFriendRequests;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            user = req.user;
            id = req.params.id;
            authorization = req.headers.authorization;

            if (!(id === user.id)) {
              _context7.next = 5;
              break;
            }

            return _context7.abrupt('return', res.status(400).json({ message: 'Cannot add yourself as friend' }));

          case 5:
            _context7.next = 7;
            return _bluebird2.default.all([User.findOne({ where: { id: id } }), User.findOne({ where: { id: user.id } }), Friendship.findOne({ where: { $or: [{ friendId: id, userId: user.id }, { friendId: user.id, userId: id }] } })]);

          case 7:
            _ref10 = _context7.sent;
            _ref11 = _slicedToArray(_ref10, 3);
            receiver = _ref11[0];
            sender = _ref11[1];
            friendship = _ref11[2];

            if (!friendship) {
              _context7.next = 14;
              break;
            }

            return _context7.abrupt('return', res.status(400).json({ message: 'You are already friends with this person or a friendrequest is waiting for confirmation' }));

          case 14:
            _context7.next = 16;
            return sender.addFriend(receiver);

          case 16:
            _context7.next = 18;
            return sender.sentFriendRequests();

          case 18:
            sentFriendRequests = _context7.sent;


            res.json({ message: 'Friend added!', sentFriendRequests: sentFriendRequests });

          case 20:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x18, _x19, _x20) {
    return _ref9.apply(this, arguments);
  };
}());

usersRouter.route('/:id/friends/:friendId').all(_auth.authenticateToken).get(function () {
  var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(req, res, next) {
    var _req$params, id, friendId, _ref13, _ref14, friendship, friend;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _req$params = req.params, id = _req$params.id, friendId = _req$params.friendId;
            _context8.next = 3;
            return _bluebird2.default.all([Friendship.findOne({ where: { $or: [{ friendId: id, userId: friendId }, { friendId: friendId, userId: id }] } }), User.findOne({ where: { id: friendId } })]);

          case 3:
            _ref13 = _context8.sent;
            _ref14 = _slicedToArray(_ref13, 2);
            friendship = _ref14[0];
            friend = _ref14[1];


            if (friendship && friendship.accepted) {
              res.json({ friend: friend, friendship: friendship });
            } else {
              res.json({ message: 'No Friend Found' });
            }

          case 8:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function (_x21, _x22, _x23) {
    return _ref12.apply(this, arguments);
  };
}()).put(function () {
  var _ref15 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(req, res, next) {
    var _req$params2, id, friendId, user, friendship;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _req$params2 = req.params, id = _req$params2.id, friendId = _req$params2.friendId;
            user = req.user;

            // We only look for requests send FROM antother user TO this user. Hence,
            // the id's need to be flipped in the query since friendId is the id of
            // the receiver

            _context9.next = 5;
            return Friendship.findOne({ where: { userId: friendId, friendId: user.id } });

          case 5:
            friendship = _context9.sent;

            if (!(!user.id === id && user.id === friendship.friendId)) {
              _context9.next = 10;
              break;
            }

            return _context9.abrupt('return', res.status(403).json({ message: 'Unauthorized' }));

          case 10:
            if (friendship) {
              _context9.next = 14;
              break;
            }

            return _context9.abrupt('return', res.status(400).json({ message: 'Nothing to be found here.. No friendrequest..' }));

          case 14:
            if (!friendship.accepted) {
              _context9.next = 16;
              break;
            }

            return _context9.abrupt('return', res.status(400).json({ message: 'You are already friends with this person' }));

          case 16:
            _context9.next = 18;
            return friendship.update({ accepted: true });

          case 18:
            return _context9.abrupt('return', res.json({ message: 'Friendship accepted', friendship: friendship }));

          case 21:
            _context9.prev = 21;
            _context9.t0 = _context9['catch'](0);

            res.status(400).json(_context9.t0); // TODO: better error message

          case 24:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[0, 21]]);
  }));

  return function (_x24, _x25, _x26) {
    return _ref15.apply(this, arguments);
  };
}()).delete(function () {
  var _ref16 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(req, res, next) {
    var _req$params3, id, friendId, user, friendship;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _req$params3 = req.params, id = _req$params3.id, friendId = _req$params3.friendId;
            user = req.user;
            _context10.next = 5;
            return Friendship.findOne({
              where: {
                $or: [{ friendId: id, userId: friendId }, { friendId: friendId, userId: id }]
              }
            });

          case 5:
            friendship = _context10.sent;

            if (user.id === id && (user.id === friendship.friendId || user.id === friendship.userId)) {
              _context10.next = 8;
              break;
            }

            return _context10.abrupt('return', res.status(403).json({ message: 'Unauthorized to do this action' }));

          case 8:
            _context10.next = 10;
            return friendship.destroy();

          case 10:

            res.json({
              message: 'Friendship deleted'
            });
            _context10.next = 16;
            break;

          case 13:
            _context10.prev = 13;
            _context10.t0 = _context10['catch'](0);

            res.status(400).json(_context10.t0);

          case 16:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[0, 13]]);
  }));

  return function (_x27, _x28, _x29) {
    return _ref16.apply(this, arguments);
  };
}());

exports.default = usersRouter;