import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/MonsterModal.css'

import MonsterFromProps from './MonsterFromProps'

class MonsterModal extends Component {

  state = {
    monster: null,
    showLikesSlideout: false
  }

  componentDidMount = () => {
    this.setState({monster: this.props.monster})
  }

  handleModalClick = () => {
    this.props.setShowMonsterModal()
  }

  handleInnerClick = (event) => {
    event.stopPropagation()
  }

  handleLikeClick = () => {
    this.props.handleLikeClick(null, this.props.monster)
    .then(likedMonster => {
      if (likedMonster) {
        this.setState({monster: likedMonster})
      }
    })
  }

  handleUnlikeClick = () => {
    this.props.handleUnlikeClick(null, this.props.monster)
    .then(unlikedMonster => {
      if (unlikedMonster) {
        this.setState({monster: unlikedMonster})
      }
    })
  }

  toggleLikesSlideout = () => {
    this.setState({showLikesSlideout: !this.state.showLikesSlideout})
  }

  handleSlideoutClose = () => {
    this.setState({showLikesSlideout: false})
  }

  render() {
    const monster = this.state.monster

    let monsterTags = null
    if (monster) {
      monsterTags = monster.tags.map((tag, i) => {
        return (
          <li key={i} className='Monster__tag' onClick={this.handleModalClick}>
            <Link to={`/monsters?sort_by=newest&search=${tag}`}>#{tag}</Link>
          </li>
        )
      })
    }

    let likes
    if (monster) {
      if (monster.liked_by.length > 0) {
        likes = monster.liked_by.map((like, i) => {
          return (
            <li key={i} className='MonsterModal__like-li'>
              <Link to={`/${like}`}>{like}</Link>
            </li>
          )
        })
      } else {
        likes = <div className='LikesModal__no-likes'>No likes yet!</div>
      }
    }

    let slideOutClass = 'MonsterModal__likes-slideout'
    if (this.state.showLikesSlideout) {
      slideOutClass += ' MonsterModal__likes-slideout--show'
    }

    return (
      monster ?
        <div className='MonsterModal' onClick={this.handleModalClick}>
          <div className='MonsterModal__outer-ctr'>
            <div className='MonsterModal__link-inner-ctr'>
              <Link to={`monsters/${this.props.monster.id}`} className='MonsterModal__monster-link'>
                <i className='material-icons'>launch</i> link
              </Link>
              <button className='MonsterModal__close-btn'>
                <i className='material-icons'>close</i>
              </button>
            </div>
            <div className='MonsterModal__inner-ctr' onClick={this.handleInnerClick}>
              <div className={slideOutClass} onClick={this.handleSlideoutClose}>
                <div className='MonsterModal__likes-slideout-h-ctr'>
                  <h3>Liked By</h3>
                  <button className='MonsterModal__likes-slideout-close'
                    onClick={this.handleSlideoutClose}>
                    <i className='material-icons'>close</i>
                  </button>
                </div>
                <ul className='MonsterModal__likes-ul'>
                  {likes}
                </ul>
              </div>
              <div className='MonsterModal__monster-ctr'>
                <div className='MonsterModal__monster-inner-ctr'>
                  <MonsterFromProps monster={monster} />
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
                    onClick={this.toggleLikesSlideout}>
                    {monster.like_count} {monster.like_count === 1 ? 'like' : 'likes'}
                  </button>
                  {monster.liked_by.includes(this.props.username) ?
                    <button className='MonsterModal__unlike-btn'
                      onClick={this.handleUnlikeClick}>
                        <i className='material-icons'>favorite</i>
                    </button>
                    : <button className='MonsterModal__like-btn'
                      onClick={this.handleLikeClick}>
                        <i className='material-icons'>favorite_border</i>
                    </button>}
                  </div>
                  <div className='MonsterModal__tags-ctr'>
                    <ul className='MonsterModal__tags'>
                      {monsterTags}
                    </ul>
                  </div>
              </div>
            </div>
          </div>
        </div>
      : null
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
  }
}

export default withRouter(connect(mapStateToProps)(MonsterModal))
