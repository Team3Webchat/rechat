import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner } from 'react-mdl'

import { searchUser } from '../../lib/actions/searchActions'
import SearchBox from './searchBox'

class Search extends Component {
    //const { email } = this.state
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      isDoneSearching: null,
      isSearching: null,
      searchResults: null,
      failure: null,
    }
  }

  handleChange = key => {
    return function(e) {
      const state = {}
      state[key] = e.target.value
      this.setState(state)
    }.bind(this)
  }

  handleSubmit = e => {
    e.preventDefault()
    const { searchValue } = this.state
    //skicka till dispatch sökning
    const { doSearch } = this.props
    doSearch(searchValue)
    console.log('söker ....')
    console.log(this.state)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isDoneSearching !== nextProps.isDoneSearching)
      this.setState({
        isDoneSearching: !this.state.isDoneSearching,
        failure: nextProps.failure,
        searchResults: nextProps.searchResults,
      })
      if (this.props.isSearching !== nextProps.isSearching)
        this.setState({
        isSearching: !this.state.isSearching,
      })
      if (this.props.failure !== nextProps.failure)
        this.setState({
          failure: nextProps.failure,
        searchResults: nextProps.searchResults,
      })
  }

  render() {
    const { isDoneSearching, isSearching, searchResults, failure, searchValue } = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <div>
        <Textfield
          label="Name"
          required
          value={searchValue}
          onChange={this.handleChange('searchValue')}
        />
        </div>
        { isSearching ? <Spinner />
        :  <div>
              <Button
                  className="buttons"
                  primary
                  raised
                  ripple
                  type="submit"
              >
                  Search
              </Button>
          </div>
        }
        </form>
        { isDoneSearching &&
          <SearchBox
              failure={this.state.failure}
              searchResults={this.state.searchResults}
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
