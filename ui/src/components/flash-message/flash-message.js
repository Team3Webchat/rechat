import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import {  Grid, Cell, Button, Icon } from 'react-mdl'

import { resetFlashMessage} from '../../lib/actions/flashActions'

import './style.css'
class FlashMessage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isSnackbarActive: true,
    }
  }

  handleTimeoutSnackbar(){
    if(this.state.isSnackbarActive){
      setTimeout(() => {
        this.setState({ isSnackbarActive: false })
      }, 3000)
    }
  }

  render(){
    const { message, type, inline, close } = this.props
    const { isSnackbarActive } = this.state
    const className = `flash-message flash-${type} active-${isSnackbarActive}`

    return (
      <div>
        {inline ?
          <Grid className={className}>
            <Cell col={12} >
              { message }
            </Cell>
          </Grid>
        :
        <div className={className}>
          { this.handleTimeoutSnackbar() }
          <p>{ message }</p>
          <Button onClick={close}>
            <Icon name="close"/>
          </Button>

        </div>
        }
      </div>
    )
  }

}
FlashMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(resetFlashMessage()),
})

export default connect(null, mapDispatchToProps)(FlashMessage)
