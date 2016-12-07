import io from 'socket.io-client'

import {
  connectChat,
  endPrivateMessage,
  receivePrivateMessage,
  connected,
  disconnect,
  START_PRIVATE_CHAT,
  DELETE_CHAT_HISTORY,

} from '../actions/chatActions'
import { LOGIN_USER_SUCCESS, LOGOUT_USER } from '../actions/authActions'
import {
  SEND_FRIEND_REQUEST_SUCCESS,
  ACCEPT_FRIEND_REQUEST_SUCCESS,
  DELETE_FRIEND_SUCCESS,
} from '../actions/friendsActions'

const socketMiddleware = (function() {
  let socket = null
  let authenticated = false

  const onConnect = (ws, store, token) => {
    socket.emit('authenticate', { token })
    .on('authenticated', () => {
      authenticated = true
      console.log('Socket connection authenticated with token')
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

  const onNewMessage = (ws, store, data) => {
    store.dispatch(receivePrivateMessage({
      chatId: data.chatId,
      content: data.content,
      userId: data.userId,
      id: data.id,
      createdAt: data.createdAt,
    }))
  }

  const onPrivateConversationStart = (ws, store, data) => {
    store.dispatch(connectChat({
      chatId: data.chatId,
      messages: data.messages,
      friendId: data.friendId,
    }))
  }

  const onFriendRequest = (ws, store, data) => {
    console.log(data)
  }

  const onDeleteFriend = (ws, store, data) => {
    console.log(data)
  }
  return store => next => async action => {
    switch (action.type) {
      case LOGIN_USER_SUCCESS:

        socket = io('http://localhost:8000')

        socket.on('connect', () => onConnect(socket, store, action.payload.token))
        socket.on('disconnect', () => onDisconnect(socket, store))
        socket.on('private_conversation_start', data => onPrivateConversationStart(socket, store, data))
        socket.on('new_message', data => onNewMessage(socket, store, data))
        socket.on('friend_request', data => onFriendRequest(socket, store, data))
        socket.on('delete_friend', data => onDeleteFriend(socket, store, data))

        socket.on('private_conversation_start', data => {
          store.dispatch(connectChat({ chatId: data.chatId, messages: data.messages, friendId: data.friendId}))
        })

        if (action.payload.friends) {
          // On login with credentials, GET_FRIENDS_SUCCESS is never fired since the friends
          // are sent with the success login body, so this is a workaround to connect to all
          // private chats. Would probably need a redesign of the flow here but it works for now


          await Promise.all(action.payload.friends.map(friend =>

            socket.emit('private_conversation', {id: friend.id}))
          )
        }
        return next(action)
      case 'GET_FRIENDS_SUCCESS':
        const { friends } = action.payload

        await Promise.all(friends.map(friend =>
          socket.emit('private_conversation', {id: friend.id}))
        )

        return next(action)
      case LOGOUT_USER:
        if (socket !== null)
          socket.close()
        socket = null
        store.dispatch(disconnect())
        return next(action)
      case 'SEND_PRIVATE_MESSAGE':
        socket.emit('new_message', {
          content: action.payload.content,
          userId: action.payload.userId,
          chatId: action.payload.chatId,
        })
        return next(action)
      case DELETE_CHAT_HISTORY:
        return next(action)
      case SEND_FRIEND_REQUEST_SUCCESS:
        socket.emit('friend_request', { id: action.payload.friendId })
        return next(action)

      case DELETE_FRIEND_SUCCESS:
        socket.emit('delete_friend', { id: action.payload.friendId })
        return next(action)
      default:
        return next(action)
    }
  }
})()

export default socketMiddleware
