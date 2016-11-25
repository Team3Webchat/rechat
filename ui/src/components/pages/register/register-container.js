import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import RegisterForm from './register-form'

import { registerUser } from '../../../lib/actions/registerActions'

class RegisterContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      firstname: '',
      lastname: '',
      isAuthenticating: false,
      feedbackMessage: '',
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
    const { email, password, passwordConfirm, firstname, lastname } = this.state
    if (password !== passwordConfirm) {
      return this.setState({
        message: 'The password and the password confirmation does not match',
      })
    }

    this.props.doRegisterUser({email, password, firstname, lastname})

    //this.props.redirectOnRegister()
  }

  render() {

    return (
      <div>
        <RegisterForm
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          email={this.state.email}
          password={this.state.password}
          passwordConfirm={this.state.passwordConfirm}
          isAuthenticating={this.state.isAuthenticating}
          firstname={this.state.firstname}
          lastname={this.state.lastname}
          flash={this.props.flash}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticating: state.auth.isAuthenticating,
  flash: state.flash,
})

const mapDispatchToProps = dispatch => ({
  doRegisterUser: ({email, password, firstname, lastname}) => {
    dispatch(registerUser({email, password, firstname, lastname}))
  },
  redirectOnRegister: (nextPathname) => dispatch(push('/'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer)

