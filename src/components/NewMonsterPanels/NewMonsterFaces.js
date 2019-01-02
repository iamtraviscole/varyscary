import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/index'

import * as MonsterFaces from '../MonsterFeatures/MonsterFaces'
import NewMonsterTemplate from './NewMonsterTemplate'

class NewMonsterFaces extends Component {
  render() {
    let faceProps = {
      featureTypeDispatch: this.props.setFaceType,
      featureFillDispatch: this.props.setFaceFill,
      features: MonsterFaces,
      monsterFeature: 'face',
      panelHeaderText: 'Faces',
      bodyOutline: true,
      allowNoSelection: true
    }

    return (
      <NewMonsterTemplate {...faceProps} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFaceType: (faceType) => dispatch(actions.setFaceType(faceType)),
    setFaceFill: (faceFill) => dispatch(actions.setFaceFill(faceFill))
  }
}

export default connect(null, mapDispatchToProps)(NewMonsterFaces)
