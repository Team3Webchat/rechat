import React, { Component } from 'react'
import { connect } from 'react-redux'

import { baseUrl } from '../../../../lib/actions/index'
import { getHeaders } from '../../../../lib/api'

import ProfileDisplayer from './friend-profile-page'
import DeleteFriendConfirm from './delete-friend-confirm'
import ReportFriendConfirm from './report-friend-confirm'

import { deleteFriend, sendFriendRequest, reportFriend } from '../../../../lib/actions/friendsActions'


import './../../style-card-common.css'

class ProfileContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openFriendDialog: false,
      friend: null,
      reportDetails:'',
    }
  }
  //DELETE FRIEND CONFIRM
  handleDeleteFriendConfirm = friend =>  {
    this.setState({
      openFriendDialog: true,
    })
  }
  //REPORT FRIEND CONFIRM
  handleReportFriendConfirm = friend =>  {
    this.setState({
      openReportDialog: true,
    })
  }
  handleCloseConfirms = () =>  {
    this.setState({
      openReportDialog: false,
      openFriendDialog: false,
    })
  }

  handleReportFriend = (id) =>  {
    const { reportDetails } = this.state
    this.props.doReportFriend(id, reportDetails)
    this.handleCloseConfirms()
    this.setState({
      reportDetails: '',
    })
  }
  handleDeleteFriend = (id) =>  {
    this.props.doDeleteFriend(id)
    this.handleCloseConfirms()
  }

  handleChange = e => {
    this.setState({
      reportDetails: e.target.value,
    })
  }


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
      this.getUser(id)
    }
  }

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
    const { openFriendDialog, openReportDialog, friend } = this.state
    return (
      <div>
      {friend != null &&
        <ProfileDisplayer
          friend={friend}
          handleDeleteFriendConfirm={this.handleDeleteFriendConfirm}
          handleReportFriendConfirm={this.handleReportFriendConfirm}
          addFriend={this.props.doAddFriend}
        />
      }
      { openFriendDialog &&
        <DeleteFriendConfirm
          friend={friend}
          openFriendDialog={openFriendDialog}
          handleCloseFriendDialog={this.handleCloseConfirms}
          handleDeleteFriend={this.handleDeleteFriend}
        />
      }
      { openReportDialog &&
        <ReportFriendConfirm
          onChange={this.handleChange}
          friend={friend}
          openReportDialog={openReportDialog}
          handleCloseReportDialog={this.handleCloseConfirms}
          handleReportFriend={this.handleReportFriend}
          reportDetails={this.state.reportDetails}
        />
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
  doReportFriend: (id, reportDetails) => dispatch(reportFriend(id,reportDetails)),
  doAddFriend: id => dispatch(sendFriendRequest(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
