import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import store, { history } from './lib/store'

import 'babel-polyfill'
import 'react-mdl/extra/material.css'
import 'react-mdl/extra/material.js'
import 'flexboxgrid'
import './index.css'




ReactDOM.render(
  <App />,
  document.getElementById('root')
)
