import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Navigation } from 'react-mdl'
import {Link} from 'react-router'

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
    }
  }

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
    const { friends, name, email, chats } = this.props
    const { showFriends, showChats } = this.state
    const classNameFriends = `friends-${showFriends}`
    const classNameChats = `chats-${showChats}`

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
                <Friends
                  friends={friends}
                />
            }
          <div onClick={this.toggleChats} className={classNameChats}>Chats</div>
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
  friends: state.friends.friends,
  chats: state.chats.groupChats,
  name: state.auth.name,
  email: state.auth.email,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer)
