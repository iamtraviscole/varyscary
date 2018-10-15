import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import '../styles/EditMonster.css'

import MonsterFromProps from './MonsterFromProps'

class EditMonster extends Component {
  state = {
    monster: null,
    nameValue: '',
    tagValue: '',
    tags: [],
    initialFetch: true,
    showModal: false,
    deleteClicked: false
  }

  componentDidMount = () => {
    axios.get('http://localhost:4000/api/monsters' +
      `/${this.props.computedMatch.params.id}`)
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
      for (let j = 0; j < newTags.length; j++)
      if (oldTags[i] !== newTags[j]) {
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
    this.setState({tags: []})
  }

  handleTagsUndo = () => {
    this.setState({tags: this.state.monster.tags})
  }

  handleMonsterSave = () => {
    console.log('saved');
  }

  handleModalClick = () => {
    this.setState({
      showModal: false,
      deleteClicked: false})
  }

  handleDeleteClick = () => {
    this.setState({
      showModal: true,
      deleteClicked: true
    })
  }

  handleGoBack = () => {
    this.props.history.goBack()
  }

  render() {
    const monster = this.state.monster

    let modalMessage
    if (this.state.deleteClicked) {
      modalMessage = <div className='EditMonster__confirm-delete-ctr'>
        Are you sure?
        <button className='EditMonster__confirm-btn'>Yes</button>
        <button className='EditMonster__confirm-btn'>No</button>
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

    return (
      !this.state.initialFetch && this.state.monster.username === this.props.username ?
      <Fragment>
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
      <div className='EditMonster'>
        <h1 className='EditMonster__header'>Edit Monster</h1>
        {!this.state.initialFetch
          ? monster
            ? <div className='EditMonster__outer-ctr'>
                <div className='EditMonster__monster-ctr'>
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
                    withDetails={false}
                  />
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
                  <div className='EditMonster__tags-outer-ctr'>
                    <form onSubmit={this.handleTagSubmit}>
                      <input className='EditMonster__tag-input'
                        value={this.state.tagValue}
                        type='text'
                        onChange={this.handleTagChange}/>
                      <input className='EditMonster__tag-add-btn'
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
                  Delete Monster
                </button>
              </div>
            : <div className='EditMonster__monster-not-found'>
                Monster not found
              </div>
          : null}
      </div>
      </Fragment>
      : <div className='EditMonster__no-access-ctr'>
        <i className='material-icons'>error_outline</i> You do not have access to this page
        <br />
        <div className='EditMonster__no-access-btn'
          onClick={this.handleGoBack}>
          Go Back
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
  }
}

export default withRouter(connect(mapStateToProps)(EditMonster))
