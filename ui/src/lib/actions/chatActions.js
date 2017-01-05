import { baseUrl } from './'
import { getHeaders } from '../api'
import { getUserId } from '../selectors'

export const SEND_PRIVATE_MESSAGE = 'SEND_PRIVATE_MESSAGE'
export const RECEIVE_PRIVATE_MESSAGE = 'RECEIVE_PRIVATE_MESSAGE'
export const CONNECTED = 'CONNECTED'
export const DISCONNECT = 'DISCONNECT'
export const CONNECT_CHAT = 'CONNECT_CHAT'
export const SELECT_ACTIVE_PRIVATE_CHAT = 'SELECT_ACTIVE_PRIVATE_CHAT'
export const SELECT_ACTIVE_GROUP_CHAT = 'SELECT_ACTIVE_GROUP_CHAT'
export const DELETE_CHAT_HISTORY = 'DELETE_CHAT_HISTORY'
export const FRIEND_DELETED_CHAT_HISTORY = 'FRIEND_DELETED_CHAT_HISTORY'
export const CONNECT_TO_GROUP_CHAT = 'PRIVATE_GROUP_CONVERSATION'
export const ADD_FREINDS_TO_CHAT= 'ADD_FREINDS_TO_CHAT'
export const FLASH_FAILURE = 'FLASH_FAILURE'


export const connectToGroupChat = ({ friendNames, friendIds, chatId, messages }) => ({
  type: CONNECT_TO_GROUP_CHAT,
  payload: {
    friendNames,
    friendIds,
    messages,
    chatId,
  },
})
export const connectChat = ({ friendId, chatId, messages }) => ({
  type: CONNECT_CHAT,
  payload: {
    friendId,
    chatId,
    messages,
  },
})

export const selectActivePrivateChat = ({ friendId }) => ({
  type: SELECT_ACTIVE_PRIVATE_CHAT,
  payload: {
    friendId,
  },
})

export const selectActiveGroupChat = ({ chatId }) => ({
  type: SELECT_ACTIVE_GROUP_CHAT,
  payload: {
    chatId,
  },
})

export const connected = () => ({
  type: CONNECTED,
  payload: {
    isConnected: true,
  },
})

export const disconnect = () => ({
  type: DISCONNECT,
  payload: {
    isConnected: false,
  },
})

export const sendPrivateMessage = ({content, messageType, userId, chatId }) => ({
  type: SEND_PRIVATE_MESSAGE,
  payload: {
    content,
    messageType,
    userId,
    chatId,
  },
})

export const friendDeletedChatHistory = ({chatId}) => {
  return ({
    type: FRIEND_DELETED_CHAT_HISTORY,
    payload: {
      chatId,
    }
  })
}

export const deleteChatHistory = ({chatId, friendId }) => {
  return ({
    type: DELETE_CHAT_HISTORY,
    payload: {
      chatId,
      friendId,
    },
  })
}

export const receivePrivateMessage = ({content, messageType, userId, chatId, id, createdAt}) => ({
  type: RECEIVE_PRIVATE_MESSAGE,
  payload: {
    messageType,
    content,
    userId,
    chatId,
    id,
    createdAt,
  },
})
export const addFriendsToChat = ({friends, chatId}) => ({
  type: ADD_FREINDS_TO_CHAT,
  payload: {
    friends,
    chatId,
  },
})
const flashFailure = ({flash}) => ({
  type: FLASH_FAILURE,
  payload: {
    flash,
  },
})

export const getGroupConversations = (id = getUserId()) =>
  async function(dispatch) {
    try {
      console.log(id);
      const res = await fetch(`${baseUrl}users/${id}/groupConversations`, {
        method: 'GET',
        headers: getHeaders(),
      })

      const json = await res.json()
      if (json.length > 0) {
        json.forEach(chat => {
          dispatch(connectToGroupChat({
            friendNames: chat.friendNames,
            chatId: chat.chatId,
            friendIds: chat.friendIds,
            messages: chat.messages,
          }))
        })
      }else{
        throw Error(json.message)
      }

    } catch (e) {
      dispatch(flashFailure({
        flash: {
          message: e.message,
          type: 'fail',
        },
      }))
    }
  }
