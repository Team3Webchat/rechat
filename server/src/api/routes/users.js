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
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)), // TODO: change to async version!!
    })
      .then(result => {
        return login(req, res, next, 'Sucessful registration!')
        // return res.status(200).json({ message: 'Successful registration'})
      })
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError' && err.errors[0].path === 'email') {
          return res.status(400).json({ message: 'The email is already registered'})
        }
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
  .all(authenticateToken)
  .get((req, res, next) => {
    const { id } = req.params
    const { pending } = req.query
    User.findOne({ where: { id }})
      .then(async u => {
        const [friends, friendRequests, sentRequests] = await Promise.all([
          u.friends(),
          u.friendRequests(),
          u.sentFriendRequests(),
        ])
        res.json({
          friends, friendRequests, sentRequests,
        })
      })
      .catch(err => console.log(err))
  })
  .post(async (req, res, next) => {
    const { id } = req.params
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    const decoded = await jwt.verifyAsync(token, 'supersecret')

    if (id === decoded.id)
      return res.status(400).json({ message: 'Cannot add yourself as friend'})

    const [receiver, sender, friendship] = await Promise.all([
      User.findOne({ where: { id }}),
      User.findOne({ where: { id: decoded.id }}),
      Friendship.findOne({ where: { $or: [{ friendId: id, userId: decoded.id }, { friendId: decoded.id, userId: id }]}}),
    ])

    if (friendship) 
      return res.json({ message: 'You are already friends with this person or a friendrequest is waiting for confirmation'})

    await sender.addFriend(receiver)

    const sentFriendRequests = await sender.sentFriendRequests()

    res.json({ message: 'Friend added!', sentFriendRequests})
  })


usersRouter.route('/:id/friends/:friendId')
  //.all(authenticateToken)
  .get(async(req, res, next) => {
    const { id, friendId } = req.params
    const [friendship, friend] = await Promise.all([
      Friendship.findOne({ where: { $or: [{ friendId: id, userId: friendId }, { friendId: friendId, userId: id }]}}),
      User.findOne({ where: { id: friendId }}),
    ]) 

    if (friendship.accepted) {
      res.json({ friend, friendship })
    } else {
      res.json({ message: 'No Friend Found'})
    }

    
  })
  .put(async (req, res, next) => {
    const { id, friendId } = req.params
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]

    const decoded = await jwt.verifyAsync(token, 'supersecret')

    
    
    // We only look for requests send FROM antother user TO this user. Hence,
    // the id's need to be flipped in the query since friendId is the id of 
    // the receiver
    const [user, friendship] = await Promise.all([
      User.findOne({ where: { id }}),
      Friendship.findOne({ where: { userId: friendId, friendId: id }}), 
    ])

    const canAccept = decoded.id === id && decoded.id === friendship.friendId
    if (!canAccept) {
      return res.status(403).json({
        message: 'Unauthorized',
      })
    }
    

    if (!friendship) {
      return res.status(400).json({message: 'Nothing to be found here.. No friendrequest..'})
    }

    if (friendship.accepted) {
      return res.json({ message: 'You are already friends with this person'})
    }


    

    await friendship.update({
      accepted: true,
    })

    res.json({
      message: 'Friendship accepted',
      friendship,
    })
  })
  .delete(async (req, res, next) => {
    const { id, friendId } = req.params
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    const decoded = await jwt.verifyAsync(token, 'supersecret')

    const [user, friendship] = await Promise.all([
      User.findOne({ where: { id}}),
      Friendship.findOne({ where: { $or: [{ friendId: id, userId: friendId }, { friendId: friendId, userId: id }]}}),
    ])

    const canDelete = decoded.id === id && (decoded.id === friendship.friendId || decoded.id === friendship.userId)

    if (!canDelete) {
      return res.status(403).json({
        message: 'Unauthorized to do this action',
      })
    }

    await friendship.destroy()

    res.json({
      message: 'Friendship deleted',
    })
  })





export default usersRouter
