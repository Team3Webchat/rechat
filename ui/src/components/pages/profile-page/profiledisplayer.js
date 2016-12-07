import React, { PropTypes, Component } from 'react'
import { Grid, Cell, CardActions, Button, Icon, CardTitle, CardMenu, CardText, IconButton } from 'react-mdl'
import { Link } from 'react-router'
import Gravatar from 'react-gravatar'

import './style.css'
import './../style-card-common.css'

const ProfileDisplayer = (props) => {
  const { email, name } = props.user
  const { doToggleProfile, doToggleEdit } = props
//to={`/me/edit`} <- edit
  return (
    <div>
      <Gravatar email={email} size={130}/>
      <CardTitle className="cardTitle">
        <h3>{name}</h3>
      </CardTitle>
      <CardMenu className="cardMenu">
        <Link>
          <IconButton name="mode_edit" className="iconButton" onClick={doToggleEdit}/>
        </Link>
        <Link to={`/`}>
          <IconButton name="close" className="iconButton"/>
        </Link>
      </CardMenu>   
      <CardText className='info'>
        <div className='key'><p>E-mail</p></div>
        <div className='value'><p>{email}</p></div>
      </CardText>
    </div>
  )
}
/*
<Card className='profileCard' shadow={0} >
</Card>
*/
export default ProfileDisplayer
