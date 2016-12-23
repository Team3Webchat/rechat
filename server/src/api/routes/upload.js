import { Router } from 'express'
import { upload } from '../../lib/file-upload'

const uploadRouter = Router()

uploadRouter.route('/')
  .post(upload, (req, res, next) => {
    console.log(req.file)
    res.status(200).json({
      message: 'Succelful file upload!',
      fileUrl: req.file.location
    })
  })

export default uploadRouter