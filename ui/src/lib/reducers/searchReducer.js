import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  END_SEARCH,
} from '../actions/searchActions'

const initialState = {
  searchValue: null,
  searchResults: null,
  isSearching: null,
  isDoneSearching: null,
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
      case END_SEARCH:
        return{
          ...state,
          searchValue: null,
          searchResults: null,
          isSearching: null,
          isDoneSearching: null,
          failure: false,
        }
    default:
      return state
  }
}
export default search
