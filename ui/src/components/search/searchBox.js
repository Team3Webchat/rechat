import React from 'react'
import { Card, FABButton, Icon, List, ListItem, Tooltip, IconButton } from 'react-mdl'
import { Link } from 'react-router'
import Gravatar from 'react-gravatar'
import './style.css'

const SearchBox = (props) => {
  const { searchResults, addFriend } = props
  return (

    <Card id='searchBox' shadow={0}>
    { searchResults.length <= 0 ?
        <List>
          <ListItem className='searchResult'>
          <Icon name='face'></Icon>Couldn't find any users</ListItem>
        </List>
        :
        <SearchResults
        searchResults={searchResults}
        addFriend={addFriend}
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
            <Link to={`/profile/${user.id}`}>
              <FABButton className="avatarPic">
                <Gravatar size={40} email={user.email} /> 
              </FABButton>
              <Tooltip label="View profile">
                <p>{user.firstname}&nbsp;{user.lastname}</p>
              </Tooltip>
            </Link>
            {user.isFriends ?
              <div className='addUser icon-inactive'>
                <Icon name='person_outline'/>
              </div>
              :
              <div className='addUser'>
                <Tooltip label="Add as friend">
                  <IconButton name='person_add' onClick={() => addFriend(user.id)} className="icon-medium"/>
                </Tooltip>
              </div>
            }

          </ListItem>
        )
      })}
    </List>
  )
}

export default SearchBox
