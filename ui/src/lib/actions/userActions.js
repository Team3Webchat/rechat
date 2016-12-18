import { baseUrl } from './'
import { getHeaders } from '../api'
import { push } from 'react-router-redux'

export const SHOW_ONE_USER_FAILURE = 'SHOW_ONE_USER_FAILURE'

const showOneUserFailure = ({ flash }) => ({
  type: SHOW_ONE_USER_FAILURE,
  payload: {
    flash,
  },
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
