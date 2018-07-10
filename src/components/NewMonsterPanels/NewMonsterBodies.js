import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../styles/NewMonsterPanels.css'
import * as actions from '../../actions/actions'

import ColorPicker from '../ColorPicker'
import * as MonsterBodies from '../MonsterFeatures/MonsterBodies'

class NewMonsterBodies extends Component {

  handleBodyClick = (event) => {
    const bodyType = event.currentTarget.dataset.bodyType
    this.props.setBodyType(bodyType)
  }

  render() {
    const { monster } = this.props

    let bodiesDivs = []
    for (const monsterBody in MonsterBodies) {
      let BodyComponent = MonsterBodies[monsterBody]
      bodiesDivs.push(<div className='NewMonsterPanels__features'
        data-body-type={monsterBody}
        onClick={this.handleBodyClick}
        key={monsterBody}>
        <div className='NewMonsterPanels__feature NewMonsterPanels__body'>
          <BodyComponent />
        </div>
      </div>)
    }

    let featuresDivs = document.getElementsByClassName("NewMonsterPanels__features")
    let featuresDivsArray = [...featuresDivs]
    featuresDivsArray.forEach(div => {
      if (monster.body.type && div.dataset.bodyType === monster.body.type) {
          div.className = 'NewMonsterPanels__features NewMonsterPanels__features--active'
        } else {
          div.className = 'NewMonsterPanels__features'
        }
    })

    return (
      <div className='NewMonsterPanels__features-ctr'>
        <h3 className='NewMonsterPanels__h3'>Bodies</h3>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__color-picker'>
            <ColorPicker color='red'/>
          </div>
          {bodiesDivs}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    monster: state.monster
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBodyType: (bodyType) => dispatch(actions.setBodyType(bodyType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMonsterBodies)
