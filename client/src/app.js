import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import LoginContainer from './containers/loginContainer'
import AuthContainer from './containers/authContainer'

window.addEventListener('load', () => {
  const targetDiv = document.getElementById('app')
  
  ReactDOM.render(
    <BrowserRouter>
      <div>
        <Route exact path='/' component={LoginContainer} />
        <Route path='/login' component={LoginContainer} />
        <Route path='/authorised' component={AuthContainer} />
      </div>
    </BrowserRouter>, targetDiv)
})

//BrowserRouter rather than HashRouter as the # breaks the URL params