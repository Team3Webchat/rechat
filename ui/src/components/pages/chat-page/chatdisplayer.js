import React, { PropTypes, Component } from 'react'
import {  Card, Grid, Cell, CardActions, Button, Icon, Textfield } from 'react-mdl'

import './style.css'

const ChatDisplayer = (props) => {
  //console.log(props.user)
  const { doToggleChatFriend } = props
  
  return (
    <Card className='card'
      shadow={0}>
      <Grid className='grid'>
        <Cell col={12} className='toField'>
          <div className='padding'>
            "To-field" or "profile-img, firstname, lastname"
          </div>
        </Cell>
      </Grid>
      <Grid className='grid'>
        <Cell col={12} className='messageField'>
          <div className='padding'>
            messages
          </div>
        </Cell>
      </Grid>
      <Grid className='grid'>
        <Cell col={12} className='writeField'>
          <div className='padding'>
            <div className='textBox'>
              <Textfield className='textInput'
                onChange={() => {}}
                label="Write your message..."
                rows={4}
              />
              <CardActions className='send'>
                <Button raised colored>Send
                </Button>
               </CardActions>
            </div>
          </div>
        </Cell>
      </Grid>
      
    </Card>
  )
}

export default ChatDisplayer