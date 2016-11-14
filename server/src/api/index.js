import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import logger from 'morgan'
import helmet from 'helmet'
import httpStatus from 'http-status'
import winston from 'winston'
import expressWinston from 'express-winston'

import routes from './routes'
import passport from '../lib/auth'
import { connectToDb } from '../lib/db'

async function createServer() {

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
        formatter: ({level, message, meta}) => `${new Date().toTimeString()} ${level}: ${message}`,
      }),
    ],

  }))

  // bootstrap routes
  app.use('/api', routes)

  // error logger, should be after routes
  app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
      }),
    ],
  }))

  // await connectToDb()

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('API not found', httpStatus.NOT_FOUND)
    return next(err)
  })

  return http.createServer(app)
}



export async function startServer() {
  const server = await createServer()
  const port = process.env.PORT || 8000

  await server.listen(port)
  console.log(`Started on port ${server.address().port}`)
}
