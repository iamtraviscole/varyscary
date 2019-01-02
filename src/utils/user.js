import axios from 'axios'

import store from '../store/store'
import * as actions from '../actions/index'

const USER_URL = 'http://localhost:4000/api/users'

export const getUser = (username, sortBy) => {
  store.dispatch(actions.fetchStarted())
  let user = axios.get(USER_URL + `/${username}`)
  .then(res => {
    console.log(res.data);
    store.dispatch(actions.fetchEnded())
    return res.data
  })
  .catch(err => {
    console.log(err);
    store.dispatch(actions.fetchEnded())
  })
  return user
}
