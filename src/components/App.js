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

class App extends Component {

  componentWillMount = () => {
    if (window.innerWidth > 580) {
      this.props.setDesktop()
    } else {
      this.props.setMobile()
    }
  }

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
            <AuthRoute exact path={'/' + this.props.username} component={Home} isLoggedIn={isLoggedIn} />
            <Route exact path='/monsters' component={Monsters} />
            <AuthRoute exact path='/monsters/new' component={NewMonster} isLoggedIn={isLoggedIn} />
          </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userOnMobile: state.userOnMobile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username) => dispatch(actions.login(username)),
    logout: () => dispatch(actions.logout()),
    setMobile: () => dispatch(actions.setMobile()),
    setDesktop: () => dispatch(actions.setDesktop())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
