import React from 'react'

import '../styles/Spinner.css'

const Spinner = (props) => {
  return (
    <div className='Spinner__ctr'>
      <div className='Spinner__ring'></div>
      <div className='Spinner__ring Spinner__ring--delay'></div>
    </div>
  )
}

export default Spinner
