import { LOGIN_USER_SUCCESS } from '../actions/authActions'

const initialState = {
  chats: [],
}

export default function chats(state = initialState, action) {
  switch(action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        chats: action.payload.chats,
      }
    default:
      return state
  }
}