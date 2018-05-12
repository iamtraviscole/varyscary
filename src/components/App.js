import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/App.css'
import * as actions from '../actions/actions'

import AuthRoute from './AuthRoute'
import NavBar from './NavBar'
import Splash from './Splash'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import NewMonster from './NewMonster'
import Monsters from './Monsters'
import NoMatch from './NoMatch'

class App extends Component {

  render() {
    let homeComponent = Splash
    let navBar = null
    let isLoggedIn = false

    if (this.props.username) {
      homeComponent = Home
      navBar = <NavBar username={this.props.username}
        userOnMobile={this.props.userOnMobile}
        logout={this.props.logout} />
      isLoggedIn = true
    }

    return (
      <div className='App__grid-container'>
          {navBar}
          <Switch>
            <Route exact path='/' component={homeComponent} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Logout} />
            <AuthRoute exact path={'/' + this.props.username}
              component={Home}
              isLoggedIn={isLoggedIn} />
            <Route exact path='/monsters' component={Monsters} />
            <AuthRoute exact path='/monsters/new'
              component={NewMonster}
              isLoggedIn={isLoggedIn} />
            <Route component={NoMatch} />
          </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username) => dispatch(actions.login(username)),
    logout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
