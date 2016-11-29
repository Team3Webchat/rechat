import { push } from 'react-router-redux'
import { baseUrl } from './'
import { getHeaders } from '../api'

// Register actions
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE'

export const changePasswordRequest = () => ({
  type: CHANGE_PASSWORD_REQUEST,
})

export const changePasswordSuccess = ({ token, flash }) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: {
    token,
    flash: { ...flash, persistOnRouteTransition: true },
  },
})

export const changePasswordFailure = ({ flash }) => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: {
    flash: { ...flash, persistOnRouteTransition: false },
  },
})

export const changePassword = ({ password, newPassword, id }) =>
  async function(dispatch) {

    console.log("test test",password, newPassword)
    dispatch(changePasswordRequest())
    try {
      const res = await fetch(baseUrl + 'users/' + id, {
        method: 'PUT',
        body: JSON.stringify({
          'password': newPassword,
        }),
        headers: getHeaders(),
      })
      const json = await res.json()

      if (res.status === 400) {
        return dispatch(changePasswordFailure({
          flash: {
            message: json.message,
            type: 'fail',
          },
        }))
      }
      const { token } = json

      dispatch(changePasswordSuccess({ token, flash: {
        message: 'Succesful Change of Password',
        type: 'success',
      }}))
      dispatch(push('/'))
    } catch(e) {
      dispatch(changePasswordFailure())
    }
  }