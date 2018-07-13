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

export const resetMonster = () => {
  return {
    type: actionTypes.RESET_MONSTER
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

export const setLeftArmType = (leftArmType) => {
  return {
    type: actionTypes.SET_LEFT_ARM_TYPE,
    leftArmType: leftArmType
  }
}

export const setRightArmType = (rightArmType) => {
  return {
    type: actionTypes.SET_RIGHT_ARM_TYPE,
    rightArmType: rightArmType
  }
}

export const setLegsType = (legsType) => {
  return {
    type: actionTypes.SET_LEGS_TYPE,
    legsType: legsType
  }
}

export const setBodyFill = (bodyFill) => {
  return {
    type: actionTypes.SET_BODY_FILL,
    bodyFill: bodyFill
  }
}

export const setFaceFill = (faceFill) => {
  return {
    type: actionTypes.SET_FACE_FILL,
    faceFill: faceFill
  }
}

export const setHeadwearFill = (headwearFill) => {
  return {
    type: actionTypes.SET_HEADWEAR_FILL,
    headwearFill: headwearFill
  }
}

export const setEyesFill = (eyesFill) => {
  return {
    type: actionTypes.SET_EYES_FILL,
    eyesFill: eyesFill
  }
}

export const setMouthFill = (mouthFill) => {
  return {
    type: actionTypes.SET_MOUTH_FILL,
    mouthFill: mouthFill
  }
}

export const setLeftArmFill = (leftArmFill) => {
  return {
    type: actionTypes.SET_LEFT_ARM_FILL,
    leftArmFill: leftArmFill
  }
}

export const setRightArmFill = (rightArmFill) => {
  return {
    type: actionTypes.SET_RIGHT_ARM_FILL,
    rightArmFill: rightArmFill
  }
}

export const setLegsFill = (legsFill) => {
  return {
    type: actionTypes.SET_LEGS_FILL,
    legsFill: legsFill
  }
}
