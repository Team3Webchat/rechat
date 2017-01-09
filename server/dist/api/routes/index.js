'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

var _upload = require('./upload');

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.route('/health').get(function (req, res) {
  return res.status(200).json({ status: 'OK' });
});

router.use(_auth2.default);
router.use('/users', _users2.default);
router.use('/search', _search2.default);
router.use('/upload', _upload2.default);

exports.default = router;