import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'

import rootReducer from './reducers'

const logger = createLogger()
const routing = routerMiddleware(hashHistory)

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    logger,
    routing
  )
)

export const history = syncHistoryWithStore(hashHistory, store)
export default store

