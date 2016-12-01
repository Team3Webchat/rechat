import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { } from 'react-mdl'
import ChatDisplayer from './chatdisplayer'
import ComposeNewMessage from './compose-new-message'
import { toggleChatFriend, composeNewMessage } from '../../../lib/actions/menuDrawerActions'

class ChatContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    const {doToggleChatFriend, isNewMessage } = this.props
    
    return (
    
      <div>
      { isNewMessage ?
        <ComposeNewMessage 
            
        />
        :
       <ChatDisplayer doToggleChatFriend={doToggleChatFriend}/>
      }

      </div>
    )
  }
}

const mapStateToProps = state => ({
  isNewMessage: state.menuDrawer.isEditing,
})

const mapDispatchToProps = dispatch => ({
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)
