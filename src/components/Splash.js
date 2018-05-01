import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/Splash.css'

const Splash = (props) => {
  return (
    <div className='Splash'>
      <div className='Splash__ctr'>
        <h1>Make some monsters</h1>
        <Link to='/signup' className='Splash__signup-btn'>Sign Up</Link>
        <p>Already have an account?</p>
        <Link to='/login' className='Splash__login'>Log In</Link>
      </div>
    </div>
  )
}

export default Splash
