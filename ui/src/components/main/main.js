import React from 'react'
import { connect } from 'react-redux'
import { Layout, Button } from 'react-mdl'
import { push } from 'react-router-redux'

import { logout } from '../../lib/actions/authActions'

const Main = (props) => {
  const { isLoggedIn, email, doLogout } = props
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