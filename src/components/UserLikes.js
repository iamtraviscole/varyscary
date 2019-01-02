import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import '../styles/UserLikes.css'
import * as actions from '../actions/index'

import MonsterFromProps from './MonsterFromProps'
import Spinner from './Spinner'

class UserLikes extends Component {
  state = {
    initialFetch: true,
    username: null,
    monstersLiked: []
  }

  componentDidMount = () => {
    this.props.fetchStarted()
    axios.get(`http://localhost:4000/api/users/${this.props.match.params.username}`)
    .then(res => {
      console.log(res.data);
      this.setState({
        initialFetch: false,
        username: res.data.username,
        monstersLiked: res.data.liked_monsters
      })
      this.props.fetchEnded()
    })
    .catch(err => {
      console.log(err);
      this.setState({initialFetch: false})
      this.props.fetchEnded()
    })
  }

  render() {
    let monstersLikedArr = (
      this.props.username === this.state.username ?
        <div className='UserLikes__no-likes-ctr'>
          <div className='UserLikes__no-likes-text'>You have not liked any monsters yet!</div>
          <Link to='/monsters' className='UserLikes__no-likes-btn'>Explore</Link>
        </div>
      : <div className='UserLikes__no-likes-ctr'>
          <div className='UserLikes__no-likes-text'>
            {`${this.state.username} has not liked any monsters yet!`}
          </div>
        </div>
    )
    if (this.state.monstersLiked.length > 0) {
      monstersLikedArr = (
        this.state.monstersLiked.map(monster => {
          return (
            <Link to={`/monsters/${monster.id}`} key={monster.id} className='UserLikes__monster-ctr'>
              <MonsterFromProps monster={monster} />
            </Link>
          )
        })
      )
    }

    return (
        this.props.isFetching ?
          <div className='UserLikes'>
            <div className='UserLikes__spinner'>
              <Spinner />
            </div>
          </div>
        : <div className='UserLikes'>
            {this.state.username ?
              <Fragment>
                <h1>
                  {this.props.username === this.state.username ?
                    'Your Favorites'
                  : `${this.state.username}'s Favorites`}
                </h1>
                <div className='UserLikes__monsters-ctr'>
                  {monstersLikedArr}
                </div>
              </Fragment>
            : <div className='UserLikes__no-user'>User not found</div> }
          </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
    username: state.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (message, icon) => dispatch(actions.setMessage(message, icon)),
    fetchStarted: () => dispatch(actions.fetchStarted()),
    fetchEnded: () => dispatch(actions.fetchEnded())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLikes)
