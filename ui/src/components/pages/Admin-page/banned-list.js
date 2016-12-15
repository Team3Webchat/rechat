import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { FABButton, Icon, TableHeader,DataTable } from 'react-mdl'



import './style.css'

const BannedForm = ( {users} ) => {

  const rows = []
  users.map(u => {
    const button = <FABButton mini> <Icon name="alarm" /> </FABButton>
    return rows.push({Name: `${u.firstname} ${u.lastname}`, quantity: `${u.email}`, price: button})
  })
  console.log(rows);

  return (
    <div className="ghf">
      <DataTable
        shadow={1}
        rows={rows}
    >
        <TableHeader name="Name" tooltip="The amazing material name">Name</TableHeader>
        <TableHeader numeric name="quantity" tooltip="Number of materials">Email</TableHeader>
        <TableHeader numeric name="price" tooltip="Price pet unit">Remove ban</TableHeader>
    </DataTable>
    </div>
  )
}
/*

            {Name: 'rebecca', quantity: 25, price: 2.90},
            {Name: 'Plywood (Birch)', quantity: 50, price: 1.25},
            {Name: 'Laminate (Gold on Blue)', quantity: 10, price: 2.35}


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
*/
export default BannedForm
