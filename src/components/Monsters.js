import React, { Fragment } from 'react'

import '../styles/Monsters.css'
import monsters from '../stub/monsters'

import Monster from './Monster'
import NoAuthNavBar from './NoAuthNavBar'

const Monsters = (props) => {

  let monstersArr = monsters.map(monster => {
    return (
      <Monster
        key={monster.id}
        name={monster.name}
        eyes={monster.eyes}
        mouth={monster.mouth}
        body={monster.body}
      />
    )
  })

  return (
    <Fragment>
      <div className='Monsters__NavBar'>
        <NoAuthNavBar />
      </div>
      <div className='Monsters'>
        <h1>Monsters</h1>
        <div className='Monsters__ctr'>
          {monstersArr}
        </div>
      </div>
    </Fragment>
  )
}

export default Monsters
