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
        }, 1000)
      } else{
        props.endSearch()
      }
    }.bind(this)
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.isDoneSearching !== nextProps.isDoneSearching)
  //     this.setState({
  //       isDoneSearching: !this.state.isDoneSearching,
  //       failure: nextProps.failure,
  //       searchResults: nextProps.searchResults,
  //     })
  //   if (this.props.isSearching !== nextProps.isSearching)
  //     this.setState({
  //       isSearching: !this.state.isSearching,
  //     })
  //   if (this.props.failure !== nextProps.failure)
  //     this.setState({
  //       failure: nextProps.failure,
  //       searchResults: nextProps.searchResults,
  //     })
  // }

  render() {
    const { searchValue } = this.state
    const { isDoneSearching, searchResults } = this.props
    console.log(this.props.addFriend)

    return (
      <div>
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
            searchResults={this.props.searchResults}
            addFriend={this.props.addFriend}
          />
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isDoneSearching: state.search.isDoneSearching,
    isSearching: state.search.isSearching,
    searchResults: state.search.searchResults,
    failure: state.search.failure,
  }
}

const mapDispatchToProps = dispatch => {

  return {
    doSearch: (searchValue) => {
      dispatch(searchUser(searchValue))
    },
    endSearch: () => {
      dispatch(endSearch())
    },
    addFriend: id => {
      console.log("ADDING A FUCKING FRIEND") 
      dispatch(sendFriendRequest(id))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
