export const REQUEST_TEST_DATA = 'REQUEST_TEST_DATA'
export const RECEIVE_TEST_DATA = 'RECEIVE_TEST_DATA'

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
      const res = await fetch('http://localhost:8000/api/health')
      const data = await res.json()

      dispatch(receiveTestData(data))
    } catch (e) {
      console.log('fail')
    }
    

  }
}