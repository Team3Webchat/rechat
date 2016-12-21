import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-mdl'
import ChatDisplayer from './chatdisplayer'

import { sendPrivateMessage, selectActiveChat, deleteChatHistory } from '../../../lib/actions/chatActions'
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

  //add friend CONFIRM
  handleAddFriendConfirm = () =>  {
    this.setState({
      openAddFriendsDialog: true,
    })
  }

  handleCloseallConfirms = () =>  {
    this.setState({
      openAddFriendsDialog: false,
      openChatDialog: false,
    })
  }
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
    const { clearChatHistory, activeChat, friendId } = this.props
    const { openChatDialog, openAddFriendsDialog } = this.state
    console.log(activeChat);
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
              handleCloseChatDialog={this.handleCloseallConfirms}
              clearChatHistory={() => clearChatHistory(activeChat.chatId, friendId)}/>
            }
            { openAddFriendsDialog &&
              <AddNewFriendToChat
              openDialog={this.state.openAddFriendsDialog}
              handleCloseConfirm={this.handleCloseallConfirms}
              activeChatId={activeChat.chatId}/>
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
  friends : state.friends.friends,
  isLoading: state.chats.isLoadingChats,
})

const mapDispatchToProps = dispatch => ({
  beginChat: id => dispatch(selectActiveChat({friendId: id})),
  sendMessage: (content, chatId, userId) => dispatch(sendPrivateMessage({content, chatId, userId})),
  clearChatHistory: (chatId, friendId) => {
    dispatch(deleteChatHistory({chatId, friendId}))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)
