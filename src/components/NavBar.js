import React, { Component, Fragment } from 'react'
import { NavLink, Link } from 'react-router-dom'

import '../styles/NavBar.css'

import SlideoutMenu from './SlideoutMenu'
import UserPanel from './UserPanel'
import logo from '../images/varyscary-logo.png'

class NavBar extends Component {
  state = {
    showSlideout: false,
    showUserPanel: false,
    smallScreen: false
  }

  handleSmallScreen = () => {
    window.innerWidth > 580
      ? this.setState({smallScreen: false})
      : this.setState({smallScreen: true})
  }

  componentDidMount = () => {
    this.handleSmallScreen();
    window.addEventListener('resize', this.handleSmallScreen)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleSmallScreen)
  }

  handleSlideoutClick = () => {
    this.setState({showSlideout: !this.state.showSlideout})
  }

  handleUserPanelClick = () => {
    this.setState({showUserPanel: !this.state.showUserPanel})
  }

  render () {
    let navItems = (
      <Fragment>
        <div className='NavBar__link-ctr'>
          <li className='NavBar__link-li'><NavLink to='/' className='NavBar__link'>Home</NavLink></li>
          <li className='NavBar__link-li'><NavLink to='/monsters/new' className='NavBar__link'>Create</NavLink></li>
          <li className='NavBar__link-li'><NavLink to='/monsters' className='NavBar__link'>Explore</NavLink></li>
        </div>
        <li className='NavBar__user-panel-li'>
          <button onClick={this.handleUserPanelClick} className='NavBar__user-panel-btn'>
            {!this.state.showUserPanel
              ? <i className='material-icons'>person</i>
              : <i className='material-icons'>close</i> }
          </button>
        </li>
      </Fragment>
    )

    if (this.state.smallScreen) {
      navItems = (
        <li className='NavBar__hamburger-menu-li'>
          <button onClick={this.handleSlideoutClick} className='NavBar__hamburger-menu'>
            <i className='material-icons'>menu</i>
          </button>
        </li>
      )
    }

    let toggleSlideout = 'hide'
    if (this.state.showSlideout) toggleSlideout = 'show'

    let toggleUserPanel = 'hide'
    if (this.state.showUserPanel) toggleUserPanel = 'show'

    if (this.state.showSlideout) {
      document.documentElement.setAttribute('style', 'overflow-y: hidden');
    } else {
      document.documentElement.removeAttribute('style');
    }

    return (
      <Fragment>
        {this.state.smallScreen
          ? <SlideoutMenu
              toggleSlideout={toggleSlideout}
              handleSlideoutClick={this.handleSlideoutClick}
              username={this.props.username} />
          : <UserPanel
              toggleUserPanel={toggleUserPanel}
              handleUserPanelClick={this.handleUserPanelClick}
              username={this.props.username} />}
        <nav className='NavBar'>
          <Link to='/'>
            <img className='NavBar__logo' src={logo} alt='logo' height='30'></img>
          </Link>
          <ul className='NavBar__ul'>
            {navItems}
          </ul>
        </nav>
      </Fragment>
    )
  }
}

export default NavBar
