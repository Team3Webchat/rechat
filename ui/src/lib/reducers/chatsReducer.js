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
<<<<<<< HEAD
      const current = state.chats.find(c => action.payload.friendId === c.friendId)
=======
      state.chats.find(c => action.payload.friendId === c.friendId)
>>>>>>> 833d5a96b987be6063560c1ad429443a1ee11c09
      return {
        ...state,
        currentChatId: state.chats.find(c => c.friendId === action.payload.friendId)['chatId'],
      }
<<<<<<< HEAD
    case actions.DELEATE_CHAT_HISTORY:      
      return {
        ...state,
        chats: state.chats.map(chat => {
          if (chat.chatId !== action.payload.chatId)
            return chat
          return {
            ...chat,
            messages: [],
          }
        }),

      }
    case actions.RECEIVE_PRIVATE_MESSAGE:
      console.log(action.payload)
=======
    case actions.RECEIVE_PRIVATE_MESSAGE:
>>>>>>> 833d5a96b987be6063560c1ad429443a1ee11c09
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
