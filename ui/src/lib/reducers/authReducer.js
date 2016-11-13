import jwtDecode from 'jwt-decode'

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
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

function auth(state = initialState, action) {
  switch(action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
      }
    case LOGIN_USER_SUCCESS:
      const decoded = jwtDecode(action.payload.token)

      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        username: decoded.username,
        token: action.payload.token,
        statusText: `Welcome ${decoded.username}`,
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

export default auth