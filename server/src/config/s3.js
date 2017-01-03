export const bucketUrl = process.env.BUCKET_URL
console.log(process.env.S3_ACCESS_KEY)
export const awsConfig = {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: process.env.S3_REGION
}