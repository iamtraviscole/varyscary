import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../styles/NewMonsterPanels.css'
import * as actions from '../../actions/actions'

import * as MonsterRightArms from '../MonsterFeatures/MonsterRightArms'
import * as MonsterBodies from '../MonsterFeatures/MonsterBodies'

class NewMonsterRightArms extends Component {

  handleRightArmClick = (event) => {
    const rightArmType = event.currentTarget.dataset.rightarmType
    this.props.setRightArmType(rightArmType)
    console.log(event.currentTarget.dataset);
  }

  render() {
    const { monster } = this.props
    const { strokeFill, strokeColor, strokeDasharray } = this.props.svgStrokeStyle

    let MonsterBodyComponent = MonsterBodies.Body1
    if (this.props.monster.body.type) {
      MonsterBodyComponent = MonsterBodies[this.props.monster.body.type]
    }

    let rightArmsDivs = []
    for (const monsterRightArm in MonsterRightArms) {
      let RightArmComponent = MonsterRightArms[monsterRightArm]
      rightArmsDivs.push(<div className='NewMonsterPanels__features'
        data-rightarm-type={monsterRightArm}
        onClick={this.handleRightArmClick}
        key={monsterRightArm}>
        <div className='NewMonsterPanels__feature NewMonsterPanels__rightArm'>
          <RightArmComponent/>
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
      if (monster.rightArm.type && div.dataset.rightarmType === monster.rightArm.type) {
          div.className = 'NewMonsterPanels__features NewMonsterPanels__features--active'
        } else {
          div.className = 'NewMonsterPanels__features'
        }
    })

    return (
      <div className='NewMonsterPanels__features-ctr'>
        <h3 className='NewMonsterPanels__h3'>Right Arms</h3>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__color-picker'>
            color picker here
          </div>
          {rightArmsDivs}
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
    setRightArmType: (rightArmType) => dispatch(actions.setRightArmType(rightArmType)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMonsterRightArms)
