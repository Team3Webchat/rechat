import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { resetFlashMessage} from '../../lib/actions/flashActions'

import './style.css'

const FlashMessage = ({ message, type, inline, close }) => {
  const className = `flash-message flash-${type}`
  return (
    <div className={className}>
      { message }
    </div>
  )
}

FlashMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch(resetFlashMessage()),
  }
}

export default connect(null, mapDispatchToProps)(FlashMessage)