import actionTypes from './actionTypes'

export const login = (username) => {
  localStorage.setItem('username', username)
  return {
    type: actionTypes.LOGIN,
    username: username
  }
}

export const logout = () => {
  localStorage.clear()
  return {
    type: actionTypes.LOGOUT
  }
}

export const setMessage = (text, icon = 'error') => {
  return {
    type: actionTypes.SET_MESSAGE,
    text: text,
    icon: icon
  }
}

export const clearMessage = () => {
  return {
    type: actionTypes.CLEAR_MESSAGE
  }
}
