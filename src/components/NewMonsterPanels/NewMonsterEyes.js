import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../styles/NewMonsterPanels.css'
import * as actions from '../../actions/actions'

import ColorPicker from '../ColorPicker'
import * as MonsterEyes from '../MonsterFeatures/MonsterEyes'
import * as MonsterBodies from '../MonsterFeatures/MonsterBodies'

class NewMonsterEyes extends Component {

  handleEyesClick = (event) => {
    const eyesType = event.currentTarget.dataset.eyesType
    this.props.setEyesType(eyesType)
  }

  render() {
    const { monster } = this.props
    const { strokeFill, strokeColor, strokeDasharray } = this.props.svgStrokeStyle

    let MonsterBodyComponent = MonsterBodies[monster.body.default]
    if (this.props.monster.body.type) {
      MonsterBodyComponent = MonsterBodies[monster.body.type]
    }

    let eyesDivs = []
    for (const monsterEyes in MonsterEyes) {
      let EyesComponent = MonsterEyes[monsterEyes]
      eyesDivs.push(<div className='NewMonsterPanels__features'
        data-eyes-type={monsterEyes}
        onClick={this.handleEyesClick}
        key={monsterEyes}>
        <div className='NewMonsterPanels__feature NewMonsterPanels__eyes'>
          <EyesComponent fillColor={monster.eyes.fillColor} />
        </div>
        <div className='NewMonsterPanels__feature NewMonsterPanels__body'>
          <MonsterBodyComponent
            fillColor={strokeFill}
            strokeColor={strokeColor}
            strokeDasharray={strokeDasharray} />
        </div>
      </div>)
    }

    let featuresDivs = document.getElementsByClassName("NewMonsterPanels__features")
    let featuresDivsArray = [...featuresDivs]
    featuresDivsArray.forEach(div => {
      if (monster.eyes.type && div.dataset.eyesType === monster.eyes.type) {
          div.className = 'NewMonsterPanels__features NewMonsterPanels__features--active'
        } else {
          div.className = 'NewMonsterPanels__features'
        }
    })

    return (
      <div className='NewMonsterPanels__features-ctr'>
        <h3 className='NewMonsterPanels__h3'>Eyes</h3>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__color-picker'>
            <ColorPicker
              color={monster.eyes.fillColor}
              dispatchColor={this.props.setEyesFill} />
          </div>
          {eyesDivs}
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
    setEyesType: (eyesType) => dispatch(actions.setEyesType(eyesType)),
    setEyesFill: (eyesFill) => dispatch(actions.setEyesFill(eyesFill))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMonsterEyes)
