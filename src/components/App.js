import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import '../styles/App.css'

import AuthRoute from './AuthRoute'
import NavBar from './NavBar'
import Splash from './Splash'
import Home from './Home'
import Login from './Login'
import NewMonster from './NewMonster'
import Monsters from './Monsters'

class App extends Component {
  state = {
    isLoggedIn: false,
    userOnMobile: false,
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
      <div className='App__grid-container'>
          {navBar}
          <Switch>
            <Route exact path='/' component={homeComponent} />
            <Route exact path='/login' username={this.state.username} component={Login} />
            <AuthRoute exact path={'/' + this.state.username} component={Home} isLoggedIn={this.state.isLoggedIn} />
            <Route exact path='/monsters' component={Monsters} />
            <AuthRoute exact path='/monsters/new' component={NewMonster} isLoggedIn={this.state.isLoggedIn} />
          </Switch>
      </div>
    )
  }
}

export default App
