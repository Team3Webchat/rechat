import { Router } from 'express'
import { authenticateToken } from '../../lib/auth'
import models from '../models'
import bcrypt from 'bcrypt-nodejs'
import { login } from '../../lib/auth'
import Promise from 'bluebird'
import jwt from 'jsonwebtoken'

Promise.promisifyAll(jwt)

const { User, Friendship } = models
const usersRouter = Router()


usersRouter.route('/')
  .post((req, res, next) => {
    const { email, password, firstname, lastname } = req.body
    User.create({
      email,
      firstname,
      lastname,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    })
      .then(result => {
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

usersRouter.route('/:id')
  // .all(authenticateToken)
  .get((req, res, next) => {
    const { id } = req.params
    User.findOne({ where: { id }, attributes: { exclude: ['password']}})
      .then(u => res.json(u))
      .catch(err => res.json(err))
  })
  .put((req, res, next) => {
    return res.json('/users/:id/ PUT is not implemented yet')
  }) 

usersRouter.route('/:id/friends')
  // .all(authenticateToken)
  .get((req, res, next) => {
    const { id } = req.params
    const { pending } = req.query
    User.findOne({ where: { id }})
      .then(u => u.friends())
      .then(f => pending 
              ? f.filter(friend => !friend['Friendship.accepted'] && id === friend['Friendship.FriendId']) 
              : f.filter(friend => friend['Friendship.accepted']))
      .then(f => res.json(f))
      .catch(err => console.log(err))
  })
  .post(async (req, res, next) => {
    const { id } = req.params
    const { authorization } = req.headers
    const token = authorization.split(' ')[0]
    const decoded = await jwt.verifyAsync(token, 'supersecret')

    const [receiver, sender] = await Promise.all([
      User.findOne({ where: { id }}),
      User.findOne({ where: { id: decoded.id }}),
    ])

    await sender.addFriend(receiver)

    res.json('Friend added')
  })


usersRouter.route('/:id/friends/:friendId')
  .all(authenticateToken)
  .get(async(req, res, next) => {
    res.json("HAHAHA")
  })
  .put(async (req, res, next) => {
    const { id, friendId } = req.params
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]

    const decoded = await jwt.verifyAsync(token, 'supersecret')
    
    const [user, friendship] = await Promise.all([
      User.findOne({ where: { id }}),
      Friendship.findOne({ where: { UserId: friendId, FriendId: id }}),
    ])


    console.log('receiver: ', id)
    console.log('sender: ', friendId)
    console.log('logged in id: ', decoded.id)
    const canAccept = decoded.id === id && decoded.id === friendship.FriendId
    console.log(canAccept)

    if (!canAccept) {
      return res.status(403).json({
        message: 'Unauthorized',
      })
    }

    await friendship.update({
      accepted: true,
    })

    


    res.json({
      message: 'Friendship accepted',
      friendship,
    })

  })





export default usersRouter
