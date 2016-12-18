import React from 'react'
import { FABButton, DataTable, TableHeader, Icon, Tooltip } from 'react-mdl'

import './style.css'

const ReportedForm = ({ users, banTheUser, date }) => {

  const rows = []
  if(users){
    users.map(user => {
      const button = <FABButton mini ripple onClick={() => {banTheUser(user.user.id)}}> <Icon name="https" /> </FABButton>
      const reasons = <span>{user.reports.map(r => {
        return <div key={r.id} className='reason'>
          <p>Date: {date(new Date(r.createdAt))}</p>
          <p>Message: "{r.message}"</p>
        </div>
      }
      )}</span>

      /*const reasons = user.reports.map(report =>
        'Date: '+ date(new Date(report.createdAt)) +'\n Message "'+ report.message +'"'
      )*/
      console.log(reasons);
      const tooltip = <Tooltip label={reasons} >Reasons</Tooltip>
      return rows.push({Name: `${user.user.firstname} ${user.user.lastname}`,
        Email: `${user.user.email}`,
        TimesBanned: `${user.reports.length}`,
        Message: tooltip,
        Ban: button})
    })
  }



  return (
    <div className="list">
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
