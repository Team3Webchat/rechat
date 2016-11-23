import React from 'react'
import { connect } from 'react-redux'
import { Layout, Header, Navigation, Drawer, Grid, Cell } from 'react-mdl'
import { push } from 'react-router-redux'
import Search from '../search/search'
import DrawerClass from '../drawer/drawer'

import FlashMessage from '../flash-message/flash-message'
import { logout } from '../../lib/actions/authActions'
import { expandDrawer } from '../../lib/actions/menuDrawerActions'

import './style.css'

const Main = (props) => {
  const { email, doLogout, flash, showFriends } = props
  return (
    <div>
      
     <Layout fixedHeader fixedDrawer>
        <Header title="Title">
           <Navigation>
            <a href="#" onClick={doLogout}>Sign out</a>
           </Navigation>
        </Header>
        <DrawerClass/>
        <Grid>
          <Cell>
          { flash.message 
            ? <FlashMessage 
            message={flash.message} 
            type={flash.type}
            inline
            />
            : ''
          }
          <h4>Welcome to rechat {email}</h4>
          <Search />
          </Cell>
        </Grid>
      </Layout>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isAuthenticated,
    email: state.auth.email,
    flash: state.flash,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doLogout: (message) => {
      dispatch(logout({
        flash: {
          message: 'We hope to see you again!',
          type: 'success',
        },
      }))
      dispatch(push('/sign-in'))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)