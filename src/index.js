/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
// global css goes here
// $FlowIgnore
import registerServiceWorker from './registerServiceWorker'
import App from './App'

import store, { apolloClient } from './core/store'
import { Provider } from 'react-redux'

const Root = () => (
  <ApolloProvider store={store} client={apolloClient}>
    <App />
  </ApolloProvider>
)
ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
