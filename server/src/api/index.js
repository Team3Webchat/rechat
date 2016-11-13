import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import logger from 'morgan'
import helmet from 'helmet'
import httpStatus from 'http-status'
import winston from 'winston'
import expressWinston from 'express-winston'
import jwt from 'jsonwebtoken'

import routes from './routes'
import passport from './../lib/auth'

function createServer() {

  const app = express()

  // Apply 3rd party middleware
  app.use(cors())
  app.use(bodyParser.json())
  app.use(logger('dev'))
  app.use(helmet()) 
  app.use(passport.initialize())
  

  // logger
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorized: true,
      }),
    ],
  }))

  // bootstrap routes
  app.use('/api', routes)

  /**
   * 
   * TEST CODE REMOVE
   */
  // First login to receive a token
  const secret = 'supersecret'
  app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) return next(err)
      if (!user) {
        return res.status(401).json({ status: 'error', code: 'unauthorized' })
      } else {
        return res.json({ token: jwt.sign({id: user.id}, secret) })
      }
    })(req, res, next)
  })

  // All routes from this point on need to authenticate with bearer:
  // Authorization: Bearer <token here>
  app.all('*', function(req, res, next) {
    passport.authenticate('bearer', function(err, user, info) {
      if (err) return next(err)
      if (user) {
        req.user = user
        return next()
      } else {
        return res.status(401).json({ status: 'error', code: 'unauthorized' })
      }
    })(req, res, next)
  })

  app.get('/message', function(req, res) {
    return res.json({
      status: 'ok',
      message: 'Congratulations ' + req.user.username + '. You have a token.',
    })
  })


  // error logger, should be after routes
  app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorized: true,
      }),
    ],
  }))

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('API not found', httpStatus.NOT_FOUND)
    return next(err)
  })

  return http.createServer(app)
}



export async function startServer() {
  const server = createServer()  
  const port = process.env.PORT || 8000
  
  await server.listen(port)
  console.log(`Started on port ${server.address().port}`)  
}
