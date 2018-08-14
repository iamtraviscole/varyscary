import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../styles/Login.css'
import * as actions from '../actions/actions'
import { authorizeAndLogin } from '../utils/user'

import Spinner from './Spinner'

class Login extends Component {

  state = {
    user: {
      email: '',
      password: ''
    }
  }

  // handleInputChange = (event) => {
  //   this.setState({[event.target.name]: event.target.value})
  // }

  handleInputChange = (event) => {
    this.setState({
      user: {...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  }

  handleLoginSubmit = (event) => {
    event.preventDefault()
    authorizeAndLogin(this.state.user, this.props.history)
  }

  render() {
    let spinner = null
    if (this.props.isFetching) spinner = (
      <div className='Login__spinner'>
        <Spinner />
      </div>
    )

    let loginContent = (
    <div>
      <form className='Login' onSubmit={this.handleLoginSubmit}>
        <div className='Login__ctr'>
          <div className='Login__inner-ctr'>
            <h1 className='Login__h1'>Log In</h1>
            {spinner}
            <input className='Login__input'
              name='email'
              type='text'
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleInputChange} />
            <input className='Login__input'
              name='password'
              type='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleInputChange} />
            <input className='Login__btn'
              type='submit'
              value='Log In'/>
            </div>
          </div>
        </form>
      </div>
    )

    if (this.props.username) {
      loginContent = <div className='Login__already'>
        You are already logged in.
      </div>
    }

    return (
      loginContent
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    isFetching: state.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username) => dispatch(actions.login(username)),
    logout: () => dispatch(actions.logout()),
    fetchStarted: () => dispatch(actions.fetchStarted()),
    fetchEnded: () => dispatch(actions.fetchEnded()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
