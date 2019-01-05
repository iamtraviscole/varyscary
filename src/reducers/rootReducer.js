import { combineReducers } from 'redux'

import userReducer from './userReducer'
import requestReducer from './requestReducer'
import monsterReducer from './monsterReducer'

const rootReducer = combineReducers({
  user: userReducer,
  request: requestReducer,
  monster: monsterReducer
})

export default rootReducer
