import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/NavBar.css'

import SlideoutMenu from './SlideoutMenu'
import UserPanel from './UserPanel'

class NavBar extends Component {
  state = {
    showSlideout: false,
    showUserPanel: false,
    userOnMobile: false
  }

  handleUserOnMobile = () => {
    window.innerWidth > 580
      ? this.setState({userOnMobile: false})
      : this.setState({userOnMobile: true})
  }

  componentDidMount = () => {
    this.handleUserOnMobile();
    window.addEventListener('resize', this.handleUserOnMobile)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleUserOnMobile)
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
        <li className='NavBar__li'><NavLink to={'/' + this.props.username}>Home</NavLink></li>
        <li className='NavBar__li'><NavLink to='/monsters/new'>Make</NavLink></li>
        <li className='NavBar__li'><NavLink to='/monsters'>Explore</NavLink></li>
        <li className='NavBar__li'>
          <button onClick={this.handleUserPanelClick} className='NavBar__button'>
            {!this.state.showUserPanel
              ? <i className='material-icons'>account_circle</i>
              : <i className='material-icons'>close</i> }
          </button>
        </li>
      </div>
    )

    if (this.state.userOnMobile) {
      navItems = (
        <div className='NavBar__right'>
          <li className='NavBar__li'>
            <button onClick={this.handleSlideoutClick} className='NavBar__button'>
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
        {this.state.userOnMobile
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
