import React from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/NavBar.css'

const NavBar = (props) => {
  return (
    <div className='NavBar'>
      <ul className='NavBar__ul'>
        <li className='NavBar__li NavBar__li--logo'>Monster Maker</li>
        <li className='NavBar__li'><NavLink to='/'>Home</NavLink></li>
        <li className='NavBar__li'><NavLink to='/username/monsters/new'>Make</NavLink></li>
        <li className='NavBar__li'><NavLink to='/username/monsters'>Browse</NavLink></li>
        <li className='NavBar__li NavBar__li--right'><NavLink to='/'>Log Out</NavLink></li>
      </ul>
    </div>
  )
}

export default NavBar
