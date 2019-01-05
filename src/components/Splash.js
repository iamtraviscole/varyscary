import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/Splash.css'
import * as actions from '../actions/index'

class Splash extends Component {

  componentWillUnmount = () => {
    this.props.clearMessage()
  }

  handleMessageClose = () => {
    this.props.clearMessage()
  }

  render () {
    let message = null
    if (this.props.message.text) {
      message = (
        <div className='Splash__msg-ctr'>
          <p onClick={this.handleMessageClose} className='Splash__msg'>
            <i className='material-icons'>{this.props.message.icon}</i>{this.props.message.text}
          </p>
        </div>
      )
    }

    return (
      <div className='Splash'>
        <div className='Splash__ctr'>
          {message}
          <div className='Splash__inner-ctr'>
            <h1 className='Splash__h1'>Make some monsters</h1>
            <Link to='/signup' className='Splash__btn'>Sign Up</Link>
            <br />
            <Link to='/login' className='Splash__btn Splash__btn--login'>Log In</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.user.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => dispatch(actions.clearMessage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
