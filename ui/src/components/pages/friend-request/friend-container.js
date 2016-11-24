import React, { Component } from 'react'
import { connect } from 'react-redux'

//import { searchFriendRequests } from '../../lib/actions/friendsActions'
import FriendForm from './friend-form'

class FriendContainer extends Component {
  accept = id => {
    console.log("Accepted!!!", id)
  }

  deny = id => {
    console.log("DENIED", id)
  }
  

  render() {
    const { isDoneSearching } = this.props
    console.log(this.props)
    console.log(this.props.friendRequests)
    return (
      <div>
      <h3>Friend requests</h3>
        <FriendForm 
          friendRequests={this.props.friendRequests}
          onAccept={this.accept} onDeny={this.deny}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.friends)
  return {
    token: state.auth.token,
    failure: state.search.failure,
    friends: state.friends.friends,
    friendRequests: state.friends.friendRequests,
    sentFriendRequests: state.friends.sentFriendRequests,
  }
}


export default connect(
  mapStateToProps,
  null,
)(FriendContainer)