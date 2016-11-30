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
  handleBlur = () => {
    this.props.endSearch(this)
    this.props.toggleShowSearch()
    this.setState({searchValue: ''})
  }
  componentWillReceiveProps(nextProps) {
    //Om isDone är true, men bara första gången
    if (this.props.isDoneSearching !== nextProps.isDoneSearching && nextProps.isDoneSearching === true)
      this.props.toggleShowSearch()

  }

  render() {
    const { searchValue } = this.state
    const { searchResults, addFriend, showSearch, failure } = this.props

    return (
      <div >
        <form id='searchForm' onSubmit={this.handleSubmit}>
          <Textfield
            label='Name'
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
