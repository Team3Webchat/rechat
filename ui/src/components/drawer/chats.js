import React from 'react'
import { List, ListItem } from 'react-mdl'

import './chat-list-style.css'

const Chats = ({ chats, onChatClick }) => {
  return (
    <List className="chats">
    {chats ?
      <ListItem>
        <span>Loop chats</span>
      </ListItem>
      :
      <ListItem>
        <p>No active chats</p>
      </ListItem>
    }
    </List>
  )


}

export default Chats
