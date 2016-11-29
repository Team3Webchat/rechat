import jwtDecode from 'jwt-decode'

import { baseUrl } from './'


// Login actions
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGOUT_USER = 'LOGOUT_USER'

export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
})

export function loginUserSuccess({token, flash, friends, friendRequests, sentFriendRequests, name}) {
  // TODO: check if user wants to be remembered, in that case, set the token
  // to local storage

  localStorage.setItem('token', token) // move this elswhere later
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token,
      flash: { ...flash, persistOnRouteTransition: true },
      friends,
      friendRequests,
      sentFriendRequests,
      name,
    },
  }
}

export const loginUserFailure = ({flash}) => ({
  type: LOGIN_USER_FAILURE,
  payload: {
    flash: { ...flash, persistOnRouteTransition: false },
  },
})

export function logout({flash}) {
  localStorage.removeItem('token')
  return {
    type: LOGOUT_USER,
    payload: {
      flash: { ...flash, persistOnRouteTransition: true },
    },
  }
}

export const loginUser = (email, password) =>
  async function(dispatch) {
    dispatch(loginUserRequest())
    try {
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

      const json = await res.json()
      jwtDecode(json.token) // on fail, throws error
      dispatch(loginUserSuccess({
        name: json.user.fullname,
        token: json.token,
        flash: {
          message: 'Successful login',
          type: 'success',
        },
        friends: json.friends,
        friendRequests: json.friendRequests,
        sentFriendRequests: json.sentFriendRequests,
      }))
    } catch(e) {
      dispatch(loginUserFailure({
        flash: {
          message: 'Wrong credentials, try again',
          type: 'fail',
        },
      }))
    }
  }
