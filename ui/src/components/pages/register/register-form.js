import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Textfield, Button, Spinner, Card } from 'react-mdl'

const RegisterForm = ({ onChange, onSubmit, email, password, 
                        passwordConfirm, isAuthenticating, 
                        firstname, lastname}) => {

  return (
    <div className="signin-register">
    <Card shadow={0} className="signin-register-card">
      <form onSubmit={onSubmit}>
        <div>
          <Textfield label="Email" required type="email"
            value={email} onChange={onChange('email')} />
        </div>
        <div>
          <Textfield label="First name" required
            value={firstname} onChange={onChange('firstname')} />
          <Textfield label="Last name" required
            value={lastname} onChange={onChange('lastname')} />
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
          
        </div>
        
        { isAuthenticating 
            ? <Spinner /> 
            : <div>
                <Button
                  className="buttons"
                  primary 
                  raised 
                  ripple
                  disabled={email.length === 0 || password.length === 0 || email.length === 0}
                  type="submit"
                >
                  Register
                </Button>
                <Link to="/sign-in">
                  <Button className="buttons"
                      primary
                      raised
                      ripple
                      type='submit'
                    >
                      Back
                    </Button>
                </Link>
              </div>
        }
      </form>
    </Card>
    </div>
  )
}

RegisterForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
}

export default RegisterForm
