import React from 'react'

import '../styles/NewMonsterButton.css'

const NewMonsterButton = (props) => {
  const active = (
    props.activePanel === props.activePanelName
      ? ' NewMonsterButton__features-btn--active'
      : ''
  )

  return (
    <button className={'NewMonsterButton__features-btn' + active}
      onClick={() => props.handleActivePanel(props.activePanelName)}>
      {props.children}
    </button>
  )
}

export default NewMonsterButton
