import React, { PropTypes } from 'react'

const SearchBox = (props) => {
    const { failure, searchResults } = props
    return (
        <div id="searchBox">
          { failure ? 
              <h3>hittar ingen användare</h3>
              :
              <h3>hittade en: 
                  <SearchResults
                    searchResults={props.searchResults}
                  />
              </h3>
            }
            
          </div>
    )
}

const SearchResults = (props) => {
    const { searchResults } = props
    return (
        <div id="searchResults">
            <ul>{
                searchResults.map(function (user) {
                    return <li key={user}> {user.firstname} </li>
                })}
            </ul>
        </div>
    )
}

export default SearchBox