'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = undefined;

var createServer = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var app, server, io;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            console.log(process.env.S3_SECRET);
            app = (0, _express2.default)();
            server = _http2.default.createServer(app);
            io = (0, _socket.createSocket)(app, server);

            (0, _socket.startSocket)(io);

            // Apply 3rd party middleware
            app.use((0, _cors2.default)());
            app.use(_bodyParser2.default.json());
            app.use((0, _morgan2.default)('dev'));
            app.use((0, _helmet2.default)());
            app.use(_auth2.default.initialize());

            // logger
            app.use(_expressWinston2.default.logger({
              transports: [new _winston2.default.transports.Console({
                formatter: function formatter(_ref2) {
                  var level = _ref2.level,
                      message = _ref2.message,
                      meta = _ref2.meta;
                  return new Date().toTimeString() + ' ' + level + ': ' + message;
                }
              })]

            }));

            // bootstrap routes
            app.use('/api', _routes2.default);

            // error logger, should be after routes
            app.use(_expressWinston2.default.errorLogger({
              transports: [new _winston2.default.transports.Console({
                json: true,
                colorize: true
              })]
            }));

            // catch 404 and forward to error handler
            app.use(function (req, res, next) {
              var err = new Error('API not found', _httpStatus2.default.NOT_FOUND);
              return next(err);
            });

            // setup chat history clearing, runs once every night at 00.00
            _nodeCron2.default.schedule('0 0 0 * * *', _chatHistoryCleaner.clearOldChatHistory);

            return _context.abrupt('return', server);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createServer() {
    return _ref.apply(this, arguments);
  };
}();

var startServer = exports.startServer = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var server, port;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return createServer();

          case 2:
            server = _context2.sent;
            port = process.env.PORT || 8000;
            _context2.next = 6;
            return server.listen(port);

          case 6:
            console.log('Started on port ' + server.address().port);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function startServer() {
    return _ref3.apply(this, arguments);
  };
}();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _expressWinston = require('express-winston');

var _expressWinston2 = _interopRequireDefault(_expressWinston);

var _nodeCron = require('node-cron');

var _nodeCron2 = _interopRequireDefault(_nodeCron);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _multerS = require('multer-s3');

var _multerS2 = _interopRequireDefault(_multerS);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _socket = require('../lib/socket');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _auth = require('../lib/auth');

var _auth2 = _interopRequireDefault(_auth);

var _chatHistoryCleaner = require('../lib/chat-history-cleaner');

var _fileUpload = require('../lib/file-upload');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }