import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Header, Navigation, Icon} from 'react-mdl'
import { push } from 'react-router-redux'
import Search from '../search/search'
import DrawerClass from '../drawer/drawer'
import FriendRequestContainer from '../pages/friend-request/friend-container'

import FlashMessage from '../flash-message/flash-message'
import { logout } from '../../lib/actions/authActions'

import { baseUrl } from '../../lib/actions/index'
import { getHeaders } from '../../lib/api'


import './style.css'

class Main extends Component {

  constructor(props){
    super(props)
    this.state = {
      showRequests: false,
      search: {
        showSearch: false,
        searchValue: '',
        searchResults: [],
        failure: true,
      },
    }
    this.getSearchResults = this.getSearchResults.bind(this)
  }

  async getSearchResults(value){
    try {
      const res = await fetch(baseUrl + 'search', {
        method: 'POST',
        body: JSON.stringify({
          searchValue: value,
        }),
        headers: getHeaders(),
      })

      const json = await res.json()
      console.log(json.results)
      if(json.results.length > 0){
        this.setState({
          search: {
            searchValue: this.state.searchValue,
            showSearch: true,
            searchResults: json.results,
            failure: false,
          },
        })
      }else{
        this.setState({
          search: {
            searchValue: this.state.searchValue,
            showSearch: true,
            searchResults: null,
            failure: true,
          }
        })
      }
    }catch(e) {
      console.log('wrong in getSearchResults')
      //TODO: retunera felmeddelande NOT DONE YET
    }
  }

  toggleShowRequests = e => {
    this.setState({
      showRequests: !this.state.showRequests,
      search: {
        searchValue: '',
        showSearch: false,
        searchResults: null,
        failure: true,
      },
    })
  }

  closeSearchBox = () => {
    this.setState({
      search: {
        searchValue: '',
        showSearch: false,
        searchResults: null,
        failure: true,
      },
    })
  }

  onClickOutside = (e) => {
    if(!e.target.parentElement.classList.contains( 'addUser' ) &&
      !e.target.parentElement.classList.contains( 'searchResult' ) &&
      !e.target.parentElement.classList.contains( 'toRequests' )){
      console.log('onlick utanför ')
      this.closeSearchBox()
      console.log(this.input)
      this.input.clear()
    }
  }


  render(){
    const { doLogout, flash } = this.props
    const { showRequests } = this.state
    const { showSearch, searchValue, searchResults, failure } = this.state.search
    console.log(searchResults);
    return (
      <div>
         <Layout fixedHeader fixedDrawer onClick={this.onClickOutside} ref='layout'>

          <Header title={<div className="title">ReChat</div>}>
             <Navigation>
               <Search showSearch={showSearch}
               searchValue={searchValue}
               getSearchResults={this.getSearchResults}
               closeSearchBox={this.closeSearchBox}
               searchResults={searchResults}
               failure={failure}
              inputRef={input => this.input = input}/>
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
