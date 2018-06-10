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

    let bodiesDivs = []
    const bodiesLength = Object.keys(MonsterBodies).length
    for (let i = 1; i <= bodiesLength; i++) {
      let BodyComponent = MonsterBodies[`Body${i}`]
      bodiesDivs.push(<div className='NewMonsterPanels__features'
        data-body-type={`body${i}`}
        onClick={this.handleBodyClick}
        key={i}>
        <BodyComponent />
      </div>)
    }

    return (
      <div className='NewMonsterPanels__features-ctr'>
        <h3 className='NewMonsterPanels__h3'>Bodies</h3>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__features NewMonsterPanels__features--color'>
            color picker here
          </div>
          {bodiesDivs}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBodyType: (bodyType) => dispatch(actions.setBodyType(bodyType)),
  }
}

export default connect(null, mapDispatchToProps)(NewMonsterBodies)
