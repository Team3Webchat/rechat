import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from 'react-mdl'

import './../style-dialog-common.css'

const DeleteChatConfirm = (props) => {
  //const { id } = props.chat
  const {  handleCloseChatDialog, openChatDialog, clearChatHistory } = props
  return (
    <div>
      <Dialog open={openChatDialog}>
        <DialogTitle>Delete conversation</DialogTitle>
          <DialogContent>
            <p>Delete this conversation?</p>
          </DialogContent>
        <DialogActions>
          <Button type='button' onClick={() => {
              clearChatHistory()
              handleCloseChatDialog()
            }}>Delete</Button>
          <Button type='button' onClick={handleCloseChatDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteChatConfirm
