import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import '../styles/Monsters.css'
import * as monsterUtil from '../utils/monster'

import Monster from './Monster'
import NoAuthNavBar from './NoAuthNavBar'
import Spinner from './Spinner'

class Monsters extends Component  {
  state = {
    sortBy: 'newest',
    offset: 0,
    monsters: []
  }

  componentDidMount = () => {
    let monsters = []
    monsterUtil.getMonsters(this.state.sortBy, this.state.offset)
    .then(monstersObj => {
      monstersObj.forEach(monster => {
        monsters.push(monster)
      })
      this.setState({monsters: monsters})
    })
  }

  render() {
    let monstersArr = this.state.monsters.map(monster => {
      return (
        <div key={monster.id} className='Monsters__monster-outer-ctr'>
          <Monster
            name={monster.name}
            bodyType={monster.body_type} bodyFill={monster.body_fill}
            faceType={monster.face_type} faceFill={monster.face_fill}
            headwearType={monster.headwear_type} headwearFill={monster.headwear_fill}
            eyesType={monster.eyes_type} eyesFill={monster.eyes_fill}
            mouthType={monster.mouth_type} mouthFill={monster.mouth_fill}
            rightArmType={monster.right_arm_type} rightArmFill={monster.right_arm_fill}
            leftArmType={monster.left_arm_type} leftArmFill={monster.left_arm_fill}
            legsType={monster.legs_type} legsFill={monster.legs_fill}
            creator={monster.user.username}
            withDetails={true}
          />
        </div>
      )
    })

    let noAuthNav = null
    if (!this.props.username) {
      noAuthNav = (
        <div className='Monsters__NavBar'>
          <NoAuthNavBar />
        </div>
      )
    }

    return (
      <Fragment>
        {noAuthNav}
        <div className='Monsters'>
          <h1>Monsters</h1>
          <div className='Monsters__ctr'>
            {this.props.isFetching ?
              <div className='Monsters__spinner-ctr'>
                <Spinner />
              </div>
              : monstersArr}
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    isFetching: state.isFetching
  }
}

export default connect(mapStateToProps)(Monsters)
