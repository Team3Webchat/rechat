import React, { PropTypes } from 'react'
import { Textfield, Button, Spinner } from 'react-mdl'

const RegisterForm = (props) => {
  const { onChange, onSubmit, username, password, isAuthenticating, email } = props

  //There is an error right now with the fields, you can't write any text in them
  return (

    <form onSubmit={onSubmit}>
      <div>
      <Textfield
        label="Username"
        required
        value={username}
      />
      </div>
      <div>
      <Textfield
        type="password"
        label="Password"
        required
        value={password}
        />
      </div>
      <div>
      <Textfield
        type="email"
        label="Email"
        required
        value={email}
        />
      </div>
      <div>
      { isAuthenticating 
          ? <Spinner /> 
          : <Button
              primary 
              raised 
              ripple
              disabled={username.length === 0 || password.length === 0 || email.length === 0}
              type="submit"
            >
              Create Account
            </Button>
      }
      
      </div>
          <p></p>
      <div>
                
      </div>
    </form>
  )
}

RegisterForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
}


export default RegisterForm
