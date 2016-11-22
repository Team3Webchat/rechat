import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner } from 'react-mdl'

import { searchUser } from '../../lib/actions/searchActions'

class Search extends Component {
    //const { email } = this.state
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      isDoneSearching: null,
      isSearching: null,
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
    const { email } = this.state
    //skicka till dispatch sökning
    const { doSearchEmail } = this.props
    doSearchEmail(email)
    console.log('söker ....')
    console.log(this.state)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isDoneSearching !== nextProps.isDoneSearching)
      this.setState({
        isDoneSearching: !this.state.isDoneSearching,
      })
  }

  render() {
    const { isDoneSearching, isSearching, email } = this.state
    console.log(isDoneSearching);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <div>
        <Textfield
          label="Email"
          required
          type="email"
          value={email}
          onChange={this.handleChange('email')}
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
            <h3>heeej</h3>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doSearchEmail: (email) => {
      dispatch(searchUser(email))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
