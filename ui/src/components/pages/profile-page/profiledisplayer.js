import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardMenu, CardText, IconButton, CardActions, Button, Tooltip } from 'react-mdl'
import { Link } from 'react-router'
import Gravatar from 'react-gravatar'

import { deleteAccount } from '../../../lib/actions/userActions'
import DeleteAccountConfirm from './delete-account-confirm'
import { baseUrl } from '../../../lib/actions/index'
import { getHeaders } from '../../../lib/api'

import './style.css'
import './../style-card-common.css'

class ProfileDisplayer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      timesReported: null,
    }
    this.getTimesReported()
  }

  handleOpenDialog = () => {
    this.setState({
      openDialog: true,
    })
  }

  handleCloseDialog = () => {
    this.setState({
      openDialog: false,
    })
  }

  handleDeleteAccount = (id) =>  {
    this.props.doDeleteAccount(id)
    this.handleCloseDialog()
  }

  async getTimesReported(){
    try {
      const res = await fetch(baseUrl + 'users/'+this.props.user.id+'/report', {
        method: 'GET',
        headers: getHeaders(),
      })
      const json = await res.json()
      if (json.message)
        throw json.message
      this.setState({
        timesReported: json.reports.length,
      })
    }catch(e) {
      this.setState({
        timesReported: 'Could not get data',
      })
    }
  }
  render(){
    const { email, name } = this.props.user
    const { user} = this.props
    //const timesReported = await this.getTimesReported()
    const { openDialog, timesReported } = this.state
    return (
      <Card className='profileCard' shadow={0}>
        <Gravatar email={email} size={130}/>
        <CardTitle className="cardTitle">
          <h3>{name}</h3>
        </CardTitle>
        <CardMenu className="cardMenu">
          <Link to={`/me/edit`}>
            <Tooltip label="Edit your password.">
              <IconButton name="mode_edit" className="iconButton" />
            </Tooltip>
          </Link>
          <Link to={`/`}>
            <Tooltip label="Close">
              <IconButton name="close" className="iconButton"/>
            </Tooltip>
          </Link>
        </CardMenu>
        <CardText className='info'>
          <div className="info-row">
            <div className='key'><p>E-mail</p></div>
            <div className='value'><p>{email}</p></div>
          </div>
          <div className="info-row">
            <div className='key'><p>Times reported</p></div>
            <div className='value'><p>{timesReported}</p></div>
          </div>
        </CardText>
        <CardActions border>
          <Button className='buttons' onClick={this.handleOpenDialog}>Delete my Account</Button>
        </CardActions>

        <div>
          { openDialog &&
            <DeleteAccountConfirm
              user={user}
              openAccountDialog={this.state.openDialog}
              handleCloseAccountDialog={this.handleCloseDialog}
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
  doDeleteAccount: (id) => dispatch(deleteAccount(id)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDisplayer)
