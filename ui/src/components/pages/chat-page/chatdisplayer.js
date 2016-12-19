import React, { Component } from 'react'
import {  Card, CardActions, Button, Textfield, IconButton, CardMenu, CardTitle, CardText, Tooltip, Icon } from 'react-mdl'
import { Link } from 'react-router'
import Gravatar from 'react-gravatar'
import ComposeNewMessage from './compose-new-message'

import './style.css'
import './../style-card-common.css'

class ChatDisplayer extends Component {

  componentDidUpdate() {
    this.messageField.scrollTop = this.messageField.scrollHeight
  }

  render () {
    const { onChange, onSubmit, messages, id, message, friendsName, deleteChatConfirm } = this.props
    let type

    return (
      <Card shadow={0}>
        <CardTitle className="cardTitle">
          <Gravatar size={40} email="rebecca@awesome.com" />
          <p>{friendsName}</p>
        </CardTitle>
        <CardMenu className="cardMenu">
          <IconButton name="delete_forever"  onClick={deleteChatConfirm} className="iconButton"/>
          <Link to={'/'}>
              <IconButton name="close" className="iconButton"/>
          </Link>
        </CardMenu>
        <CardText className="cardText">

              <div className='messageField' ref={(ref) => this.messageField = ref }>
                {messages.map((m, i) =>
                  id === m.userId ?
                  <ComposeNewMessage type='me' message={m.content} key={i} /> :
                  <div key={i}>
                    {m.userId === 'system' ?
                    <ComposeNewMessage type='system' message={m.content} />
                    :
                    <ComposeNewMessage type='friend' message={m.content} />
                    }
                  </div>
                )}
              </div>

        </CardText>
        <div className='textBox'>
          <form onSubmit={onSubmit} autoComplete="off">
            <Textfield 
              className='textInput'
              onChange={onChange}
              label="Write your message..."
              value={message}
              maxLength="255"
            />
            
            <CardActions className='send'>
              <Tooltip label="Upload a photo.">
                <Button className="mdl-button--icon">
                  <Icon name="insert_photo"/>
                  <input 
                    type="file" 
                    id="upload-file" 
                    accept=".jpg,.gif,.png,.svg"
                  />
                </Button>
              </Tooltip>
              <Tooltip label="Upload a file (non photo).">
                <Button className="mdl-button--icon">
                  <Icon name="attachment"/>
                  <input 
                    type="file" 
                    id="upload-file" 
                    accept=".pdf,.txt"
                  />
                </Button>
              </Tooltip>
              <Button
                className="sendButton"
                raised colored 
                type="submit"
                disabled={message.length === 0}
                >Send
              </Button>
            </CardActions>
          </form>
        </div>
        <p className="hintText">Maximum number of characters is 255.</p>
      </Card>
    )
  }
}

export default ChatDisplayer
