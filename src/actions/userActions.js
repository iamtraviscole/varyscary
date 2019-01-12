import actionTypes from './actionTypes'

export const login = (username) => {
  localStorage.setItem('username', username)
  return {
    type: actionTypes.LOGIN,
    username: username
  }
}

export const logout = () => {
  const lastUser = localStorage.getItem('username')
  localStorage.clear()
  localStorage.setItem('last_user', lastUser)
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
