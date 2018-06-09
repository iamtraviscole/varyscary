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
    return (
      <div className='NewMonsterPanels__features-ctr'>
        <h3 className='NewMonsterPanels__h3'>Bodies</h3>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__features NewMonsterPanels__features--color'>
            color picker here
          </div>
          <div className='NewMonsterPanels__features'
            data-body-type='body1'
            onClick={this.handleBodyClick}>
            <MonsterBodies.Body1 />
          </div>
          <div className='NewMonsterPanels__features'
            data-body-type='body2'
            onClick={this.handleBodyClick}>
            <MonsterBodies.Body2 />
          </div>
          <div className='NewMonsterPanels__features'
            data-body-type='body3'
            onClick={this.handleBodyClick}>
            <MonsterBodies.Body3 />
          </div>
          <div className='NewMonsterPanels__features'
            data-body-type='body4'
            onClick={this.handleBodyClick}>
            <MonsterBodies.Body4 />
          </div>
          <div className='NewMonsterPanels__features'
            data-body-type='body5'
            onClick={this.handleBodyClick}>
            <MonsterBodies.Body5 />
          </div>
          <div className='NewMonsterPanels__features'
            data-body-type='body6'
            onClick={this.handleBodyClick}>
            <MonsterBodies.Body6 />
          </div>
          <div className='NewMonsterPanels__features'
            data-body-type='body7'
            onClick={this.handleBodyClick}>
            <MonsterBodies.Body7 />
          </div>
          <div className='NewMonsterPanels__features'
            data-body-type='body8'
            onClick={this.handleBodyClick}>
            <MonsterBodies.Body8 />
          </div>
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
