import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Splash.css'

class Splash extends Component {

  state = {
    message: null
  }

  componentWillMount = () => {
    if (this.props.location.state) {
      if (this.props.location.state.message) {
        this.setState({
          message: this.props.location.state.message
        })
      }
    }
  }

  handleMessageClose = () => {
    this.setState({message: null})
  }

  render () {
    let redirectMessage = null
    if (this.state.message) {
      redirectMessage = (
        <p className='Splash__redirect-msg'>
          {this.state.message}<i className='material-icons'>close</i>
        </p>
      )
    }

    return (
      <div className='Splash'>
        <div className='Splash__ctr'>
          <div onClick={this.handleMessageClose} className='Splash__redirect-ctr'>
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
