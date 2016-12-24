import React from 'react'
import { List, ListItem } from 'react-mdl'


const Chats = ({ chats, onChatClick }) => {
  console.log(chats);
  return (
    <List className="chats">
    {chats.length > 0 ?
      chats.map(c =>
        <ListItem>
          <span>Loop chats</span>
        </ListItem>
      )
      :
      <ListItem>
        <p>No active chats</p>
      </ListItem>
    }
    </List>
  )


}

export default Chats
