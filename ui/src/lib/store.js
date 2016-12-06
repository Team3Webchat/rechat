import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'
import {persistStore, autoRehydrate} from 'redux-persist'

import rootReducer from './reducers'
import socketMiddleware from './middleware/socketMiddleware'

const logger = createLogger()
const routing = routerMiddleware(hashHistory)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      logger,
      routing,
      socketMiddleware,
  )),
  autoRehydrate(),
)
persistStore(store)


export const history = syncHistoryWithStore(hashHistory, store)
export default store

// Just simple helper getters for the store, should probably be
// somewhere else






