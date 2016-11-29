import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Textfield, Button, Spinner, Card, List, ListItem, Icon, ListItemContent, ListItemAction } from 'react-mdl'

import './style.css'

//import FlashMessage from '../../flash-message/flash-message'

const FriendRequestBox = ({ friendRequests, onAccept, onDeny }) => {

  return (
    <Card id='friendRequestBox' shadow={0}>
      <List>
        {friendRequests.length > 0 ?
          friendRequests.map(f =>
          <ListItem key={f.id}>
            <ListItemContent className='displayName' avatar="account_circle">{f.firstname} {f.lastname}</ListItemContent>
            <ListItemAction>
              <Icon onClick={() => onAccept(f.id)} name="add_circle_outline" ripple id="bold" />
              <Icon onClick={() => onDeny(f.id)} name="block" ripple id="bold" />
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
