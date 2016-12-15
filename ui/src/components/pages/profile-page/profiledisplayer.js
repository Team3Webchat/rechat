import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardMenu, CardText, IconButton, CardActions, Button } from 'react-mdl'
import { Link } from 'react-router'
import Gravatar from 'react-gravatar'
import { deleteAccount } from '../../../lib/actions/userActions'
import DeleteAccountConfirm from './delete-account-confirm'

import './style.css'
import './../style-card-common.css'

//const ProfileDisplayer = (props) => {
class ProfileDisplayer extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  handleDeleteAccount = (id) =>  {
    this.props.doDeleteAccount(id)
    this.handleCloseConfirms()
  }

  render(){
    const { email, name } = this.props.user
    const { user} = this.props
    const { openDialog } = this.state
    return (     
      <Card className='profileCard' shadow={0}>
        <Gravatar email={email} size={130}/>
        <CardTitle className="cardTitle">
          <h3>{name}</h3>
        </CardTitle>
        <CardMenu className="cardMenu">
          <Link to={`/me/edit`}>
            <IconButton name="mode_edit" className="iconButton" />
          </Link>
          <Link to={`/`}>
            <IconButton name="close" className="iconButton"/>
          </Link>
        </CardMenu>
        <CardText className='info'>
          <div className="info-row">
            <div className='key'><p>E-mail</p></div>
            <div className='value'><p>{email}</p></div>
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
/*
<Card className='profileCard' shadow={0} >
</Card>
*/
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
