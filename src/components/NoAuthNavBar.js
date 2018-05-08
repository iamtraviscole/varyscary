import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/NoAuthNavBar.css'

const NoAuthNavBar = (props) => {
  return (
    <nav className='NoAuthNavBar'>
      <ul className='NoAuthNavBar__ul'>
        <li className='NoAuthNavBar__li NoAuthNavBar__li--logo'>Monster Maker</li>
        <div className='NoAuthNavBar__right'>
          <li className='NoAuthNavBar__li'>
            <Link className='NoAuthNavBar__btn NoAuthNavBar__btn--login'
              to='/login'>
                Log In
            </Link>
          </li>
          <li className='NoAuthNavBar__li'>
            <Link className='NoAuthNavBar__btn' to='/signup'>Sign Up</Link>
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default NoAuthNavBar
