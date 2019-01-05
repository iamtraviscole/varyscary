import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import '../styles/MonsterFromStore.css'

import * as MonsterBodies from './MonsterFeatures/MonsterBodies'
import * as MonsterFaces from './MonsterFeatures/MonsterFaces'
import * as MonsterHeadwear from './MonsterFeatures/MonsterHeadwear'
import * as MonsterEyes from './MonsterFeatures/MonsterEyes'
import * as MonsterMouths from './MonsterFeatures/MonsterMouths'
import * as MonsterLeftArms from './MonsterFeatures/MonsterLeftArms'
import * as MonsterRightArms from './MonsterFeatures/MonsterRightArms'
import * as MonsterLegs from './MonsterFeatures/MonsterLegs'

class MonsterFromStore extends Component {
  render() {

    const { monsterFeatures } = this.props

    let BodyComponent = MonsterBodies[monsterFeatures.body.type]
    let FaceComponent = MonsterFaces[monsterFeatures.face.type]
    let HeadwearComponent = MonsterHeadwear[monsterFeatures.headwear.type]
    let EyesComponent = MonsterEyes[monsterFeatures.eyes.type]
    let MouthComponent = MonsterMouths[monsterFeatures.mouth.type]
    let LeftArmComponent = MonsterLeftArms[monsterFeatures.leftArm.type]
    let RightArmComponent = MonsterRightArms[monsterFeatures.rightArm.type]
    let LegsComponent = MonsterLegs[monsterFeatures.legs.type]

    const featureComponent = (FeatureComponent, featureName) => {
      return monsterFeatures[featureName].type
        ? <FeatureComponent fillColor={monsterFeatures[featureName].fillColor} />
        : null
    }

    return (
      <Fragment>
        <div className='MonsterFromStore__feature MonsterFromStore__body'>
          {featureComponent(BodyComponent, 'body')}
        </div>
        <div className='MonsterFromStore__feature MonsterFromStore__face'>
          {featureComponent(FaceComponent, 'face')}
        </div>
        <div className='MonsterFromStore__feature MonsterFromStore__headwear'>
          {featureComponent(HeadwearComponent, 'headwear')}
        </div>
        <div className='MonsterFromStore__feature MonsterFromStore__eyes'>
          {featureComponent(EyesComponent, 'eyes')}
        </div>
        <div className='MonsterFromStore__feature MonsterFromStore__mouth'>
          {featureComponent(MouthComponent, 'mouth')}
        </div>
        <div className='MonsterFromStore__feature MonsterFromStore__left-arm'>
          {featureComponent(LeftArmComponent, 'leftArm')}
        </div>
        <div className='MonsterFromStore__feature MonsterFromStore__right-arm'>
          {featureComponent(RightArmComponent, 'rightArm')}
        </div>
        <div className='MonsterFromStore__feature MonsterFromStore__legs'>
          {featureComponent(LegsComponent, 'legs')}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    monsterFeatures: state.monster.monsterFeatures
  }
}

export default connect(mapStateToProps)(MonsterFromStore)
