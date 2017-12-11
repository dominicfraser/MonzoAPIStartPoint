import React from 'react'
import ReactDOM from 'react-dom'
import LoginContainer from './containers/loginContainer'

window.addEventListener('load', () => {
  const targetDiv = document.getElementById('app')
  
  ReactDOM.render(<LoginContainer />, targetDiv)
})