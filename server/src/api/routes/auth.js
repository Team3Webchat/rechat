import { Router } from 'express'

import { login } from '../../lib/auth'

const authRouter = Router()

authRouter.route('/login')
  .post(login)



export default authRouter

