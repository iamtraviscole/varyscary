import actionTypes from './actionTypes'

export const fetchStarted = () => {
  return {
    type: actionTypes.FETCH_STARTED
  }
}

export const fetchEnded = () => {
  return {
    type: actionTypes.FETCH_ENDED
  }
}
