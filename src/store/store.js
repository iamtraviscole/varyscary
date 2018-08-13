import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// compose is for redux devtools
import { compose  } from 'redux'

import rootReducer from '../reducers/rootReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// with redux devtools
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
));

// without redux devtools
// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// )

export default store
