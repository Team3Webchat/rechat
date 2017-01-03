import SocketIO from 'socket.io'
import socketioJwt from 'socketio-jwt'

import { onNewMessage, onPrivateConversation, onDeleteConversation, onPrivateGroupConversation } from './chat'
import { onFriendRequest, onFriendRequestAccept } from './friendships'

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

const connectedUsers = {}

function connection(socket, io) {
  connectedUsers[socket.decoded_token.id] = socket.id

  socket.emit('user_connected', { userId: socket.decoded_token.id})
  socket.on('new_message', async data => {
    onNewMessage(data, io)
  })
  socket.on('private_group_conversation', async data =>{
    onPrivateGroupConversation(data, socket)
  })
  socket.on('private_conversation', async data => {
    onPrivateConversation(data, socket)
  })

  socket.on('delete_conversation', async data => {
    onDeleteConversation(data, io, connectedUsers)
  })

  socket.on('friend_request', async data => {
    onFriendRequest(data, socket, io, connectedUsers)
  })

  socket.on('disconnect', () => {
    delete connectedUsers[socket.decoded_token.id]
    socket.emit('user_disconnected', { userId: socket.decoded_token.id})
  })

  socket.on('friend_request_accepted', async data => {
    onFriendRequestAccept(data, socket, io, connectedUsers)

  })

}
