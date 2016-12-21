import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Textfield, Button, Spinner, Card, CardTitle, CardActions, Header, HeaderRow } from 'react-mdl'

import FlashMessage from '../../flash-message/flash-message'

const RegisterForm = ({ onChange, onSubmit, email, password, 
                        passwordConfirm, isAuthenticating, 
                        firstname, lastname, flash}) => {

  return (
    <div className="signin-register">
    <Card shadow={0} className="signin-register-card">
      <Header>
        <HeaderRow title={<div className="title">ReChat</div>}/>
        <HeaderRow title={<div className="sub-title">Register</div>}/>
      </Header>  
      <form onSubmit={onSubmit}>
        <div>
          <Textfield label="Email" required type="email" floatingLabel
            value={email} onChange={onChange('email')} />
        </div>
        <div>
          <Textfield label="First name" required floatingLabel
            value={firstname} onChange={onChange('firstname')} />
          <Textfield label="Last name" required floatingLabel
            value={lastname} onChange={onChange('lastname')} />
        </div>
        <div>
        <Textfield type="password" label="Password" required floatingLabel
          onChange={onChange('password')} value={password}
          />
        </div>
        <div>
        <Textfield type="password" label="Confirm password" required floatingLabel
          onChange={onChange('passwordConfirm')} value={passwordConfirm}/>
        </div>
        <div>
          
        </div>
        { flash.message ? 
          <FlashMessage message={flash.message} type={flash.type}/> 
          : ''
        }
        {
          password !== passwordConfirm && passwordConfirm.length >= password.length &&
          <FlashMessage message='Passwords are not the same' type='fail' />
        }
        
        { isAuthenticating 
            ? <Spinner /> 
            : <div>
                <CardActions border>
                  <Link to="/sign-in">
                    <Button className="buttons" primary raised 
                      ripple type='submit'
                      >
                        Back
                    </Button>
                  </Link>
                  <Button className="buttons" primary raised ripple
                    disabled={email.length === 0 || password.length === 0 || password !== passwordConfirm}
                    type="submit"
                  >
                    Register
                  </Button>
                </CardActions>
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
