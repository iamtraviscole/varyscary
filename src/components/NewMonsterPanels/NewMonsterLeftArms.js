import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../styles/NewMonsterPanels.css'
import * as actions from '../../actions/actions'

import * as MonsterLeftArms from '../MonsterFeatures/MonsterLeftArms'
import * as MonsterBodies from '../MonsterFeatures/MonsterBodies'

class NewMonsterLeftArms extends Component {

  handleLeftArmClick = (event) => {
    const leftArmType = event.currentTarget.dataset.leftarmType
    this.props.setLeftArmType(leftArmType)
  }

  render() {
    const { monster } = this.props
    const { strokeFill, strokeColor, strokeDasharray } = this.props.svgStrokeStyle

    let MonsterBodyComponent = MonsterBodies.Body1
    if (this.props.monster.body.type) {
      MonsterBodyComponent = MonsterBodies[this.props.monster.body.type]
    }

    let leftArmsDivs = []
    for (const monsterLeftArm in MonsterLeftArms) {
      let LeftArmComponent = MonsterLeftArms[monsterLeftArm]
      leftArmsDivs.push(<div className='NewMonsterPanels__features'
        data-leftarm-type={monsterLeftArm}
        onClick={this.handleLeftArmClick}
        key={monsterLeftArm}>
        <div className='NewMonsterPanels__feature NewMonsterPanels__leftArm'>
          <LeftArmComponent/>
        </div>
        <div className='NewMonsterPanels__feature NewMonsterPanels__body'>
          <MonsterBodyComponent
            fillColor={strokeFill}
            strokeColor={strokeColor}
            strokeDasharray={strokeDasharray}/>
        </div>
      </div>)
    }

    let featuresDivs = document.getElementsByClassName("NewMonsterPanels__features")
    let featuresDivsArray = [...featuresDivs]
    featuresDivsArray.forEach(div => {
      if (monster.leftArm.type && div.dataset.leftarmType === monster.leftArm.type) {
          div.className = 'NewMonsterPanels__features NewMonsterPanels__features--active'
        } else {
          div.className = 'NewMonsterPanels__features'
        }
    })

    return (
      <div className='NewMonsterPanels__features-ctr'>
        <h3 className='NewMonsterPanels__h3'>Left Arms</h3>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__color-picker'>
            color picker here
          </div>
          {leftArmsDivs}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    monster: state.monster,
    svgStrokeStyle: state.svgStrokeStyle
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLeftArmType: (leftArmType) => dispatch(actions.setLeftArmType(leftArmType)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMonsterLeftArms)
