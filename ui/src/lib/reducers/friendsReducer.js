import { LOGIN_USER_SUCCESS } from '../actions/authActions' 
import { 
  GET_FRIENDS_SUCCESS, 
  GET_FRIENDS_FAILURE, 
  SEND_FRIEND_REQUEST_SUCCESS,
  SEND_FRIEND_REQUEST_FAILURE,
} from '../actions/friendActions'

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
      console.log(action.payload)
      return {
        friends: action.payload.friends,
        friendRequests: action.payload.friendRequests,
        sentFriendRequests: action.payload.sentFriendRequests,
      }
    default:
      return state
  }
}