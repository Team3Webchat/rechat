'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// TODO: super secret secret 

var localAuth = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(username, password, cb) {
    var user, isCorrectPassword;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("LOCAL AUTH");
            _context.next = 3;
            return User.findOne({ where: { email: username } });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', (null, false));

          case 6:
            _context.next = 8;
            return _bcrypt2.default.compareAsync(password, user.password);

          case 8:
            isCorrectPassword = _context.sent;
            return _context.abrupt('return', cb(null, isCorrectPassword ? user : false));

          case 10:
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
    var decoded, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _jsonwebtoken2.default.verifyAsync(token, jwtSecret);

          case 2:
            decoded = _context2.sent;
            _context2.next = 5;
            return User.findById(decoded.id);

          case 5:
            user = _context2.sent;
            return _context2.abrupt('return', cb(null, user ? user : false));

          case 7:
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

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../api/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = _models2.default.User;


_bluebird2.default.promisifyAll(_jsonwebtoken2.default);
_bluebird2.default.promisifyAll(_bcrypt2.default);

var jwtSecret = 'supersecret';

_passport2.default.use(new _passportLocal2.default({
  usernameField: 'email',
  passwordField: 'password'
}, localAuth));
_passport2.default.use(new _passportHttpBearer2.default(bearerAuth));

function login(req, res, next, message) {
  console.log(req.body);
  _passport2.default.authenticate('local', function (err, user, info) {
    console.log(info);
    if (err) return next(err);
    if (!user) return res.status(401).json({ status: 'error', code: 'unauthorized' });

    return res.json({ message: message, token: _jsonwebtoken2.default.sign({ id: user.id, email: user.email }, jwtSecret) });
  })(req, res, next);
}

function authenticateToken(req, res, next) {
  _passport2.default.authenticate('bearer', function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(401).json({ status: 'error', code: 'unauthorized' });

    req.user = user;
    return next();
  })(req, res, next);
}

exports.default = _passport2.default;