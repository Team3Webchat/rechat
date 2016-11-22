import { Router } from 'express'

import authRouter from './auth'
import usersRouter from './users'
import searchRouter from './search'

const router = Router()

router.route('/health')
  .get((req, res) => {
    return res.json({
      status: 'OK',
    })
  })

router.use(authRouter)
router.use(usersRouter)
router.use(searchRouter)


export default router