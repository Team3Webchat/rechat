import React, { PropTypes } from 'react'

import { Link } from 'react-router'
import {  CardActions, Button, Textfield, CardTitle, CardMenu, IconButton, CardText } from 'react-mdl'

import FlashMessage from '../../flash-message/flash-message'

import './style.css'

const ChangePassword = (props) => {
  const { email } = props.user
  const { onChange, onSubmit, password, newPasswordConfirm, newPassword, flash } = props

  return (
    <div>
      <CardTitle className="cardTitle">
        <h3 className="changePasswordTitle">Change password</h3>
      </CardTitle>
      <CardMenu className="cardMenu">
        <Link to={`/me`}>
          <IconButton name="close" className="iconButton"/>
        </Link>
      </CardMenu>
      <form onSubmit={onSubmit}>
      <CardText className='ChangePasswordForm'>
        <div className='changePasswordEmail'>{email}</div>
        <div><Textfield
            type="password"
            label='New password (6 or more characters)'
            value={newPassword}
            required
            onChange={onChange('newPassword')}
        /></div>
        <div><Textfield
            type="password"
            label='Confirm new password'
            value={newPasswordConfirm}
            required
            onChange={onChange('newPasswordConfirm')}
        /></div>
        <div><Textfield
            type="password"
            label='Enter old password'
            value={password}
            required
            onChange={onChange('password')}
        /></div>
        <div>
          { flash.message &&
            <FlashMessage message={flash.message} type={flash.type} inline={true}/>
          }
        {
          newPassword !== newPasswordConfirm &&
          newPasswordConfirm.length >= newPassword.length &&
          newPassword.length !== 0 &&
          <FlashMessage message="Passwords don't match" type='fail' />
        }
        {
          newPassword.length < 6 &&
          <FlashMessage message='New password must be 6 or more characters' type='fail' inline={true}/>
        }
        {
          newPasswordConfirm.length >= 1 &&
          newPasswordConfirm.length < newPassword.length &&
          newPassword !== newPasswordConfirm &&

          <FlashMessage message="Passwords don't match" type='fail' inline={true} />
        }
        </div>
        <spinner />
      </CardText>
      <CardActions border>
        <Button className='buttons' primary raised ripple type="submit"
        colored
        disabled={ newPassword.length === 0 ||
        newPassword !== newPasswordConfirm ||
        password.length === 0 ||
        newPassword.length < 6 }
        >Save</Button>
        <Link to={`/me`}>
          <Button type='button'>Cancel</Button>
        </Link>

      </CardActions>
      </form>
    </div>
  )
}

ChangePassword.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  newPasswordConfirm: PropTypes.string.isRequired,
}


export default ChangePassword
