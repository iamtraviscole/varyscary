import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import NavBar from './NavBar'
import Splash from './Splash'
import Home from './Home'
import NewMonster from './NewMonster'
import Monsters from './Monsters'

class App extends Component {

  render() {
    let homeComponent = Splash
    let navBar = <NavBar />
    // if isLoggedIn homeComponent = Home
    // if !isLoggedIn navBar = null
    return (
      <Fragment>
        {navBar}
        <Route exact path='/' component={homeComponent}/>
        <Route exact path='/monsters' component={Monsters}/>
        <Route exact path='/username/monsters/new' component={NewMonster}/>
        <Route exact path='/username/monsters' component={Monsters}/>
      </Fragment>
    )
  }
}

export default App
