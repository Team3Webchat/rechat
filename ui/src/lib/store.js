import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'

import rootReducer from './reducers'

import { loginUser, logout } from './actions/authActions'
import { registerUser } from './actions/registerActions'
const logger = createLogger()
const routing = routerMiddleware(hashHistory)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      logger,
      routing
  ))
)


export const history = syncHistoryWithStore(hashHistory, store)
export default store

export function getToken() {
  return store.getState().auth.token
}

console.log(getToken())

