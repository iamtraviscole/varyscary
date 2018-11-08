import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/MonsterModal.css'

import MonsterFromProps from './MonsterFromProps'

class MonsterModal extends Component {

  handleModalClick = () => {
    this.props.setShowMonsterModal()
  }

  handleInnerClick = (event) => {
    event.stopPropagation()
  }

  handleLinkClick = () => {
    this.props.history.push(`monsters/${this.props.monster.id}`)
  }

  render() {
    const monster = this.props.monster

    let monsterTags = null
    if (monster) {
      monsterTags = monster.tags.map((tag, i) => {
        return (
          <li key={i} className='Monster__tag'>
            <Link to={`/monsters?sort_by=newest&search=${tag}`}>#{tag}</Link>
          </li>
        )
      })
    }

    console.log(this.props.history);

    return (
      <div className='MonsterModal' onClick={this.handleModalClick}>
        <div className='MonsterModal__outer-ctr'>
          <div className='MonsterModal__link-inner-ctr'>
            <button className='MonsterModal__monster-link' onClick={this.handleLinkClick}>
              <i className='material-icons'>launch</i> link
            </button>
            <button className='MonsterModal__close-btn'>
              <i className='material-icons'>close</i>
            </button>
          </div>
          <div className='MonsterModal__inner-ctr' onClick={this.handleInnerClick}>
            <div className='MonsterModal__monster-ctr'>
              <div className='MonsterModal__monster-inner-ctr'>
                <MonsterFromProps
                  name={monster.name} id={monster.id}
                  bodyType={monster.body_type} bodyFill={monster.body_fill}
                  faceType={monster.face_type} faceFill={monster.face_fill}
                  headwearType={monster.headwear_type} headwearFill={monster.headwear_fill}
                  eyesType={monster.eyes_type} eyesFill={monster.eyes_fill}
                  mouthType={monster.mouth_type} mouthFill={monster.mouth_fill}
                  rightArmType={monster.right_arm_type} rightArmFill={monster.right_arm_fill}
                  leftArmType={monster.left_arm_type} leftArmFill={monster.left_arm_fill}
                  legsType={monster.legs_type} legsFill={monster.legs_fill}
                  withDetails={false}
                />
              </div>
            </div>
            <div className='MonsterModal__details-ctr'>
              <div className='MonsterModal__info-ctr'>
                <h1 className='MonsterModal__name'>{monster.name}</h1>
                <p className='MonsterModal__created-by'>by</p>
                <div className='MonsterModal__creator'>
                  <Link to={'/' + monster.username}>{monster.username}</Link>
                </div>
                <br></br>
                <p className='MonsterModal__created-on'>on</p>
                <p className='MonsterModal__created-on-date'>{monster.created_at_day_year}</p>
              </div>
              <div className='MonsterModal__likes-ctr'>
                <button className='MonsterModal__likes'
                  onClick={this.setShowLikesModal}>
                  {monster.like_count} {monster.like_count === 1 ? 'like' : 'likes'}
                </button>
                {monster.liked_by.includes(this.props.username) ?
                  <button className='MonsterModal__unlike-btn'
                    data-monster-id={monster.id}
                    onClick={this.handleUnlikeClick}>
                      <i className='material-icons'>favorite</i>
                  </button>
                  : <button className='MonsterModal__like-btn'
                    data-monster-id={monster.id}
                    onClick={this.handleLikeClick}>
                      <i className='material-icons'>favorite_border</i>
                  </button>}
                </div>
              {monster.tags.length > 0
                ? <div className='MonsterModal__tags-ctr'>
                    <h3 className='MonsterModal__tags-header'>
                      <i className='material-icons'>label_outline</i> Tags
                    </h3>
                    <ul className='MonsterModal__tags'>
                      {monsterTags}
                    </ul>
                  </div>
                : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
  }
}

export default withRouter(connect(mapStateToProps)(MonsterModal))
