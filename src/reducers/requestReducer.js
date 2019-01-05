import actionTypes from '../actions/actionTypes'

const initialState = {
  isFetching: false
}

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STARTED:
      return {...state, isFetching: true}
    case actionTypes.FETCH_ENDED:
      return {...state, isFetching: false}
    default:
      return state
  }
}

export default requestReducer
