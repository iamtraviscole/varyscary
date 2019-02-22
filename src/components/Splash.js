import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/Splash.css'
import logomark from '../images/varyscary-logomark.svg'
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
            <img className='Splash__logo' src={logomark} alt='logomark' height='40'></img>
            <h1>Make monsters</h1>
            <Link to='/login' className='Splash__btn Splash__btn--login'>Log In</Link>
            <br />
            <Link to='/signup' className='Splash__btn'>Sign Up</Link>
          </div>
          <Link  to='/monsters' className='Splash__explore-btn'>Explore</Link>
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
