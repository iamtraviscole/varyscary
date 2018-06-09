import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../styles/NewMonster.css'
import { monsterComponents } from '../utils/NewMonsterUtil.js'

import NewMonsterButton from './NewMonsterButton'
import NewMonsterBodies from './NewMonsterPanels/NewMonsterBodies'
import NewMonsterFaces from './NewMonsterPanels/NewMonsterFaces'
import NewMonsterHeadwear from './NewMonsterPanels/NewMonsterHeadwear'
import NewMonsterEyes from './NewMonsterPanels/NewMonsterEyes'
import NewMonsterMouths from './NewMonsterPanels/NewMonsterMouths'
import NewMonsterArms from './NewMonsterPanels/NewMonsterArms'
import NewMonsterLegs from './NewMonsterPanels/NewMonsterLegs'

class NewMonster extends Component {
  state = {
    showArrows: false,
    fixedMonster: false,
    activePanel: 'bodies'
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
      ? this.setState({fixedMonster: true})
      : this.setState({fixedMonster: false})
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

  // turn this into object?
  // const activePanel = {
  //   bodies: <NewMonsterBodies />,
  //   faces: <NewMonsterFaces />
  //   etc...
  // }
  activePanel = () => {
    switch (this.state.activePanel) {
      case 'bodies':
        return <NewMonsterBodies />
      case 'faces':
        return <NewMonsterFaces />
      case 'headwear':
        return <NewMonsterHeadwear />
      case 'eyes':
        return <NewMonsterEyes />
      case 'mouth':
        return <NewMonsterMouths />
      case 'arms':
        return <NewMonsterArms />
      case 'legs':
        return <NewMonsterLegs />
      default:
        return null
    }
  }

  render() {
    let monsterStyle = 'NewMonster__monster-inner-ctr'
    if (this.state.fixedMonster) {
     monsterStyle += ' NewMonster__monster-inner-ctr--fixed'
    }

    let navCtrClass = 'NewMonster__nav-ctr'
    let navClass = 'NewMonster__nav'
    if (this.state.showArrows) {
      navCtrClass += ' NewMonster__nav-ctr--center'
      navClass += ' NewMonster__nav--margin'
    }

    return (
      <div className='NewMonster'>
        <div className='NewMonster__ctr'>
          <div className='NewMonster__left-grid-ctr'>
            {/* <h3>Choose Features:</h3> */}
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
                  activePanelName='mouth'>Mouths</NewMonsterButton>
                <NewMonsterButton activePanel={this.state.activePanel}
                  handleActivePanel={this.handleActivePanel}
                  activePanelName='arms'>Arms</NewMonsterButton>
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
              {this.activePanel()}
            </form>
          </div>
          <div className='NewMonster__right-grid-ctr'>
            <div className={monsterStyle}>
              <h2 className='NewMonster__h2'>Make a monster!</h2>
              <p>Choose your features</p>
              {monsterComponents.bodies[this.props.monster.body.type]}
              {monsterComponents.faces[this.props.monster.face.type]}
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

export default connect(mapStateToProps)(NewMonster)
