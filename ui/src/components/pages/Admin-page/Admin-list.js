import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Tab, HeaderTabs} from 'react-mdl'

import { baseUrl } from '../../../lib/actions/index'
import { getHeaders } from '../../../lib/api'
import { banUser, unbanUser, banUserFailure} from '../../../lib/actions/adminActions'

import ReportList from './reported-list'
import BannedList from './banned-list'

import './style.css'


class AdminList extends Component {

  constructor(props){
    super(props)
    this.state = {
      reportedUsers: null,
      bannedUsers: null,
      activeTab: 0,
    }
  }

  async getBannedUsers(){
    try {
      const res = await fetch(baseUrl + 'users/banned', {
        method: 'GET',
        headers: getHeaders(),
      })
      const json = await res.json()
      if (json.message)
        throw json.message
      return json.bannedUsers
    }catch(e) {
      this.props.doWriteFlashMessage(e)
    }
  }

  async getReportedUsers(){
    try {
      const res = await fetch(baseUrl + 'users/reported', {
        method: 'GET',
        headers: getHeaders(),
      })
      const json = await res.json()
      if (json.message)
        throw json.message
      return json.users
    }catch(e) {
      this.props.doWriteFlashMessage(e)
    }
  }

  banTheUser = (id) =>{
    this.props.doBanUser(id)
  }

  unBanUser = (id) =>{
    this.props.doUnbanUser(id)
  }
  async updateState(){
    const banned = await this.getBannedUsers()
    const reported = await this.getReportedUsers()
    this.setState({
      reportedUsers: reported,
      bannedUsers: banned,
      activeTab: this.state.activeTab,
    })
  }
  componentWillMount(){
    this.updateState()
  }

  render(){
    const { reportedUsers, bannedUsers, activeTab } = this.state
    return (
      <div className="tabs">
        <HeaderTabs activeTab={activeTab}
        onChange={(tabId) => this.setState({ activeTab: tabId })}
        ripple>
            <Tab className="admin-tab">Reported Users</Tab>
            <Tab className="admin-tab">Banned Users</Tab>
        </HeaderTabs>
        <section>
            <div className="content">
            { activeTab === 0 &&
              <ReportList
                users={reportedUsers}
                banTheUser={this.banTheUser}
                />
            }
            { activeTab === 1 &&
              <BannedList
                users={bannedUsers}
                unBanUser={this.unBanUser}
                />
            }
            </div>
        </section>

        </div>
    )
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  id: state.auth.id,
  email: state.auth.email,
  flash: state.flash,
  friendRequests: state.friends.friendRequests,
  token: state.auth.token,
  nowActiveTab: state.activeTab,
})

const mapDispatchToProps = dispatch => ({
  doBanUser: (id) => dispatch(banUser(id)),
  doUnbanUser: (id) => dispatch(unbanUser(id)),
  doWriteFlashMessage: (m) => dispatch(banUserFailure(m)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminList)
