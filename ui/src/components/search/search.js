import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner } from 'react-mdl'

import { searchUser } from '../../lib/actions/searchActions'

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
    console.log("chaning")
    if (this.props.isDoneSearching !== nextProps.isDoneSearching)
      this.setState({
        isDoneSearching: !this.state.isDoneSearching,
        searchResults: !this.state.searchResults,
        failure: !this.state.failure,
      })
      if (this.props.isSearching !== nextProps.isSearching)
        this.setState({
        isSearching: !this.state.isSearching,
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
          <div id="searchBox">
          { !failure ? 
              <h3>hittar ingen användare</h3>
              :
              <h3>hittade en: 
                  
              </h3>
            }
            
          </div>
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
