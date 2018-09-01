import React, { Component } from 'react'

import '../styles/Monster.css'

import * as MonsterBodies from './MonsterFeatures/MonsterBodies'
import * as MonsterFaces from './MonsterFeatures/MonsterFaces'
import * as MonsterHeadwear from './MonsterFeatures/MonsterHeadwear'
import * as MonsterEyes from './MonsterFeatures/MonsterEyes'
import * as MonsterMouths from './MonsterFeatures/MonsterMouths'
import * as MonsterLeftArms from './MonsterFeatures/MonsterLeftArms'
import * as MonsterRightArms from './MonsterFeatures/MonsterRightArms'
import * as MonsterLegs from './MonsterFeatures/MonsterLegs'

class Monster extends Component {
  state = {
    showDetails: false
  }

  handleMonsterEnter = (event) => {
    this.setState({showDetails: true})
  }

  handleMonsterLeave = () => {
    this.setState({showDetails: false})
  }

  render() {
    const monster = this.props

    let BodyComponent = MonsterBodies[monster.bodyType]
    let FaceComponent = MonsterFaces[monster.faceType]
    let HeadwearComponent = MonsterHeadwear[monster.headwearType]
    let EyesComponent = MonsterEyes[monster.eyesType]
    let MouthComponent = MonsterMouths[monster.mouthType]
    let LeftArmComponent = MonsterLeftArms[monster.leftArmType]
    let RightArmComponent = MonsterRightArms[monster.rightArmType]
    let LegsComponent = MonsterLegs[monster.legsType]

    const featureComponent = (FeatureComponent, fill) => {
      return FeatureComponent ?
        <FeatureComponent fillColor={monster[fill]} />
        : null
    }

    return (
      <div className='Monster__monster-ctr'
        onMouseEnter={this.handleMonsterEnter}
        onMouseLeave={this.handleMonsterLeave}>
        {this.props.withDetails ?
          this.state.showDetails ?
          <div className='Monster__details-ctr'>
            {monster.name ?
              <div className='Monster__monster-name'>
                {monster.name}
              </div>
              : null}
              <div className='Monster__tags'>
                #should, #i, #add, #tags?
              </div>
              <div className='Monster__creator-name'>
                {monster.creator}
              </div>
          </div>
            :null
          :null}
        <div className='Monster__feature Monster__body'>
          {featureComponent(BodyComponent, 'bodyFill')}
        </div>
        <div className='Monster__feature Monster__face'>
          {featureComponent(FaceComponent, 'faceFill')}
        </div>
        <div className='Monster__feature Monster__headwear'>
          {featureComponent(HeadwearComponent, 'headwearFill')}
        </div>
        <div className='Monster__feature Monster__eyes'>
          {featureComponent(EyesComponent, 'eyesFill')}
        </div>
        <div className='Monster__feature Monster__mouth'>
          {featureComponent(MouthComponent, 'mouthFill')}
        </div>
        <div className='Monster__feature Monster__rightArm'>
          {featureComponent(RightArmComponent, 'rightArmFill')}
        </div>
        <div className='Monster__feature Monster__leftArm'>
          {featureComponent(LeftArmComponent, 'leftArmFill')}
        </div>
        <div className='Monster__feature Monster__legs'>
          {featureComponent(LegsComponent, 'legsFill')}
        </div>
      </div>
    )
  }
}

export default Monster
