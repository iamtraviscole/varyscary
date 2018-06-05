import React from 'react'

import '../../styles/NewMonsterPanels.css'

import * as MonsterBodies from '../MonsterFeatures/MonsterBodies'

const NewMonsterBodies = (props) => {
  return (
    <div className='NewMonsterPanels__features-ctr'>
      <h3 className='NewMonsterPanels__h3'>Bodies</h3>
      <div className='NewMonsterPanels__features-inner-ctr'>
        <div className='NewMonsterPanels__features NewMonsterPanels__features--color'>
          color picker here
        </div>
        <div className='NewMonsterPanels__features'>
          <MonsterBodies.Body1 />
        </div>
        <div className='NewMonsterPanels__features'>
          <MonsterBodies.Body2 />
        </div>
        <div className='NewMonsterPanels__features'>
          <MonsterBodies.Body3 />
        </div>
        <div className='NewMonsterPanels__features'>
          <MonsterBodies.Body4 />
        </div>
        <div className='NewMonsterPanels__features'>
          <MonsterBodies.Body5 />
        </div>
        <div className='NewMonsterPanels__features'>
          <MonsterBodies.Body6 />
        </div>
        <div className='NewMonsterPanels__features'>
          <MonsterBodies.Body7 />
        </div>
        <div className='NewMonsterPanels__features'>
          <MonsterBodies.Body8 />
        </div>
      </div>
    </div>
  )
}

export default NewMonsterBodies
