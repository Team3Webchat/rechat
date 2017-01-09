'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onFriendRequestAccept = exports.onFriendRequest = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _models = require('../api/models');

var _models2 = _interopRequireDefault(_models);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = _models2.default.User,
    Friendship = _models2.default.Friendship,
    Chat = _models2.default.Chat;
var onFriendRequest = exports.onFriendRequest = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data, socket, io, connectedUsers) {
    var id, decoded_token, friendship, _ref2, _ref3, receiver, sender, sentFriendRequests, chat;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = data.id;
            decoded_token = socket.decoded_token;

            if (!(id === decoded_token.id)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', io.to(decoded_token.id).emit('add_friend_error', {
              message: 'Cannot add yourself as friend'
            }));

          case 4:
            _context.next = 6;
            return Friendship.findOne({
              where: {
                $or: [{ friendId: id, userId: decoded_token.id }, { friendId: decoded_token.id, userId: id }]
              }
            });

          case 6:
            friendship = _context.sent;

            if (!friendship) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', io.to(connectedUsers[decoded_token].id).emit('add_friend_error', { message: ' You are already friends with this person' }));

          case 9:
            _context.next = 11;
            return Promise.all([User.findOne({ where: { id: id } }), User.findOne({ where: { id: decoded_token.id } })]);

          case 11:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            receiver = _ref3[0];
            sender = _ref3[1];
            _context.next = 17;
            return sender.addFriend(receiver);

          case 17:
            _context.next = 19;
            return sender.sentFriendRequests();

          case 19:
            sentFriendRequests = _context.sent;
            _context.next = 22;
            return Chat.create({ id: _uuid2.default.v4() });

          case 22:
            chat = _context.sent;
            _context.next = 25;
            return Promise.all([chat.addUser(receiver), chat.addUser(sender)]);

          case 25:
            _context.next = 27;
            return io.to(connectedUsers[decoded_token.id]).emit('friend_request_sent', {
              message: 'Friend added!',
              sentFriendRequests: sentFriendRequests,
              userId: id
            });

          case 27:

            io.to(connectedUsers[id]).emit('friend_request_gotten', {
              friend: sender
            });

          case 28:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function onFriendRequest(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var onFriendRequestAccept = exports.onFriendRequestAccept = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(data, socket, io, connectedUsers) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // const { id, friendId } = data
            // const [receiver, sender] = await Promise.all([
            //   User.findOne({ where: { id }}),
            //   User.findOne({ where: { id: friendId }}),
            // ])
            // const chat = await Chat.create({ id: uuid.v4() })
            // await Promise.all([
            //   chat.addUser(sender),
            //   chat.addUser(receiver),
            // ])
            io.to(connectedUsers[data.id]).emit('friend_request_accepted', data);

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function onFriendRequestAccept(_x5, _x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();