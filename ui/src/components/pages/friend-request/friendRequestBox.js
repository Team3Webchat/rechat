import React from 'react'
import {  Card, List, ListItem, Icon, ListItemContent, ListItemAction } from 'react-mdl'
import Gravatar from 'react-gravatar'
import './style.css'

//import FlashMessage from '../../flash-message/flash-message'

const FriendRequestBox = ({ friendRequests, onAccept, onDeny }) => {

  return (
    <Card id='friendRequestBox' shadow={0}>
      <List>
        {friendRequests.length > 0 ?
          friendRequests.map(f =>
          <ListItem key={f.id}>
            <ListItemContent className='displayName'><Gravatar className='searchPic' email={f.email} size={40} /> {f.firstname} {f.lastname}</ListItemContent>
            <ListItemAction>
              <Icon onClick={() => onAccept(f.id)} name="add_circle_outline" className="accept"/>
              <Icon onClick={() => onDeny(f.id)} name="block" className="deny"/>
            </ListItemAction>
          </ListItem>
          )
        :
        <ListItem>
          <ListItemContent className="emptyRequests">
            <Icon name="pan_tool"/>
          No new friend requests</ListItemContent>
        </ListItem>
        }
      </List>
    </Card>
  )
}

export default FriendRequestBox
