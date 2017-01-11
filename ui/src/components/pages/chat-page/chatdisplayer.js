import React, { Component } from 'react'
import {  Card, CardActions, Button, Textfield, IconButton, CardMenu, CardTitle, CardText, Tooltip, Icon } from 'react-mdl'
import { Link } from 'react-router'
import Dropzone from 'react-dropzone'
import Gravatar from 'react-gravatar'
import ComposeNewMessage from './compose-new-message'

import './style.css'
import './../style-card-common.css'

class ChatDisplayer extends Component {

  componentDidUpdate() {
    this.messageField.scrollTop = this.messageField.scrollHeight
  }

  render () {
    const {
      onChange,
      onSubmit,
      messages,
      id,
      message,
      friendsName,
      deleteChatConfirm,
      AddNewFriendToChat,
      onDrop,
      uploadedFile
    } = this.props
    let type

    return (
      <Card shadow={0} className='chatCard'>
        <CardTitle className="cardTitle">
          <Gravatar size={40} email="rebecca@awesome.com" />
          <p>{friendsName}</p>
        </CardTitle>
        <CardMenu className="cardMenu">
        {AddNewFriendToChat &&
          <Tooltip label="Add a friend to the conversation">
            <IconButton name="add_friend"  onClick={AddNewFriendToChat} className="iconButton"/>
          </Tooltip>
        }
          <Tooltip label="Delete conversation.">
            <IconButton name="delete_forever"  onClick={deleteChatConfirm} className="iconButton"/>
          </Tooltip>
          <Link to={'/'}>
            <Tooltip label="Close">
              <IconButton name="close" className="iconButton"/>
            </Tooltip>
          </Link>
        </CardMenu>
        <CardText className="cardText">
              <div className='messageField' ref={(ref) => this.messageField = ref }>
                {messages.map((m, i) =>
                  id === m.userId ?
                  <ComposeNewMessage person='me' message={m.content} key={i} />
                  :
                  <div key={i}>
                    <ComposeNewMessage person='friend' message={m.content} />
                  </div>
                )}
              </div>
        </CardText>
        <div className='textBox'>
          <form onSubmit={onSubmit} autoComplete="off">  <Textfield
              className='textInput'
              onChange={onChange}
              label="Write your message..."
              value={message}
              maxLength="255"
            />
            <Dropzone
              onDrop={onDrop}
              multiple={false}
              accept='image/png,image/jpg,image/jpeg,application/pdf,text/*,'
              className="dropzone"
            >
              <div>
                <div className="dropText"> Drop a file here, or click to upload.</div>
                {uploadedFile &&
                  <div>
                    <div>{uploadedFile.type==='image/png' || uploadedFile.type==='image/jpg' || uploadedFile.type==='image/jpeg'
                      ?
                      <div className="dropDisplay">
                        <img className="dropImage" src={uploadedFile.preview} />
                        <p>{uploadedFile.name}</p>
                      </div>
                      :
                      <div className="dropDisplay">
                        <p>{uploadedFile.name}</p>
                      </div>}
                    </div>
                  </div>
                }
              </div>
            </Dropzone>
            <CardActions className='send'>
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
