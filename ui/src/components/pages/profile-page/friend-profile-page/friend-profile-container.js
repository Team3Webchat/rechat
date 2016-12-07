import React, { Component } from 'react'
import { connect } from 'react-redux'

import { baseUrl } from '../../../../lib/actions/index'
import { getHeaders } from '../../../../lib/api'

import ProfileDisplayer from './friend-profile-page'
import { deleteFriend, sendFriendRequest } from '../../../../lib/actions/friendsActions'

import './../../style-card-common.css'

class ProfileContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openFriendDialog: false,
      friend: null,
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

  async getUser(id){
    try {
      const res = await fetch(baseUrl + 'users/' + id, {
        method: 'GET',
        headers: getHeaders(),
      })

      const json = await res.json()
      this.setState({
        friend: json,
      })

    }catch(e) {
      //TODO: retunera felmeddelande NOT DONE YET
    }
  }
  setUserToState = () => {
    const { friend } = this.props
    const { id } = this.props.params
    if(friend !== undefined){
      friend.friendsSince = this.getWholeDate()
      friend.isFriends = true
      this.setState({
        friend: friend,
      })
    }else{
      //set to localstate
      this.getUser(id)
    }
  }

//Hittar ni någon bättre lösnign så säg till
  componentDidUpdate(prevProps, prevState){
    if(this.state.friend == null){
      this.setUserToState()
    }else if(prevState.friend.id !== this.props.params.id){
      this.setUserToState()
    }
  }
  componentWillReceiveProps(nextProps) {

    if (this.props.isAuthenticating !== nextProps.isAuthenticating)
      this.setState({
        isAuthenticating: !this.state.isAuthenticating,
      })
  }

  render() {
    //const { email, fristname, lastname, id } = this.props.friend
    //this.setUserToState()
    const { openFriendDialog, friend } = this.state
    //const FriendsSince = this.getWholeDate()
    return (
      <div>
      {friend != null &&
        <ProfileDisplayer
        friend={friend}
        openFriendDialog={openFriendDialog}
        handleDeleteFriendConfirm={this.handleDeleteFriendConfirm}
        handleCloseFriendConfirm={this.handleCloseFriendConfirm}
        handleDeleteFriend={this.handleDeleteFriend}
        addFriend={this.props.doAddFriend}/>
      }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  friend : state.friends.friends.find(f => f.id === ownProps.params.id),
})

const mapDispatchToProps = dispatch => ({
  doDeleteFriend: (id) => dispatch(deleteFriend(id)),
  doAddFriend: id => dispatch(sendFriendRequest(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
