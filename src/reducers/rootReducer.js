import actionTypes from '../actions/actionTypes'

const initialState = {
  username: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERNAME:
      return {...state, username: action.username }
    default:
      return state
  }
}

export default reducer
