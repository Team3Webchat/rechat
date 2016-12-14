import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield } from 'react-mdl'

import { searchUser, endSearch } from '../../lib/actions/searchActions'
import { sendFriendRequest } from '../../lib/actions/friendsActions'
import SearchBox from './searchBox'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: this.props.searchValue,
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

      if (e.target.value !== ''){
        this.promise = setTimeout(function(){
          props.doSearch(state.searchValue)
        }, 500)
      }else{
        props.endSearch()
      }
    }.bind(this)
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  filterSearchResults = () => {
    const { searchResults, friends, sentFriendRequests, userId } = this.props
    let count = 0
    const filteredResults = searchResults.filter((user) => {
      const id = user.id
      user.isFriends = (friends.find(f => f.id === user.id) != null || sentFriendRequests.find(f => f.id === user.id) || user.id === userId) ? true : false
      return id !== userId
    })
    return filteredResults
  }

  componentWillReceiveProps(nextProps) {
    //Om isDone är true, men bara första gången
    if (this.props.isDoneSearching !== nextProps.isDoneSearching && nextProps.isDoneSearching === true)
      this.props.toggleShowSearch(this.state.searchValue)
    if(this.props.searchValue !== nextProps.searchValue){
      this.setState({
        searchValue: nextProps.searchValue,
      })
    }

  }

  render() {
    const { searchValue } = this.state
    const { addFriend, showSearch, failure } = this.props

    return (
      <div className="search">
        <form id='searchForm' onSubmit={this.handleSubmit} autoComplete="off">
          <Textfield
            label="Name"
            required
            value={searchValue}
            onChange={this.handleChange('searchValue')}
            expandable
            expandableIcon="search"
            onBlur={this.handleBlur}
          />
        </form>
        { showSearch &&
          <SearchBox
            failure={failure}
            searchResults={this.filterSearchResults()}
            addFriend={addFriend}
          />
        }
      </div>
    )
  }
}
const mapStateToProps = state => ({
  userId: state.auth.id,
  token: state.auth.token,
  isDoneSearching: state.search.isDoneSearching,
  isSearching: state.search.isSearching,
  searchResults: state.search.searchResults,
  failure: state.search.failure,
  friends: state.friends.friends,
  sentFriendRequests: state.friends.sentFriendRequests,
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
