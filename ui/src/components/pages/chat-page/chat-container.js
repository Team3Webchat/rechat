import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { } from 'react-mdl'
import io from 'socket.io-client'
import ChatDisplayer from './chatdisplayer'
import ComposeNewMessage from './compose-new-message'
import { API_URL } from '../../../lib/config'

import { sendPrivateMessage, selectActiveChat } from '../../../lib/actions/chatActions'
import { getActiveChat } from '../../../lib/reducers/chatsReducer'

class ChatContainer extends Component {

  constructor() {
    super()
    this.state = {
      friendId: null,
      socket: null,
      chatId: null,
      messageInputVale: null,
      messages: [],
      haxx: 'haxx',
    }
  }

  handleChange = (e) => {
    this.setState({
      message: e.target.value,
    })
  }

  componentDidMount() {
    const { friendId, beginChat } = this.props
    beginChat(friendId)
  }


  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
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

    // this.state.socket.emit('new_message', {
    //   content: message,
    //   userId: this.props.id,
    //   chatId: this.state.chatId,
    // })

    
    console.log(message)
    console.log(activeChat.chatId)
    sendMessage(message, activeChat.chatId, id)
    
  }

  render() {
    const {doToggleChatFriend, isNewMessage } = this.props
    console.log(this.props.activeChat)
    const messages = this.props.activeChat ? this.props.activeChat.messages : []

    
    return (
      <div>
      
      <ChatDisplayer 
        onChange={this.handleChange} 
        onSubmit={this.sendMessage} 
        messages={messages}
        id={this.props.id}
        message={this.state.message}
      />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isNewMessage: state.menuDrawer.isEditing,
  token: state.auth.token,
  id: state.auth.id,
  activeChat: getActiveChat(state),
  friendId: ownProps.params.id,
})

const mapDispatchToProps = dispatch => ({
  beginChat: id => dispatch(selectActiveChat({friendId: id})),
  sendMessage: (content, chatId, userId) => {
    console.log(content)
    dispatch(sendPrivateMessage({content, chatId, userId}))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)
