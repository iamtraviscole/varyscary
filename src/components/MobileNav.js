import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/MobileNav.css'

class MobileNav extends Component {
  state = {
    showMobileNav: true
  }

  handleMenuClick = () => {
    this.setState({showMobileNav: !this.state.showMobileNav})
  }

  render () {
    let nav = (
      <nav className='MobileNav-closed'>
        <ul className='MobileNav-closed__ul'>
          <li className='MobileNav-closed__li MobileNav-closed__li--logo'>Monster Maker</li>
          <div className='MobileNav-closed__right'>
            <li className='MobileNav-closed__li'>
              <NavLink to='/'>
                <i className='material-icons'>menu</i>
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    )

    if (this.state.showMobileNav) {
      nav = (
        <nav className='MobileNav-open'>
          <div className='MobileNav-open__hamburger'>
            <i className='material-icons'>menu</i>
          </div>
          <ul className='MobileNav-open__ul'>
            <li className='MobileNav-open__li'><NavLink to={'/' + this.props.username}>Home</NavLink></li>
            <li className='MobileNav-open__li'><NavLink to='/monsters/new'>Make</NavLink></li>
            <li className='MobileNav-open__li'><NavLink to='/monsters'>Explore</NavLink></li>
            <li className='MobileNav-open__li'><NavLink to='/'>Log Out</NavLink></li>
          </ul>
        </nav>
      )
    }

    return (
      nav
    )
  }
}

export default MobileNav
