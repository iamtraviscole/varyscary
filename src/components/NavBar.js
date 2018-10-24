import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/NavBar.css'

import SlideoutMenu from './SlideoutMenu'
import UserPanel from './UserPanel'

class NavBar extends Component {
  state = {
    showSlideout: false,
    showUserPanel: false
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
          <li className='NavBar__link-li'><NavLink to='/home' className='NavBar__link'>Home</NavLink></li>
          <li className='NavBar__link-li'><NavLink to='/monsters/new' className='NavBar__link'>Make</NavLink></li>
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

    if (this.props.userOnMobile) {
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

    return (
      <Fragment>
        {this.props.userOnMobile
          ? <SlideoutMenu
              toggleSlideout={toggleSlideout}
              handleSlideoutClick={this.handleSlideoutClick}
              username={this.props.username} />
          : <UserPanel
              toggleUserPanel={toggleUserPanel}
              handleUserPanelClick={this.handleUserPanelClick}
              username={this.props.username} />}
        <nav className='NavBar'>
          <div className='NavBar__logo'>Logo Here</div>
          <ul className='NavBar__ul'>
            {navItems}
          </ul>
        </nav>
      </Fragment>
    )
  }
}

export default NavBar
