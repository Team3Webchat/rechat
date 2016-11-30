import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {  Card, Grid, Cell, CardActions, Button, Icon, Textfield } from 'react-mdl'

import { resetFlashMessage} from '../../lib/actions/flashActions'

import './style.css'

const FlashMessage = ({ message, type, inline, close }) => {
  const className = `flash-message flash-${type}`
  return (
    <Card shadow={0} className={className}>
      <Grid>
        <Cell col={10} >
          { message }
        </Cell>
        <Cell col={2} >
          <Icon name="close" onClick={close}/>
        </Cell>
      </Grid >
    </Card >
  )
}

FlashMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(resetFlashMessage()),
})

export default connect(null, mapDispatchToProps)(FlashMessage)
