import { baseUrl } from './'
import { getHeaders } from '../api'

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
      //TODO: retunera felmeddelande NOT DONE YET
      dispatch(showOneUserFailure({
        flash: {
          message: e.message,
          type: 'fail',
        },
      }))
    }
  }
