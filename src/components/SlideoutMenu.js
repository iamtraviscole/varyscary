import React from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/SlideoutMenu.css'

const SlideoutMenu = (props) => {
  return (
    <nav onClick={props.handleSlideoutClick} className={'SlideoutMenu ' + props.toggleSlideout}>
      <div className='SlideoutMenu__hamburger'>
        <button className='SlideoutMenu__button'>
          <i className='material-icons'>close</i>
        </button>
      </div>
      <ul className='SlideoutMenu__ul'>
        <li className='SlideoutMenu__li'><NavLink to={'/' + props.username}>Home</NavLink></li>
        <li className='SlideoutMenu__li'><NavLink to='/monsters/new'>Make</NavLink></li>
        <li className='SlideoutMenu__li'><NavLink to='/monsters'>Explore</NavLink></li>
        <li className='SlideoutMenu__li'><NavLink to='/logout'>Log Out</NavLink></li>
      </ul>
    </nav>
  )
}

export default SlideoutMenu
