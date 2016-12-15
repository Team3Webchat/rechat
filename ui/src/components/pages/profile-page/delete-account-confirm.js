import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from 'react-mdl'
import { logout } from '../../../lib/actions/authActions'

import './../style-dialog-common.css'

const DeleteAccountConfirm = (props) => {
  
  const { name } = props.user
  const {  handleCloseAccountDialog, openAccountDialog, doLogout, flash } = props
  return (
    <Dialog open={openAccountDialog}>
      <DialogTitle><span className="bold">{name}</span>, we are sorry to see you go</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete your account? All your data will be lost.</p>
        </DialogContent>
      <DialogActions>
        <Button type='button' onClick={doLogout}>Delete</Button>
        <Button type='button' onClick={handleCloseAccountDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = state => ({
  flash: state.flash,
})

const mapDispatchToProps = dispatch => ({
  doLogout: (message) => {
    dispatch(logout({
      flash: {
        message: 'We hope to see you again!',
        type: 'success',
      },
    }))
    dispatch(push('/sign-in'))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAccountConfirm)
