import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Signup.css'

class Signup extends Component {

  handleSignupClick = () => {
    console.log('Signed Up');
  }

  render() {
    return (
      <div className='Signup'>
        <div className='Signup__ctr'>
          <div className='Signup__inner-ctr'>
            <h1 className='Signup__h1'>Sign Up</h1>
            <input type='text' placeholder='Email' className='Signup__input' />
            <input type='text' placeholder='Username' className='Signup__input' />
            <input type='password' placeholder='Password' className='Signup__input' />
            <Link to='/'
              className='Signup__btn'
              onClick={this.handleSignupClick}>Sign Up</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup
