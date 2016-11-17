import jwt from 'jsonwebtoken'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import BearerStrategy from 'passport-http-bearer'
import Promise from 'bluebird'
import bcrypt from 'bcrypt'

import models from '../api/models'

const { User } = models

Promise.promisifyAll(jwt)
Promise.promisifyAll(bcrypt)

const jwtSecret = 'supersecret' // TODO: super secret secret 

async function localAuth(username, password, cb) {
  console.log("LOCAL AUTH")
  const user = await User.findOne({ where: { email: username }})
  if (!user) return (null, false)
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
  console.log(req.body)
  passport.authenticate('local', (err, user, info) => {
    console.log(info)
    if (err) 
      return next(err)
    if (!user) 
      return res.status(401).json({ status: 'error', code: 'unauthorized' })
  
    return res.json({ message, token: jwt.sign({ id: user.id, email: user.email }, jwtSecret) })
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