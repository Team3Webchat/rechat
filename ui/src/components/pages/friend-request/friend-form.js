import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Textfield, Button, Spinner, Card, List, ListItem, Icon } from 'react-mdl'

//import FlashMessage from '../../flash-message/flash-message'

const FriendForm = ({ friendRequests, onAccept, onDeny }) => {
  console.log(friendRequests)
  return (
    <div className="friend-requests">
        <List>
        {friendRequests && friendRequests.map(f => 
          <ListItem key={f.id}>
            <span><Icon name="account_box"/>{f.firstname} {f.lastname}</span>
            <span onClick={() => onAccept(f.id)}>ACCEPT</span>
            <span onClick={() => onDeny(f.id)}>DENY</span>
          </ListItem> 
        )}
      </List>
    </div>
  )
}


export default FriendForm