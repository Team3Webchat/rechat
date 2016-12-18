'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var localAuth = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(username, password, cb) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getUserFromEmail(username);

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', cb(null, false));

          case 5:
            _context.next = 7;
            return verifyPassword(password, user.password);

          case 7:
            if (!_context.sent) {
              _context.next = 11;
              break;
            }

            _context.t0 = user;
            _context.next = 12;
            break;

          case 11:
            _context.t0 = false;

          case 12:
            _context.t1 = _context.t0;
            return _context.abrupt('return', cb(null, _context.t1));

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function localAuth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var bearerAuth = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(token, cb) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getUserFromToken(token);

          case 2:
            user = _context2.sent;
            return _context2.abrupt('return', cb(null, user ? user : false));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function bearerAuth(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;
exports.authenticateToken = authenticateToken;
exports.getParsedToken = getParsedToken;
exports.getUserFromToken = getUserFromToken;
exports.getUserFromEmail = getUserFromEmail;
exports.verifyPassword = verifyPassword;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportHttpBearer = require('passport-http-bearer');

var _passportHttpBearer2 = _interopRequireDefault(_passportHttpBearer);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _models = require('../api/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = _models2.default.User;

var jwtSecret = process.env.JWT_SECRET || 'supersecret';

_bluebird2.default.promisifyAll(_jsonwebtoken2.default);
_bluebird2.default.promisifyAll(_bcryptNodejs2.default);

_passport2.default.use(new _passportLocal2.default({
  usernameField: 'email',
  passwordField: 'password'
}, localAuth));
_passport2.default.use(new _passportHttpBearer2.default(bearerAuth));

function login(req, res, next, message) {
  var _this = this;

  _passport2.default.authenticate('local', function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(err, user, info) {
      var _ref4, _ref5, friends, friendRequests, sentFriendRequests, chats;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!err) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', next(err));

            case 2:
              if (!(!user || user.dataValues.isBanned)) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt('return', res.status(401).json({ status: 'error', code: 'unauthorized' }));

            case 4:
              _context3.next = 6;
              return _bluebird2.default.all([user.friends(), user.friendRequests(), user.sentFriendRequests(), user.getChats()]);

            case 6:
              _ref4 = _context3.sent;
              _ref5 = _slicedToArray(_ref4, 4);
              friends = _ref5[0];
              friendRequests = _ref5[1];
              sentFriendRequests = _ref5[2];
              chats = _ref5[3];
              return _context3.abrupt('return', res.json({
                message: message,
                token: _jsonwebtoken2.default.sign({ email: user.email, fullname: user.fullname(), id: user.id, isAdmin: user.isAdmin }, jwtSecret),
                user: {
                  email: user.email,
                  fullname: user.fullname(),
                  isAdmin: user.isAdmin
                },
                friends: friends,
                friendRequests: friendRequests,
                sentFriendRequests: sentFriendRequests,
                chats: chats
              }));

            case 13:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x6, _x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  }())(req, res, next);
}

function authenticateToken(req, res, next) {
  _passport2.default.authenticate('bearer', function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(401).json({ status: 'error', code: 'unauthorized' });

    req.user = user;
    return next();
  })(req, res, next);
}

function getParsedToken(token) {
  return _jsonwebtoken2.default.verifyAsync(token, jwtSecret);
}

function getUserFromToken(token) {
  return _jsonwebtoken2.default.verifyAsync(token, jwtSecret).then(function (t) {
    return User.findById(t.id);
  });
}

function getUserFromEmail(email) {
  return User.findOne({ where: { email: email } });
}

function verifyPassword(requestPw, userPw) {
  return _bcryptNodejs2.default.compareAsync(requestPw, userPw);
}

exports.default = _passport2.default;