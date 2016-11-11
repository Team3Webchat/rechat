import { REQUEST_TEST_DATA, RECEIVE_TEST_DATA } from '../actions'

const initialState = {
  isFetching: false,
  data: null
}

function testReducer(state = initialState, action) {
  switch(action.type) {
    case REQUEST_TEST_DATA:
      return {
        ...initialState,
        isFetching: true,
      }
    case RECEIVE_TEST_DATA: 
      return {
        ...initialState,
        isFetching: false,
        data: action.payload
      }
    default:
      return state
  }
}

export default testReducer