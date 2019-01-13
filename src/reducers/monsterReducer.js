import actionTypes from '../actions/actionTypes'

const initialState = {
  monsterName: '',
  monsterTags: [],
  monsterFeatures: {
    body: {
      type: null,
      hoverType: null,
      fillColor: '#000000'
    },
    face: {
      type: null,
      hoverType: null,
      fillColor: '#ffffff'
    },
    headwear: {
      type: null,
      hoverType: null,
      fillColor: '#000000'
    },
    eyes: {
      type: null,
      hoverType: null,
      fillColor: '#000000'
    },
    mouth: {
      type: null,
      hoverType: null,
      fillColor: '#000000'
    },
    leftArm: {
      type: null,
      hoverType: null,
      fillColor: '#000000'
    },
    rightArm: {
      type: null,
      hoverType: null,
      fillColor: '#000000'
    },
    legs: {
      type: null,
      hoverType: null,
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
              case actionTypes.SET_BODY_TYPE_HOVER:
                return {...state,
                          monsterFeatures: {...state.monsterFeatures,
                            body: {...state.monsterFeatures.body,
                              hoverType: action.bodyTypeHover
                            }
                          }
                        }
              case actionTypes.SET_FACE_TYPE_HOVER:
                return {...state,
                          monsterFeatures: {...state.monsterFeatures,
                            face: {...state.monsterFeatures.face,
                              hoverType: action.faceTypeHover
                            }
                          }
                        }
              case actionTypes.SET_HEADWEAR_TYPE_HOVER:
                return {...state,
                          monsterFeatures: {...state.monsterFeatures,
                            headwear: {...state.monsterFeatures.headwear,
                              hoverType: action.headwearTypeHover
                            }
                          }
                        }
              case actionTypes.SET_EYES_TYPE_HOVER:
                return {...state,
                          monsterFeatures: {...state.monsterFeatures,
                            eyes: {...state.monsterFeatures.eyes,
                              hoverType: action.eyesTypeHover
                            }
                          }
                        }
              case actionTypes.SET_MOUTH_TYPE_HOVER:
                return {...state,
                          monsterFeatures: {...state.monsterFeatures,
                            mouth: {...state.monsterFeatures.mouth,
                              hoverType: action.mouthTypeHover
                            }
                          }
                        }
              case actionTypes.SET_LEFT_ARM_TYPE_HOVER:
                return {...state,
                          monsterFeatures: {...state.monsterFeatures,
                            leftArm: {...state.monsterFeatures.leftArm,
                              hoverType: action.leftArmTypeHover
                            }
                          }
                        }
              case actionTypes.SET_RIGHT_ARM_TYPE_HOVER:
                return {...state,
                          monsterFeatures: {...state.monsterFeatures,
                            rightArm: {...state.monsterFeatures.rightArm,
                              hoverType: action.rightArmTypeHover
                            }
                          }
                        }
              case actionTypes.SET_LEGS_TYPE_HOVER:
                return {...state,
                          monsterFeatures: {...state.monsterFeatures,
                            legs: {...state.monsterFeatures.legs,
                              hoverType: action.legsTypeHover
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
                    type: action.bodyType,
                    fillColor: action.bodyColor
                  },
                  face: {
                    ...state.monsterFeatures.face,
                    type: action.faceType
                  },
                  headwear: {
                    ...state.monsterFeatures.headwear,
                    type: action.headwearType,
                    fillColor: action.headwearColor
                  },
                  eyes: {
                    ...state.monsterFeatures.eyes,
                    type: action.eyesType,
                    fillColor: action.eyesColor
                  },
                  mouth: {
                    ...state.monsterFeatures.mouth,
                    type: action.mouthType,
                    fillColor: action.mouthColor
                  },
                  rightArm: {
                    ...state.monsterFeatures.rightArm,
                    type: action.rightArmType,
                    fillColor: action.rightArmColor
                  },
                  leftArm: {
                    ...state.monsterFeatures.leftArm,
                    type: action.leftArmType,
                    fillColor: action.leftArmColor
                  },
                  legs: {
                    ...state.monsterFeatures.legs,
                    type: action.legsType,
                    fillColor: action.legsColor
                  }
                }
              }
    default:
      return state
  }
}

export default monsterReducer
