import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/actions'

import * as MonsterMouths from '../MonsterFeatures/MonsterMouths'
import NewMonsterTemplate from './NewMonsterTemplate'

class NewMonsterMouths extends Component {
  render() {
    let mouthsProps = {
      featureTypeDispatch: this.props.setMouthType,
      featureFillDispatch: this.props.setMouthFill,
      features: MonsterMouths,
      monsterFeature: 'mouth',
      panelHeaderText: 'Mouths',
      bodyOutline: true,
    }

    return (
      <NewMonsterTemplate {...mouthsProps} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMouthType: (mouthType) => dispatch(actions.setMouthType(mouthType)),
    setMouthFill: (mouthFill) => dispatch(actions.setMouthFill(mouthFill))
  }
}

export default connect(null, mapDispatchToProps)(NewMonsterMouths)
