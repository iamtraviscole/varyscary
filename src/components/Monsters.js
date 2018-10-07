import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import '../styles/Monsters.css'
import * as monsterUtil from '../utils/monster'
import * as actions from '../actions/actions'

import MonsterFromProps from './MonsterFromProps'
import NoAuthNavBar from './NoAuthNavBar'
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
    searchedValue: ''
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
        {noAuthNav}
        <div className='Monsters'>
          <h1>Monsters</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Monsters)
