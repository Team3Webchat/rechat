import { Router } from 'express'
import { authenticateToken } from '../../lib/auth'
import models from '../models'

const { User } = models
const usersRouter = Router()

usersRouter.route('/users')
  .post((req, res) => {

  })
  .get((req, res) => {
    User.findAndCountAll({ attributes: { exclude: ['password']}})
      .then(result => {
        return res.json(result)
      })
      .catch(err => {
        return res.json(err)
      })
  })

usersRouter.all('*', authenticateToken)

export default usersRouter