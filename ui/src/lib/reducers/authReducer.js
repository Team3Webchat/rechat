

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from '../actions/authActions'

const initialState = {
  token: null,
  username: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
}

function authReducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
      }
    case LOGIN_USER_SUCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        username: action.payload.username,
        token: action.payload.token,
        statusText: `Welcome ${action.payload.username}`,
      }
    case LOGIN_USER_FAILURE: 
      return {
        ...state,
        isAuthenticating: false,
        statusText: `Authentication error: 
          ${action.payload.status} 
          ${action.payload.statisText}`,
      }
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        username: null,
        statusText: 'You have successfully logged out.',
      }
    default:
      return state
  }
}

export default authReducer