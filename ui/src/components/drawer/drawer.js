import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Navigation, Icon, FABButton } from 'react-mdl'

import { toggleFriends, toggleChats, toggleProfile, toggleChatFriend, composeNewMessage } from '../../lib/actions/menuDrawerActions'
import { deleteFriend } from '../../lib/actions/friendsActions'

import Friends from './friends'
import Chats from './chats'
import DeleteFriendConfirm from './delete-friend-confirm'

import './style.css'

class AppDrawer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      deleteFriend: null,
    }
  }

  handleDeleteFriendConfirm = friend =>  {
    this.setState({
      openDialog: true,
      deleteFriend: friend,
    })
  }
  handleCloseConfirm = () =>  {
    this.setState({
      openDialog: false,
      deleteFriend: null,
    })
  }

  handleDeleteFriend = (id) =>  {
    this.props.doDeleteFriend(id)
    this.handleCloseConfirm()
  }

  render () {
    const { friends, doToggleFriends, showFriends, chats,
                     doToggleChats, doToggleProfile, showChats, name,
                     startConversation, doComposeNewMessage, doToggleChatFriend } = this.props
    return (
      <Drawer>
        <Navigation id='profileLink'>
          <header>
            <img alt="profile" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRfx6RQ1DY3tj5rGhIvwXOpBBokmF6juPbvQ4InvslpFF355vdY"/>
            <a href="#" onClick={doToggleProfile}>{name}</a>
            <FABButton colored onClick={doComposeNewMessage}>
              <Icon name="create" />
            </FABButton>
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
                deleteFriendConfirm={this.handleDeleteFriendConfirm}
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

          <div>

            { this.state.openDialog &&
              <DeleteFriendConfirm
              friend={this.state.deleteFriend}
              openDialog={this.state.openDialog}
              handleCloseDialog={this.handleCloseConfirm}
              handleDeleteFriend={this.handleDeleteFriend}/>
            }

          </div>

      </Drawer>
    )
  }
}

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
  doDeleteFriend: (id) => dispatch(deleteFriend(id)),
  startConversation: () => console.log('DISPATCH START CONVERSATION ACTION'),
  doComposeNewMessage: () => dispatch(composeNewMessage()),
  doToggleChatFriend: () => dispatch(toggleChatFriend()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer)
