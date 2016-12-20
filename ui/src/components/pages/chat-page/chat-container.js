import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-mdl'
import ChatDisplayer from './chatdisplayer'

import { sendPrivateMessage, selectActiveChat, deleteChatHistory, addFriendNew } from '../../../lib/actions/chatActions'
import { getActiveChat } from '../../../lib/reducers/chatsReducer'

import DeleteChatConfirm from './delete-chat-confirm'
import AddNewFriendToChat from './addNewFriendToChat'

class ChatContainer extends Component {

  constructor() {
    super()
    this.state = {
      message: '',
      openChatDialog: false,
      openAddFriendsDialog: false,
      addFriendNew: null,
      deleteChatHistory: null,
    }
  }

  //DELETE CHAT CONFIRM
  handleDeleteChatConfirm = chat =>  {
    this.setState({
      openChatDialog: true,
      deleteChatHistory: chat,
    })
  }

  handleCloseChatConfirm = () =>  {
    this.setState({
      openChatDialog: false,
      deleteChatHistory: null,
    })
  }
  //END - DELETE CHAT CONFIRM

  //add friend CONFIRM
  handleAddFriendConfirm = friend =>  {
    this.setState({
      openAddFriendsDialog: true,
      addFriendNew: friend,
    })
  }

  handleCloseAddFriendConfirm = () =>  {
    this.setState({
      openAddFriendsDialog: false,
      addFriendNew: null,
    })
  }
  //END - add friend CONFIRM

  handleChange = e => {
    this.setState({
      message: e.target.value,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { friendId, beginChat } = nextProps
    beginChat(friendId)
  }

  sendMessage = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const { message } = this.state
    const { sendMessage, id, activeChat } = this.props
    this.setState({
      message: '',
    })

    sendMessage(message, activeChat.chatId, id)
  }

  render() {
    const messages = this.props.activeChat ? this.props.activeChat.messages : []
    const { clearChatHistory, activeChat, friendId, addFriend } = this.props
    const { openChatDialog, openAddFriendsDialog } = this.state
    if (!this.props.isLoading) {
      return (
        <div>
            <ChatDisplayer
              onChange={this.handleChange}
              onSubmit={this.sendMessage}
              messages={messages}
              id={this.props.id}
              message={this.state.message}
              friendsName={`${this.props.friend.firstname} ${this.props.friend.lastname}`}
              deleteChatConfirm={this.handleDeleteChatConfirm}
              AddNewFriendToChat={this.handleAddFriendConfirm}
            />
            { openChatDialog &&
              <DeleteChatConfirm
              chat={this.state.deleteChat}
              openChatDialog={this.state.openChatDialog}
              handleCloseChatDialog={this.handleCloseChatConfirm}
              clearChatHistory={() => clearChatHistory(activeChat.chatId, friendId)}/>
            }
            { openAddFriendsDialog &&
              <AddNewFriendToChat
              friend={this.state.addFriend}
              openAddFriendsDialog={this.state.openAddFriendsDialog}
              handleCloseAddFriendConfirm={this.handleCloseAddFriendConfirm}
              addFriend={() => addFriend(activeChat.chatId, friendId)}/>
            }
        </div>
      )
    } else {
      return <div className='loading-chat'><Spinner /></div>
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.token,
  id: state.auth.id,
  activeChat: getActiveChat(state),
  friendId: ownProps.params.id,
  friend : state.friends.friends.find(f => f.id === ownProps.params.id),
  isLoading: state.chats.isLoadingChats,
})

const mapDispatchToProps = dispatch => ({
  beginChat: id => dispatch(selectActiveChat({friendId: id})),
  sendMessage: (content, chatId, userId) => dispatch(sendPrivateMessage({content, chatId, userId})),
  clearChatHistory: (chatId, friendId) => {
    dispatch(deleteChatHistory({chatId, friendId}))
  },
  addFriend: (chatId, friendId) => {
    dispatch(addFriendNew({chatId, friendId}))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)
