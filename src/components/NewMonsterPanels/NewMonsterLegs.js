import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../styles/NewMonsterPanels.css'
import * as actions from '../../actions/actions'

import ColorPicker from '../ColorPicker'
import * as MonsterLegs from '../MonsterFeatures/MonsterLegs'
import * as MonsterBodies from '../MonsterFeatures/MonsterBodies'

class NewMonsterLegs extends Component {

  handleLegsClick = (event) => {
    const legsType = event.currentTarget.dataset.legsType
    this.props.setLegsType(legsType)
  }

  render() {
    const { monster } = this.props
    const { strokeFill, strokeColor, strokeDasharray } = this.props.svgStrokeStyle

    let MonsterBodyComponent = MonsterBodies[monster.body.default]
    if (this.props.monster.body.type) {
      MonsterBodyComponent = MonsterBodies[monster.body.type]
    }

    let legsDivs = []
    for (const monsterLegs in MonsterLegs) {
      let LegsComponent = MonsterLegs[monsterLegs]
      legsDivs.push(<div className='NewMonsterPanels__features'
        data-legs-type={monsterLegs}
        onClick={this.handleLegsClick}
        key={monsterLegs}>
        <div className='NewMonsterPanels__feature NewMonsterPanels__legs'>
          <LegsComponent fillColor={monster.legs.fillColor} />
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
      if (monster.legs.type && div.dataset.legsType === monster.legs.type) {
          div.className = 'NewMonsterPanels__features NewMonsterPanels__features--active'
        } else {
          div.className = 'NewMonsterPanels__features'
        }
    })

    return (
      <div className='NewMonsterPanels__features-ctr'>
        <h3 className='NewMonsterPanels__h3'>Legs</h3>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__color-picker'>
            <ColorPicker
              color={monster.legs.fillColor}
              dispatchColor={this.props.setLegsFill} />
          </div>
          {legsDivs}
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
    setLegsType: (legsType) => dispatch(actions.setLegsType(legsType)),
    setLegsFill: (legsFill) => dispatch(actions.setLegsFill(legsFill)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMonsterLegs)
