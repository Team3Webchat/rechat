import jwtDecode from 'jwt-decode'
import { push } from 'react-router-redux'

// Login actions
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGOUT_USER = 'LOGOUT_USER'

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST,
  }
}

export function loginUserSuccess({token, message}) {
  console.log(token)
  localStorage.setItem('token', token) // move this elswhere later
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token,
      message,
    },
  }
}

export function loginUserFailure(error) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusTest: error.response.statusText,
    },
  }
}

export function logout(message = 'Bye bye! Please come again!') {
  localStorage.removeItem('token')
  return {
    type: LOGOUT_USER,
    payload: {
      message,
    },
  }
}

export function loginUser(email, password) {
  return async function(dispatch) {
    dispatch(loginUserRequest())
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        /*credentials: 'include', */ // Server has wildcard for cors atm
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json()
      const decodedToken = jwtDecode(json.token)
      console.log(decodedToken)
      dispatch(loginUserSuccess({token: json.token, message: json.message}))
    } catch(e) {
      dispatch(loginUserFailure({
        response: {
          status: 403,
          statusText: 'Invalid Token',
        },
      }))
    }
    
  }
}

