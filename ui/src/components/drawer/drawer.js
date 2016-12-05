import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Navigation } from 'react-mdl'
import {Link} from 'react-router'
import { toggleProfile, toggleChatFriend, composeNewMessage } from '../../lib/actions/menuDrawerActions'
import { deleteFriend, deleteChat } from '../../lib/actions/friendsActions'

import Friends from './friends'
import Chats from './chats'
import DeleteFriendConfirm from './delete-friend-confirm'
import DeleteChatConfirm from './delete-chat-confirm'
import Gravatar from 'react-gravatar'
import './style.css'

class AppDrawer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showChats: false,
      showFriends: false,
      openFriendDialog: false,
      deleteFriend: null,
      openChatDialog: false,
      deleteChat: null,
    }
  }

  //DELETE FREIND CONFIRM
  handleDeleteFriendConfirm = friend =>  {
    this.setState({
      openFriendDialog: true,
      deleteFriend: friend,
    })
  }

  handleCloseFriendConfirm = () =>  {
    this.setState({
      openFriendDialog: false,
      deleteFriend: null,
    })
  }

  handleDeleteFriend = (id) =>  {
    this.props.doDeleteFriend(id)
    this.handleCloseFriendConfirm()
  }

  //DELETE CHAT CONFIRM
  handleDeleteChatConfirm = chat =>  {
    this.setState({
      openChatDialog: true,
      deleteChat: chat,
    })
  }

  handleCloseChatConfirm = () =>  {
    this.setState({
      openChatDialog: false,
      deleteChat: null,
    })
  }

  handleDeleteChat = (id) =>  {
    this.props.doDeleteChat(id)
    this.handleCloseChatConfirm()
  }

  //SHOW CHATS LIST
  toggleChats = () =>  {
    this.setState({
      showChats: !this.state.showChats,
      showFriends: false,
    })
  }

  toggleFriends = () =>  {
    this.setState({
      showChats: false,
      showFriends: !this.state.showFriends,
    })
  }

  render () {
    const { friends,  chats, doToggleProfile, name, startConversation, doToggleChatFriend, email } = this.props
    const { showChats, showFriends, openFriendDialog, openChatDialog } = this.state
    const classNameFriends = `friends-${showFriends}`
    const classNameChats = `chats-${showChats}`

    return (
      <Drawer>
        <Navigation id='profileLink'>
          <header>
            <Gravatar size={40} email={email} />
            <Link to={`/me`}>{name}</Link>
          </header>
        </Navigation>

        <Navigation id='drawerboxes'>
          <div onClick={this.toggleFriends} style={{cursor: 'pointer'}} className={classNameFriends}>Friends</div>
          { showFriends &&
              //Skapa ny component som renderar ut användarens vänner
              <Friends
                friends={friends}
                startConversation={startConversation}
                deleteFriendConfirm={this.handleDeleteFriendConfirm}
              />
          }
            <div onClick={this.toggleChats} style={{cursor: 'pointer'}} className={classNameChats}>Chats</div>
              { showChats &&
                //Skapa ny component som renderar ut användarens chat
                <Chats
                  chats={chats}
                  deleteChatConfirm={this.handleDeleteChatConfirm}
                />
              }
          </Navigation>

          <div>

            { openFriendDialog &&
              <DeleteFriendConfirm
              friend={this.state.deleteFriend}
              openFriendDialog={this.state.openFriendDialog}
              handleCloseFriendDialog={this.handleCloseFriendConfirm}
              handleDeleteFriend={this.handleDeleteFriend}/>
            }

            { openChatDialog &&
              <DeleteChatConfirm
              chat={this.state.deleteChat}
              openChatDialog={this.state.openChatDialog}
              handleCloseDialog={this.handleCloseChatConfirm}
              handleDeleteChat={this.handleDeleteChat}/>
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
  email: state.auth.email,
})

const mapDispatchToProps = dispatch => ({
  doToggleProfile: () => dispatch(toggleProfile()),
  doDeleteFriend: (id) => dispatch(deleteFriend(id)),
  doDeleteChat: (id) => dispatch(deleteChat(id)),
  doComposeNewMessage: () => dispatch(composeNewMessage()),
  doToggleChatFriend: () => dispatch(toggleChatFriend()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer)
