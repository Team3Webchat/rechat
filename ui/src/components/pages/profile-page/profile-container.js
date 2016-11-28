import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner } from 'react-mdl'
import ProfileDisplayer from './profiledisplayer'

import { toggleProfile } from '../../../lib/actions/menuDrawerActions'


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
    const { user, doToggleProfile } = this.props
    return (
      <div>
        <ProfileDisplayer user={user} doToggleProfile={doToggleProfile}/>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: {
    email: state.auth.email,
    name: state.auth.name,
  },
})

const mapDispatchToProps = dispatch => ({
  doToggleProfile: () => dispatch(toggleProfile()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
