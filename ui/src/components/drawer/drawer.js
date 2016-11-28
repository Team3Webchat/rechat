import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Navigation } from 'react-mdl'

import { toggleFriends, toggleChats, toggleProfile } from '../../lib/actions/menuDrawerActions'
//import { toggleChats } from '../../lib/actions/menuDrawerActions'
import { deleteFriend } from '../../lib/actions/friendsActions'

import Friends from './friends'
import Chats from './chats'

import './style.css'

const AppDrawer = ({ friends, doToggleFriends, showFriends, chats,
                     doToggleChats, doToggleProfile, showChats, name, doDeleteFriend,
                     startConversation }) =>
  <Drawer>

    <Navigation id='profileLink'>
      <header>
        <img alt="profile" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRfx6RQ1DY3tj5rGhIvwXOpBBokmF6juPbvQ4InvslpFF355vdY"/>
        <a href="#" onClick={doToggleProfile}>Benny Svensson</a>
      </header>
    </Navigation>

    <Navigation>
      <a href="#" onClick={doToggleFriends}>Friends</a>
      { showFriends &&
          //Skapa ny component som renderar ut användarens vänner
          <Friends
            friends={friends}
            onFriendClick={() => console.log('SELECTED FRIEND, SHOULD INITIATE A CHAT HERE PROBABLY')}
            startConversation={startConversation}
            deleteFriend={doDeleteFriend}
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


const mapStateToProps = state => ({
  showFriends: state.menuDrawer.showFriends,
  showChats: state.menuDrawer.showChats,
  friends: state.friends.friends,
  chats: state.chats.chats,
  name: state.auth.name,
})

const mapDispatchToProps = dispatch => ({
  doToggleFriends: () => dispatch(toggleFriends()),
  doToggleChats: () => dispatch(toggleChats()),
  doToggleProfile: () => dispatch(toggleProfile()),
  doDeleteFriend: id => dispatch(deleteFriend(id)),
  startConversation: () => console.log('DISPATCH START CONVERSATION ACTION'),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer)
