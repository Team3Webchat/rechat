import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner } from 'react-mdl'
import ProfileDisplayer from './profiledisplayer'
import ChangePassword from './changePassword'
import { toggleProfile, editProfile } from '../../../lib/actions/menuDrawerActions'
import { changePassword } from '../../../lib/actions/passwordAction'


class ProfileContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      password: '',
      newPasswordConfirm: '',
      newPassword: '',
      isAuthenticating: false,
    }
  }

  handleChange = key => {
    return function(e) {
      const state = {}
      state[key] = e.target.value
      this.setState(state)
    }.bind(this)
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.isAuthenticating !== nextProps.isAuthenticating)
      this.setState({
        isAuthenticating: !this.state.isAuthenticating,
      })
  }

  handleSubmit = e => {
    console.log("HANDLE SUBMUT")
    e.preventDefault()
    const { password, newPassword } = this.state
    const { id } = this.props.user
    console.log(this.state)
    console.log(password, newPassword)
    this.props.doChangeOfPassword({password, newPassword, id})

  }

  render() {
    const { user, doToggleProfile, doToggleEdit, isEditing } = this.props
    
    return (
      <div>
      { isEditing ?
        <ChangePassword 
          user={user}  
          doToggleProfile={doToggleProfile} 

          newPasswordConfirm={this.state.newPasswordConfirm}
          newPassword={this.state.newPassword}
          password={this.state.password}

          onSubmit={this.handleSubmit}  
          flash={this.props.flash}  
          onChange={this.handleChange}/>
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
    id: state.auth.id,
  },
  isAuthenticating: state.auth.isAuthenticating,
  flash: state.flash,
  isEditing: state.menuDrawer.isEditing,
})

const mapDispatchToProps = dispatch => ({
  doToggleProfile: () => dispatch(toggleProfile()),
  doToggleEdit: () => dispatch(editProfile()),
  doChangeOfPassword: ({password, newPassword, id}) => {
    console.log(password, newPassword)
    dispatch(changePassword({password, newPassword, id}))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
