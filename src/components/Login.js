import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Login.css'

class Login extends Component {
  render() {
    return (
      <div className='Login'>
        <div className='Login__ctr'>
          <div className='Login__inner-ctr'>
            <h1 className='Login__h1'>Log In</h1>
            <input type='text' placeholder='Email' className='Login__input' />
            <input type='password' placeholder='Password' className='Login__input' />
            <Link to=''/*username from store*/ className='Login__btn'>Log In</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
