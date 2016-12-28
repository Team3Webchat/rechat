import { Router } from 'express'
import { upload } from '../../lib/file-upload'

const uploadRouter = Router()

uploadRouter.route('/')
  .post(upload, (req, res, next) => {
    console.log(`Received file ${req.file.originalname}`);
    console.log(req.file)
    res.json(req.file.location)
  })

export default uploadRouter