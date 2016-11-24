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

export function registerUserSuccess({token, flash, friends}) {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: {
      token,
      flash: { ...flash, persistOnRouteTransition: true },
      friends,
    },
  }
}

export function registerUserFailure({flash}) {

  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      flash: { ...flash, persistOnRouteTransition: false },
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

      if (res.status === 400) {
        return dispatch(registerUserFailure({
          flash: {
            message: json.message,
            type: 'fail',
          }
        }))
      }

      
      const { message, token, friends } = json


      dispatch(registerUserSuccess({ token, flash: { 
        message: 'Succesful registration',
        type: 'success',
      }, friends}))
      dispatch(push('/'))

    } catch(e) {

      dispatch(registerUserFailure())
    }
  }
}
