import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Header, Navigation, Grid, Icon } from 'react-mdl'
import { push } from 'react-router-redux'
import Search from '../search/search'
import DrawerClass from '../drawer/drawer'
import ProfileContainer from '../pages/profile-page/profile-container'
import FriendRequestContainer from '../pages/friend-request/friend-container'

import FlashMessage from '../flash-message/flash-message'
import { logout } from '../../lib/actions/authActions'
import { endSearch } from '../../lib/actions/searchActions'

import './style.css'

class Main extends Component {

  constructor(props){
    super(props)
    this.state = {
      showRequests: false,
      showSearch: false,
    }
  }

  toggleShowRequests = e => {
    e.preventDefault()
    this.props.endSearch()
    const state = {
      showRequests: !this.state.showRequests,
      showSearch: false,
    }
    this.setState(state)
  }
  toggleShowSearch = () => {
    const state = {
      showRequests: false,
      showSearch: !this.state.showSearch,
    }
    this.setState(state)
  }
  onClickOutside = (e) => {
    console.log('onClickOutside')
    console.log(e.target.tagName)
    if(e.target.tagName !== 'I'){
      this.props.endSearch()
      const state = {
        showRequests: false,
        showSearch: false,
      }
      this.setState(state)
    }

  }

  render(){
    const { doLogout, flash, toggleProfile } = this.props
    const { showRequests, showSearch } = this.state

    return (
      <div>

       <Layout fixedHeader fixedDrawer onClick={this.onClickOutside}>
          <Header title="ReChat">
             <Navigation>

               <Search toggleShowSearch={this.toggleShowSearch} showSearch={showSearch}/>

               <FriendRequestContainer toggleShowRequests={this.toggleShowRequests} showRequests={showRequests}/>

               <Icon name="exit_to_app" className='navIcon' onClick={doLogout}/>

            </Navigation>
          </Header>

          <DrawerClass name={this.props.name}/>

          <Grid className="main">

            { flash.message &&
              <FlashMessage
              message={flash.message}
              type={flash.type}
              inline
              />
            }
            {toggleProfile &&
              <ProfileContainer/>

            }

          </Grid>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  email: state.auth.email,
  flash: state.flash,
  friendRequests: state.friends.friendRequests,
  toggleProfile: state.menuDrawer.showProfile,
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
