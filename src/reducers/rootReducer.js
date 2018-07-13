import actionTypes from '../actions/actionTypes'

const initialState = {
  username: 'Peter',
  userOnMobile: false,
  svgStrokeStyle: {
    strokeFill: '#ffffff',
    strokeColor: '#999999',
    strokeDasharray: '5,5'
  },
  monster: {
    body: {
      default: 'BodyCircle',
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {...state, username: action.username }
    case actionTypes.LOGOUT:
      return {...state, username: null}
    case actionTypes.SET_MOBILE:
      return {...state, userOnMobile: true}
    case actionTypes.SET_DESKTOP:
      return {...state, userOnMobile: false}
    case actionTypes.RESET_MONSTER:
      return {...initialState,
        monster: {
          ...initialState.monster
        }
      }
    case actionTypes.SET_BODY_TYPE:
      return {...state,
                monster: {
                  ...state.monster,
                  body: {
                    ...state.monster.body,
                    type: action.bodyType
                    }
                  }
                }
    case actionTypes.SET_FACE_TYPE:
      return {...state,
                monster: {
                  ...state.monster,
                  face: {
                    ...state.monster.face,
                    type: action.faceType
                    }
                  }
                }
    case actionTypes.SET_HEADWEAR_TYPE:
      return {...state,
                monster: {
                  ...state.monster,
                  headwear: {
                    ...state.monster.headwear,
                    type: action.headwearType
                    }
                  }
                }
    case actionTypes.SET_EYES_TYPE:
      return {...state,
                monster: {
                  ...state.monster,
                  eyes: {
                    ...state.monster.eyes,
                    type: action.eyesType
                    }
                  }
                }
    case actionTypes.SET_MOUTH_TYPE:
      return {...state,
                monster: {
                  ...state.monster,
                  mouth: {
                    ...state.monster.mouth,
                    type: action.mouthType
                    }
                  }
                }
    case actionTypes.SET_LEFT_ARM_TYPE:
      return {...state,
                monster: {
                  ...state.monster,
                  leftArm: {
                    ...state.monster.leftArm,
                    type: action.leftArmType
                    }
                  }
                }
    case actionTypes.SET_RIGHT_ARM_TYPE:
      return {...state,
                monster: {
                  ...state.monster,
                  rightArm: {
                    ...state.monster.rightArm,
                    type: action.rightArmType
                    }
                  }
                }
    case actionTypes.SET_LEGS_TYPE:
      return {...state,
                monster: {
                  ...state.monster,
                  legs: {
                    ...state.monster.legs,
                    type: action.legsType
                    }
                  }
                }
    case actionTypes.SET_BODY_FILL:
      return {...state,
                monster: {
                  ...state.monster,
                  body: {
                    ...state.monster.body,
                    fillColor: action.bodyFill
                    }
                  }
                }
    case actionTypes.SET_FACE_FILL:
      return {...state,
                monster: {
                  ...state.monster,
                  face: {
                    ...state.monster.face,
                    fillColor: action.faceFill
                    }
                  }
                }
    case actionTypes.SET_HEADWEAR_FILL:
      return {...state,
                monster: {
                  ...state.monster,
                  headwear: {
                    ...state.monster.headwear,
                    fillColor: action.headwearFill
                    }
                  }
                }
    case actionTypes.SET_EYES_FILL:
      return {...state,
                monster: {
                  ...state.monster,
                  eyes: {
                    ...state.monster.eyes,
                    fillColor: action.eyesFill
                    }
                  }
                }
    case actionTypes.SET_MOUTH_FILL:
      return {...state,
                monster: {
                  ...state.monster,
                  mouth: {
                    ...state.monster.mouth,
                    fillColor: action.mouthFill
                    }
                  }
                }
    case actionTypes.SET_LEFT_ARM_FILL:
      return {...state,
                monster: {
                  ...state.monster,
                  leftArm: {
                    ...state.monster.leftArm,
                    fillColor: action.leftArmFill
                    }
                  }
                }
    case actionTypes.SET_RIGHT_ARM_FILL:
      return {...state,
                monster: {
                  ...state.monster,
                  rightArm: {
                    ...state.monster.rightArm,
                    fillColor: action.rightArmFill
                    }
                  }
                }
    case actionTypes.SET_LEGS_FILL:
      return {...state,
                monster: {
                  ...state.monster,
                  legs: {
                    ...state.monster.legs,
                    fillColor: action.legsFill
                    }
                  }
                }
    default:
      return state
  }
}

export default reducer
