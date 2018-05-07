import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/Login.css'
import * as actions from '../actions/actions'

class Login extends Component {

  handleLoginClick = () => {
    this.props.login('Peter')
  }

  render() {
    return (
      <div className='Login'>
        <div className='Login__ctr'>
          <div className='Login__inner-ctr'>
            <h1 className='Login__h1'>Log In</h1>
            <input type='text' placeholder='Email' className='Login__input' />
            <input type='password' placeholder='Password' className='Login__input' />
            <Link to='/'
              className='Login__btn'
              onClick={this.handleLoginClick}>Log In</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username) => dispatch(actions.login(username)),
  }
}

export default connect(null, mapDispatchToProps)(Login)