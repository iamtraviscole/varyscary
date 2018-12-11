const username = localStorage.getItem('username')

const initialState = {
  username: username,
  message: {
    text: null,
    icon: null
  },
  isFetching: false,
  monsterName: '',
  monsterTags: [],
  monster: {
    body: {
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
