import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../styles/Login.css'
import * as actions from '../actions/actions'
import { authorizeAndLogin } from '../utils/userSession'

import Spinner from './Spinner'
import AlreadyLoggedIn from './AlreadyLoggedIn'

class Login extends Component {

  state = {
    user: {
      email: '',
      password: ''
    }
  }

  componentWillUnmount = () => {
    this.props.clearMessage()
  }

  handleMessageClose = () => {
    this.props.clearMessage()
  }

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

  handleGoBack = () => {
    this.props.history.goBack()
  }

  handleLogout = () => {
    this.props.history.push('/logout')
  }

  render() {
    let spinner = null
    if (this.props.isFetching) spinner = (
      <div className='Login__spinner'>
        <Spinner />
      </div>
    )

    let message = null
    if (this.props.message.text) {
      message = (
        <div className='Login__msg-ctr'>
          <p onClick={this.handleMessageClose} className='Login__msg'>
            <i className='material-icons'>{this.props.message.icon}</i>{this.props.message.text}
          </p>
        </div>
      )
    }

    let loginContent = (
    <div>
      <form className='Login' onSubmit={this.handleLoginSubmit}>
        <div className='Login__ctr'>
          {message}
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
      loginContent = <AlreadyLoggedIn
        handleGoBack={this.handleGoBack}
        handleLogout={this.handleLogout} />
    }

    return (
      loginContent
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    isFetching: state.isFetching,
    message: state.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username) => dispatch(actions.login(username)),
    logout: () => dispatch(actions.logout()),
    fetchStarted: () => dispatch(actions.fetchStarted()),
    fetchEnded: () => dispatch(actions.fetchEnded()),
    clearMessage: () => dispatch(actions.clearMessage()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
