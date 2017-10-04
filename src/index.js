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

import moment from 'moment'
// check if token is expired, if so destroy token from local storage
const rawDataFromStorage = window.localStorage.getItem('credentials')
if (rawDataFromStorage) {
  const token = JSON.parse(rawDataFromStorage).token
  const tokenInfo = JSON.parse(window.atob(token.split('.')[1]))
  const isExpired = moment(tokenInfo.exp).isAfter(moment())
  if (isExpired) {
    window.localStorage.removeItem('credential')
  }
}

const Root = () => (
  <ApolloProvider store={store} client={apolloClient}>
    <App />
  </ApolloProvider>
)
ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
