import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/actions'

import * as MonsterLegs from '../MonsterFeatures/MonsterLegs'
import NewMonsterTemplate from './NewMonsterTemplate'

class NewMonsterLegs extends Component {
  render() {
    let legsProps = {
      featureTypeDispatch: this.props.setLegsType,
      featureFillDispatch: this.props.setLegsFill,
      features: MonsterLegs,
      monsterFeature: 'legs',
      panelHeaderText: 'Legs',
      bodyOutline: true,
    }

    return (
      <NewMonsterTemplate {...legsProps} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLegsType: (legsType) => dispatch(actions.setLegsType(legsType)),
    setLegsFill: (legsFill) => dispatch(actions.setLegsFill(legsFill))
  }
}

export default connect(null, mapDispatchToProps)(NewMonsterLegs)
