import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Textfield, Button, Spinner, Card, List, ListItem, Icon, IconToggle, ListItemContent, ListItemAction } from 'react-mdl'

import './style.css'

//import FlashMessage from '../../flash-message/flash-message'

const FriendForm = ({ friendRequests, onAccept, onDeny }) => {

  return (
    <div className="friend-requests">
        
      <List style={{width: '300px'}}>
      {friendRequests && friendRequests.map(f => 
        <ListItem key={f.id}>
          <ListItemContent className='displayName' avatar="account_circle">{f.firstname} {f.lastname}</ListItemContent>
          <ListItemAction>
            <IconToggle className='acceptButton' onClick={() => onAccept(f.id)} name="plus_one" ripple id="bold" />
            <IconToggle className='denyButton' onClick={() => onDeny(f.id)} name="block" ripple id="bold" />
          </ListItemAction>
        </ListItem>
        )}
      </List>
    </div>
  )
}


export default FriendForm