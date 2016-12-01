import React, { PropTypes, Component } from 'react'
import {  Card, Grid, Cell, CardActions, Button, Icon, Textfield } from 'react-mdl'
import './new-message-style.css'

const ComposeNewMessage = (props) => {
  console.log(props.user)
  //const { email } = props.user
  const { type, message } = props
  const className = `message ${type}`

//Måste ha card två gånger annars hamnar arrows itne rätt :)
  return (
    <div className="newMessage">
    {type === 'me' ?
    <div>
    <div className="arrow-right">
    </div>
      <Card shadow={0} className={className}>
        {message}
      </Card>

    </div>
      :
      <div>
        <Card shadow={0} className={className}>
          {message}
        </Card>
        <div className="arrow-left">
        </div>
      </div>
    }
    </div>
  )
}

export default ComposeNewMessage
