import actionTypes from '../actions/actionTypes'

const initialState = {
  username: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {...state, username: action.username}
    case actionTypes.LOGOUT:
      return {...state, username: null}
    default:
      return state
  }
}

export default reducer
