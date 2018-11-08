import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

import '../styles/MonsterFromProps.css'

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

    let monsterTags = null
    if (this.props.withDetails) {
      monsterTags = monster.tags.map((tag, i) => {
        return (
          <li key={i} className='MonsterFromProps__tag'>
            <Link to={`/monsters?sort_by=newest&search=${tag}`}>#{tag}</Link>
          </li>
        )
      })
    }

    return (
      <div className='MonsterFromProps__monster-ctr'
        onMouseEnter={this.handleMonsterEnter}
        onMouseLeave={this.handleMonsterLeave}>
        {this.props.withDetails ?
          this.state.showDetails ?
            <Fragment>
              {this.props.asModal ?
                <div className='MonsterFromProps__details-ctr'
                  onClick={this.props.showModal}>
                  {monster.name ?
                    <div className='MonsterFromProps__monster-name'>
                      {monster.name}
                    </div>
                  : null}
                  </div>
              : <Link to={'/monsters/' + monster.id}
                  className='MonsterFromProps__details-ctr'>
                  {monster.name ?
                    <div className='MonsterFromProps__monster-name'>
                      {monster.name}
                    </div>
                  : null}
                </Link>}
              <div className='MonsterFromProps__tags'>
                {monsterTags}
              </div>
              <div className='MonsterFromProps__username'>
                <Link to={'/' + monster.username}>{monster.username}</Link>
              </div>
            </Fragment>
          :null
        :null}
        <div className='MonsterFromProps__feature MonsterFromProps__body'>
          {featureComponent(BodyComponent, 'bodyFill')}
        </div>
        <div className='MonsterFromProps__feature MonsterFromProps__face'>
          {featureComponent(FaceComponent, 'faceFill')}
        </div>
        <div className='MonsterFromProps__feature MonsterFromProps__headwear'>
          {featureComponent(HeadwearComponent, 'headwearFill')}
        </div>
        <div className='MonsterFromProps__feature MonsterFromProps__eyes'>
          {featureComponent(EyesComponent, 'eyesFill')}
        </div>
        <div className='MonsterFromProps__feature MonsterFromProps__mouth'>
          {featureComponent(MouthComponent, 'mouthFill')}
        </div>
        <div className='MonsterFromProps__feature MonsterFromProps__rightArm'>
          {featureComponent(RightArmComponent, 'rightArmFill')}
        </div>
        <div className='MonsterFromProps__feature MonsterFromProps__leftArm'>
          {featureComponent(LeftArmComponent, 'leftArmFill')}
        </div>
        <div className='MonsterFromProps__feature MonsterFromProps__legs'>
          {featureComponent(LegsComponent, 'legsFill')}
        </div>
      </div>
    )
  }
}

export default withRouter(Monster)
