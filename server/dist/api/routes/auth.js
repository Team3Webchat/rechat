'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('../../lib/auth');

var authRouter = (0, _express.Router)();

authRouter.route('/login').post(function (req, res, next) {
  return (0, _auth.login)(req, res, next, 'Successful authentication');
});

exports.default = authRouter;