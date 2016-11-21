import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { Textfield, Button, Spinner } from 'react-mdl'
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
    console.log('registered')
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
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    isAuthenticating: state.auth.isAuthenticating,
    message: state.auth.statusText,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doRegisterUser: ({email, password, firstname, lastname}) => {
      dispatch(registerUser({email, password, firstname, lastname}))
    },
    redirectOnRegister: (nextPathname) => {
      dispatch(push('/'))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer)

