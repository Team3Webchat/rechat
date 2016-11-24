import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner, Drawer, Navigation } from 'react-mdl'

import { toggleFriends } from '../../lib/actions/menuDrawerActions'
import { deleteFriend } from '../../lib/actions/friendsActions'

import Friends from './friends'

const AppDrawer = ({ friends, doToggleFriends, showFriends, name, doDeleteFriend }) => {

  return (
    <Drawer title={"haha"}>
      <Navigation>
            <a href="#" onClick={doToggleFriends}>Friends</a>
            { showFriends &&
                //Skapa ny component som renderar ut användarens vänner
                <Friends 
                  friends={friends} 
                  onFriendClick={() => console.log('SELECTED FRIEND, SHOULD INITIATE A CHAT HERE PROBABLY')}
                  deleteFriend={doDeleteFriend}
                />
            }

        </Navigation>
        <Navigation>
            <a href="#">Chat</a>
        </Navigation>
    </Drawer>
  )
}


const mapStateToProps = state => {
  return {
    showFriends: state.menuDrawer.showFriends,
    friends: state.friends.friends,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doToggleFriends: () => {
      dispatch(toggleFriends())
    },
    doDeleteFriend: id => dispatch(deleteFriend(id)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer)
