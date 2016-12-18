'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _search = require('../../lib/search');

var searchRouter = (0, _express.Router)();

searchRouter.route('/').post(function (req, res, next) {
  return (0, _search.search)(req, res, next, 'Successful Search');
});

exports.default = searchRouter;