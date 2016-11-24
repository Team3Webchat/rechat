import { LOGIN_USER_SUCCESS } from '../actions/authActions'

const initialState = {
  friends: [],
}

export default function friends(state = initialState, action) {
  switch(action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        friends: action.payload.friends,
      }
    default:
      return state
  }
}