/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'

// global css goes here
// $FlowIgnore
import registerServiceWorker from './registerServiceWorker'
import App from './App'

import store from './core/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path='/' component={App} />
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
