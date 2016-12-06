import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from 'react-mdl'
//import './style-confirm.css'

const DeleteChatConfirm = (props) => {
  //const { id } = props.chat
  const {  handleCloseChatDialog, openChatDialog, handleDeleteChat } = props
  return (
    <div>
      <Dialog open={openChatDialog}>
        <DialogTitle>Delete conversation</DialogTitle>
          <DialogContent>
            <p>Delete this conversation?</p>
          </DialogContent>
        <DialogActions>
          <Button type='button' onClick={() => {handleDeleteChat}}>Delete</Button>
          <Button type='button' onClick={handleCloseChatDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteChatConfirm
