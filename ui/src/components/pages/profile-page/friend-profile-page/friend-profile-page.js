import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, Button, CardTitle, CardMenu, CardText, IconButton} from 'react-mdl'
import { Link } from 'react-router'
import Gravatar from 'react-gravatar'

import DeleteFriendConfirm from './delete-friend-confirm'
import { deleteFriend } from '../../../../lib/actions/friendsActions'

import './../../style-card-common.css'

class ProfileContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openFriendDialog: false,
    }
  }

  //DELETE FREIND CONFIRM
  handleDeleteFriendConfirm = friend =>  {
    this.setState({
      openFriendDialog: true,
    })
  }

  handleCloseFriendConfirm = () =>  {
    this.setState({
      openFriendDialog: false,
    })
  }

  handleDeleteFriend = (id) =>  {
    this.props.doDeleteFriend(id)
    this.handleCloseFriendConfirm()
  }
  //END - DELETE FREIND CONFIRM

  getWholeDate = () => {
    const today = new Date(this.props.friend['friendship.updatedAt'])
    let dd = today.getDate()
    let mm = today.getMonth()+1 //January is 0!
    const yyyy = today.getFullYear()
    if(dd<10) dd='0'+dd
    if(mm<10) mm='0'+mm
    return dd+'-'+mm+'-'+yyyy
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.isAuthenticating !== nextProps.isAuthenticating)
      this.setState({
        isAuthenticating: !this.state.isAuthenticating,
      })
  }

  render() {
    const { email, fristname, lastname, id } = this.props.friend
    const { openFriendDialog } = this.state
    const FriendsSince = this.getWholeDate()

    return (
      <Card className="profileCard" shadow={0}>
        <Gravatar email={email} size={130}/>
        <CardTitle className='cardTitle'>
          <h3>{fristname} {lastname}</h3>
        </CardTitle>
        <CardMenu className='cardMenu'>
          <Link>
            <IconButton name="report" className="iconButton"/>
          </Link>
          <Link to={`/`}>
            <IconButton name="close" className="iconButton"/>
          </Link>
        </CardMenu>
        <CardText className="info">
          <div className='key'><p>E-mail</p></div>
          <div className='value'><p>{email}</p></div>
          <div className='key'><p>Friendes since</p></div>
          <div className='value'><p>{FriendsSince}</p></div>
        </CardText>
        <CardActions border>
          <Button className='buttons' onClick={this.handleDeleteFriendConfirm}>Remove friend</Button>
          <div>
            { openFriendDialog &&
              <DeleteFriendConfirm
              friend={id}
              openFriendDialog={this.state.openFriendDialog}
              handleCloseFriendDialog={this.handleCloseFriendConfirm}
              handleDeleteFriend={this.handleDeleteFriend}/>
            }
          </div>
        </CardActions>

      </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  friend : state.friends.friends.find(f => f.id === ownProps.params.id),
})

const mapDispatchToProps = dispatch => ({
  doDeleteFriend: (id) => dispatch(deleteFriend(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
