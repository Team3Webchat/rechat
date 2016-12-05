import io from 'socket.io-client'

import { 
  connectChat,
  endPrivateMessage, 
  receivePrivateMessage, 
  connected,
  disconnect,
  START_PRIVATE_CHAT,
  

} from '../actions/chatActions'
import { LOGIN_USER_SUCCESS, LOGOUT_USER } from '../actions/authActions'

const socketMiddleware = (function() {
  let socket = null

  const onConnect = (ws, store, token) => {

    socket.emit('authenticate', { token })
    .on('authenticated', () => {

    })
    .on('unauthorized', function(msg) {
      console.log('unauthorized: ' + JSON.stringify(msg.data))
      throw new Error(msg.data.type)
    })
    store.dispatch(connected())
  }

  const onDisconnect = (ws, store) => {
    store.dispatch(disconnect())
  }


  return store => next => action => {
    switch (action.type) {
      case LOGIN_USER_SUCCESS:


        socket = io('http://localhost:8000')

        socket.on('connect', () => onConnect(socket, store, action.payload.token))
        socket.on('disconnect', () => onDisconnect(socket, store))

        socket.on('private_conversation_start', data => {
          store.dispatch(connectChat({ chatId: data.chatId, messages: data.messages, friendId: data.friendId}))
        })
        socket.on('new_message', data => {
          store.dispatch(receivePrivateMessage({ 
            chatId: data.chatId, 
            content: data.content, 
            userId: data.userId, 
            id: data.id,
            createdAt: data.createdAt, 
          }))
        })

        next(action)
        break
      case 'GET_FRIENDS_SUCCESS':
        const { friends } = action.payload
        

        friends.forEach(friend => {

          socket.emit('private_conversation', {
            id: friend.id,
          })
        })
        next(action)
        break
      case LOGOUT_USER:
        if (socket !== null)
          socket.close()
        socket = null
        store.dispatch(disconnect())
        next(action)
        break
      case 'SEND_PRIVATE_MESSAGE':
        socket.emit('new_message', {
          content: action.payload.content,
          userId: action.payload.userId,
          chatId: action.payload.chatId,
        })
        next(action)
        break

      default:
        return next(action)
       
    }
  }
})()

export default socketMiddleware