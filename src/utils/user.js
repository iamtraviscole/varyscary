import axios from 'axios'

import store from '../store/store'
import * as actions from '../actions/actions'

export const signupAuthorizeAndLogin = (userObj, history) => {
  store.dispatch(actions.fetchStarted())
  axios.post('http://localhost:4000/api/users',
    {'user':
      {'username': userObj.username,
        'email': userObj.email,
        'password': userObj.password,
        'password_confirmation': userObj.passwordConfirmation}
    }
  )
  .then(res => {
    authorizeAndLogin(userObj, history)
  })
  .catch(err => {
    store.dispatch(actions.fetchEnded())
    console.log(err.response);
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
  })
  .catch(err => {
    store.dispatch(actions.fetchEnded())
    if (err.response.status === 401) {
      store.dispatch(actions.logout())
    }
  })
}

export const authorizeAndLogin = (userObj, history) => {
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
    }
  })
  .catch(err => {
    store.dispatch(actions.fetchEnded())
    store.dispatch(actions.setMessage('Incorrect email or password'))
  })
}

export const checkUsernameAvail = (username) => {
  let usernameAvail = axios.get(`http://localhost:4000/api/check_username_avail?username=${username}`)
  .then(res => {
    return res.data ? true : false
  })
  .catch(err => {
    console.log(err.response);
  })
  return usernameAvail
}

export const checkEmailAvail = (email) => {
  let emailAvail = axios.get(`http://localhost:4000/api/check_email_avail?email=${email}`)
  .then(res => {
    return res.data ? true : false
  })
  .catch(err => {
    console.log(err.response);
  })
  return emailAvail
}
