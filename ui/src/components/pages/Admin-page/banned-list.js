import React from 'react'
import { FABButton, Icon, TableHeader, DataTable } from 'react-mdl'

import './style.css'

const BannedForm = ( {users, unBanUser} ) => {
  const rows = []
  users.map(u => {
    const button = <FABButton mini ripple onClick={() => {unBanUser(u.id)}}> <Icon name="settings_backup_restore" /> </FABButton>
    return rows.push({Name: `${u.firstname} ${u.lastname}`, email: `${u.email}`, unBan: button})
  })

  return (
    <div className="list">
      <DataTable
        shadow={1}
        rows={rows}>
        <TableHeader name="Name" >Name</TableHeader>
        <TableHeader numeric name="email" >Email</TableHeader>
        <TableHeader numeric name="unBan" tooltip="Un-bann the user">Remove ban</TableHeader>
    </DataTable>
    </div>
  )
}

export default BannedForm
