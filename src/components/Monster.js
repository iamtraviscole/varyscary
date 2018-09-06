import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Monster.css'
import * as monsterUtil from '../utils/monster'

import MonsterFromProps from './MonsterFromProps'
import Spinner from './Spinner'

class Monster extends Component {
  state = {
    monster: null
  }

  componentDidMount = () => {
    monsterUtil.getMonster(this.props.match.params.id)
    .then(monster => {
      this.setState({monster: monster})
    })
  }

  render() {
    const monster = this.state.monster

    return (
        monster ?
          <div className='Monster'>
            <div className='Monster__name'>{monster.name}</div>
            <div className='Monster__monster-ctr'>
              <MonsterFromProps
                name={monster.name} id={monster.id}
                bodyType={monster.body_type} bodyFill={monster.body_fill}
                faceType={monster.face_type} faceFill={monster.face_fill}
                headwearType={monster.headwear_type} headwearFill={monster.headwear_fill}
                eyesType={monster.eyes_type} eyesFill={monster.eyes_fill}
                mouthType={monster.mouth_type} mouthFill={monster.mouth_fill}
                rightArmType={monster.right_arm_type} rightArmFill={monster.right_arm_fill}
                leftArmType={monster.left_arm_type} leftArmFill={monster.left_arm_fill}
                legsType={monster.legs_type} legsFill={monster.legs_fill}
                withDetails={false}
              />
            </div>
            <div className='Monster__created-by-ctr'>
              <div className='Monster__created-by'>by</div>
              <Link to={'/' + monster.user.username} className='Monster__creator'>{monster.user.username}</Link>
              <br></br>
              <div className='Monster__created-on'>on</div>
              <div className='Monster__created-on-date'>{monster.created_at_day_year}</div>
            </div>
            {/* <div className='Monster__tags-header'>
              <i className='material-icons'>label_outline</i>Tags
            </div> */}
            <div className='Monster__tags-ctr'>
              #somecooltag, #somecoolertag, #someevencoolertag, #tag, #wowawesome
            </div>
          </div>
          : <div className='Monster__spinner'>
              <Spinner />
            </div>
    )
  }
}

export default Monster
