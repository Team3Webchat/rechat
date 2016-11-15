import React, { PropTypes } from 'react'
import { Textfield, Button, Spinner } from 'react-mdl'
import RegisterForm from './register-form'
const RegisterContainer = (props) => {
  //const { onChange, onSubmit, username, password, isAuthenticating } = props

  return (
    <div>
      <RegisterForm />
    </div>
  )
}

export default RegisterContainer
