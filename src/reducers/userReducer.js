import actionTypes from '../actions/actionTypes'

const username = localStorage.getItem('username')

const initialState = {
  username: username,
  message: {
    text: null,
    icon: null
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {...state, username: action.username}
    case actionTypes.LOGOUT:
      return {...state, username: null}
    case actionTypes.SET_MESSAGE:
      return {...state,
        message: {
          ...state.message,
          text: action.text,
          icon: action.icon
        }
      }
    case actionTypes.CLEAR_MESSAGE:
      return {...state,
        message: {
          ...state.message,
          text: null,
          icon: null
        }
      }
    default:
      return state
  }
}

export default userReducer
