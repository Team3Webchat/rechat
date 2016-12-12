'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearOldChatHistory = undefined;

var _models = require('../api/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Message = _models2.default.Message;

var DAYS_MESSAGE_IS_ALLOWED_TO_LIVE = 30;

var clearOldChatHistory = exports.clearOldChatHistory = function clearOldChatHistory() {
  var thirtyDaysAgo = new Date().setDate(new Date().getDate() - DAYS_MESSAGE_IS_ALLOWED_TO_LIVE);

  Message.destroy({ where: { createdAt: { lte: thirtyDaysAgo } } }).then(function (res) {
    return console.log(res);
  }).catch(function (err) {
    return console.log(err);
  });
};