import { push } from 'react-router-redux'
import { baseUrl } from './'

// SEARCH actions
export const SEARCH_USER_REQUEST = 'SEARCH_USER_REQUEST'
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS'
export const SEARCH_USER_FAILURE = 'SEARCH_USER_FAILURE'

export function searchUserRequest() {
  return {
    type: SEARCH_USER_REQUEST,
  }
}

export function searchUserSuccess({message}) {
  return {
    type: SEARCH_USER_SUCCESS, 
    payload: {
      message,
    },
  }
}

export function searchUserFailure(error) {
  return {
    type: SEARCH_USER_FAILURE, 
    payload: {
      error,
    },
  }
}

export function searchUser({ email }) {
  return async function(dispatch) {
    dispatch(searchUserRequest())
    /*try {
      const res = await fetch(baseUrl + 'users', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        //credentials: 'include',  // Server has wildcard for cors atm
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },  
      })

      console.log(res)
      const json = await res.json()
      const { message, token } = json
      dispatch(registerUserSuccess({ token, message}))
      dispatch(push('/'))

    } catch(e) {
      dispatch(registerUserFailure())
    }
    */
  }
}