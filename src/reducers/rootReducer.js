import actionTypes from '../actions/actionTypes'

const initialState = {
  username: 'Peter',
  userOnMobile: false,
  svgStrokeStyle: {
    strokeFill: '#fff',
    strokeColor: '#999',
    strokeDasharray: '5,5'
  },
  monster: {
    body: {
      type: null,
      fillColor: null
    },
    face: {
      type: null,
      fillColor: '#fff'
    },
    headwear: {
      type: null,
      fillColor: null
    },
    eyes: {
      type: null,
      fillColor: null
    },
    mouth: {
      type: null,
      fillColor: null
    },
    leftArm: {
      type: null,
      fillColor: null
    },
    rightArm: {
      type: null,
      fillColor: null
    },
    legs: {
      type: null,
      fillColor: null
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
    default:
      return state
  }
}

export default reducer
