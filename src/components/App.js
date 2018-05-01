import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import AuthRoute from './AuthRoute'
import NavBar from './NavBar'
import Splash from './Splash'
import Home from './Home'
import NewMonster from './NewMonster'
import Monsters from './Monsters'

class App extends Component {
  state = {
    isLoggedIn: false,
    username: 'Peter'
  }

  render() {
    let homeComponent = Splash
    let navBar = null

    if (this.state.isLoggedIn) {
      homeComponent = Home
      navBar = <NavBar username={this.state.username} />
    }

    return (
      <Fragment>
          {navBar}
          <Switch>
            <Route exact path='/' component={homeComponent} />
            <AuthRoute exact path={'/' + this.state.username} component={Home} isLoggedIn={this.state.isLoggedIn} />
            <Route exact path='/monsters' component={Monsters} />
            <AuthRoute exact path='/monsters/new' component={NewMonster} isLoggedIn={this.state.isLoggedIn} />
          </Switch>
      </Fragment>
    )
  }
}

export default App
