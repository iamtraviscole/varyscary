import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import '../styles/Monsters.css'
import * as actions from '../actions/index'

import MonsterFromProps from './MonsterFromProps'
import LikesModal from './LikesModal'
import MonsterModal from './MonsterModal'
import Spinner from './Spinner'

class Monsters extends Component  {
  state = {
    sortBy: '',
    limit: 50,
    offset: 50,
    monsters: [],
    error: null,
    initialFetch: true,
    showLoadMore: true,
    searchValue: '',
    searchedValue: '',
    showLikesModal: false,
    likesForModal: [],
    showMonsterModal: false,
    monsterForModal: null
  }

  getSortByFromParams = () => {
    const UrlParams = new URLSearchParams(this.props.location.search)
    const sortBy = UrlParams.get('sort_by')
    return sortBy
  }

  getSearchFromParams = () => {
    const UrlParams = new URLSearchParams(this.props.location.search)
    const searchValue = UrlParams.get('search')
    return searchValue
  }

  makeParamString = (offset = 0) => {
    let paramString = `?sort_by=newest&limit=${this.state.limit}&offset=${offset}`
    if (this.props.location.search) {
      paramString = this.props.location.search +
        `&limit=${this.state.limit}` +
        `&offset=${offset}`
    }

    return paramString
  }

  componentDidMount = () => {
    this.setState({
      sortBy: this.getSortByFromParams() || 'newest',
      searchedValue: this.getSearchFromParams()
    })

    this.props.fetchStarted()
    axios.get('http://localhost:4000/api/monsters' + this.makeParamString())
    .then(res => {
      this.props.fetchEnded()
      this.setState({
        monsters: res.data,
        initialFetch: false
      })
    })
    .catch(err => {
      this.props.fetchEnded()
      console.log(err)
      this.setState({
        error: err.response.statusText,
        initialFetch: false
      })
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({
        offset: 50,
        sortBy: this.getSortByFromParams() || 'newest',
        searchedValue: this.getSearchFromParams()
      })

      this.props.fetchStarted()
      axios.get('http://localhost:4000/api/monsters' + this.makeParamString())
      .then(res => {
        this.props.fetchEnded()
        this.setState({
          monsters: res.data,
          showLoadMore: res.data.length >= this.state.limit
        })
      })
      .catch(err => {
        this.props.fetchEnded()
        console.log(err)
        this.setState({
          error: err.response.statusText
        })
      })
    }
  }

  handleSelectChange = (event) => {
    this.setState({sortBy: event.target.value})
    if (this.getSearchFromParams()) {
      this.props.history.push(`/monsters?sort_by=${event.target.value}` +
        `&search=${this.getSearchFromParams()}`)
    } else {
      this.props.history.push(`/monsters?sort_by=${event.target.value}`)
    }
  }

  handleSearchChange = (event) => {
    this.setState({searchValue: event.target.value})
  }

  handleSearchSubmit = (event) => {
    event.preventDefault()
    if (this.state.searchValue.trim()) {
      this.props.history.push(`/monsters?sort_by=${this.state.sortBy}&search=${this.state.searchValue}`)
      this.setState({
        searchedValue: this.state.searchValue,
        searchValue: '',
      })
    }
  }

  handleSearchClear = () => {
    const params = new URLSearchParams(this.props.location.search)
    params.delete('search')
    this.props.history.push('/monsters?' + params.toString())
    this.setState({searchedValue: ''})
  }

  handleLoadClick = () => {
    this.props.fetchStarted()
    axios.get('http://localhost:4000/api/monsters' + this.makeParamString(this.state.offset))
    .then(res => {
      this.props.fetchEnded()
      if (res.data.length < this.state.limit) {
        this.setState({showLoadMore: false})
      }
      let monsters = this.state.monsters.concat(res.data)
      this.setState({
        monsters: monsters,
        offset: this.state.offset + this.state.limit
      })
    })
    .catch(err => {
      this.props.fetchEnded()
      console.log(err)
      this.setState({
        error: err.response.statusText
      })
    })
  }

  handleLikeRes = (res) => {
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

  handleLikeUnlike401 = () => {
    this.props.logout()
    this.props.history.push('/')
    this.props.setMessage('Please log in or sign up to do that')
  }

  handleLikeClick = (event, modalMonster = null) => {
    this.props.fetchStarted()
    let monsterId = modalMonster
      ? modalMonster.id
      : event.currentTarget.dataset.monsterId
    let likedMonster = (
      axios.post('http://localhost:4000/api/like?monster_id=' + monsterId,
        null,
        {'headers': {'Authorization': localStorage.getItem('user_token')}}
      )
      .then(res => {
        console.log(res)
        this.handleLikeRes(res)
        this.props.fetchEnded()
        return res.data
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          this.handleLikeUnlike401()
        }
        this.props.fetchEnded()
        return null
      })
    )
    // Using likedMonster in MonsterModal
    return likedMonster
  }

  handleUnlikeClick = (event, modalMonster = null) => {
    this.props.fetchStarted()
    let monsterId = modalMonster
      ? modalMonster.id
      : event.currentTarget.dataset.monsterId
    let unlikedMonster = (
      axios.delete('http://localhost:4000/api/unlike?monster_id=' + monsterId,
        {'headers': {'Authorization': localStorage.getItem('user_token')}}
      )
      .then(res => {
        console.log(res)
        this.handleLikeRes(res)
        this.props.fetchEnded()
        return res.data
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          this.handleLikeUnlike401()
        }
        this.props.fetchEnded()
        return null
      })
    )
    // Using unlikedMonster in MonsterModal
    return unlikedMonster
  }

  handleModalLikeOrUnlike = (modalMonster) => {
    console.log(modalMonster);
    let monster = this.state.monsters.find(monster => {
      return monster.id === modalMonster.id
    })
    let monsterIndex = this.state.monsters.indexOf(monster)
    let updatedMonsters = [...this.state.monsters]
    updatedMonsters.splice(monsterIndex, 1, modalMonster)
    this.setState({
      monsters: updatedMonsters
    })
  }

  setShowLikesModal = (monster) => {
    this.setState({showLikesModal: !this.state.showLikesModal})
    if (monster) {
      this.setState({likesForModal: monster.liked_by})
    }
  }

  setShowMonsterModal = (monster) => {
    this.setState({showMonsterModal: !this.state.showMonsterModal})
    if (monster) {
      this.setState({monsterForModal: monster})
    }
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
        <div key={monster.id} className='Monsters__monster-outer-ctr'>
          <div className='Monsters__monster-ctr'
            onClick={() => this.setShowMonsterModal(monster)}>
            <MonsterFromProps monster={monster} withDetails={true} />
          </div>
          <button className='Monsters__like-count-ctr'
            onClick={() => this.setShowLikesModal(monster)}>
            {monster.like_count} {monster.like_count === 1 ? 'like' : 'likes'}
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

    let loadButton
    if (this.state.monsters.length < this.state.limit) {
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
        {this.state.showMonsterModal
          ? <MonsterModal setShowMonsterModal={this.setShowMonsterModal}
              monster={this.state.monsterForModal}
              handleModalLikeOrUnlike={this.handleModalLikeOrUnlike}
              handleLikeClick={this.handleLikeClick}
              handleUnlikeClick={this.handleUnlikeClick} />
          : null}
        {this.state.showLikesModal
          ? <LikesModal setShowLikesModal={this.setShowLikesModal}
              likes={this.state.likesForModal} />
          : null}
        <div className='Monsters'>
          <h1>Explore Monsters</h1>
          <div className='Monsters__explore-ctr'>
            <div className='Monsters__sort-ctr'>
              <div className='Monsters__sort-by-ctr'>
                <div className='Monsters__drop-down'>
                  <select value={this.state.sortBy} onChange={this.handleSelectChange}>
                    <option value='newest'>Newest</option>
                    <option value='oldest'>Oldest</option>
                    <option value='popular'>Popular</option>
                  </select>
                </div>
              </div>
              <div className='Monsters__search-ctr'>
                <form onSubmit={this.handleSearchSubmit}>
                  <i className='material-icons'>search</i>
                  <input type='search'
                    value={this.state.searchValue}
                    onChange={this.handleSearchChange}>
                  </input>
                  {this.state.searchedValue
                    ? <div className='Monsters__searched-ctr'
                        onClick={this.handleSearchClear}>
                      {this.state.searchedValue}
                      <i className='material-icons'>close</i>
                    </div>
                    : null}
                </form>
              </div>
            </div>
              {this.state.initialFetch ?
                <div className='Monsters__spinner-ctr'>
                  <Spinner />
                </div>
                : this.state.monsters.length > 0
                  ? monstersArr
                  : <div className='Monsters__no-results-ctr'>
                      No Monsters Found
                    </div>}
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
    username: state.user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
    setMessage: (message, icon) => dispatch(actions.setMessage(message, icon)),
    fetchStarted: () => dispatch(actions.fetchStarted()),
    fetchEnded: () => dispatch(actions.fetchEnded())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monsters)
