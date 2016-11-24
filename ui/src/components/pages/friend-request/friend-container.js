import React, { Component } from 'react'
import { connect } from 'react-redux'

//import { searchFriendRequests } from '../../lib/actions/friendsActions'
import FriendForm from './friend-form'

class FriendContainer extends Component {
    //const { email } = this.state
  handleChange = key => {
    return function(e) {
      const state = {}
      state[key] = e.target.value
      this.setState(state)
    }.bind(this)
  }


  render() {
    const { isDoneSearching } = this.props

    return (
      <div>
      <p>Hello</p>
      { isDoneSearching &&
          <FriendForm/>
      }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    failure: state.search.failure,
    friends: state.friends.friends,
  }
}


export default connect(
  mapStateToProps,
  null,
)(FriendContainer)