import React from 'react'
import { FABButton, Icon, TableHeader, DataTable } from 'react-mdl'

import './style.css'

const BannedForm = ( {users, unBanUser} ) => {
  const rows = []
  users.map(u => {
    const button = <div className="td-center"><FABButton mini ripple onClick={() => {unBanUser(u.id)}}> <Icon name="settings_backup_restore" /> </FABButton></div>
    return rows.push({Name: `${u.firstname} ${u.lastname}`, email: `${u.email}`, unBan: button})
  })

  return (
    <div className="list">
      <DataTable
        shadow={1}
        rows={rows}>
        <TableHeader name="Name" tooltip="Name of the reported user">Name</TableHeader>
        <TableHeader numeric name="email" tooltip="E-mail of the reported user">E-mail</TableHeader>
        <TableHeader numeric name="unBan" tooltip="Remove ban">Remove ban</TableHeader>
    </DataTable>
    </div>
  )
}

export default BannedForm
