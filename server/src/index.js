import { Server } from 'hapi'

const server = new Server()

server.connection({
  port: 8000,
  routes: {
    cors: true,
  }
})

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply('Hello')
  }
})

server.start((err) => {
  if (err)
    throw err

  console.log(`Server running at ${server.info.uri}`)
})

