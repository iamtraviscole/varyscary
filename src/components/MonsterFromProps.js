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
    const monster = this.props.monster

    let BodyComponent = MonsterBodies[monster.body_type]
    let FaceComponent = MonsterFaces[monster.face_type]
    let HeadwearComponent = MonsterHeadwear[monster.headwear_type]
    let EyesComponent = MonsterEyes[monster.eyes_type]
    let MouthComponent = MonsterMouths[monster.mouth_type]
    let LeftArmComponent = MonsterLeftArms[monster.left_arm_type]
    let RightArmComponent = MonsterRightArms[monster.right_arm_type]
    let LegsComponent = MonsterLegs[monster.legs_type]

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
          {featureComponent(BodyComponent, 'body_fill')}
        </div>
        <div className='MonsterFromProps__feature MonsterFromProps__face'>
          {featureComponent(FaceComponent, 'face_fill')}
        </div>
        <div className='MonsterFromProps__feature MonsterFromProps__headwear'>
          {featureComponent(HeadwearComponent, 'headwear_fill')}
        </div>
        <div className='MonsterFromProps__feature MonsterFromProps__eyes'>
          {featureComponent(EyesComponent, 'eyes_fill')}
        </div>
        <div className='MonsterFromProps__feature MonsterFromProps__mouth'>
          {featureComponent(MouthComponent, 'mouth_fill')}
        </div>
        <div className='MonsterFromProps__feature MonsterFromProps__rightArm'>
          {featureComponent(RightArmComponent, 'right_arm_fill')}
        </div>
        <div className='MonsterFromProps__feature MonsterFromProps__leftArm'>
          {featureComponent(LeftArmComponent, 'left_arm_fill')}
        </div>
        <div className='MonsterFromProps__feature MonsterFromProps__legs'>
          {featureComponent(LegsComponent, 'legs_fill')}
        </div>
      </div>
    )
  }
}

export default withRouter(Monster)
