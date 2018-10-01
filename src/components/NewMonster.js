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
    errorMessage: null,
    showModal: false,
    tagValue: ''
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
    if (!this.props.monster.body.type) {
      this.setState({errorMessage: 'Body required'})
    } else {
      this.setState({errorMessage: null})
    }
    window.addEventListener('resize', this.setShowArrows)
    window.addEventListener('scroll', this.setFixMonster)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.setShowArrows)
    window.removeEventListener('scroll', this.setFixMonster)
  }

  componentDidUpdate = () => {
    if (!this.props.monster.body.type) {
      this.setState({errorMessage: 'Body required'})
    } else if (this.props.monsterName.length > 25) {
      this.setState({errorMessage: 'Name too long (25 characters max)'})
    } else {
      this.setState({errorMessage: null})
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

  handleNameChange = (event) => {
    this.props.setMonsterName(event.target.value)
  }

  handleTagChange = (event) => {
    this.setState({tagValue: event.target.value})
  }

  handleTagSubmit = (event) => {
    event.preventDefault()
    let tagString = this.state.tagValue.replace(/[']/g, '')
      .replace(/[\W_]+/g, ' ').toLowerCase()
    let tagArr = tagString.split(' ')
    tagArr.forEach( tag => {
      if (tag !== '') {
        this.props.addMonsterTag(tag)
      }
    })
    this.setState({tagValue: ''})
  }

  handleRemoveTag = (tagIndex) => {
    this.props.removeMonsterTag(tagIndex)
  }

  handleClearClick = () => {
    this.props.clearMonsterTags()
  }

  handleSaveClick = () => {
    if (!this.state.errorMessage) {
      monsterUtil.createMonster(this.props.monsterName, this.props.monsterTags, this.props.monster)
      .then((saved) => {
        if (saved) {
          this.setState({showModal: true})
        }
      })
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
    this.props.resetMonster()
    this.props.clearMonsterTags()
    this.setState({activePanel: 'bodies'})
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

    let monsterTags = (
      this.props.monsterTags.map( (tag, i) => {
        return (
          <div key={i} className='NewMonster__tag'
            onClick={() => this.handleRemoveTag(i)}>
            {tag}
            <div className='NewMonster__tag-remove'>
              <i className='material-icons'>close</i>
            </div>
          </div>
        )
      })
    )

    let errorMessage = this.state.errorMessage
      ? <div className='NewMonster__error-message'>
          <span className="material-icons">error_outline</span>{this.state.errorMessage}
        </div>
      : null

    let saveButtonClass = 'NewMonster__button-save'
    if (this.state.errorMessage) {
      saveButtonClass = 'NewMonster__button-save NewMonster__button-save--disabled'
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
                        <i className='material-icons'>keyboard_arrow_left</i>
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
                        <i className='material-icons'>keyboard_arrow_right</i>
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
                  placeholder='name (optional)'
                  value={this.props.monsterName}
                  onChange={this.handleNameChange} />
                <div className='NewMonster__tags-outer-ctr'>
                  <div className='NewMonster__add-tags-text'>
                    Add Tags
                  </div>
                  <form onSubmit={this.handleTagSubmit}>
                    <input className='NewMonster__tag-input'
                      value={this.state.tagValue}
                      placeholder={this.props.monsterTags.length > 0
                        ? 'another tag (optional)'
                        : 'tag (optional)'}
                      type='text'
                      onChange={this.handleTagChange}/>
                    <input className='NewMonster__tag-add-btn'
                      value='Add'
                      type='submit' />
                  </form>
                  <div className='NewMonster__tags-ctr'>
                    {monsterTags}
                    {this.props.monsterTags.length > 1
                      ? <button className='NewMonster__tags-clear-all'
                          onClick={this.handleClearClick}>clear</button>
                      : null}
                  </div>
                </div>
                <div className='NewMonster__buttons-ctr'>
                  {errorMessage}
                  <button className={saveButtonClass}
                    onClick={this.handleSaveClick}
                    type='button'>
                    {this.state.errorMessage
                      ? <i className="material-icons">
                        not_interested
                      </i>
                      : <i className="material-icons">
                          add
                        </i>}
                    Create Monster
                  </button>
                  <button className='NewMonster__button-reset'
                    onClick={this.handleResetClick}
                    type='button'>
                    <i className="material-icons">
                      refresh
                    </i>
                    Reset
                  </button>
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
    monsterTags: state.monsterTags,
    monster: state.monster
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetMonster: () => dispatch(actions.resetMonster()),
    randomizeMonster: () => dispatch(actions.randomizeMonster()),
    setMonsterName: (name) => dispatch(actions.setMonsterName(name)),
    addMonsterTag: (tag) => dispatch(actions.addMonsterTag(tag)),
    removeMonsterTag: (tagIndex) => dispatch(actions.removeMonsterTag(tagIndex)),
    clearMonsterTags: () => dispatch(actions.clearMonsterTags())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewMonster))
