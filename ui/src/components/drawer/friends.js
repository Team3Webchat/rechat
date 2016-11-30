import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Chip, ChipContact } from 'react-mdl'
import DeleteFriendConfirm from './delete-friend-confirm'

const Friends = ({ friends, onFriendClick, doToggleDeleteFriend, startConversation }) => {
  return (
    <List>
    {friends.length > 0 ?
    friends.map(f =>
      <ListItem key={f.id}>
        <Chip
        onClose={e => doToggleDeleteFriend(f.id)}
        onClick={e => startConversation()}>
            <ChipContact
            style={{ background: 'url("https://placekitten.com/150/150") 0 0 / cover' }}/>
            {f.firstname} {f.lastname}
        </Chip>
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