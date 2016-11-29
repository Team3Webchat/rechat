import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Badge, Icon, Link } from 'react-mdl'

import { acceptFriendRequest, deleteFriend } from '../../../lib/actions/friendsActions'
import FriendRequestBox from './friendRequestBox'

class FriendRequestContainer extends Component {

  accept = id => {
    this.props.accept(id)
  }

  deny = id => {
    this.props.deny(id)
  }

  render() {
    const { friendRequests, toggleShowRequests, showRequests } = this.props

    return (
      <div className="navIcon">
        <a className="toRequests" onClick={toggleShowRequests}>
        { friendRequests && friendRequests.length > 0 ?
          <Badge text={friendRequests.length} overlap>
             <Icon name="account_box" />
          </Badge>
           : <Icon name="account_box" />
         }
         </a>

         {showRequests &&
           <FriendRequestBox
             friendRequests={friendRequests}
             onAccept={this.accept} onDeny={this.deny}
           />
         }
      </div>
    )
  }
}
/*


*/
const mapStateToProps = state => ({
  friendRequests: state.friends.friendRequests,
})

const mapDispatchToProps = dispatch => ({
  accept: (friendId) => dispatch(acceptFriendRequest(friendId)),
  deny: (friendId) => dispatch(deleteFriend(friendId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendRequestContainer)
