import { baseUrl } from './'
import { getHeaders } from '../api'
import { push } from 'react-router-redux'

export const SHOW_ONE_USER_FAILURE = 'SHOW_ONE_USER_FAILURE'
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'

const showOneUserFailure = ({ flash }) => ({
  type: SHOW_ONE_USER_FAILURE,
  payload: {
    flash,
  },
})

// TODO: rename this.
// Should be named deleteACcount and the
// async action should be named something else!
const doDeleteAccount = ({ flash }) => ({
  type: DELETE_ACCOUNT,
  payload: {
    flash,
  }
})


export const getOneUser = (id) =>
  async function(dispatch) {
    try {
      const res = await fetch(baseUrl + 'users/' + id, {
        method: 'GET',
        headers: getHeaders(),
      })

      const json = await res.json()
      console.log(json)
      return json

    } catch(e) {
      dispatch(showOneUserFailure({
        flash: {
          message: e.message,
          type: 'fail',
        },
      }))
    }
  }

export const deleteAccount = (id) =>
  async function(dispatch) {
    try {
      //TODO Redirect - dispatch(push('/sign-in'))
      const res = await fetch(baseUrl + 'users/' + id, {
        method: 'DELETE',
        headers: getHeaders(),
      })

      const json = await res.json()
      //dispatch(push('/sign-in'))
      dispatch(doDeleteAccount({
        flash: {
          message: 'Account deleted, sorry to see you go!',
          type: 'success'
        }
      }))
      localStorage.removeItem('token')
      dispatch(push('/sign-in'))
      return json
    } catch(e) {
      dispatch(showOneUserFailure({
        flash: {
          message: e.message,
          type: 'fail',
        },
      }))
    }
  }
