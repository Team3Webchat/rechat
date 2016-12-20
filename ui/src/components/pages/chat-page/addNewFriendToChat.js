import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from 'react-mdl'

import './../style-dialog-common.css'

const AddNewFriendToChat = (props) => {
  //const { id } = props.chat
  const {  handleCloseAddFriendConfirm, openAddFriendsDialog, addFriend } = props
  return (
    <div>
      <Dialog open={openAddFriendsDialog}>
        <DialogTitle>Add friend to chat</DialogTitle>
          <DialogContent>
            <p>Chose what friend to add to the conversation</p>
          </DialogContent>
        <DialogActions>
          <Button type='button' onClick={() => {
            addFriend()
            handleCloseAddFriendConfirm()
          }}>Add</Button>
          <Button type='button' onClick={handleCloseAddFriendConfirm}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddNewFriendToChat
