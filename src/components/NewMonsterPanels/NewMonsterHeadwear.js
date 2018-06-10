import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../styles/NewMonsterPanels.css'
import * as actions from '../../actions/actions'

import * as MonsterHeadwear from '../MonsterFeatures/MonsterHeadwear'

class NewMonsterHeadwear extends Component {

  handleHeadwearClick = (event) => {
    const headwearType = event.currentTarget.dataset.headwearType
    this.props.setHeadwearType(headwearType)
  }

  render() {

    let headwearDivs = []
    const headwearLength = Object.keys(MonsterHeadwear).length
    for (let i = 1; i <= headwearLength; i++) {
      let HeadwearComponent = MonsterHeadwear[`Headwear${i}`]
      headwearDivs.push(<div className='NewMonsterPanels__features'
        data-headwear-type={`headwear${i}`}
        onClick={this.handleHeadwearClick}
        key={i}>
        <HeadwearComponent />
      </div>)
    }

    return (
      <div className='NewMonsterPanels__features-ctr'>
        <h3 className='NewMonsterPanels__h3'>Headwear</h3>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__features NewMonsterPanels__features--color'>
            color picker here
          </div>
          {headwearDivs}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHeadwearType: (headwearType) => dispatch(actions.setHeadwearType(headwearType)),
  }
}

export default connect(null, mapDispatchToProps)(NewMonsterHeadwear)
