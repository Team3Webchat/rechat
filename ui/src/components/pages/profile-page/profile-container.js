import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-mdl'
import ChangePassword from './changePassword'
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
  handleSubmit = e => {
    e.preventDefault()
    const { password, newPassword } = this.state
    const { id } = this.props.user

    this.props.doChangeOfPassword({password, newPassword, id})
  }

  render() {
    const { user } = this.props
    return (
      <Card className='profileCard' shadow={0}>
        <ChangePassword
          user={user}
          flash={this.props.flash}

          newPasswordConfirm={this.state.newPasswordConfirm}
          newPassword={this.state.newPassword}
          password={this.state.password}

          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
      </Card>
    )
  }
}
const mapStateToProps = state => ({
  user: {
    email: state.auth.email,
    id: state.auth.id,
    name: state.auth.name,
  },
  isAuthenticating: state.auth.isAuthenticating,
  flash: state.flash,
})

const mapDispatchToProps = dispatch => ({
  doChangeOfPassword: ({password, newPassword, id}) => {
    dispatch(changePassword({password, newPassword, id}))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
