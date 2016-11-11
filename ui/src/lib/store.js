import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'

import routes from '../routes'
import rootReducer from './reducers'

import { fetchTestData } from './actions'

const logger = createLogger()
const routing = routerMiddleware(hashHistory)

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    logger,
    routing
  )
)

export const history = syncHistoryWithStore(hashHistory, store)
export default store

