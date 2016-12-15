import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { List, ListItem, ListItemContent } from 'react-mdl'

import FlashMessage from '../../flash-message/flash-message'

import './style.css'

const ReportedForm = ({ users }) => {
  console.log(users);

  return (
    <div className="ghf">
      <List>
        <ListItem>
        {
          users.map(user =>
            <ListItemContent key={user.user.id} className="ReportedUserList">
              <p>Reported User: {user.user.email} ({user.user.firstname} {user.user.lastname})</p>
              <p>Reported for: {user.reports[0].message}</p>
              <p>______________</p>
            </ListItemContent>
          )
        }
        </ListItem>
      </List>
    </div>
  )
}

export default ReportedForm
