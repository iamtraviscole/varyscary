import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../styles/NewMonsterPanels.css'
import * as actions from '../../actions/actions'

import ColorPicker from '../ColorPicker'
import * as MonsterMouths from '../MonsterFeatures/MonsterMouths'
import * as MonsterBodies from '../MonsterFeatures/MonsterBodies'

class NewMonsterMouths extends Component {

  handleMouthClick = (event) => {
    const mouthType = event.currentTarget.dataset.mouthType
    this.props.setMouthType(mouthType)
  }

  render() {
    const { monster } = this.props
    const { strokeFill, strokeColor, strokeDasharray } = this.props.svgStrokeStyle

    let MonsterBodyComponent = MonsterBodies[monster.body.default]
    if (this.props.monster.body.type) {
      MonsterBodyComponent = MonsterBodies[monster.body.type]
    }

    let mouthsDivs = []
    for (const monsterMouth in MonsterMouths) {
      let MouthComponent = MonsterMouths[monsterMouth]
      mouthsDivs.push(<div className='NewMonsterPanels__features'
        data-mouth-type={monsterMouth}
        onClick={this.handleMouthClick}
        key={monsterMouth}>
        <div className='NewMonsterPanels__feature NewMonsterPanels__mouth'>
          <MouthComponent fillColor={monster.mouth.fillColor} />
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
      if (monster.mouth.type && div.dataset.mouthType === monster.mouth.type) {
          div.className = 'NewMonsterPanels__features NewMonsterPanels__features--active'
        } else {
          div.className = 'NewMonsterPanels__features'
        }
    })

    return (
      <div className='NewMonsterPanels__features-ctr'>
        <h3 className='NewMonsterPanels__h3'>Mouths</h3>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__color-picker'>
            <ColorPicker
              color={monster.mouth.fillColor}
              dispatchColor={this.props.setMouthFill} />
          </div>
          {mouthsDivs}
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
    setMouthType: (mouthType) => dispatch(actions.setMouthType(mouthType)),
    setMouthFill: (mouthFill) => dispatch(actions.setMouthFill(mouthFill)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMonsterMouths)
