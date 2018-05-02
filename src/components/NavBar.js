import React from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/NavBar.css'

const NavBar = (props) => {
  return (
    <nav className='NavBar'>
      <ul className='NavBar__ul'>
        <li className='NavBar__li NavBar__li--logo'>Monster Maker</li>
        <div className='NavBar__right'>
          <li className='NavBar__li'><NavLink to={'/' + props.username}>Home</NavLink></li>
          <li className='NavBar__li'><NavLink to='/monsters/new'>Make</NavLink></li>
          <li className='NavBar__li'><NavLink to='/monsters'>Explore</NavLink></li>
          <li className='NavBar__li'><NavLink to='/'>
            <i className='material-icons'>account_circle arrow_drop_down</i>
          </NavLink></li>
        </div>
      </ul>
    </nav>
  )
}

export default NavBar
