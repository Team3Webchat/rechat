import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import testReducer from './testReducer'
import auth from './authReducer'

export default combineReducers({
  routing: routerReducer,
  testReducer,
  auth,
})