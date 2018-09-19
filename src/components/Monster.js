import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/Monster.css'
import * as monsterUtil from '../utils/monster'
import * as actions from '../actions/actions'

import MonsterFromProps from './MonsterFromProps'
import Spinner from './Spinner'

class Monster extends Component {
  state = {
    monster: null,
    initialFetch: true
  }

  componentDidMount = () => {
    monsterUtil.getMonster(this.props.match.params.id)
    .then(monster => {
      this.setState({monster: monster, initialFetch: false})
    })
  }

  handleLikeClick = (event) => {
    let monsterId = event.currentTarget.dataset.monsterId
    monsterUtil.likeMonster(monsterId)
    .then(resp => {
      if (resp === 401) {
        this.props.history.push('/')
        this.props.setMessage('Please log in to like monsters')
      } else {
        this.setState({monster: resp})
      }
    })
  }

  handleUnlikeClick = (event) => {
    let monsterId = event.currentTarget.dataset.monsterId
    monsterUtil.unlikeMonster(monsterId)
    .then(resp => {
      if (resp === 401) {
        this.props.history.push('/')
        this.props.setMessage('Please log in to unlike monsters')
      } else {
        this.setState({monster: resp})
      }
    })
  }

  render() {
    console.log(this.state);
    const monster = this.state.monster

    return (
      this.state.initialFetch
        ? <div className='Monster__other'>
            <Spinner />
          </div>
        : monster
          ? <div className='Monster'>
              <div className='Monster__monster-ctr'>
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
              <div className='Monster__details-ctr'>
                <div className='Monster__creator-ctr'>
                  <h1 className='Monster__name'>{monster.name}</h1>
                  <p className='Monster__created-by'>by</p>
                  <div className='Monster__creator'>
                    <Link to={'/' + monster.username}>{monster.username}</Link>
                  </div>
                  <br></br>
                  <p className='Monster__created-on'>on</p>
                  <p className='Monster__created-on-date'>{monster.created_at_day_year}</p>
                </div>
                <div className='Monster__likes-ctr'>
                  <a className='Monster__likes'>
                    {monster.like_count} {monster.like_count === 1 ? 'like' : 'likes'}
                  </a>
                  {monster.liked_by.includes(this.props.username) ?
                    <button className='Monster__unlike-btn'
                      data-monster-id={monster.id}
                      onClick={this.handleUnlikeClick}>
                        <i className='material-icons'>favorite</i>
                    </button>
                    : <button className='Monster__like-btn'
                      data-monster-id={monster.id}
                      onClick={this.handleLikeClick}>
                        <i className='material-icons'>favorite_border</i>
                    </button>}
                  </div>
                <div className='Monster__tags-ctr'>
                  <h3 className='Monster__tags-header'>
                    <i className='material-icons'>label_outline</i> Tags
                  </h3>
                  <div className='Monster__tags'>
                    #somecooltag, #somecoolertag, #someevencoolertag, #tag, #wowawesome, #somecooltag, #somecoolertag, #someevencoolertag, #tag, #wowawesome, #somecooltag, #somecoolertag, #someevencoolertag, #tag, #wowawesome, #somecooltag, #somecoolertag, #someevencoolertag, #tag, #wowawesome, #somecooltag, #somecoolertag, #someevencoolertag, #tag, #wowawesome, #somecooltag, #somecoolertag, #someevencoolertag, #tag, #wowawesome, #somecooltag, #somecoolertag, #someevencoolertag, #tag, #wowawesome, #somecooltag, #somecoolertag, #someevencoolertag, #tag, #wowawesome, #somecooltag, #somecoolertag, #someevencoolertag, #tag, #wowawesome, #somecooltag, #somecoolertag, #someevencoolertag, #tag, #wowawesome, #somecooltag, #somecoolertag, #someevencoolertag, #tag, #wowawesome,
                  </div>
                </div>
              </div>
            </div>
          : <div className='Monster__other'>
              Monster not found
            </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (message, icon) => dispatch(actions.setMessage(message, icon))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monster)
