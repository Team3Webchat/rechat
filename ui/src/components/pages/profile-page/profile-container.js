import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner } from 'react-mdl'
import ProfileDisplayer from './profiledisplayer'
import ChangePassword from './changePassword'
import { toggleProfile, editProfile } from '../../../lib/actions/menuDrawerActions'



class ProfileContainer extends Component {
  render() {
    const { user, doToggleProfile, doToggleEdit, isEditing } = this.props
    return (
      <div>
      { isEditing ?
        <ChangePassword user={user} doToggleProfile={doToggleProfile}  />
        :
        <ProfileDisplayer user={user} doToggleEdit={doToggleEdit} doToggleProfile={doToggleProfile}/>
      }

      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: {
    email: state.auth.email,
    name: state.auth.name,
  },
  isEditing: state.menuDrawer.isEditing,
})

const mapDispatchToProps = dispatch => ({
  doToggleProfile: () => dispatch(toggleProfile()),
  doToggleEdit: () => dispatch(editProfile()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
