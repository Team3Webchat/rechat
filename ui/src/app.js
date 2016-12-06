import React, { Component } from 'react'
import { Router, Route } from 'react-router'
import { Provider } from 'react-redux'
import store, { history } from './lib/store'

import Main from './components/main/main'
import SignInContainer from './components/pages/sign-in/sign-in-container'
import RegisterContainer from './components/pages/register/register-container'


import FriendProfile from './components/pages/profile-page/friend-profile-page/friend-profile-page'
import ProfileContainer from './components/pages/profile-page/profile-container'
import ChangePassword from './components/pages/profile-page/profile-container'
import ChatContainer from './components/pages/chat-page/chat-container'

import { loginUserSuccess } from './lib/actions/authActions'
import { getFriends } from './lib/actions/friendsActions'

import './app.css'



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
  constructor() {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    let loaded = false
    const token = localStorage.getItem('token')
    if (token) {

      
      Promise.all([
        store.dispatch(loginUserSuccess({token, message: 'Welcome back'})),
        store.dispatch(getFriends()),
      ])
      .then(() => {
        console.log('DONE')
        this.setState({
          loaded: true,
        })
      })
      
    } else {
      this.setState({
        loaded: true,
      })
    }
  }

  
  render() {
    if (this.state.loaded) {
      return (
        <div className="App">
          <Provider store={store}>
            <Router history={history}>
              <Route path='/sign-in' component={SignInContainer} onEnter={doesNotRequireAuth}/>
              <Route path='/register' component={RegisterContainer} onEnter={doesNotRequireAuth}/>
              <Route path='/' component={Main} onEnter={requireAuth}>
                <Route path='/me' component={ProfileContainer} />
                <Route path='/me/edit' component={ChangePassword} />
                <Route path='/chat/:id' component={ChatContainer} />
                <Route path='/profile/:id' component={FriendProfile} />
              </Route>
            </Router>
          </Provider>
        </div>
      )
    } else {
      return (
        <div>
          <h1>This is a splash screen</h1>
          <h4>The application is loading</h4>
          <p>Awesomesauce</p>
        </div>
      )
    }
    
  }
}

export default App
