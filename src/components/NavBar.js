import React from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/NavBar.css'

const NavBar = (props) => {
  return (
    <div className='NavBar'>
      <nav>
        <ul className='NavBar__ul'>
          <li className='NavBar__li NavBar__li--logo'>Monster Maker</li>
          <div className='NavBar__right'>
            <li className='NavBar__li'><NavLink to={'/' + props.username}>Home</NavLink></li>
            <li className='NavBar__li'><NavLink to='/monsters/new'>Make</NavLink></li>
            <li className='NavBar__li'><NavLink to='/monsters'>Explore</NavLink></li>
            <li className='NavBar__li NavBar__li--right'><NavLink to='/'>Log Out</NavLink></li>
          </div>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
