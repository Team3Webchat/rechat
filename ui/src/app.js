import React, { Component } from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
import { Provider } from 'react-redux'
import store, { history } from './lib/store'

import Main from './components/main/main'
import TestPage from './components/pages/test-page/test-page'
import TestPage2 from './components/pages/test-page-2/test-page-2'
import SignInContainer from './components/pages/sign-in/sign-in-container'
import RegisterContainer from './components/pages/register/register-container'

import { loginUserSuccess } from './lib/actions/authActions'

import './app.css'

const token = localStorage.getItem('token')
// if (token) {
//   store.dispatch(loginUserSuccess(token))
// }

function requireAuth(nextState, replace) {
  if (!store.getState().auth.isAuthenticated) {
    replace({
      pathname: '/sign-in',
      state: {
        nextPathname: nextState.location.pathname,
      },
    })
  }
}

function register(nextState, replace) {
  if (!store.getState().auth.isAuthenticated) {
    replace({
      pathname: '/register',
      state: {
        nextPathname: nextState.location.pathname,
      },
    })
  }
}

function doesNotRequireAuth(nextState, replace) {
  if (store.getState().auth.isAuthenticated) {
    replace({
      pathname: '/',
    })
  }
}




class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router history={history}>

            <Route path='/sign-in' component={SignInContainer} onEnter={doesNotRequireAuth}/>
            <Route path='/register' component={RegisterContainer}/>
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
