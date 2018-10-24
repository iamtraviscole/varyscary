import React from 'react'

import '../styles/NewMonsterButton.css'

const NewMonsterButton = (props) => {
  let active = ''
  if (props.activePanel === props.activePanelName) {
    active = ' NewMonsterButton__features-btn--active'
  }

  let button = props.noBodySelected
    ? <button className={'NewMonsterButton__features-btn-disabled'}>
        <span className='NewMonsterButton__tooltip'>no body selected</span>
        {props.children}
      </button>
    : <button className={'NewMonsterButton__features-btn' + active}
        onClick={() => props.handleActivePanel(props.activePanelName)}>
        {props.children}
      </button>

  return (
    button
  )
}

export default NewMonsterButton
