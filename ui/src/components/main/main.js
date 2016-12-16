import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Header, Navigation, Icon } from 'react-mdl'
import { push } from 'react-router-redux'
import Search from '../search/search'
import DrawerClass from '../drawer/drawer'
import FriendRequestContainer from '../pages/friend-request/friend-container'

import FlashMessage from '../flash-message/flash-message'
import { logout } from '../../lib/actions/authActions'
import { endSearch } from '../../lib/actions/searchActions'

import AdminList from '../pages/Admin-page/Admin-list'

import './style.css'

class Main extends Component {

  constructor(props){
    super(props)
    this.state = {
      showRequests: false,
      showSearch: false,
      searchValue: '',
    }
  }

  componentDidMount() {
    // Just test code for sockets ignore..
  }

  toggleShowRequests = e => {
    const state = {
      showRequests: !this.state.showRequests,
      showSearch: false,
      searchValue: '',
    }
    this.setState(state)
  }
  toggleShowSearch = searchValue => {
    const state = {
      showRequests: false,
      showSearch: !this.state.showSearch,
      searchValue: searchValue,
    }
    this.setState(state)
  }
  onClickOutside = (e) => {
    if(!e.target.parentElement.classList.contains( 'addUser' ) &&
      !e.target.parentElement.classList.contains( 'searchResult' ) &&
      !e.target.parentElement.classList.contains( 'toRequests' )){
      this.props.endSearch()
      this.setState({
        showRequests: false,
        showSearch: false,
        searchValue: '',
      })
    }
  }

  render(){

    const { doLogout, flash, isAdmin } = this.props
    const { showRequests, showSearch, searchValue } = this.state

    console.log(isAdmin)

    return (
      <div>
         <Layout fixedHeader fixedDrawer onClick={this.onClickOutside}>

          <Header title={<div className="title">ReChat</div>}>
             <Navigation>
               <Search toggleShowSearch={this.toggleShowSearch} showSearch={showSearch} searchValue={searchValue}/>
               <FriendRequestContainer toggleShowRequests={this.toggleShowRequests} showRequests={showRequests}/>
               <Icon name="exit_to_app" className='navIcon' onClick={doLogout}/>
            </Navigation>
          </Header>

          <DrawerClass name={this.props.name}/>
          <main className="mdl-layout__content main">
          { flash.message &&
            <FlashMessage
            message={flash.message}
            type={flash.type}
            inline={false}
            />
          }

          {this.props.children ?
            this.props.children
            :
            isAdmin ?
              <AdminList/>
            :
            <p className='nothing'>Search for friends and start a conversation</p>
          }
          </main>
        </Layout>
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
  isAdmin: state.auth.isAdmin,
})

const mapDispatchToProps = dispatch => ({
  doLogout: (message) => {
    dispatch(logout({
      flash: {
        message: 'We hope to see you again!',
        type: 'success',
      },
    }))
    dispatch(push('/sign-in'))
  },
  endSearch: () => dispatch(endSearch()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
