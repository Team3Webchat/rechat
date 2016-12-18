'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startSocket = exports.createSocket = undefined;

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _socketioJwt = require('socketio-jwt');

var _socketioJwt2 = _interopRequireDefault(_socketioJwt);

var _chat = require('./chat');

var _friendships = require('./friendships');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createSocket = exports.createSocket = function createSocket(app, server) {

  var io = new _socket2.default(server);
  // io.set('origins', CLIENT_URL)
  // HACK FOR NOW FIX LATER
  io.set('origins', '*:*');
  return io;
};

var startSocket = exports.startSocket = function startSocket(io) {
  io.sockets.on('connection', _socketioJwt2.default.authorize({
    secret: 'supersecret',
    timeout: 15000
  })).on('authenticated', function (socket) {
    return connection(socket, io);
  });
};

var connectedUsers = {};

function connection(socket, io) {
  var _this = this;

  connectedUsers[socket.decoded_token.id] = socket.id;

  socket.emit('user_connected', { userId: socket.decoded_token.id });
  socket.on('new_message', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _chat.onNewMessage)(data, io);

            case 1:
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
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(data) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              (0, _chat.onPrivateConversation)(data, socket);

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  socket.on('delete_conversation', function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(data) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log(data);
              (0, _chat.onDeleteConversation)(data, io, connectedUsers);

            case 2:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());

  socket.on('friend_request', function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(data) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              console.log(data);
              (0, _friendships.onFriendRequest)(data, socket, io, connectedUsers);

            case 2:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());

  socket.on('disconnect', function () {
    delete connectedUsers[socket.decoded_token.id];
    socket.emit('user_disconnected', { userId: socket.decoded_token.id });
  });

  socket.on('friend_request_accepted', function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(data) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              console.log(data);
              (0, _friendships.onFriendRequestAccept)(data, socket, io, connectedUsers);

            case 2:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }());
}