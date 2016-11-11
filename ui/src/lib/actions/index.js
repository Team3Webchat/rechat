export const REQUEST_TEST_DATA = 'REQUEST_TEST_DATA'
export const RECEIVE_TEST_DATA = 'RECEIVE_TEST_DATA'

export function requestTestData() {
  return {
    type: REQUEST_TEST_DATA
  }
}

export function receiveTestData(payload) {
  return {
    type: RECEIVE_TEST_DATA,
    payload,
  }
}

export function fetchTestData() {
  return function(dispatch) {
    dispatch(requestTestData())

    return fetch('http://localhost:8000/api/test')
      .then(response => response.json())
      .then(json => dispatch(receiveTestData(json)))
  }
}