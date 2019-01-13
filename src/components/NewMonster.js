import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import '../styles/NewMonster.css'
import * as actions from '../actions/index'

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
    activePanel: 'bodies',
    errorMessage: null,
    showModal: false,
    tagValue: '',
    showSlideMonster: false,
    slideMonsterTop: 0
  }

  setShowArrows = () => {
    const navCtrWidth = document.getElementsByClassName('NewMonster__nav-ctr')[0].offsetWidth
    const navWidth = document.getElementsByClassName('NewMonster__nav')[0].scrollWidth
    navCtrWidth < navWidth
    ? this.setState({showArrows: true})
    : this.setState({showArrows: false})
  }

  setSlideMonster = () => {
    let featurePanelHeightFromTop =
      document.getElementsByClassName('NewMonsterPanels__features-ctr')[0].offsetHeight
      + document.getElementsByClassName('NewMonsterPanels__features-ctr')[0].offsetTop
    let monsterCtrHeight =
      document.getElementsByClassName('NewMonster__monster-ctr')[0].offsetHeight

    // 60 = navbar height
    // 25 = monster container top margin
    // if scrolled further than monster container and not further than feature
    //  panel then show monster slider 25px from top
    if (window.scrollY > monsterCtrHeight + 60 + 25
      && window.scrollY + monsterCtrHeight + 25  < featurePanelHeightFromTop) {
        this.setState({
          showSlideMonster: true,
          slideMonsterTop: window.scrollY + 25
        })
    // if scrolled further than feature panel then show monster slider 25px
    //  from bottom
  } else if (window.scrollY + monsterCtrHeight + 25 > featurePanelHeightFromTop) {
        this.setState({
          showSlideMonster: true,
          slideMonsterTop: window.scrollY + window.innerHeight - (monsterCtrHeight + 25)
        })
    } else {
        this.setState({showSlideMonster: false, slideMonsterTop: 0})
    }
  }


  componentDidMount = () => {
    this.setShowArrows()
    if (!this.props.monster.monsterFeatures.body.type) {
      this.setState({errorMessage: 'Body required'})
    } else {
      this.setState({errorMessage: null})
    }
    window.addEventListener('resize', this.setShowArrows)
    window.addEventListener('scroll', this.setSlideMonster)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.setShowArrows)
    window.removeEventListener('scroll', this.setSlideMonster)
  }

  componentDidUpdate = () => {
    if (!this.props.monster.monsterFeatures.body.type) {
      this.setState({errorMessage: 'Body required'})
    } else if (this.props.monster.monsterName.length > 25) {
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
    const monsterFeatures = this.props.monster.monsterFeatures

    if (!this.state.errorMessage) {
      this.props.fetchStarted()
      const monster = {
        'name': this.props.monster.monsterName,
        'body_type': monsterFeatures.body.type,
        'body_fill': monsterFeatures.body.fillColor,
      	'face_type': monsterFeatures.face.type,
        'face_fill': monsterFeatures.face.fillColor,
      	'headwear_type': monsterFeatures.headwear.type,
        'headwear_fill': monsterFeatures.headwear.fillColor,
      	'eyes_type': monsterFeatures.eyes.type,
        'eyes_fill': monsterFeatures.eyes.fillColor,
      	'mouth_type': monsterFeatures.mouth.type,
        'mouth_fill': monsterFeatures.mouth.fillColor,
      	'left_arm_type': monsterFeatures.leftArm.type,
        'left_arm_fill': monsterFeatures.leftArm.fillColor,
      	'right_arm_type': monsterFeatures.rightArm.type,
        'right_arm_fill': monsterFeatures.rightArm.fillColor,
      	'legs_type': monsterFeatures.legs.type,
        'legs_fill': monsterFeatures.legs.fillColor,
        'tags_attributes': {'names': this.props.monster.monsterTags}
      }
      axios.post('http://localhost:4000/api/monsters',
        {'monster': monster},
        {'headers':{'Authorization': localStorage.getItem('user_token')}}
      )
      .then(res => {
        console.log(res.data);
        this.props.fetchEnded()
        this.setState({showModal: true})
      })
      .catch(err => {
        console.log(err.response);
        this.props.fetchEnded()
        if (err.response.status === 401) {
          this.props.logout()
          this.props.setMessage('Session expired. Please log in.')
        }
      })
    }
  }

  setShowModal = () => {
    this.setState({showModal: !this.state.showModal})
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

    if (this.state.showModal) {
      document.documentElement.setAttribute('style', 'overflow-y: hidden');
    } else {
      document.documentElement.removeAttribute('style');
    }

    let noFeatureSelected = true
    for (const feature in {...monster.monsterFeatures}) {
      if (monster.monsterFeatures[feature].type !== null) {
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
    if (monster.monsterFeatures.body.type) noBodySelected = false

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

    let monsterDirections = (
      <div className='NewMonster__directions-ctr'>
        <h1 className='NewMonster__directions-header'>Create a monster!</h1>
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
      monster.monsterTags.map( (tag, i) => {
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
              setActivePanelBodies={this.setActivePanelBodies}
              username={this.props.username} />
          : null}
        <div className='NewMonster'>
          <div className='NewMonster__ctr'>
            <div className='NewMonster__left-grid-ctr'>
              <div className={navCtrClass}>
                {this.state.showArrows
                  ? <div className='NewMonster__arrow NewMonster__arrow--left'
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
                  ? <div className='NewMonster__arrow NewMonster__arrow--right'
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
              <div className='NewMonster__monster-outer-ctr'>
                <div className='NewMonster__monster-ctr'>
                  {noFeatureSelected ? monsterDirections : <MonsterFromStore />}
                </div>
                <div className='NewMonster__name-tags-outer-ctr'>
                  <input className='NewMonster__name-input'
                    name='name'
                    type='text'
                    placeholder='name (optional)'
                    value={monster.monsterName}
                    onChange={this.handleNameChange} />
                  <div className='NewMonster__tags-instructions-ctr'>
                    <i className='material-icons'>info_outline</i>
                    press enter or click 'Add' to add tags
                  </div>
                  <form onSubmit={this.handleTagSubmit}>
                    <input className='NewMonster__tag-input'
                      value={this.state.tagValue}
                      placeholder={monster.monsterTags.length > 0
                        ? 'another tag (optional)'
                        : 'tag (optional)'}
                      type='text'
                      onChange={this.handleTagChange}/>
                    <input className={this.state.tagValue
                      ? 'NewMonster__tag-add-btn NewMonster__btn-pulse'
                      : 'NewMonster__tag-add-btn'}
                      value='Add'
                      type='submit' />
                  </form>
                  <div className='NewMonster__tags-ctr'>
                    {monsterTags}
                    {monster.monsterTags.length > 1
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
              { this.state.showSlideMonster
                ? <div className='NewMonster__slide-monster-ctr' style={{top: this.state.slideMonsterTop}}>
                    {noFeatureSelected ? monsterDirections : <MonsterFromStore />}
                  </div>
                : null
              }
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    monster: state.monster,
    username: state.user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetMonster: () => dispatch(actions.resetMonster()),
    randomizeMonster: () => dispatch(actions.randomizeMonster()),
    setMonsterName: (name) => dispatch(actions.setMonsterName(name)),
    addMonsterTag: (tag) => dispatch(actions.addMonsterTag(tag)),
    removeMonsterTag: (tagIndex) => dispatch(actions.removeMonsterTag(tagIndex)),
    clearMonsterTags: () => dispatch(actions.clearMonsterTags()),
    setMessage: (message, icon) => dispatch(actions.setMessage(message, icon)),
    fetchStarted: () => dispatch(actions.fetchStarted()),
    fetchEnded: () => dispatch(actions.fetchEnded()),
    logout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewMonster))
