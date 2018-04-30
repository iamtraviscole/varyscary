import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render = { props => {
      return rest.isLoggedIn ? <Component {...rest} /> : <Redirect to='/'/>
    }} />
  )
}

export default AuthRoute
