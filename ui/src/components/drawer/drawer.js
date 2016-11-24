import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner, Drawer, Navigation } from 'react-mdl'

import { toggleFriends } from '../../lib/actions/menuDrawerActions'

import Friends from './friends'

const AppDrawer = ({ friends, doToggleFriends, showFriends, name }) => {

  return (
    <Drawer title={"haha"}>
      <Navigation>
            <a href="#" onClick={doToggleFriends}>Friends</a>
            { showFriends &&
                //Skapa ny component som renderar ut användarens vänner
                <Friends 
                  friends={friends} 
                  onFriendClick={() => console.log('SELECTED FRIEND, SHOULD INITIATE A CHAT HERE PROBABLY')}
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
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer)
