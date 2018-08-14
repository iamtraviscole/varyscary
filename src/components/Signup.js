import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../styles/Signup.css'
import { signupAuthorizeAndLogin } from '../utils/user'

import Spinner from './Spinner'

class Signup extends Component {

  state = {
    user: {
      email: '',
      username: '',
      password: ''
    }
  }

  handleSignupSubmit = (event) => {
    event.preventDefault()
    signupAuthorizeAndLogin(this.state.user, this.props.history)
  }

  handleInputChange = (event) => {
    this.setState({
      user: {...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  }

  render() {
    let spinner = null
    if (this.props.isFetching) spinner = (
      <div className='Login__spinner'>
        <Spinner />
      </div>
    )

    let signupContent = (
      <form className='Signup' onSubmit={this.handleSignupSubmit}>
        <div className='Signup__ctr'>
          <div className='Signup__inner-ctr'>
            <h1 className='Signup__h1'>Sign Up</h1>
            {spinner}
            <input className='Signup__input'
              name='username'
              type='text'
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleInputChange} />
            <input className='Signup__input'
              name='email'
              type='text'
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleInputChange} />
            <input className='Signup__input'
              name='password'
              type='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleInputChange} />
              <input className='Signup__btn'
                type='submit'
                value='Sign Up'/>
              {/* add password confirmation */}
          </div>
        </div>
      </form>
    )

    if (this.props.username) {
      signupContent = <div className='Signup__already'>
        You are already logged in.
      </div>
    }

    return (
      signupContent
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    isFetching: state.isFetching
  }
}

export default connect(mapStateToProps)(Signup)
