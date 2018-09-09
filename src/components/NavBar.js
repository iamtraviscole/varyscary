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
      <div className='NavBar__right'>
        <li className='NavBar__li'><NavLink to='/home'>Home</NavLink></li>
        <li className='NavBar__li'><NavLink to='/monsters/new'>Make</NavLink></li>
        <li className='NavBar__li'><NavLink to='/monsters'>Explore</NavLink></li>
        <li className='NavBar__li'>
          <button onClick={this.handleUserPanelClick} className='NavBar__user-panel-btn'>
            {!this.state.showUserPanel
              ? <i className='material-icons'>account_circle</i>
              : <i className='material-icons'>close</i> }
          </button>
        </li>
      </div>
    )

    if (this.props.userOnMobile) {
      navItems = (
        <div className='NavBar__right'>
          <li className='NavBar__li'>
            <button onClick={this.handleSlideoutClick} className='NavBar__user-panel-btn'>
              <i className='material-icons'>menu</i>
            </button>
          </li>
        </div>
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
          <ul className='NavBar__ul'>
            <li className='NavBar__li NavBar__li--logo'>Monster Maker</li>
            {navItems}
          </ul>
        </nav>
      </Fragment>
    )
  }
}

export default NavBar
