import React, { Component } from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
import { Provider } from 'react-redux'
import store, { history } from './lib/store'

import Main from './components/main/main'
import SignInContainer from './components/pages/sign-in/sign-in-container'
import RegisterContainer from './components/pages/register/register-container'

import { loginUserSuccess } from './lib/actions/authActions'

import './app.css'

const token = localStorage.getItem('token')
if (token) {
  store.dispatch(loginUserSuccess({token, message: 'Welcome back'}))
}

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


function doesNotRequireAuth(nextState, replace) {
  if (store.getState().auth.isAuthenticated) {
    replace({
      pathname: '/',
      state: {
        nextPathname: null,
      },
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
            <Route path='/register' component={RegisterContainer} onEnter={doesNotRequireAuth}/>
            <Route path='/' component={Main} onEnter={requireAuth}>
            </Route>
          </Router>
        </Provider>
      </div>
    )
  }
}

export default App
