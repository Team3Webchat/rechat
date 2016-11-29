'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = undefined;

var search = exports.search = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next, message) {
    var searchValue, searchValues, query, users, _message, _message2;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            searchValue = req.body.searchValue;
            searchValues = searchValue.split(' ').filter(function (s) {
              return s.length > 0;
            });
            query = [].concat.apply([], searchValues.map(function (s) {
              return [{ firstname: { $iLike: '%' + s + '%' } }, { lastname: { $iLike: '%' + s + '%' } }];
            }));
            _context.next = 6;
            return User.findAll({
              where: {
                $or: query
              }
            });

          case 6:
            users = _context.sent;


            if (users.length == 0) {
              _message = JSON.stringify({ results: { status: 'error', code: 'User not found' } });

              res.send(_message);
            } else {
              res.send(JSON.stringify({ results: users }));
              console.log(users);
            }
            _context.next = 15;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            _message2 = JSON.stringify({ results: { status: 'error', code: _context.t0 } });

            res.send(_message2);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  return function search(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _models = require('../api/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = _models2.default.User;