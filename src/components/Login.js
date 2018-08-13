import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import '../styles/Login.css'
import * as actions from '../actions/actions'

import Spinner from './Spinner'

class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  handleInputChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLoginClick = (event) => {
    event.preventDefault()
    this.props.fetchStarted()
    axios.post('http://localhost:4000/api/user_token',
      {'auth':
        {'email': this.state.email,
        'password': this.state.password}
      }
    )
    .then(res => {
      if (res.data.jwt) {
        localStorage.setItem('user_token', res.data.jwt)
          axios.get('http://localhost:4000/api/current_user_info',
            {'headers': {'Authorization': res.data.jwt} }
          )
          .then(res => {
            this.props.login(res.data.username)
            this.props.fetchEnded()
            this.props.history.push('/')
            console.log(res);
          })
          .catch(err => {
            this.props.fetchEnded()
            if (err.response.status === 401) {
              this.props.logout()
            }
            console.log(err.response);
          })
        console.log(res);
      }
    })
    .catch(err => {
      this.props.fetchEnded()
      console.log(err);
    })
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
      <form className='Login' onSubmit={this.handleLoginClick}>
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
