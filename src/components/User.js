import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import '../styles/User.css'
import * as actions from '../actions/index'

import MonsterFromProps from './MonsterFromProps'
import Spinner from './Spinner'
import LikesModal from './LikesModal'

class User extends Component  {
  state = {
    initialFetch: true,
    username: null,
    monsters: [],
    showLikesModal: false,
    likesModalMonster: null
  }

  componentDidMount = () => {
    this.props.fetchStarted()
    let username = this.props.match.params.username
    axios.get(`http://localhost:4000/api/users/${username}`)
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
      let monstersNewest = [...this.state.monsters].sort((a,b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
      let popular = monstersNewest.sort((a,b) => {
        return b.like_count - a.like_count
      })
      this.setState({monsters: popular})
    }
  }

  handleLikeUnlike401 = () => {
    this.props.logout()
    this.props.history.push('/')
    this.props.setMessage('Please log in or sign up to do that')
  }

  handleLikeUnlikeSetState = (res) => {
    let monster = this.state.monsters.find(monster => {
      return monster.id === res.data.id
    })
    let monsterIndex = this.state.monsters.indexOf(monster)
    let updatedMonsters = [...this.state.monsters]
    updatedMonsters.splice(monsterIndex, 1, res.data)
    this.setState({
      monsters: updatedMonsters
    })
  }

  handleLikeClick = (event) => {
    this.props.fetchStarted()
    let monsterId = event.currentTarget.dataset.monsterId
    axios.post(`http://localhost:4000/api/like?monster_id=${monsterId}`,
      null,
      {'headers': {'Authorization': localStorage.getItem('user_token')}}
    )
    .then(res => {
      console.log(res.data);
      this.handleLikeUnlikeSetState(res)
      this.props.fetchEnded()
    })
    .catch(err => {
      console.log(err);
      if (err.response.status === 401) {
        this.handleLikeUnlike401()
      }
      this.props.fetchEnded()
    })
  }

  handleUnlikeClick = (event) => {
    this.props.fetchStarted()
    let monsterId = event.currentTarget.dataset.monsterId
    axios.delete(`http://localhost:4000/api/unlike?monster_id=${monsterId}`,
      {'headers': {'Authorization': localStorage.getItem('user_token')}}
    )
    .then(res => {
      console.log(res.data);
      this.handleLikeUnlikeSetState(res)
      this.props.fetchEnded()
    })
    .catch(err => {
      console.log(err);
      if (err.response.status === 401) {
        this.handleLikeUnlike401()
      }
      this.props.fetchEnded()
    })
  }

  setShowLikesModal = (monster) => {
    this.setState({showLikesModal: !this.state.showLikesModal})

    this.state.showLikesModal
    ? this.setState({likesModalMonster: null})
    : this.setState({likesModalMonster: monster})
  }

  handleToTopClick = () => {
    window.scrollTo(0, 0)
  }

  handleMonsterClick = (monster) => {
    this.props.history.push(`/monsters/${monster.id}`)
  }

  render() {
    console.log(this.props.location);
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
            <div key={monster.id} className='User__monster-outer-ctr'>
              {monster.username === this.props.username
                ? <div className='User__edit-ctr'>
                    <Link to={`/monsters/${monster.id}/edit`} className='User__edit'>
                      Edit
                    </Link>
                  </div>
                : null}
              <div className='User__monster-ctr'
                onClick={() => this.handleMonsterClick(monster)}>
                <MonsterFromProps monster={monster} withDetails={true} />
              </div>
              <button className='User__like-count-ctr'
                onClick={() => this.setShowLikesModal(monster)}>
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
            {this.props.location.state
              ? this.props.location.state.message
                  ? <div className='User__message-ctr'>
                    <i className='material-icons'>check_circle_outline</i>
                      {this.props.location.state.message}
                    </div>
                  : null
              : null}
             {this.state.monsters.length > 0
              ? <div className='User__monsters-ctr'>
                {/* {this.props.location.state
                  ? this.props.location.state.message
                      ? <div className='User__message-ctr'>
                        <i className='material-icons'>check_circle_outline</i>
                          {this.props.location.state.message}
                        </div>
                      : null
                  : null} */}
                  <div className='User__sort-ctr'>
                    <div className='User__sort-by-ctr'>
                      <div className='User__drop-down'>
                        <select value={this.state.sortBy} onChange={this.handleSelectChange}>
                          <option value='newest'>Newest</option>
                          <option value='oldest'>Oldest</option>
                          <option value='popular'>Popular</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {monstersArr}
                </div>
              : <div className='User__no-monsters-ctr'>
                  {this.props.username === this.props.match.params.username
                    ? <Fragment>
                        <h4>You have not created any monsters yet!</h4>
                        <Link to='/monsters/new' className='User__no-monsters-btn'>
                          Create a monster
                        </Link>
                      </Fragment>
                    : 'This user has no monsters yet'}
                </div>
              }
            </Fragment>
      } else {
        content = <div className='User__not-found'><h3>User Not Found</h3></div>
      }
    }

    return (
      <Fragment>
        {this.state.showLikesModal
          ? <LikesModal setShowLikesModal={this.setShowLikesModal}
              likes={this.state.likesModalMonster.liked_by}
            />
          : null}
        <div className='User'>
          {content}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    isFetching: state.request.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (message, icon) => dispatch(actions.setMessage(message, icon)),
    fetchStarted: () => dispatch(actions.fetchStarted()),
    fetchEnded: () => dispatch(actions.fetchEnded()),
    logout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
