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

    const { monster } = this.props

    let BodyComponent = MonsterBodies[monster.body.type]
    let FaceComponent = MonsterFaces[monster.face.type]
    let HeadwearComponent = MonsterHeadwear[monster.headwear.type]
    let EyesComponent = MonsterEyes[monster.eyes.type]
    let MouthComponent = MonsterMouths[monster.mouth.type]
    let LeftArmComponent = MonsterLeftArms[monster.leftArm.type]
    let RightArmComponent = MonsterRightArms[monster.rightArm.type]
    let LegsComponent = MonsterLegs[monster.legs.type]

    const featureComponent = (FeatureComponent, featureName) => {
      return monster[featureName].type
        ? <FeatureComponent fillColor={monster[featureName].fillColor} />
        : null
    }

    let monsterFeatures = <Fragment>
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

    return (
      monsterFeatures
    )
  }
}

const mapStateToProps = (state) => {
  return {
    monster: state.monster
  }
}

export default connect(mapStateToProps)(MonsterFromStore)
