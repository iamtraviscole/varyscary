import React from 'react'

import '../styles/AlreadyLoggedIn.css'

const AlreadyLoggedIn = (props) => {
  return (
    <div className='AlreadyLoggedIn__ctr'>
      <h3>You are already logged in.</h3>
      <button className='AlreadyLoggedIn__back-btn'
        onClick={props.handleGoBack}>Go Back</button>
      <button className='AlreadyLoggedIn__logout-btn'
        onClick={props.handleLogout}>Logout</button>
    </div>
  )
}

export default AlreadyLoggedIn
