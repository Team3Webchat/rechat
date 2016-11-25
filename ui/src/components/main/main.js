import React from 'react'
import { connect } from 'react-redux'
import { Layout, Header, Navigation, Grid, Badge, Icon } from 'react-mdl'
import { push } from 'react-router-redux'
import { Link } from 'react-router'
import Search from '../search/search'
import DrawerClass from '../drawer/drawer'

import FlashMessage from '../flash-message/flash-message'
import { logout } from '../../lib/actions/authActions'

import './style.css'

const Main = (props) => {
  const { doLogout, flash, friendRequests } = props

  return (
    <div>

     <Layout fixedHeader fixedDrawer>
        <Header title="rechat">
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
        <DrawerClass name={props.name}/>
        <Grid className="main">

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

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  email: state.auth.email,
  flash: state.flash,
  friendRequests: state.friends.friendRequests,
  name: state.auth.name,
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
