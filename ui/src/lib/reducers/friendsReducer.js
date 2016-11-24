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
}

export default function friends(state = initialState, action) {
  switch(action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        friends: action.payload.friends,
      }
    case GET_FRIENDS_SUCCESS:
      return {
        friends: action.payload.friends,
      }
    default:
      return state
  }
}