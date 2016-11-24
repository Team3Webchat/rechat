import React from 'react'
import { connect } from 'react-redux'
import { Layout, Header, Navigation, Drawer, Grid, Cell, Badge, Icon } from 'react-mdl'
import { push } from 'react-router-redux'
import { Link } from 'react-router'
import Search from '../search/search'
import DrawerClass from '../drawer/drawer'

import FlashMessage from '../flash-message/flash-message'
import { logout } from '../../lib/actions/authActions'
import { expandDrawer } from '../../lib/actions/menuDrawerActions'

import './style.css'

const Main = (props) => {
  const { email, doLogout, flash, friendRequests } = props
  console.log(friendRequests)
  return (
    <div>

     <Layout fixedHeader fixedDrawer>
        <Header title="Title">
           <Navigation>
           <Link to="/friend-request">
           { friendRequests && friendRequests.length > 0 ?
             <Badge text={friendRequests.length} overlap>
                <Icon name="account_box" />
             </Badge>
              : <Icon name="account_box" />
            }
          </Link>
            <Search />
            <a href="#" onClick={doLogout}>Sign out</a>
          </Navigation>
        </Header>
        <DrawerClass/>
        <Grid>

          { flash.message &&
            <FlashMessage
            message={flash.message}
            type={flash.type}
            inline
            />
          }
          {props.children}

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
    friendRequests: state.friends.friendRequests,
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
