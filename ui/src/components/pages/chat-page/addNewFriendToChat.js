import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox} from 'react-mdl'
import { getActivePrivateChat } from '../../../lib/reducers/chatsReducer'
import { addFriendsToChat } from '../../../lib/actions/chatActions'
import './../style-dialog-common.css'

class AddNewFriendToChat extends Component {

  constructor() {
    super()
    this.state = {
      friends: [],
    }
  }
  handleChange = e => {
    const { friends } = this.state
    var index = friends.indexOf(e.target.value)
    if (index >= 0)
      friends.splice(index, 1)
    if (!e.target.parentElement.classList.contains('is-checked'))
      this.state.friends.push(e.target.value)
  }

  addFriends = () => {
    const { addFriends, handleCloseConfirm, activeChat } = this.props
    addFriends(activeChat.chatId, this.state.friends)
    handleCloseConfirm()
  }
  render(){
    const { friends, openDialog, handleCloseConfirm } = this.props
    return (
      <div>
        <Dialog open={openDialog}>
          <DialogTitle>Add friends to chat</DialogTitle>
            <DialogContent>
            {friends.map(f =>
              <Checkbox onChange={this.handleChange}
              label={f.firstname+' '+f.lastname}
              value={f.id}
              key={f.id}
              ref={f.key}/>
            )}
            </DialogContent>
          <DialogActions>
            <Button type='button' onClick={this.addFriends}>Add</Button>
            <Button type='button' onClick={handleCloseConfirm}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

}
const mapStateToProps = (state, ownProps) => ({
  friends : state.friends.friends,//.map(f => f.id !== ownProps.activeFriendId)
  activeChat: getActivePrivateChat(state),
})

const mapDispatchToProps = dispatch => ({
  addFriends: (chatId, friends) => {
    dispatch(addFriendsToChat({friends, chatId}))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewFriendToChat)
