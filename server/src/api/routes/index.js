import { Router } from 'express'

const router = new Router()

router.route('/health')
  .get((req, res) => {
    return res.json({
      status: 'OK',
    })
  })

export default router