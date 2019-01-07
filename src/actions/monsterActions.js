import actionTypes from './actionTypes'
import randomize from '../utils/monsterRandomize'

export const setMonsterName = (monsterName) => {
  return {
    type: actionTypes.SET_MONSTER_NAME,
    monsterName: monsterName
  }
}

export const addMonsterTag = (monsterTag) => {
  return {
    type: actionTypes.ADD_MONSTER_TAG,
    monsterTag: monsterTag
  }
}

export const removeMonsterTag = (monsterTagIndex) => {
  return {
    type: actionTypes.REMOVE_MONSTER_TAG,
    monsterTagIndex: monsterTagIndex
  }
}

export const clearMonsterTags = () => {
  return {
    type: actionTypes.CLEAR_MONSTER_TAGS
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

export const resetMonster = () => {
  return {
    type: actionTypes.RESET_MONSTER
  }
}

export const randomizeMonster = () => {
  const getRandomInt = max => Math.floor(Math.random() * max)
  const color1 = randomize.colors[getRandomInt(randomize.colors.length)]
  const color2 = randomize.colors[getRandomInt(randomize.colors.length)]
  return {
    type: actionTypes.RANDOMIZE_MONSTER,
    bodyType: randomize.bodies[getRandomInt(randomize.bodies.length)],
    bodyColor: color1,
    faceType: randomize.faces[getRandomInt(randomize.faces.length)],
    headwearType: randomize.headwear[getRandomInt(randomize.headwear.length)],
    headwearColor: color2,
    eyesType: randomize.eyes[getRandomInt(randomize.eyes.length)],
    eyesColor: color2,
    mouthType: randomize.mouths[getRandomInt(randomize.mouths.length)],
    mouthColor: color2,
    rightArmType: randomize.rightArms[getRandomInt(randomize.rightArms.length)],
    rightArmColor: color1,
    leftArmType: randomize.leftArms[getRandomInt(randomize.leftArms.length)],
    leftArmColor: color1,
    legsType: randomize.legs[getRandomInt(randomize.legs.length)],
    legsColor: color1
  }
}
