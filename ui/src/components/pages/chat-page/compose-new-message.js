import React from 'react'
import {  Card } from 'react-mdl'
import './new-message-style.css'

const ComposeNewMessage = (props) => {

  //const { email } = props.user
  const { type, message } = props
  // just a hack for checking if the message is a link to the bucket
  // needs to be checked with message-type later from the db!
  const isLink = message.match('https://rechat-bucket.s3.eu-west-2.amazonaws.com') 
  const className = `message ${type}`

//Måste ha card två gånger annars hamnar arrows itne rätt :)
  return (
    <div className="newMessage">
    {type === 'me' ?
    <div>
    <div className="arrow-right">
    </div>
      <Card shadow={0} className={className}>
        {isLink ? <a href={message}>{message}</a> : message}
 
      </Card>

    </div>
      :
      <div>
        <Card shadow={0} className={className}>
          {isLink ? <a href={message}>{message}</a> : message}
        </Card>
        <div className="arrow-left">
        </div>
      </div>
    }
    </div>
  )
}

export default ComposeNewMessage
