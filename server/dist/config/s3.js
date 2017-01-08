"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var bucketUrl = exports.bucketUrl = process.env.BUCKET_URL;
console.log(process.env.S3_ACCESS_KEY);
var awsConfig = exports.awsConfig = {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: process.env.S3_REGION
};