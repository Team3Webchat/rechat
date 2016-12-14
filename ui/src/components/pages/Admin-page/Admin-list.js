import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner, Card, Tab, Tabs } from 'react-mdl'

import FlashMessage from '../../flash-message/flash-message'


class AdminList extends Component {

  constructor(props){
    super(props)
    this.state = {
      showRequests: false,
      showSearch: false,
      searchValue: '',
      activeTabs: 2,
    }
  }
  render(){
    const { onChange, onSubmit, isAuthenticating, 
      firstname, lastname, flash, reports, checkReportMessages, nowActiveTab} = this.props
    //const { email, name } = props.user

    //console.log(email, name)
    return (

      <div className="tabs">
        <Tabs activeTab={this.state.activeTab} 
        onChange={(tabId) => this.setState({ activeTab: tabId })} 
        ripple>
            <Tab>Reported Users</Tab>
            <Tab>Banned Users</Tab>
            <Tab>Messages</Tab>
        </Tabs>
        <section>
            <div className="content">Content for the tab: {this.state.activeTab}</div>
        </section>

      { this.state.activeTab === 0 &&
        <h5>Add Reported Users</h5>
      }
      { this.state.activeTab === 1 &&
        <h5>Add Banned Users</h5>
      }
      { this.state.activeTab === 2 &&
        <h5>Add Messages for reported users</h5>
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

/*
<div className="demo-tabs">
        <Tabs activeTab={nowActiveTab}
        onChange={(tabId) => this.setState({ activeTab: tabId })} 
        ripple>
            <Tab>Reported Users</Tab>
            <Tab>Banned Users</Tab>
            <Tab>Messages</Tab>
        </Tabs>
        <section>
            <div className="content">Content for the tab: {nowActiveTab}</div>
        </section>
    </div>  



//this is for the main.js in main later.
async getAdminProps(id){
    try {
      const res = await fetch(baseUrl + '/admin', {
        method: 'POST',
        body: JSON.stringify({
          adminID: id,
        }),
        headers: getHeaders(),
      })

      const json = await res.json()
    }catch(e) {
      console.log('wrong in Admin main getAdminProps')
      //TODO: retunera felmeddelande NOT DONE YET
    }
  }*/