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
      }
    case LOGIN_USER_FAILURE: 
      return {
        ...state,
        isAuthenticating: false,
        failure: true,
      }
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        email: null,
        failure: false,
      }
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
        email: decoded.email,
        token: action.payload.token,
        message: action.payload.message,
        failure: false,
      }
    }
    default:
      return state
  }
}

export default auth