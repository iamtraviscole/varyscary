import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Splash.css'

class Splash extends Component {

  render () {
    return (
      <div className='Splash'>
        <div className='Splash__ctr'>
          <div className='Splash__inner-ctr'>
            <h1 className='Splash__h1'>Make some monsters</h1>
            <Link to='/signup' className='Splash__btn'>Sign Up</Link>
            <br />
            <Link to='/login' className='Splash__btn Splash__btn--login'>Log In</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Splash
