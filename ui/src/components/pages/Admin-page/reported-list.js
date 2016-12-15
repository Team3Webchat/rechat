import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { FABButton, DataTable, TableHeader, Icon } from 'react-mdl'

import FlashMessage from '../../flash-message/flash-message'

import './style.css'

const ReportedForm = ({ users, banTheUser }) => {

  const rows = []
  users.map(user => {
    const button = <FABButton mini ripple onClick={() => {banTheUser(user.user.id)}}> <Icon name="https" /> </FABButton>
    return rows.push({Name: `${user.user.firstname} ${user.user.lastname}`, Email: `${user.user.email}`, TimesBanned: `${user.reports.length}`, Message: 'Message for report', Ban: button})
  })


  return (
    <div className="ghf">
      <DataTable
        shadow={1}
        rows={rows}
    >
        <TableHeader numeric name="Name" tooltip="Name of the reported user">Name</TableHeader>
        <TableHeader numeric name="Email" tooltip="Mail of the reported user">Email</TableHeader>
        <TableHeader numeric name="TimesBanned" tooltip="The number of times the user has been banned">Times reported</TableHeader>
        <TableHeader numeric name="Message" tooltip="Messages">See messages from report</TableHeader>
        <TableHeader numeric name="Ban" tooltip="Ban User">ban user</TableHeader>
    </DataTable>
    </div>
  )
}

export default ReportedForm
