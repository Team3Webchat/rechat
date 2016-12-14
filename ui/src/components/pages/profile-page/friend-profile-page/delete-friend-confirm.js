import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from 'react-mdl'

import './../../style-dialog-common.css'

const DeleteFriendConfirm = (props) => {
  
  const { firstname, lastname, id } = props.friend
  const {  handleCloseFriendDialog, openFriendDialog, handleDeleteFriend } = props
  return (
    <Dialog open={openFriendDialog}>
      <DialogTitle>Remove friend</DialogTitle>
        <DialogContent>
          <p>Remove <span className="bold">{firstname} {lastname}</span> from your contacts?</p>
        </DialogContent>
      <DialogActions>
        <Button type='button' onClick={() => {handleDeleteFriend(id)}}>Remove</Button>
        <Button type='button' onClick={handleCloseFriendDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteFriendConfirm
