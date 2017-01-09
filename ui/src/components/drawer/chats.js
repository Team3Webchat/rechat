import React from 'react'
import { List, ListItem, Tooltip } from 'react-mdl'
import { Link } from 'react-router'


const Chats = ({ chats, onChatClick }) => {
  return (
    <List className="chats">
    {chats.length > 0 ?
      chats.map(c =>
        <ListItem key={c.chatId}>
        <Link to={`/chat/${c.chatId}`}>
          <Tooltip label="View conversation">
            <div>{c.friendNames.map((n, i) =>
              i+1 < c.friendNames.length ?
              <p key={i}>{n},</p>
              :
              <p key={i}>{n}</p>
            )}</div>
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
