import { Router } from 'express'

import { login } from '../../lib/auth'

const authRouter = Router()

authRouter.route('/login')
  .post(login)

export default authRouter


//   app.all('*', function(req, res, next) {
//     passport.authenticate('bearer', function(err, user, info) {
//       if (err) return next(err)
//       if (user) {
//         req.user = user
//         return next()
//       } else {
//         return res.status(401).json({ status: 'error', code: 'unauthorized' })
//       }
//     })(req, res, next)
//   })

//   app.get('/message', function(req, res) {
//     return res.json({
//       status: 'ok',
//       message: 'Congratulations ' + req.user.username + '. You have a token.',
//     })
//   })