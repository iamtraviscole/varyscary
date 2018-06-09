import actionTypes from './actionTypes'

export const login = (username) => {
  return {
    type: actionTypes.LOGIN,
    username: username
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  }
}

export const setMobile = () => {
  return {
    type: actionTypes.SET_MOBILE
  }
}

export const setDesktop = () => {
  return {
    type: actionTypes.SET_DESKTOP
  }
}

export const setBodyType = (bodyType) => {
  return {
    type: actionTypes.SET_BODY_TYPE,
    bodyType: bodyType
  }
}
