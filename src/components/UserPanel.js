import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import '../styles/UserPanel.css'

const UserPanel = (props) => {

  let panelContent = null

  if (props.toggleUserPanel === 'show') {
    panelContent = (
      <Fragment>
        <p className='UserPanel__username'>{props.username}</p>
        <ul className='UserPanel__ul'>
          <li className='UserPanel__li'>
            <Link to={'/' + props.username}>Your monsters</Link>
          </li>
          <li className='UserPanel__li'>
            <Link to={`/${props.username}/likes`}>Your favorites</Link>
          </li>
        </ul>
        <hr />
        <Link to='/logout' className='UserPanel__logout-btn'>Logout</Link>
      </Fragment>
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
