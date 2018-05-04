import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/Splash.css'
import * as actions from '../actions/actions'

class Splash extends Component {

  handleLoginClick = () => {
    this.props.setUsername('Peter')
  }

  render () {
    return (
      <Fragment>
        <div className='Splash__ctr'>
          <h1 className='Splash__h1'>Make some monsters</h1>
          <Link to='/signup' className='Splash__btn'>Sign Up</Link>
          <br />
          <Link to='/login'
            className='Splash__btn Splash__btn--login'
            onClick={this.handleLoginClick}
            >Log In</Link>
        </div>
    </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (username) => dispatch(actions.setUsername(username)),
  }
}

export default connect(null, mapDispatchToProps)(Splash)
