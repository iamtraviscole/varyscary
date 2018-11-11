import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/LikesModal.css'

const LikesModal = (props) => {

  const handleModalClick = () => {
    props.setShowLikesModal()
  }

  let likes = props.likes.map((like, i) => {
    return (
      <li key={i} className='LikesModal__like'>
        <Link to={`/${like}`}>{like}</Link>
      </li>
    )
  })

  return (
    <div className='LikesModal' onClick={handleModalClick}>
      <ul className='LikesModal__likes-ctr'>
        <h1>Liked by</h1>
        {props.likes.length > 0
          ? likes
          : <div className='LikesModal__no-likes'>No likes yet!</div>}
      </ul>
    </div>
  )
}

export default LikesModal
