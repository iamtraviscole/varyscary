import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import '../styles/NewMonster.css'
import * as actions from '../actions/actions'

import NewMonsterButton from './NewMonsterButton'
import NewMonsterBodies from './NewMonsterPanels/NewMonsterBodies'
import NewMonsterFaces from './NewMonsterPanels/NewMonsterFaces'
import NewMonsterHeadwear from './NewMonsterPanels/NewMonsterHeadwear'
import NewMonsterEyes from './NewMonsterPanels/NewMonsterEyes'
import NewMonsterMouths from './NewMonsterPanels/NewMonsterMouths'
import NewMonsterLeftArms from './NewMonsterPanels/NewMonsterLeftArms'
import NewMonsterRightArms from './NewMonsterPanels/NewMonsterRightArms'
import NewMonsterLegs from './NewMonsterPanels/NewMonsterLegs'

import * as MonsterBodies from './MonsterFeatures/MonsterBodies'
import * as MonsterFaces from './MonsterFeatures/MonsterFaces'
import * as MonsterHeadwear from './MonsterFeatures/MonsterHeadwear'
import * as MonsterEyes from './MonsterFeatures/MonsterEyes'
import * as MonsterMouths from './MonsterFeatures/MonsterMouths'
import * as MonsterLeftArms from './MonsterFeatures/MonsterLeftArms'
import * as MonsterRightArms from './MonsterFeatures/MonsterRightArms'
import * as MonsterLegs from './MonsterFeatures/MonsterLegs'

class NewMonster extends PureComponent {
  state = {
    showArrows: false,
    fixedMonsterCtr: false,
    activePanel: 'bodies',
    resetClicked: false
  }

  setShowArrows = () => {
    const navCtrWidth = document.getElementsByClassName('NewMonster__nav-ctr')[0].offsetWidth
    const navWidth = document.getElementsByClassName('NewMonster__nav')[0].scrollWidth
    navCtrWidth < navWidth
    ? this.setState({showArrows: true})
    : this.setState({showArrows: false})
  }

  setFixMonster = () => {
    window.scrollY > 75
      ? this.setState({fixedMonsterCtr: true})
      : this.setState({fixedMonsterCtr: false})
  }

  componentDidMount = () => {
    this.setShowArrows()
    window.addEventListener('resize', this.setShowArrows)
    window.addEventListener('scroll', this.setFixMonster)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.setShowArrows)
    window.removeEventListener('scroll', this.setFixMonster)
  }

  handleLeftArrowClick = () => {
    document.getElementsByClassName('NewMonster__nav')[0].scrollLeft -= 35
  }

  handleRightArrowClick = () => {
    document.getElementsByClassName('NewMonster__nav')[0].scrollLeft += 35
  }

  handleActivePanel = (buttonClicked) => {
    this.setState({activePanel: buttonClicked})
  }

  handleResetClick = () => {
    this.setState({resetClicked: true})
  }

  handleResetYesClick = () => {
    this.props.resetMonster()
    this.setState({resetClicked: false})
  }

  handleResetNoClick = () => {
    this.setState({resetClicked: false})
  }

  createFeaturesObject = (featuresImport, fillProp = null) => {
    let features = {}
    const featureFill = fillProp
    for (const feature in featuresImport) {
      let FeatureComponent = featuresImport[feature]
      features[feature] = <FeatureComponent fillColor={featureFill}/>
    }
    return features
  }

  render() {

    const { monster } = this.props

    let noFeatureSelected = true
    for (const feature in {...this.props.monster}) {
      if (this.props.monster[feature].type !== null) {
        noFeatureSelected = false
        break
      }
    }

    let monsterContainerStyle = 'NewMonster__monster-outer-ctr'
    if (this.state.fixedMonsterCtr) {
     monsterContainerStyle += ' NewMonster__monster-outer-ctr--fixed'
    }

    let navCtrClass = 'NewMonster__nav-ctr'
    let navClass = 'NewMonster__nav'
    if (this.state.showArrows) {
      navCtrClass += ' NewMonster__nav-ctr--center'
      navClass += ' NewMonster__nav--margin'
    }

    let resetButton = <button className='NewMonster__button-reset'
        onClick={this.handleResetClick}
        type='button'>Reset</button>
    if (this.state.resetClicked) {
      resetButton = <div className='NewMonster__confirm-ctr'>
        <div className='NewMonster__confirm'>
          Confirm reset:
        </div>
        <button className='NewMonster__confirm-button'
          type='button'
          onClick={this.handleResetNoClick}>
          Cancel
        </button>
        <button className='NewMonster__confirm-button'
          type='button'
          onClick={this.handleResetYesClick}>
          Reset
        </button>
      </div>
    }

    const activePanel = {
      bodies: <NewMonsterBodies />,
      faces: <NewMonsterFaces />,
      headwear: <NewMonsterHeadwear />,
      eyes: <NewMonsterEyes />,
      mouths: <NewMonsterMouths />,
      leftArms: <NewMonsterLeftArms />,
      rightArms: <NewMonsterRightArms />,
      legs: <NewMonsterLegs />,
    }

    let bodies = this.createFeaturesObject(MonsterBodies, monster.body.fillColor)
    let faces = this.createFeaturesObject(MonsterFaces, monster.face.fillColor)
    let headwear = this.createFeaturesObject(MonsterHeadwear)
    let eyes = this.createFeaturesObject(MonsterEyes)
    let mouths = this.createFeaturesObject(MonsterMouths)
    let leftArms = this.createFeaturesObject(MonsterLeftArms)
    let rightArms = this.createFeaturesObject(MonsterRightArms)
    let legs = this.createFeaturesObject(MonsterLegs)

    return (
      <div className='NewMonster'>
        <div className='NewMonster__ctr'>
          <div className='NewMonster__left-grid-ctr'>
            <div className={navCtrClass}>
              {this.state.showArrows
                ? <div className='NewMonster__left-arrow'
                    onClick={this.handleLeftArrowClick}>
                      <i className='material-icons'>arrow_back_ios</i>
                  </div>
                : null
              }
              <div className={navClass}>
                <NewMonsterButton activePanel={this.state.activePanel}
                  handleActivePanel={this.handleActivePanel}
                  activePanelName='bodies'>Bodies</NewMonsterButton>
                <NewMonsterButton activePanel={this.state.activePanel}
                  handleActivePanel={this.handleActivePanel}
                  activePanelName='faces'>Faces</NewMonsterButton>
                <NewMonsterButton activePanel={this.state.activePanel}
                  handleActivePanel={this.handleActivePanel}
                  activePanelName='headwear'>Headwear</NewMonsterButton>
                <NewMonsterButton activePanel={this.state.activePanel}
                  handleActivePanel={this.handleActivePanel}
                  activePanelName='eyes'>Eyes</NewMonsterButton>
                <NewMonsterButton activePanel={this.state.activePanel}
                  handleActivePanel={this.handleActivePanel}
                  activePanelName='mouths'>Mouths</NewMonsterButton>
                <NewMonsterButton activePanel={this.state.activePanel}
                  handleActivePanel={this.handleActivePanel}
                  activePanelName='rightArms'>Right Arms</NewMonsterButton>
                <NewMonsterButton activePanel={this.state.activePanel}
                  handleActivePanel={this.handleActivePanel}
                  activePanelName='leftArms'>Left Arms</NewMonsterButton>
                <NewMonsterButton activePanel={this.state.activePanel}
                  handleActivePanel={this.handleActivePanel}
                  activePanelName='legs'>Legs</NewMonsterButton>
              </div>
              {this.state.showArrows
                ? <div className='NewMonster__right-arrow'
                    onClick={this.handleRightArrowClick}>
                      <i className='material-icons'>arrow_forward_ios</i>
                  </div>
                : null
              }
            </div>
            <form className='NewMonster__form-ctr'>
              {activePanel[this.state.activePanel]}
            </form>
          </div>
          <div className='NewMonster__right-grid-ctr'>
            <div className={monsterContainerStyle}>
              <div className='NewMonster__monster-ctr'>
                {noFeatureSelected ? (
                  <div className='NewMonster__directions-ctr'>
                    <h2 className='NewMonster__h2'>Make a monster!</h2>
                    <p>Choose your features</p>
                  </div>
                  ) : null}
                <div className='NewMonster__feature NewMonster__body'>
                  {bodies[monster.body.type]}
                </div>
                <div className='NewMonster__feature NewMonster__face'>
                  {faces[monster.face.type]}
                </div>
                <div className='NewMonster__feature NewMonster__headwear'>
                  {headwear[monster.headwear.type]}
                </div>
                <div className='NewMonster__feature NewMonster__eyes'>
                  {eyes[monster.eyes.type]}
                </div>
                <div className='NewMonster__feature NewMonster__mouth'>
                  {mouths[monster.mouth.type]}
                </div>
                <div className='NewMonster__feature NewMonster__left-arm'>
                  {leftArms[monster.leftArm.type]}
                </div>
                <div className='NewMonster__feature NewMonster__right-arm'>
                  {rightArms[monster.rightArm.type]}
                </div>
                <div className='NewMonster__feature NewMonster__legs'>
                  {legs[monster.legs.type]}
                </div>
              </div>
              <div className='NewMonster__buttons-ctr'>
                <button className='NewMonster__button'
                  type='button'>Save Monster</button>
                {resetButton}
              </div>
            </div>
          </div>
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
    resetMonster: () => dispatch(actions.resetMonster())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMonster)
