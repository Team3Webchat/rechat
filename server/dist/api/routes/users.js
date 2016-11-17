'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('../../lib/auth');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;

var usersRouter = (0, _express.Router)();

usersRouter.route('/users').post(function (req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

  console.log(email, password);
  User.create({
    email: email,
    password: _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(10))
  }).then(function (result) {
    console.log(result);
    return (0, _auth.login)(req, res, next, 'Sucessful registration!');
    // return res.status(200).json({ message: 'Successful registration'})
  }).catch(function (err) {
    console.log(err);
    return res.status(400).json(err);
  });
}).all(_auth.authenticateToken).get(function (req, res) {
  User.findAndCountAll({ attributes: { exclude: ['password'] } }).then(function (result) {
    return res.json(result);
  }).catch(function (err) {
    return res.json(err);
  });
});

exports.default = usersRouter;