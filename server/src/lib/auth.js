import jwt from 'jsonwebtoken'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import BearerStrategy from 'passport-http-bearer'
import Promise from 'bluebird'
import bcrypt from 'bcrypt-nodejs'

import models from '../api/models'

const { User } = models

Promise.promisifyAll(jwt)
Promise.promisifyAll(bcrypt)

const jwtSecret = 'supersecret' // TODO: super secret secret

async function localAuth(username, password, cb) {
  const user = await User.findOne({ where: { email: username }})
  if (!user) {

    return cb(null, false)
  }
  const isCorrectPassword = await bcrypt.compareAsync(password, user.password)
  return cb(null, isCorrectPassword ? user : false)
}

async function bearerAuth(token, cb) {
  const decoded = await jwt.verifyAsync(token, jwtSecret)
  const user = await User.findById(decoded.id)
  return cb(null, user ? user : false)
}

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},localAuth))
passport.use(new BearerStrategy(bearerAuth))

export function login(req, res, next, message) {

  passport.authenticate('local', async (err, user, info) => {

    if (err) {

      return next(err)
    }

    if (!user) {

      return res.status(401).json({ status: 'error', code: 'unauthorized' })
    }

    const [friends, friendRequests, sentFriendRequests] = await Promise.all([
      user.friends(),
      user.friendRequests(),
      user.sentFriendRequests(),
    ])
    return res.json({ 
      message, 
      token: jwt.sign({ id: user.id, email: user.email }, jwtSecret), 
      user, 
      friends,
      friendRequests, 
      sentFriendRequests, 
    })
  })(req, res, next)
}

export function authenticateToken(req, res, next) {
  passport.authenticate('bearer', (err, user, info) => {
    if (err)
      return next(err)
    if (!user)
      return res.status(401).json({ status: 'error' , code: 'unauthorized'})

    req.user = user
    return next()
  })(req, res, next)
}



export default passport
