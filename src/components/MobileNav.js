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
      <nav className='MobileNav--closed'>
        <div className='MobileNav__hamburger--closed'>
          <i className='material-icons'>menu</i>
        </div>
      </nav>
    )

    if (this.state.showMobileNav) {
      nav = (
        <nav className='MobileNav--open'>
          <div className='MobileNav__hamburger--open'>
            <i className='material-icons'>menu</i>
          </div>
          <ul className='MobileNav__ul--open'>
            <li className='MobileNav__li--open'><NavLink to={'/' + this.props.username}>Home</NavLink></li>
            <li className='MobileNav__li--open'><NavLink to='/monsters/new'>Make</NavLink></li>
            <li className='MobileNav__li--open'><NavLink to='/monsters'>Explore</NavLink></li>
            <li className='MobileNav__li--open'><NavLink to='/'>Log Out</NavLink></li>
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
