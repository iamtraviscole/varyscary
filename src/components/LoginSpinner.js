import React from 'react'

import '../styles/LoginSpinner.css'

import Spinner from './Spinner'

const LoginSpinner = (props) => {
  return (
    <div className='LoginSpinner'>
      <div className='LoginSpinner__ctr'>
          <Spinner />
      </div>
    </div>
  )
}

export default LoginSpinner
