import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../styles/NewMonsterPanels.css'
import * as actions from '../../actions/actions'

import * as MonsterBodies from '../MonsterFeatures/MonsterBodies'

class NewMonsterBodies extends Component {

  handleBodyClick = (event) => {
    const bodyType = event.currentTarget.dataset.bodyType
    this.props.setBodyType(bodyType)
  }

  render() {
    const { monster } = this.props

    let bodiesDivs = []
    const bodiesLength = Object.keys(MonsterBodies).length
    for (let i = 1; i <= bodiesLength; i++) {
      let BodyComponent = MonsterBodies[`Body${i}`]
      bodiesDivs.push(<div className='NewMonsterPanels__features'
        data-body-type={`Body${i}`}
        onClick={this.handleBodyClick}
        key={i}>
        <BodyComponent />
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
          <div className='NewMonsterPanels__features-color'>
            color picker here
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
    setBodyType: (bodyType) => dispatch(actions.setBodyType(bodyType)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMonsterBodies)
