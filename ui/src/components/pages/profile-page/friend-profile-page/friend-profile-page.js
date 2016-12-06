import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, Grid, Cell, Icon, Button} from 'react-mdl'
import { Link } from 'react-router'
import Gravatar from 'react-gravatar'

import { deleteFriend, reportFriend } from '../../../../lib/actions/friendsActions'


class ProfileContainer extends Component {


  removeFriend = key => {
    return function(e) {
      const state = {}
      state[key] = e.target.value
      this.setState(state)
    }.bind(this)
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.isAuthenticating !== nextProps.isAuthenticating)
      this.setState({
        isAuthenticating: !this.state.isAuthenticating,
      })
  }

  render() {
    const { user } = this.props
    const { id } = this.props.params


    return (
      <Card className='profileCard' shadow={0}>
        <CardActions>
          <Grid>
            <Cell col={3}><Gravatar email='rebecca@awesome.com' size={130} /></Cell>
            <Cell col={7}><h3>Rebecca Fransson</h3></Cell>
            <Cell col={2}>
              <Link onClick={() => this.props.doReportFriend(id)} className='buttons'>
                <Icon name="report"/>
              </Link>
              <Link className='buttons' to={`/`}>
                <Icon name="close" />
              </Link>
            </Cell>
          </Grid>
        </CardActions>

        <Grid className='info'>
          <Cell col={3}></Cell>
          <Cell col={1} className='key'><p>Email</p></Cell>
          <Cell col={3} className='value'><p>rebecca@awesome.com</p></Cell>
        </Grid>
        <CardActions>
          <Button onClick={() => this.props.doDeleteFriend(id)}>Remove friend</Button>
        </CardActions>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  doDeleteFriend: (id) => dispatch(deleteFriend(id)),
  doReportFriend: (id) => dispatch(reportFriend(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
