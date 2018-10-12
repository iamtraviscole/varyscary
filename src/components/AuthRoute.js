import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../actions/actions'

class AuthRoute extends Component {
  render() {
    const {component: Component, ...rest} = this.props
    let componentOrRedirect
    if (this.props.username) {
      componentOrRedirect = <Component {...rest} />
    } else {
      this.props.setMessage('You must be logged in to view that page')
      componentOrRedirect = <Redirect to='/' />
    }
    return (
      <Route {...rest} render = { props => {
        return componentOrRedirect
      }} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (icon, text) => dispatch(actions.setMessage(icon, text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute)
