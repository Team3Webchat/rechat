import jwt from 'jsonwebtoken'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import BearerStrategy from 'passport-http-bearer'

// Just dummy data for now until a db is implemented
const jwtSecret = 'supersecret'
const users = [
  { id: 0, username: 'test', password: 'test'},
  { id: 1, username: 'tast', password: 'test'},
  { id: 2, username: 'tyst', password: 'test'},
  { id: 3, username: 'tysk', password: 'test'},
]

const localCb = (username, password, cb) => {
  const user = users.filter(u => 
    u.username === username && 
    u.password === password
  )[0]
  return cb(null, user ? user : false)
}

const bearerCb = (token, cb) => {
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return cb(err)
    const user = users[decoded.id]
    return cb(null, user ? user : false)
  })
}

passport.use(new LocalStrategy(localCb))
passport.use(new BearerStrategy(bearerCb))

export function login(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) 
      return next(err)
    if (!user) 
      return res.status(401).json({ status: 'error', code: 'unauthorized' })
    else 
      return res.json({ token: jwt.sign({ id: user.id, username: user.username }, jwtSecret) })
  })(req, res, next)
}



export default passport