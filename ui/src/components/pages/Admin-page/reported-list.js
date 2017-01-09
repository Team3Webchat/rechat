import React from 'react'
import { FABButton, DataTable, TableHeader, Icon, Tooltip, Card, CardText } from 'react-mdl'

import './style.css'

const ReportedForm = ({ users, banTheUser, date }) => {

  const rows = []
  if(users){
    users.map(user => {
      const button = <div className="td-center"><FABButton mini ripple onClick={() => {banTheUser(user.user.id)}}> <Icon name="https" /> </FABButton></div>
      const reasons = <div>{user.reports.map(r => {
        return <Card className="reasonsCard">
        <CardText className="reasonsText">
          <div key={r.id}>
            <div className="cardtext-date"><span className="cardtext-bold">Date: </span> {date(new Date(r.createdAt))}</div>
            <div className="cardtext-message"><span className="cardtext-bold">Message: </span> <span>{r.message}</span></div>
          </div>
          </CardText></Card>
      }
      )}</div>

      /*const reasons = user.reports.map(report =>
        'Date: '+ date(new Date(report.createdAt)) +'\n Message "'+ report.message +'"'
      )*/
      console.log(reasons);
      const tooltip = <Tooltip label={reasons} className="viewReasons">View Reasons...</Tooltip>
      const banned = <div className="td-right">{user.reports.length}</div>
      return rows.push({Name: `${user.user.firstname} ${user.user.lastname}`,
        Email: `${user.user.email}`,
        TimesBanned: banned,
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
        <TableHeader numeric name="Email" tooltip="E-mail of the reported user">E-mail</TableHeader>
        <TableHeader numeric name="TimesBanned" tooltip={<span>Number of times the user <br/>has been reported</span>}># Reported</TableHeader>
        <TableHeader numeric name="Message" tooltip="Reasons for being reported">Reasons</TableHeader>
        <TableHeader numeric name="Ban" tooltip="Ban user">Ban user</TableHeader>
    </DataTable>
    </div>
  )
}

export default ReportedForm
