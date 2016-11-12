import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
app.server = http.createServer()

// 3rd party middlewares
const jsonParser = bodyParser.json()

app.use(cors())
app.use(jsonParser)


app.server.listen(process.env.PORT || 8000)
console.log(`Started on port ${app.server.address().port}`)

