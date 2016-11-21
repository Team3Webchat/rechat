import jwtDecode from 'jwt-decode'
import { push } from 'react-router-redux'

import { baseUrl } from './'


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

export function loginUserSuccess({token, flash}) {

  localStorage.setItem('token', token) // move this elswhere later
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token,
      flash,
    },
  }
}

export function loginUserFailure({flash}) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      flash,
    },
  }
}

export function logout({ flash }) {
  localStorage.removeItem('token')
  return {
    type: LOGOUT_USER,
    payload: {
      flash,
    },
  }
}

export function loginUser(email, password) {
  return async function(dispatch) {
    dispatch(loginUserRequest())
    try {
      console.log('fetch')
      const res = await fetch(baseUrl + 'login', {
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
      console.log(res)
      const json = await res.json()
      console.log(json)
      const decodedToken = jwtDecode(json.token)
      dispatch(loginUserSuccess({
        token: json.token, 
        flash: {
          message: 'Successful login',
          type: 'success',
        },
      }))
    } catch(e) {
      console.log('Error signing user in')
      dispatch(loginUserFailure({
        flash: {
          message: 'Wrong credentials, try again',
          type: 'fail',
        },
      }))
    }
    
  }
}

