import React from 'react'
import { Card, FABButton, Icon, List, ListItem } from 'react-mdl'
import { Link } from 'react-router'
import Gravatar from 'react-gravatar'
import './style.css'

const SearchBox = (props) => {
  const { failure, searchResults, addFriend } = props
  return (

    <Card id='searchBox' shadow={0}>
    { failure ?
        <List>
          <ListItem className='searchResult'>Hittar ingen användare</ListItem>
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
  console.log(searchResults)
  return (
    <List>
      {searchResults.map(function (user) {
        return (
          <ListItem className='searchResult' key={user.id}>
            <Link to={`/profile/${user.id}`}>
              <FABButton className="avatarPic">
                <Gravatar size={40} email={user.email} />
              </FABButton>
              <p>{user.firstname}  {user.lastname}</p>
            </Link>
            {user.isFriends ?
              <div className='addUser'>
                <Icon name='person_outline'/>
              </div>
              :
              <div className='addUser'>
                <Icon name='person_add' onClick={() => addFriend(user.id)}/>
              </div>
            }

          </ListItem>
        )
      })}
    </List>
  )
}

export default SearchBox
