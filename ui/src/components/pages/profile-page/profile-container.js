import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-mdl'
import ChangePassword from './changePassword'
import { changePassword } from '../../../lib/actions/passwordAction'
import { deleteAccount } from '../../../lib/actions/userActions'
import DeleteAccountConfirm from './delete-account-confirm'

class ProfileContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      password: '',
      newPasswordConfirm: '',
      newPassword: '',
      isAuthenticating: false,
      openAccountDialog: false,
    }
  }

  //DELETE ACCOUNT CONFIRM
  handleDeleteAccountConfirm = user =>  {
    this.setState({
      openAccountDialog: true,
    })
  }

  handleCloseAccountConfirm = () =>  {
    this.setState({
      openAccountDialog: false,
    })
  }

  handleDeleteAccount = (id) =>  {
    this.props.doDeleteAccount(id)
    this.handleCloseAccountConfirm()
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
    const { openAccountDialog } = this.state
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

        <div>
        { openAccountDialog &&
          <DeleteAccountConfirm
            user={user}
            openAccountDialog={openAccountDialog}
            handleCloseAccountDialog={this.handleCloseAccountConfirm}
            handleDeleteAccount={this.handleDeleteAccount}
          />
        }
        </div>

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
  doDeleteAccount: (id) => dispatch(deleteAccount(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
