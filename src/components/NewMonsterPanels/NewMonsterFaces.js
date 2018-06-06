import React from 'react'

import '../../styles/NewMonsterPanels.css'

import * as MonsterFaces from '../MonsterFeatures/MonsterFaces'

const NewMonsterFaces = (props) => {
  return (
    <div className='NewMonsterPanels__features-ctr'>
      <h3 className='NewMonsterPanels__h3'>Faces</h3>
      <div className='NewMonsterPanels__features-inner-ctr'>
        <div className='NewMonsterPanels__features NewMonsterPanels__features--color'>
          color picker here
        </div>
        <div className='NewMonsterPanels__features'>
          <MonsterFaces.Face1 />
        </div>
        <div className='NewMonsterPanels__features'>
          <MonsterFaces.Face2 />
        </div>
        <div className='NewMonsterPanels__features'>
          <MonsterFaces.Face3 />
        </div>
        <div className='NewMonsterPanels__features'>
          <MonsterFaces.Face4 />
        </div>
        <div className='NewMonsterPanels__features'>
          <MonsterFaces.Face5 />
        </div>
        <div className='NewMonsterPanels__features'>
          <MonsterFaces.Face6 />
        </div>
      </div>
    </div>
  )
}

export default NewMonsterFaces
