import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTestData } from '../../../lib/actions'

import './style.css'

class TestPage extends Component {

  componentDidMount() {
    const { fetchData } = this.props
    fetchData()

  }

  render() {
    const { isFetching, data } = this.props
    let message = null
    if (isFetching)
      message = <p>Fetching data..</p>
    else if (data)
      message = <p>{data.status}</p>
    
    return(
      <div className="test">
        <h3>Hello!asdasd</h3>
        {message}
      </div>
    )
  }
}



const mapStateToProps = state => {
  return  {
    data: state.testReducer.data,
    isFetching: state.testReducer.isFetching,
  }
}

const mapDispatchToProps = dispatch => {

  return {
    fetchData: () => {
      dispatch(fetchTestData())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestPage)