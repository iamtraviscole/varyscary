import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import '../styles/Signup.css'
import * as actions from '../actions/index'

import Spinner from './Spinner'
import AlreadyLoggedIn from './AlreadyLoggedIn'

class Signup extends Component {

  state = {
    user: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {
      username: null,
      email: null,
      password: null,
      passwordConfirmation: null
    }
  }

  baseURL = 'http://localhost:4000/api'

  noFieldErrors = () => {
    for (var key in this.state.errors) {
      if (this.state.errors[key] !== null)
        return false
    }
    return true
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

  authorize = (user) => {
    this.props.fetchStarted()
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
      console.log(err)
      this.props.fetchEnded()
    })
  }

  handleSignupSubmit = (event) => {
    event.preventDefault()
    const user = this.state.user
    if (this.noFieldErrors() && this.state.user.username) {
      this.props.fetchStarted()
      axios.post(`${this.baseURL}/users`,
        {'user':
          {'username': user.username,
            'email': user.email,
            'password': user.password,
            'password_confirmation': user.passwordConfirmation}
        }
      )
      .then(res => {
        this.authorize(user)
      })
      .catch(err => {
        console.log(err.response);
        this.props.fetchEnded()
      })
    }
  }

  handleInputChange = (event) => {
    this.setState({
      user: {...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  }

  checkUsernameAvail = (username) => {
    let usernameAvail = axios.get(`${this.baseURL}/check_username_avail?username=${username}`)
    .then(res => {
      return res.data ? true : false
    })
    .catch(err => {
      console.log(err.response);
    })
    return usernameAvail
  }

  checkEmailAvail = (email) => {
    let emailAvail = axios.get(`${this.baseURL}/check_email_avail?email=${email}`)
    .then(res => {
      return res.data ? true : false
    })
    .catch(err => {
      console.log(err.response);
    })
    return emailAvail
  }

  handleUsernameLeave = () => {
    const username = this.state.user.username
    const errors = this.state.errors
    if (username.length < 3) {
      this.setState({
        errors: {...errors,
          username: 'Username too short (3 characters min)'
        }
      })
    } else if (username.length > 25) {
      this.setState({
        errors: {...errors,
          username: 'Username too long (25 characters max)'
        }
      })
    } else if (username.includes(' ')) {
        this.setState({
          errors: {...errors,
            username: 'Username can\'t contain spaces'
          }
      })
    } else {
      this.checkUsernameAvail(username).then((avail) => {
        if (!avail) {
          this.setState({
            errors: {...errors,
              username: 'Username already taken'
            }
          })
        } else {
          this.setState({
            errors: {...errors,
              username: null
            }
          })
        }
      })
    }
  }

  handleEmailLeave = (event) => {
    const email = this.state.user.email
    const errors = this.state.errors
    if (email.length === 0) {
      this.setState({
        errors: {...errors,
          email: 'Email can\'t be blank'
        }
      })
    } else if (!email.includes('@')) {
      this.setState({
        errors: {...errors,
          email: 'Invalid email'
        }
      })
    } else if (email.includes(' ')) {
      this.setState({
        errors: {...errors,
          email: 'Email can\'t contain spaces'
        }
      })
    } else {
      this.checkEmailAvail(email).then((avail) => {
        if (!avail) {
          this.setState({
            errors: {...errors,
              email: 'Email already taken'
            }
          })
        } else {
          this.setState({
            errors: {...errors,
              email: null
            }
          })
        }
      })
    }
  }

  handlePasswordLeave = () => {
    if (this.state.user.password.length === 0) {
      this.setState({
        errors: {...this.state.errors,
          password: 'Password can\'t be blank'
        }
      })
    } else {
      this.setState({
        errors: {...this.state.errors,
          password: null
        }
      })
    }
  }

  handlePasswordConfirmationLeave = () => {
    if (this.state.user.passwordConfirmation.length === 0) {
      this.setState({
        errors: {...this.state.errors,
          passwordConfirmation: 'Confirmation can\'t be blank'
        }
      })
    } else if (this.state.user.password !== this.state.user.passwordConfirmation) {
      this.setState({
        errors: {...this.state.errors,
          passwordConfirmation: 'Confirmation doesn\'t match'
        }
      })
    } else {
      this.setState({
        errors: {...this.state.errors,
          passwordConfirmation: null
        }
      })
    }
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

    let signupContent = (
      <form className='Signup' onSubmit={this.handleSignupSubmit}>
        <div className='Signup__ctr'>
          <div className='Signup__inner-ctr'>
            <h1 className='Signup__h1'>Sign Up</h1>
            {spinner}
            {this.state.errors.username
            ? <div className='Signup__input-error'>
                {this.state.errors.username}
              </div>
            : null}
            <input className='Signup__input'
              name='username'
              type='text'
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleInputChange}
              onBlur={this.handleUsernameLeave} />
            {this.state.errors.email
            ? <div className='Signup__input-error'>
                {this.state.errors.email}
              </div>
            : null}
            <input className='Signup__input'
              name='email'
              type='text'
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleInputChange}
              onBlur={this.handleEmailLeave} />
            {this.state.errors.password
            ? <div className='Signup__input-error'>
                {this.state.errors.password}
              </div>
            : null}
            <input className='Signup__input'
              name='password'
              type='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleInputChange}
              onBlur={this.handlePasswordLeave} />
            {this.state.errors.passwordConfirmation
            ? <div className='Signup__input-error'>
                {this.state.errors.passwordConfirmation}
              </div>
            : null}
            <input className='Signup__input'
              name='passwordConfirmation'
              type='password'
              placeholder='Confirm Password'
              value={this.state.passwordConfirmation}
              onChange={this.handleInputChange}
              onBlur={this.handlePasswordConfirmationLeave} />
            <input className='Signup__btn'
              type='submit'
              value='Sign Up' />
          </div>
        </div>
      </form>
    )

    if (this.props.username) {
      signupContent = <AlreadyLoggedIn
        handleGoBack={this.handleGoBack}
        handleLogout={this.handleLogout} />
    }

    return (
      signupContent
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    isFetching: state.request.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username) => dispatch(actions.login(username)),
    logout: () => dispatch(actions.logout()),
    fetchStarted: () => dispatch(actions.fetchStarted()),
    fetchEnded: () => dispatch(actions.fetchEnded())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
