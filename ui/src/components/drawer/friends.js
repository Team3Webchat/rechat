import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { List, ListItem, Chip, ChipContact, Icon } from 'react-mdl'
import DeleteFriendConfirm from './delete-friend-confirm'
import Gravatar from 'react-gravatar'

const Friends = ({ friends, onFriendClick, deleteFriendConfirm, startConversation }) => {
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
/*
<Chip onClose={e => deleteFriendConfirm(f)}>
  <ChipContact className="mdl-color--teal mdl-color-text--white"><Gravatar size={32} email={f.email} /></ChipContact>
  {f.firstname} {f.lastname}
</Chip>
*/

export default Friends
