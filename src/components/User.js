import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import '../styles/User.css'
import * as userUtil from '../utils/user'

import MonsterFromProps from './MonsterFromProps'
import NoAuthNavBar from './NoAuthNavBar'
import Spinner from './Spinner'

class User extends Component  {
  state = {
    username: null,
    monsters: null
  }

  componentDidMount = () => {
    userUtil.getUser(this.props.match.params.username)
    .then(user => {
      if (user) {
        this.setState({
          username: user.username,
          monsters: user.monsters
        })
      }
    })
  }

  handleSelectChange = (event) => {
    if (event.target.value === 'newest')  {
      let newest = [...this.state.monsters].sort((a,b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      })
      this.setState({monsters: newest})
    } else if (event.target.value === 'oldest') {
      let oldest = [...this.state.monsters].sort((a,b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      })
      this.setState({monsters: oldest})
    }
  }

  handleToTopClick = () => {
    window.scrollTo(0, 0)
  }

  render() {
    let content = null

    if (this.props.isFetching) {
      content = <div className='User__spinner-ctr'>
        <Spinner />
      </div>
    } else {
      if (this.state.username) {
        let monstersArr = this.state.monsters.map(monster => {
          return (
            <div key={monster.id} className='User__monster-ctr'>
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
                withDetails={true}
              />
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
                      </select>
                    </div>
                  </div>
                  <div className='User__monsters-ctr'>
                    {monstersArr}
                  </div>
                </Fragment>
              : <div className='User__monsters-ctr'>
                  This user has no monsters yet!
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

export default connect(mapStateToProps)(User)
