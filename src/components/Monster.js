import React from 'react'

import '../styles/Monster.css'

const Monster = (props) => {
  return (
    <div className='Monster'>
      <div className='Monster__name'>{props.name}</div>
      <div className='Monster__eyes'>{props.eyes}</div>
      <div className='Monster__mouth'>{props.mouth}</div>
      <div className='Monster__body'>{props.body}</div>
    </div>
  )
}

export default Monster
