import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Tab, Tabs, List, ListItem } from 'react-mdl'

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
      users: null,
      activeTab: 2,
    }
  }

  async getAdminProps(){
    try {
      const res = await fetch(baseUrl + '/users/reported', {
        method: 'GET',
        headers: getHeaders(),
      })
      const json = await res.json()
      console.log(json)
      return json
    }catch(e) {
      console.log('wrong in Admin main getAdminProps')
    }
  }

  async componentWillMount(){
    const { getAdminProps } = this
    const { users } = await getAdminProps()
    this.setState({users})
    console.log(this.state)
    //kalla på get adrmin
    //sätt dem till state
  }

  render(){
    const { users, activeTab } = this.state
    console.log(users)
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
              <p> This page you'll see all reported accounts</p>
            }
            { activeTab === 1 &&
              <p> This page you'll see all banned accounts</p>
            }</div>
        </section>

      { activeTab === 0 &&
        <ReportList
          users={this.state.users}
          />
      }
      { activeTab === 1 &&
        users.isBanned &&
        <BannedList
          users={this.state.users}
          />
      }
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