import { Router } from 'express'

import authRouter from './auth'

const router = Router()

router.route('/health')
  .get((req, res) => {
    return res.json({
      status: 'OK',
    })
  })
  
router.use(authRouter)

export default router