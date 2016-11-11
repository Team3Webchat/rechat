import { Server } from 'hapi'

const server = new Server()

server.connection({
  port: process.env.PORT || 8000,
  host: '0.0.0.0',
  routes: {
    cors: true,
    }
})

server.route({
  method: 'GET',
  path: '/api/test',
  handler: (request, reply) => {
    reply('Hello')
  }
})

server.start((err) => {
  if (err)
    throw err

  console.log(`Server running at ${server.info.uri}`)
})

