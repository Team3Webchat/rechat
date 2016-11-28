import React, { PropTypes, Component } from 'react'
import {  Card, Grid, Cell, CardActions, Button, Icon } from 'react-mdl'


const ProfileDisplayer = (props) => {
  const { email, name } = props.user
  const { doToggleProfile, doToggleEdit } = props
  //There is an error right now with the fields, you can't write any text in them
  return (
    <Card shadow={0} style={{ margin: 'auto', width: '150%'}}>
      <Button colored>
        <Icon name="close" onClick={doToggleProfile}/>
        </Button>
      <Grid style={{width: '80%'}}>
        <Cell col={10}><h2> {name} </h2></Cell>
        <Cell col={10}><img alt='tmppic' src="http://hampusjarleborn.se/php_proj/data/6521141500846276608.png" style={{width: '150px'}}/></Cell>
      </Grid>
      <Grid>
        <Cell col={12}>Email: {email}</Cell>
      </Grid>
      <CardActions border>
          <Button onClick={doToggleEdit} colored>Edit

          </Button>
      </CardActions>
    </Card>
  )
}

export default ProfileDisplayer
/*

*/
