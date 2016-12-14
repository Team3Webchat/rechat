import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield } from 'react-mdl'

//import { searchUser, endSearch } from '../../lib/actions/searchActions'
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
    const { getSearchResults, closeSearchBox } = this.props
    return function(e) {
      const state = {}
      state[key] = e.target.value
      this.setState(state)

      const value = e.target.value
      if (this.promise)
        clearInterval(this.promise)
      if (e.target.value !== ''){
        this.promise = setTimeout(() => {
          getSearchResults(value)
        }, 500)
      }else{
        closeSearchBox()
      }
    }.bind(this)
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  /*handleBlur = e => {
    const layout = document.getElementById('mdl-layout__content')
    console.log(e.target.parentElement.classList);

    if(!e.target.parentElement.classList.contains( 'mdl-textfield__expandable-holder' )){
      //&& !e.target.parentElement.classList.contains( 'searchResult' )
      //&& !e.target.parentElement.classList.contains( 'toRequests' ))

      //this.props.endSearch()
      console.log('onlick utanför i search');
      this.setState({
        searchValue: this.state.searchValue,
        showSearch: false,
        searchResults: null,
        failure: false,
      })
    }else{
      console.log('inannaför i search');
      this.setState({
        searchValue: this.state.searchValue,
        showSearch: true,
        searchResults: null,
        failure: false,
      })
    }
  }*/



  filterSearchResults = () => {
    const { friends, sentFriendRequests, userId, searchResults, failure } = this.props

    if (!failure) {
      const filteredResults = searchResults.filter((user) => {
        const id = user.id
        user.isFriends = (friends.find(f => f.id === user.id) != null || sentFriendRequests.find(f => f.id === user.id) || user.id === userId) ? true : false
        return id !== userId
      })
      return filteredResults
    }
    return searchResults
  }

  clearInput = () => {
    this.setState({
      searchValue: '',
    })
  }



  render() {
    const { searchValue } = this.state
    const { addFriend, failure, showSearch } = this.props

    return (
      <div className="search">
        <form id='searchForm' onSubmit={this.handleSubmit} autoComplete="off">
          <Textfield
            label="Name"
            required
            value={searchValue}
            onChange={this.handleChange('searchValue')}
            onBlur={this.clearInput}
            ref={this.props.inputRef}
            expandable
            expandableIcon="search"
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
  friends: state.friends.friends,
  sentFriendRequests: state.friends.sentFriendRequests,
})

const mapDispatchToProps = dispatch => ({
  addFriend: id => dispatch(sendFriendRequest(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
