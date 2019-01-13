import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/index'

import * as MonsterLeftArms from '../MonsterFeatures/MonsterLeftArms'
import NewMonsterTemplate from './NewMonsterTemplate'

class NewMonsterLeftArms extends Component {
  render() {
    let leftArmsProps = {
      featureTypeDispatch: this.props.setLeftArmType,
      featureTypeHoverDispatch: this.props.setLeftArmTypeHover,
      featureFillDispatch: this.props.setLeftArmFill,
      features: MonsterLeftArms,
      monsterFeature: 'leftArm',
      panelHeaderText: 'Left Arms',
      bodyOutline: true,
      allowNoSelection: true
    }

    return (
      <NewMonsterTemplate {...leftArmsProps} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLeftArmType: (leftArmType) => dispatch(actions.setLeftArmType(leftArmType)),
    setLeftArmTypeHover: (leftArmTypeHover) => dispatch(actions.setLeftArmTypeHover(leftArmTypeHover)),
    setLeftArmFill: (leftArmFill) => dispatch(actions.setLeftArmFill(leftArmFill))
  }
}

export default connect(null, mapDispatchToProps)(NewMonsterLeftArms)
