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

export function searchUserSuccess({results}) {
  return {
    type: SEARCH_USER_SUCCESS,
    payload: {
      results,
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

export function searchUser({ searchValue }) {
  /*const results =[ //Testdata
        {name: 'Rebecca', email: 'hejsan@hej.com'},
        {name: 'Rebeccaaaaa', email: 'hejsaaaaan@hej.com'}
      ]
 */
  return async function(dispatch) {
    dispatch(searchUserRequest())
    //dispatch(searchUserSuccess({ results })) //test data
    try {
      const res = await fetch(baseUrl + 'search', {
        method: 'POST',
        body: JSON.stringify({
          searchValue,
        }),
        //credentials: 'include',  // Server has wildcard for cors atm
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })

      console.log(res)
      const json = await res.json()
      const { results } = json
      dispatch(searchUserSuccess({ results }))
      dispatch(push('/'))

    } catch(e) {
      dispatch(searchUserFailure())
    }

  }
}
