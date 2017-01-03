import * as actions from '../actions/chatActions'

const initialState = {
  privateChats: [],
  groupChats: [],
  currentChatId: '',
  isLoadingChats: true,
}

export default function chats(state = initialState, action) {
  switch(action.type) {
    case actions.CONNECT_CHAT:
      return {
        ...state,
        privateChats: [...state.privateChats, action.payload],
        isLoadingChats: false,
      }

    case actions.CONNECT_TO_GROUP_CHAT:
      return {
        ...state,
        groupChats: [...state.groupChats, action.payload],
        isLoadingChats: false,
      }

    case actions.SELECT_ACTIVE_PRIVATE_CHAT:
      const current = state.privateChats.find(c => action.payload.friendId === c.friendId)
      return {
        ...state,
        currentChatId: state.privateChats.find(c => c.friendId === action.payload.friendId)['chatId'],
      }
      
    case actions.SELECT_ACTIVE_GROUP_CHAT:
      console.log('SELECT_ACTIVE_GROUP_CHAT');

    case actions.DELETE_CHAT_HISTORY:
    case actions.FRIEND_DELETED_CHAT_HISTORY:
      return {
        ...state,
        privateChats: state.privateChats.map(chat => {
          if (chat.chatId !== action.payload.chatId)
            return chat
          return {
            ...chat,
            messages: [],
          }
        }),
      }

    case actions.RECEIVE_PRIVATE_MESSAGE:
      return {
        ...state,
        privateChats: state.privateChats.map(chat => {
          if (chat.chatId !== action.payload.chatId)
            return chat
          return {
            ...chat,
            messages: [...chat.messages, action.payload],
          }
        }),
      }
    default:
      return state
  }
}

export const getActivePrivateChat = state => {
  const { currentChatId, privateChats } = state.chats
  return privateChats.find(c => c.chatId === currentChatId)
}
