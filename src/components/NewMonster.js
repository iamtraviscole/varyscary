import React, { Component } from 'react'

import '../styles/NewMonster.css'

class NewMonster extends Component {
  state = {
    showArrows: false,
    windowYScroll: null,
    windowInnerHeight: null,
    toggleBodies: 'hide',
    toggleFaces: 'hide'
  }

  setShowArrows = () => {
    const navCtrWidth = document.getElementsByClassName('NewMonster__nav-ctr')[0].offsetWidth
    const navWidth = document.getElementsByClassName('NewMonster__nav')[0].scrollWidth
    navCtrWidth < navWidth
    ? this.setState({showArrows: true})
    : this.setState({showArrows: false})
  }

  setScrollPosition = () => {
    this.setState({windowYScroll: window.scrollY})
    this.setState({windowInnerHeight: window.innerHeight})
  }

  componentDidMount = () => {
    this.setShowArrows()
    window.addEventListener('resize', this.setShowArrows)
    window.addEventListener('scroll', this.setScrollPosition)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.setShowArrows)
    window.removeEventListener('scroll', this.setScrollPosition)
  }

  handleLeftArrowClick = () => {
    document.getElementsByClassName('NewMonster__nav')[0].scrollLeft -= 35
  }

  handleRightArrowClick = () => {
    document.getElementsByClassName('NewMonster__nav')[0].scrollLeft += 35
  }

  handleAttributesToggle = (type) => {
    if (this.state[type] === 'hide') {
      this.setState({[type]: 'show'})
    }
    if (this.state[type] === 'show') {
      this.setState({[type]: 'hide'})
    }
  }

  render() {
    let monsterStyle = 'NewMonster__monster-inner-ctr'
    if (this.state.windowYScroll > 75 && window.windowInnerHeight > 506) {
     monsterStyle = 'NewMonster__monster-inner-ctr--top'
    }

    let navCtrClass = 'NewMonster__nav-ctr'
    if (this.state.showArrows) navCtrClass += ' NewMonster__nav-ctr--center'

    let navClass = 'NewMonster__nav'
    if (this.state.showArrows) navClass += ' NewMonster__nav--margin'

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
                <button className='NewMonster__features-btn'>Bodies</button>
                <button className='NewMonster__features-btn'>Faces</button>
                <button className='NewMonster__features-btn'>Headwear</button>
                <button className='NewMonster__features-btn'>Eyes</button>
                <button className='NewMonster__features-btn'>Mouth</button>
                <button className='NewMonster__features-btn'>Arms</button>
                <button className='NewMonster__features-btn'>Legs</button>
              </div>
              {this.state.showArrows
                ? <div className='NewMonster__right-arrow'
                    onClick={this.handleRightArrowClick}>
                      <i className='material-icons'>arrow_forward_ios</i>
                  </div>
                : null
              }
            </div>
          </div>
          <div className='NewMonster__right-grid-ctr'>
            <div className={monsterStyle}>
              <h2 className='NewMonster__h2'>Make a monster!</h2>
              <p>Choose your features</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewMonster
