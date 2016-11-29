import React from 'react'
import { List, ListItem } from 'react-mdl'

const Chats = ({ chats, onChatClick }) => {
  console.log(chats)
  if (chats) {
    return (
      <List>
        {
          <ListItem> 
            <span>Show chat here</span>
          </ListItem> 
        }
      </List>
    )
  } else {
    return <p>No chats</p>
  }
  
}

export default Chats