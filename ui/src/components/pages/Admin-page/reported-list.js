import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {Button, List, ListItem, ListItemContent } from 'react-mdl'
import { banUser } from '../../../lib/actions/adminActions'
import FlashMessage from '../../flash-message/flash-message'
import { connect } from 'react-redux'

import './style.css'

const ReportedForm = ({ users }) => {

  return (
    <div className="ghf">
      <List>
        <ListItem>
        {
          users.map(user =>
            <ListItemContent key={user.user.id} className="ReportedUserList">
              <p>Reported User: {user.user.email} ({user.user.firstname} {user.user.lastname})</p>
              <p>Reported for: {user.reports[0].message}</p>
              <Button className='buttons' onClick={ this.doBanUser(user.user.id)}>Ban This Account</Button>
            </ListItemContent>
          )
        }
        </ListItem>
      </List>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  doBanUser: (id) => dispatch(banUser(id)),
})

export default connect(
  mapDispatchToProps
)(ReportedForm)
