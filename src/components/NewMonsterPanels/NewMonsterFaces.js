import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../styles/NewMonsterPanels.css'
import * as actions from '../../actions/actions'

import * as MonsterFaces from '../MonsterFeatures/MonsterFaces'
import * as MonsterBodies from '../MonsterFeatures/MonsterBodies'

class NewMonsterFaces extends Component {

  handleFaceClick = (event) => {
    const faceType = event.currentTarget.dataset.faceType
    this.props.setFaceType(faceType)
  }

  render() {

    let facesDivs = []
    const facesLength = Object.keys(MonsterFaces).length
    for (let i = 1; i <= facesLength; i++) {
      let FaceComponent = MonsterFaces[`Face${i}`]
      facesDivs.push(<div className='NewMonsterPanels__features'
        data-face-type={`face${i}`}
        onClick={this.handleFaceClick}
        key={i}>
        <div className='NewMonsterPanels__feature'>
          <FaceComponent />
        </div>
        <div className='NewMonsterPanels__placeholder'>
          <MonsterBodies.Body1 />
        </div>
      </div>)
    }

    return (
      <div className='NewMonsterPanels__features-ctr'>
        <h3 className='NewMonsterPanels__h3'>Faces</h3>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__features NewMonsterPanels__features--color'>
            color picker here
          </div>
          {facesDivs}
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
