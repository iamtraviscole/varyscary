import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import '../styles/Monster.css'
import * as monsterUtil from '../utils/monster'
import * as actions from '../actions/actions'

import MonsterFromProps from './MonsterFromProps'
import Spinner from './Spinner'
import NoAuthNavBar from './NoAuthNavBar'
import LikesModal from './LikesModal'

class Monster extends Component {
  state = {
    monster: null,
    initialFetch: true,
    showLikesModal: false
  }

  componentDidMount = () => {
    this.props.fetchStarted()
    axios.get(`http://localhost:4000/api/monsters/${this.props.match.params.id}`)
      .then(res => {
        console.log(res.data);
        this.props.fetchEnded()
        this.setState({monster: res.data, initialFetch: false})
      })
      .catch(err => {
        console.log(err);
        this.props.fetchEnded()
        this.setState({initialFetch: false})
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
        this.props.setMessage('Session expired. Please log in')
      } else {
        this.setState({monster: resp})
      }
    })
  }

  setShowLikesModal = (monsterId) => {
    this.setState({showLikesModal: !this.state.showLikesModal})
  }

  render() {
    const monster = this.state.monster

    let noAuthNav = null
    if (!this.props.username) {
      noAuthNav = (
        <div className='Monster__no-auth-nav'>
          <NoAuthNavBar />
        </div>
      )
    }

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

    return (
      <Fragment>
        {noAuthNav}
        {this.state.showLikesModal
          ? <LikesModal setShowLikesModal={this.setShowLikesModal}
              likes={this.state.monster.liked_by}
            />
          : null}
        {this.state.initialFetch
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
                    <button className='Monster__likes'
                      onClick={this.setShowLikesModal}
                      likes={this.state.monster.liked_by}>
                      {monster.like_count} {monster.like_count === 1 ? 'like' : 'likes'}
                    </button>
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
                  {monster.tags.length > 0
                    ? <div className='Monster__tags-ctr'>
                        <ul className='Monster__tags'>
                          {monsterTags}
                        </ul>
                      </div>
                    : null}
                </div>
              </div>
            : <div className='Monster__other'>
                Monster not found
              </div>
        }
      </Fragment>
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
    setMessage: (message, icon) => dispatch(actions.setMessage(message, icon)),
    fetchStarted: () => dispatch(actions.fetchStarted()),
    fetchEnded: () => dispatch(actions.fetchEnded())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monster)
