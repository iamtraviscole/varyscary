import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/MonsterSavedModal.css'

const MonsterSavedModal = (props) => {
  console.log(props);
  return (
    <div className='MonsterSavedModal'>
      <div className='MonsterSavedModal__outer-ctr'>
        <div className='MonsterSavedModal__inner-ctr'>
          <div className='MonsterSavedModal__saved'>
            Monster saved!
            <i className="material-icons">mood</i>
          </div>
          <div className='MonsterSavedModal__monster-ctr'>
          </div>
          <div className='MonsterSavedModal__buttons-ctr'>
            <Link className='MonsterSavedModal__link' to='/'>Go to your monsters</Link>
            <button className='MonsterSavedModal__button'>Make another monster</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonsterSavedModal
