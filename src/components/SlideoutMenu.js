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
      <div className='SlideoutMenu__link-ctr'>
        <div className='SlideoutMenu__link-inner-ctr'>
          <NavLink className='SlideoutMenu__link' to='/'>Home</NavLink>
          <NavLink className='SlideoutMenu__link' to='/monsters/new'>Create</NavLink>
          <NavLink className='SlideoutMenu__link' to='/monsters'>Explore</NavLink>
          <NavLink className='SlideoutMenu__link' to={`/${props.username}`}>Your Monsters</NavLink>
          <NavLink className='SlideoutMenu__link' to={`/${props.username}/favorites`}>Your Favorites</NavLink>
          <NavLink className='SlideoutMenu__link' to='/logout'>Log Out</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default SlideoutMenu
