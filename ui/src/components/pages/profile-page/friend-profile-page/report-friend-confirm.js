import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from 'react-mdl'

const ReportFriendConfirm = (props) => {
  const { firstname, lastname, id } = props.friend
  const {  handleCloseReportDialog, openReportDialog, handleReportFriend } = props
  return (
    <Dialog open={openReportDialog}>
      <DialogTitle>Report this person</DialogTitle>
        <DialogContent>
          <p>Report {firstname} {lastname} for inappropriate behavior. 
          The report will be submitted for review and our administration will look for violations of our Terms of use.</p>
        </DialogContent>
      <DialogActions>
        <Button type='button' onClick={() => {handleReportFriend(id)}}>Report</Button>
        <Button type='button' onClick={handleCloseReportDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ReportFriendConfirm
