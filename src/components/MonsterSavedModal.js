import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/MonsterSavedModal.css'

import MonsterFromStore from './MonsterFromStore'

const MonsterSavedModal = (props) => {

  const handleModalClick = () => {
    props.setShowModal()
    props.setActivePanelBodies()
  }

  const handleMakeAnotherClick = () => {
    props.resetMonster()
  }

  return (
    <div className='MonsterSavedModal' onClick={handleModalClick}>
      <div className='MonsterSavedModal__outer-ctr'>
        <div className='MonsterSavedModal__inner-ctr'>
          <div className='MonsterSavedModal__saved'>
            Monster created!
            <i className="material-icons">mood</i>
          </div>
          <div className='MonsterSavedModal__monster-ctr'>
            <MonsterFromStore />
          </div>
          <div className='MonsterSavedModal__buttons-ctr'>
            <Link className='MonsterSavedModal__btn' to={`/${props.username}`}>Your monsters</Link>
            <button className='MonsterSavedModal__btn'
              onClick={handleMakeAnotherClick}>
              Make another
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonsterSavedModal
