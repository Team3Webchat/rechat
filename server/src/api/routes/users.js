import { Router } from 'express'
import { authenticateToken } from '../../lib/auth'
import models from '../models'
import bcrypt from 'bcrypt-nodejs'
import { login } from '../../lib/auth'
import Promise from 'bluebird'
import jwt from 'jsonwebtoken'
import uuid from 'uuid'

Promise.promisifyAll(jwt)
Promise.promisifyAll(bcrypt)

const { User, Friendship, Report } = models
const usersRouter = Router()


usersRouter.route('/')
  .post((req, res, next) => {
    const { email, password, firstname, lastname } = req.body
    bcrypt.genSaltAsync(10)
      .then(salt => bcrypt.hashAsync(password, salt, null))
      .then(pw => User.create({ email, firstname, lastname, password: pw, reportedByOthersCount: 0, isAdmin: false, isBanned: false }))
      .then(user => login(req, res, next, 'Successful registration'))
      .catch(e => {
        if (e.name === 'SequelizeUniqueConstraintError' &&
            e.errors[0].path === 'email') {
          return res.status(400)
            .json({ message: 'The email is already registered' })
        }

        return res.status(400)
          .json({ message: 'Something went wrong when registering your account' })
      })
  })
  .all(authenticateToken)
  .get(async (req, res) => {
    try {
      const users = await User.findAndCountAll({ attributes: { exclude: ['password'] } })
      return res
        .status(200)
        .json(users)
    } catch(e) {
      return res
        .status(400)
        .json({ message: 'Something went wrong when fetching the users, please try again' })
    }
  })

usersRouter.route('/reported')
  .all(authenticateToken)
  .get(async (req, res, next) => {
    const { user: currentUser } = req
    if (!currentUser.isAdmin) {
      return res.status(403).json({message: 'Unauthorized'})
    }
    const reportedUsers = await Promise.filter(User.findAll({attributes: { exclude: ['password'] }}), async user => {
      const reports = await user.getReports()
      return reports.length > 0
    })

    const ret = await Promise.all(reportedUsers.map(async u => {
      return {
        user: u,
        reports: await u.getReports(),
      }
    }))
    return res.status(200).json({users: ret})
  })

usersRouter.route('/banned')
  .all(authenticateToken)
  .get(async (req, res, next) => {
    const { user: currentUser } = req
    if (!currentUser.isAdmin) {
      return res.status(403).json({message: 'Unauthorized'})
    }

    const bannedUsers = await Promise.filter(User.findAll({attributes: { exclude: ['password'] }}), async user => {
      return user.isBanned
    })

    return res.status(200).json({bannedUsers})
  })

usersRouter.route('/:id')
  .all(authenticateToken)
  .get(async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] }})
      return res
        .status(200)
        .json(user)
    } catch(e) {
      return res
        .status(400)
        .json(e)
    }
  })
  .put(async (req, res, next) => {
    if (req.params.id !== req.user.dataValues.id || !req.user.isAdmin) {
      return res.status(403).json({ message: 'Cannot update someone elses password '})
    }
    const user = await User.findOne({ where: { id: req.user.dataValues.id }})
    bcrypt.genSaltAsync(10)
       .then(salt => bcrypt.hashAsync(req.body.password, salt, null))
       .then(pw => user.update({ password: pw }))
       .then(()=> User.findOne({ where: { id: req.user.dataValues.id }}))
       .then(()=>  res.json('Your password is updated'))
       .catch(err => res.json(err))
      //  .catch(err => res.json('something went wrong'))

  })
  .delete(async (req, res, next) => {
    const { user } = req
    const { id } = user.dataValues
    if (id !== req.params.id && !user.isAdmin) {
      return res.status(403).json({ message: 'You cannot delete this account'})
    }
    const chats = await user.getChats()
    console.log(chats)
    await Promise.all(chats.map(async chat => {
      const messages = await chat.getMessages()
      await Promise.all(messages.map(message => message.destroy()))
      await chat.destroy()
    }))
    await user.destroy()
    res.status(200).json({ message: 'Deleted kinda'})
  })

usersRouter.route('/:id/ban')
  .all(authenticateToken)
  .post(async (req, res, next) => {
    const { id } = req.params
    const { user: currentUser } = req
    if (!currentUser.isAdmin) {
      return res.status(403).json({message: 'Unauthorized'})
    }
    await User.findOne({ where: { id }})
      .then(user => user.update({isBanned: true}))
    return res.status(200).json({message:'User is now banned'})
  })

usersRouter.route('/:id/unBan')
  .all(authenticateToken)
  .post(async (req, res, next) => {
    const { id } = req.params
    const { user: currentUser } = req
    if (!currentUser.isAdmin) {
      return res.status(403).json({message: 'Unauthorized'})
    }
    await User.findOne({ where: { id }})
      .then(user => user.update({isBanned: false}))
    return res.status(200).json({message:'User is now banned'})
  })


usersRouter.route('/:id/friends')
  .all(authenticateToken)
  .get(async (req, res, next) => {
    const { id } = req.params
    const { pending } = req.query
    const user = await User.findOne({ where: { id }})
    const [friends, friendRequests, sentRequests] = await Promise.all([
      user.friends(),
      user.friendRequests(),
      user.sentFriendRequests(),
    ])
    return res
      .status(200)
      .json({ friends, friendRequests, sentRequests })
  })
  .post(async (req, res, next) => {
    const { user } = req
    const { id } = req.params
    const { authorization } = req.headers

    if (id === user.id)
      return res
        .status(400)
        .json({ message: 'Cannot add yourself as friend'})

    const [receiver, sender, friendship] = await Promise.all([
      User.findOne({ where: { id }}),
      User.findOne({ where: { id: user.id }}),
      Friendship.findOne({ where: { $or: [{ friendId: id, userId: user.id }, { friendId: user.id, userId: id }]}}),
    ])

    if (friendship)
      return res
        .status(400)
        .json({ message: 'You are already friends with this person or a friendrequest is waiting for confirmation'})

    await sender.addFriend(receiver)

    const sentFriendRequests = await sender.sentFriendRequests()

    res.json({ message: 'Friend added!', sentFriendRequests})
  })

usersRouter.route('/:id/report')
  .all(authenticateToken)
  .get(async(req, res, next) => {
    const { id } = req.params
    const { user: currentUser } = req
    if (!currentUser.isAdmin) {
      if(id !== currentUser.id)
        return res.status(403).json({message: 'Unauthorized'})
    }
    const user = await User.findOne({where: {id}})

    const reports = await user.getReports()
    console.log(reports);
    return res.status(200).json({reports})
  })
  .post(async(req, res, next) => {
    const { id } = req.params
    const { message } = req.body
    const { id: currentUserId } = req.user
    const friendship = await Friendship.findOne({ where: { $or: [{ friendId: id, userId: currentUserId }, { friendId: currentUserId, userId: id }]}})
    if (!friendship || !friendship.accepted) {
      return res.status(403).json({message: 'Unauthorized'})
    }
    const report = await Report.create({userId: id, message, id: uuid.v4()})
    return res.status(200).json({report})
  })


usersRouter.route('/:id/friends/:friendId')
  .all(authenticateToken)
  .get(async(req, res, next) => {
    const { id, friendId } = req.params
    const [friendship, friend] = await Promise.all([
      Friendship.findOne({ where: { $or: [{ friendId: id, userId: friendId }, { friendId: friendId, userId: id }]}}),
      User.findOne({ where: { id: friendId }}),
    ])

    if (friendship && friendship.accepted) {
      res.json({ friend, friendship })
    } else {
      res.json({ message: 'No Friend Found'})
    }
  })
  .put(async (req, res, next) => {
    try {
      const { id, friendId } = req.params
      const { user } = req



      // We only look for requests send FROM antother user TO this user. Hence,
      // the id's need to be flipped in the query since friendId is the id of
      // the receiver
      const friendship = await Friendship.findOne({ where: { userId: friendId, friendId: user.id }})

      if (!user.id === id && user.id === friendship.friendId) {
        return res.status(403).json({ message: 'Unauthorized' })
      } else if (!friendship) {
        return res.status(400).json({message: 'Nothing to be found here.. No friendrequest..'})
      } else if (friendship.accepted) {
        return res.status(400).json({ message: 'You are already friends with this person'})
      }

      await friendship.update({ accepted: true })

      return res.json({ message: 'Friendship accepted', friendship })
    } catch(e) {
      res.status(400).json(e) // TODO: better error message
    }

  })
  .delete(async (req, res, next) => {
    try {
      const { id, friendId } = req.params
      const { user } = req

      const friendship = await Friendship.findOne({
        where: {
          $or: [
            { friendId: id, userId: friendId },
            { friendId: friendId, userId: id },
          ],
        },
      })



      if (!(user.id === id &&
           (user.id === friendship.friendId ||
            user.id === friendship.userId))) {
        return res.status(403)
          .json({message: 'Unauthorized to do this action'})
      }

      await friendship.destroy()

      res.json({
        message: 'Friendship deleted',
      })
    } catch(e) {
      res.status(400).json(e)
    }

  })

export default usersRouter
