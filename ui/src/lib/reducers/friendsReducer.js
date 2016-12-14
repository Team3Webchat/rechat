import { LOGIN_USER_SUCCESS } from '../actions/authActions'
import {
  GET_FRIENDS_SUCCESS,
  SEND_FRIEND_REQUEST_SUCCESS,
  ACCEPT_FRIEND_REQUEST_SUCCESS,
  DELETE_FRIEND_SUCCESS,
  GOT_FRIEND_REQUEST,
} from '../actions/friendsActions'

const initialState = {
  friends: [],
  friendRequests: [],
  sentFriendRequests: [],
}

export default function friends(state = initialState, action) {
  switch(action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        friends: action.payload.friends,
        friendRequests: action.payload.friendRequests,
        sentFriendRequests: action.payload.sentFriendRequests,
      }
    case GET_FRIENDS_SUCCESS:
      return {
        friends: action.payload.friends,
        friendRequests: action.payload.friendRequests,
        sentFriendRequests: action.payload.sentFriendRequests,
      }
    case ACCEPT_FRIEND_REQUEST_SUCCESS:
      const friend = state.friendRequests.find(f => f.id === action.payload.friendId)

      const r = state.friendRequests
      return {
        friends: [...state.friends, friend],
        friendRequests: state.friendRequests.filter(f => f.id !== action.payload.friendId),
        sentFriendRequests: state.sentFriendRequests,
      }
    case SEND_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        sentFriendRequests: action.payload.sentFriendRequests,
      }
    case GOT_FRIEND_REQUEST:
      console.log(action.payload)
      return {
        ...state,
        friendRequests: [...state.friendRequests, action.payload.friend],
      }
    case DELETE_FRIEND_SUCCESS:
      const { friendId } = action.payload
      return {
        ...state,
        friends: state.friends.filter(f => f.id !== friendId),
        friendRequests: state.friendRequests.filter(f => f.id !== friendId),
        sentFriendRequests: state.sentFriendRequests.filter(f => f.id !== friendId),
      }
    

    default:
      return state
  }
}


export const getFriendById = state => {
  const { currentChatId, chats } = state.chats
  const chat = chats.find(c => c.chatId === currentChatId)
  return state.friends.friends.find(f => f.id === f.friendId)
}
