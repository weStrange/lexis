/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'

// global css goes here
// $FlowIgnore
import registerServiceWorker from './registerServiceWorker'
import App from './App'

import store from './core/store'
import { Provider } from 'react-redux'

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
