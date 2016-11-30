import React, { PropTypes, Component } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from 'react-mdl'
import { deleteFriend } from '../../lib/actions/friendsActions'
import './style-confirm.css'

const DeleteFriendConfirm = (props) => {
  //const {id, firstname, lastname} = props.friends
  const {deleteFriend, doToggleDeleteFriend, handleOpenDialog, handleCloseDialog} = props
  return (
    <div>
      <Dialog open={this.state.openDialog}>
        <DialogTitle>Remove friend</DialogTitle>
          <DialogContent>
            <p>Remove "friend" from your contacts?</p>
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={deleteFriend}>Confirm</Button>
            <Button type='button' onClick={this.handleCloseDialog}>Cancel</Button>
          </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteFriendConfirm