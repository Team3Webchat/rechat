import React, { PropTypes, Component } from 'react'
import { Textfield, Button, Spinner } from 'react-mdl'
import ProvileDisplayer from './profiledisplayer'

class ProfileContainer extends Component {


  render() {
    let that = this;
    that.setState( user = {
      email: 'test@test.com',
      firstname: 'Hampus',
      lastname: 'tester',
    })


    return (
      <div>
        <ProvileDisplayer user ={this.state.user}/>
      </div>
    )
  }
}



export default ProfileContainer
