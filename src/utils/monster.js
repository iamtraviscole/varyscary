import axios from 'axios'

import store from '../store/store'
import * as actions from '../actions/actions'

export const createMonster = (monsterName, monsterObj) => {
  store.dispatch(actions.fetchStarted())
  const monster = {
    'name': monsterName,
    'body_type': monsterObj.body.type,
    'body_fill': monsterObj.body.fillColor,
  	'face_type': monsterObj.face.type,
    'face_fill': monsterObj.face.fillColor,
  	'headwear_type': monsterObj.headwear.type,
    'headwear_fill': monsterObj.headwear.fillColor,
  	'eyes_type': monsterObj.eyes.type,
    'eyes_fill': monsterObj.eyes.fillColor,
  	'mouth_type': monsterObj.mouth.type,
    'mouth_fill': monsterObj.mouth.fillColor,
  	'left_arm_type': monsterObj.leftArm.type,
    'left_arm_fill': monsterObj.leftArm.fillColor,
  	'right_arm_type': monsterObj.rightArm.type,
    'right_arm_fill': monsterObj.rightArm.fillColor,
  	'legs_type': monsterObj.legs.type,
    'legs_fill': monsterObj.legs.fillColor
  }
  const token = localStorage.getItem('user_token')
  let saved = axios.post('http://localhost:4000/api/monsters',
    {'monster': monster},
    {'headers': {'Authorization': token}}
  )
  .then(res => {
    console.log(res.data);
    store.dispatch(actions.fetchEnded())
    return true
  })
  .catch(err => {
    console.log(err.response);
    store.dispatch(actions.fetchEnded())
    if (err.response.status === 401) {
      store.dispatch(actions.logout())
      store.dispatch(actions.setMessage('Session expired. Please log in.'))
    }
    return false
  })
  return saved
}

export const getMonsters = (sortBy, offset) => {
  store.dispatch(actions.fetchStarted())
  let monsters = axios.get(`http://localhost:4000/api/monsters?sort_by=${sortBy}&limit=50&offset=${offset}`)
  .then(res => {
    console.log(res.data);
    store.dispatch(actions.fetchEnded())
    return res.data
  })
  .catch(err => {
    console.log(err);
    store.dispatch(actions.fetchEnded())
  })
  return monsters
}
