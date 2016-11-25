import React, { Component } from 'react'
import { connect } from 'react-redux'


//import { searchFriendRequests } from '../../lib/actions/friendsActions'
import { acceptFriendRequest, deleteFriend } from '../../../lib/actions/friendsActions'
import FriendForm from './friend-form'

class FriendContainer extends Component {
  accept = id => {
    this.props.accept(id)
  }

  deny = id => {
    this.props.deny(id)
  }

  render() {
    return (
      <div className="friend-requests">
      <h3>Friend requests</h3>
        <FriendForm 
          friendRequests={this.props.friendRequests}
          onAccept={this.accept} onDeny={this.deny}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  failure: state.search.failure,
  friends: state.friends.friends,
  friendRequests: state.friends.friendRequests,
  sentFriendRequests: state.sentFriendRequests,
})

const mapDispatchToProps = dispatch => ({
  accept: (friendId) => dispatch(acceptFriendRequest(friendId)),
  deny: (friendId) => dispatch(deleteFriend(friendId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendContainer)