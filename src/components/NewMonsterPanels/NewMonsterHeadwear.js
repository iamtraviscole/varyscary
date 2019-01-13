import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/index'

import * as MonsterHeadwear from '../MonsterFeatures/MonsterHeadwear'
import NewMonsterTemplate from './NewMonsterTemplate'

class NewMonsterHeadwear extends Component {
  render() {
    let headwearProps = {
      featureTypeDispatch: this.props.setHeadwearType,
      featureTypeHoverDispatch: this.props.setHeadwearTypeHover,
      featureFillDispatch: this.props.setHeadwearFill,
      features: MonsterHeadwear,
      monsterFeature: 'headwear',
      panelHeaderText: 'Headwear',
      bodyOutline: true,
      allowNoSelection: true
    }

    return (
      <NewMonsterTemplate {...headwearProps} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHeadwearType: (headwearType) => dispatch(actions.setHeadwearType(headwearType)),
    setHeadwearTypeHover: (headwearTypeHover) => dispatch(actions.setHeadwearTypeHover(headwearTypeHover)),
    setHeadwearFill: (headwearFill) => dispatch(actions.setHeadwearFill(headwearFill))
  }
}

export default connect(null, mapDispatchToProps)(NewMonsterHeadwear)
