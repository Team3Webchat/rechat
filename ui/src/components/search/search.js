import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { Textfield, Button, Spinner } from 'react-mdl'

import { searchUser } from '../../lib/actions/searchActions'

class Search extends Component {
    //const { email } = this.state
  constructor(props) {
    super(props)
    this.state = {
      email: '',
    }
  }

  handleChange = key => {
    return function(e) {
      const state = {}
      state[key] = e.target.value
      this.setState(state)
    }.bind(this)
  }

  handleSubmit = e => {
    e.preventDefault()
    const { email } = this.state
      //skicka till dispatch sökning
    console.log(this.props)
    const { doSearchEmail } = this.props
    doSearchEmail({email})
    console.log('söker ....')
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <div>
        <Textfield
          label="Email"
          required
          type="email"
          value={this.state.email}
          onChange={this.handleChange('email')}
        />
        </div>
        
        <div>
            <Button
                className="buttons"
                primary 
                raised 
                ripple
                type="submit"
            >
                Search
            </Button>
        </div>
      </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doSearchEmail: ({email}) => {
      dispatch(searchUser({email}))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)