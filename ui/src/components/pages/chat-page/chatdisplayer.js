import React, { PropTypes, Component } from 'react'
import {  Card, Grid, Cell, CardActions, Button, Icon, Textfield, IconButton, CardMenu, CardTitle, CardText } from 'react-mdl'
import { Link } from 'react-router'
import Gravatar from 'react-gravatar'
import ComposeNewMessage from './compose-new-message'

import './style.css'
import './../style-card-common.css'

const ChatDisplayer = ({ onChange, onSubmit, messages, id, message, friendsName, deleteChatConfirm }) => {

  return (
    <Card shadow={0}>
      <CardTitle className="cardTitle">
        <Gravatar size={40} email="rebecca@awesome.com" />
        <p>{friendsName}</p>
      </CardTitle>
      <CardMenu className="cardMenu">
        <IconButton name="delete"  onClick={deleteChatConfirm} className="iconButton"/>
        <Link to={`/`}>
            <IconButton name="close" className="iconButton"/>
        </Link>
      </CardMenu>
      <CardText className="cardText">
        
            <div className='messageField'>
              {messages.map((m, i) => 
                id === m.userId ? 
                <ComposeNewMessage type='me' message={m.content} key={i} /> :
                <ComposeNewMessage type='friend' message={m.content} key={i}/>  
              )}
            </div>
         
      </CardText>
      <div className='textBox'>
        <form onSubmit={onSubmit}>
          <Textfield className='textInput'
            onChange={onChange}
            label="Write your message..."
            value={message}
          />
          <CardActions className='send'>
            <Button raised colored type="submit">Send</Button>
          </CardActions>
        </form>
      </div>
    </Card>
  )
}

export default ChatDisplayer
