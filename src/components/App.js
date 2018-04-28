import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import NavBar from './NavBar'
import Home from './Home'

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Route exact path='/' component={Home}/>
      </Fragment>
    )
  }
}

export default App
