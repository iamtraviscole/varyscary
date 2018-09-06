import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import '../styles/Monsters.css'
import * as monsterUtil from '../utils/monster'

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
    .then(monstersArr => {
      let monsters = []
      monstersArr.forEach(monster => {
        monsters.push(monster)
      })
      this.setState({monsters: monsters})
      this.setState({initialFetch: false})
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.sortBy !== prevState.sortBy) {
      monsterUtil.getMonsters(this.state.sortBy, this.state.limit,
        this.state.offset)
      .then(monstersArr => {
        let monsters = []
        monstersArr.forEach(monster => {
          monsters.push(monster)
        })
        this.setState({monsters: monsters})
      })
    }
  }

  handleSelectChange = (event) => {
    this.setState({offset: 0})
    this.setState({showLoadMore: true})
    this.setState({sortBy: event.target.value})
  }

  handleLoadClick = () => {
    monsterUtil.getMonsters(this.state.sortBy, this.state.limit,
      this.state.offset + this.state.limit)
    .then(monstersArr => {
      if (monstersArr.length < 50) {
        this.setState({showLoadMore: false})
      }
      let monsters = [...this.state.monsters]
      monstersArr.forEach(monster => {
        monsters.push(monster)
      })
      this.setState({monsters: monsters})
      this.setState({offset: this.state.offset + this.state.limit})
    })
  }

  handleToTopClick = () => {
    window.scrollTo(0, 0)
  }

  render() {
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
            username={monster.user.username}
            withDetails={true}
          />
        </div>
      )
    })

    let noAuthNav = null
    if (!this.props.username) {
      noAuthNav = (
        <div className='Monsters__NavBar'>
          <NoAuthNavBar />
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
                {/* <option value='top'>Popular</option> */}
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
              {this.state.showLoadMore ?
                <button className='Monsters__load-more-btn' onClick={this.handleLoadClick}>
                  Load More
                  <br></br>
                  <i className='material-icons'>keyboard_arrow_down</i>
                </button>
                : <div className='Monsters__all-loaded'>
                    Thats all of them!
                    <br></br>
                    <i className='material-icons'>mood</i>
                  </div>}
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

export default connect(mapStateToProps)(Monsters)
