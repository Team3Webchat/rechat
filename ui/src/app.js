import React, { Component } from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
import { Provider } from 'react-redux'
import store, { history } from './lib/store'

import Main from './components/main/main'
import TestPage from './components/pages/test-page/test-page'
import TestPage2 from './components/pages/test-page-2/test-page-2'

function requireAuth(nextState, replace) {
  console.log('React Router onEnter callback')
  if (true) {
    replace({
      pathname: '/sign-in',
      state: {
        nextPathname: nextState.location.pathname,
      },
    })
  }
}

import './app.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router history={history}>
            <Route path='/sign-in' />
            <Route path='/' component={Main} onEnter={requireAuth}>
              <IndexRedirect to="testpage" />
              <Route path='testpage' component={TestPage} />
              <Route path='testpage2' component={TestPage2} />
            </Route>
          </Router>
        </Provider>
      </div>
    )
  }
}

export default App
