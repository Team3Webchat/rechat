import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner, Drawer, Navigation, List, ListItem, Icon } from 'react-mdl'

const Friends = ({ friends, onFriendClick, deleteFriend }) => {

  if (friends && friends.length > 0) {
    return (
      <List>
        {friends.map(f => 
          <ListItem key={f.id}>
            <span><Icon name="account_box"/>{f.firstname} {f.lastname}</span> 
            <span onClick={() => deleteFriend(f.id)}><b>X</b></span>
          </ListItem> 
        )}
      </List>
    )
  } else {
    return <p>No friends</p>
  }
  
}

export default Friends



