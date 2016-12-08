import React from 'react'
import { Link } from 'react-router'
import { List, ListItem } from 'react-mdl'
import Gravatar from 'react-gravatar'

const Friends = ({ friends, onFriendClick, startConversation }) => {
  return (
    <List className='friends'>
    {friends.length > 0 || friends === undefined?
    friends.map(f =>
      <ListItem key={f.id}>
        <Link to={`/profile/${f.id}`}>
          <Gravatar size={32} email={f.email} />
        </Link>
        <Link to={`/chat/${f.id}`}>
          <p>{f.firstname} {f.lastname}</p>
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
