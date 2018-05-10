import React from 'react'

import '../styles/NoMatch.css'

const NoMatch = (props) => {
  return (
    <div className='NoMatch'>
      <h1>404</h1>
      <h3 className='NoMatch__h3'>{props.location.pathname} not found</h3>
      <button className='NoMatch__btn'
        onClick={() => props.history.goBack()}>Go Back</button>
    </div>
  )
}

export default NoMatch
