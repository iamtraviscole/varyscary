import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/Splash.css'
import * as actions from '../actions/actions'

class Splash extends Component {

  state = {
    message: {
      icon: null,
      text: null
    }
  }

  componentWillMount = () => {
    if (this.props.message) {
      this.setState({
        message: {...this.state.message,
          icon: this.props.message.icon,
          text: this.props.message.text
        }
      })
    }
  }

  componentWillUnmount = () => {
    this.props.clearMessage()
  }

  handleMessageClose = () => {
    this.setState({
      message: {...this.state.message,
        icon: null,
        text: null
      }
    })
    this.props.clearMessage()
  }

  render () {
    let redirectMessage = null
    if (this.state.message) {
      redirectMessage = (
        <p onClick={this.handleMessageClose} className='Splash__redirect-msg'>
          <i className='material-icons'>{this.state.message.icon}</i>{this.state.message.text}
        </p>
      )
    }

    return (
      <div className='Splash'>
        <div className='Splash__ctr'>
          <div className='Splash__redirect-ctr'>
            {redirectMessage}
          </div>
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
    message: state.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => dispatch(actions.clearMessage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
