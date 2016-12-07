import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Navigation } from 'react-mdl'
import {Link} from 'react-router'
import { toggleProfile, toggleChatFriend, composeNewMessage } from '../../lib/actions/menuDrawerActions'

import Friends from './friends'
import Chats from './chats'
import Gravatar from 'react-gravatar'
import './style.css'

class AppDrawer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showChats: false,
      showFriends: false,
      openFriendDialog: false,
      openChatDialog: false,
    }
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
              />
          }
            <div onClick={this.toggleChats} style={{cursor: 'pointer'}} className={classNameChats}>Chats</div>
              { showChats &&
                //Skapa ny component som renderar ut användarens chat
                <Chats
                  chats={chats}
                />
              }
          </Navigation>

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
  doComposeNewMessage: () => dispatch(composeNewMessage()),
  doToggleChatFriend: () => dispatch(toggleChatFriend()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer)
