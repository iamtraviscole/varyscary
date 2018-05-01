import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/Splash.css'

const Splash = (props) => {
  return (
    <div className='Splash'>
      <div className='Splash__ctr'>
        <h1 className='Splash__h1'>Make some monsters</h1>
        <Link to='/signup' className='Splash__btn'>Sign Up</Link>
        <br />
        <Link to='/login' className='Splash__btn Splash__btn--login'>Log In</Link>
      </div>
    </div>
  )
}

export default Splash
