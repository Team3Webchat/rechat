import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  } from 'react-mdl'
import ChatDisplayer from './chatdisplayer'

import { sendPrivateMessage, selectActiveChat, deleteChatHistory } from '../../../lib/actions/chatActions'
import { getActiveChat } from '../../../lib/reducers/chatsReducer'

import DeleteChatConfirm from './delete-chat-confirm'

class ChatContainer extends Component {

  constructor() {
    super()
    this.state = {
      message: '',
      openChatDialog: false,
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

  handleDeleteChat = (id) =>  {
    this.props.doDeleteChat(id)
    this.handleCloseChatConfirm()
  }
  //END - DELETE CHAT CONFIRM

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
    const { clearChatHistory, activeChat} = this.props
    const { openChatDialog } = this.state
    if (!this.props.isLoading) {
      return (
        <div>
          <div>
            <ChatDisplayer
              onChange={this.handleChange}
              onSubmit={this.sendMessage}
              messages={messages}
              id={this.props.id}
              message={this.state.message}
              friendsName={`${this.props.friend.firstname} ${this.props.friend.lastname}`}
              deleteChatConfirm={this.handleDeleteChatConfirm}
            />
          </div>
          <div>
            { openChatDialog &&
              <DeleteChatConfirm
              chat={this.state.deleteChat}
              openChatDialog={this.state.openChatDialog}
              handleCloseChatDialog={this.handleCloseChatConfirm}
              clearChatHistory={() => clearChatHistory(activeChat.chatId)}/>
            }
          </div>
        </div>
      )
    } else {
      return <p>Loading...</p>
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  isNewMessage: state.menuDrawer.isEditing,
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
  clearChatHistory: chatId => {
    dispatch(deleteChatHistory({chatId}))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)
