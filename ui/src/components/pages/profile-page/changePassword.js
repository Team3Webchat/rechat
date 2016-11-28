import React, { PropTypes, Component } from 'react'
import {  Card, Grid, Cell, CardActions, Button, Icon, Textfield } from 'react-mdl'


const ChangePassword = (props) => {
  const { email, name, password } = props.user
  const { doToggleProfile, passwordConfirm, oldPassword } = props
  //There is an error right now with the fields, you can't write any text in them
  return (
    <Card shadow={0} style={{ margin: 'auto', width: '150%'}}>
      <Button colored>
        <Icon name="close" onClick={doToggleProfile}/>
        </Button>
      <Grid style={{width: '80%'}}>
        <Cell col={10}><h2> {name} </h2></Cell>
        <Cell col={10}><img alt='tmppic' src="http://hampusjarleborn.se/php_proj/data/6521141500846276608.png" style={{width: '150px'}}/></Cell>
      </Grid>
      <Grid>
        <Cell col={12}>Mail: {email}</Cell>
        <form><div><Textfield
            type="password"
            label='Enter New Password'
            required
            value={oldPassword}
            //onChange={this.handleChange('password')}
        /></div>
        <div><Textfield
            type="password"
            label='Re-enter the Password'
            required
            value={passwordConfirm}
            //onChange={this.handleChange('password')}
        /></div>
        <div><Textfield
            type="password"
            label='Confirm old Password'
            required
            value={password}
            //onChange={this.handleChange('password')}
        /></div>
        </form>
      </Grid>
      <CardActions border>
          <Button colored>Save</Button>
      </CardActions>
    </Card>
  )
}

export default ChangePassword