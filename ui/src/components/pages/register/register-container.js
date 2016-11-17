import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { Textfield, Button, Spinner } from 'react-mdl'
import RegisterForm from './register-form'

import { registerUser } from '../../lib/actions/registerActions'

class RegisterContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      email: '',
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
    const { email, password, email } = this.state
    console.log(email, password, email)


  }

  render() {

    return (
      <div>
    <RegisterForm
      onChange={this.handleChange}
      onSubmit={this.handleSubmit}
      email={this.state.email}
      password={this.state.password}
      email={this.state.email}
      isAuthenticating={this.state.isAuthenticating}
    />
  <Link to="/sign-in">
    <Button
        primary
        raised
        ripple
        type='submit'
      >
        Back To Login Page
      </Button>

      </Link>
  </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    nextPathname: state.routing.locationBeforeTransitions.state.nextPathname || null,
    isAuthenticating: state.auth.isAuthenticating,
    message: state.auth.statusText,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: ({email, password, email}) => {
      dispatch(registerUser({email, password, email}))
    },
    redirectOnRegister: (nextPathname) => {
      dispatch(push(nextPathname))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer)

