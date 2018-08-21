import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'

import '../styles/NewMonster.css'
import * as actions from '../actions/actions'
import * as monsterUtil from '../utils/monster'

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

  handleNameInputChange = (event) => {
    this.props.setMonsterName(event.target.value)
  }

  handleSaveClick = () => {
    monsterUtil.createMonster(this.props.monsterName, this.props.monster)
  }

  handleRandomizeClick = () => {
    this.props.randomizeMonster()
  }

  handleResetClick = () => {
    this.setState({resetClicked: true})
  }

  handleResetYesClick = () => {
    this.props.resetMonster()
    this.setState({
      resetClicked: false,
      activePanel: 'bodies'
    })
  }

  handleResetNoClick = () => {
    this.setState({resetClicked: false})
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

    let navCtrClass = 'NewMonster__nav-ctr'
    let navClass = 'NewMonster__nav'
    if (this.state.showArrows) {
      navCtrClass += ' NewMonster__nav-ctr--center'
      navClass += ' NewMonster__nav--margin'
    }

    let noBodySelected = true
    if (monster.body.type) noBodySelected = false

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

    const newMonsterButton = (panelName, buttonText) => {
      return (
        <NewMonsterButton activePanel={this.state.activePanel}
          handleActivePanel={this.handleActivePanel}
          activePanelName={panelName}
          noBodySelected={noBodySelected}>{buttonText}</NewMonsterButton>
      )
    }

    let monsterContainerStyle = 'NewMonster__monster-outer-ctr'
    if (this.state.fixedMonsterCtr) {
     monsterContainerStyle = 'NewMonster__monster-outer-ctr--fixed'
    }

    let monsterDirections = (
      <div className='NewMonster__directions-ctr'>
        <h1 className='NewMonster__directions-header'>Make a monster!</h1>
        <p>Start by choosing a body</p>
        <p>or</p>
        <button className='NewMonster__directions-randomize-btn'
          type='button'
          onClick={this.handleRandomizeClick}>
          randomize
        </button>
      </div>
    )

    let BodyComponent = MonsterBodies[monster.body.type]
    let FaceComponent = MonsterFaces[monster.face.type]
    let HeadwearComponent = MonsterHeadwear[monster.headwear.type]
    let EyesComponent = MonsterEyes[monster.eyes.type]
    let MouthComponent = MonsterMouths[monster.mouth.type]
    let LeftArmComponent = MonsterLeftArms[monster.leftArm.type]
    let RightArmComponent = MonsterRightArms[monster.rightArm.type]
    let LegsComponent = MonsterLegs[monster.legs.type]

    const featureComponent = (FeatureComponent, featureName) => {
      return monster[featureName].type
        ? <FeatureComponent fillColor={monster[featureName].fillColor} />
        : null
    }

    let monsterFeatures = <Fragment>
      <div className='NewMonster__feature NewMonster__body'>
        {featureComponent(BodyComponent, 'body')}
      </div>
      <div className='NewMonster__feature NewMonster__face'>
        {featureComponent(FaceComponent, 'face')}
      </div>
      <div className='NewMonster__feature NewMonster__headwear'>
        {featureComponent(HeadwearComponent, 'headwear')}
      </div>
      <div className='NewMonster__feature NewMonster__eyes'>
        {featureComponent(EyesComponent, 'eyes')}
      </div>
      <div className='NewMonster__feature NewMonster__mouth'>
        {featureComponent(MouthComponent, 'mouth')}
      </div>
      <div className='NewMonster__feature NewMonster__left-arm'>
        {featureComponent(LeftArmComponent, 'leftArm')}
      </div>
      <div className='NewMonster__feature NewMonster__right-arm'>
        {featureComponent(RightArmComponent, 'rightArm')}
      </div>
      <div className='NewMonster__feature NewMonster__legs'>
        {featureComponent(LegsComponent, 'legs')}
      </div>
    </Fragment>

    let resetButton = <button className='NewMonster__button-reset'
      onClick={this.handleResetClick}
      type='button'>
      <i className="material-icons">
        refresh
      </i>
      Reset
    </button>

    if (this.state.resetClicked) {
      resetButton = <div className='NewMonster__confirm-ctr'>
        <div className='NewMonster__confirm'>
          Confirm:
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
                  activePanelName='bodies'
                  noBodySelected={false}>Bodies</NewMonsterButton>
                {newMonsterButton('faces', 'Faces')}
                {newMonsterButton('headwear', 'Headwear')}
                {newMonsterButton('eyes', 'Eyes')}
                {newMonsterButton('mouths', 'Mouths')}
                {newMonsterButton('rightArms', 'Right Arms')}
                {newMonsterButton('leftArms', 'Left Arms')}
                {newMonsterButton('legs', 'Legs')}
              </div>
              {this.state.showArrows
                ? <div className='NewMonster__right-arrow'
                    onClick={this.handleRightArrowClick}>
                      <i className='material-icons'>arrow_forward_ios</i>
                  </div>
                : null
              }
            </div>
            <div className='NewMonster__form-ctr'>
              {activePanel[this.state.activePanel]}
            </div>
          </div>
          <div className='NewMonster__right-grid-ctr'>
            <div className={monsterContainerStyle}>
              <div className='NewMonster__monster-ctr'>
                {noFeatureSelected ? monsterDirections : monsterFeatures }
              </div>
              <input className='NewMonster__name-input'
                name='name'
                type='text'
                placeholder='Name (optional)'
                value={this.state.password}
                onChange={this.handleNameInputChange} />
              <div className='NewMonster__buttons-ctr'>
                <button className='NewMonster__button'
                  onClick={this.handleSaveClick}
                  type='button'>
                  <i className="material-icons">
                    add
                  </i>
                  Save Monster
                </button>
                {resetButton}
                <button className='NewMonster__button-randomize'
                  onClick={this.handleRandomizeClick}
                  type='button'>
                  <i className="material-icons">
                    help_outline
                  </i>
                  Randomize
                </button>
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
    monsterName: state.monsterName,
    monster: state.monster
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetMonster: () => dispatch(actions.resetMonster()),
    randomizeMonster: () => dispatch(actions.randomizeMonster()),
    setMonsterName: (name) => dispatch(actions.setMonsterName(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMonster)
