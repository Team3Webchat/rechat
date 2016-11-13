import React, { PropTypes } from 'react'
import { Textfield, Button, Spinner } from 'react-mdl'

const SignInForm = (props) => {
  const { onChange, onSubmit, username, password, isAuthenticating } = props
  console.log(isAuthenticating)
  return (
    <form onSubmit={onSubmit}>
      <div>
      <Textfield
        label="Username"
        required
        onChange={onChange('username')}
        value={username}
      />
      </div>
      <div>
      <Textfield
        type="password"
        label="Password"
        required
        onChange={onChange('password')}
        value={password}
        />
      </div>
      <div>
      { isAuthenticating 
          ? <Spinner /> 
          : <Button
              primary 
              raised 
              ripple
              disabled={username.length === 0 || password.length === 0}
              type="submit"
            >
              Sign in
            </Button>
      }
      
      </div>
    </form>

  )
}

SignInForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default SignInForm