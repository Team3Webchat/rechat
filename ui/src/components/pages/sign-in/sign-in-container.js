import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { loginUser } from '../../../lib/actions/authActions'
import { resetFlashMessage } from '../../../lib/actions/flashActions'

import SignInForm from './sign-in-form'

class SignInContainer extends Component {
  constructor(props) {
    super(props)
 
    this.state = {
      email: '',
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
    const { email, password } = this.state
    const { loginUser } = this.props

    loginUser(email, password)
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, redirectOnLogin, nextPathname } = nextProps

    if (this.props.isAuthenticating !== nextProps.isAuthenticating)
      this.setState({
        isAuthenticating: !this.state.isAuthenticating,
      })
    if (isAuthenticated)
      redirectOnLogin(nextPathname)
  }


  render() {
    return (
      <SignInForm
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        email={this.state.email}
        password={this.state.password}
        isAuthenticating={this.state.isAuthenticating}
        flash={this.props.flash}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    nextPathname: state.routing.locationBeforeTransitions.state 
      ? state.routing.locationBeforeTransitions.state.nextPathname 
      : '/', // TODO: must be a better way to handle this
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating,
    failure: state.auth.failure,
    flash: state.flash,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    redirectOnLogin: (nextPathname) => dispatch(push(nextPathname)),
    resetFlash: () => dispatch(resetFlashMessage()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer)
