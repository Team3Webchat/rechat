import React from 'react'
import { Link } from 'react-router'
import { List, ListItem, Icon } from 'react-mdl'
import Gravatar from 'react-gravatar'

const Friends = ({ friends, onFriendClick, startConversation }) => {
  return (
    <List className='friends'>
    {friends.length > 0 ?
    friends.map(f =>
      <ListItem key={f.id}>
        <Link to={`/profile/${f.id}`}>
          <Gravatar size={32} email={f.email} />
          <p>{f.firstname} {f.lastname}</p>
          <Link to={`/chat/${f.id}`}>
            <Icon name="chat"/>
          </Link>
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
