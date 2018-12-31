import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/NoAuthNavBar.css'

const NoAuthNavBar = (props) => {
  return (
    <nav className='NoAuthNavBar'>
      <div className='NoAuthNavBar__logo'>Logo Here</div>
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
