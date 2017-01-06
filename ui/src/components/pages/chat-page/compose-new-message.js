import React from 'react'
import {  Card, IconButton } from 'react-mdl'
import './new-message-style.css'

const ComposeNewMessage = (props) => {

  //const { email } = props.user
  const { person, message, type } = props
  // just a hack for checking if the message is a link to the bucket
  // needs to be checked with message-type later from the db!
  const isLink = message.match('https://rechat-bucket.s3.eu-west-2.amazonaws.com')
  const className = `message ${person} ${type}`
  const filetoken = message.split('/').pop()
  const filename = filetoken.slice(36)
  const filetype3 = filetoken.slice(-3)
  const filetype4 = filetoken.slice(-4)
//Måste ha card två gånger annars hamnar arrows itne rätt :)
  return (
    <div className="newMessage">
      {type === 'me' ?
        <div>
          <div className="arrow-right"></div> 
          <Card shadow={0} className={className}>
            {isLink ? 
              <a href={message}>
                {(filetype3==='png' || filetype3==='jpg' || filetype4==='jpeg' ? 
                  <img className="dropImage" title={filename} alt={filename} src={message} />
                  :
                  <div>
                    <IconButton name="file_download"/>
                    <span>{filename}</span>
                  </div>
                )}
              </a> 
              : message
            }
          </Card>
        </div>   
        :
        <div>
          <div className="arrow-left"></div>
          <Card shadow={0} className={className}>
            {isLink ? 
              <a href={message}>
                {(filetype3==='png' || filetype3==='jpg' || filetype4==='jpeg' ? 
                  <img className="dropImage" title={filename} alt={filename} src={message} />
                  :
                  <div>
                    <IconButton name="file_download"/>
                    <span className="link">{filename}</span>
                  </div>)}
              </a> 
              : message
            }
          </Card>
        </div>
      }
    </div>
  )
}

export default ComposeNewMessage
