import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { loginUser } from '../../../lib/actions/authActions'

import SignInForm from './sign-in-form'

class SignInContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isAuthenticating: false,
    }
  }

  handleChange = key => {
    return function(e) {
      const state = {}
      state[key] = e.target.value
      this.setState(state)
    }.bind(this)
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username, password } = this.state
    const { loginUser } = this.props
    
    loginUser(username, password)
  }

  componentDidMount() {
    console.log('componentDidMount', this.props)
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillRecieveProps', nextProps)
    const { isAuthenticated, redirectOnLogin, nextPathname } = nextProps

    if (this.props.isAuthenticating !== nextProps.isAuthenticating)
      this.setState({
        isAuthenticating: !this.state.isAuthenticating,
      })
    if (isAuthenticated)
      redirectOnLogin(nextPathname)
  }


  render() {
    console.log('render() this.state:', this.state.isAuthenticating)
    return (
      <SignInForm
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        username={this.state.username}
        password={this.state.password}
        isAuthenticating={this.state.isAuthenticating}
      />
    )
  } 
}

const mapStateToProps = state => {
  console.log(state)
  return {
    nextPathname: state.routing.locationBeforeTransitions.state.nextPathname || null, 
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating,
    message: state.auth.statusText,
  }
}

const mapDispatchToProps = dispatch => {
  console.log(dispatch)
  return {
    loginUser: (username, password) => {
      dispatch(loginUser(username, password))
    },
    redirectOnLogin: (nextPathname) => {
      dispatch(push(nextPathname))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer)