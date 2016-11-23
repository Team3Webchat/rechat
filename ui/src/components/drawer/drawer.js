import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner, Drawer, Navigation } from 'react-mdl'

import { toggleFriends } from '../../lib/actions/menuDrawerActions'

import Friends from './friends'

class DrawerClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFriends: null,
    }
  }

  handleChange = key => {
    return function(e) {
      const state = {}
      state[key] = e.target.value
      this.setState(state)
    }.bind(this)
  }

  toggleFriends = e =>{
      this.props.doToggleFriends(this.state.showFriends)


  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showFriends !== nextProps.showFriends)
      this.setState({
        showFriends: !this.state.showFriends,
      })
  }

  render() {
    const { showFriends } = this.state

    return (
      <Drawer title="Title">
            <Navigation>
                <a href="#" onClick={this.toggleFriends}>Friends</a>
                { showFriends &&
                    //Skapa ny component som renderar ut användarens vänner
                    <Friends/>
                }

            </Navigation>
            <Navigation>
                <a href="#">Chat</a>
            </Navigation>
        </Drawer>
    )
  }
}

const mapStateToProps = state => {
  return {
    showFriends: state.menuDrawer.showFriends,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doToggleFriends: (showFriends) => {
      dispatch(toggleFriends(showFriends))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerClass)
