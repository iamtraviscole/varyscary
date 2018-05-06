import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/UserPanel.css'

const UserPanel = (props) => {

  let panelContent = null

  if (props.toggleUserPanel === 'show') {
    panelContent = (
      <div className='UserPanel__content--delay'>
        <p className='UserPanel__username'>{props.username}</p>
        <p className='UserPanel__email'>peteremail@gmail.com</p>
        <hr />
        <Link to='/logout' className='UserPanel__logout-btn'>Logout</Link>
      </div>
    )
  }

  return (
      <div onClick={props.handleUserPanelClick}
        className={'UserPanel ' + props.toggleUserPanel}>
        {panelContent}
      </div>
  )
}

export default UserPanel
