import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/index'

import * as MonsterRightArms from '../MonsterFeatures/MonsterRightArms'
import NewMonsterTemplate from './NewMonsterTemplate'

class NewMonsterRightArms extends Component {
  render() {
    let rightArmsProps = {
      featureTypeDispatch: this.props.setRightArmType,
      featureTypeHoverDispatch: this.props.setRightArmTypeHover,
      featureFillDispatch: this.props.setRightArmFill,
      features: MonsterRightArms,
      monsterFeature: 'rightArm',
      panelHeaderText: 'Right Arms',
      bodyOutline: true,
      allowNoSelection: true
    }

    return (
      <NewMonsterTemplate {...rightArmsProps} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRightArmType: (rightArmType) => dispatch(actions.setRightArmType(rightArmType)),
    setRightArmTypeHover: (rightArmTypeHover) => dispatch(actions.setRightArmTypeHover(rightArmTypeHover)),
    setRightArmFill: (rightArmFill) => dispatch(actions.setRightArmFill(rightArmFill))
  }
}

export default connect(null, mapDispatchToProps)(NewMonsterRightArms)
