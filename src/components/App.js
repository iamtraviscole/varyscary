import React, { PureComponent } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/App.css'
import * as actions from '../actions/actions'

import AuthRoute from './AuthRoute'
import NavBar from './NavBar'
import NoAuthNavBar from './NoAuthNavBar'
import Splash from './Splash'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Logout from './Logout'
import NewMonster from './NewMonster'
import Monsters from './Monsters'
import Monster from './Monster'
import EditMonster from './EditMonster'
import NoMatch from './NoMatch'
import User from './User'
import UserLikes from './UserLikes'

class App extends PureComponent {

  render() {
    let homeComponent = Splash
    let navBar = <NoAuthNavBar />

    if (this.props.location.pathname === '/signup' ||
      this.props.location.pathname === '/login') {
      navBar = null
    } else if (this.props.location.pathname === '/' && !this.props.username) {
      navBar = null
    } else if (this.props.username) {
      homeComponent = Home
      navBar = <NavBar username={this.props.username} />
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
          <AuthRoute exact path='/monsters/:id/edit' component={EditMonster} />
          <Route exact path='/:username' component={User} />
          <Route exact path='/:username/favorites' component={UserLikes} />
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
    setMessage: (icon, text) => dispatch(actions.setMessage(icon, text))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
