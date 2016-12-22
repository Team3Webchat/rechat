import io from 'socket.io-client'

import {
  connectChat,
  endPrivateMessage,
  receivePrivateMessage,
  connected,
  disconnect,
  START_PRIVATE_CHAT,
  DELETE_CHAT_HISTORY,
  friendDeletedChatHistory,
  onPrivateGroupConversation,

} from '../actions/chatActions'
import { LOGIN_USER_SUCCESS, LOGOUT_USER } from '../actions/authActions'
import {
  SEND_FRIEND_REQUEST,
  SEND_FRIEND_REQUEST_SUCCESS,
  ACCEPT_FRIEND_REQUEST_SUCCESS,
  DELETE_FRIEND_SUCCESS,
  sendFriendRequest,
  sendFriendRequestFailure,
  sendFriendRequestSuccess,
  gotFriendRequest,
  friendRequestAccepted,

} from '../actions/friendsActions'
import { API_URL } from '../config'

const socketMiddleware = (function() {
  console.log(API_URL)
  let socket = null
  let authenticated = false

  const onConnect = (ws, store, token) => {
    socket.emit('authenticate', { token })
    .on('authenticated', () => {
      authenticated = true
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

//TODO gör en sån här
//TODO Kopiera meddelanden
//TODO Make groupchat
  const onPrivateConversationStart = (ws, store, data) => {
    store.dispatch(connectChat({
      chatId: data.chatId,
      messages: data.messages,
      friendId: data.friendId,
    }))
  }

  const onPrivateGroupeConversationStart = (ws, store, data) => {
    store.dispatch(onPrivateGroupConversation({
      chatId: data.chatId,
      messages: data.messages,
      friendIds: data.friendIds,
    }))
  }


  const onSentFriendRequests = (ws, store, data) => {
    console.log(data)
    store.dispatch(sendFriendRequestSuccess({
      flash: {
        message: 'Sent friend request to a fella',
        type: 'success',
      },
      sentFriendRequests: data.sentFriendRequests,
    }))
  }

  const onGottenFriendRequest = (ws, store, data) => {
    console.log(data)
    store.dispatch(gotFriendRequest(data.friend))
  }

  const onDeleteFriend = (ws, store, data) => {

  }

  const onDeletedHistory = (ws, store, data) => {
    const { chatId } = data
    store.dispatch(friendDeletedChatHistory({chatId}))
  }

  const onFriendRequestAccepted = (ws, store, data) => {
    console.log(data)
    store.dispatch(friendRequestAccepted(data))

  }
  return store => next => async action => {
    switch (action.type) {
      case LOGIN_USER_SUCCESS:
      case 'REGISTER_USER_SUCCESS':

        socket = io(API_URL)

        socket.on('connect', () => onConnect(socket, store, action.payload.token))
        socket.on('disconnect', () => onDisconnect(socket, store))
        socket.on('private_conversation_start', data => onPrivateConversationStart(socket, store, data))
        socket.on('new_message', data => onNewMessage(socket, store, data))
        socket.on('friend_request_sent', data => onSentFriendRequests(socket, store, data))
        socket.on('friend_request_gotten', data => onGottenFriendRequest(socket, store, data))
        socket.on('delete_friend', data => onDeleteFriend(socket, store, data))
        socket.on('friend_request_accepted', data => onFriendRequestAccepted(socket, store, data))
        socket.on('delete_conversation', data => onDeletedHistory(socket, store, data))



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
        console.log(friends)

        if (friends) {
          await Promise.all(friends.map(friend =>
            socket.emit('private_conversation', {id: friend.id}))
          )
        }
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
        console.log("DELETIOONG DELETING DLEITING")
        console.log(action.payload)
        socket.emit('delete_conversation', {
          chatId: action.payload.chatId,
          friendId: action.payload.friendId,
        })
        return next(action)
      case SEND_FRIEND_REQUEST:

        socket.emit('friend_request', { id: action.payload.friendId })
        return next(action)

      case DELETE_FRIEND_SUCCESS:
        return next(action)
      case ACCEPT_FRIEND_REQUEST_SUCCESS:
        socket.emit('friend_request_accepted', { id: action.payload.friendId, friendId: store.getState().auth.id })
        socket.emit('private_conversation', { id: action.payload.friendId})
        return next(action)
      case 'FRIEND_REQUEST_ACCEPTED':
        socket.emit('private_conversation', { id: action.payload.friendId })
        return next(action)
      default:
        return next(action)
    }
  }
})()

export default socketMiddleware
