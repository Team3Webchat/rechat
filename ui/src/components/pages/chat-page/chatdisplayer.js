import React, { PropTypes, Component } from 'react'
import {  Card, Grid, Cell, CardActions, Button, Icon, Textfield } from 'react-mdl'
import { Link } from 'react-router'
import Gravatar from 'react-gravatar'
import ComposeNewMessage from './compose-new-message'

import './style.css'

const ChatDisplayer = ({ onChange, onSubmit, messages, id, message, friendsName, deleteChatConfirm }) => {

  return (
    <Card shadow={0} className='card'>
      <Grid className='grid'>
        <Cell col={12} className='toField'>
          <div>
            <Gravatar size={40} email="rebecca@awesome.com" />
            <p>{friendsName}</p>
            <Link to={`/`}>
              <Icon name="close" className="iconButton"/>
            </Link>
            <Icon name="delete" className="iconButton" onClick={deleteChatConfirm}/>
          </div>
        </Cell>
      </Grid>
      <Grid className='grid'>
        <Cell col={12} className='messageField'>
          <div>
            {messages.map((m, i) => 
              id === m.userId ? 
              <ComposeNewMessage type='me' message={m.content} key={i} /> :
              <ComposeNewMessage type='friend' message={m.content} key={i}/>  
            )}
          </div>
        </Cell>
      </Grid>
      <Grid className='grid'>
        <Cell col={12} className='writeField'>
          <div>
            <div className='textBox'>
            <form onSubmit={onSubmit} autoComplete="off">
              <Textfield className='textInput'
                onChange={onChange}
                label="Write your message..."
                value={message}
                
              />
              <CardActions className='send'>
                <Button raised colored type="submit">Send
                </Button>
               </CardActions>
              </form>
            </div>
          </div>
        </Cell>
      </Grid>
    </Card>
  )
}

export default ChatDisplayer
