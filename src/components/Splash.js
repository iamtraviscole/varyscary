import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Splash.css'

class Splash extends Component {

  state = {
    materialIcon: null,
    message: null
  }

  componentWillMount = () => {
    if (this.props.location.state) {
      if (this.props.location.state.message) {
        this.setState({
          message: this.props.location.state.message,
          materialIcon: this.props.location.state.materialIcon
        })
      }
    }
  }

  handleMessageClose = () => {
    this.setState({
      materialIcon: null,
      message: null
    })
    this.props.history.replace(this.props.match.path, null)
  }

  render () {
    let redirectMessage = null
    if (this.state.message) {
      redirectMessage = (
        <p onClick={this.handleMessageClose} className='Splash__redirect-msg'>
          <i className='material-icons'>{this.state.materialIcon}</i>{this.state.message}
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

export default Splash
