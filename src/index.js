import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import ImagePage from './pages/ImagePage/ImagePage'
ReactDOM.render(
  <Router>
    <Route exact path='/' component={App} />
    <Route path='/image' component={ImagePage} />
  </Router>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
