import actionTypes from '../actions/actionTypes'

const initialState = {
  monsterName: '',
  monsterTags: [],
  monsterFeatures: {
    body: {
      type: null,
      fillColor: '#000000'
    },
    face: {
      type: null,
      fillColor: '#ffffff'
    },
    headwear: {
      type: null,
      fillColor: '#000000'
    },
    eyes: {
      type: null,
      fillColor: '#000000'
    },
    mouth: {
      type: null,
      fillColor: '#000000'
    },
    leftArm: {
      type: null,
      fillColor: '#000000'
    },
    rightArm: {
      type: null,
      fillColor: '#000000'
    },
    legs: {
      type: null,
      fillColor: '#000000'
    }
  }
}

const monsterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MONSTER_NAME:
      return {...state, monsterName: action.monsterName}
    case actionTypes.ADD_MONSTER_TAG:
      let addTags = [...state.monsterTags]
      addTags.push(action.monsterTag)
      return {...state, monsterTags: addTags}
    case actionTypes.REMOVE_MONSTER_TAG:
      let removeTags = [...state.monsterTags]
      removeTags.splice(action.monsterTagIndex, 1)
      return {...state, monsterTags: removeTags}
    case actionTypes.CLEAR_MONSTER_TAGS:
      return {...state, monsterTags: []}
    case actionTypes.SET_BODY_TYPE:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  body: {...state.monsterFeatures.body,
                    type: action.bodyType
                  }
                }
              }
    case actionTypes.SET_FACE_TYPE:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  face: {...state.monsterFeatures.face,
                    type: action.faceType
                  }
                }
              }
    case actionTypes.SET_HEADWEAR_TYPE:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  headwear: {...state.monsterFeatures.headwear,
                    type: action.headwearType
                  }
                }
              }
    case actionTypes.SET_EYES_TYPE:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  eyes: {...state.monsterFeatures.eyes,
                    type: action.eyesType
                  }
                }
              }
    case actionTypes.SET_MOUTH_TYPE:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  mouth: {...state.monsterFeatures.mouth,
                    type: action.mouthType
                  }
                }
              }
    case actionTypes.SET_LEFT_ARM_TYPE:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  leftArm: {...state.monsterFeatures.leftArm,
                    type: action.leftArmType
                  }
                }
              }
    case actionTypes.SET_RIGHT_ARM_TYPE:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  rightArm: {...state.monsterFeatures.rightArm,
                    type: action.rightArmType
                  }
                }
              }
    case actionTypes.SET_LEGS_TYPE:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  legs: {...state.monsterFeatures.legs,
                    type: action.legsType
                  }
                }
              }
    case actionTypes.SET_BODY_FILL:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  body: {...state.monsterFeatures.body,
                    fillColor: action.bodyFill
                  }
                }
              }
    case actionTypes.SET_FACE_FILL:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  face: {...state.monsterFeatures.face,
                    fillColor: action.faceFill
                  }
                }
              }
    case actionTypes.SET_HEADWEAR_FILL:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  headwear: {...state.monsterFeatures.headwear,
                    fillColor: action.headwearFill
                  }
                }
              }
    case actionTypes.SET_EYES_FILL:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  eyes: {...state.monsterFeatures.eyes,
                    fillColor: action.eyesFill
                  }
                }
              }
    case actionTypes.SET_MOUTH_FILL:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  mouth: {...state.monsterFeatures.mouth,
                    fillColor: action.mouthFill
                  }
                }
              }
    case actionTypes.SET_LEFT_ARM_FILL:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  leftArm: {...state.monsterFeatures.leftArm,
                    fillColor: action.leftArmFill
                  }
                }
              }
    case actionTypes.SET_RIGHT_ARM_FILL:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  rightArm: {...state.monsterFeatures.rightArm,
                    fillColor: action.rightArmFill
                  }
                }
              }
    case actionTypes.SET_LEGS_FILL:
      return {...state,
                monsterFeatures: {...state.monsterFeatures,
                  legs: {...state.monsterFeatures.legs,
                    fillColor: action.legsFill
                  }
                }
              }
    case actionTypes.RESET_MONSTER:
      return {...state,
        monsterName: '',
        monsterTags: [],
        monsterFeatures: {
          ...initialState.monsterFeatures
        }
      }
    case actionTypes.RANDOMIZE_MONSTER:
      return {...state,
                monsterFeatures: {
                  ...state.monsterFeatures,
                  body: {
                    ...state.monsterFeatures.body,
                    type: action.bodyType
                  },
                  face: {
                    ...state.monsterFeatures.face,
                    type: action.faceType
                  },
                  headwear: {
                    ...state.monsterFeatures.headwear,
                    type: action.headwearType
                  },
                  eyes: {
                    ...state.monsterFeatures.eyes,
                    type: action.eyesType
                  },
                  mouth: {
                    ...state.monsterFeatures.mouth,
                    type: action.mouthType
                  },
                  rightArm: {
                    ...state.monsterFeatures.rightArm,
                    type: action.rightArmType
                  },
                  leftArm: {
                    ...state.monsterFeatures.leftArm,
                    type: action.leftArmType
                  },
                  legs: {
                    ...state.monsterFeatures.legs,
                    type: action.legsType
                  }
                }
              }
    default:
      return state
  }
}

export default monsterReducer
