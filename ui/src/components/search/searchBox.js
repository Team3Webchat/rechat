import React, { PropTypes } from 'react'
import { Card, CardText, Button, FABButton,Icon } from 'react-mdl'

import './style.css'

const SearchBox = (props) => {
    const { failure, searchResults } = props
    return (

          <Card id='searchBox' shadow={0}>
          { failure ?
              <h3>hittar ingen användare</h3>
              :
              <SearchResults
                searchResults={props.searchResults}
              />
          }
          </Card>
    )
}

const SearchResults = (props) => {
    const { searchResults } = props
    return (
      <div>
          {searchResults.map(function (user) {
              return (
                <CardText className='searchResult' key={user.id}>
                  <p>{user.firstname}  {user.lastname}</p>
                  <FABButton colored className='addUser'>
                      <Icon name="add" />
                  </FABButton>
                </CardText>
              )
          })}
      </div>
    )
}

export default SearchBox
