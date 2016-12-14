import jwtDecode from 'jwt-decode'

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from '../actions/authActions'

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from '../actions/registerActions'

const initialState = {
  token: null,
  email: null,
  isAuthenticated: false,
  isAuthenticating: false,
  failure: false,
  id: null,
  name: null,
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
        email: decoded.email,
        token: action.payload.token,
        message: action.payload.message,
        failure: false,
        id: decoded.id,
        name: decoded.fullname,
      }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        failure: true,
      }
    case LOGOUT_USER:
      return initialState
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        isAuthenticating: true, // TODO: fix shit so it makes sense
      }
    }
    case REGISTER_USER_FAILURE: {
      return {
        ...state,
        isAuthenticating: false,
        failure: true,
      }
    }
    case REGISTER_USER_SUCCESS: {
      const decoded = jwtDecode(action.payload.token)

      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        friends: action.payload.friends,
        email: decoded.email,
        token: action.payload.token,
        message: action.payload.message,
        name: action.payload.name,
        id: decoded.id,
        failure: false,
      }
    }
    default:
      return state
  }
}

export default auth
