import React from 'react'
import { Card, CardText, FABButton, Icon, List, ListItem } from 'react-mdl'

import './style.css'

const SearchBox = (props) => {
  const { failure } = props
  return (

    <Card id='searchBox' shadow={0}>
    { failure ?
        <h3>hittar ingen användare</h3>
        :
        <SearchResults
        searchResults={props.searchResults}
        addFriend={props.addFriend}
        />
    }
    </Card>
  )
}

const SearchResults = (props) => {

  const { searchResults, addFriend } = props
  return (
    <List>
      {searchResults.map(function (user) {
        return (
          <ListItem className='searchResult' key={user.id}>
            <FABButton className="avatarPic" style={{ background: 'url("https://placekitten.com/150/150") 0 0 / cover' }}>
            </FABButton>
            <p>{user.firstname}  {user.lastname}</p>
            <div className='addUser'>
              <Icon name='person_add' onClick={() => props.addFriend(user.id)}/>
            </div>
          </ListItem>
        )
      })}
    </List>
  )
}

export default SearchBox
