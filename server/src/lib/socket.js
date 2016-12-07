import SocketIO from 'socket.io'
import socketioJwt from 'socketio-jwt'

import { onNewMessage, onPrivateConversation, onDeleateConversation } from './chat'

export const createSocket = (app, server) => {

  const io = new SocketIO(server)
  // io.set('origins', CLIENT_URL)
  // HACK FOR NOW FIX LATER
  io.set('origins', '*:*')
  return io
}

export const startSocket = io => {
  io.sockets.on('connection', socketioJwt.authorize({
    secret: 'supersecret',
    timeout: 15000,
  })).on('authenticated', socket => connection(socket, io))
}

function connection(socket, io) {

  socket.on('new_message', async data => {

    onNewMessage(data, io)
  })
  socket.on('private_conversation', async data => {

    onPrivateConversation(data, socket)
  })


  socket.on('deleate_conversation', async data => {

    onDeleateConversation(data, socket)
  })
}
