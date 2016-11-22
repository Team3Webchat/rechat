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

export function searchUser( email ) {
  const results =[ //Testdata
    {name: 'Rebecca', email: 'hejsan@hej.com'},
    {name: 'Rebeccaaaaa', email: 'hejsaaaaan@hej.com'},
  ]

  return async function(dispatch) {
    dispatch(searchUserRequest())
    console.log("tjodoo: "+email)
    //dispatch(searchUserSuccess({ results })) //test data
    try {
      const res = await fetch(baseUrl + 'search', {
        method: 'POST',
        body: JSON.stringify({
          email,
        }),
        //credentials: 'include',  // Server has wildcard for cors atm
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })

      const json = await res.json()
      console.log(json)
      const { results } = json
      console.log(results)
      dispatch(searchUserSuccess({ results }))
      //dispatch(push('/'))

    } catch(e) {
      dispatch(searchUserFailure())
    }

  }
}
