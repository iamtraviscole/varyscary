import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/actions'

import * as MonsterHeadwear from '../MonsterFeatures/MonsterHeadwear'
import NewMonsterTemplate from './NewMonsterTemplate'

class NewMonsterHeadwear extends Component {
  render() {
    let headwearProps = {
      featureTypeDispatch: this.props.setHeadwearType,
      featureFillDispatch: this.props.setHeadwearFill,
      features: MonsterHeadwear,
      monsterFeature: 'headwear',
      panelHeaderText: 'Headwear',
      bodyOutline: true,
    }

    return (
      <NewMonsterTemplate {...headwearProps} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHeadwearType: (headwearType) => dispatch(actions.setHeadwearType(headwearType)),
    setHeadwearFill: (headwearFill) => dispatch(actions.setHeadwearFill(headwearFill))
  }
}

export default connect(null, mapDispatchToProps)(NewMonsterHeadwear)
