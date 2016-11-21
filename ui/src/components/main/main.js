import React from 'react'
import { connect } from 'react-redux'
import { Layout, Button, Header, Navigation, Drawer, Grid, Cell } from 'react-mdl'
import { push } from 'react-router-redux'
import Search from '../search/search'

import FlashMessage from '../flash-message/flash-message'
import { logout } from '../../lib/actions/authActions'

import './style.css'

const Main = (props) => {
  const { email, doLogout, flash } = props
  return (
    <div>
      
     <Layout fixedHeader fixedDrawer>
        <Header title="Title">
           <Navigation>
            <a href="#" onClick={doLogout}>Sign out</a>
           </Navigation>
        </Header>
        <Drawer title="Title">
            <Navigation>
                <a href="#">Link</a>
            </Navigation>
        </Drawer>
        <Grid>
          <Cell>
          <FlashMessage message={flash.message} type={flash.type} />
          <h4>Welcome to rechat {email}</h4>

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