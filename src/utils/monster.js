import axios from 'axios'

import store from '../store/store'
import * as actions from '../actions/actions'

const token = localStorage.getItem('user_token')

export const createMonster = (monsterName, monsterObj, history) => {
  store.dispatch(actions.fetchStarted())
  axios.post('http://localhost:4000/api/monsters',
    {'monster': {
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
    },
    {'headers': {'Authorization': token}}
  )
  .then(res => {
    console.log(res.data);
    store.dispatch(actions.fetchEnded())
  })
  .catch(err => {
    console.log(err.response);
    store.dispatch(actions.fetchEnded())
  })
}
