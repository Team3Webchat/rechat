import { Router } from 'express'

import { login } from '../../lib/auth'

const authRouter = Router()

authRouter.route('/login')
  .post((req, res, next) => login(req, res, next, 'Successful authentication'))



export default authRouter

