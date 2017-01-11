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

    /*case actions.SELECT_ACTIVE_PRIVATE_CHAT:
      const current = state.privateChats.find(c => action.payload.friendId === c.friendId)
      return {
        ...state,
        currentChatId: state.privateChats.find(c => c.friendId === action.payload.friendId)['chatId'],
      }

    case actions.SELECT_ACTIVE_GROUP_CHAT:
      console.log('SELECT_ACTIVE_GROUP_CHAT')
      const currentGroupChat = state.groupChats.find(c => action.payload.chatId === c.chatId)
      return {
        ...state,
        currentChatId: state.groupChats.find(c => c.chatId === action.payload.chatId)['chatId'],
      }*/
    case actions.SELECT_ACTIVE_CHAT:
      const groupChat = state.groupChats.find(c => action.payload.id === c.chatId)
      const privateChat = state.privateChats.find(c => action.payload.id === c.friendId)
      console.log('setting current chat');

      return {
        ...state,
        currentChatId: action.payload.id,
      }

    case actions.DELETE_CHAT_HISTORY:
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
      const chat = getActiveChat()
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

    case actions.FLASH_FAILURE:
    return {
      ...state,
      flash: action.payload.flash,
    }

    default:
      return state
  }
}

/*export const getActivePrivateChat = state => {
  const { currentChatId, privateChats } = state.chats
  return privateChats.find(c => c.chatId === currentChatId)
}
export const getActiveGroupChat = state => {
  const { currentChatId, groupChats } = state.chats
  return groupChats.find(c => c.chatId === currentChatId)
}*/
export const getActiveChat = (id, state) => {
  const { groupChats, privateChats } = state.chats
  const group = groupChats.find(c => c.chatId === id)
  const priv = privateChats.find(c => c.friendId === id)
  console.log('getActiveChat----');
}
export const getActiveGroupChatFriends = (id, state) => {
  const { groupChats } = state.chats
  const chat = groupChats.find(c => c.chatId === id)
  return chat ? chat.friendNames : null
}
