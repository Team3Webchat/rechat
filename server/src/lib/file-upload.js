import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import uuid from 'uuid'
require('dotenv').config()

const awsConfig = {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: 'eu-west-2'
}

console.log(awsConfig)

const getS3 = () => ({
  s3: new AWS.S3(new AWS.Config(awsConfig)),
  bucket: 'rechat-bucket',
})

const s3 = new AWS.S3(new AWS.Config(awsConfig))
s3.getBucketLocation({Bucket: 'rechat-bucket'}, (err, data) => {
  if (err) console.log(err)
  else console.log(data)
})


const storage = multerS3({
  s3: new AWS.S3(new AWS.Config(awsConfig)),
  bucket: 'rechat-bucket',
  metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
  key: (req, file, cb) => cb(null, `${uuid.v4()}${file.originalname}`),
})



export const upload = multer({ storage }).single('file')