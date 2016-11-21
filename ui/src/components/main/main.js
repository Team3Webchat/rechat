import React from 'react'
import { connect } from 'react-redux'
import { Layout, Button, Header, Navigation, Drawer } from 'react-mdl'
import { push } from 'react-router-redux'
import Search from '../search/search'

import { logout } from '../../lib/actions/authActions'

import './style.css'

const Main = (props) => {
  const { email, doLogout} = props
  console.log(Search)
  return (
    <div>
      <Layout>
        <h1>Welcome to rechat {email}</h1>
        {props.children}
        <Button 
          onClick={() => doLogout(`Goodbye ${email}`)}
          raised
          ripple
        >
          Sign out
        </Button>
        <Search/>
      </Layout>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isAuthenticated,
    email: state.auth.email,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doLogout: (message) => {
      dispatch(logout(message))
      dispatch(push('/sign-in'))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)