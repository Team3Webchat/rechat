import React, { Component } from 'react'
import { connect } from 'react-redux'


//import { searchFriendRequests } from '../../lib/actions/friendsActions'
import { acceptFriendRequest } from '../../../lib/actions/friendsActions'
import FriendForm from './friend-form'

class FriendContainer extends Component {
  accept = id => {
    this.props.accept(id)
  }

  deny = id => {

  }
  

  render() {
    const { isDoneSearching } = this.props

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

const mapStateToProps = state => {

  return {
    token: state.auth.token,
    failure: state.search.failure,
    friends: state.friends.friends,
    friendRequests: state.friends.friendRequests,
    sentFriendRequests: state.sentFriendRequests,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    accept: (friendId) => dispatch(acceptFriendRequest(friendId)),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendContainer)