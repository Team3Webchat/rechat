import React from 'react'
import { Card, CardActions, Button, CardTitle, CardMenu, CardText, IconButton, Tooltip} from 'react-mdl'
import { Link } from 'react-router'
import Gravatar from 'react-gravatar'

import './../../style-card-common.css'

const ProfileDisplayer = (props) => {

  const {firstname, lastname, email, id, friendsSince} = props.friend
  const { handleDeleteFriendConfirm, handleReportFriendConfirm, addFriend } = props

  return (
    <Card className="profileCard" shadow={0}>
      <Gravatar email={email} size={130}/>
      <CardTitle className='cardTitle'>
        <h3>{firstname} {lastname}</h3>
      </CardTitle>
      <CardMenu className='cardMenu'>
        <Tooltip label="Report this person for inappropriate behavior.">
          <IconButton name="report" className="iconButton" onClick={handleReportFriendConfirm}/>
        </Tooltip>  
        <Link to={`/`}>
          <Tooltip label="Close">
            <IconButton name="close" className="iconButton"/>
          </Tooltip>  
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
        <Button className='buttons' onClick={handleDeleteFriendConfirm}>Remove Friend</Button>
        :
        <Button className='buttons' onClick={() => addFriend(id)}>Add as Friend</Button>
      }
      </CardActions>



    </Card>
  )
}

export default ProfileDisplayer
