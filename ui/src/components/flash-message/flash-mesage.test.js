import React from 'react'
import ReactDOM from 'react-dom'
import FlashMessage from './flash-message'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FlashMessage />, div)
})
