import actionTypes from './actionTypes'

export const login = (username) => {
  return {
    type: actionTypes.LOGIN,
    username: username
  }
}

export const logout = (username) => {
  return {
    type: actionTypes.LOGOUT
  }
}
