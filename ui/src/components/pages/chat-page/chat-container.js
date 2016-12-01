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
    const socket = io(API_URL)
    
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

    
    // socket.on('new_message', data => this.setState({
    //   messages: [...this.state.messages, data]
    // }))

    this.setState({
      socket,
    })
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps')
    // const { id }  = nextProps.params.id
    // this.state.socket.emit('private_conversation', {
    //   id,
    // })

    // this.state.socket.on('private_conversation_start', data => {
    //   console.log(data)

    //   this.setState({
    //     chatId: data.chatId,
    //   })

    // })

    // this.state.socket.on('new_message', data => this.setState({
    //   messages: [...this.state.messages, data]
    // }))
  }

  sendMessage = (e) => {
    console.log("SEND MESSAGE")
    e.preventDefault()
    e.stopPropagation()
    console.log(this.state.message)
    console.log(this.props.params.id)
    console.log(this.state)
    this.state.socket.emit('new_message', {
      content: this.state.message,
      userId: this.props.id,
      chatId: this.state.chatId,
      randomShit: 'Fuck OFF BITCH ASS FUCKING FUCK FUCK'
    })
  }

  render() {
    const {doToggleChatFriend, isNewMessage } = this.props
    
    return (
      <div>
      {this.state.messages.map(m => <p>{m.content}</p>)}
      <ChatDisplayer onChange={this.handleChange} onSubmit={this.sendMessage}/>
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
