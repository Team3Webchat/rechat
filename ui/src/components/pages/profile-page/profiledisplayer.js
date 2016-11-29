import React, { PropTypes, Component } from 'react'
import {  Card, Grid, Cell, CardActions, Button, Icon } from 'react-mdl'
import Gravatar from 'react-gravatar'

const ProfileDisplayer = (props) => {
  console.log(props.user)
  const { email, name } = props.user
  const { doToggleProfile, doToggleEdit } = props
  //There is an error right now with the fields, you can't write any text in them
  return (
    <Card shadow={0} style={{ margin: 'auto', width: '150%'}}>
      <Button colored>
        <Icon name="close" onClick={doToggleProfile}/>
        </Button>
      <Grid style={{width: '80%'}}>
        <Cell col={10}><h2> {name} </h2></Cell>
        <Cell col={10}><Gravatar email={email} /></Cell>
      </Grid>
      <Grid>
        <Cell col={12}>Email: {email}</Cell>
      </Grid>
      <CardActions border>
          <Button className='buttons' onClick={doToggleEdit} colored>Change Password

          </Button>
      </CardActions>
    </Card>
  )
}

export default ProfileDisplayer
/*

*/
