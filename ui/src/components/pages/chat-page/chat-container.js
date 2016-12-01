import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { } from 'react-mdl'
import io from 'socket.io-client'
import ChatDisplayer from './chatdisplayer'
import ComposeNewMessage from './compose-new-message'
import { API_URL } from '../../../lib/config'

class ChatContainer extends Component {

  constructor() {
    super()
    this.state = {
      friendId: null,
      socket: null,
      chatId: null,
      messageInputVale: null,
      messages: [],
    }
  }

  handleChange = (e) => {
    this.setState({
      message: e.target.value,
    })
  }

  componentDidMount() {
    console.log("CHat contianer mounted")
    const socket = io('apirechat.herokuapp.com')
    
    socket.on('connect', () => {
      socket.emit('authenticate', {token: this.props.token })
      .on('authenticated', () => {
        console.log('authenticated')
        socket.emit('private_conversation', {
          id: this.props.params.id,
        })
        socket.on('private_conversation_start', data => {

          this.setState({
            chatId: data.chatId,
          })
        })
        socket.on('new_message', data => this.setState({
          messages: [...this.state.messages, data],
        }))
      })
      .on('unauthorized', msg => {
        console.error(msg)
      })
    })

    


    this.setState({
      socket,
    })
  }


  sendMessage = (e) => {

    e.preventDefault()
    e.stopPropagation()

    const { message } = this.state
    this.setState({
      message: '',
    })

    this.state.socket.emit('new_message', {
      content: message,
      userId: this.props.id,
      chatId: this.state.chatId,
    })
    
  }

  render() {
    const {doToggleChatFriend, isNewMessage } = this.props
    
    return (
      <div>
      
      <ChatDisplayer 
        onChange={this.handleChange} 
        onSubmit={this.sendMessage} 
        messages={this.state.messages}
        id={this.props.id}
        message={this.state.message}
      />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isNewMessage: state.menuDrawer.isEditing,
  token: state.auth.token,
  id: state.auth.id,
})

const mapDispatchToProps = dispatch => ({
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)
