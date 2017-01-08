'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = undefined;

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _multerS = require('multer-s3');

var _multerS2 = _interopRequireDefault(_multerS);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var awsConfig = {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: 'eu-west-2'
};

var getS3 = function getS3() {
  return {
    s3: new _awsSdk2.default.S3(new _awsSdk2.default.Config(awsConfig)),
    bucket: 'rechat-bucket'
  };
};

var s3 = new _awsSdk2.default.S3(new _awsSdk2.default.Config(awsConfig));
// s3.getBucketLocation({Bucket: 'rechat-bucket'}, (err, data) => {
//   if (err) console.log(err)
//   else console.log(data)
// })


var storage = (0, _multerS2.default)({
  s3: new _awsSdk2.default.S3(new _awsSdk2.default.Config(awsConfig)),
  bucket: 'rechat-bucket',
  contentType: _multerS2.default.AUTO_CONTENT_TYPE,
  metadata: function metadata(req, file, cb) {
    return cb(null, { fieldName: file.fieldname });
  },
  key: function key(req, file, cb) {
    return cb(null, '' + _uuid2.default.v4() + file.originalname);
  }
});

var validExtensions = ['image/jpeg', 'image/png', 'text/plain', 'application/pdf'];
var isValidFile = function isValidFile(file) {
  return validExtensions.indexOf(file.mimetype) > -1;
};

var upload = exports.upload = (0, _multer2.default)({
  storage: storage,
  fileFilter: function fileFilter(req, file, cb) {
    console.log(file);
    if (isValidFile(file)) return cb(null, true);else {
      return cb(new Error('That file is not allowed'));
    }
  }
}).single('file');