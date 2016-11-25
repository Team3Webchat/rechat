import { push } from 'react-router-redux'
import { baseUrl } from './'

// Register actions
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'

export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
})

export const registerUserSuccess = ({ token, flash, friends }) => ({
  type: REGISTER_USER_SUCCESS,
  payload: {
    token,
    flash: { ...flash, persistOnRouteTransition: true },
    friends,
  },
})

export const registerUserFailure = ({ flash }) => ({
  type: REGISTER_USER_FAILURE,
  payload: {
    flash: { ...flash, persistOnRouteTransition: false },
  },
})

export const registerUser = ({ email, password, firstname, lastname }) => 
  async function(dispatch) {
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
          },
        }))
      }

      const { token, friends } = json

      dispatch(registerUserSuccess({ token, flash: { 
        message: 'Succesful registration',
        type: 'success',
      }, friends}))
      dispatch(push('/'))
    } catch(e) {

      dispatch(registerUserFailure())
    }
  }
