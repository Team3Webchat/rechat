import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Navigation } from 'react-mdl'
import {Link} from 'react-router'

import Friends from './friends'
import Gravatar from 'react-gravatar'
import './style.css'

class AppDrawer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showChats: false,
      showFriends: false,
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
    const { friends, name, startConversation, email } = this.props //chats
    const { showFriends } = this.state //showChats
    const classNameFriends = `friends-${showFriends}`
    //const classNameChats = `chats-${showChats}`

    return (
      <Drawer>
        <Navigation id='profileLink'>
          <header>
            <Gravatar size={50} email={email} />
            <Link to={`/me`}>{name}</Link>
          </header>
        </Navigation>

        <Navigation id='drawerboxes'>
          <div onClick={this.toggleFriends} className={classNameFriends}>Friends</div>
            { showFriends &&
                //Skapa ny component som renderar ut användarens vänner
                <Friends
                  friends={friends}
                  startConversation={startConversation}
                />
            }
        </Navigation>

      </Drawer>
    )
  }
}
/*
<div onClick={this.toggleChats} className={classNameChats}>Chats</div>
  { showChats &&
    //Skapa ny component som renderar ut användarens chat
    <Chats
      chats={chats}
    />
  }
*/
const mapStateToProps = state => ({
  friends: state.friends.friends,
  //chats: state.chats.chats,
  name: state.auth.name,
  email: state.auth.email,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer)
