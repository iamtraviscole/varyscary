import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/NavBar.css'

class NavBar extends Component {
  state = {
    userOnMobile: true
   }

  render () {

    let navItems = (
      <div className='NavBar__right'>
        <li className='NavBar__li'><NavLink to={'/' + this.props.username}>Home</NavLink></li>
        <li className='NavBar__li'><NavLink to='/monsters/new'>Make</NavLink></li>
        <li className='NavBar__li'><NavLink to='/monsters'>Explore</NavLink></li>
        <li className='NavBar__li'>
          <button className='NavBar__button'>
            <i className='material-icons'>account_circle</i>
          </button>
        </li>
      </div>
    )

    if (this.state.userOnMobile) {
      navItems = (
        <div className='NavBar__right'>
          <li className='NavBar__li'>
            <button className='NavBar__button'>
              <i className='material-icons'>menu</i>
            </button>
          </li>
        </div>
      )
    }

    return (
      <nav className='NavBar'>
        <ul className='NavBar__ul'>
          <li className='NavBar__li NavBar__li--logo'>Monster Maker</li>
            {navItems}
        </ul>
      </nav>
    )
  }
}

export default NavBar
