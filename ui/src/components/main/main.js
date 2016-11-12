import React from 'react'
import { Layout } from 'react-mdl'
import { Link } from 'react-router'

const Main = (props) => {
  return (
    <div>
      <Layout>
        <Link to="/testpage">View 1</Link>
        <Link to="/testpage2">View 2</Link>
        {props.children}
      </Layout>
    </div>
  )
  
}

export default Main