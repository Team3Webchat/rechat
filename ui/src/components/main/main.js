import React, { Component } from 'react'
import { Layout } from 'react-mdl'

const Main = (props) => {
  return (
    <div>
      <Layout>
        {props.children}
      </Layout>
    </div>
  )
  
}

export default Main