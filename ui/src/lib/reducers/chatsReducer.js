import * as actions from '../actions/chatActions'

const initialState = {
  currentChatId: '',
  chats: [],
  isLoadingChats: true,
}

export default function chats(state = initialState, action) {
  switch(action.type) {
    case actions.CONNECT_CHAT:
      return {
        ...state,
        chats: [...state.chats, action.payload],
        isLoadingChats: false,
      }
    case actions.SELECT_ACTIVE_CHAT:
      state.chats.find(c => action.payload.friendId === c.friendId)
      return {
        ...state,
        currentChatId: state.chats.find(c => c.friendId === action.payload.friendId)['chatId'],
      }
    case actions.RECEIVE_PRIVATE_MESSAGE:
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
