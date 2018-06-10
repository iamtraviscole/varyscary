import actionTypes from '../actions/actionTypes'

const initialState = {
  username: 'Peter',
  userOnMobile: false,
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
    arms: {
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
    default:
      return state
  }
}

export default reducer
