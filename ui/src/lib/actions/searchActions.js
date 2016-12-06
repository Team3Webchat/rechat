import { baseUrl } from './'

// SEARCH actions
export const SEARCH_USER_REQUEST = 'SEARCH_USER_REQUEST'
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS'
export const SEARCH_USER_FAILURE = 'SEARCH_USER_FAILURE'
export const END_SEARCH = 'END_SEARCH'

export const searchUserRequest = () => ({
  type: SEARCH_USER_REQUEST,
})

export const searchUserSuccess = ({ results }) => ({
  type: SEARCH_USER_SUCCESS,
  payload: {
    results,
  },
})

export const searchUserFailure = (error) => ({
  type: SEARCH_USER_FAILURE,
  payload: {
    error,
  },
})

export const endSearch = () => ({
  type: END_SEARCH,
})


export const searchUser = (searchValue) => 
  async function(dispatch) {
    dispatch(searchUserRequest())
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

      const json = await res.json()
      const { results } = json

      //TODO: är detta rätt sätt att hantera om ingen användare hittas?
      if (results.length > 0){
        dispatch(searchUserSuccess({ results }))
      } else{
        dispatch(searchUserFailure(results.code))
      }
    } catch(e) {
      dispatch(searchUserFailure(e))
    }
  }



