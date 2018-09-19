import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = ({component: Component, ...rest}) => {
  let componentOrRedirect
  if (rest.isLoggedIn) {
    componentOrRedirect = <Component {...rest} />
  } else {
    rest.setMessage('You must be logged in to view that page')
    componentOrRedirect = <Redirect to='/' />
  }
  return (
    <Route {...rest} render = { props => {
      return componentOrRedirect
    }} />
  )
}

export default AuthRoute
