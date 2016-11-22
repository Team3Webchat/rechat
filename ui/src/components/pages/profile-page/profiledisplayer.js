import React, { PropTypes, Component } from 'react'
import { Textfield, Button, Spinner, Card, Grid, Cell } from 'react-mdl'


const ProvileDisplayer = (props) => {
  const { onChange, onSubmit, email, password, passwordConfirm, isAuthenticating } = props

  //There is an error right now with the fields, you can't write any text in them
  return (
    <Card shadow={0} style={{ margin: 'auto', width: '40%'}}>
      <Grid style={{width: '80%'}}>
        <Cell col={10}><h2>Hampus <br />Jarleborn</h2></Cell>
        <Cell col={10}><img src="http://hampusjarleborn.se/php_proj/data/6521141500846276608.png" style={{width: '150px'}}/></Cell>
      </Grid>
      <Grid>
        <Cell col={12}>Email: hampus@mail.com</Cell>
      </Grid>
    </Card>
  )
}

export default ProvileDisplayer
