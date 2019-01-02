import actionTypes from './actionTypes'

// move this randomize feature to module / clean up
// probably going to end up grabbing feature component names from server
import * as MonsterBodies from '../components/MonsterFeatures/MonsterBodies'
import * as MonsterFaces from '../components/MonsterFeatures/MonsterFaces'
import * as MonsterHeadwear from '../components/MonsterFeatures/MonsterHeadwear'
import * as MonsterEyes from '../components/MonsterFeatures/MonsterEyes'
import * as MonsterMouths from '../components/MonsterFeatures/MonsterMouths'
import * as MonsterLeftArms from '../components/MonsterFeatures/MonsterLeftArms'
import * as MonsterRightArms from '../components/MonsterFeatures/MonsterRightArms'
import * as MonsterLegs from '../components/MonsterFeatures/MonsterLegs'

let randomBodies = []
let randomFaces = []
let randomHeadwear = []
let randomEyes = []
let randomMouths = []
let randomLeftArms = []
let randomRightArms = []
let randomLegs = []
for (const body in MonsterBodies) {randomBodies.push(body)}
for (const face in MonsterFaces) {randomFaces.push(face)}
for (const headwear in MonsterHeadwear) {randomHeadwear.push(headwear)}
for (const eyes in MonsterEyes) {randomEyes.push(eyes)}
for (const mouth in MonsterMouths) {randomMouths.push(mouth)}
for (const leftArm in MonsterLeftArms) {randomLeftArms.push(leftArm)}
for (const rightArm in MonsterRightArms) {randomRightArms.push(rightArm)}
for (const leg in MonsterLegs) {randomLegs.push(leg)}

let getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

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
  return {
    type: actionTypes.RANDOMIZE_MONSTER,
    bodyType: randomBodies[getRandomInt(0, randomBodies.length)],
    faceType: randomFaces[getRandomInt(0, randomFaces.length)],
    headwearType: randomHeadwear[getRandomInt(0, randomHeadwear.length)],
    eyesType: randomEyes[getRandomInt(0, randomEyes.length)],
    mouthType: randomMouths[getRandomInt(0, randomMouths.length)],
    rightArmType: randomRightArms[getRandomInt(0, randomRightArms.length)],
    leftArmType: randomLeftArms[getRandomInt(0, randomLeftArms.length)],
    legsType: randomLegs[getRandomInt(0, randomLegs.length)],
  }
}
