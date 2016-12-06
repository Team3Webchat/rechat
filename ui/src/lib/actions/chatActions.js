export const SEND_PRIVATE_MESSAGE = 'SEND_PRIVATE_MESSAGE'
export const RECEIVE_PRIVATE_MESSAGE = 'RECEIVE_PRIVATE_MESSAGE'
export const CONNECTED = 'CONNECTED'
export const DISCONNECT = 'DISCONNECT'
export const CONNECT_CHAT = 'CONNECT_CHAT'
export const SELECT_ACTIVE_CHAT = 'SELECT_ACTIVE_CHAT'

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