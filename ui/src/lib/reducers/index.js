import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './authReducer'
import search from './searchReducer'

export default combineReducers({
  routing: routerReducer,
  search,
  auth,
})