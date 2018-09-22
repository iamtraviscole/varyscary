import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import '../styles/Monsters.css'
import * as monsterUtil from '../utils/monster'
import * as actions from '../actions/actions'

import MonsterFromProps from './MonsterFromProps'
import NoAuthNavBar from './NoAuthNavBar'
import Spinner from './Spinner'

class Monsters extends Component  {
  state = {
    sortBy: 'newest',
    limit: 50,
    offset: 0,
    monsters: [],
    initialFetch: true,
    showLoadMore: true
  }

  componentDidMount = () => {
    monsterUtil.getMonsters(this.state.sortBy, this.state.limit,
      this.state.offset)
    .then(monsts => {
      let monsters = []
      monsts.forEach(monster => {
        monsters.push(monster)
      })
      this.setState({
        monsters: monsters,
        initialFetch: false
      })
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.sortBy !== prevState.sortBy) {
      monsterUtil.getMonsters(this.state.sortBy, this.state.limit,
        this.state.offset)
      .then(monsts => {
        let monsters = []
        monsts.forEach(monster => {
          monsters.push(monster)
        })
        this.setState({monsters: monsters})
      })
    }
  }

  handleSelectChange = (event) => {
    this.setState({
      offset: 0,
      showLoadMore: true,
      sortBy: event.target.value
    })
  }

  handleLoadClick = () => {
    monsterUtil.getMonsters(this.state.sortBy, this.state.limit,
      this.state.offset + this.state.limit)
    .then(monsts => {
      if (monsts.length < this.state.limit) {
        this.setState({showLoadMore: false})
      }
      let monsters = [...this.state.monsters]
      monsts.forEach(monster => {
        monsters.push(monster)
      })
      this.setState({
        monsters: monsters,
        offset: this.state.offset + this.state.limit
      })
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
        let monster = this.state.monsters.find(monster => {
          return monster.id === resp.id
        })
        let monsterIndex = this.state.monsters.indexOf(monster)
        let updatedMonsters = [...this.state.monsters]
        updatedMonsters.splice(monsterIndex, 1, resp)
        this.setState({
          monsters: updatedMonsters
        })
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
        let monster = this.state.monsters.find(monster => {
          return monster.id === resp.id
        })
        let monsterIndex = this.state.monsters.indexOf(monster)
        let updatedMonsters = [...this.state.monsters]
        updatedMonsters.splice(monsterIndex, 1, resp)
        this.setState({
          monsters: updatedMonsters
        })
      }
    })
  }

  handleLikeCountClick = () => {
    // show modal with likes?
  }

  handleToTopClick = () => {
    window.scrollTo(0, 0)
  }

  render() {
    let monstersUserLiked = []
    this.state.monsters.forEach(monster => {
      if (monster.liked_by.includes(this.props.username)) {
        monstersUserLiked.push(monster)
      }
    })

    let monstersArr = this.state.monsters.map(monster => {
      return (
        <div key={monster.id} className='Monsters__monster-ctr'>
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
            username={monster.username}
            withDetails={true}
          />
          <button className='Monsters__like-count-ctr'
            onClick={this.handleLikeCountClick}>
            {monster.like_count} likes
          </button>
          {monstersUserLiked.includes(monster) ?
            <button className='Monsters__unlike-ctr'
              data-monster-id={monster.id}
              onClick={this.handleUnlikeClick}>
              <i className='material-icons'>favorite</i>
            </button>
            : <button className='Monsters__like-ctr'
                data-monster-id={monster.id}
                onClick={this.handleLikeClick}>
                <i className='material-icons'>favorite_border</i>
              </button>}
        </div>
      )
    })

    let noAuthNav = null
    if (!this.props.username) {
      noAuthNav = (
        <div className='Monsters__no-auth-nav'>
          <NoAuthNavBar />
        </div>
      )
    }

    let loadButton

    if (this.state.showLoadMore && this.state.monsters.length < this.state.limit) {
      loadButton = null
    } else if (this.state.showLoadMore && this.state.monsters.length >= this.state.limit) {
        loadButton = (
          <button className='Monsters__load-more-btn' onClick={this.handleLoadClick}>
            Load More
            <br></br>
            <i className='material-icons'>keyboard_arrow_down</i>
          </button>
        )
    } else {
        loadButton = (
          <div className='Monsters__all-loaded'>
            That's all of them!
          </div>
      )
    }

    return (
      <Fragment>
        {noAuthNav}
        <div className='Monsters'>
          <h1>Monsters</h1>
          <div className='Monsters__sort-ctr'>
            <div className='Monsters__drop-down'>
              <div className='Monsters__sort-by'>Sort by:</div>
              <select value={this.state.sortBy} onChange={this.handleSelectChange}>
                <option value='newest'>Newest</option>
                <option value='oldest'>Oldest</option>
                <option value='popular'>Popular</option>
              </select>
            </div>
          </div>
          <div className='Monsters__monsters-ctr'>
            {this.state.initialFetch ?
              <div className='Monsters__spinner-ctr'>
                <Spinner />
              </div>
              : monstersArr}
          </div>
          {!this.state.initialFetch ?
            <div className='Monsters__load-more-ctr'>
              {loadButton}
              <button className='Monsters__to-top-btn' onClick={this.handleToTopClick}>
                Top<i className='material-icons'>arrow_upward</i>
              </button>
            </div>
            : null}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    isFetching: state.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (message, icon) => dispatch(actions.setMessage(message, icon))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monsters)
