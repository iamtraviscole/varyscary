import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/actions'

import * as MonsterBodies from '../MonsterFeatures/MonsterBodies'
import NewMonsterTemplate from './NewMonsterTemplate'

class NewMonsterBodies extends Component {
  render() {
    let bodyProps = {
      featureTypeDispatch: this.props.setBodyType,
      featureFillDispatch: this.props.setBodyFill,
      features: MonsterBodies,
      monsterFeature: 'body',
      panelHeaderText: 'Bodies',
      bodyOutline: false,
      allowNoSelection: false
    }

    return (
      <NewMonsterTemplate {...bodyProps} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBodyType: (bodyType) => dispatch(actions.setBodyType(bodyType)),
    setBodyFill: (bodyFill) => dispatch(actions.setBodyFill(bodyFill))
  }
}

export default connect(null, mapDispatchToProps)(NewMonsterBodies)
