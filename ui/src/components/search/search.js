import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Icon, FABButton } from 'react-mdl'

import { searchUser, endSearch } from '../../lib/actions/searchActions'
import { sendFriendRequest } from '../../lib/actions/friendsActions'
import SearchBox from './searchBox'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
    }
  }

  handleChange = key => {
    return function(e) {
      const state = {}
      const props = this.props
      state[key] = e.target.value
      this.setState(state)

      if (this.promise)
        clearInterval(this.promise)
      if (e.target.value != ''){
        this.promise = setTimeout(function(){
          props.doSearch(state.searchValue)
        }, 500)
      } else{
        props.endSearch()
      }
    }.bind(this)
  }

  render() {
    const { searchValue } = this.state
    const { isDoneSearching, searchResults, addFriend } = this.props

    return (
      <div className="navIcon">
        <form id='searchForm'>
          <Textfield
            label='Name'
            required
            value={searchValue}
            onChange={this.handleChange('searchValue')}
            expandable
            expandableIcon="search"
          />
        </form>
        { isDoneSearching &&
          <SearchBox
            searchResults={searchResults}
            addFriend={addFriend}
          />
        }
      </div>
    )
  }
}
const mapStateToProps = state => ({
  token: state.auth.token,
  isDoneSearching: state.search.isDoneSearching,
  isSearching: state.search.isSearching,
  searchResults: state.search.searchResults,
  failure: state.search.failure,
})

const mapDispatchToProps = dispatch => ({
  doSearch: (searchValue) => dispatch(searchUser(searchValue)),
  endSearch: () => dispatch(endSearch()),
  addFriend: id => dispatch(sendFriendRequest(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
