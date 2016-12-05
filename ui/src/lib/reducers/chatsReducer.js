import { LOGIN_USER_SUCCESS } from '../actions/authActions'
import * as actions from '../actions/chatActions'
import store from '../store'
const initialState = {
  currentChatId: '',
  chats: [],
}

export default function chats(state = initialState, action) {
  switch(action.type) {
    case actions.CONNECT_CHAT:
      return {
        ...state,
        chats: [...state.chats, action.payload],
      }
    case actions.SELECT_ACTIVE_CHAT: 
      console.log('Actionpayload', action.payload.friendId)
      console.table(state.chats)
      const current = state.chats.find(c => action.payload.friendId === c.friendId)
      console.log(current)
      return {
        ...state,
        currentChatId: state.chats.find(c => c.friendId === action.payload.friendId)['chatId'],
      }
    case actions.RECEIVE_PRIVATE_MESSAGE:  
      console.log(action.payload)
      return {
        ...state,
        chats: state.chats.map(chat => {
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

export const getActiveChat = state => {

  const { currentChatId, chats } = state.chats
  
  return chats.find(c => c.chatId === currentChatId)
}


