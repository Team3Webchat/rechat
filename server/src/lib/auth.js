import jwt from 'jsonwebtoken'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import BearerStrategy from 'passport-http-bearer'
import Promise from 'bluebird'
import bcrypt from 'bcrypt-nodejs'

import models from '../api/models'

const { User } = models
const jwtSecret = process.env.JWT_SECRET || 'supersecret'

Promise.promisifyAll(jwt)
Promise.promisifyAll(bcrypt)

async function localAuth(username, password, cb) {
  const user = await getUserFromEmail(username)
  if (!user)
    return cb(null, false)

  return cb(null, await verifyPassword(password, user.password) ? user : false)
}

async function bearerAuth(token, cb) {
  // const decoded = await jwt.verifyAsync(token, jwtSecret)
  const user = await getUserFromToken(token)
  return cb(null, user ? user : false)
}

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},localAuth))
passport.use(new BearerStrategy(bearerAuth))

export function login(req, res, next, message) {
  passport.authenticate('local', async (err, user, info) => {
    if (err)
      return next(err)

    if (!user)
      return res.status(401).json({ status: 'error', code: 'unauthorized' })

    const [friends, friendRequests, sentFriendRequests] = await Promise.all([
      user.friends(),
      user.friendRequests(),
      user.sentFriendRequests(),
    ])
    return res.json({
      message,
      token: jwt.sign({email: user.email, fullname: user.fullname, id: user.id}, jwtSecret), 
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

export function getParsedToken(token) {
  return jwt.verifyAsync(token, jwtSecret)
}

export function getUserFromToken(token) {
  return jwt.verifyAsync(token, jwtSecret)
    .then(t => User.findById(t.id))
}

export function getUserFromEmail(email) {
  return User.findOne({ where: { email }})
}

export function verifyPassword(requestPw, userPw) {
  return bcrypt.compareAsync(requestPw, userPw)
}



export default passport
