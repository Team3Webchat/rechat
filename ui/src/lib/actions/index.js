export const REQUEST_TEST_DATA = 'REQUEST_TEST_DATA'
export const RECEIVE_TEST_DATA = 'RECEIVE_TEST_DATA'

const env = process.env.NODE_ENV || 'production'
export const baseUrl = env === 'production' 
  ? 'https://apirechat.herokuapp.com/api/'
  : 'http://localhost:8000/api/'
export function requestTestData() {
  return {
    type: REQUEST_TEST_DATA,
  }
}

export function receiveTestData(payload) {
  return {
    type: RECEIVE_TEST_DATA,
    payload,
  }
}


export function fetchTestData() {
  return async function(dispatch) {
    dispatch(requestTestData())
    try {
      const res = await fetch(baseUrl + 'health')
      const data = await res.json()

      dispatch(receiveTestData(data))
    } catch (e) {
      console.log('fail')
    }
    

  }
}