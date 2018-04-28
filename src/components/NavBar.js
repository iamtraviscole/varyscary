import React from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/NavBar.css'

const NavBar = (props) => {
  return (
    <div className='NavBar'>
      <ul className='NavBar__ul'>
        <li className='NavBar__li NavBar__li--logo'>Monster Maker</li>
        <li className='NavBar__li'><NavLink to='/'>Link1</NavLink></li>
        <li className='NavBar__li'><NavLink to='/'>Link2</NavLink></li>
        <li className='NavBar__li'><NavLink to='/'>Link3</NavLink></li>
        <li className='NavBar__li NavBar__li--right'><NavLink to='/'>Link4</NavLink></li>
      </ul>
    </div>
  )
}

export default NavBar
