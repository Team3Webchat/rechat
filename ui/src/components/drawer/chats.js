import React from 'react'
import { List, ListItem, Tooltip } from 'react-mdl'
import { Link } from 'react-router'


const Chats = ({ chats, onChatClick }) => {
  console.log(chats);
  return (
    <List className="chats">
    {chats.length > 0 ?
      chats.map(c =>
        <ListItem key={c.chatId}>
        <Link to={`/chat/${c.chatId}`}>
          <Tooltip label="View conversation">
            <p>{c.friendNames[0]}</p>
          </Tooltip>
        </Link>
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
