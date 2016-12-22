export const SEND_PRIVATE_MESSAGE = 'SEND_PRIVATE_MESSAGE'
export const RECEIVE_PRIVATE_MESSAGE = 'RECEIVE_PRIVATE_MESSAGE'
export const CONNECTED = 'CONNECTED'
export const DISCONNECT = 'DISCONNECT'
export const CONNECT_CHAT = 'CONNECT_CHAT'
export const SELECT_ACTIVE_CHAT = 'SELECT_ACTIVE_CHAT'
export const DELETE_CHAT_HISTORY = 'DELETE_CHAT_HISTORY'
export const FRIEND_DELETED_CHAT_HISTORY = 'FRIEND_DELETED_CHAT_HISTORY'
export const PRIVATE_GROUP_CONVERSATION = 'PRIVATE_GROUP_CONVERSATION'
export const ADD_FREINDS_TO_CHAT= 'ADD_FREINDS_TO_CHAT'



export const connectToGroupChat = ({ friendIds, chatId, messages }) => ({
  type: PRIVATE_GROUP_CONVERSATION,
  payload: {
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

export const selectActiveChat = ({ friendId }) => ({
  type: SELECT_ACTIVE_CHAT,
  payload: {
    friendId,
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

export const sendPrivateMessage = ({content, userId, chatId }) => ({
  type: SEND_PRIVATE_MESSAGE,
  payload: {
    content,
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


export const receivePrivateMessage = ({content, userId, chatId, id, createdAt}) => ({
  type: RECEIVE_PRIVATE_MESSAGE,
  payload: {
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
