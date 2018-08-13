const username = localStorage.getItem('username')

const initialState = {
  username: username,
  userOnMobile: false,
  isFetching: false,
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

  export default initialState
