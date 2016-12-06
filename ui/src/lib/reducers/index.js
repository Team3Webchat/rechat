import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './authReducer'
import search from './searchReducer'
import flash from './flashReducer'
import menuDrawer from './menuDrawerReducer'
import friends from './friendsReducer'
import chats from './chatsReducer'

const appReducer = combineReducers({
  routing: routerReducer,
  search,
  auth,
  flash,
  menuDrawer,
  friends,
  chats,
})

export default (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined
  }
  return appReducer(state, action)
}