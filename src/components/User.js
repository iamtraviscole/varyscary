import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import '../styles/User.css'
import * as userUtil from '../utils/user'
import * as monsterUtil from '../utils/monster'
import * as actions from '../actions/actions'

import MonsterFromProps from './MonsterFromProps'
import NoAuthNavBar from './NoAuthNavBar'
import Spinner from './Spinner'

class User extends Component  {
  state = {
    initialFetch: true,
    username: null,
    monsters: []
  }

  componentDidMount = () => {
    this.props.fetchStarted()
    axios.get(`http://localhost:4000/api/users/${this.props.match.params.username}`)
    .then(res => {
      console.log(res.data);
      this.setState({
        initialFetch: false,
        username: res.data.username,
        monsters: res.data.monsters
      })
      this.props.fetchEnded()
    })
    .catch(err => {
      console.log(err);
      this.setState({initialFetch: false})
      this.props.fetchEnded()
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      userUtil.getUser(this.props.match.params.username)
      .then(user => {
        if (user) {
          this.setState({
            initialFetch: false,
            username: user.username,
            monsters: user.monsters
          })
        }
      })
    }
  }

  handleSelectChange = (event) => {
    if (event.target.value === 'newest') {
      let newest = [...this.state.monsters].sort((a,b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
      this.setState({monsters: newest})
    } else if (event.target.value === 'oldest') {
      let oldest = [...this.state.monsters].sort((a,b) => {
        return new Date(a.created_at) - new Date(b.created_at)
      })
      this.setState({monsters: oldest})
    } else if (event.target.value === 'popular') {
      let popular = [...this.state.monsters].sort((a,b) => {
        return b.like_count - a.like_count
      })
      this.setState({monsters: popular})
    }
  }


  handleLikeClick = (event) => {
    let monsterId = event.currentTarget.dataset.monsterId
    monsterUtil.likeMonster(monsterId)
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

    let content = null

    if (this.state.initialFetch) {
      content = <div className='User__spinner-ctr'>
        <Spinner />
      </div>
    } else {
      if (this.state.username) {
        let monstersArr = this.state.monsters.map(monster => {
          return (
            <div key={monster.id} className='User__monster-ctr'>
              {monster.username === this.props.username
                ? <div className='User__edit-ctr'>
                    <Link to={`/monsters/${monster.id}/edit`} className='User__edit'>
                      Edit
                    </Link>
                  </div>
                : null}
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
                tags={monster.tags} withDetails={true}
              />
              <button className='User__like-count-ctr'
                onClick={this.handleLikeCountClick}>
                {monster.like_count} {monster.like_count === 1 ? 'like' : 'likes'}
              </button>
              {monstersUserLiked.includes(monster) ?
                <button className='User__unlike-ctr'
                  data-monster-id={monster.id}
                  onClick={this.handleUnlikeClick}>
                  <i className='material-icons'>favorite</i>
                </button>
                : <button className='User__like-ctr'
                    data-monster-id={monster.id}
                    onClick={this.handleLikeClick}>
                    <i className='material-icons'>favorite_border</i>
                  </button>}
            </div>
          )
        })

        content =
          <Fragment>
            <h1>{this.state.username}</h1>
             {this.state.monsters.length > 0
              ? <Fragment>
                  <div className='User__sort-ctr'>
                    <div className='User__drop-down'>
                      <div className='User__sort-by'>Sort by:</div>
                      <select value={this.state.sortBy} onChange={this.handleSelectChange}>
                        <option value='newest'>Newest</option>
                        <option value='oldest'>Oldest</option>
                        <option value='popular'>Popular</option>
                      </select>
                    </div>
                  </div>
                  <div className='User__monsters-ctr'>
                    {monstersArr}
                  </div>
                </Fragment>
              : <div className='User__monsters-ctr'>
                  This user has no monsters yet
                </div>
              }
            </Fragment>
      } else {
        content = <div>User Not Found</div>
      }
    }

    let noAuthNav = null
    if (!this.props.username) {
      noAuthNav = (
        <div className='User__NavBar'>
          <NoAuthNavBar />
        </div>
      )
    }

    return (
      <Fragment>
        {noAuthNav}
        <div className='User'>
          {content}
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
    setMessage: (message, icon) => dispatch(actions.setMessage(message, icon)),
    fetchStarted: () => dispatch(actions.fetchStarted()),
    fetchEnded: () => dispatch(actions.fetchEnded())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
