import React, { PropTypes, Component } from 'react'
import { Grid, Cell, CardActions, Button, Icon } from 'react-mdl'
import { Link } from 'react-router'
import Gravatar from 'react-gravatar'

import './style.css'

const ProfileDisplayer = (props) => {
  const { email, name } = props.user
  const { doToggleProfile, doToggleEdit } = props
//to={`/me/edit`} <- edit
  return (
    <div>
      <CardActions>
        <Grid>
          <Cell col={3}><Gravatar email={email} size={130} /></Cell>
          <Cell col={7}><h3>{name}</h3></Cell>
          <Cell col={2}>
            <Link className='buttons' >
              <Icon name="mode_edit"/>
            </Link>
            <Link className='buttons' to={`/`}>
              <Icon name="close" />
            </Link>
          </Cell>
        </Grid>
      </CardActions>

      <Grid className='info'>
        <Cell col={3}></Cell>
        <Cell col={1} className='key'><p>Email</p></Cell>
        <Cell col={3} className='value'><p>{email}</p></Cell>
      </Grid>
    </div>
  )
}
/*
<Card className='profileCard' shadow={0} >
</Card>
*/
export default ProfileDisplayer
