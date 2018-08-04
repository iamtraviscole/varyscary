import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware } from 'redux'
// compose is for redux devtools
import { compose  } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import './index.css'

import rootReducer from './reducers/rootReducer'
import App from './components/App'

// with redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
));

// without redux devtools
// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// )

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ), document.getElementById('root')
)

registerServiceWorker()
