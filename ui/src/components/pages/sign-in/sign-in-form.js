import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Textfield, Button, Spinner, Card } from 'react-mdl'

import FlashMessage from '../../flash-message/flash-message'

const SignInForm = (props) => {
  const { onChange, onSubmit, email, password, isAuthenticating, flash } = props
  return (
    <div className="signin-register">
      <Card shadow={0} className="signin-register-card">
        <form onSubmit={onSubmit}>
          <div>
            <Textfield label="Email" required type="email" floatingLabel
              onChange={onChange('email')} value={email} />
          </div>
          <div>
            <Textfield type="password" label="Password" required floatingLabel
              onChange={onChange('password')} value={password} />
          </div>
          { flash.message ?
              <FlashMessage message={flash.message} type={flash.type} inline={true}/> 
              : ''
          }
          { isAuthenticating ? <Spinner />
              : <div>
                  <Button primary raised ripple type="submit" className="buttons"
                    disabled={email.length === 0 || password.length === 0} >
                    Sign in
                  </Button>
                  <Link to="/register">
                    <Button primary raised ripple type='submit' className="buttons" >
                      Register
                    </Button>
                  </Link>
                </div>
          }
        </form>
      </Card>
    </div>
  )
}

SignInForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default SignInForm
