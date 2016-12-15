import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { List, ListItem, ListItemContent } from 'react-mdl'



import './style.css'

const BannedForm = ( {users} ) => {

  return (
    <div className="ghf">
      <List>
        <ListItem>
        {
          users.map(user =>
            <ListItemContent className="ReportedUserList">
              <p>Banned User: {user.user.email} ({user.user.firstname} {user.user.lastname})</p>
              <p>Banned at: </p>
              <p>______________</p>
            </ListItemContent>
          )
        }
        </ListItem>
      </List>
    </div>
  )
}

export default BannedForm
