import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../styles/NewMonsterPanels.css'
import * as actions from '../../actions/actions'

import * as MonsterHeadwear from '../MonsterFeatures/MonsterHeadwear'
import * as MonsterBodies from '../MonsterFeatures/MonsterBodies'

class NewMonsterHeadwear extends Component {

  handleHeadwearClick = (event) => {
    const headwearType = event.currentTarget.dataset.headwearType
    this.props.setHeadwearType(headwearType)
  }

  render() {
    const { monster } = this.props
    const {strokeFill, strokeColor, strokeDasharray} = this.props.svgStrokeStyle

    let MonsterBodyComponent = MonsterBodies[monster.body.default]
    if (this.props.monster.body.type) {
      MonsterBodyComponent = MonsterBodies[monster.body.type]
    }

    let headwearDivs = []
    for (const monsterHeadwear in MonsterHeadwear) {
      let HeadwearComponent = MonsterHeadwear[monsterHeadwear]
      headwearDivs.push(<div className='NewMonsterPanels__features'
        data-headwear-type={monsterHeadwear}
        onClick={this.handleHeadwearClick}
        key={monsterHeadwear}>
        <div className='NewMonsterPanels__feature NewMonsterPanels__headwear'>
          <HeadwearComponent />
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
      if (monster.headwear.type && div.dataset.headwearType === monster.headwear.type) {
          div.className = 'NewMonsterPanels__features NewMonsterPanels__features--active'
        } else {
          div.className = 'NewMonsterPanels__features'
        }
    })

    return (
      <div className='NewMonsterPanels__features-ctr'>
        <h3 className='NewMonsterPanels__h3'>Headwear</h3>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__color-picker'>
            color picker here
          </div>
          {headwearDivs}
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
    setHeadwearType: (headwearType) => dispatch(actions.setHeadwearType(headwearType)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMonsterHeadwear)
