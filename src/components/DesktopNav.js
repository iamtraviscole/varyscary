import React from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/DesktopNav.css'

const NavBar = (props) => {
  return (
    <nav className='DesktopNav'>
      <ul className='DesktopNav__ul'>
        <li className='DesktopNav__li DesktopNav__li--logo'>Monster Maker</li>
        <div className='DesktopNav__right'>
          <li className='DesktopNav__li'><NavLink to={'/' + props.username}>Home</NavLink></li>
          <li className='DesktopNav__li'><NavLink to='/monsters/new'>Make</NavLink></li>
          <li className='DesktopNav__li'><NavLink to='/monsters'>Explore</NavLink></li>
          <li className='DesktopNav__li'><NavLink to='/'>
            <i className='material-icons'>account_circle arrow_drop_down</i>
          </NavLink></li>
        </div>
      </ul>
    </nav>
  )
}

export default NavBar
