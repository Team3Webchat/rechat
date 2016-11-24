import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner, Drawer, Navigation, List, ListItem, Icon, Chip, ChipContact } from 'react-mdl'

const Friends = ({ friends, onFriendClick }) => {

  if (friends && friends.length > 0) {
    return (

      <List>
        {friends.map(f =>
          <ListItem key={f.id}>
            <Chip>
                <ChipContact style={{ background: 'url("https://placekitten.com/150/150") 0 0 / cover' }}/>
                {f.firstname} {f.lastname}
            </Chip>
          </ListItem>
        )}
      </List>
    )
  } else {
    return <p>No friends</p>
  }

}

export default Friends
