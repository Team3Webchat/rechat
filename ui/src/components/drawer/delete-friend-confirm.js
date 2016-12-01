import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from 'react-mdl'
import './style-confirm.css'

const DeleteFriendConfirm = (props) => {
  const { firstname, lastname, id } = props.friend
  const {  handleCloseDialog, openDialog, handleDeleteFriend } = props
  return (
    <Dialog open={openDialog}>
      <DialogTitle>Remove friend</DialogTitle>
        <DialogContent>
          <p>Remove {firstname} {lastname} from your contacts?</p>
        </DialogContent>
      <DialogActions>
        <Button type='button' onClick={() => {handleDeleteFriend(id)}}>Confirm</Button>
        <Button type='button' onClick={handleCloseDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteFriendConfirm
