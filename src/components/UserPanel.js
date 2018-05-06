import React from 'react'

import '../styles/UserPanel.css'

const UserPanel = (props) => {

  let panelContent = (
    <div></div>
  )

  if (props.toggleUserPanel === 'show') {
    panelContent = (
      <div className='UserPanel__content--delay'>
        <p>Username</p>
        <p>Email</p>
        <hr />
        <p>Logout</p>
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
