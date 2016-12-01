import React, { PropTypes, Component } from 'react'
import {  Card, Grid, Cell, CardActions, Button, Icon, Textfield } from 'react-mdl'
import { Link } from 'react-router'
import Gravatar from 'react-gravatar'
import ComposeNewMessage from './compose-new-message'

import './style.css'

const ChatDisplayer = ({ onChange, onSubmit }) => {
  return (
    <Card className='card'
      shadow={0}>
      <Grid className='grid'>

        <Cell col={12} className='toField'>
          <div className='padding'>
            <Gravatar size={40} email="rebecca@awesome.com" />
            <p>Rebecca Fransson</p>
            <Link to={`/`}>
              <Icon name="close"/>
            </Link>
          </div>
        </Cell>
      </Grid>
      <Grid className='grid'>
        <Cell col={12} className='messageField'>
          <div className='padding'>
            <ComposeNewMessage type='friend' message='Hi! how are u?'/>
            <ComposeNewMessage type='me' message='Fine thanks!!!'/>
            <ComposeNewMessage type='friend' message='skjerfbkawjeb wsekrhf wlosje wskjefrnklj nelkn lne ljfewnl clskdh lnelkn '/>
            <ComposeNewMessage type='friend' message='Sorry, my cat ran over my keyboard... haha lol'/>
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
