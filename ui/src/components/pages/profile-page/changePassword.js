import React, { PropTypes, Component } from 'react'
import {  Card, Grid, Cell, CardActions, Button, Icon, Textfield } from 'react-mdl'

import FlashMessage from '../../flash-message/flash-message'

const ChangePassword = (props) => {
  const { email, name, password, firstname, lastname } = props.user
  const { onChange, doChangeOfProfile, isAuthenticating, doToggleProfile, newPasswordConfirm, newPassword, onSubmit, flash } = props
  //There is an error right now with the fields, you can't write any text in them
  return (
    <Card shadow={0} style={{ margin: 'auto', width: '150%'}}>
      <Button colored>
        <Icon name="close" onClick={doToggleProfile}/>
        </Button>
      <Grid style={{width: '80%'}}>
        <Cell col={10}><h2> {name} </h2> <p>(Edit page)</p></Cell>
        <Cell col={10}><img alt='tmppic' src="http://hampusjarleborn.se/php_proj/data/6521141500846276608.png" style={{width: '150px'}}/></Cell>
      </Grid>
      <Grid>
        <Cell col={12}>Mail: {email}</Cell>
        <Cell col={12}>Name: {firstname}</Cell>
        <form onSubmit={onSubmit}>
        <div><Textfield
            type="email"
            label='Change your email'
            value={email}
            onChange={onChange('email')}
        /></div>
        <div><Textfield
            type="firstname"
            label='Change your firstname'
            value={firstname}
            onChange={onChange('firstname')}
        /></div>
        <div><Textfield
            type="lastname"
            label='Change your lastname'
            value={lastname}
            onChange={onChange('lastname')}
        /></div>
        <div><Textfield
            type="password"
            label='Enter 6 or more characters'
            value={newPassword}
            onChange={onChange('newPassword')}
        /></div>
        <div><Textfield
            type="password"
            label='Re-enter your new password'
            value={newPasswordConfirm}
            onChange={onChange('newPasswordConfirm')}
        /></div>
        <div><Textfield
            type="password"
            label='Confirm old Password'
            value={password}
            onChange={onChange('password')}
        /></div>
        <div>
          { flash.message ? 
              <FlashMessage message={flash.message} type={flash.type}/> 
              : ''
          }
        {
          newPassword !== newPasswordConfirm && 
          newPasswordConfirm.length >= newPassword.length &&
          newPassword.length !== 0 &&
          <FlashMessage message='Passwords are not the same' type='fail' />
        }
        </div>
        </form>
      </Grid>
      { isAuthenticating ?
        <spinner />
        :
        <CardActions border>
            <Button className='buttons' primary raised ripple
                    onClick={doChangeOfProfile} type="submit" colored>Save</Button>
        </CardActions>
      }
    </Card>
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