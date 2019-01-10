import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import '../styles/Monster.css'
import * as actions from '../actions/index'

import MonsterFromProps from './MonsterFromProps'
import Spinner from './Spinner'
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
        this.setState({monster: res.data, initialFetch: false})
        this.props.fetchEnded()
      })
      .catch(err => {
        console.log(err);
        this.setState({initialFetch: false})
        this.props.fetchEnded()
      })
  }

  handleLikeUnlike401 = () => {
    this.props.logout()
    this.props.history.push('/')
    this.props.setMessage('Please log in or sign up to do that')
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
      this.setState({monster: res.data})
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
      this.setState({monster: res.data})
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

  setShowLikesModal = () => {
    this.setState({showLikesModal: !this.state.showLikesModal})
  }

  render() {
    const monster = this.state.monster

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
                  <MonsterFromProps monster={monster} />
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
                <h3>Monster not found</h3>
              </div>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
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

export default connect(mapStateToProps, mapDispatchToProps)(Monster)
