import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner, Drawer, Navigation, List, ListItem, Icon } from 'react-mdl'

class Friends extends Component {

  constructor(props) {
    super(props)
    this.state = {
      friends: null,

    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.friends !== nextProps.friends)
      this.setState({
        showFriends: nextProps.friends,
      })
  }


  render(){
    const { friends } = this.props
    return(
      <List>
      {
        friends.length > 0 ?
          friends.map(function (user) {
            return (
              <ListItem key={user}>
                <Icon name="account_box" />{user.firstname}  {user.lastname}
              </ListItem>
            )
          })
        :
        <p>You dont have any friends loser</p>
      }
      </List>
    )
  }
}


const mapStateToProps = state => {

  return {
    friends: state.auth.friends,
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends)
