import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import '../styles/Logout.css'
import * as actions from '../actions/actions'

class Logout extends Component {

  componentDidMount = () => {
    this.props.logout()
    this.props.setMessage('check_circle', 'You have logged out')
    this.props.history.replace('/')
  }

  render() {
    return (
      <Fragment>
        <div className='Logout__modal-bg'></div>
        <div className='Logout__modal-ctr'>
          <p>Logging out...</p>
        </div>
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
    setMessage: (icon, message) => dispatch(actions.setMessage(icon, message))
  }
}

export default connect(null, mapDispatchToProps)(Logout)
