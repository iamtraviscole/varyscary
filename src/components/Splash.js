import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Splash.css'

const Splash = (props) => {
  return (
    <Fragment>
      <div className='Splash__ctr'>
        <h1 className='Splash__h1'>Make some monsters</h1>
        <Link to='/signup' className='Splash__btn'>Sign Up</Link>
        <br />
        <Link to='/login' className='Splash__btn Splash__btn--login'>Log In</Link>
      </div>
  </Fragment>
  )
}

export default Splash
