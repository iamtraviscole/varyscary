import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/Login.css'
import * as actions from '../actions/actions'

class Login extends Component {

  handleLoginClick = () => {
    this.props.authenticateUser('user2@email.com', 'user2pw')
  }

  render() {
    let loginContent = (
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
    if (this.props.username) {
      loginContent = <div>You are already logged in.</div>
    }

    return (
      loginContent
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (email, pw) => dispatch(actions.authenticateUser(email, pw)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
