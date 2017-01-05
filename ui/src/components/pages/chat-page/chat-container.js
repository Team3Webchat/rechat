import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-mdl'
import ChatDisplayer from './chatdisplayer'
import { sendPrivateMessage, selectActivePrivateChat, deleteChatHistory } from '../../../lib/actions/chatActions'
import { getActivePrivateChat } from '../../../lib/reducers/chatsReducer'
import { getHeaders } from '../../../lib/api'
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
      uploadedFile: null,
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

  handleOnDrop = files => {
    const {token} = this.props
    const data = new FormData()
    const file = files[0]
    data.append('file', file)
    fetch('http://localhost:8000/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: data
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        message: res,
        uploadedFile: file
      })
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
      uploadedFile: null
    })

    sendMessage(message, activeChat.chatId, id)
  }

  render() {
    const messages = this.props.activeChat ? this.props.activeChat.messages : []
    const { clearChatHistory, activeChat, friendId } = this.props
    const { openChatDialog, openAddFriendsDialog, uploadedFile } = this.state
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
              onDrop={this.handleOnDrop}
              uploadedFile={uploadedFile}
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
              activeFriendId={friendId}
              handleCloseConfirm={this.handleCloseallConfirms}/>
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
  activeChat: getActivePrivateChat(state),
  friendId: ownProps.params.id,
  friend : state.friends.friends.find(f => f.id === ownProps.params.id),
  friends : state.friends.friends,
  isLoading: state.chats.isLoadingChats,
})

const mapDispatchToProps = dispatch => ({
  beginChat: id => dispatch(selectActivePrivateChat({friendId: id})),
  sendMessage: (content, chatId, userId) => dispatch(sendPrivateMessage({content, chatId, userId})),
  clearChatHistory: (chatId, friendId) => {
    dispatch(deleteChatHistory({chatId, friendId}))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)
