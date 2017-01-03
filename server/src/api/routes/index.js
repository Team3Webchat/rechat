import { Router } from 'express'

import authRouter from './auth'
import usersRouter from './users'
import searchRouter from './search'
import uploadRouter from './upload'

const router = Router()

router.route('/health')
  .get((req, res) => res.status(200).json({ status: 'OK' }))

router.use(authRouter)
router.use('/users', usersRouter)
router.use('/search', searchRouter)
router.use('/upload', uploadRouter)


export default router