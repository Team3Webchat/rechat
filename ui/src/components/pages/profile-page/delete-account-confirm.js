import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from 'react-mdl'

import './../style-dialog-common.css'

const DeleteAccountConfirm = (props) => {

  const { name, id } = props.user
  const {  handleCloseAccountDialog, openAccountDialog, handleDeleteAccount } = props
  return (
    <Dialog open={openAccountDialog}>
      <DialogTitle><span className="bold">{name}</span>, we are sorry to see you go</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete your account? All your data will be lost.</p>
        </DialogContent>
      <DialogActions>
        <Button type='button' onClick={() => handleDeleteAccount(id)}>Delete</Button>
        <Button type='button' onClick={handleCloseAccountDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteAccountConfirm
