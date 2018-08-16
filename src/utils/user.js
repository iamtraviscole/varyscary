import axios from 'axios'

import store from '../store/store'
import * as actions from '../actions/actions'

const signupAndLogin = (userObj, history) => {
  store.dispatch(actions.fetchStarted())
  axios.post('http://localhost:4000/api/users',
    {'user':
      {'username': userObj.username,
        'email': userObj.email,
        'password': userObj.password}
    }
  )
  .then(res => {
    getTokenAndLogin(userObj, history)
    console.log(res);
  })
  .catch(err => {
    store.dispatch(actions.fetchEnded())
    console.log(err);
  })
}

const login = (token, history) => {
  axios.get('http://localhost:4000/api/current_user_info',
    {'headers': {'Authorization': token} }
  )
  .then(res => {
    store.dispatch(actions.login(res.data.username))
    store.dispatch(actions.fetchEnded())
    history.push('/')
    console.log(res);
  })
  .catch(err => {
    store.dispatch(actions.fetchEnded())
    if (err.response.status === 401) {
      store.dispatch(actions.logout())
    }
    console.log(err.response);
  })
}

const getTokenAndLogin = (userObj, history) => {
  store.dispatch(actions.fetchStarted())
  axios.post('http://localhost:4000/api/user_token',
    {'auth':
      {'email': userObj.email,
      'password': userObj.password}
    }
  )
  .then(res => {
    if (res.data.jwt) {
      localStorage.setItem('user_token', res.data.jwt)
      login(res.data.jwt, history)
      console.log(res);
    }
  })
  .catch(err => {
    store.dispatch(actions.fetchEnded())
    store.dispatch(actions.setMessage('error', 'Incorrect email or password'))
    console.log(err);
  })
}

export const authorizeAndLogin = (userObj, history) => {
  getTokenAndLogin(userObj, history)
}

export const signupAuthorizeAndLogin = (userObj, history) => {
  signupAndLogin(userObj, history)
}
