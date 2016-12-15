import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Tab, Tabs} from 'react-mdl'

import { baseUrl } from '../../../lib/actions/index'
import { getHeaders } from '../../../lib/api'

import FlashMessage from '../../flash-message/flash-message'

import ReportList from './reported-list'
import BannedList from './banned-list'

import './style.css'


class AdminList extends Component {

  constructor(props){
    super(props)
    this.state = {
      reportedUsers: null,
      bannedUsers: null,
      activeTab: 2,
    }
  }

  async getBannedUsers(){
    try {
      const res = await fetch(baseUrl + '/users/banned', {
        method: 'GET',
        headers: getHeaders(),
      })
      const json = await res.json()
      if (json.message)
        throw json.message
      return json.bannedUsers
    }catch(e) {
      //create flash message
      console.log('wrong in Admin main getAdminProps')
    }
  }

  async getReportedUsers(){
    try {
      const res = await fetch(baseUrl + '/users/reported', {
        method: 'GET',
        headers: getHeaders(),
      })
      const json = await res.json()
      if (json.message)
        throw json.message
      return json.users
    }catch(e) {
      //create flash message
      console.log('wrong in Admin main getAdminProps')
    }
  }

  async banUser(id){
    try {
      const res = await fetch(baseUrl + 'users/'+id+'/ban', {
        method: 'POST',
        headers: getHeaders(),
      })
      const json = await res.json()
      if (json.message)
        throw json.message
    }catch(e) {
      //create flash message
      console.log('wrong in Admin main getAdminProps')
    }
  }

  async unBanUser(id){
    try {
      const res = await fetch(baseUrl + 'users/'+id+'/unBan', {
        method: 'POST',
        headers: getHeaders(),
      })
      const json = await res.json()
      if (json.message)
        throw json.message

    }catch(e) {
      //create flash message
      console.log(e)
    }
  }

  async componentWillMount(){
    const banned = await this.getBannedUsers()
    const reported = await this.getReportedUsers()
    this.setState({
      reportedUsers: reported,
      bannedUsers: banned,
      activeTab: this.state.activeTab,
    })
    console.log(this.state)
  }

  render(){
    const { reportedUsers, bannedUsers, activeTab } = this.state
    return (
      <div className="tabs">
        <Tabs activeTab={activeTab}
        onChange={(tabId) => this.setState({ activeTab: tabId })}
        ripple>
            <Tab className="reported">Reported Users</Tab>
            <Tab className="banned">Banned Users</Tab>
        </Tabs>
        <section>
            <div className="content">
            { activeTab === 0 &&
              <ReportList
                users={reportedUsers}
                banUser={this.banUser}
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

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminList)
