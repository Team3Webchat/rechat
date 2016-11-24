import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfield, Button, Spinner, Drawer, Navigation, List, ListItem, Icon } from 'react-mdl'

const Friends = ({ friends, onFriendClick }) => {
  if (friends) {
    return (
      <List>
        {friends.map(f => 
          <ListItem key={f.id}>
            <span><Icon name="account_box"/>{f.firstname} {f.lastname}</span>
          </ListItem> 
        )}
      </List>
    )
  } else {
    return <p>No friends</p>
  }
  
}

export default Friends

// class Friends extends Component {

//   constructor(props) {
//     super(props)

//   }

//   // componentWillReceiveProps(nextProps) {
//   //   if (this.props.friends !== nextProps.friends)
//   //     this.setState({
//   //       showFriends: nextProps.friends,
//   //     })
//   // }


//   render(){
//     const { friends } = this.props
//     console.log(friends)
//     return(
//       <List>
//       {
//         friends.length > 0 ?
//           friends.map(function (user) {
//             return (
//               <ListItem key={user}>
//                 <Icon name="account_box" />{user.firstname}  {user.lastname}
//               </ListItem>
//             )
//           })
//         :
//         <p>You dont have any friends loser</p>
//       }
//       </List>
//     )
//   }
// }


// const mapStateToProps = state => {

//   return {
//     friends: state.friends.friends,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {

//   }
// }
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Friends)


