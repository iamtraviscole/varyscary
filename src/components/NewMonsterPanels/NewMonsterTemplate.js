import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../styles/NewMonsterPanels.css'

import ColorPicker from '../ColorPicker'
import * as MonsterBodies from '../MonsterFeatures/MonsterBodies'

class NewMonsterTemplate extends Component {

  handleClick = (event) => {
    const featureSelection = event.currentTarget.dataset.featureSelection
    this.props.featureTypeDispatch(featureSelection)
  }

  render () {
    const monster = this.props.monster
    const { strokeFill, strokeColor, strokeDasharray } = this.props.svgStrokeStyle

    let MonsterBodyComponent = MonsterBodies[monster.body.default]
    if (monster.body.type) {
      MonsterBodyComponent = MonsterBodies[monster.body.type]
    }
    const bodyOutlineDiv = (
      <div className='NewMonsterPanels__feature NewMonsterPanels__body'>
        <MonsterBodyComponent
          fillColor={strokeFill}
          strokeColor={strokeColor}
          strokeDasharray={strokeDasharray} />
      </div>
    )

    let featuresDivs = []
    for (const feature in this.props.features) {
      let Component = this.props.features[feature]
      if (monster[this.props.monsterFeature].type === feature) {
        featuresDivs.push(
          <div className='NewMonsterPanels__features NewMonsterPanels__features--active'
            data-feature-selection={feature}
            onClick={this.handleClick}
            key={feature}>
            <div className={`NewMonsterPanels__feature NewMonsterPanels__${this.props.monsterFeature}`}>
              <i className="material-icons">
                check
              </i>
              <Component fillColor={monster[this.props.monsterFeature].fillColor} />
            </div>
            {this.props.bodyOutline ? bodyOutlineDiv : null}
          </div>
        )
      } else {
        featuresDivs.push(<div className='NewMonsterPanels__features'
          data-feature-selection={feature}
          onClick={this.handleClick}
          key={feature}>
          <div className={`NewMonsterPanels__feature NewMonsterPanels__${this.props.monsterFeature}`}>
            <Component fillColor={monster[this.props.monsterFeature].fillColor} />
          </div>
          {this.props.bodyOutline ? bodyOutlineDiv : null}
        </div>)
      }
    }
    return (
      <div className='NewMonsterPanels__features-ctr'>
        <h3 className='NewMonsterPanels__h3'>{this.props.panelHeaderText}</h3>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__color-picker'>
            <ColorPicker
              color={monster[this.props.monsterFeature].fillColor}
              dispatchColor={this.props.featureFillDispatch} />
          </div>
          {featuresDivs}
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

export default connect(mapStateToProps)(NewMonsterTemplate)
