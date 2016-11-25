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

var User = _models2.default.User,
    Friendship = _models2.default.Friendship;

var usersRouter = (0, _express.Router)();

usersRouter.route('/').post(function (req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password,
      firstname = _req$body.firstname,
      lastname = _req$body.lastname;

  User.create({
    email: email,
    firstname: firstname,
    lastname: lastname,
    password: _bcryptNodejs2.default.hashSync(password, _bcryptNodejs2.default.genSaltSync(10)) }).then(function (result) {
    return (0, _auth.login)(req, res, next, 'Sucessful registration!');
    // return res.status(200).json({ message: 'Successful registration'})
  }).catch(function (err) {
    if (err.name === 'SequelizeUniqueConstraintError' && err.errors[0].path === 'email') {
      return res.status(400).json({ message: 'The email is already registered' });
    }
    return res.status(400).json(err);
  });
}).all(_auth.authenticateToken).get(function (req, res) {
  User.findAndCountAll({ attributes: { exclude: ['password'] } }).then(function (result) {
    return res.json(result);
  }).catch(function (err) {
    return res.json(err);
  });
});

usersRouter.route('/:id')
// .all(authenticateToken)
.get(function (req, res, next) {
  var id = req.params.id;

  User.findOne({ where: { id: id }, attributes: { exclude: ['password'] } }).then(function (u) {
    return res.json(u);
  }).catch(function (err) {
    return res.json(err);
  });
}).put(function (req, res, next) {
  return res.json('/users/:id/ PUT is not implemented yet');
});

usersRouter.route('/:id/friends').all(_auth.authenticateToken).get(function (req, res, next) {
  var id = req.params.id;
  var pending = req.query.pending;

  User.findOne({ where: { id: id } }).then(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(u) {
      var _ref2, _ref3, friends, friendRequests, sentRequests;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _bluebird2.default.all([u.friends(), u.friendRequests(), u.sentFriendRequests()]);

            case 2:
              _ref2 = _context.sent;
              _ref3 = _slicedToArray(_ref2, 3);
              friends = _ref3[0];
              friendRequests = _ref3[1];
              sentRequests = _ref3[2];

              res.json({
                friends: friends, friendRequests: friendRequests, sentRequests: sentRequests
              });

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()).catch(function (err) {
    return console.log(err);
  });
}).post(function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
    var id, authorization, token, decoded, _ref5, _ref6, receiver, sender, friendship, sentFriendRequests;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            authorization = req.headers.authorization;
            token = authorization.split(' ')[1];
            _context2.next = 5;
            return _jsonwebtoken2.default.verifyAsync(token, 'supersecret');

          case 5:
            decoded = _context2.sent;

            if (!(id === decoded.id)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt('return', res.status(400).json({ message: 'Cannot add yourself as friend' }));

          case 8:
            _context2.next = 10;
            return _bluebird2.default.all([User.findOne({ where: { id: id } }), User.findOne({ where: { id: decoded.id } }), Friendship.findOne({ where: { $or: [{ friendId: id, userId: decoded.id }, { friendId: decoded.id, userId: id }] } })]);

          case 10:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 3);
            receiver = _ref6[0];
            sender = _ref6[1];
            friendship = _ref6[2];

            console.log(friendship);

            if (!friendship) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt('return', res.status(400).json({ message: 'You are already friends with this person or a friendrequest is waiting for confirmation' }));

          case 18:
            _context2.next = 20;
            return sender.addFriend(receiver);

          case 20:
            _context2.next = 22;
            return sender.sentFriendRequests();

          case 22:
            sentFriendRequests = _context2.sent;


            res.json({ message: 'Friend added!', sentFriendRequests: sentFriendRequests });

          case 24:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2, _x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}());

usersRouter.route('/:id/friends/:friendId')
//.all(authenticateToken)
.get(function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res, next) {
    var _req$params, id, friendId, _ref8, _ref9, friendship, friend;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$params = req.params, id = _req$params.id, friendId = _req$params.friendId;
            _context3.next = 3;
            return _bluebird2.default.all([Friendship.findOne({ where: { $or: [{ friendId: id, userId: friendId }, { friendId: friendId, userId: id }] } }), User.findOne({ where: { id: friendId } })]);

          case 3:
            _ref8 = _context3.sent;
            _ref9 = _slicedToArray(_ref8, 2);
            friendship = _ref9[0];
            friend = _ref9[1];


            if (friendship.accepted) {
              res.json({ friend: friend, friendship: friendship });
            } else {
              res.json({ message: 'No Friend Found' });
            }

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6, _x7) {
    return _ref7.apply(this, arguments);
  };
}()).put(function () {
  var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res, next) {
    var _req$params2, id, friendId, authorization, token, decoded, _ref11, _ref12, user, friendship, canAccept;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$params2 = req.params, id = _req$params2.id, friendId = _req$params2.friendId;
            authorization = req.headers.authorization;
            token = authorization.split(' ')[1];
            _context4.next = 5;
            return _jsonwebtoken2.default.verifyAsync(token, 'supersecret');

          case 5:
            decoded = _context4.sent;
            _context4.next = 8;
            return _bluebird2.default.all([User.findOne({ where: { id: id } }), Friendship.findOne({ where: { userId: friendId, friendId: id } })]);

          case 8:
            _ref11 = _context4.sent;
            _ref12 = _slicedToArray(_ref11, 2);
            user = _ref12[0];
            friendship = _ref12[1];
            canAccept = decoded.id === id && decoded.id === friendship.friendId;

            if (canAccept) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt('return', res.status(403).json({
              message: 'Unauthorized'
            }));

          case 15:
            if (friendship) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt('return', res.status(400).json({ message: 'Nothing to be found here.. No friendrequest..' }));

          case 17:
            if (!friendship.accepted) {
              _context4.next = 19;
              break;
            }

            return _context4.abrupt('return', res.status(400).json({ message: 'You are already friends with this person' }));

          case 19:
            _context4.next = 21;
            return friendship.update({
              accepted: true
            });

          case 21:

            res.json({
              message: 'Friendship accepted',
              friendship: friendship
            });

          case 22:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x8, _x9, _x10) {
    return _ref10.apply(this, arguments);
  };
}()).delete(function () {
  var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res, next) {
    var _req$params3, id, friendId, authorization, token, decoded, _ref14, _ref15, user, friendship, canDelete;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$params3 = req.params, id = _req$params3.id, friendId = _req$params3.friendId;
            authorization = req.headers.authorization;
            token = authorization.split(' ')[1];
            _context5.next = 5;
            return _jsonwebtoken2.default.verifyAsync(token, 'supersecret');

          case 5:
            decoded = _context5.sent;
            _context5.next = 8;
            return _bluebird2.default.all([User.findOne({ where: { id: id } }), Friendship.findOne({ where: { $or: [{ friendId: id, userId: friendId }, { friendId: friendId, userId: id }] } })]);

          case 8:
            _ref14 = _context5.sent;
            _ref15 = _slicedToArray(_ref14, 2);
            user = _ref15[0];
            friendship = _ref15[1];
            canDelete = decoded.id === id && (decoded.id === friendship.friendId || decoded.id === friendship.userId);

            if (canDelete) {
              _context5.next = 15;
              break;
            }

            return _context5.abrupt('return', res.status(403).json({
              message: 'Unauthorized to do this action'
            }));

          case 15:
            _context5.next = 17;
            return friendship.destroy();

          case 17:

            res.json({
              message: 'Friendship deleted'
            });

          case 18:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x11, _x12, _x13) {
    return _ref13.apply(this, arguments);
  };
}());

exports.default = usersRouter;