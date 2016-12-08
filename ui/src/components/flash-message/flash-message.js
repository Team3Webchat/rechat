import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

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
      }, 2000)
    }
  }

  render(){
    const { message, type, inline } = this.props
    const { isSnackbarActive } = this.state
    const className = `flash-message flash-${type} active-${isSnackbarActive} inline-${inline}`
    return (
      <div>
        {inline ?
          <div className={className}>
            { message }
          </div>
        :
        <div className={className} >
          { this.handleTimeoutSnackbar() }
          <p>{ message }</p>
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

export default connect(null, null)(FlashMessage)
