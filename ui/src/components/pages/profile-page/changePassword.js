import React, { PropTypes, Component } from 'react'
import {  Card, Grid, Cell, CardActions, Button, Icon, Textfield } from 'react-mdl'

import FlashMessage from '../../flash-message/flash-message'

const ChangePassword = (props) => {
  console.log(props.user)
  const { email } = props.user
  const { onChange, password, doToggleProfile, newPasswordConfirm, newPassword, onSubmit, flash } = props

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
        <form onSubmit={onSubmit}>
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
              <FlashMessage message={flash.message} type={flash.type}/> 
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
          <FlashMessage message='New password must be 6 or more characters' type='fail' />
        }
        {
          newPasswordConfirm.length >= 1 &&
          newPasswordConfirm.length < newPassword.length &&
          newPassword !== newPasswordConfirm &&
          
          <FlashMessage message="Passwords don't match" type='fail' />
        }
        </div>
        <spinner />
        <CardActions border>
            <Button className='buttons' primary raised ripple type="submit" 
                    colored
                    disabled={ newPassword.length === 0 || 
                      newPassword !== newPasswordConfirm || 
                      password.length === 0 ||
                      newPassword.length < 6 }
                      >Save</Button>
        </CardActions>
        </form>
      </Grid>

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