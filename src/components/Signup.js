import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../styles/Signup.css'
import { signupAuthorizeAndLogin, checkUsernameAvail, checkEmailAvail } from '../utils/user'

import Spinner from './Spinner'

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

  noFieldErrors = () => {
    for (var key in this.state.errors) {
      if (this.state.errors[key] !== null)
        return false
    }
    return true
  }

  handleSignupSubmit = (event) => {
    event.preventDefault()
    if (this.noFieldErrors() && this.state.user.username) {
      signupAuthorizeAndLogin(this.state.user, this.props.history)
    }
  }

  handleInputChange = (event) => {
    this.setState({
      user: {...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  }

  handleUsernameLeave = () => {
    if (this.state.user.username.length === 0) {
      this.setState({
        errors: {...this.state.errors,
          username: 'Username can\'t be blank'
        }
      })
    } else if (this.state.user.username.includes(' ')) {
      this.setState({
        errors: {...this.state.errors,
          username: 'Username can\'t contain spaces'
        }
      })
    } else {
      checkUsernameAvail(this.state.user.username).then((avail) => {
        if (!avail) {
          this.setState({
            errors: {...this.state.errors,
              username: 'Username already taken'
            }
          })
        } else {
          this.setState({
            errors: {...this.state.errors,
              username: null
            }
          })
        }
      })
    }
  }

  handleEmailLeave = (event) => {
    if (this.state.user.email.length === 0) {
      this.setState({
        errors: {...this.state.errors,
          email: 'Email can\'t be blank'
        }
      })
    } else if (!this.state.user.email.includes('@')) {
      this.setState({
        errors: {...this.state.errors,
          email: 'Invalid email'
        }
      })
    } else if (this.state.user.email.includes(' ')) {
      this.setState({
        errors: {...this.state.errors,
          email: 'Email can\'t contain spaces'
        }
      })
    } else {
      checkEmailAvail(this.state.user.email).then((avail) => {
        if (!avail) {
          this.setState({
            errors: {...this.state.errors,
              email: 'Email already taken'
            }
          })
        } else {
          this.setState({
            errors: {...this.state.errors,
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
