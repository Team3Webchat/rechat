import { Router } from 'express'

import authRouter from './auth'
import usersRouter from './users'

const router = Router()

router.route('/health')
  .get((req, res) => {
    return res.json({
      status: 'OK',
    })
  })

router.use(authRouter)
router.use(usersRouter)


export default router