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

    const featureComponent = (importName, featureCategory) => {
      let feature = monsterFeatures[featureCategory].hoverType
        ? monsterFeatures[featureCategory].hoverType
        : monsterFeatures[featureCategory].type
      const FeatureComponent = importName[feature]
      const fillColor = monsterFeatures[featureCategory].fillColor
      return importName[feature]
        ? <FeatureComponent fillColor={fillColor} />
        : null
    }

    return (
      <Fragment>
        <div className='MonsterFromStore__feature MonsterFromStore__body'>
          {featureComponent(MonsterBodies, 'body')}
        </div>
        <div className='MonsterFromStore__feature MonsterFromStore__face'>
          {featureComponent(MonsterFaces, 'face')}
        </div>
        <div className='MonsterFromStore__feature MonsterFromStore__headwear'>
          {featureComponent(MonsterHeadwear, 'headwear')}
        </div>
        <div className='MonsterFromStore__feature MonsterFromStore__eyes'>
          {featureComponent(MonsterEyes, 'eyes')}
        </div>
        <div className='MonsterFromStore__feature MonsterFromStore__mouth'>
          {featureComponent(MonsterMouths, 'mouth')}
        </div>
        <div className='MonsterFromStore__feature MonsterFromStore__left-arm'>
          {featureComponent(MonsterLeftArms, 'leftArm')}
        </div>
        <div className='MonsterFromStore__feature MonsterFromStore__right-arm'>
          {featureComponent(MonsterRightArms, 'rightArm')}
        </div>
        <div className='MonsterFromStore__feature MonsterFromStore__legs'>
          {featureComponent(MonsterLegs, 'legs')}
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
