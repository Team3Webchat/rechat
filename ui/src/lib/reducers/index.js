import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './authReducer'
import search from './searchReducer'
import flash from './flashReducer'
import menuDrawer from './menuDrawerReducer'
import friends from './friendsReducer'
import chats from './chatsReducer'

export default combineReducers({
  routing: routerReducer,
  search,
  auth,
  flash,
  menuDrawer,
  friends,
  chats,
})