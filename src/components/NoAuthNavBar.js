import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/NoAuthNavBar.css'
import logo from '../images/varyscary-logo.svg'

const NoAuthNavBar = (props) => {
  return (
    <nav className='NoAuthNavBar'>
      <Link to='/'>
        <img className='NoAuthNavBar__logo' src={logo} alt='logo' height='30'></img>
      </Link>
      <div className='NoAuthNavBar__right'>
          <Link className='NoAuthNavBar__btn NoAuthNavBar__btn--login'
            to='/login'>
              Log In
          </Link>
          <Link className='NoAuthNavBar__btn' to='/signup'>Sign Up</Link>
      </div>
    </nav>
  )
}

export default NoAuthNavBar
