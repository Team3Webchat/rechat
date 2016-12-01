import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from 'react-mdl'
import './style-confirm.css'

const DeleteChatConfirm = (props) => {
  //const { id } = props.chat
  const {  handleCloseDialog, openDialog, handleDeleteChat } = props
  return (
    <div>
      <Dialog open={openDialog}>
        <DialogTitle>Delete conversation</DialogTitle>
          <DialogContent>
            <p>Delete this conversation?</p>
          </DialogContent>
        <DialogActions>
          <Button type='button' onClick={() => {handleDeleteChat}}>Delete</Button>
          <Button type='button' onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteChatConfirm
