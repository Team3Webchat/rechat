import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner, Drawer, Navigation } from 'react-mdl'

import { toggleFriends } from '../../lib/actions/menuDrawerActions'
import { toggleChats } from '../../lib/actions/menuDrawerActions'

import Friends from './friends'
import Chats from './chats'

const AppDrawer = ({ friends, doToggleFriends, showFriends, chats, doToggleChats, showChats }) => {

  return (
    <Drawer title="Title">
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
          <a href="#" onClick={doToggleChats}>Chats</a>
            { showChats &&
              //Skapa ny component som renderar ut användarens chat
              <Chats 
                chats={chats} 
                onChatClick={() => console.log('SELECTED CHAT, SHOULD INITIATE A CHAT HERE PROBABLY')}
                />
            }
        </Navigation>
    </Drawer>
  )
}


const mapStateToProps = state => {
  return {
    showFriends: state.menuDrawer.showFriends,
    showChats: state.menuDrawer.showChats,
    friends: state.friends.friends,
    chats: state.chats.chats,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doToggleFriends: () => {
      dispatch(toggleFriends())
    },
    doToggleChats: () => {
      dispatch(toggleChats())
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer)
