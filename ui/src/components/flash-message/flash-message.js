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
          <div className={className}>
            { message }
          </div>
        :
        <div className={className} style={{boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)'}}>
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
