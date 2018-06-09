import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../styles/NewMonsterPanels.css'
import * as actions from '../../actions/actions'

import * as MonsterFaces from '../MonsterFeatures/MonsterFaces'

class NewMonsterFaces extends Component {

  handleFaceClick = (event) => {
    const faceType = event.currentTarget.dataset.faceType
    this.props.setFaceType(faceType)
  }

  render() {
    return (
      <div className='NewMonsterPanels__features-ctr'>
        <h3 className='NewMonsterPanels__h3'>Faces</h3>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__features NewMonsterPanels__features--color'>
            color picker here
          </div>
          <div className='NewMonsterPanels__features'
            data-face-type='face1'
            onClick={this.handleFaceClick}>
            <MonsterFaces.Face1 />
          </div>
          <div className='NewMonsterPanels__features'
            data-face-type='face2'
            onClick={this.handleFaceClick}>
            <MonsterFaces.Face2 />
          </div>
          <div className='NewMonsterPanels__features'
            data-face-type='face3'
            onClick={this.handleFaceClick}>
            <MonsterFaces.Face3 />
          </div>
          <div className='NewMonsterPanels__features'
            data-face-type='face4'
            onClick={this.handleFaceClick}>
            <MonsterFaces.Face4 />
          </div>
          <div className='NewMonsterPanels__features'
            data-face-type='face5'
            onClick={this.handleFaceClick}>
            <MonsterFaces.Face5 />
          </div>
          <div className='NewMonsterPanels__features'
            data-face-type='face6'
            onClick={this.handleFaceClick}>
            <MonsterFaces.Face6 />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFaceType: (faceType) => dispatch(actions.setFaceType(faceType)),
  }
}

export default connect(null, mapDispatchToProps)(NewMonsterFaces)
