import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import '../styles/Login.css'
import * as actions from '../actions/index'

import Spinner from './Spinner'
import AlreadyLoggedIn from './AlreadyLoggedIn'

class Login extends Component {

  state = {
    user: {
      email: '',
      password: ''
    }
  }

  baseURL = 'http://localhost:4000/api'

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

  login = (token) => {
    axios.get(`${this.baseURL}/current_user_info`,
      {'headers': {'Authorization': token} }
    )
    .then(res => {
      this.props.login(res.data.username)
      this.props.history.push('/')
      this.props.fetchEnded()
    })
    .catch(err => {
      if (err.response.status === 401) {
        this.props.logout()
      }
      this.props.fetchEnded()
    })
  }

  handleLoginSubmit = (event) => {
    event.preventDefault()
    this.props.fetchStarted()
    const user = this.state.user
    axios.post(`${this.baseURL}/user_token`,
      {'auth':
        {'email': user.email,
        'password': user.password}
      }
    )
    .then(res => {
      if (res.data.jwt) {
        localStorage.setItem('user_token', res.data.jwt)
        this.login(res.data.jwt)
      }
    })
    .catch(err => {
      this.props.fetchEnded()
      this.props.setMessage('Incorrect email or password')
    })
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
    username: state.user.username,
    message: state.user.message,
    isFetching: state.request.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username) => dispatch(actions.login(username)),
    logout: () => dispatch(actions.logout()),
    fetchStarted: () => dispatch(actions.fetchStarted()),
    fetchEnded: () => dispatch(actions.fetchEnded()),
    setMessage: (message) => dispatch(actions.setMessage(message)),
    clearMessage: () => dispatch(actions.clearMessage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
