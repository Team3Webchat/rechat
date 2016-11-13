import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import testReducer from './testReducer'
import authReducer from './authReducer'

export default combineReducers({
  routing: routerReducer,
  testReducer,
  authReducer,
})