import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { List, ListItem, Chip, ChipContact } from 'react-mdl'
import DeleteFriendConfirm from './delete-friend-confirm'

const Friends = ({ friends, onFriendClick, deleteFriendConfirm, startConversation }) => {
  return (
    <List>
    {friends.length > 0 ?
    friends.map(f =>
      <ListItem key={f.id}>
        <Link to={`/chat/${f.id}`}>
          <Chip
          onClose={e => deleteFriendConfirm(f)}>
            <ChipContact
            style={{ background: 'url("https://placekitten.com/150/150") 0 0 / cover' }}/>
            {f.firstname} {f.lastname}
          </Chip>
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
//onClick={e => startConversation()}>
export default Friends
