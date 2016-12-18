import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './authReducer'
import flash from './flashReducer'
import friends from './friendsReducer'
import chats from './chatsReducer'
import search from './searchReducer'

const appReducer = combineReducers({
  routing: routerReducer,
  auth,
  search,
  flash,
  friends,
  chats,
})

export default (state, action) => {
  if (action.type === 'LOGOUT_USER' ||
      action.type === 'DELETE_ACCOUNT') {
    state = undefined
  }
  return appReducer(state, action)
}
