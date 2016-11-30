import React, { PropTypes, Component } from 'react'
import {  Card, Grid, Cell, CardActions, Button, Icon } from 'react-mdl'
import Gravatar from 'react-gravatar'

import './style.css'

const ProfileDisplayer = (props) => {
  const { email, name } = props.user
  const { doToggleProfile, doToggleEdit } = props
  //There is an error right now with the fields, you can't write any text in them
  //shadow={0} style={{ margin: 'auto', width: '150%'}}
  return (
    <Card className='profileCard' shadow={0} >
      <CardActions border>
        <Button className='buttons' onClick={doToggleProfile}>
          <Icon name="close" />
        </Button>
        <Button className='buttons' onClick={doToggleEdit}>
          <Icon name="mode_edit"/>
        </Button>
      </CardActions>

      <Grid >
        <Cell col={10}><h2> {name} </h2></Cell>
        <Cell col={10}><Gravatar email={email} size={150} /></Cell>
      </Grid>
      <Grid>
        <Cell col={12}>Email: {email}</Cell>
      </Grid>
    </Card>
  )
}

export default ProfileDisplayer
