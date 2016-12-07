import React, { PropTypes } from 'react'
import {  DialogActions, Grid, Cell, CardActions, Button, Icon, Textfield, CardTitle, CardMenu, IconButton, CardText } from 'react-mdl'

import FlashMessage from '../../flash-message/flash-message'

import './style.css'
import './../style-card-common.css'

const ChangePassword = (props) => {
  const { email } = props.user
  const { onChange, password, doToggleProfile, newPasswordConfirm, newPassword, onSubmit, flash } = props

  return (
    <div>
      <CardTitle className="cardTitle">
        <h3 className="changePasswordTitle">Change password</h3>
      </CardTitle>
      <CardMenu className="cardMenu">
        <IconButton name="close" onClick={doToggleProfile}  className="iconButton"/>  
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
          { flash.message ?
              <FlashMessage message={flash.message} type={flash.type} inline={true}/>
              : ''
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
        <Button type='button' onClick={doToggleProfile}>Cancel</Button>
      </CardActions>
      </form>
    </div>
  )
}
/*
<Card className='profileCard'  shadow={0}>
</Card>
*/
ChangePassword.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  newPasswordConfirm: PropTypes.string.isRequired,
}

export default ChangePassword
