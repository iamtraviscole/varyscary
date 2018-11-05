import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import popupMonster1 from '../images/popup-monster-1.svg'
import popupMonster2 from '../images/popup-monster-2.svg'
import popupMonster3 from '../images/popup-monster-3.svg'
import popupMonster4 from '../images/popup-monster-4.svg'

import '../styles/Home.css'

class Home extends Component {
  render() {
    return (
      <div className='Home'>
        <div className='Home__btns-ctr'>
          <div className='Home__btn-ctr'>
            <div className='Home__popup-monster Home__popup-monster-1'>
              <img src={popupMonster1} alt='monster'></img>
            </div>
            <Link to='/monsters/new' className='Home__big-btn Home__make-btn'>
              <div className='Home__text'>
                Make
              </div>
            </Link>
          </div>
          <div className='Home__btn-ctr'>
            <div className='Home__popup-monster Home__popup-monster-2'>
              <img src={popupMonster2} alt='monster'></img>
            </div>
            <Link to='/monsters' className='Home__big-btn Home__explore-btn'>
              <div className='Home__text'>
                Explore
              </div>
            </Link>
          </div>
          <div className='Home__btn-ctr'>
            <div className='Home__popup-monster Home__popup-monster-3'>
              <img src={popupMonster3} alt='monster'></img>
            </div>
            <Link to={`/${this.props.username}`} className='Home__big-btn Home__your-monsters-btn'>
              <div className='Home__text'>
                Your Monsters
              </div>
            </Link>
          </div>
          <div className='Home__btn-ctr'>
            <div className='Home__popup-monster Home__popup-monster-4'>
              <img src={popupMonster4} alt='monster'></img>
            </div>
            <Link to='/home' className='Home__big-btn Home__favorites-btn'>
              <div className='Home__text'>
                Your Favorites
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username
  }
}

export default connect(mapStateToProps)(Home)
