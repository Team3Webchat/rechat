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
    alert("test test")
    e.preventDefault()
    const { password, newPasswordConfirm } = this.state
    if (password !== newPasswordConfirm) {
      return this.setState({
        message: 'The password and the password confirmation does not match',
      })
    }

    this.props.doChangesToProfile({password, newPasswordConfirm})

  }

  render() {
    console.log(this.state.password)
    const { user, doToggleProfile, doToggleEdit, isEditing } = this.props
    
    return (
      <div>
      { isEditing ?
        <ChangePassword 
          user={user} 
          doChangesToProfile={this.props.doChangesToProfile}
          isAuthenticating={this.state.isAuthenticating}
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
    name: state.auth.name,
    firstname: state.firstname,
    lastname: state.lastname,
    password: state.password,
  },
  isAuthenticating: state.auth.isAuthenticating,
  flash: state.flash,
  isEditing: state.menuDrawer.isEditing,
})

const mapDispatchToProps = dispatch => ({
  doToggleProfile: () => dispatch(toggleProfile()),
  doToggleEdit: () => dispatch(editProfile()),
  doChangesToProfile: ({password, newPasswordConfirm}) => {
    console.log("hejhejehehjejhehehehehehhehehehe")
    dispatch(changePassword({password, newPasswordConfirm}))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
