import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../styles/NewMonsterPanels.css'
import * as actions from '../../actions/actions'

import ColorPicker from '../ColorPicker'
import * as MonsterFaces from '../MonsterFeatures/MonsterFaces'
import * as MonsterBodies from '../MonsterFeatures/MonsterBodies'

class NewMonsterFaces extends Component {

  handleFaceClick = (event) => {
    const faceType = event.currentTarget.dataset.faceType
    this.props.setFaceType(faceType)
  }

  render() {
    const { monster } = this.props
    const { strokeFill, strokeColor, strokeDasharray } = this.props.svgStrokeStyle

    let MonsterBodyComponent = MonsterBodies[monster.body.default]
    if (this.props.monster.body.type) {
      MonsterBodyComponent = MonsterBodies[monster.body.type]
    }

    let facesDivs = []
    for (const monsterFace in MonsterFaces) {
      let FaceComponent = MonsterFaces[monsterFace]
      facesDivs.push(<div className='NewMonsterPanels__features'
        data-face-type={monsterFace}
        onClick={this.handleFaceClick}
        key={monsterFace}>
        <div className='NewMonsterPanels__feature NewMonsterPanels__face'>
          <FaceComponent/>
        </div>
        <div className='NewMonsterPanels__feature NewMonsterPanels__body'>
          <MonsterBodyComponent
            fillColor={strokeFill}
            strokeColor={strokeColor}
            strokeDasharray={strokeDasharray}/>
        </div>
      </div>)
    }

    let featuresDivs = document.getElementsByClassName("NewMonsterPanels__features")
    let featuresDivsArray = [...featuresDivs]
    featuresDivsArray.forEach(div => {
      if (monster.face.type && div.dataset.faceType === monster.face.type) {
          div.className = 'NewMonsterPanels__features NewMonsterPanels__features--active'
        } else {
          div.className = 'NewMonsterPanels__features'
        }
    })

    return (
      <div className='NewMonsterPanels__features-ctr'>
        <h3 className='NewMonsterPanels__h3'>Faces</h3>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__color-picker'>
            <ColorPicker />
          </div>
          {facesDivs}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    monster: state.monster,
    svgStrokeStyle: state.svgStrokeStyle
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFaceType: (faceType) => dispatch(actions.setFaceType(faceType)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMonsterFaces)
