import React from 'react'
import { Link } from 'react-router'
import { List, ListItem, Tooltip } from 'react-mdl'
import Gravatar from 'react-gravatar'

const Friends = ({ friends, onFriendClick, startConversation }) => {
  return (
    <List className='friends'>
    {(friends && friends.length > 0)  ?
    friends.map(f =>
      <ListItem key={f.id}>
        <Link to={`/profile/${f.id}`}>
          <Tooltip label="View profile">
            <Gravatar size={32} email={f.email} />
          </Tooltip>  
        </Link>
        <Link to={`/chat/${f.id}`}>
          <Tooltip label="View conversation">
            <p>{f.firstname} {f.lastname}</p>
          </Tooltip>  
        </Link>
      </ListItem>
    )
    :
    <ListItem>
      You have no friends loser
    </ListItem>
    }
    </List>

  )
}

export default Friends
