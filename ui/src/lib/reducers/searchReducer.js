import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  SET_FAILURE,
} from '../actions/searchActions'
import { LOGOUT_USER } from '../actions/authActions'

const initialState = {
  searchValue: null,
  searchResults: null,
  isSearching: false,
  isDoneSearching: false,
  failure: false,
}

function search(state = initialState, action) {

  switch(action.type) {
    case SEARCH_USER_REQUEST:
      return{
        ...state,
        isSearching: true,
      }
    case SEARCH_USER_SUCCESS:
      return{
        ...state,
        isSearching: false,
        isDoneSearching: true,
        searchResults: action.payload.results,
        failure: false,
      }
    case SEARCH_USER_FAILURE:
      return{
        ...state,
        isSearching: false,
        failure: true,
        searchResults: action.payload.error,
      }

    case LOGOUT_USER:
      return initialState
    default:
      return state
  }
}
export default search
