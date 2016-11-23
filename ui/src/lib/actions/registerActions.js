import { push } from 'react-router-redux'
import { baseUrl } from './'

// Register actions
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'

export function registerUserRequest() {
  return {
    type: REGISTER_USER_REQUEST,
  }
}

export function registerUserSuccess({token, message, friends}) {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: {
      token,
      message,
      friends,
    },
  }
}

export function registerUserFailure(error) {
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      error,
    },
  }
}

export function registerUser({ email, password, firstname, lastname }) {
  return async function(dispatch) {
    dispatch(registerUserRequest())
    try {
      const res = await fetch(baseUrl + 'users', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
        }),
        /*credentials: 'include', */ // Server has wildcard for cors atm
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })

      const json = await res.json()
      const { message, token, friends } = json
      dispatch(registerUserSuccess({ token, message, friends}))
      dispatch(push('/'))

    } catch(e) {
      dispatch(registerUserFailure())
    }
  }
}
