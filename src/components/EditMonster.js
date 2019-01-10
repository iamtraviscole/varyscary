import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'

import '../styles/EditMonster.css'
import * as actions from '../actions/index'

import MonsterFromProps from './MonsterFromProps'

class EditMonster extends Component {
  state = {
    monster: null,
    nameValue: '',
    tagValue: '',
    tags: [],
    initialFetch: true,
    showModal: false,
    deleteClicked: false,
    saveMessage: ''
  }

  monsterURL = 'http://localhost:4000/api/monsters/' +
    this.props.computedMatch.params.id


  componentDidMount = () => {
    axios.get(this.monsterURL)
      .then(res => {
        this.setState({
          monster: res.data,
          initialFetch: false,
          nameValue: res.data.name,
          tags: res.data.tags
        })
        console.log(res.data);
      })
      .catch(err => {
        this.setState({initialFetch: false})
        console.log(err);
      })
  }

  nameChanged = () => {
    return this.state.nameValue !== this.state.monster.name
  }

  tagsChanged = () => {
    if (this.state.tags.length !== this.state.monster.tags.length) {
      return true
    }
    const oldTags = this.state.monster.tags
    const newTags = this.state.tags
    for (let i = 0; i < oldTags.length; i++) {
      if (oldTags[i] !== newTags[i]) {
        return true
      }
    }

    return false
  }

  handleNameChange = (event) => {
    this.setState({
      nameValue: event.target.value
    })
  }

  handleNameUndo = () => {
    this.setState({nameValue: this.state.monster.name})
  }

  handleTagChange = (event) => {
    this.setState({tagValue: event.target.value})
  }

  handleTagSubmit = (event) => {
    event.preventDefault()
    let tags = [...this.state.tags]
    let tagString = this.state.tagValue.replace(/[']/g, '')
      .replace(/[\W_]+/g, ' ').toLowerCase()
    let tagArr = tagString.split(' ')
    tagArr.forEach( tag => {
      if (tag !== '') {
        tags.push(tag)
      }
    })
    this.setState({tags: tags, tagValue: ''})
  }

  handleRemoveTag = (tagIndex) => {
    let removeTags = [...this.state.tags]
    removeTags.splice(tagIndex, 1)
    this.setState({tags: removeTags})
  }

  handleClearClick = () => {
    this.setState({
      tags: [],
      tagValue: ''
    })
  }

  handleTagsUndo = () => {
    this.setState({tags: this.state.monster.tags})
  }

  handleMonsterSave = () => {
    const updateParams = () => {
      return {'monster': {
        name: this.state.nameValue,
        tags_attributes: {names: this.state.tags}
      }}
    }
    axios.put(this.monsterURL, updateParams(),
      {'headers': {'Authorization': localStorage.getItem('user_token')}}
    )
    .then(res => {
      console.log(res.data);
      this.setState({
        showModal: true,
        saveMessage: 'Monster saved!',
        monster: res.data,
        nameValue: res.data.name,
        tagValue: '',
        tags: res.data.tags
      })
    })
    .catch(err => {
      console.log(err.response);
      this.setState({
        saveMessage: 'Something went wrong'
      })
      if (err.response.status === 401) {
        this.props.logout()
        this.props.setMessage('Session expired. Please log in.')
      }
    })
  }

  handleModalClick = () => {
    this.setState({
      showModal: false,
      deleteClicked: false,
      saveMessage: ''})
  }

  handleDeleteClick = () => {
    this.setState({
      showModal: true,
      deleteClicked: true
    })
  }

  handleDeleteConfirm = () => {
    axios.delete(this.monsterURL,
      {'headers': {'Authorization': localStorage.getItem('user_token')}}
    )
    .then(res => {
      this.props.history.push({
        pathname: `/${this.props.username}`,
        state: { message: 'monster deleted!' }
      })
    })
    .catch(err => {
      console.log(err.response);
      if (err.response.status === 401) {
        this.props.logout()
        this.props.setMessage('Session expired. Please log in.')
      }
    })
  }

  handleGoBack = () => {
    this.props.history.goBack()
  }

  handleMonsterClick = () => {
    this.props.history.push(`/monsters/${this.state.monster.id}`)
  }

  render() {
    const monster = this.state.monster

    let modalMessage
    if (this.state.deleteClicked) {
      modalMessage = <div className='EditMonster__confirm-ctr'>
        <h3>Are you sure?</h3>
        <div className='EditMonster__confirm-btn-ctr'>
          <button onClick={this.handleDeleteConfirm}
            className='EditMonster__confirm-btn'>Delete</button>
          <button className='EditMonster__confirm-btn'>Cancel</button>
        </div>
      </div>
    }
    if (this.state.saveMessage) {
      modalMessage = <div className='EditMonster__confirm-ctr'>
        <h3>{this.state.saveMessage}</h3>
        <div className='EditMonster__saved-btn-ctr'>
          <Link to={`/monsters/${this.props.computedMatch.params.id}`}
            className='EditMonster__saved-btn'>View Monster</Link>
          <Link to={`/${this.props.username}`}
            className='EditMonster__saved-btn'>Your Monsters</Link>
        </div>
      </div>
    }

    let monsterTags = (
      this.state.tags.map((tag, i) => {
        return (
          <div key={i} className='EditMonster__tag'
            onClick={() => this.handleRemoveTag(i)}>
            {tag}
            <div className='EditMonster__tag-remove'>
              <i className='material-icons'>close</i>
            </div>
          </div>
        )
      })
    )

    let tagAddClass = 'EditMonster__tag-add-btn'
    if (this.state.tagValue) {
      tagAddClass += ' EditMonster__btn-pulse'
    }

    return (
      <div className='EditMonster'>
      {monster
        ? <Fragment>
          {this.state.showModal
            ? <div className='EditMonster__modal'
                onClick={this.handleModalClick}>
                  <div className='EditMonster__modal__outer-ctr'>
                    <div className='EditMonster__modal__inner-ctr'>
                      {modalMessage}
                    </div>
                  </div>
                </div>
            : null}
          {monster.username === this.props.username
            ? <div className='EditMonster__outer-ctr'>
                <h1 className='EditMonster__header'>Edit Monster</h1>
                <div className='EditMonster__monster-ctr'
                  onClick={this.handleMonsterClick}>
                  <MonsterFromProps monster={monster} />
                </div>
                <div className='EditMonster__edit-ctr'>
                  <h4>Name</h4>
                  {this.nameChanged()
                  ? <button className='EditMonster__undo-btn'
                      onClick={this.handleNameUndo}>
                      undo
                    </button>
                  : null}
                  <div className='EditMonster__name-ctr'>
                    <input className='EditMonster__name'
                      type='text'
                      value={this.state.nameValue}
                      onChange={this.handleNameChange} />
                  </div>
                  <h4>Tags</h4>
                  {this.tagsChanged()
                    ? <button className='EditMonster__undo-btn'
                        onClick={this.handleTagsUndo}>undo</button>
                    : null}
                  <div className='EditMonster__tags-instructions-ctr'>
                      <i className='material-icons'>info</i>
                      press enter or click 'Add' to add tags
                  </div>
                  <div className='EditMonster__tags-outer-ctr'>
                    <form onSubmit={this.handleTagSubmit}>
                      <input className='EditMonster__tag-input'
                        value={this.state.tagValue}
                        type='text'
                        onChange={this.handleTagChange}
                        onBlur={this.handleTagLeave} />
                      <input className={tagAddClass}
                        value='Add'
                        type='submit' />
                    </form>
                    <div className='EditMonster__tags-ctr'>
                      {monsterTags}
                      {this.state.tags.length > 1
                        ? <button className='EditMonster__tags-clear-all'
                            onClick={this.handleClearClick}>clear</button>
                        : null}
                    </div>
                  </div>
                  <div className='EditMonster__finish-btns-ctr'>
                    {this.nameChanged() || this.tagsChanged()
                      ? <button className='EditMonster__finish-btn'
                          onClick={this.handleMonsterSave}>
                          Save
                        </button>
                      : <button className='EditMonster__finish-btn--disabled'>
                          Save
                        </button>}
                    <button className='EditMonster__finish-btn'
                      onClick={this.handleGoBack}>
                      Cancel
                    </button>
                  </div>
                  <div className='EditMonster__clear-btn-float'></div>
                </div>
                <button className='EditMonster__delete'
                  onClick={this.handleDeleteClick}>
                  <i className='material-icons'>delete_outline</i>
                  delete monster
                </button>
              </div>
            : <div className='EditMonster__no-access-ctr'>
                <i className='material-icons'>error_outline</i>
                <h3>You do not have access to this page</h3>
                <div className='EditMonster__no-access-btn'
                  onClick={this.handleGoBack}>
                  Go Back
                </div>
              </div>}
          </Fragment>
      : this.state.initialFetch
        ? null
        : <div className='EditMonster__monster-not-found'>
            <h3>Monster not found</h3>
          </div>}
    </div>
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
    logout: () => dispatch(actions.logout()),
    setMessage: (message) => dispatch(actions.setMessage(message))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditMonster))
