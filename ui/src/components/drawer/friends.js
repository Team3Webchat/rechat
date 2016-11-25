import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner, Drawer, Navigation, List, ListItem, Icon, Chip, ChipContact } from 'react-mdl'

const Friends = ({ friends, onFriendClick, deleteFriend, startConversation }) => {
  return (
    <List>
    {friends.length > 0 ?
    friends.map(f =>
      <ListItem key={f.id}>
        <Chip
        onClose={e => deleteFriend(f.id)}
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
