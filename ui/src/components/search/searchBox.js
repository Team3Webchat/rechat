import React from 'react'
import { Card, CardText, FABButton, Icon, List, ListItem } from 'react-mdl'

import './style.css'

const SearchBox = (props) => {
  const { failure } = props
  console.log('stuff');
  console.log(props);
  return (

    <Card id='searchBox' shadow={0}>
    { failure ?
        <List>
        <ListItem className='searchResult'>Hittar ingen användare</ListItem>
        </List>
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
              <Icon name='person_add' onClick={() => addFriend(user.id)}/>
            </div>
          </ListItem>
        )
      })}
    </List>
  )
}

export default SearchBox
