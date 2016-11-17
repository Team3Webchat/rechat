import React, { PropTypes } from 'react'
import { Textfield, Button, Spinner } from 'react-mdl'

const RegisterForm = (props) => {
  const { onChange, onSubmit, email, password, passwordConfirm, isAuthenticating } = props

  //There is an error right now with the fields, you can't write any text in them
  return (

    <form onSubmit={onSubmit}>
      <div>
      <Textfield
        label="Email"
        required
        type="email"
        value={email}
        onChange={onChange('email')}
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
      <Textfield
        type="password"
        label="Confirm password"
        required
        onChange={onChange('passwordConfirm')}
        value={passwordConfirm}/>
    
      </div>
      <div>
      { isAuthenticating 
          ? <Spinner /> 
          : <Button
              primary 
              raised 
              ripple
              disabled={email.length === 0 || password.length === 0 || email.length === 0}
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
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
}


export default RegisterForm
