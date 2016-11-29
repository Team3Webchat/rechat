import React, { } from 'react'
import {  Card, Grid, Cell, CardActions, Button, Icon} from 'react-mdl'
import { deleteFriend } from '../../lib/actions/friendsActions'
import './style-confirm.css'


const DeleteFriendConfirm = (props) => {
  //const {id, firstname, lastname} = props.friends
  const {doToggleDeleteFriend, deleteFriend} = props
  return (
    <Card className shadow={0} style={{ margin: 'auto', width: '150%'}}>
      <Button colored>
        <Icon name="close" onClick={doToggleDeleteFriend}/>
      </Button>
      <Grid style={{width: '80%'}}>
        <Cell col={10}><h2>Remove friend</h2></Cell>
        <Cell col={10}><p>Remove {} as your friend?</p></Cell>
      </Grid>
      <Grid> 
      </Grid>
      <CardActions border>
          <Button colored onClick={doToggleDeleteFriend}>Cancel</Button>
          <Button colored onClick={e => deleteFriend}>Confirm</Button>
      </CardActions>
    </Card>
  )
}

export default DeleteFriendConfirm