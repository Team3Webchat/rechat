import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, Grid, Cell, Icon, Button, CardTitle, CardMenu, CardText, IconButton} from 'react-mdl'
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
      deleteFriend: null,
    }
  }

  //DELETE FREIND CONFIRM
  handleDeleteFriendConfirm = friend =>  {
    this.setState({
      openFriendDialog: true,
      deleteFriend: friend,
    })
  }

  handleCloseFriendConfirm = () =>  {
    this.setState({
      openFriendDialog: false,
      deleteFriend: null,
    })
  }

  handleDeleteFriend = (id) =>  {
    this.props.doDeleteFriend(id)
    this.handleCloseFriendConfirm()
  }
  //END - DELETE FREIND CONFIRM

  removeFriend = key => {
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

  render() {
    const { user } = this.props
    const { id } = this.props.params
    const { openFriendDialog } = this.state

    return (
      <Card className="profileCard" shadow={0}>
        <Gravatar email='rebecca@awesome.com' size={130}/>
        <CardTitle className='cardTitle'>
          <h3> Rebecca Fransson</h3>
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
          <div className='value'><p>rebecca@awesome.com</p></div>
        </CardText>  
        <CardActions border>
          <Button className='buttons' onClick={this.handleDeleteFriendConfirm}>Remove friend</Button>
          <div>
            { openFriendDialog &&
              <DeleteFriendConfirm
              friend={this.state.deleteFriend}
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

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  doDeleteFriend: (id) => dispatch(deleteFriend(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
