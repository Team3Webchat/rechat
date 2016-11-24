import { LOGIN_USER_SUCCESS } from '../actions/authActions' 
import { 
  GET_FRIENDS_SUCCESS, 
  GET_FRIENDS_FAILURE, 
  SEND_FRIEND_REQUEST_SUCCESS,
  SEND_FRIEND_REQUEST_FAILURE,
  ACCEPT_FRIEND_REQUEST_SUCCESS,
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

    default:
      return state
  }
}