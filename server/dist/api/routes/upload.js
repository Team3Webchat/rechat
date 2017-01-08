'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _fileUpload = require('../../lib/file-upload');

var uploadRouter = (0, _express.Router)();

uploadRouter.route('/').post(_fileUpload.upload, function (req, res, next) {
  console.log('Received file ' + req.file.originalname);
  console.log(req.file);
  res.json(req.file.location);
});

exports.default = uploadRouter;