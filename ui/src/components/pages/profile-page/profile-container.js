import React, { PropTypes, Component } from 'react'
import { Textfield, Button, Spinner } from 'react-mdl'
import ProvileDisplayer from './profiledisplayer'


const user = {
  email: 'test@test.com',
  firstname: 'Hampus',
  lastname: 'tester',
}
class ProfileContainer extends Component {
  constructor(props){
    super(props)

    this.state={
      user,
    }
  }

  render() {
    return (
      <div>
        <ProvileDisplayer user={this.state.user}/>
      </div>
    )
  }
}



export default ProfileContainer
