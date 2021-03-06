import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-mdl'
import ChatDisplayer from './chatdisplayer'
import { sendPrivateMessage, selectActivePrivateChat, deleteChatHistory, selectActiveGroupChat, selectActiveChat } from '../../../lib/actions/chatActions'
import { getActiveChat, getActivePrivateChat, getActiveGroupChat, getActiveGroupChatFriends } from '../../../lib/reducers/chatsReducer'
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
      messageType: 'text',
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
    data.append('file',file)
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
        uploadedFile: file,
        messageType: 'file',
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    const { friendId, beginChat } = nextProps
    beginChat(friendId)
  }
  //component will mount begin chat with url props
  componentWillMount(){
    console.log('componentWillMount');
    console.log(this.props.params.id);
    //this.props.beginChat(this.props.params.id)
  }

  sendMessage = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const { message, messageType } = this.state
    const { sendMessage, id, activeChat } = this.props
    this.setState({
      message: '',
      uploadedFile: null,
    })

    sendMessage(message, messageType, activeChat.chatId, id)
  }

  render() {
    const messages = this.props.activeChat ? this.props.activeChat.messages : []
    const { clearChatHistory, activePrivateChat, activeGroupChat, activeChat, friendId, friend, friendNames, id } = this.props
    const { openChatDialog, openAddFriendsDialog, uploadedFile, message, deleteChat } = this.state;
    const friendName = friend ? `${friend.firstname} ${friend.lastname}` : friendNames.toString()

    if (!this.props.isLoading) {
      return (
        <div>
        {!friend ?
          <ChatDisplayer
            onChange={this.handleChange}
            onSubmit={this.sendMessage}
            messages={messages}
            id={id}
            message={message}
            friendsName={friendName}
            deleteChatConfirm={this.handleDeleteChatConfirm}
            onDrop={this.handleOnDrop}
            uploadedFile={uploadedFile}
          />
          :
          <ChatDisplayer
            onChange={this.handleChange}
            onSubmit={this.sendMessage}
            messages={messages}
            id={id}
            message={message}
            friendsName={friendName}
            deleteChatConfirm={this.handleDeleteChatConfirm}
            AddNewFriendToChat={this.handleAddFriendConfirm}
            onDrop={this.handleOnDrop}
            uploadedFile={uploadedFile}
          />
        }

            { openChatDialog &&
              <DeleteChatConfirm
              chat={deleteChat}
              openChatDialog={openChatDialog}
              handleCloseChatDialog={this.handleCloseallConfirms}
              clearChatHistory={() => clearChatHistory(activeChat.chatId, friendId)}/>
            }
            { openAddFriendsDialog &&
              <AddNewFriendToChat
              openDialog={openAddFriendsDialog}
              activeChat={activeChat}
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
  activeChat: getActiveChat(ownProps.params.id, state),
  friendId: ownProps.params.id,
  friend: state.friends.friends.find(f => f.id === ownProps.params.id),
  friendNames: getActiveGroupChatFriends(ownProps.params.id, state),
  isLoading: state.chats.isLoadingChats,
})

const mapDispatchToProps = dispatch => ({
  beginChat: id => dispatch(selectActiveChat(id)),
  //beginGroupChat: id => dispatch(selectActiveGroupChat({chatId: id})),
  sendMessage: (content, messageType, chatId, userId) => dispatch(sendPrivateMessage({content, messageType, chatId, userId})),
  clearChatHistory: (chatId, friendId) => {
    dispatch(deleteChatHistory({chatId, friendId}))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)
