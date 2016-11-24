import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner, Drawer, Navigation, List, ListItem, Icon } from 'react-mdl'

const Chats = ({ chats, onChatClick }) => {
  console.log(chats)
  if (chats) {
    return (
      <List>
        {
          <ListItem> 
            <span>{"Show chat here"}</span>
          </ListItem> 
        }
      </List>
    )
  } else {
    return <p>No chats</p>
  }
  
}

export default Chats