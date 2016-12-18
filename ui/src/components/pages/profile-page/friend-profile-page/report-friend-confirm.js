import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Textfield} from 'react-mdl'

import './../../style-dialog-common.css'

const ReportFriendConfirm = (props) => {
  const { firstname, lastname, id } = props.friend
  const {  onChange, onSubmit, handleCloseReportDialog, openReportDialog, handleReportFriend, reportDetails } = props
  return (
    <Dialog open={openReportDialog} className="dialogMedium">
      <DialogTitle>Report this person</DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent>
            <p>Report <span className="bold">{firstname} {lastname}</span> for inappropriate behavior.
            The report will be submitted for review and our administration will look for violations of our Terms of use.</p>

            <div>
              <Textfield
                className='textInput'
                onChange={onChange}
                label="Write details..."
                required
                rows={3}
                value={reportDetails}
              />
            </div>

        </DialogContent>
        <DialogActions className="dialogActionsBorder">
          <Button raised colored disabled={reportDetails.length === 0} type="submit" onClick={() => {handleReportFriend(id, reportDetails)}}>Report</Button>
          <Button type='button' onClick={handleCloseReportDialog}>Cancel</Button>
      </DialogActions>
      </form>
    </Dialog>
  )
}

export default ReportFriendConfirm
