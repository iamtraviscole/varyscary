import React, { PureComponent } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/App.css'
import * as actions from '../actions/actions'

import AuthRoute from './AuthRoute'
import NavBar from './NavBar'
import Splash from './Splash'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Logout from './Logout'
import NewMonster from './NewMonster'
import Monsters from './Monsters'
import Monster from './Monster'
import NoMatch from './NoMatch'
import User from './User'

class App extends PureComponent {

  handleUserOnMobile = () => {
    window.innerWidth > 580
      ? this.props.setDesktop()
      : this.props.setMobile()
  }

  componentDidMount = () => {
    this.handleUserOnMobile();
    window.addEventListener('resize', this.handleUserOnMobile)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleUserOnMobile)
  }

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

    if (this.props.username) {
      homeComponent = Home
      navBar = <NavBar username={this.props.username}
        userOnMobile={this.props.userOnMobile} />
    }

    return (
      <div className='App__grid-container'>
        {navBar}
        <Switch>
          <Route exact path='/' component={homeComponent} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/logout' component={Logout} />
          <AuthRoute exact path='/home' component={Home} />
          <Route exact path='/monsters' component={Monsters} />
          <AuthRoute exact path='/monsters/new' component={NewMonster} />
          <Route exact path='/monsters/:id' component={Monster} />
          <Route exact path='/:username' component={User} />
          <Route component={NoMatch} />
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
    setMobile: () => dispatch(actions.setMobile()),
    setDesktop: () => dispatch(actions.setDesktop()),
    setMessage: (icon, text) => dispatch(actions.setMessage(icon, text))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
