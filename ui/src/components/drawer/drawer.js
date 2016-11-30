import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Navigation, Dialog, Button, DialogTitle, DialogContent, DialogActions } from 'react-mdl'

import { toggleFriends, toggleChats, toggleProfile, toggleDeleteFriend } from '../../lib/actions/menuDrawerActions'

import Friends from './friends'
import Chats from './chats'
import DeleteFriendConfirm from './delete-friend-confirm'

import './style.css'

class AppDrawer extends React.Component {

  componentDidMount() {
    console.log('Component did mount')
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  render () {
    const { friends, doToggleFriends, showFriends, chats,
                     doToggleChats, doToggleProfile, showChats, name, doToggleDeleteFriend,
                     startConversation } = this.props
    return (
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
                doToggleDeleteFriend={this.handleOpenDialog}
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

            <Dialog open={this.state.openDialog}>
              <DialogTitle>Remove friend</DialogTitle>
                <DialogContent>
                  <p>Remove "friend" from your contacts?</p>
                </DialogContent>
              <DialogActions>
                <Button type='button'>Confirm</Button>
                <Button type='button' onClick={this.handleCloseDialog}>Cancel</Button>
              </DialogActions>
            </Dialog>  
            
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
  startConversation: () => console.log('DISPATCH START CONVERSATION ACTION'),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer)