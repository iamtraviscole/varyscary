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

export const setFaceType = (faceType) => {
  return {
    type: actionTypes.SET_FACE_TYPE,
    faceType: faceType
  }
}

export const setHeadwearType = (headwearType) => {
  return {
    type: actionTypes.SET_HEADWEAR_TYPE,
    headwearType: headwearType
  }
}

export const setEyesType = (eyesType) => {
  return {
    type: actionTypes.SET_EYES_TYPE,
    eyesType: eyesType
  }
}

export const setMouthType = (mouthType) => {
  return {
    type: actionTypes.SET_MOUTH_TYPE,
    mouthType: mouthType
  }
}
