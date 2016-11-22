import { Router } from 'express'
import { authenticateToken } from '../../lib/auth'
import models from '../models'
import bcrypt from 'bcrypt-nodejs'
import { login } from '../../lib/auth'

const { User } = models
const usersRouter = Router()

usersRouter.route('/users')
  .post((req, res, next) => {
    const { email, password, firstname, lastname } = req.body
    User.create({
      email,
      firstname,
      lastname,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    })
      .then(result => {
        console.log(result)
        return login(req, res, next, 'Sucessful registration!')
        // return res.status(200).json({ message: 'Successful registration'})
      })
      .catch(err => {
        console.log(err)
        return res.status(400).json(err)
      })

  })
  .all(authenticateToken)
  .get((req, res) => {
    User.findAndCountAll({ attributes: { exclude: ['password']}})
      .then(result => {
        return res.json(result)
      })
      .catch(err => {
        return res.json(err)
      })
  })

usersRouter.route('/users/:id')
  .get((req, res, next) => {
    const { id } = req.params
    User.findOne({ where: { id }, attributes: { exclude: ['password']}})
      .then(u => res.json(u))
      .catch(err => res.json(err))
  })
  .put((req, res, next) => {
    return res.json('/users/:id/ PUT is not implemented yet')
  }) 

usersRouter.route('/users/:id/friends')
  .get((req, res, next) => {
    const { id } = req.params
    User.findOne({ where: { id }})
      .then(u => u.friends())
      .then(f => res.json(f))
      .catch(err => console.log(err))
  })




export default usersRouter
