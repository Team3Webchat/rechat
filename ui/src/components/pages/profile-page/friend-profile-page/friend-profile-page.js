import React from 'react'
import { Card, CardActions, Button, CardTitle, CardMenu, CardText, IconButton} from 'react-mdl'
import { Link } from 'react-router'
import Gravatar from 'react-gravatar'


import './../../style-card-common.css'

const ProfileDisplayer = (props) => {

  //const { email, fristname, lastname, id } = props.friend
  console.log(props.friend)
  const {firstname, lastname, email, id, friendsSince} = props.friend//{firstname: 'inget', lastname: 'nada', email:'rebecca@awesome.com'}
  const { handleDeleteFriendConfirm, handleReportFriendConfirm, addFriend } = props

  return (
    <Card className="profileCard" shadow={0}>
      <Gravatar email={email} size={130}/>
      <CardTitle className='cardTitle'>
        <h3>{firstname} {lastname}</h3>
      </CardTitle>
      <CardMenu className='cardMenu'>
        <IconButton name="report" className="iconButton" onClick={handleReportFriendConfirm}/>
        <Link to={`/`}>
          <IconButton name="close" className="iconButton"/>
        </Link>
      </CardMenu>
      <CardText className="info">
        <div className="info-row">
          <div className='key'><p>E-mail</p></div>
          <div className='value'><p>{email}</p></div>

        </div>
        {friendsSince &&
          <div className="info-row">
            <div className='key'><p>Friends since</p></div>
            <div className='value'><p>{friendsSince}</p></div>
          </div>
        }
      </CardText>

      <CardActions border>
      {friendsSince ?
        <Button className='buttons' onClick={handleDeleteFriendConfirm}>Remove friend</Button>
        :
        <Button className='buttons' onClick={() => addFriend(id)}>Add as friend</Button>
      }
      </CardActions>



    </Card>
  )
}

export default ProfileDisplayer
