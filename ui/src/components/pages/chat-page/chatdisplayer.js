import React, { PropTypes, Component } from 'react'
import {  Card, Grid, Cell, CardActions, Button, Icon, Textfield } from 'react-mdl'

import './style.css'

const ChatDisplayer = ({ onChange, onSubmit }) => {
  //console.log(props.user)

  
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
            <form onSubmit={onSubmit}>
              <Textfield className='textInput'
                onChange={onChange}
                label="Write your message..."
                rows={4}
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