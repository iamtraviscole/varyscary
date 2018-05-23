import actionTypes from '../actions/actionTypes'

const initialState = {
  username: 'Peter',
  userOnMobile: false,
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
    default:
      return state
  }
}

export default reducer
