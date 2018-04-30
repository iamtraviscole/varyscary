import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import AuthRoute from './AuthRoute'
import NavBar from './NavBar'
import Splash from './Splash'
import Home from './Home'
import NewMonster from './NewMonster'
import Monsters from './Monsters'

class App extends Component {
  render() {
    let isLoggedIn = true

    let homeComponent = Splash
    let navBar = null

    if (isLoggedIn) {
      homeComponent = Home
      navBar = <NavBar />
    }

    return (
      <Fragment>
          {navBar}
          <Switch>
            <Route exact path='/' component={homeComponent} />
            <AuthRoute exact path='/username' component={Home} isLoggedIn={isLoggedIn} />
            <AuthRoute exact path='/monsters' component={Monsters} isLoggedIn={isLoggedIn} />
            <AuthRoute exact path='/monsters/new' component={NewMonster} isLoggedIn={isLoggedIn} />
          </Switch>
      </Fragment>
    )
  }
}

export default App
