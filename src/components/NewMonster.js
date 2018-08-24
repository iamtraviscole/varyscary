import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import '../styles/NewMonster.css'
import * as actions from '../actions/actions'
import * as monsterUtil from '../utils/monster'

import MonsterFromStore from './MonsterFromStore'
import MonsterSavedModal from './MonsterSavedModal'
import NewMonsterButton from './NewMonsterButton'
import NewMonsterBodies from './NewMonsterPanels/NewMonsterBodies'
import NewMonsterFaces from './NewMonsterPanels/NewMonsterFaces'
import NewMonsterHeadwear from './NewMonsterPanels/NewMonsterHeadwear'
import NewMonsterEyes from './NewMonsterPanels/NewMonsterEyes'
import NewMonsterMouths from './NewMonsterPanels/NewMonsterMouths'
import NewMonsterLeftArms from './NewMonsterPanels/NewMonsterLeftArms'
import NewMonsterRightArms from './NewMonsterPanels/NewMonsterRightArms'
import NewMonsterLegs from './NewMonsterPanels/NewMonsterLegs'

class NewMonster extends PureComponent {
  state = {
    showArrows: false,
    fixedMonsterCtr: false,
    activePanel: 'bodies',
    resetClicked: false,
    message: null,
    showModal: false
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

  componentDidUpdate = () => {
    if (this.props.monster.body.type) {
      this.setState({message: null})
    }
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
    if (this.props.monster.body.type) {
      monsterUtil.createMonster(this.props.monsterName, this.props.monster)
      .then((saved) => {
        if (saved) {
          this.setState({showModal: true})
        }
      })
    } else {
      this.setState({message: 'Body required'})
    }
  }

  setShowModal = (bool) => {
    this.setState({showModal: bool})
  }

  setActivePanelBodies = () => {
    this.setState({activePanel: 'bodies'})
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

    let message = this.state.message
      ? <div className='NewMonster__message'>
          <span className="material-icons">error_outline</span>{this.state.message}
        </div>
      : null

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
      <Fragment>
        {this.state.showModal
          ? <MonsterSavedModal setShowModal={this.setShowModal}
              resetMonster={this.props.resetMonster}
              setActivePanelBodies={this.setActivePanelBodies} />
          : null}
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
                  {noFeatureSelected ? monsterDirections : <MonsterFromStore /> }
                </div>
                <input className='NewMonster__name-input'
                  name='name'
                  type='text'
                  placeholder='Name (optional)'
                  value={this.props.monsterName}
                  onChange={this.handleNameInputChange} />
                <div className='NewMonster__buttons-ctr'>
                  {message}
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
      </Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewMonster))
